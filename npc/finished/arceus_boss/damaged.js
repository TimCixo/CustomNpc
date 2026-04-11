var ArceusBoss_ItemEntity = Java.type("net.minecraft.world.entity.item.ItemEntity");
var ArceusBoss_MCItemStack = Java.type("net.minecraft.world.item.ItemStack");
var ArceusBoss_BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var ArceusBoss_ResourceLocation = Java.type("net.minecraft.resources.ResourceLocation");
var ArceusBoss_EntityType = Java.type("net.minecraft.world.entity.EntityType");
var ArceusBoss_System = Java.type("java.lang.System");

var ARCEUS_RUNTIME_KEY = "arceus_runtime";
var ARCEUS_CONFIG_KEY = "arceus_config_json";
var ARCEUS_LIFECYCLE_KEY = "arceus_lifecycle_json";
var ARCEUS_CONFIG_VERSION = 12;
var ARCEUS_ITEM_TYPE_CACHE = {};

var ARCEUS_PHASE3_GEMS = [
    "cobblemon:flying_gem",
    "cobblemon:psychic_gem",
    "cobblemon:bug_gem",
    "cobblemon:rock_gem",
    "cobblemon:ghost_gem",
    "cobblemon:dragon_gem",
    "cobblemon:dark_gem",
    "cobblemon:steel_gem",
    "cobblemon:fairy_gem",
    "cobblemon:normal_gem",
    "cobblemon:fire_gem",
    "cobblemon:water_gem",
    "cobblemon:grass_gem",
    "cobblemon:electric_gem",
    "cobblemon:ice_gem",
    "cobblemon:fighting_gem",
    "cobblemon:poison_gem",
    "cobblemon:ground_gem"
];

function damaged(event) {
    var runtime = ensureArceusRuntime(event.npc);
    attachCombatSubsystem(runtime);

    try {
        runtime.combat.onDamaged(event);
    } catch (e) {
        markRuntimeError(runtime, "damaged", e);
        try {
            cancelDamage(event);
        } catch (e2) {}
    }
}

function attachCombatSubsystem(runtime) {
    if (runtime.combat != null && runtime.combat.ready) return;

    runtime.combat = {
        ready: true,
        onDamaged: function(event) {
            damagedCore(event, runtime);
        }
    };
}

function damagedCore(event, runtime) {
    var npc = event.npc;
    var state = runtime.state;
    var config = runtime.config;

    if (!config.enabled) return;

    if (state.mode == "phase_transition") {
        cancelDamage(event);
        setEntityInvulnerable(npc, true);
        forcePhaseTransitionHealthFloor(npc, config, state.phase);
        clearEntityDamageVisuals(npc);
        return;
    }

    if (state.mode != "live") {
        cancelDamage(event);
        setEntityInvulnerable(npc, true);
        forceDeathSafeHealthFloor(npc, config);
        clearEntityDamageVisuals(npc);
        return;
    }

    var currentHp = readNpcHealth(npc);
    var maxHp = readNpcMaxHealth(npc);
    var incomingDamage = readDamage(event);
    var phase = state.phase;
    if (incomingDamage <= 0 || maxHp <= 0) return;

    incomingDamage = applyPhaseDamageMitigation(event, npc, phase, incomingDamage, config);
    var hpAfterHit = currentHp - incomingDamage;
    var phase2Threshold = maxHp * config.phase2Threshold;
    var phase3Threshold = maxHp * config.phase3Threshold;
    var deathThreshold = getArceusDeathThresholdHp(maxHp, config);

    recordDamageContribution(event, npc, incomingDamage, runtime);

    if (phase <= 1 && hpAfterHit <= phase2Threshold) {
        cancelDamage(event);
        enterPhase(
            npc,
            runtime,
            2,
            config.phase2HealTo,
            "\u00A76\u0410\u0440\u043A\u0435\u0443\u0441 \u043C\u0435\u043D\u044F\u0435\u0442 \u0430\u0441\u043F\u0435\u043A\u0442 \u0438 \u0432\u0445\u043E\u0434\u0438\u0442 \u0432\u043E \u0432\u0442\u043E\u0440\u0443\u044E \u0441\u0442\u0430\u0434\u0438\u044E!",
            "yellow",
            config.stage2Sound
        );
        return;
    }

    if (phase == 2 && hpAfterHit <= phase3Threshold) {
        cancelDamage(event);
        var phase2DropCount = getStageDropCountToThreshold(runtime, 2, currentHp, phase3Threshold, maxHp);
        enterPhase(
            npc,
            runtime,
            3,
            config.phase3HealTo,
            "\u00A74\u0410\u0440\u043A\u0435\u0443\u0441 \u0432\u044B\u0441\u0432\u043E\u0431\u043E\u0436\u0434\u0430\u0435\u0442 \u0438\u0441\u0442\u0438\u043D\u043D\u0443\u044E \u0441\u0438\u043B\u0443. \u0422\u0440\u0435\u0442\u044C\u044F \u0441\u0442\u0430\u0434\u0438\u044F!",
            "red",
            config.stage3Sound
        );
        dropConfiguredItem(npc, config.phase2PinataItem, phase2DropCount, config);
        return;
    }

    if (phase >= 3 && hpAfterHit <= deathThreshold) {
        cancelDamage(event);
        setEntityInvulnerable(npc, true);
        state.mode = "custom_death_start";
        state.customDeathTicksLeft = config.customDeathTicks;
        state.leaderboardAnnounced = false;
        state.rewardsGiven = false;
        state.rewardCursor = 0;
        state.deathCommitted = false;
        state.deathLineStage = 0;
        state.deathAnimStarted = false;
        state.deathFinalizeDone = false;
        setNpcHealthSafe(npc, deathThreshold);
        forceDeathSafeHealthFloor(npc, config);
        stopCombatForDeath(npc);
        dropRandomGems(npc, getStageDropCountToThreshold(runtime, 3, currentHp, deathThreshold, maxHp), config);
        persistRuntimeState(runtime);
        return;
    }

    if (phase == 2) {
        dropConfiguredItem(
            npc,
            config.phase2PinataItem,
            getStageDropCountForHit(runtime, 2, currentHp, hpAfterHit, maxHp),
            config
        );
    } else if (phase >= 3) {
        dropRandomGems(npc, getStageDropCountForHit(runtime, 3, currentHp, hpAfterHit, maxHp), config);
    }

    persistRuntimeState(runtime);
}

function enterPhase(npc, runtime, phase, healFraction, line, bossBarColor, soundId) {
    var state = runtime.state;
    var config = runtime.config;
    var maxHp = readNpcMaxHealth(npc);
    var targetHp = Math.max(1, Math.floor(maxHp * healFraction));

    state.phase = phase;
    state.mode = "phase_transition";
    state.transitionTicksLeft = config.transitionTicks;
    state.pendingPhaseEffect = {
        phase: phase,
        line: line,
        bossBarColor: bossBarColor,
        soundId: soundId == null ? "" : ("" + soundId)
    };
    state.deathCommitted = false;
    state.customDeathTicksLeft = 0;
    state.deathLineStage = 0;
    state.deathAnimStarted = false;
    state.deathFinalizeDone = false;
    state.respawnVisualResetTicks = 0;
    state.stageDrops["" + phase] = 0;

    setEntityInvulnerable(npc, true);
    setNpcHealthSafe(npc, targetHp);
    forcePhaseTransitionHealthFloor(npc, config, phase);
    clearEntityDamageVisuals(npc);
    stopCombatForDeath(npc);

    applyPhaseVisuals(npc, runtime);
    persistRuntimeState(runtime);
}

function applyPhaseVisuals(npc, runtime) {
    var effect = runtime.state.pendingPhaseEffect;
    if (effect == null) return;

    if (hasText(effect.line)) {
        safeSay(npc, effect.line);
    }

    applyBossBarColor(npc, effect.bossBarColor);
    playSoundForAllPlayers(npc, effect.soundId, 1.2, 1.0);
    applyPhaseMeleeDelay(npc, runtime.config, effect.phase);
    runtime.state.pendingPhaseEffect = null;
}

function recordDamageContribution(event, npc, damage, runtime) {
    var attacker = resolveDamageDealer(event, npc);
    if (attacker == null) return;

    var uuid = safeAttackerUuid(attacker);
    if (!hasText(uuid)) return;

    var name = getAttackerName(attacker);
    var current = runtime.state.damageMap[uuid];
    if (current == null) {
        current = { uuid: uuid, name: name, damage: 0 };
        runtime.state.damageMap[uuid] = current;
    }

    current.name = name;
    current.damage += damage;
    runtime.state.liveSnapshot = buildSortedSnapshot(runtime.state.damageMap);
    appendRecentDamageContribution(runtime.state, uuid, name, damage);
}

function appendRecentDamageContribution(state, uuid, name, damage) {
    if (state.recentHits[uuid] == null) {
        state.recentHits[uuid] = [];
    }

    var list = state.recentHits[uuid];
    list.push({
        time: ArceusBoss_System.currentTimeMillis(),
        damage: damage,
        name: name
    });

    if (list.length > 20) {
        list.splice(0, list.length - 20);
    }
}

function buildSortedSnapshot(map) {
    var out = [];

    for (var key in map) {
        if (!map.hasOwnProperty(key)) continue;
        var entry = map[key];
        if (entry == null || entry.damage <= 0) continue;
        out.push({
            uuid: entry.uuid,
            name: hasText(entry.name) ? entry.name : entry.uuid,
            damage: entry.damage
        });
    }

    out.sort(function(a, b) {
        return b.damage - a.damage;
    });
    return out;
}

function getStageDropCountForHit(runtime, phase, hpBefore, hpAfter, maxHp) {
    var config = runtime.config;
    var stageStartHp = getStageStartHp(config, phase, maxHp);
    var stageEndHp = getStageEndHp(config, phase, maxHp);
    var totalDrops = getStageTotalDrops(runtime, phase);
    if (totalDrops <= 0) return 0;

    var before = clampHpToStage(hpBefore, stageStartHp, stageEndHp);
    var after = clampHpToStage(hpAfter, stageStartHp, stageEndHp);
    var shouldHaveDropped = getDropsEarnedByHp(stageStartHp, stageEndHp, after, totalDrops);
    var alreadyDropped = getStageDropsGiven(runtime, phase);
    var toDrop = shouldHaveDropped - alreadyDropped;

    if (toDrop <= 0) return 0;

    setStageDropsGiven(runtime, phase, alreadyDropped + toDrop);
    return toDrop;
}

function getStageDropCountToThreshold(runtime, phase, hpBefore, thresholdHp, maxHp) {
    return getStageDropCountForHit(runtime, phase, hpBefore, thresholdHp, maxHp);
}

function getStageStartHp(config, phase, maxHp) {
    if (phase == 2) return maxHp * config.phase2HealTo;
    return maxHp * config.phase3HealTo;
}

function getStageEndHp(config, phase, maxHp) {
    if (phase == 2) return maxHp * config.phase3Threshold;
    return getArceusDeathThresholdHp(maxHp, config);
}

function clampHpToStage(hp, stageStartHp, stageEndHp) {
    if (hp > stageStartHp) return stageStartHp;
    if (hp < stageEndHp) return stageEndHp;
    return hp;
}

function getDropsEarnedByHp(stageStartHp, stageEndHp, hpNow, totalDrops) {
    var span = stageStartHp - stageEndHp;
    if (span <= 0) return totalDrops;

    var progress = (stageStartHp - hpNow) / span;
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;

    return Math.floor(progress * totalDrops);
}

function getStageTotalDrops(runtime, phase) {
    var participants = Math.max(1, runtime.state.liveSnapshot.length);
    var base = phase == 2 ? configInt(runtime.config.phase2TotalDropsBase, 8) : configInt(runtime.config.phase3TotalDropsBase, 3);
    var perExtra = phase == 2 ? configInt(runtime.config.phase2TotalDropsPerExtraPlayer, 4) : configInt(runtime.config.phase3TotalDropsPerExtraPlayer, 2);
    var max = phase == 2 ? configInt(runtime.config.phase2TotalDropsMax, 24) : configInt(runtime.config.phase3TotalDropsMax, 12);
    var total = base + Math.max(0, participants - 1) * perExtra;

    if (max > 0 && total > max) total = max;
    return total < 0 ? 0 : total;
}

function getStageDropsGiven(runtime, phase) {
    return parseIntSafe(runtime.state.stageDrops["" + phase], 0);
}

function setStageDropsGiven(runtime, phase, value) {
    runtime.state.stageDrops["" + phase] = Math.max(0, parseIntSafe(value, 0));
}

function applyPhaseDamageMitigation(event, npc, phase, damage, config) {
    if (damage <= 0 || phase < 2) return damage;

    try {
        if (event.damageSource != null && event.damageSource.isProjectile()) {
            var reduced = damage * 0.5;
            reflectProjectileDamageToPlayer(event, npc, damage - reduced, config);
            writeDamage(event, reduced);
            return reduced;
        }
    } catch (e) {}

    return damage;
}

function reflectProjectileDamageToPlayer(event, npc, reflectDamage, config) {
    if (reflectDamage <= 0) return;

    var attacker = resolveDamageDealer(event, npc);
    if (attacker == null || !isPlayerAttacker(attacker)) return;

    var mcTarget = unwrapMcEntity(attacker);
    if (mcTarget == null) return;

    try {
        shootReflectArrow(npc, mcTarget, reflectDamage, config);
    } catch (e) {}
}

function shootReflectArrow(npc, mcTarget, damage, config) {
    var shooter = npc.getMCEntity();
    var level = shooter.level();
    var arrow = ArceusBoss_EntityType.ARROW.create(level);
    if (arrow == null) return;

    var eyeY = shooter.getY() + shooter.getEyeHeight() - 0.1;
    var targetY = mcTarget.getY() + mcTarget.getBbHeight() * 0.35;
    var dx = mcTarget.getX() - shooter.getX();
    var dy = targetY - eyeY;
    var dz = mcTarget.getZ() - shooter.getZ();

    arrow.setPos(shooter.getX(), eyeY, shooter.getZ());
    arrow.setOwner(shooter);
    arrow.setBaseDamage(getHalfArmorAdjustedProjectileDamage(mcTarget, damage));
    arrow.shoot(dx, dy, dz, configFloat(config.reflectArrowSpeed, 2.2), configFloat(config.reflectArrowInaccuracy, 0.2));
    level.addFreshEntity(arrow);
}

function getHalfArmorAdjustedProjectileDamage(mcTarget, baseDamage) {
    var armor = getArmorValue(mcTarget);
    var fullMultiplier = getArmorTakenMultiplier(armor);
    var halfMultiplier = getArmorTakenMultiplier(armor * 0.5);
    if (fullMultiplier <= 0.01) return baseDamage;
    return baseDamage * (halfMultiplier / fullMultiplier);
}

function getArmorValue(mcEntity) {
    try {
        return mcEntity.getArmorValue();
    } catch (e) {
        return 0;
    }
}

function getArmorTakenMultiplier(armorValue) {
    var reduction = armorValue * 0.04;
    if (reduction < 0) reduction = 0;
    if (reduction > 0.8) reduction = 0.8;
    return 1.0 - reduction;
}

function dropConfiguredItem(npc, itemId, count, config) {
    if (!hasText(itemId) || count <= 0) return;

    var left = Math.floor(count);
    while (left > 0) {
        var stackSize = left > 64 ? 64 : left;
        spawnScatterItem(npc, itemId, stackSize, config);
        left -= stackSize;
    }
}

function dropRandomGems(npc, count, config) {
    for (var i = 0; i < count; i++) {
        spawnScatterItem(npc, pickRandomGemId(), 1, config);
    }
}

function spawnScatterItem(npc, itemId, amount, config) {
    if (!hasText(itemId)) return;

    try {
        var itemType = getCachedItemType(itemId);
        if (itemType == null) return;

        var stack = new ArceusBoss_MCItemStack(itemType, Math.max(1, Math.floor(amount)));
        if (stack == null || stack.isEmpty()) return;

        var level = npc.getMCEntity().level();
        var drop = new ArceusBoss_ItemEntity(level, npc.getX(), npc.getY() + 1.2, npc.getZ(), stack);
        drop.setDeltaMovement(
            randomSigned(config.pinataSpeedMin, config.pinataSpeedMax),
            config.pinataVerticalBoost + Math.random() * 0.18,
            randomSigned(config.pinataSpeedMin, config.pinataSpeedMax)
        );
        level.addFreshEntity(drop);
    } catch (e) {}
}

function getCachedItemType(itemId) {
    var cached = ARCEUS_ITEM_TYPE_CACHE[itemId];
    if (cached !== undefined) return cached;

    var item = null;
    try {
        item = ArceusBoss_BuiltInRegistries.ITEM.get(ArceusBoss_ResourceLocation.parse(itemId));
    } catch (e) {
        item = null;
    }

    ARCEUS_ITEM_TYPE_CACHE[itemId] = item;
    return item;
}

function pickRandomGemId() {
    var index = Math.floor(Math.random() * ARCEUS_PHASE3_GEMS.length);
    if (index < 0) index = 0;
    if (index >= ARCEUS_PHASE3_GEMS.length) index = ARCEUS_PHASE3_GEMS.length - 1;
    return ARCEUS_PHASE3_GEMS[index];
}

function randomSigned(min, max) {
    var low = Math.min(min, max);
    var high = Math.max(min, max);
    var speed = low + Math.random() * (high - low);
    return Math.random() < 0.5 ? -speed : speed;
}

function resolveDamageDealer(event, npc) {
    var attacker = null;

    try {
        if (event.damageSource != null && event.damageSource.getTrueSource() != null) {
            attacker = event.damageSource.getTrueSource();
        }
    } catch (e) {}

    if (attacker == null) {
        try {
            if (event.source != null) attacker = event.source;
        } catch (e2) {}
    }

    return resolveDamageOwner(npc, attacker);
}

function resolveDamageOwner(npc, attacker) {
    if (attacker == null) return null;
    if (isPlayerAttacker(attacker)) return attacker;

    var directOwner = resolveOwnerEntity(attacker);
    if (directOwner != null) {
        if (isPlayerAttacker(directOwner)) return directOwner;
        attacker = directOwner;
    }

    var ownerUuid = readOwnerUuid(attacker);
    if (hasText(ownerUuid)) {
        var ownerPlayer = findPlayerByUuid(npc, ownerUuid);
        if (ownerPlayer != null) return ownerPlayer;
    }

    var mcEntity = unwrapMcEntity(attacker);
    if (mcEntity != null) {
        var mcOwner = resolveOwnerEntity(mcEntity);
        if (mcOwner != null && isPlayerAttacker(mcOwner)) return mcOwner;
    }

    return attacker;
}

function resolveOwnerEntity(target) {
    if (target == null) return null;
    return callZeroArg(target, "getOwner")
        || callZeroArg(target, "owner")
        || callZeroArg(target, "getOwnerEntity")
        || callZeroArg(target, "getPlayerOwner")
        || callZeroArg(target, "getOwnerPlayer");
}

function readOwnerUuid(target) {
    if (target == null) return "";
    return normalizeUuidValue(callZeroArg(target, "getOwnerUUID"))
        || normalizeUuidValue(callZeroArg(target, "getOwnerUuid"))
        || normalizeUuidValue(callZeroArg(target, "getOwnerId"));
}

function normalizeUuidValue(value) {
    if (value == null) return "";
    try {
        if (value.isPresent && value.isPresent()) value = value.get();
    } catch (e) {}
    try {
        return trimString("" + value);
    } catch (e2) {
        return "";
    }
}

function callZeroArg(target, methodName) {
    if (target == null || !methodName) return null;
    try {
        if (target[methodName]) return target[methodName]();
    } catch (e) {}
    return null;
}

function findPlayerByUuid(npc, uuid) {
    try {
        var players = npc.getWorld().getAllPlayers();
        if (players == null) return null;
        for (var i = 0; i < players.length; i++) {
            if (("" + players[i].getUUID()) == ("" + uuid)) return players[i];
        }
    } catch (e) {}
    return null;
}

function safeAttackerUuid(attacker) {
    try {
        return "" + attacker.getUUID();
    } catch (e) {
        return "";
    }
}

function getAttackerName(attacker) {
    try {
        var name = "" + attacker.getDisplayName();
        if (hasText(name) && name != "null") return name;
    } catch (e) {}
    try {
        var name2 = "" + attacker.getName();
        if (hasText(name2) && name2 != "null") return name2;
    } catch (e2) {}
    return "Unknown";
}

function isPlayerAttacker(attacker) {
    try {
        if (attacker.getType && attacker.getType() == 1) return true;
    } catch (e) {}
    try {
        var className = "" + attacker.getClass().getName();
        if (className.indexOf("Player") >= 0) return true;
    } catch (e2) {}
    return false;
}

function unwrapMcEntity(entity) {
    if (entity == null) return null;
    try {
        if (entity.getMCEntity) return entity.getMCEntity();
    } catch (e) {}
    return null;
}

function applyPhaseMeleeDelay(npc, config, phase) {
    try {
        var melee = npc.getStats().getMelee();
        var currentDelay = melee.getDelay();
        var baseDelay = currentDelay >= 1 ? currentDelay : 12;
        var multiplier = 1.0;
        if (phase == 2) multiplier = config.phase2MeleeDelayMult;
        if (phase >= 3) multiplier = config.phase3MeleeDelayMult;
        melee.setDelay(Math.max(1, Math.round(baseDelay * multiplier)));
    } catch (e) {}
}

function playSoundForAllPlayers(npc, soundId, volume, pitch) {
    if (!hasText(soundId)) return;
    try {
        var players = npc.getWorld().getAllPlayers();
        if (players == null) return;
        for (var i = 0; i < players.length; i++) {
            players[i].playSound(soundId, volume, pitch);
        }
    } catch (e) {}
}

function safeSay(npc, line) {
    if (!hasText(line)) return;
    try {
        npc.say(line);
    } catch (e) {
        try {
            broadcastBossMessage(npc, line);
        } catch (e2) {}
    }
}

function broadcastBossMessage(npc, message) {
    if (!hasText(message)) return;
    try {
        var players = npc.getWorld().getAllPlayers();
        if (players == null) return;
        for (var i = 0; i < players.length; i++) {
            players[i].message(message);
        }
    } catch (e) {}
}

function forcePhaseTransitionHealthFloor(npc, config, phase) {
    var maxHp = readNpcMaxHealth(npc);
    var healFraction = phase >= 3 ? config.phase3HealTo : config.phase2HealTo;
    setNpcHealthSafe(npc, Math.max(1, Math.floor(maxHp * healFraction)));
}

function forceDeathSafeHealthFloor(npc, config) {
    var maxHp = readNpcMaxHealth(npc);
    setNpcHealthSafe(npc, getArceusDeathThresholdHp(maxHp, config));
}

function getArceusDeathThresholdHp(maxHp, config) {
    var threshold = maxHp * config.customDeathThresholdPercent;
    if (threshold < config.customDeathThresholdMinHp) {
        threshold = config.customDeathThresholdMinHp;
    }
    return threshold < 1 ? 1 : threshold;
}

function stopCombatForDeath(npc) {
    try {
        npc.setAttackTarget(null);
    } catch (e) {}
    try {
        npc.getMCEntity().setTarget(null);
    } catch (e2) {}
    try {
        npc.setMoveForward(0);
        npc.setMoveStrafing(0);
        npc.setMoveVertical(0);
    } catch (e3) {}
}

function setNpcHealthSafe(npc, value) {
    var target = Math.max(1, Math.floor(value));
    try {
        npc.setHealth(target);
        return;
    } catch (e) {}
    try {
        npc.getMCEntity().setHealth(target);
    } catch (e2) {}
}

function setEntityInvulnerable(npc, enabled) {
    try {
        npc.getMCEntity().setInvulnerable(enabled ? true : false);
    } catch (e) {}
}

function clearEntityDamageVisuals(npc) {
    try {
        npc.getMCEntity().invulnerableTime = 0;
    } catch (e) {}
    try {
        npc.getMCEntity().hurtTime = 0;
    } catch (e2) {}
    try {
        npc.getMCEntity().hurtDuration = 0;
    } catch (e3) {}
    try {
        npc.getMCEntity().deathTime = 0;
    } catch (e4) {}
}

function applyBossBarColor(npc, colorName) {
    var colorId = 0;
    if (colorName == "yellow") colorId = 4;
    if (colorName == "red") colorId = 2;
    try {
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().setBossColor) {
            npc.getDisplay().setBossColor(colorId);
        }
    } catch (e) {}
}

function readDamage(event) {
    try {
        return event.getDamage();
    } catch (e) {}
    try {
        return event.damage;
    } catch (e2) {}
    return 0;
}

function writeDamage(event, value) {
    try {
        event.setDamage(value);
        return;
    } catch (e) {}
    try {
        event.damage = value;
    } catch (e2) {}
}

function cancelDamage(event) {
    try {
        event.setCanceled(true);
    } catch (e) {}
    writeDamage(event, 0);
}

function readNpcHealth(npc) {
    try {
        return npc.getHealth();
    } catch (e) {
        return 0;
    }
}

function readNpcMaxHealth(npc) {
    try {
        return npc.getMaxHealth();
    } catch (e) {
        return 0;
    }
}

function ensureArceusRuntime(npc) {
    var temp = npc.getTempdata();
    var runtime = null;

    try {
        runtime = temp.get(ARCEUS_RUNTIME_KEY);
    } catch (e) {
        runtime = null;
    }

    var config = mergeConfig(parseJsonSafe(npc.getStoreddata().get(ARCEUS_CONFIG_KEY)));
    var state = mergeLifecycle(parseJsonSafe(npc.getStoreddata().get(ARCEUS_LIFECYCLE_KEY)));

    if (runtime == null || runtime.version != ARCEUS_CONFIG_VERSION) {
        runtime = {
            version: ARCEUS_CONFIG_VERSION,
            npc: npc,
            config: config,
            state: state,
            combat: {},
            phases: {},
            deathFlow: {},
            rewards: {},
            leaderboard: {},
            visuals: {},
            clockLink: {},
            debug: {}
        };
        temp.put(ARCEUS_RUNTIME_KEY, runtime);
        return runtime;
    }

    runtime.npc = npc;
    runtime.config = config;
    runtime.state = state;
    if (runtime.state.whoisCache == null) runtime.state.whoisCache = {};
    return runtime;
}

function persistRuntimeState(runtime) {
    runtime.npc.getStoreddata().put(ARCEUS_LIFECYCLE_KEY, JSON.stringify(runtime.state));
}

function markRuntimeError(runtime, hook, error) {
    if (runtime == null || runtime.state == null) return;
    if (runtime.state.debug == null) {
        runtime.state.debug = { lastErrorHook: "-", lastErrorMessage: "-" };
    }
    runtime.state.debug.lastErrorHook = hook == null ? "-" : ("" + hook);
    runtime.state.debug.lastErrorMessage = sanitizeErrorMessage(error);
    persistRuntimeState(runtime);
}

function sanitizeErrorMessage(error) {
    try {
        var text = trimString("" + error);
        return text.length > 200 ? text.substring(0, 200) : text;
    } catch (e) {
        return "unknown";
    }
}

function parseJsonSafe(raw) {
    if (raw == null || raw == "" || raw == "null") return null;
    try {
        return JSON.parse("" + raw);
    } catch (e) {
        return null;
    }
}

function createDefaultConfig() {
    return {
        version: ARCEUS_CONFIG_VERSION,
        enabled: true,
        phase2Threshold: 0.10,
        phase3Threshold: 0.10,
        phase2HealTo: 0.72,
        phase3HealTo: 0.45,
        transitionTicks: 40,
        phase2DamageMult: 1.20,
        phase3DamageMult: 1.45,
        phase3FlatBonus: 4,
        phase3ArmorBypassBonus: 8.0,
        phase2MeleeDelayMult: 0.7,
        phase3MeleeDelayMult: 0.5,
        reflectArrowSpeed: 2.2,
        reflectArrowInaccuracy: 0.2,
        customDeathTicks: 80,
        customDeathThresholdPercent: 0.02,
        customDeathThresholdMinHp: 20,
        pinataSpeedMin: 0.20,
        pinataSpeedMax: 0.55,
        pinataVerticalBoost: 0.28,
        phase2PinataItem: "cobblemon:rare_candy",
        phase2TotalDropsBase: 8,
        phase2TotalDropsPerExtraPlayer: 4,
        phase2TotalDropsMax: 24,
        phase3TotalDropsBase: 3,
        phase3TotalDropsPerExtraPlayer: 2,
        phase3TotalDropsMax: 12,
        stage2Sound: "cobblemon:pokemon.arceus.cry",
        stage3Sound: "cobblemon:pokemon.arceus.cry"
    };
}

function mergeConfig(raw) {
    var base = createDefaultConfig();
    if (raw == null) return base;
    for (var key in base) {
        if (!base.hasOwnProperty(key)) continue;
        if (raw[key] === undefined || raw[key] === null) continue;
        base[key] = raw[key];
    }
    return base;
}

function createDefaultLifecycle() {
    return {
        mode: "live",
        phase: 1,
        transitionTicksLeft: 0,
        customDeathTicksLeft: 0,
        damageMap: {},
        liveSnapshot: [],
        frozenSnapshot: [],
        rewardCursor: 0,
        leaderboardAnnounced: false,
        rewardsGiven: false,
        deathCommitted: false,
        pendingPhaseEffect: null,
        respawnVisualResetTicks: 0,
        nextAggroRefreshAt: 0,
        stageDrops: { "2": 0, "3": 0 },
        recentHits: {},
        deathLineStage: 0,
        deathAnimStarted: false,
        deathFinalizeDone: false,
        whoisCache: {},
        debug: {
            lastErrorHook: "-",
            lastErrorMessage: "-"
        }
    };
}

function mergeLifecycle(raw) {
    var base = createDefaultLifecycle();
    if (raw == null) return base;
    for (var key in base) {
        if (!base.hasOwnProperty(key)) continue;
        if (raw[key] === undefined || raw[key] === null) continue;
        base[key] = raw[key];
    }
    if (base.damageMap == null) base.damageMap = {};
    if (base.liveSnapshot == null) base.liveSnapshot = [];
    if (base.frozenSnapshot == null) base.frozenSnapshot = [];
    if (base.stageDrops == null) base.stageDrops = { "2": 0, "3": 0 };
    if (base.recentHits == null) base.recentHits = {};
    if (base.whoisCache == null) base.whoisCache = {};
    if (base.debug == null) base.debug = { lastErrorHook: "-", lastErrorMessage: "-" };
    return base;
}

function parseIntSafe(value, def) {
    try {
        var parsed = parseInt("" + value, 10);
        return isNaN(parsed) ? def : parsed;
    } catch (e) {
        return def;
    }
}

function configInt(value, def) {
    return parseIntSafe(value, def);
}

function configFloat(value, def) {
    return parseFloatSafe(value, def);
}

function parseFloatSafe(value, def) {
    try {
        var parsed = parseFloat("" + value);
        return isNaN(parsed) ? def : parsed;
    } catch (e) {
        return def;
    }
}

function hasText(value) {
    return value != null && trimString(value).length > 0;
}

function trimString(value) {
    return ("" + value).replace(/^\s+|\s+$/g, "");
}
