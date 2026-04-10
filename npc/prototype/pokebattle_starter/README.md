# Pokebattle Starter

CustomNPCs prototype for Minecraft 1.21.1 + CustomNPCs Unofficial + Cobblemon.

## Hooks

- `init.js` -> NPC `init`
- `interact/interact.js` -> NPC `interact`
- `timer.js` -> NPC `timer`

## What It Does

On right-click, the CustomNPC creates a configured Cobblemon Pokemon entity and starts a Cobblemon PvE battle with the player through `BattleBuilder.pve(...)`.

Cobblemon needs a tracked Pokemon entity for the battle UI to receive normal action prompts. By default, the anchor entity is spawned but repeatedly hidden by the timer: invisible, silent, no gravity, invulnerable, and no AI. Set `pokebattle_spawn_visible` to `1` only if you want to see the opponent entity in the world.

The battle Pokemon is marked with Cobblemon's `uncatchable` property before the battle starts. This is the reliable CustomNPC-only path: even a Master Ball cannot capture it, and Cobblemon shows its standard capture rejection message.

Note: a custom NPC line on each capture attempt was tested through CustomNPC scripts, but Cobblemon rejects `uncatchable` Pokemon before the battle capture action exists, and the Cobblemon event subscription did not work reliably from this script context. Use a small mod-side listener for `CobblemonEvents` if a custom capture-attempt line is required.

The timer hook runs every tick, keeps the hidden anchor hidden during battle, and removes it after the Cobblemon battle is no longer active.

This does not use Cobblemon `BattleBuilder.pvn(...)`, because that API expects a Cobblemon `NPCEntity`, not a CustomNPCs NPC.

## StoredData Config

These keys are created automatically in `init`:

- `pokebattle_enabled`: `1` or `0`
- `pokebattle_species`: default `cobblemon:pikachu`
- `pokebattle_level`: default `15`
- `pokebattle_shiny`: `1` or `0`
- `pokebattle_spawn_visible`: default `0`; set `1` to make the spawned battle anchor visible
- `pokebattle_heal_player_first`: `1` or `0`
- `pokebattle_clone_player_party`: `1` or `0`
- `pokebattle_flee_distance`: default `16`; this keeps Cobblemon's physical flee flow available
- `pokebattle_cooldown_ms`: default `3000`
- `pokebattle_capture_message`: reserved for a future mod-side capture-attempt listener; not used by the CustomNPC-only script
