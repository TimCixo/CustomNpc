# Basic NPC Example

Working educational NPC package for CustomNPCs Unofficial 1.21.1.

This package is the richer reference example for the shared-module architecture. It is intentionally more active than the starter template and demonstrates how `storeddata`, `tempdata`, and a live runtime state object work together across hooks.

If you want a minimal package to copy as a clean starting point, use [src/template](/src/template).

## What This Example Demonstrates

- thin hook wrappers
- shared module split under `shared/`
- inspector-facing setup in `hooks/init.js`
- config stored in `storeddata`
- dialog id mappings stored in `storeddata`
- live mutable state stored in `tempdata`
- visible proof that the same state object survives between hooks

## Structure

```text
examples/basic_npc/
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

## Main Demo Hooks

The most interesting hooks in this example are:

- `init`
  Writes config and dialog mappings, resets state, starts the timer, and records the first state mutation.
- `timer`
  Mutates the live state silently by incrementing `timerCount`.
- `interact`
  Reads and prints the already-mutated state, so you can see that `timer` touched the same object.
- `died`
  Prints the final accumulated state and disposes it afterwards.

`dialog` and `damaged` still exist as part of the package shape, but they are intentionally minimal in this example.

## `storeddata` vs `tempdata`

- `storeddata`
  Holds durable setup data. This example stores config JSON and dialog reference JSON there.
- `tempdata`
  Holds the current live runtime state object for this NPC instance.

The shared module layer is not runtime state. It is just the module map returned by the loader factory.

## How `state.get(npc)` Works In Practice

`shared.state.get(npc)` tries to read the state object from `tempdata`.

- If it already exists, the same live object is returned.
- If it is missing, a fresh default object is created, stored immediately in `tempdata`, and returned.

That is why direct mutation is intentional:

```js
var state = shared.state.get(npc);
state.timerCount++;
state.lastHook = "timer";
```

There is no `shared.state.set(...)` because the returned object is already the live object stored in `tempdata`.

## Why `timer` And `interact` See The Same Changes

`timer` increments `timerCount` without printing every tick. Later, `interact` reads the same state object and prints the current counters. When the player sees a non-zero `timerCount` during interaction, that is direct proof that another hook already mutated the same live object reference.

The same pattern continues through `died`, which reads the accumulated values one last time before `shared.state.dispose(npc)` clears the runtime state.

## Why This Is An Example, Not The Template

This package intentionally includes:

- visible counter output
- state mutation tracking across hooks
- lifecycle proof for `tempdata`
- a small educational runtime flow

That makes it useful as a reference package, but heavier than a clean starter skeleton. For the lighter version, use [src/template](/src/template).
