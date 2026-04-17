# NPC Template Package

Minimal GitHub-loader-friendly NPC package.

## Start Here

Use this template as the default starting point for one NPC package.

Style:

- keep hooks thin;
- move repeated logic into `shared/core.js`;
- add new hooks only when the NPC really needs them;
- only add bridge helpers when typings and runtime actually disagree.

## Layout

```text
template/
  README.md
  jsconfig.json
  hooks/
    init.js
    interact.js
    timer.js
  shared/
    __shared.js
    core.js
```

## How To Grow It

1. Start with `init.js`, `interact.js`, and `shared/core.js`.
2. If logic repeats between hooks, move it into `shared/core.js`.
3. If the NPC needs more hooks, add them into `hooks/` in `hooks/<hook>.js` format.
4. Keep each hook focused on entry-point behavior, not on holding the whole system.

## References

- Loader example: [src/npc/prototype/github_loader_shared_demo](/e:/Projects/CustomNpc/src/npc/prototype/github_loader_shared_demo)
- Typing and bridge example: [src/npc/technical/enchantment_giver](/e:/Projects/CustomNpc/src/npc/technical/enchantment_giver)
