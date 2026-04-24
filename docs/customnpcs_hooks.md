# CustomNPCs Hooks

## Hook Model

Treat each CustomNPCs hook as a separate entry point.

Do not assume:

- functions from one hook are available in another
- globals are shared across different hook files
- hook execution order behaves like one normal application runtime

## Common Hook Files

Current package layout commonly uses:

- `init.js`
- `interact.js`
- `timer.js`
- `damaged.js`
- `died.js`
- `attack.js`
- `meleeAttack.js`

Additional hooks may exist depending on the system.

## Thin Wrapper Pattern

Preferred pattern for modern packages in this repository:

```js
function requireShared(event) {
    var npc = event.npc;
    var data = npc.getStoreddata();
    var factorySource = "" + data.get("__shared");
    var factory = (1, eval)(factorySource);
    return factory(event);
}

function damaged(event) {
    var shared = requireShared(event);
    shared.combat.onDamaged(event);
}
```

This keeps hook files small and moves system logic into `shared/`.

## Event Caveats

Practical caveats in this environment:

- hooks are isolated entry points
- command execution behavior depends on real server command source context
- GUI support is component-dependent and must be tested empirically
- some old API examples from older CustomNPCs versions are unreliable on `1.21.1`

## State Handling

Recommended split:

- `storeddata` for persistent config and snapshots
- `tempdata` for live runtime objects and transient state

Do not use hook-local assumptions as a persistence mechanism.

## Hook Order Notes

Do not rely on a universal guaranteed order between unrelated events.

Safe assumption:

- each hook should be able to rebuild or re-read the minimum state it needs
- `init` should rebuild runtime objects from durable state
- `died` should confirm committed death from durable lifecycle state if post-death order matters
