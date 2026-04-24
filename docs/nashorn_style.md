# Nashorn Style Guide

## Target Runtime

Scripts in this repository target:

- CustomNPCs Unofficial
- Minecraft 1.21.1
- Nashorn-style JavaScript execution inside script hooks

Write code for the runtime that actually exists, not for modern Node.js or browser JavaScript.

## Preferred Syntax

Use:

- `var`
- `function name(...) {}`
- plain objects
- CommonJS-like `module.exports` only inside shared package modules

## Forbidden Or Unsafe Syntax

Do not use:

- `let`
- `const`
- arrow functions
- `import` / `export`
- optional chaining
- nullish coalescing
- class syntax unless you have verified it in the target runtime
- Node.js globals such as `require("fs")`, `process`, `Buffer`

## `Java.type(...)`

Java integration is normal in this repository.

Typical pattern:

```js
var BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
```

Guidelines:

- declare Java classes once near the top of the file
- do not assume old CustomNPCs wrapper methods still exist if direct Minecraft access is available
- prefer Minecraft/NeoForge Java APIs when item or entity internals matter

## Shared Module Style

Shared package files under `shared/` use CommonJS-like exports:

```js
function onTimer(event) {
    return event;
}

module.exports = {
    onTimer: onTimer
};
```

This is local package convention, not Node.js module loading.

## Hook Style

Hook files should stay thin:

```js
function timer(event) {
    var shared = requireShared(event);
    shared.timers.onTimer(event);
}
```

Avoid placing large subsystem implementations directly in hook files when the package already uses `shared/`.

## General Rules

- keep code ASCII unless a file already uses another encoding intentionally
- avoid large modern refactors that increase risk without runtime benefit
- prefer explicit helper functions over compact clever syntax
- write for practical compatibility first
