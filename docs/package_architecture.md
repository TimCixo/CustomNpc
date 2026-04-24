# Package Architecture

## Package Shape

The current NPC package model in this repository is:

```text
package/
  hooks/
    init.js
    interact.js
    timer.js
    damaged.js
    died.js
    attack.js
    meleeAttack.js
    ...
  shared/
    __shared.js
    *.js
```

This is the layout expected by the current GitHub NPC Loader.

## Hooks

Hook files are entry points for CustomNPCs events.

They should stay thin:

- read `event`
- load shared modules
- call one shared function

Example:

```js
function requireShared(event) {
    var npc = event.npc;
    var data = npc.getStoreddata();
    var factorySource = "" + data.get("__shared");
    var factory = null;

    if (factorySource == null || factorySource == "" || factorySource == "null" || factorySource == "undefined") {
        throw "Shared coordinator `__shared` is missing in npc storeddata. Reapply the package with the loader item.";
    }

    factory = (1, eval)(factorySource);
    if (typeof factory != "function") {
        throw "Shared coordinator `__shared` is invalid. Reapply the package with the loader item.";
    }

    return factory(event);
}

function timer(event) {
    var shared = requireShared(event);
    shared.timers.onTimer(event);
}
```

## Shared Modules

Shared modules live under `shared/` and use CommonJS-like exports:

```js
function ensureState(npc) {
    return npc;
}

module.exports = {
    ensureState: ensureState
};
```

They are not Node.js modules.
They are reconstructed in the NPC runtime from loader-managed shared sources.

## `__shared.js`

`shared/__shared.js` is the alias coordinator.

Example:

```js
module.exports = {
    runtime: "runtime.js",
    combat: "combat.js",
    visuals: "visuals.js"
};
```

This allows hooks to use stable aliases like:

```js
var shared = requireShared(event);
shared.runtime.initBoss(event.npc);
```

## Small Example Package

```text
demo_package/
  hooks/
    init.js
    interact.js
  shared/
    __shared.js
    runtime.js
```

`hooks/init.js`:

```js
function requireShared(event) {
    var factory = (1, eval)("" + event.npc.getStoreddata().get("__shared"));
    return factory(event);
}

function init(event) {
    var shared = requireShared(event);
    shared.runtime.initNpc(event.npc);
}
```

`shared/__shared.js`:

```js
module.exports = {
    runtime: "runtime.js"
};
```

`shared/runtime.js`:

```js
function initNpc(npc) {
    npc.say("init");
}

module.exports = {
    initNpc: initNpc
};
```

## Anti-Patterns

Avoid these patterns in current packages:

- monolithic single-file hook bundles for large systems
- merged hook code where `init`, `timer`, `damaged`, and `died` all live in one script tab body
- injecting loader-specific bootstrap code into hook bodies
- storing live combat state through many per-hit storeddata keys
- assuming hook globals are shared automatically between files
- using Node.js `require`, `module`, `fs`, or package APIs
- modern JS syntax that Nashorn may not support
