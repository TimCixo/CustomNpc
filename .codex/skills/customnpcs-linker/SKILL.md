---
name: customnpcs-linker
description: Build, refactor, and debug linked CustomNPCs patterns in this repository where one main NPC issues a linker item, stores references to sub NPCs, and sub NPCs keep their own local state. Use when creating or updating linker items, main/sub NPC coordination, UUID-based NPC linking, or bind-only item workflows for CustomNPCs Unofficial 1.21.1.
---

# CustomNPCs Linker

Use this skill for linked NPC systems in this repository.

This project targets CustomNPCs Unofficial on Minecraft 1.21.1. In this environment, direct NPC lookup methods are limited and not all older examples are valid. Prefer UUID-based binding with a linker item and keep worker state local to each sub NPC.

## Role Model

Use two explicit roles:

- `main`: the NPC that issues the linker, stores references to linked sub NPCs, and aggregates state
- `sub`: any linked worker NPC, such as `configurator` or `coordinator`

Do not blur these roles.

- `main` stores only references to sub NPCs plus any summary fields it explicitly owns
- `sub` stores only its own local state

## Confirmed Working Pattern

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

Always keep runtime state on the NPC that owns it.

Examples:

- `configurator` owns:
  - timer
  - interval
  - mode
- `coordinator` owns:
  - state
  - stage
  - note
- `main` owns:
  - linked sub UUIDs
  - any summary or control data that belongs to the aggregator itself

When `main` needs a report, it reads sub NPC state directly from linked NPC `storeddata`.

## Avoid These Patterns

Do not rely on:

- `getSurroundingEntities(...)` on NPC wrappers
- undocumented nearby-NPC helpers without verification
- old CNPC search snippets copied from older versions
- linker as the long-term container for all sub NPC data

## GUI Pattern For Sub NPCs

Sub NPCs should use the confirmed safe GUI approach:

- `textField` and `textArea` for state
- `scroll` as pseudo-buttons
- `gui.update()` after action

For GUI details, also read:

- `docs/customnpcs_gui_notes.md`
- `modules/gui_scroll_menu.js`

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

1. A `main` script
   - issue linker
   - accept returned linker
   - store linked sub UUIDs
   - resolve sub NPCs with `world.getEntity(uuid)`
   - read and summarize sub state
2. One or more `sub` scripts
   - bind their own UUID into linker
   - keep local state in `storeddata`
   - optionally expose a safe GUI for editing that local state

## Minimal Decisions

- use UUID, not generated string ids, for NPC references
- use `storeddata` for persistent link references and local sub state
- use main hand item for linker interactions
- consume linker in `main` when it is returned, unless the user explicitly wants reusable sessions

## Validation Checklist

When the linked system fails, check in this order:

1. Does linker `linker_type` match on all roles?
2. Does linker `main_uuid` match the current `main` NPC?
3. Is the `sub` writing its UUID to the expected linker field?
4. Is `main` storing returned UUIDs in its `storeddata`?
5. Does `main.getWorld().getEntity(uuid)` return the linked NPC?
6. Is the sub state actually saved in that NPC's `storeddata`?

If the user asks for implementation, prefer full ready-to-paste scripts for each role.
