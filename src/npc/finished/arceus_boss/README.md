# Arceus Boss

Boss package for `CustomNPCs Unofficial` on `Minecraft 1.21.1`.

## Package Layout

This package is structured for the GitHub NPC Loader format:

- `hooks/` - one file per CustomNPCs hook
- `shared/` - CommonJS-style shared modules loaded through `__shared.js`

## Hooks

- `init.js` -> `init`
- `damaged.js` -> `damaged`
- `attack.js` -> `attack`
- `meleeAttack.js` -> `meleeAttack`
- `timer.js` -> `timer`
- `died.js` -> `died`
- `interact.js` -> `interact`

## Shared Modules

- `__shared.js` - shared alias coordinator
- `utils.js` - parsing, permissions, small helpers
- `config.js` - durable config from `arceus_config_json`
- `lifecycle.js` - durable lifecycle snapshot in `arceus_lifecycle_json`
- `runtime.js` - runtime bootstrap, reset, mode switching, combat-ready state
- `visuals.js` - bossbar, sounds, particles, respawn announce, launch effects
- `clock_link.js` - respawn clock integration
- `combat.js` - damaged-event combat flow and live damage tracking
- `damage.js` - low-level health, damage, mitigation, projectile helpers
- `phases.js` - phase transitions and phase-specific flow
- `rewards.js` - phase drop helpers
- `timers.js` - timer dispatcher, aggro reacquisition, regen, transition ticking
- `death_flow.js` - custom death countdown, leaderboard timing, rewards, physical death
- `leaderboard.js` - live and frozen damage snapshots
- `attacks.js` - melee attack logic, godmode handling, whois cache

## Runtime Model

- Durable state lives in `storeddata`.
- Live combat/runtime state lives in `tempdata`.
- Hot runtime data is not spread across many per-hit storeddata keys.
- Hook files stay thin and delegate to shared modules.

Primary durable keys:

- `arceus_config_json`
- `arceus_lifecycle_json`
- `respawn_clock_main_uuid`
- `respawn_clock_respawn_seconds`

## Current Behavior

- 3 combat phases driven by HP thresholds from config
- phase transition pauses combat briefly and restores live mode after transition
- phase 2 and phase 3 apply passive regeneration
- phase 2 and phase 3 strengthen boss attacks
- phase start applies visuals, sound, bossbar updates, and player launch
- live damage is tracked in runtime for leaderboard and rewards
- phase 3 lethal damage starts a custom death sequence instead of instant death
- death flow:
  - starts visible spin/animation
  - moves Arceus 10 blocks underground exactly once
  - freezes damage snapshot
  - prints leaderboard
  - grants reward Pokemon
  - prints vanish line
  - performs physical NPC death
  - final `died` hook prints the confirmed death line and notifies the respawn clock

## Interactions

- normal players do not get technical debug output
- operator right click shows runtime/debug status
- operator Shift + right click resets the boss runtime
- operator clock-linker interaction binds the respawn clock

## Respawn

On respawn/live reset the boss announces:

- `Аркеус возродился [Телепортироваться]`

The teleport part is sent as a clickable chat action that runs:

- `/warp arceus_coliseum`

## Notes

- This package no longer uses legacy per-key Arceus config migration.
- The only persistent config source is `arceus_config_json`.
- Shared files are kept in loader-managed NPC memory; hooks remain separate script tabs.
