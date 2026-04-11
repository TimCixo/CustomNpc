# CustomNPCs Tempdata Object Notes

## Scope

This document records empirical behavior of storing live JavaScript objects in `npc.getTempdata()` in this project environment:

- Minecraft 1.21.1
- CustomNPCs Unofficial
- JavaScript scripting inside in-game hooks

These notes are based on live tests performed in this repository, primarily with the prototype NPC at:

- `npc/prototype/npc_tempdata_proto`

The goal is to document what is actually usable when treating `tempdata` as a runtime object store for JS "classes", factories, and instances.

## Main Result

In the tested environment, `npc.getTempdata()` can hold live JavaScript objects with methods.

Observed behavior indicates that this is not limited to plain serialized data:

- Object methods remain callable after reading the object back from `tempdata`.
- Mutating object fields does not require re-saving the object with another `put(...)`.
- Nested objects remain live and mutable.
- Arrays remain live and mutable.
- Java objects stored inside JS objects remain live and usable.
- Objects created by factory methods can be stored inside other objects and remain usable across later interactions.

In practice, `tempdata` behaves like a live in-memory object graph for the current NPC lifecycle.

## Confirmed Behaviors

### 1. Methods survive storage in tempdata

Test pattern:

```js
var hello_world = {
    message: "Hello world",
    print: function() {
        npc.say(this.message);
    }
};

npc.getTempdata().put("hello_world_proto", hello_world);
```

Then later:

```js
var hello_world = npc.getTempdata().get("hello_world_proto");
hello_world.print();
```

Observed result:

- `print()` still works after loading from `tempdata`.

### 2. Field mutation persists without re-put

Test pattern:

```js
var counter = {
    value: 0,
    inc: function() {
        this.value++;
        npc.say("Counter: " + this.value);
    }
};
```

Observed result across repeated interactions:

- `value` increased `1 -> 2 -> 3`
- No extra `npc.getTempdata().put(...)` was required after mutation

This confirms that the stored object itself stays live in memory.

### 3. Method-to-method calls via `this` work

Test pattern:

```js
var chain = {
    profile: {
        title: "Archivist",
        rank: 7
    },
    bumpRank: function() {
        this.profile.rank++;
    },
    print: function() {
        npc.say(this.profile.title + " #" + this.profile.rank);
    },
    run: function() {
        this.bumpRank();
        this.print();
    }
};
```

Observed result:

- `run()` successfully called another method through `this`
- Nested state changed and stayed changed between interactions

### 4. Arrays and nested objects stay live

Test pattern:

```js
var spellbook = {
    spells: [
        { name: "fire", power: 10 },
        { name: "ice", power: 20 }
    ],
    upgrade: function() {
        this.spells[0].power += 5;
        this.spells.push({ name: "wind", power: this.spells.length * 10 });
    }
};
```

Observed result across repeated interactions:

- Nested object field updates persisted
- `push(...)` persisted
- Array length continued growing across later interactions

### 5. Shared references remain shared

Test pattern:

```js
var shared = { points: 0 };

var alias = {
    left: shared,
    right: shared,
    touchLeft: function() {
        this.left.points++;
    }
};
```

Observed result:

- Updating `left.points` also changed `right.points`
- Shared references are preserved as shared references

### 6. Java objects inside JS objects remain usable

Test pattern:

```js
var ArrayList = Java.type("java.util.ArrayList");

var javaBox = {
    list: new ArrayList(),
    add: function(value) {
        this.list.add(value);
    }
};
```

Observed result:

- Java `ArrayList` remained usable after storage in `tempdata`
- Contents accumulated across repeated interactions

### 7. Factory methods work

Test pattern:

```js
var factory = {
    seed: 0,
    createUnit: function(name) {
        this.seed++;
        return {
            id: this.seed,
            name: name,
            hp: 10,
            hit: function(damage) {
                this.hp -= damage;
            }
        };
    }
};
```

Observed result:

- Factory state persisted through `seed`
- New runtime instances could be created on demand
- Instances had working methods and mutable state

### 8. Factories can store created instances

Test pattern:

```js
var factory = {
    seed: 0,
    units: [],
    createUnit: function(name) {
        this.seed++;
        var unit = { ... };
        this.units.push(unit);
        return unit;
    }
};
```

Observed result:

- `factory.units` persisted across interactions
- Earlier created instances remained callable later
- Old instances kept their mutated state across later interactions

This confirms that `tempdata` can hold not just standalone objects, but object graphs where parent objects retain child instances.

### 9. Instance cloning works, but clone depth is manual

Test pattern:

```js
clone: function() {
    factory.seed++;
    var copy = {
        id: factory.seed,
        name: this.name + "_clone",
        hp: this.hp,
        meta: this.meta,
        hit: this.hit,
        clone: this.clone,
        print: this.print
    };
    factory.units.push(copy);
    return copy;
}
```

Observed result:

- Primitive fields such as `hp`, `id`, and `name` behaved independently
- Nested object `meta` was shared because the clone copied it as `meta: this.meta`
- Mutating clone `meta` also mutated original `meta`

Conclusion:

- Clone behavior is fully determined by how fields are copied
- The environment does not provide automatic deep cloning
- Deep-copy semantics must be implemented manually

## Practical Interpretation

In this environment, `tempdata` is usable as a runtime object registry for the current live NPC session.

You can realistically build:

- singleton-like runtime managers
- stateful helper objects
- factories
- live instances with methods
- parent/child object graphs
- arrays of live instances
- controlled clone/copy patterns

This is much stronger than a plain key-value scratchpad.

## Recommended Usage Pattern

For real NPC logic, prefer a structure like:

```js
var TEMP_RUNTIME_KEY = "runtime";

function init(event) {
    var npc = event.npc;

    var runtime = {
        tick: 0,
        units: [],
        nextId: 0,
        createUnit: function(name) {
            this.nextId++;
            var unit = {
                id: this.nextId,
                name: name,
                hp: 20,
                damage: function(amount) {
                    this.hp -= amount;
                }
            };
            this.units.push(unit);
            return unit;
        }
    };

    npc.getTempdata().put(TEMP_RUNTIME_KEY, runtime);
}
```

Then later:

```js
function interact(event) {
    var runtime = event.npc.getTempdata().get(TEMP_RUNTIME_KEY);
    runtime.tick++;
}
```

This is suitable when:

- the data only needs to live while the NPC instance is alive
- you want runtime convenience and method-based architecture
- you do not want to constantly serialize state into strings

## Important Limits

These tests confirm what works during a live runtime session, but they do not prove persistence across all lifecycle events.

Do not assume the same objects survive:

- server restart
- script reload
- NPC despawn/respawn
- world unload
- entity recreation

For anything that must survive lifecycle resets, use `storeddata` for durable state and rebuild runtime objects in `init`.

## Safe Engineering Rule

Use `tempdata` for live runtime objects.

Use `storeddata` for durable configuration and persistent state.

A strong pattern is:

1. Store durable raw state in `storeddata`
2. Build live runtime managers/classes in `tempdata`
3. Rebuild runtime objects from durable state whenever the NPC is initialized again

## What This Means For Design

You can safely design JS "class-like" systems for a live NPC using:

- methods on stored objects
- factories that create instances
- nested managers
- arrays of instances
- explicit clone logic

But you should still treat this as a live runtime layer, not as a save format.

## Summary

Confirmed usable:

- methods on stored objects
- persistent field mutation without re-put
- nested objects
- arrays
- shared references
- Java objects inside JS objects
- factories
- stored instance collections
- manual clone patterns

Confirmed caveat:

- clone depth is manual
- nested object copy semantics are exactly whatever you code

Best practical model:

- `tempdata` = live runtime memory
- `storeddata` = durable state
