# NPC Template Skeleton

Minimal starter skeleton for a loader-friendly NPC package in CustomNPCs Unofficial 1.21.1.

This package is meant to be copied and customized. It keeps the shared module split and hook entry-point pattern, but it intentionally avoids demo-heavy runtime behavior.

For a working educational package with live state counters and visible hook-to-hook state mutation, see [src/examples/basic_npc](/src/examples/basic_npc).

## Structure

```text
template/
  README.md
  jsconfig.json
  hooks/
    init.js
    interact.js
    timer.js
    dialog.js
    damaged.js
    died.js
  shared/
    __shared.js
    utils.js
    config.js
    dialogs.js
    state.js
    npc.js
```

## Shared Modules

- `shared/utils.js`
  Small generic helpers for strings and JSON.
- `shared/config.js`
  Stores and reads config JSON in `storeddata`.
- `shared/dialogs.js`
  Stores and reads dialog id mappings in `storeddata`.
- `shared/state.js`
  Manages the live runtime state object in `tempdata`.
- `shared/npc.js`
  Minimal hook facade used by the hook wrappers.

## Data Locations

- `storeddata`
  Persistent setup data such as config and dialog mappings.
- `tempdata`
  Live mutable runtime state for the current NPC runtime.

`shared` is only the module layer returned by the loader factory. It is not persisted runtime state.

## Public API

```js
shared.config.set(npc, data);
shared.config.get(npc);

shared.dialogs.set(npc, data);
shared.dialogs.get(npc);
shared.dialogs.isDialog(dialogId, dialogRef);
shared.dialogs.isOption(optionId, optionRef);

shared.state.get(npc);
shared.state.reset(npc);
shared.state.dispose(npc);
```

`shared.state.get(npc)` returns the live object stored in `tempdata`. If the object is missing, it creates one, stores it immediately, and returns it.

## Hook Pattern

- `hooks/init.js`
  Human-editable setup layer. Define grouped config and dialog ids there, write them into `storeddata`, reset state, and delegate to `shared.npc.init(event)`.
- Other hooks
  Thin wrappers that load shared and delegate to `shared.npc.*` functions.

The default implementation is intentionally small. The files exist to show where behavior should be added later, not to act as a full tutorial package.

## Lifecycle

- `shared.state.reset(npc)`
  Replaces the current runtime state with a fresh object.
- `shared.state.dispose(npc)`
  Removes the runtime state from `tempdata`.

## When To Use The Example

If you want to see:

- visible state mutation between hooks
- timer-driven state changes
- compact chat/status output
- a concrete `storeddata` vs `tempdata` demo

use [src/examples/basic_npc](/src/examples/basic_npc) as the reference package.
