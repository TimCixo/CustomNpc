# CustomNPCs GUI Notes

## Scope

This document tracks empirical results for scripted custom GUI support in this project environment:

- Minecraft 1.21.1
- CustomNPCs Unofficial
- JavaScript scripting inside in-game hooks

These notes are based on live tests performed inside the target environment, not on older API examples alone.

## API Notes

Observed in this project environment:

- `NpcAPI.Instance().createCustomGui(...)` does not use the older 4-argument form here.
- The working create signature is `createCustomGui(id, width, height, pauseGame, player)`.
- `API` is not available as a guaranteed global in the tested script hook, so use `NpcAPI.Instance()` explicitly.
- `gui.addLine(...)` is not available in the tested GUI object.
- `api.createItem(...)` should not be assumed to exist in this environment.

Reflection dump of the tested GUI object confirmed these relevant methods:

- `addAssetsSelector(int, int, int, int, int)`
- `addButton(int, String, int, int)`
- `addButton(int, String, int, int, int, int)`
- `addButtonList(int, int, int, int, int)`
- `addColoredLine(int, int, int, int, int, int, float)`
- `addComponent(ICustomGuiComponent)`
- `addEntityDisplay(int, int, int, IEntity)`
- `addItemRenderer(int, int, int, int, int, IItemStack)`
- `addItemSlot(int, int)`
- `addItemSlot(int, int, IItemStack)`
- `addLabel(int, String, int, int, int, int)`
- `addLabel(int, String, int, int, int, int, int)`
- `addScroll(int, int, int, int, int, String[])`
- `addSlider(int, int, int, int, int, String)`
- `addTextArea(int, int, int, int, int)`
- `addTextField(int, int, int, int, int)`
- `addTexturedButton(int, String, int, int, int, int, String)`
- `addTexturedButton(int, String, int, int, int, int, String, int, int)`
- `addTexturedRect(int, String, int, int, int, int)`
- `addTexturedRect(int, String, int, int, int, int, int, int)`
- `getBackgroundTexture()`
- `getPlayerSlots()`
- `getScrollingPanel()`
- `getSlots()`
- `removeItemSlot(IItemSlot)`
- `setBackgroundTexture(String)`
- `showPlayerInventory(int, int)`
- `showPlayerInventory(int, int, boolean)`

This confirms that:

- `addButton(...)`, `addItemSlot(...)`, and `showPlayerInventory(...)` do exist under those names.
- `addLine(...)` does not exist in this environment.
- A line-like API exists as `addColoredLine(...)`.

## Confirmed Test Results

- Earlier smoke test: a minimal GUI with a single `addLabel(...)` opened successfully.
- Later matrix test results with a slightly richer base GUI:
  - `label only` -> crash
  - `label + button` -> crash
  - `label + text field` -> ok
  - `label + scroll` -> ok
  - `label + item slot` -> crashes after correcting the call shape
  - `label + player inventory` -> crash
- Alternative component test results:
  - `addColoredLine(...)` -> ok
  - `addTexturedButton(...)` -> crash
  - `addButtonList(...)` -> crash
  - `showPlayerInventory(int, int, boolean)` -> crash
  - `addItemRenderer(...)` -> crash

## Observed Crash Messages

- `Failed to open a screen with advanced data: java.lang.NullPointerException: Cannot invoke "net.minecraft.server.MinecraftServer.overworld()" because "noppes.npcs.NBTTags.server" is null`
- `Failed to open a screen with advanced data: java.lang.NullPointerException: Cannot invoke "net.minecraft.world.entity.player.Player.registryAccess()" because "this.player" is null`
- `TypeError: Can not invoke method [OverloadedDynamicMethod IItemSlot noppes.npcs.api.wrapper.gui.GuiComponentsWrapper.addItemSlot(int,int,IItemStack) IItemSlot noppes.npcs.api.wrapper.gui.GuiComponentsWrapper.addItemSlot(int,int)] with the passed arguments; they do not match any of its method signatures.`

## Item Slot Notes

- `addItemSlot(...)` exists, but its exposed overloads in this environment are `addItemSlot(x, y)` and `addItemSlot(x, y, IItemStack)`.
- It does not use an `id` argument like several other GUI components.
- Calls shaped like `addItemSlot(id, x, y)` or `addItemSlot(id, x, y, item)` are invalid in this environment and fail at script dispatch time before the GUI is even opened.
- Even after correcting the signature, opening a GUI containing item slots still crashes with `this.player == null`.

## Practical Conclusion

- Scripted custom GUI support is inconsistent and component-dependent.
- `addLabel(...)`, `addTextField(...)`, `addScroll(...)`, and `addColoredLine(...)` are the empirically confirmed safe components from this test pass.
- `addButton(...)` is a confirmed breakage point.
- `addTexturedButton(...)` and `addButtonList(...)` are also confirmed breakage points.
- Showing player inventory inside scripted GUI is a confirmed breakage point.
- `showPlayerInventory(...)` is broken in both tested overloads.
- `addItemSlot(x, y)` and `addItemSlot(x, y, IItemStack)` are exposed, but still lead to an internal crash path when the GUI is opened.
- `addItemRenderer(...)` is also a confirmed crash point.
- `addColoredLine(...)` exists and is the working replacement for older `addLine(...)` examples.
- Even a label-only GUI is not reliably safe across variants, so do not treat "GUI opened once" as proof that the approach is production-safe.
- Prefer normal dialogs or other simpler interaction flows for production logic unless each exact GUI composition is tested empirically.

## Confirmed Workaround

The currently validated workaround for "buttons" in this environment is:

- use `addScroll(...)` as an action menu
- resolve the selected action through `scroll.getSelection()[0]`
- handle the action in `customGuiScroll(event)`
- store text field values through `player.getStoreddata()` between GUI openings
- update text and hints through `gui.update()` instead of reopening the whole GUI

Confirmed behavior of this workaround:

- `customGuiScroll(event)` fires correctly
- the selected scroll index is available through `getSelection()`
- `TextField` values remain readable in `customGuiScroll(event)` and `customGuiClosed(event)`
- `Storeddata` preserves field values between GUI reopenings

Recommended files in this repository:

- `modules/gui_scroll_menu.js` contains reusable helpers for scroll-driven GUI menus and text field persistence

## Recommended UI Pattern

Use the following pattern when building scripted GUI in this environment.

### 1. Treat scroll as the button layer

- Do not rely on `addButton(...)`, `addTexturedButton(...)`, or `addButtonList(...)`.
- Represent actions as entries in `addScroll(...)`.
- Read the selected action through `scroll.getSelection()[0]`.
- Handle the action in `customGuiScroll(event)` immediately.

### 2. Treat text fields as the editable state layer

- Use `addTextField(...)` and `addTextArea(...)` for user-editable values.
- Read current values from `event.gui` during `customGuiScroll(event)` or `customGuiClosed(event)`.
- Do not expect values to survive a full GUI rebuild automatically.

### 3. Persist state outside the GUI instance

- Rebuilding the GUI creates a fresh instance, so field values must be restored manually.
- Persist values through `player.getStoreddata()` when they must survive closing and reopening.
- Rehydrate fields during GUI creation before opening it.
- `player.getTempdata()` was not reliable for this reopen flow in the tested environment.

### 4. Update the existing GUI instead of reopening it

- After handling a scroll action, change labels, hints, or text field contents on the existing GUI.
- Call `gui.update()` after those changes.
- Do not call `player.showCustomGui(gui)` again just to refresh text.
- Do not call `player.closeGui()` at the start of `interact(event)` before opening a new GUI, because that close/open overlap caused unstable reopen behavior and apparent "double-click to open" symptoms in testing.

### 5. Keep hooks separated by responsibility

- `interact(event)` should only build and open the GUI.
- `customGuiScroll(event)` should resolve pseudo-button actions.
- `customGuiClosed(event)` should persist current field values.
- Avoid spreading GUI state across unrelated hooks unless it is stored explicitly through `storeddata`.

### 6. Preferred structure

Recommended flow:

1. `interact(event)` checks whether a custom GUI is already open.
2. `interact(event)` builds a fresh GUI and hydrates fields from `storeddata`.
3. The player changes text fields and selects actions from the scroll menu.
4. `customGuiScroll(event)` reads `event.gui`, resolves the selected index, applies the action, and calls `gui.update()`.
5. `customGuiClosed(event)` saves the latest text field values back to `storeddata`.

### 7. Reusable helper module

Use `modules/gui_scroll_menu.js` for the stable parts of this pattern:

- resolving the selected scroll index
- reading and writing text components
- storing and hydrating values through `storeddata`
- checking GUI and scroll identity
- safe `gui.update()`

### 8. What to avoid

- Native GUI button components for production logic
- Player inventory slots in scripted GUI
- Item slots and item renderers in scripted GUI
- Forced close-and-reopen loops for ordinary updates
- Assuming GUI component state persists automatically across new `createCustomGui(...)` calls
