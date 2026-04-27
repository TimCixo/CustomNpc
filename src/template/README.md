# NPC Template Package

Reusable loader-friendly NPC template for CustomNPCs Unofficial 1.21.1.

This template is a lightweight skeleton with a small live state demo.

- thin hooks
- shared modules
- inspector-facing setup in `hooks/init.js`
- config and dialogs in `storeddata`
- live mutable state in `tempdata`

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
  Small generic helpers, mainly safe JSON parse/stringify and string helpers.
- `shared/config.js`
  Dumb config storage with `shared.config.set(npc, data)` and `shared.config.get(npc)`.
- `shared/dialogs.js`
  Dumb dialog mapping storage with `shared.dialogs.set(npc, data)` and `shared.dialogs.get(npc)`.
  It also provides `shared.dialogs.isDialog(dialogId, dialogRef)` and `shared.dialogs.isOption(optionId, optionRef)`.
- `shared/state.js`
  Stores the live runtime state in `tempdata` with `shared.state.get(npc)`, `shared.state.reset(npc)`, and `shared.state.dispose(npc)`.
- `shared/npc.js`
  Small hook orchestrator for the demo behavior.

## Data Model

- `storeddata`
  Persistent setup data. This template stores config JSON and dialog mapping JSON there.
- `tempdata`
  Live mutable current-life state. This template stores counters, `lastHook`, and `lastPlayerName` there.

`shared` is only the shared module layer loaded by the loader. It is not runtime state.

## How `state.get(npc)` Works

`shared.state.get(npc)` tries to read the state object from `tempdata`.

- If state exists, it returns that same live object.
- If state is missing, it creates a fresh default object, stores it in `tempdata`, and returns it.

That means direct mutation is the intended pattern:

```js
var state = shared.state.get(npc);
state.interactCount++;
state.lastHook = "interact";
```

There is intentionally no `shared.state.set(...)`.

## Demo Hooks

Hooks with real demo behavior:

- `init.js`
  Stores config and dialogs, resets state, and starts the timer flow.
- `interact.js`
  Reads the current state and prints a compact summary.
- `timer.js`
  Increments `timerCount` silently.
- `died.js`
  Prints the final accumulated state and then disposes it.

Hooks intentionally left as empty skeleton placeholders:

- `dialog.js`
- `damaged.js`

## What The State Demo Proves

The state object stays small:

- `sequence`
- `initCount`
- `interactCount`
- `timerCount`
- `deathCount`
- `lastPlayerName`
- `lastHook`

`init` increments `initCount`, `timer` increments `timerCount` silently, `interact` increments `interactCount` and prints the current values, and `died` increments `deathCount` and prints the final values. When `interact` shows a non-zero `timerCount`, that is direct proof that another hook already mutated the same live object in `tempdata`.

## Lifecycle

- `shared.state.reset(npc)`
  Replaces the current tempdata state with a fresh default object.
- `shared.state.dispose(npc)`
  Removes the tempdata state completely.

The template uses `reset` in `init.js` to start a fresh lifecycle and `dispose` in `died.js` after printing the final state summary.

## Inspector-Facing Setup

`hooks/init.js` is the place intended for human editing.

- `TEMPLATE_CONFIG`
  Generic grouped config such as `initialization`, `interact`, and `death`
- `TEMPLATE_DIALOGS`
  Generic dialog refs such as `main.id` and `main.options.hello`

This keeps the durable setup visible in one file while the runtime logic stays in shared modules. There is no config normalization or dialog reconstruction layer in the template.
