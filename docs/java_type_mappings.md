# Java Type Mappings

This document explains how to use the generated mapping support files from [types](/e:/Projects/CustomNpc/types) while writing CustomNPCs scripts.

## Purpose

The mapping files are for editor support, package discovery, and safer `Java.type(...)` lookups.

They help you:

- find full Java class names;
- confirm package paths before calling `Java.type(...)`;
- improve autocomplete and navigation under `@ts-check`.

They do not become runtime scripts inside CustomNPCs.

## Main Files

- [types/minecraft_mappings_java_type.d.ts](/e:/Projects/CustomNpc/types/minecraft_mappings_java_type.d.ts) adds typed `Java.type("full.class.Name")` support for the editor.
- [types/server.txt](/e:/Projects/CustomNpc/types/server.txt) is a raw server-side mapping source.
- [types/client.txt](/e:/Projects/CustomNpc/types/client.txt) is a raw client-side mapping source.
- [types/generate_java_type_mappings.py](/e:/Projects/CustomNpc/types/generate_java_type_mappings.py) rebuilds the generated `.d.ts` helper from the raw mappings.

Versioned mod bundles also live inside [types](/e:/Projects/CustomNpc/types) as separate folders.

Examples:

- [types/CustomNPCs-Unofficial-NeoForge-1.21.1.20251230](/e:/Projects/CustomNpc/types/CustomNPCs-Unofficial-NeoForge-1.21.1.20251230)
- [types/Cobblemon AFP 1.9.2-1.21.1-NeoForge-NoGEB](/e:/Projects/CustomNpc/types/Cobblemon%20AFP%201.9.2-1.21.1-NeoForge-NoGEB)

## Typical Workflow

1. Search for the class in `types/server.txt`, `types/client.txt`, or a versioned mod declaration bundle.
2. Copy the full Java class name.
3. Use that exact full name inside `Java.type(...)`.
4. Let `minecraft_mappings_java_type.d.ts` provide autocomplete and reduce editor-only errors.

Example:

```js
var BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var ResourceLocation = Java.type("net.minecraft.resources.ResourceLocation");

var itemId = String(BuiltInRegistries.ITEM.getKey(mcStack.getItem()));
var id = ResourceLocation.parse("minecraft:diamond");
```

## Nested Classes

For nested Java classes, use JVM-style `$` in the `Java.type(...)` string.

Use this:

```js
var ItemEnchantments = Java.type("net.minecraft.world.item.enchantment.ItemEnchantments");
var ItemEnchantmentsMutable = Java.type("net.minecraft.world.item.enchantment.ItemEnchantments$Mutable");
```

Not this:

```js
var ItemEnchantmentsMutable = Java.type("net.minecraft.world.item.enchantment.ItemEnchantments.Mutable");
```

Reason:

- the generated typings register nested classes as separate Java types;
- `...$Mutable` matches the mappings directly;
- this avoids false editor errors under `@ts-check`.

Runtime may sometimes tolerate other forms, but for this repository the mapped `$` form is the reliable one.

## Which Source To Check

- Prefer [types/server.txt](/e:/Projects/CustomNpc/types/server.txt) for NPC hooks, item hooks, timers, dialogs, and most gameplay scripting.
- Use [types/client.txt](/e:/Projects/CustomNpc/types/client.txt) only when you are intentionally checking client-side classes.
- Use versioned mod `.d.ts` bundles when you know the mod but not the package path yet.
- If you need CustomNPCs wrappers first, start with [types/CustomNPCs-Unofficial-NeoForge-1.21.1.20251230](/e:/Projects/CustomNpc/types/CustomNPCs-Unofficial-NeoForge-1.21.1.20251230).

## Mod Mappings

For mod classes, the workflow is almost the same, but the source is usually a versioned mod bundle instead of `server.txt`.

Typical flow:

1. Open the mod folder inside `types`.
2. Open its `index.d.ts` or one of its package files.
3. Find the `declare module '...'` block that contains the class you need.
4. Use the module name for JSDoc typing.
5. Use the full runtime class path with `Java.type(...)` when you actually instantiate or access the Java class.

Example from a mod declaration bundle:

```ts
declare module 'net.doctorx.cobblemonalatia.item' {
  class ModItems {
    static readonly GLASS_VASE: DeferredItem;
  }
}
```

That gives you two useful things:

- the editor module path for typings: `net.doctorx.cobblemonalatia.item`
- the runtime Java class path for code: `net.doctorx.cobblemonalatia.item.ModItems`

Example in script code:

```js
// @ts-check

/** @typedef {import("net.doctorx.cobblemonalatia.item").ModItems} ModItems */

var ModItems = Java.type("net.doctorx.cobblemonalatia.item.ModItems");

/** @type {typeof import("net.doctorx.cobblemonalatia.item").ModItems} */
var ModItemsClass = ModItems;
```

Use the typedef form when you want type information for variables, return values, or helper parameters.

Example:

```js
/** @typedef {import("noppes.npcs.api.item").IItemStack} IItemStack */
/** @typedef {import("net.doctorx.cobblemonalatia.item").ModItems} ModItems */

/**
 * @param {IItemStack} item
 * @param {typeof import("net.doctorx.cobblemonalatia.item").ModItems} modItemsClass
 */
function useModItem(item, modItemsClass) {
    return modItemsClass.GLASS_VASE;
}
```

Practical rule:

- `import("some.module").SomeClass` is for IDE typing;
- `Java.type("some.package.SomeClass")` is for runtime access.

Those two strings are often related, but they are not the same thing.

## Making IDE See The Types

For the editor to resolve these mappings, your `jsconfig.json` must include the generated declarations from `types/**/*.d.ts`.

Root example:

```json
{
  "compilerOptions": {
    "checkJs": true,
    "baseUrl": "."
  },
  "include": [
    "npc/**/*.js",
    "items/**/*.js",
    "blocks/**/*.js",
    "modules/**/*.js",
    "template/**/*.js",
    "types/**/*.d.ts"
  ]
}
```

If you keep a local `jsconfig.json` near a specific script folder, include the root `types` folder there too.

Example:

```json
{
  "compilerOptions": {
    "checkJs": true,
    "baseUrl": "."
  },
  "include": [
    "init.js",
    "interact/**/*.js",
    "../../../types/**/*.d.ts"
  ]
}
```

Without that include, VS Code may stop seeing mod declarations even if the files exist in the repository.

## JSDoc Patterns For IDE Support

Use `@typedef` imports for classes you only need as types:

```js
/** @typedef {import("noppes.npcs.api.entity").IPlayer} IPlayer */
/** @typedef {import("net.minecraft.world.item").ItemStack} MCItemStack */
```

Use `typeof import(...)` when you want the static class shape:

```js
/** @type {typeof import("net.doctorx.cobblemonalatia.item").ModItems} */
var ModItemsClass = Java.type("net.doctorx.cobblemonalatia.item.ModItems");
```

Use a small bridge variable when runtime API and typings disagree:

```js
/** @type {any} */
var runtimePlayer = player;
var mainhand = runtimePlayer.getMainhandItem ? runtimePlayer.getMainhandItem() : runtimePlayer.inventoryHeldItem;
```

This pattern is useful for CustomNPCs wrappers, where generated typings may expose bean-style properties while runtime still uses Java-style getters.

## Limits

- These mappings are discovery artifacts, not proof that a class is safe in every hook.
- Many generated members are typed as `any`.
- CustomNPCs wrappers and live runtime objects do not always match the generated `.d.ts` shape exactly.
- You may still need small bridge helpers when `@ts-check` disagrees with runtime behavior.

## Regeneration

If `server.txt` or `client.txt` is updated from a new export, regenerate the helper file with:

```powershell
python types/generate_java_type_mappings.py
```
