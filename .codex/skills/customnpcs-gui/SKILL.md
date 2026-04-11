---
name: customnpcs-gui
description: Build, debug, and refactor scripted CustomNPCs GUI for Minecraft 1.21.1 in this repository. Use this skill when the task involves creating NPC GUI, handling pseudo-buttons, preserving text field values between openings, avoiding known broken GUI components, or structuring GUI session controllers for CustomNPCs Unofficial 1.21.1.
---

# CustomNPCs GUI

Use this skill for scripted GUI work in this repository.

This project targets CustomNPCs Unofficial on Minecraft 1.21.1, where several GUI APIs are present but broken at runtime. Default to the confirmed-safe pattern instead of older button-based examples.

For runtime object architecture, also read:

- `docs/customnpcs_tempdata_object_notes.md`

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

## Data Model

Treat GUI as three layers:

- durable layer
  - values that must survive close and reopen
  - keep in `player.getStoreddata()`
- session runtime layer
  - live controller object, validators, temporary selection state
  - keep in `player.getTempdata()` or `npc.getTempdata()` only if the flow really benefits from it
- view layer
  - labels, text fields, text areas, scroll components in the GUI itself

Important rule:

- use `storeddata` for values that must survive `customGuiClosed -> next interact`
- use `tempdata` only for live runtime/session objects during the current GUI flow

Do not reinterpret the new `tempdata` OOP findings as permission to store durable GUI values only in `tempdata`. That was still unreliable for close/reopen persistence in this GUI lifecycle.

## Recommended Pattern

Treat GUI as two working layers:

- state layer
  - `textField`
  - `textArea`
- action layer
  - `scroll`

Use `scroll` as pseudo-buttons.

Workflow:

1. In `interact(event)`, create a fresh GUI with `NpcAPI.Instance().createCustomGui(id, width, height, false, player)`.
2. Do not call `player.closeGui()` before opening; it causes close/open overlap and double-click behavior.
3. Add actions through `addScroll(...)`.
4. In `customGuiScroll(event)`, read the selected action from `scroll.getSelection()[0]`.
5. Apply GUI-side changes and call `gui.update()`.
6. In `customGuiClosed(event)`, persist durable field values to `player.getStoreddata()`.
7. When opening again, hydrate fields from `storeddata`.

## Runtime Controller Pattern

If the GUI flow is complex, use a runtime controller object for the current session.

Example responsibilities:

- normalize form input
- decide available actions
- compute status/hint text
- keep transient selection/model state

Keep that controller in `tempdata`, but rebuild it from durable state whenever needed.

Do not let GUI runtime controllers become the only source of truth for values that must survive a close/reopen cycle.

## Output Template

When the user asks to create a GUI, default to a full ready-to-paste script instead of fragments.

Use this structure unless repo context requires something narrower:

1. constants
   - GUI ids
   - component ids
   - storeddata keys
   - action list
2. `interact(event)`
   - optionally create/rebuild session controller
   - create the GUI
   - open it
3. `customGuiScroll(event)`
   - validate GUI id and scroll id
   - read `getSelection()[0]`
   - execute action
   - call `gui.update()`
4. `customGuiClosed(event)`
   - read field values
   - persist to `player.getStoreddata()`
5. `createGui(player)`
   - build labels, fields, scroll, hint area
   - hydrate from `storeddata`
6. small helpers

## Required Data Rules

- Use `player.getStoreddata()` for values that must survive GUI close and reopen.
- Use `tempdata` only for live GUI/session runtime helpers.
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

## Debugging Checklist

When GUI behavior is wrong, check in this order:

1. Is the code using `createCustomGui(..., player)` with the player as the fifth argument?
2. Is the GUI using only confirmed-safe components?
3. Is `player.closeGui()` being called before open? Remove it.
4. Is scroll selection being read from `getSelection()[0]`?
5. Is durable state being saved to `storeddata`, not only `tempdata`?
6. If a runtime controller exists, is it being rebuilt or refreshed at the right lifecycle point?
7. Is the code calling `gui.update()` instead of reopening the GUI?

If the task is about root-cause analysis rather than implementation, read the repo docs before proposing workarounds.
