# GitHub Loader Shared Demo

Minimal test package for `items/github_npc_loader`.

Structure:

```text
github_loader_shared_demo/
  hooks/
    init.js
    interact.js
  shared/
    demo_shared.js
```

Expected behavior:

1. Load this folder with the GitHub loader item.
2. Apply it to an NPC.
3. On first init, the NPC storeddata gets default keys from shared code.
4. Each right click on the NPC increments a stored counter.
5. The player sees the counter value and the last player name.

Main validation goal:

- `shared/*.js` is saved by the loader
- hook scripts can call shared functions
- shared logic persists through `npc.getStoreddata()`
