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

Repository of scripted systems for `CustomNPCs Unofficial` on `Minecraft 1.21.1`.
</br>
This project is a working collection of NPC flows, scripted items, reusable runtime helpers, and technical experiments built for the in-game script environment rather than for a conventional standalone JavaScript runtime.

- Build linked NPC systems;
- Use `storeddata` and `tempdata` for runtime state;
- Work with items through `MCItemStack` and `DataComponents`;
- Keep logic compatible with in-game Script Tab workflow.

</br>

## What This Repo Is

This repository is primarily a source library for:

- scripted NPC interactions;
- custom item behavior;
- dialog and GUI logic;
- runtime state patterns built around `storeddata` and `tempdata`;
- automation, utility, and gameplay helpers for a modded Minecraft pack.

Most code here is written for hook-based execution such as `init`, `interact`, `timer`, `dialogOption`, and similar CustomNPCs entry points.

## What Makes It Different

This codebase is shaped by the constraints of the CustomNPCs scripting environment:

- scripts run inside the in-game UI, not in a normal Node.js project;
- hooks behave as separate entry points, not as one shared application runtime;
- many integrations rely on Minecraft and NeoForge Java classes through `Java.type(...)`;
- practical compatibility matters more than abstract cleanliness;
- runtime state often lives in `npc.getTempdata()` and durable state in `npc.getStoreddata()`.

Because of that, the repository is less about framework structure and more about reliable patterns for getting real in-game systems working.

## Repository Layout

- [src](/e:/Projects/CustomNpc/src): main source tree for hooks, items, modules, templates, and NPC systems.
- [src/npc](/e:/Projects/CustomNpc/src/npc): complete NPC scripts, finished systems, prototypes, and technical utilities.
- [src/items](/e:/Projects/CustomNpc/src/items): scripted items and item-driven workflows.
- [src/modules](/e:/Projects/CustomNpc/src/modules): reusable helper logic shared by scripted systems where the project structure allows it.
- [src/blocks](/e:/Projects/CustomNpc/src/blocks): block-related scripted behavior.
- [src/template](/e:/Projects/CustomNpc/src/template): base hook templates and reference starting points.
- [docs](/e:/Projects/CustomNpc/docs): focused notes on CustomNPCs behavior, GUI limitations, tempdata runtime patterns, and mapping usage.
- [types](/e:/Projects/CustomNpc/types): local declaration and mapping support for editor tooling and Java class discovery.

## How To Read The Project

If you are new to the repository, this path is the fastest way to orient yourself:

1. Read this `README` for the high-level model.
2. Open [src/npc](/e:/Projects/CustomNpc/src/npc) and inspect the separation between `finished`, `prototype`, and `technical`.
3. Look through [src/items](/e:/Projects/CustomNpc/src/items) and [src/modules](/e:/Projects/CustomNpc/src/modules) to see how item logic and reusable helpers are organized.
4. Use [docs](/e:/Projects/CustomNpc/docs) for project-specific notes when the runtime behaves differently from what the API shape suggests.
5. Use [types](/e:/Projects/CustomNpc/types) when you need package discovery, Java class lookup, or editor support for mod APIs.

## Source Areas

The source tree is organized by purpose rather than by build step.

`src/npc`:
- gameplay-facing NPCs;
- technical NPC tools;
- experiments and prototypes;
- finished scripted systems that can be adapted into other worlds or projects.

`src/items`:
- items that configure, trigger, bind, grant, or coordinate scripted flows;
- support items used by larger NPC systems.

`src/modules`:
- helper logic for configuration, dialog flow, GUI handling, economy patterns, linker logic, and other reusable pieces.

`src/template`:
- lightweight entry templates for common hooks;
- useful when starting a new NPC or item without copying old production code blindly.

## Tooling And Typing

This repository includes local type support to make Java-backed scripting more practical in the editor.

- [jsconfig.json](/e:/Projects/CustomNpc/jsconfig.json) enables `checkJs` for the repository source.
- [types/minecraft_mappings_java_type.d.ts](/e:/Projects/CustomNpc/types/minecraft_mappings_java_type.d.ts) helps the IDE understand many `Java.type(...)` lookups.
- [types/mods](/e:/Projects/CustomNpc/types/mods) contains versioned mod declaration bundles used for editor navigation and API discovery.

These files are developer aids only:

- they are not loaded by CustomNPCs in-game;
- they help with autocomplete and navigation;
- they do not guarantee that a method is actually safe in the script runtime.

For the practical workflow around mappings and mod declarations, see [docs/java_type_mappings.md](/e:/Projects/CustomNpc/docs/java_type_mappings.md).

## Design Principles

- Prefer working solutions over elegant but uncertain ones.
- Treat every hook as its own entry point.
- Keep persistent state in `storeddata`.
- Keep live runtime objects and managers in `tempdata` when the logic is complex enough to justify it.
- Prefer real Minecraft item access through `MCItemStack` and modern item components when item data matters.
- Do not assume old CustomNPCs API behavior is still valid on `1.21.1`.

## Typical Use Cases

This repository is useful if you are building or studying:

- utility NPCs;
- dialogue-driven interactions;
- custom reward or exchange systems;
- linked NPC setups;
- scripted item controllers;
- Cobblemon-adjacent gameplay systems;
- practical runtime architecture for CustomNPCs scripting on modern Minecraft.

## Recommended Docs

- [docs/customnpcs_tempdata_object_notes.md](/e:/Projects/CustomNpc/docs/customnpcs_tempdata_object_notes.md)
- [docs/customnpcs_gui_notes.md](/e:/Projects/CustomNpc/docs/customnpcs_gui_notes.md)
- [docs/customnpcs_command_notes.md](/e:/Projects/CustomNpc/docs/customnpcs_command_notes.md)
- [docs/java_type_mappings.md](/e:/Projects/CustomNpc/docs/java_type_mappings.md)

## Working Model

The best way to use this repository is not to treat it as a polished framework with one golden entry point.

Instead, use it as:

- a catalogue of working patterns;
- a base for adapting finished systems;
- a reference for modern CustomNPCs scripting on `Minecraft 1.21.1`;
- a place to compare runtime-safe approaches against misleading editor or API assumptions.
