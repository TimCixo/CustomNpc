# CustomNPCs GUI Mod Internals

## Version

This note documents mod-internal findings for:

- `CustomNPCs-Unofficial-NeoForge-1.21.1.20251230`

It is intended as a reverse-engineering note for future server updates or patched builds.
Empirical runtime behavior and compatibility testing remain documented separately in `customnpcs_gui_notes.md`.

## Findings

- `noppes.npcs.api.wrapper.PlayerWrapper#showCustomGui` opens a custom GUI container and then calls `ContainerCustomGui.setGui(gui, player)`.
- `noppes.npcs.containers.ContainerCustomGui#setGui` receives the player explicitly and uses it when building runtime slots and player inventory slots.
- This makes the basic scripted GUI open path look structurally valid.
- The observed failures are explained later in component serialization and deserialization paths.

## Root Causes

### Button and button-like components

- `noppes.npcs.api.wrapper.gui.CustomGuiButtonWrapper#fromNBT` calls `NBTTags.getProvider()`.
- `noppes.npcs.NBTTags#getProvider` calls `NBTTags.server.overworld().registryAccess()`.
- If `NBTTags.server` is `null`, deserializing a button-backed component fails before the GUI can open.
- This directly explains crashes involving:
  - `addButton(...)`
  - `addTexturedButton(...)`
- `noppes.npcs.api.wrapper.gui.CustomGuiButtonListWrapper#fromNBT` inherits the same failure path through `CustomGuiButtonWrapper#fromNBT`.

### Item renderer components

- `noppes.npcs.api.wrapper.gui.CustomGuiItemRendererWrapper#fromNBT` also uses `NBTTags.getProvider()`.
- This means item renderer components depend on the same `NBTTags.server` path.
- This matches the observed crash behavior for `addItemRenderer(...)`.

### Item slot and player inventory components

- `noppes.npcs.api.wrapper.gui.CustomGuiItemSlotWrapper#fromNBT` calls `player.registryAccess()` while `player` may still be `null`.
- Only after that read does it restore the player for player-backed slots using `CustomNpcs.proxy.getPlayer()`.
- That order is incorrect for deserializing player-backed item slot data.
- This directly explains crashes involving:
  - `addItemSlot(...)`
  - `showPlayerInventory(...)`
- `showPlayerInventory(...)` creates player-backed `CustomGuiItemSlotWrapper` instances, so it is affected by the same broken path.

## Implications For Scripts

- These failures are mod-level implementation issues in this specific version.
- They are not likely fixable from scripts alone.
- The scripting layer can construct the wrapper objects correctly, but the mod later fails while restoring component data from NBT.
- As a result, changing method names or lightly changing script call shape is unlikely to fix:
  - buttons
  - button lists
  - textured buttons
  - item renderers
  - item slots
  - player inventory slots

## Patch Targets For Future Mod Update

Primary classes and methods to re-check, diff, or patch in a future mod update:

- `noppes.npcs.api.wrapper.PlayerWrapper#showCustomGui`
- `noppes.npcs.containers.ContainerCustomGui#setGui`
- `noppes.npcs.NBTTags#getProvider`
- `noppes.npcs.api.wrapper.gui.CustomGuiButtonWrapper#fromNBT`
- `noppes.npcs.api.wrapper.gui.CustomGuiButtonListWrapper#fromNBT`
- `noppes.npcs.api.wrapper.gui.CustomGuiItemRendererWrapper#fromNBT`
- `noppes.npcs.api.wrapper.gui.CustomGuiItemSlotWrapper#fromNBT`

High-probability patch areas:

- Make `NBTTags.getProvider()` safe when `NBTTags.server` is not initialized.
- Remove hard dependency on `NBTTags.server` during scripted GUI component deserialization.
- In `CustomGuiItemSlotWrapper#fromNBT`, restore or resolve `player` before any use of `player.registryAccess()`.

## Conclusion

- The current evidence points to partial breakage in the scripted advanced GUI component path of `CustomNPCs-Unofficial-NeoForge-1.21.1.20251230`.
- Simple text and visual components can work, but several advanced components fail due to internal deserialization bugs.
- When the server mod is updated or a custom patched build becomes possible, this file should be used as the starting point for verification or patching.
