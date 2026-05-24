# Arceus Boss

Boss package for `CustomNPCs Unofficial` on `Minecraft 1.21.1`.

## Package Layout

This package is structured for the GitHub NPC Loader format:

- `hooks/` - one file per CustomNPCs hook
- `shared/` - CommonJS-style shared modules loaded through `__shared.js`

## Hooks

- `init.js` -> `init`
- `damaged.js` -> `damaged`
- `meleeAttack.js` -> `meleeAttack`
- `timer.js` -> `timer`
- `died.js` -> `died`
- `interact.js` -> `interact`

## Shared Modules

- `__shared.js` - shared alias coordinator
- `utils.js` - parsing, permissions, small helpers
- `config.js` - durable config from `arceus_config_json`
- `state.js` - live boss state cached in NPC tempdata
- `npc.js` - hook routing and timer bootstrap
- `visuals.js` - bossbar, sounds, particles, and launch effects
- `combat.js` - damaged-event combat flow and live damage tracking
- `phases.js` - phase transitions and phase-specific flow
- `rewards.js` - phase drop helpers
- `death_flow.js` - custom death countdown, final rewards, physical death
- `attacks.js` - melee attack logic and godmode handling

## Runtime Model

- Durable state lives in `storeddata`.
- Live combat/runtime state lives in `tempdata`.
- Hook files cache the compiled `__shared` factory in tempdata as `__shared_compiled`.
- Hot runtime data is not spread across many per-hit storeddata keys.
- Hook files stay thin and delegate to shared modules.

Primary durable keys:

- `arceus_config_json`

## Current Behavior

- 3 combat phases driven by HP thresholds from config
- phase transition pauses combat briefly and restores live mode after transition
- phase 2 and phase 3 apply passive regeneration
- phase 2 and phase 3 strengthen boss attacks
- phase start applies visuals, sound, bossbar updates, and player launch
- live damage is tracked in tempdata state for rewards
- phase 3 lethal damage starts a custom death sequence instead of instant death
- death flow:
  - starts visible spin/animation
  - grants reward Pokemon from the final damage ranking
  - moves Arceus below the arena
  - plays the configured death sound
  - performs physical NPC death

## Interactions

- hook files stay thin and delegate to `shared.npc`
- operator-facing controls should be routed through `npc.js` when added

## Notes

- This package no longer uses legacy per-key Arceus config migration.
- The only persistent config source is `arceus_config_json`.
- Shared files are kept in loader-managed NPC memory; hooks remain separate script tabs.
