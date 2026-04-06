---
name: customnpcs-gui
description: Build, debug, and refactor scripted CustomNPCs GUI for Minecraft 1.21.1 in this repository. Use this skill when the task involves creating NPC GUI, handling pseudo-buttons, preserving text field values between openings, or avoiding known broken CustomNPCs GUI components in CustomNPCs-Unofficial-NeoForge-1.21.1.20251230.
---

# CustomNPCs GUI

Use this skill for scripted GUI work in this repository.

This project targets CustomNPCs Unofficial on Minecraft 1.21.1, where several GUI APIs are present but broken at runtime. Default to the confirmed-safe pattern instead of older button-based examples.

## Use This Skill When

- The user wants to create or update a scripted GUI for an NPC.
- The task needs clickable actions inside GUI.
- The task needs text fields to survive close and reopen.
- The task needs debugging for `customGuiScroll`, `customGuiClosed`, or GUI component behavior.

## Confirmed Safe Components

Prefer these components first:

- `addLabel(...)`
- `addTextField(...)`
- `addTextArea(...)`
- `addScroll(...)`
- `addColoredLine(...)`

## Confirmed Broken Or Unsafe Components

Do not build production flows around these in `CustomNPCs-Unofficial-NeoForge-1.21.1.20251230`:

- `addButton(...)`
- `addTexturedButton(...)`
- `addButtonList(...)`
- `showPlayerInventory(...)`
- `addItemSlot(...)`
- `addItemRenderer(...)`

`addLine(...)` is not available here. Use `addColoredLine(...)` instead.

If you need the reasoning or mod-level root causes, read:

- `docs/customnpcs_gui_notes.md`
- `docs/customnpcs_gui_mod_internals.md`

If you need the existing helper module, read:

- `modules/gui_scroll_menu.js`

## Recommended Pattern

Treat GUI as two layers:

- State layer: `textField` and `textArea`
- Action layer: `scroll`

Use `scroll` as pseudo-buttons.

Workflow:

1. In `interact(event)`, create a fresh GUI with `NpcAPI.Instance().createCustomGui(id, width, height, false, player)`.
2. Do not call `player.closeGui()` before opening; it causes close/open overlap and double-click behavior.
3. Add actions through `addScroll(...)`.
4. In `customGuiScroll(event)`, read the selected action from `scroll.getSelection()[0]`.
5. Apply GUI-side changes and call `gui.update()`.
6. In `customGuiClosed(event)`, persist field values to `player.getStoreddata()`.
7. When opening again, hydrate fields from `storeddata`.

## Output Template

When the user asks to create a GUI, default to a full ready-to-paste script instead of fragments.

Use this structure unless the repo context requires a narrower change:

1. Constants:
   - GUI ids
   - component ids
   - storeddata keys
   - action list
2. `interact(event)`:
   - create the GUI
   - open it
3. `customGuiScroll(event)`:
   - validate GUI id and scroll id
   - read `getSelection()[0]`
   - execute action
   - call `gui.update()`
4. `customGuiClosed(event)`:
   - read field values
   - persist to `player.getStoreddata()`
5. `createGui(player)`:
   - build labels, fields, scroll, hint area
   - hydrate from `storeddata`
6. Small helpers:
   - `getSelectedIndex(scroll)`
   - `getText(gui, id)`
   - `setText(gui, id, text)`
   - `getSavedValue(player, key, fallback)`

When possible, the generated script should visibly separate:

- layout creation
- action handling
- persistence
- tiny utility helpers

Do not split the first version across multiple files unless the user explicitly wants a reusable module.

## Required Data Rules

- Use `player.getStoreddata()` for values that must survive GUI close and reopen.
- Do not rely on `player.getTempdata()` for this GUI flow; it did not persist reliably across `customGuiClosed` -> next `interact`.
- Do not store functions or JS objects in `storeddata`.

## Event Rules

- `customGuiScroll(event)` works and fires immediately for safe scroll components.
- Read scroll selection via `getSelection()`, not `getSelected()`.
- In this environment `getSelection()` returns an `int[]`; use the first element as the selected action index.
- `customGuiClosed(event)` is the correct place to persist text fields.
- Do not treat `E` as a custom action key; it just closes the GUI.

## Minimal Implementation Outline

```js
var NpcAPI = Java.type("noppes.npcs.api.NpcAPI");

var GUI_ID = 9100;
var SCROLL_ID = 21;
var NOTE_ID = 11;
var NOTE_KEY = "my_gui_note";
var ACTIONS = ["Save", "Reset"];

function interact(event) {
    var player = event.player;
    var gui = createGui(player);
    player.showCustomGui(gui);
}

function customGuiScroll(event) {
    if (event.gui == null || event.gui.getID() != GUI_ID) return;
    if (event.scroll == null || event.scroll.getID() != SCROLL_ID) return;

    var index = event.scroll.getSelection()[0];
    var gui = event.gui;

    if (index == 0) {
        setText(gui, 31, "Saved.");
    } else if (index == 1) {
        setText(gui, NOTE_ID, "");
        setText(gui, 31, "Reset.");
    }

    gui.update();
}

function customGuiClosed(event) {
    if (event.gui == null || event.gui.getID() != GUI_ID) return;

    var note = getText(event.gui, NOTE_ID);
    event.player.getStoreddata().put(NOTE_KEY, note);
}
```

## Default Scaffold Decisions

Unless the user asks for something else, generate GUI with:

- one title label
- one subtitle label
- one decorative `addColoredLine(...)`
- one or two `textField` controls
- one `scroll` action list
- one `textArea` or label for status or hint text

Default action semantics:

- first action updates hint text
- save-like action leaves fields unchanged and just confirms state
- reset-like action clears fields and updates hint text

Default persistence semantics:

- hydrate fields from `storeddata` in `createGui(player)`
- save fields in `customGuiClosed(event)`
- never rely on in-memory JS state between hooks

## When Generating A Full Script

Optimize for repository style:

- plain Nashorn-style JavaScript
- ASCII by default
- no speculative API calls
- no old button-based GUI examples
- no partial snippets if the user asked for implementation

If a reusable helper already fits, such as `modules/gui_scroll_menu.js`, you may use it. If that would make the script harder to paste into a Script Tab, prefer a self-contained version.

## Implementation Guidance

- If the user asks for code, prefer a full ready-to-paste script.
- Keep reusable helpers in one place when possible, but remember hook contexts are separate entry points.
- If a task needs a reusable helper, follow the style of `modules/gui_scroll_menu.js`.
- If a requested GUI depends on native buttons, item slots, or player inventory, redesign it around `scroll`, labels, and text fields instead of trying to force the broken components.

## Debugging Checklist

When GUI behavior is wrong, check in this order:

1. Is the code using `createCustomGui(..., player)` with the player as the fifth argument?
2. Is the GUI using only confirmed-safe components?
3. Is `player.closeGui()` being called before open? Remove it.
4. Is scroll selection being read from `getSelection()[0]`?
5. Is state being saved to `storeddata`, not `tempdata`?
6. Is the code calling `gui.update()` instead of reopening the GUI?

If the task is about root-cause analysis rather than implementation, read the repo docs before proposing workarounds.
