---
name: customnpcs-linker
description: Build, refactor, and debug linked CustomNPCs patterns in this repository where one main NPC issues a linker item, stores references to sub NPCs, and sub NPCs keep their own local state. Use when creating or updating linker items, main/sub NPC coordination, UUID-based NPC linking, bind-only item workflows, or runtime link managers for CustomNPCs Unofficial 1.21.1.
---

# CustomNPCs Linker

Use this skill for linked NPC systems in this repository.

This project targets CustomNPCs Unofficial on Minecraft 1.21.1. Prefer UUID-based binding with a linker item, durable link references in `storeddata`, and live link managers/controllers in `tempdata`.

For runtime architecture patterns, also read:

- `docs/customnpcs_tempdata_object_notes.md`

## Role Model

Use two explicit roles:

- `main`
  - issues linker
  - owns link references
  - aggregates or coordinates linked sub NPCs
- `sub`
  - accepts linker
  - writes only its own UUID back into the item
  - owns its own local raw state and local runtime logic

Do not blur these roles.

## Confirmed Working Binding Pattern

Use a bind-only linker item:

1. `main` issues the linker item
2. linker stores:
   - `linker_type`
   - `main_uuid`
   - one or more sub UUID slots such as `config_uuid`, `coord_uuid`
3. each `sub` accepts the linker in main hand and writes only its own UUID into the item
4. player returns linker to `main`
5. `main` reads UUIDs from the item and stores them in its own `storeddata`
6. `main` resolves linked NPCs later with `npc.getWorld().getEntity(uuid)`

This is preferred over:

- ad hoc token ids
- searching nearby NPCs by nonexistent helper methods
- using linker as the permanent source of truth for all runtime data

## State Ownership Rule

Keep durable state and runtime state on the NPC that owns them.

- `main storeddata`
  - linked sub UUIDs
  - durable control flags/config
- `main tempdata`
  - link manager
  - summary/report services
  - live controller state
- `sub storeddata`
  - local durable config/state
- `sub tempdata`
  - local controller
  - live session/runtime helpers

When `main` needs a report, prefer:

1. resolve sub NPC by UUID
2. read sub durable state from `storeddata`
3. optionally wrap it in a runtime view/model in `tempdata`

## Preferred Runtime Architecture

For anything beyond a tiny linker, prefer one root runtime object in `tempdata`.

Example shape:

```js
var runtime = {
    services: {},
    state: {},
    links: {}
};
```

Typical `main` services:

- `linkManager`
  - resolves linked NPCs
  - validates bindings
  - exposes getters like `getConfigurator()`
- `summaryService`
  - reads sub state
  - formats aggregate output

Typical `sub` services:

- `localController`
  - interprets GUI/input
  - mutates local raw state

Do not reduce linker architecture to only raw UUID strings and procedural glue if a runtime manager makes ownership clearer.

## GUI Pattern For Sub NPCs

Sub NPCs should use the confirmed safe GUI approach:

- `textField` and `textArea` for state
- `scroll` as pseudo-buttons
- `gui.update()` after action

For GUI details, also read:

- `docs/customnpcs_gui_notes.md`
- `modules/gui_scroll_menu.js`

If a sub NPC has a more complex editing flow, it may use a runtime controller in `tempdata`, but durable values that must survive close/reopen should still be persisted in `storeddata`.

## Recommended Repo Resources

If you need reusable linker helpers, read:

- `modules/linker_main.js`
- `modules/linker_sub.js`

If you need a working test stand, read:

- `npc_linker_test_stand/main/interact.js`
- `npc_linker_test_stand/configurator/interact.js`
- `npc_linker_test_stand/coordinator/interact.js`

## Output Template

When the user asks to create linked NPCs, default to:

1. a `main` script
   - issue linker
   - accept returned linker
   - store linked sub UUIDs in `storeddata`
   - build runtime services in `tempdata`
   - resolve sub NPCs with `world.getEntity(uuid)`
   - read and summarize sub state
2. one or more `sub` scripts
   - bind their own UUID into linker
   - keep durable local state in `storeddata`
   - build local runtime/controller objects in `tempdata`
   - optionally expose a safe GUI for editing that local state

## Minimal Decisions

- use UUID, not generated string ids, for NPC references
- use `storeddata` for persistent link references and local durable state
- use `tempdata` for live managers/controllers
- use main hand item for linker interactions
- consume linker in `main` when it is returned, unless the user explicitly wants reusable sessions

## Validation Checklist

When the linked system fails, check in this order:

1. Does linker `linker_type` match on all roles?
2. Does linker `main_uuid` match the current `main` NPC?
3. Is the `sub` writing its UUID to the expected linker field?
4. Is `main` storing returned UUIDs in its `storeddata`?
5. Does `main.getWorld().getEntity(uuid)` return the linked NPC?
6. Is the sub durable state actually saved in that NPC's `storeddata`?
7. Is the live runtime/controller state being rebuilt in `init` and stored in `tempdata`?

If the user asks for implementation, prefer full ready-to-paste scripts for each role.
