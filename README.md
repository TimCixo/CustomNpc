<h1 align="center"> CustomNpc </h1>
<!-- BADGES -->
</br>
<p align="center">
  <img src="https://img.shields.io/badge/minecraft-1.21.1-blue">
  <img src="https://img.shields.io/badge/customnpcs-unofficial-green">
  <img src="https://img.shields.io/badge/javascript-nashorn-yellow">
</p>

<!-- INFO -->
</br>
<h2 align="left"> Description </h2>

Repository with scripted systems for `CustomNPCs Unofficial` on `Minecraft 1.21.1`.
</br>
The project contains ready-made NPC flows, scripted items and event logic written for in-game hooks such as `init`, `interact` and `timer`.

- Build linked NPC systems;
- Use `storeddata` and `tempdata` for runtime state;
- Work with items through `MCItemStack` and `DataComponents`;
- Keep logic compatible with in-game Script Tab workflow.

</br>

## Getting Started

1. Place the required NPCs in the world;
2. Assign the needed hooks from this repository;
3. Configure linked NPCs and item scripts;
4. Test the flow directly in-game.

## Project Structure

- [npc](/e:/Projects/CustomNpc/npc)
- [items](/e:/Projects/CustomNpc/items)
- [blocks](/e:/Projects/CustomNpc/blocks)
- [modules](/e:/Projects/CustomNpc/modules)
- [docs](/e:/Projects/CustomNpc/docs)
- [types](/e:/Projects/CustomNpc/types)
- [template](/e:/Projects/CustomNpc/template)

## Types Folder

The repository now includes a root-level [types](/e:/Projects/CustomNpc/types) directory with generated `.d.ts` declaration bundles for `CustomNPCs Unofficial` and other mods from the active 1.21.1 pack.

Use this folder as a local reference layer when you need to:

- inspect available Java classes and package names;
- confirm mod namespaces before calling `Java.type(...)`;
- improve editor navigation and autocomplete while writing hook scripts.

Important constraints:

- files inside `types` are documentation/support artifacts, not runtime scripts for CustomNPCs;
- they are not loaded by NPC hooks in-game;
- folder names are versioned per mod jar, so they may change when the pack is updated.

If you need the CustomNPCs declarations specifically, start with:

- [types/CustomNPCs-Unofficial-NeoForge-1.21.1.20251230](/e:/Projects/CustomNpc/types/CustomNPCs-Unofficial-NeoForge-1.21.1.20251230)
- For practical usage notes, see [docs/java_type_mappings.md](/e:/Projects/CustomNpc/docs/java_type_mappings.md)

## Main Module

The main finished module in this repository is:

- [pokemon_catch_coordinator](/e:/Projects/CustomNpc/npc/finished/pokemon_catch_coordinator)

It includes:

- `main` NPC
- scripted `pokemon_catch_configurator` item
- scripted `pokemon_catch_command` item
- scripted `ticket`
- bind-to-main item flow

Detailed module documentation:

- [pokemon_catch_coordinator/README.md](/e:/Projects/CustomNpc/npc/finished/pokemon_catch_coordinator/README.md)

## Principles

- Each hook is treated as a separate entry point;
- Persistent state is stored in `storeddata`;
- Temporary runtime state is stored in `tempdata`;
- Item logic uses vanilla Java classes and modern `DataComponents`;
- Solutions are designed to work inside the game UI without requiring shared world files.

## Use Cases

This repository is intended as a base for:

- event NPCs
- scripted items
- Cobblemon-related gameplay systems
- linked NPC setups
- simple scripted automation
