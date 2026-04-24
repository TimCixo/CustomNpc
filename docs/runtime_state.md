# Runtime State

## Core Split

Use the runtime split consistently:

- `storeddata` for durable state
- `tempdata` for live runtime state

## `storeddata`

Use `storeddata` for values that must survive:

- server restart
- script reload
- NPC respawn/recreation
- package re-apply

Typical durable values:

- config JSON
- lifecycle snapshot JSON
- linked NPC UUIDs
- integration state
- package metadata that must survive reload

## `tempdata`

Use `tempdata` for live objects and transient state:

- runtime managers
- caches
- damage tables
- recent hit windows
- reward cursors
- whois cache
- live snapshots
- frozen snapshots during active death flow

In this project, `tempdata` is treated as live runtime memory, not just as a flat scratch map.

## Runtime Object Pattern

Preferred pattern:

1. read durable config/snapshot from `storeddata`
2. build runtime object in `init`
3. put runtime object into `tempdata`
4. let hooks call runtime/shared methods
5. persist only stable checkpoints back to `storeddata`

Example shape:

```js
var runtime = {
    npc: npc,
    config: config,
    state: lifecycle,
    services: {
        visuals: visuals
    }
};

npc.getTempdata().put("runtime", runtime);
```

## Snapshot Pattern

Use snapshots for recovery and post-fight reporting, not as a replacement for live runtime structures.

Typical approach:

- `damageMap` and `liveSnapshot` stay live in `tempdata`
- on death finalization, freeze into `frozenSnapshot`
- announce leaderboard and grant rewards from the frozen snapshot
- persist durable lifecycle checkpoints at stable milestones

## Hot Path Rules

Hot paths include:

- `damaged`
- `timer`
- `attack`
- `meleeAttack`
- reward cursor progression during active death flow

Rules:

- do not scan `storeddata.getKeys()` in hot paths
- do not write many per-hit storeddata keys
- do not JSON-serialize large state blobs on every hit
- do not rebuild reward pools every timer tick
- do not query expensive command paths every melee hit when a cache is sufficient

## Stable Checkpoints

Persist to `storeddata` at stable points such as:

- init/reset
- phase changed
- death started
- death committed
- rewards completed
- major runtime error

This preserves recovery without turning `storeddata` into a hot combat bus.

## Common Mistakes

- treating `storeddata` as a live event stream
- storing one key per player per hit
- using `storeddata` for transient cooldowns and debug spam
- forgetting to rebuild runtime after lifecycle reset
- storing functions or live JS references in `storeddata`
