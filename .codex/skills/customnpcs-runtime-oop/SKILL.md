---
name: customnpcs-runtime-oop
description: Build, refactor, and debug runtime object-oriented architecture for CustomNPCs Unofficial 1.21.1 in this repository. Use when a task involves manager/service/factory/unit objects, runtime controllers in npc.getTempdata(), clone behavior, or rebuilding live runtime state from storeddata during init.
---

# CustomNPCs Runtime OOP

Use this skill for runtime architecture in this repository.

This project has confirmed that `npc.getTempdata()` can hold live JavaScript objects with methods, nested objects, arrays, shared references, Java objects, factory-created instances, and manual clone patterns during the current NPC runtime lifecycle.

For the underlying test results and limits, read:

- `docs/customnpcs_tempdata_object_notes.md`

## Core Model

Treat NPC state as two layers:

- `storeddata`
  - durable raw state
  - survives restart/reload/respawn assumptions better
  - use for config, ids, long-lived flags, saved progress
- `tempdata`
  - live runtime layer
  - use for managers, services, factories, units, controllers, caches, session objects

Default architectural rule:

1. Read durable raw state from `storeddata`
2. Build runtime objects in `init`
3. Store runtime objects in `tempdata`
4. In later hooks call methods on runtime objects instead of scattering raw key logic

## Preferred Runtime Shape

Prefer one root runtime object instead of many unrelated tempdata keys.

Default pattern:

```js
var TEMP_RUNTIME_KEY = "runtime";

function init(event) {
    var npc = event.npc;
    var data = npc.getStoreddata();

    var runtime = {
        services: {},
        units: [],
        state: {
            phase: parseInt(data.get("phase"), 10) || 1
        }
    };

    runtime.services.unitFactory = {
        nextId: 0,
        create: function(name) {
            this.nextId++;
            var unit = {
                id: this.nextId,
                name: name,
                hp: 20,
                damage: function(amount) {
                    this.hp -= amount;
                }
            };
            runtime.units.push(unit);
            return unit;
        }
    };

    npc.getTempdata().put(TEMP_RUNTIME_KEY, runtime);
}
```

Later hooks:

```js
function interact(event) {
    var runtime = event.npc.getTempdata().get(TEMP_RUNTIME_KEY);
    runtime.services.unitFactory.create("alpha");
}
```

## Use These Runtime Roles

Prefer explicit runtime objects such as:

- `runtime`
  - root container
- `state`
  - live mutable state owned by the runtime
- `services`
  - stateless or low-state helpers that operate on runtime state
- `factory`
  - object that creates instances and may retain collections
- `unit`
  - per-entity or per-session instance with methods
- `controller`
  - object that coordinates one flow such as combat, GUI session, or dialog flow
- `registry`
  - object that indexes runtime instances

Avoid reducing complex NPC logic to:

- dozens of unrelated string keys
- large helper-function blobs with implicit shared state
- ad hoc global variable sprawl

## Hook Responsibilities

Use hooks like this by default:

- `init`
  - bootstrap runtime from `storeddata`
  - create managers/services/factories/controllers
  - store the runtime root in `tempdata`
- `interact`
  - call runtime entry methods
- `timer`
  - drive the main runtime loop or controller updates
- `damaged`
  - delegate combat/event handling into runtime services
- `died`
  - flush durable state if needed and clean up lifecycle-sensitive runtime assumptions

Do not assume one hook file shares local functions automatically with another. Share live objects through `tempdata`, and durable raw state through `storeddata`.

## Persistence Rule

If state must survive lifecycle reset:

1. Save raw fields in `storeddata`
2. Rebuild runtime objects in `init`

Do not try to use `storeddata` for:

- functions
- methods
- live JS object references

## Clone Rule

Clone behavior is manual.

If code copies:

```js
meta: this.meta
```

that is shallow for `meta`.

If code copies:

```js
meta: {
    level: this.meta.level,
    tag: this.meta.tag
}
```

that is a manual deep copy for that subtree.

Always decide explicitly which fields are:

- shared
- shallow copied
- deep copied

Do not assume automatic deep clone behavior.

## Recommended Output Pattern

When the user asks for implementation, prefer a full ready-to-paste script or hook set with:

1. constants
2. durable-state helpers
3. runtime bootstrap in `init`
4. one root runtime object
5. small explicit managers/services/factories
6. hook entrypoints that delegate to runtime methods

## Validation Checklist

When runtime OOP behavior fails, check in this order:

1. Was the runtime root actually written to `npc.getTempdata()` in `init`?
2. Is the later hook reading the same tempdata key?
3. Is the data that must persist across reload/restart stored in `storeddata`, not only in `tempdata`?
4. Is clone behavior explicit for nested objects?
5. Is the architecture using one root runtime object rather than many drifting tempdata entries?

If the user asks for implementation, default to the OOP runtime pattern unless the task is too small to justify it.
