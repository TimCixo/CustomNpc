# Types

This directory stores generated TypeScript declaration bundles (`.d.ts`) for `CustomNPCs Unofficial` and the other mods present in the current Minecraft `1.21.1` pack.

## What It Is For

Use `types` as an offline reference source when working on CustomNPCs scripts:

- find the full Java package for a class before using `Java.type(...)`;
- inspect mod API names exposed by installed jars;
- improve editor autocomplete, symbol lookup and quick navigation.

## What It Is Not

- It is not runtime code for NPC hooks.
- It is not imported by `init`, `interact`, `timer` or other in-game scripts.
- It does not replace testing inside Minecraft, because declarations can still differ from practical script behavior.

## Layout

Each subfolder usually corresponds to one mod jar/version and contains:

- `index.d.ts` as the entry file;
- one or more package declaration files such as `noppes_npcs.d.ts`, `net_p3pp3rf1y.d.ts` or similar.

Example:

- [CustomNPCs-Unofficial-NeoForge-1.21.1.20251230](/e:/Projects/CustomNpc/types/CustomNPCs-Unofficial-NeoForge-1.21.1.20251230)

## Practical Rule

Treat this folder as a developer aid:

1. look up a class or package here;
2. write the actual CustomNPCs hook script in `npc/`, `items/` or `blocks/`;
3. verify the result in-game, especially for methods that may exist in declarations but behave differently in Nashorn-style scripts.
