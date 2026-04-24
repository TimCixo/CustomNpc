# CustomNpc

Repository of scripted systems for `CustomNPCs Unofficial` on `Minecraft 1.21.1`.

This project is built for the in-game scripting environment:

- JavaScript in Nashorn-style hooks
- CustomNPCs hook-based execution
- Minecraft and mod APIs through `Java.type(...)`
- runtime state split between `tempdata` and `storeddata`

## Current Architecture

The current package model for larger NPC systems is:

```text
package/
  hooks/
    init.js
    interact.js
    timer.js
    damaged.js
    died.js
    attack.js
    meleeAttack.js
    ...
  shared/
    __shared.js
    *.js
```

Key points:

- hook files stay thin and act as entry wrappers;
- shared modules use CommonJS-like `module.exports`;
- `shared/__shared.js` maps shared aliases to file names;
- hooks call `requireShared(event)` and then delegate to shared modules;
- live runtime objects belong in `tempdata`;
- durable config, snapshots, and integration state belong in `storeddata`.

The current reference example for this architecture is:

- [src/npc/finished/arceus_boss](/src/npc/finished/arceus_boss)

## GitHub NPC Loader

This repository also contains the current GitHub Loader implementation:

- [github_loader](/github_loader)

Current loader model:

- installer firmware installs ready firmware into the item;
- ready item stores manifest and metadata, not full source bodies;
- Preview fetches file content temporarily;
- Apply downloads source by manifest and writes directly to the target NPC;
- hooks are written into separate NPC script tabs;
- shared files are written into NPC memory/storeddata.

See:

- [github_loader/README.md](/github_loader/README.md)
- [docs/github_loader.md](/docs/github_loader.md)

## Repository Layout

- [src](/src): main scripted source tree
- [src/npc](/src/npc): finished NPC systems, prototypes, technical NPC tools
- [src/items](/src/items): scripted items and item workflows
- [src/modules](/src/modules): reusable script helpers where local file structure allows it
- [src/blocks](/src/blocks): block-related scripted behavior
- [src/template](/src/template): base templates and reference entry points
- [github_loader](/github_loader): GitHub NPC Loader item firmware
- [docs](/docs): project-specific architecture and environment notes
- [types](/types): editor support for `Java.type(...)` and mod classes

## Recommended Docs

- [docs/package_architecture.md](/docs/package_architecture.md)
- [docs/runtime_state.md](/docs/runtime_state.md)
- [docs/github_loader.md](/docs/github_loader.md)
- [docs/nashorn_style.md](/docs/nashorn_style.md)
- [docs/customnpcs_hooks.md](/docs/customnpcs_hooks.md)
- [docs/customnpcs_command_notes.md](/docs/customnpcs_command_notes.md)
- [docs/gui_notes.md](/docs/gui_notes.md)
- [docs/java_type_mappings.md](/docs/java_type_mappings.md)

## Practical Rules

- Treat every hook as its own entry point.
- Prefer `var` and `function` syntax for Nashorn compatibility.
- Do not rely on Node.js APIs.
- Do not push hot combat/runtime state into repeated `storeddata` writes.
- Avoid `storeddata.getKeys()` scans in hot paths.
- Prefer working Minecraft/NeoForge-backed Java access over old undocumented CustomNPCs API assumptions.

## Typical Use Cases

- scripted NPC interactions
- boss logic and multi-phase fights
- runtime manager patterns in `tempdata`
- linked NPC systems
- custom scripted items
- GUI-driven tools
- Cobblemon-adjacent gameplay logic
