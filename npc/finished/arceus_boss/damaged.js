var ArceusBoss_ItemEntity = Java.type("net.minecraft.world.entity.item.ItemEntity");
var ArceusBoss_MCItemStack = Java.type("net.minecraft.world.item.ItemStack");
var ArceusBoss_BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var ArceusBoss_ResourceLocation = Java.type("net.minecraft.resources.ResourceLocation");
var ArceusBoss_EntityType = Java.type("net.minecraft.world.entity.EntityType");
var ArceusBoss_System = Java.type("java.lang.System");
var ARCEUS_DEATH_TIMER_ID = 2;
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
    try {
        damagedCore(event);
    } catch (e) {
        recordScriptErrorFromEvent(event, "damaged", e);
        try {
            cancelDamage(event);
        } catch (e0) {}

        try {
            var npc = event.npc;
            forcePhaseTransitionHealthFloor(npc);
            setEntityInvulnerable(npc, true);
            restartDeathTimer(npc);
        } catch (e1) {}
    }
}

function damagedCore(event) {
    var npc = event.npc;
    var data = npc.getStoreddata();
    var deathCommitting = data.get("arceus_death_committing") == "1";
    var deathLocked = data.get("arceus_death_lock") == "1";

    if (data.get("arceus_enabled") != "1") return;
    if (deathCommitting) return;
    if (deathLocked) {
        cancelDamage(event);
        forceDeathSafeHealthFloor(npc);
        setEntityInvulnerable(npc, true);
        return;
    }

    if (data.get("arceus_dying") == "1") {
        cancelDamage(event);
        forceDeathSafeHealthFloor(npc);
        setEntityInvulnerable(npc, true);
        return;
    }

    var currentPhase = parseIntSafe(data.get("arceus_phase"), 1);
    var currentHp = readNpcHealth(npc);
    var maxHp = readNpcMaxHealth(npc);
    var incomingDamage = readDamage(event);
    var hpAfterHit = currentHp - incomingDamage;
    var deathThreshold = getArceusDeathThresholdHp(npc);

    if (parseIntSafe(data.get("arceus_transition_ticks_left"), 0) > 0) {
        cancelDamage(event);
        forcePhaseTransitionHealthFloor(npc);
        setEntityInvulnerable(npc, true);

        if (currentPhase >= 3 && incomingDamage > 0 && currentHp <= deathThreshold) {
            recordDamageContribution(event, npc, incomingDamage);
            armCustomDeathLock(npc);
            dropRandomGems(npc, getStageDropCountToThreshold(npc, 3, currentHp, deathThreshold, maxHp));
            forceDeathSafeHealthFloor(npc);
            requestCustomDeath(event, npc, "damaged");
        }

        return;
    }

    incomingDamage = applyPhaseDamageMitigation(event, npc, currentPhase, incomingDamage);
    hpAfterHit = currentHp - incomingDamage;
    var phase2Threshold = maxHp * getCfgFloat(npc, "arceus_phase2_threshold", 0.10);
    var phase3Threshold = maxHp * getCfgFloat(npc, "arceus_phase3_threshold", 0.10);

    if (incomingDamage > 0) {
        recordDamageContribution(event, npc, incomingDamage);
    }

    if (currentPhase >= 3 && currentHp <= deathThreshold) {
        armCustomDeathLock(npc);
        cancelDamage(event);
        forceDeathSafeHealthFloor(npc);
        dropRandomGems(npc, getStageDropCountToThreshold(npc, 3, currentHp, deathThreshold, maxHp));
        requestCustomDeath(event, npc, "damaged");
        return;
    }

    if (currentPhase <= 1 && hpAfterHit <= phase2Threshold) {
        cancelDamage(event);
        enterPhase(
            npc,
            2,
            getCfgFloat(npc, "arceus_phase2_heal_to", 0.72),
            "§6Аркеус меняет аспект и входит во вторую стадию!",
            "yellow",
            "arceus_stage2_sound"
        );
        return;
    }

    if (currentPhase == 2 && hpAfterHit <= phase3Threshold) {
        cancelDamage(event);
        var phase2DropCount = getStageDropCountToThreshold(npc, 2, currentHp, phase3Threshold, maxHp);
        enterPhase(
            npc,
            3,
            getCfgFloat(npc, "arceus_phase3_heal_to", 0.45),
            "§4Аркеус высвобождает истинную силу. Третья стадия!",
            "red",
            "arceus_stage3_sound"
        );
        dropConfiguredItem(npc, "" + data.get("arceus_phase2_pinata_item"), phase2DropCount);
        return;
    }

    if (currentPhase >= 3 && hpAfterHit <= deathThreshold) {
        armCustomDeathLock(npc);
        cancelDamage(event);
        forceDeathSafeHealthFloor(npc);
        dropRandomGems(npc, getStageDropCountToThreshold(npc, 3, currentHp, deathThreshold, maxHp));
        requestCustomDeath(event, npc, "damaged");
        return;
    }

    if (currentPhase == 2) {
        dropConfiguredItem(
            npc,
            "" + data.get("arceus_phase2_pinata_item"),
            getStageDropCountForHit(npc, 2, currentHp, hpAfterHit, maxHp)
        );
        return;
    }

    if (currentPhase >= 3) {
        dropRandomGems(npc, getStageDropCountForHit(npc, 3, currentHp, hpAfterHit, maxHp));
    }
}

function enterPhase(npc, phase, healFraction, line, bossBarColor, soundKey) {
    var data = npc.getStoreddata();
    var maxHp = readNpcMaxHealth(npc);
    var targetHp = Math.max(1, Math.floor(maxHp * healFraction));

    data.put("arceus_dying", "0");
    data.put("arceus_death_committing", "0");
    data.put("arceus_death_lock", "0");
    data.put("arceus_death_request", "0");
    data.put("arceus_death_request_source", "-");
    data.put("arceus_death_request_hp", "0");
    data.put("arceus_death_request_threshold_hp", "0");
    data.put("arceus_death_finalized", "0");
    data.put("arceus_death_ticks_left", "0");
    data.put("arceus_death_line_stage", "0");
    data.put("arceus_phase", "" + phase);
    data.put("arceus_transition_ticks_left", "" + getCfgInt(npc, "arceus_transition_ticks", 40));
    data.put("arceus_pulse_ticks", "0");
    if (phase == 2) data.put("arceus_phase2_drops_given", "0");
    if (phase == 3) data.put("arceus_phase3_drops_given", "0");

    data.put("arceus_phase_start_pending", "1");
    data.put("arceus_pending_phase_hp", "" + targetHp);
    data.put("arceus_pending_phase_id", "" + phase);
    setEntityInvulnerable(npc, true);
    setNpcHealthSafe(npc, targetHp);
    forcePhaseTransitionHealthFloor(npc);
    schedulePhaseEffects(npc, line, bossBarColor, soundKey);
}

function formatDamage(value) {
    var rounded = Math.floor(value * 10 + 0.5) / 10;
    if (rounded == Math.floor(rounded)) {
        return "" + Math.floor(rounded);
    }
    return "" + rounded;
}

function requestCustomDeath(event, npc, source) {
    var data = npc.getStoreddata();
    if (data.get("arceus_dying") == "1") return;
    if (data.get("arceus_death_committing") == "1") return;

    armCustomDeathLock(npc);
    data.put("arceus_death_request", "1");
    data.put("arceus_death_committing", "0");
    data.put("arceus_transition_ticks_left", "0");
    data.put("arceus_phase_start_pending", "0");
    data.put("arceus_phase_effects_pending", "0");
    cancelDamage(event);
    setEntityInvulnerable(npc, true);
    forceDeathSafeHealthFloor(npc);
    stopCombatForDeath(npc);
    restartDeathTimer(npc);

    var threshold = getArceusDeathThresholdHp(npc);
    data.put("arceus_death_request_source", source == null ? "damaged" : ("" + source));
    data.put("arceus_death_request_hp", formatDamage(readNpcHealth(npc)));
    data.put("arceus_death_request_threshold_hp", formatDamage(threshold));
}

function armCustomDeathLock(npc) {
    try {
        npc.getStoreddata().put("arceus_death_lock", "1");
    } catch (e) {}
}

function setEntityInvulnerable(npc, enabled) {
    try {
        npc.getMCEntity().setInvulnerable(enabled ? true : false);
    } catch (e) {}
}

function dropConfiguredItem(npc, itemId, count) {
    if (itemId == null || itemId == "" || itemId == "null") return;
    if (count == null || count <= 0) return;

    var left = Math.floor(count);
    while (left > 0) {
        var stackSize = left > 64 ? 64 : left;
        spawnScatterItem(npc, itemId, stackSize);
        left -= stackSize;
    }
}

function dropRandomGems(npc, count) {
    if (count == null || count <= 0) return;

    for (var i = 0; i < count; i++) {
        spawnScatterItem(npc, pickRandomGemId());
    }
}

function spawnScatterItem(npc, itemId, amount) {
    if (itemId == null || itemId == "" || itemId == "null") return;
    var stackSize = amount == null ? 1 : Math.max(1, Math.floor(amount));

    try {
        var itemType = getCachedItemType(itemId);
        if (itemType == null) return;

        var stack = new ArceusBoss_MCItemStack(itemType, stackSize);
        if (stack == null || stack.isEmpty()) return;

        var level = npc.getMCEntity().level();
        var drop = new ArceusBoss_ItemEntity(level, npc.getX(), npc.getY() + 1.2, npc.getZ(), stack);

        drop.setDeltaMovement(
            randomSigned(
                getCfgFloat(npc, "arceus_pinata_speed_min", 0.20),
                getCfgFloat(npc, "arceus_pinata_speed_max", 0.55)
            ),
            getCfgFloat(npc, "arceus_pinata_vertical_boost", 0.28) + Math.random() * 0.18,
            randomSigned(
                getCfgFloat(npc, "arceus_pinata_speed_min", 0.20),
                getCfgFloat(npc, "arceus_pinata_speed_max", 0.55)
            )
        );

        level.addFreshEntity(drop);
    } catch (e) {}
}

function schedulePhaseEffects(npc, line, bossBarColor, soundKey) {
    var data = npc.getStoreddata();
    data.put("arceus_phase_effects_pending", "1");
    data.put("arceus_pending_phase_line", line == null ? "" : ("" + line));
    data.put("arceus_pending_phase_color", bossBarColor == null ? "" : ("" + bossBarColor));

    var soundId = "" + data.get(soundKey);
    if (soundId == null || soundId == "null") soundId = "";
    data.put("arceus_pending_phase_sound", soundId);
}

function pickRandomGemId() {
    if (ARCEUS_PHASE3_GEMS == null || ARCEUS_PHASE3_GEMS.length <= 0) return null;
    var index = Math.floor(Math.random() * ARCEUS_PHASE3_GEMS.length);
    if (index < 0) index = 0;
    if (index >= ARCEUS_PHASE3_GEMS.length) index = ARCEUS_PHASE3_GEMS.length - 1;
    return ARCEUS_PHASE3_GEMS[index];
}

function getStageDropCountForHit(npc, phase, hpBefore, hpAfter, maxHp) {
    var stageStartHp = getStageStartHp(npc, phase, maxHp);
    var stageEndHp = getStageEndHp(npc, phase, maxHp);
    var totalDrops = getStageTotalDrops(npc, phase);
    if (totalDrops <= 0) return 0;

    var before = clampHpToStage(hpBefore, stageStartHp, stageEndHp);
    var after = clampHpToStage(hpAfter, stageStartHp, stageEndHp);
    var shouldHaveDropped = getDropsEarnedByHp(stageStartHp, stageEndHp, after, totalDrops);
    var alreadyDropped = getStageDropsGiven(npc, phase);
    var toDrop = shouldHaveDropped - alreadyDropped;

    if (toDrop <= 0) return 0;

    setStageDropsGiven(npc, phase, alreadyDropped + toDrop);
    return toDrop;
}

function getStageDropCountToThreshold(npc, phase, hpBefore, thresholdHp, maxHp) {
    return getStageDropCountForHit(npc, phase, hpBefore, thresholdHp, maxHp);
}

function getStageStartHp(npc, phase, maxHp) {
    if (phase == 2) return maxHp * getCfgFloat(npc, "arceus_phase2_heal_to", 0.72);
    return maxHp * getCfgFloat(npc, "arceus_phase3_heal_to", 0.45);
}

function getStageEndHp(npc, phase, maxHp) {
    if (phase == 2) return maxHp * getCfgFloat(npc, "arceus_phase3_threshold", 0.10);
    return getArceusDeathThresholdHp(npc);
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

function getStageTotalDrops(npc, phase) {
    var prefix = phase == 2 ? "arceus_phase2_total_drops" : "arceus_phase3_total_drops";
    var fallbackBase = phase == 2 ? 8 : 3;
    var fallbackPerExtra = phase == 2 ? 4 : 2;
    var fallbackMax = phase == 2 ? 24 : 12;
    var participants = getDamageParticipantCount(npc);
    var base = getCfgInt(npc, prefix + "_base", fallbackBase);
    var perExtra = getCfgInt(npc, prefix + "_per_extra_player", fallbackPerExtra);
    var max = getCfgInt(npc, prefix + "_max", fallbackMax);
    var total = base + perExtra * Math.max(0, participants - 1);

    if (max > 0 && total > max) total = max;
    if (total < 0) total = 0;
    return total;
}

function getDamageParticipantCount(npc) {
    var count = getCfgInt(npc, "arceus_damage_participant_count", 0);
    return count <= 0 ? 1 : count;
}

function getStageDropsGiven(npc, phase) {
    var key = phase == 2 ? "arceus_phase2_drops_given" : "arceus_phase3_drops_given";
    return getCfgInt(npc, key, 0);
}

function setStageDropsGiven(npc, phase, value) {
    var key = phase == 2 ? "arceus_phase2_drops_given" : "arceus_phase3_drops_given";
    npc.getStoreddata().put(key, "" + value);
}

function recordDamageContribution(event, npc, damage) {
    var attacker = resolveDamageDealer(event, npc);
    if (attacker == null) return;

    var data = npc.getStoreddata();
    var uuid = safeAttackerUuid(attacker);
    if (uuid == null || uuid == "") return;

    var damageKey = "arceus_dmg_" + uuid;
    var nameKey = "arceus_dmg_name_" + uuid;
    var previous = parseFloatSafe(data.get(damageKey), 0);
    var total = previous + damage;

    data.put(damageKey, "" + total);
    var attackerName = getAttackerName(attacker);
    data.put(nameKey, attackerName);
    if (previous <= 0 && isPlayerAttacker(attacker)) {
        incrementDamageParticipantCount(data);
    }
    appendRecentDamageContribution(data, uuid, attackerName, damage);
}

function incrementDamageParticipantCount(data) {
    var count = parseIntSafe(data.get("arceus_damage_participant_count"), 0);
    data.put("arceus_damage_participant_count", "" + (count + 1));
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
            if (event.source != null) {
                attacker = event.source;
            }
        } catch (e2) {}
    }

    return resolveDamageOwner(npc, attacker);
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
        if (name != null && name != "" && name != "null") return name;
    } catch (e) {}

    try {
        var name2 = "" + attacker.getName();
        if (name2 != null && name2 != "" && name2 != "null") return name2;
    } catch (e2) {}

    try {
        var name3 = "" + attacker.getEntityName();
        if (name3 != null && name3 != "" && name3 != "null") return name3;
    } catch (e3) {}

    return "Unknown";
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
    if (ownerUuid != null && ownerUuid != "") {
        var ownerPlayer = findPlayerByUuid(npc, ownerUuid);
        if (ownerPlayer != null) return ownerPlayer;
    }

    var mcEntity = unwrapMcEntity(attacker);
    if (mcEntity != null) {
        var mcOwner = resolveOwnerEntity(mcEntity);
        if (mcOwner != null) {
            if (isPlayerAttacker(mcOwner)) return mcOwner;

            var mcOwnerUuid = readOwnerUuid(mcOwner);
            if (mcOwnerUuid != null && mcOwnerUuid != "") {
                var ownerByMc = findPlayerByUuid(npc, mcOwnerUuid);
                if (ownerByMc != null) return ownerByMc;
            }
        }

        var nestedOwnerUuid = readOwnerUuid(mcEntity);
        if (nestedOwnerUuid != null && nestedOwnerUuid != "") {
            var nestedOwnerPlayer = findPlayerByUuid(npc, nestedOwnerUuid);
            if (nestedOwnerPlayer != null) return nestedOwnerPlayer;
        }
    }

    return attacker;
}

function resolveOwnerEntity(target) {
    if (target == null) return null;

    var owner = callZeroArg(target, "getOwner");
    if (owner != null) return owner;

    owner = callZeroArg(target, "owner");
    if (owner != null) return owner;

    owner = callZeroArg(target, "getOwnerEntity");
    if (owner != null) return owner;

    owner = callZeroArg(target, "getPlayerOwner");
    if (owner != null) return owner;

    owner = callZeroArg(target, "getOwnerPlayer");
    if (owner != null) return owner;

    return null;
}

function readOwnerUuid(target) {
    if (target == null) return "";

    var value = callZeroArg(target, "getOwnerUUID");
    if (!hasText(normalizeUuidValue(value))) {
        value = callZeroArg(target, "getOwnerUuid");
    }
    if (!hasText(normalizeUuidValue(value))) {
        value = callZeroArg(target, "getOwnerId");
    }

    return normalizeUuidValue(value);
}

function normalizeUuidValue(value) {
    if (value == null) return "";

    try {
        if (value.isPresent && value.isPresent()) {
            value = value.get();
        }
    } catch (e) {}

    try {
        if (value.get && ("" + value.getClass().getName()).indexOf("Optional") >= 0) {
            value = value.get();
        }
    } catch (e2) {}

    try {
        return trimString("" + value);
    } catch (e3) {
        return "";
    }
}

function hasText(value) {
    return value != null && trimString(value).length > 0;
}

function trimString(s) {
    return ("" + s).replace(/^\s+|\s+$/g, "");
}

function findPlayerByUuid(npc, uuid) {
    if (npc == null || !hasText(uuid)) return null;

    try {
        var players = npc.getWorld().getAllPlayers();
        if (players == null) return null;

        for (var i = 0; i < players.length; i++) {
            var player = players[i];
            try {
                if (("" + player.getUUID()) == ("" + uuid)) return player;
            } catch (e) {}
        }
    } catch (e2) {}

    return null;
}

function callZeroArg(target, methodName) {
    if (target == null || methodName == null || methodName == "") return null;

    try {
        if (target[methodName]) {
            return target[methodName]();
        }
    } catch (e) {}

    return null;
}

function appendRecentDamageContribution(data, uuid, name, damage) {
    if (data == null || !hasText(uuid) || damage <= 0) return;

    var now = ArceusBoss_System.currentTimeMillis();
    var cutoff = now - 5000;
    var hitsKey = "arceus_recent_hits_" + uuid;
    var nameKey = "arceus_recent_name_" + uuid;
    var cleaned = pruneRecentHitString("" + data.get(hitsKey), cutoff);
    var entry = now + ":" + damage;

    if (cleaned.length > 0) {
        cleaned += "|" + entry;
    } else {
        cleaned = entry;
    }

    cleaned = limitRecentHitTokens(cleaned, 20);
    data.put(hitsKey, cleaned);
    data.put(nameKey, name == null ? uuid : ("" + name));
}

function limitRecentHitTokens(raw, limit) {
    var text = raw == null || raw == "null" ? "" : ("" + raw);
    if (text.length <= 0) return "";

    var parts = text.split("|");
    var max = parseIntSafe(limit, 20);
    if (max <= 0 || parts.length <= max) return text;

    var kept = [];
    for (var i = parts.length - max; i < parts.length; i++) {
        kept.push(parts[i]);
    }

    return kept.join("|");
}

function pruneRecentHitString(raw, cutoff) {
    var text = raw == null || raw == "null" ? "" : ("" + raw);
    if (text.length <= 0) return "";

    var parts = text.split("|");
    var kept = [];

    for (var i = 0; i < parts.length; i++) {
        var token = trimString(parts[i]);
        if (token.length <= 0) continue;

        var colon = token.indexOf(":");
        if (colon <= 0) continue;

        var ts = parseIntSafe(token.substring(0, colon), 0);
        if (ts < cutoff) continue;

        kept.push(token);
    }

    return kept.join("|");
}

function playConfiguredSound(npc, key) {
    var soundId = "" + npc.getStoreddata().get(key);
    if (soundId == null || soundId == "" || soundId == "null") return;

    try {
        var players = npc.getWorld().getAllPlayers();
        if (players != null) {
            for (var i = 0; i < players.length; i++) {
                players[i].playSound(soundId, 1.2, 1.0);
            }
        }
        return;
    } catch (e) {}
}

function randomSigned(min, max) {
    var low = Math.min(min, max);
    var high = Math.max(min, max);
    var speed = low + Math.random() * (high - low);
    return Math.random() < 0.5 ? -speed : speed;
}

function getCachedItemType(itemId) {
    var key = "" + itemId;
    if (ARCEUS_ITEM_TYPE_CACHE.hasOwnProperty(key)) {
        return ARCEUS_ITEM_TYPE_CACHE[key];
    }

    var itemType = null;
    try {
        itemType = ArceusBoss_BuiltInRegistries.ITEM.get(ArceusBoss_ResourceLocation.parse(key));
    } catch (e) {
        itemType = null;
    }

    ARCEUS_ITEM_TYPE_CACHE[key] = itemType;
    return itemType;
}

function forceHealthFloor(npc) {
    try {
        if (npc.getHealth() < 1) {
            npc.setHealth(1);
        }
    } catch (e) {}
}

function forcePhaseTransitionHealthFloor(npc) {
    var data = npc.getStoreddata();
    var floor = parseFloatSafe(data.get("arceus_pending_phase_hp"), 0);

    if (floor <= 0 && (data.get("arceus_death_lock") == "1"
        || data.get("arceus_death_request") == "1"
        || data.get("arceus_dying") == "1")) {
        floor = getArceusDeathThresholdHp(npc);
    }

    if (floor <= 0) floor = 1;

    try {
        if (npc.getHealth() < floor) {
            setNpcHealthSafe(npc, floor);
        }
    } catch (e) {}
}

function forceDeathSafeHealthFloor(npc) {
    var floor = getArceusDeathThresholdHp(npc);
    if (floor < 1) floor = 1;

    try {
        if (npc.getHealth() < floor) {
            setNpcHealthSafe(npc, floor);
        }
    } catch (e) {}
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

function getArceusDeathThresholdHp(npc) {
    var maxHp = readNpcMaxHealth(npc);
    var percent = getCfgFloat(npc, "arceus_custom_death_threshold_percent", 0.02);
    var minHp = getCfgFloat(npc, "arceus_custom_death_threshold_min_hp", 20);

    if (percent < 0) percent = 0;
    if (minHp < 1) minHp = 1;
    if (maxHp <= 0) return minHp;

    var threshold = maxHp * percent;
    if (threshold < minHp) threshold = minHp;
    if (threshold < 1) threshold = 1;
    return threshold;
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

function applyPhaseDamageMitigation(event, npc, phase, damage) {
    if (damage <= 0) return damage;
    if (phase < 2) return damage;

    try {
        if (event.damageSource != null && event.damageSource.isProjectile()) {
            var reduced = damage * 0.5;
            reflectProjectileDamageToPlayer(event, npc, damage - reduced);
            writeDamage(event, reduced);
            return reduced;
        }
    } catch (e) {}

    return damage;
}

function reflectProjectileDamageToPlayer(event, npc, reflectDamage) {
    if (reflectDamage <= 0) return;

    var attacker = resolveDamageDealer(event, npc);
    if (attacker == null) return;
    if (!isPlayerAttacker(attacker)) return;

    var mcTarget = unwrapMcEntity(attacker);
    if (mcTarget == null) return;

    try {
        shootReflectArrow(npc, mcTarget, reflectDamage);
        return;
    } catch (e) {}
}

function isPlayerAttacker(attacker) {
    try {
        var type = attacker.getType();
        if (type == 1) return true;
    } catch (e) {}

    try {
        var className = "" + attacker.getClass().getName();
        if (className.indexOf("PlayerWrapper") >= 0) return true;
        if (className.indexOf("ServerPlayer") >= 0) return true;
        if (className.indexOf(".player.") >= 0) return true;
        if (className.indexOf("Player") >= 0) return true;
    } catch (e2) {}

    return false;
}

function shootReflectArrow(npc, mcTarget, damage) {
    if (mcTarget == null || damage <= 0) return;

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
    arrow.shoot(
        dx,
        dy,
        dz,
        getCfgFloat(npc, "arceus_reflect_arrow_speed", 2.2),
        getCfgFloat(npc, "arceus_reflect_arrow_inaccuracy", 0.2)
    );

    level.addFreshEntity(arrow);
}

function getHalfArmorAdjustedProjectileDamage(mcTarget, baseDamage) {
    var armor = getArmorValue(mcTarget);
    var fullMultiplier = getArmorTakenMultiplier(armor);
    var halfMultiplier = getArmorTakenMultiplier(armor * 0.5);

    if (fullMultiplier <= 0.01) {
        return baseDamage;
    }

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

function unwrapMcEntity(entity) {
    if (entity == null) return null;

    try {
        if (entity.getMCEntity) return entity.getMCEntity();
    } catch (e) {}

    return null;
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

    try {
        event.setDamage(0);
    } catch (e2) {}

    try {
        event.damage = 0;
    } catch (e3) {}
}

function readNpcHealth(npc) {
    try {
        return npc.getHealth();
    } catch (e) {
        return 1;
    }
}

function readNpcMaxHealth(npc) {
    try {
        return npc.getMaxHealth();
    } catch (e) {
        return 1;
    }
}

function safeSay(npc, text) {
    try {
        npc.say(text);
    } catch (e) {}
}

function getCfgInt(npc, key, def) {
    return parseIntSafe(npc.getStoreddata().get(key), def);
}

function getCfgFloat(npc, key, def) {
    return parseFloatSafe(npc.getStoreddata().get(key), def);
}

function recordScriptErrorFromEvent(event, hook, error) {
    try {
        if (event != null && event.npc != null) {
            recordScriptError(event.npc, hook, error);
        }
    } catch (e) {}
}

function recordScriptError(npc, hook, error) {
    try {
        var data = npc.getStoreddata();
        data.put("arceus_dbg_last_error_hook", hook == null ? "-" : ("" + hook));
        data.put("arceus_dbg_last_error_message", sanitizeErrorMessage(error));
    } catch (e) {}
}

function sanitizeErrorMessage(error) {
    var text = "";

    try {
        text = "" + error;
    } catch (e) {
        text = "unknown";
    }

    text = text.replace(/\r/g, " ").replace(/\n/g, " ").replace(/\t/g, " ");
    if (text.length > 180) text = text.substring(0, 180);
    return text;
}

function applyBossBarColor(npc, colorName) {
    if (colorName == null || colorName == "") return;

    var colorId = mapBossBarColorId(colorName);

    try {
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().setBossColor) {
            npc.getDisplay().setBossColor(colorId);
            return;
        }
    } catch (e) {}

    try {
        if (npc.display && npc.display.setBossColor) {
            npc.display.setBossColor(colorId);
            return;
        }
    } catch (e2) {}
}

function updateNpcClient(npc) {
    try {
        npc.updateClient();
    } catch (e) {}
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

function restartDeathTimer(npc) {
    try {
        var ticks = getCfgInt(npc, "arceus_death_timer_ticks", 1);
        if (ticks < 1) ticks = 1;
        npc.timers.forceStart(ARCEUS_DEATH_TIMER_ID, ticks, true);
    } catch (e) {}
}

function applyPhaseMeleeDelay(npc, phase) {
    try {
        var data = npc.getStoreddata();
        var baseDelay = getBaseMeleeDelay(npc, data);
        var delay = Math.max(1, Math.round(baseDelay * getPhaseMeleeDelayMultiplier(npc, phase)));
        npc.getStats().getMelee().setDelay(delay);
        data.put("arceus_applied_melee_phase", "" + phase);
    } catch (e) {}
}

function getBaseMeleeDelay(npc, data) {
    try {
        var value = npc.getStats().getMelee().getDelay();
        if (value >= 1) {
            var appliedPhase = parseIntSafe(data.get("arceus_applied_melee_phase"), 0);
            if (appliedPhase > 0) {
                var appliedMultiplier = getPhaseMeleeDelayMultiplier(npc, appliedPhase);
                if (appliedMultiplier > 0) {
                    return Math.max(1, Math.round(value / appliedMultiplier));
                }
            }
            return value;
        }
    } catch (e) {}
    return 12;
}

function getPhaseMeleeDelayMultiplier(npc, phase) {
    var key = "arceus_phase1_melee_delay_mult";
    var def = 1.0;
    if (phase == 2) {
        key = "arceus_phase2_melee_delay_mult";
        def = 0.7;
    } else if (phase >= 3) {
        key = "arceus_phase3_melee_delay_mult";
        def = 0.5;
    }

    var value = getCfgFloat(npc, key, def);
    if (value <= 0) return def;
    return value;
}

function mapBossBarColorId(colorName) {
    var key = ("" + colorName).toLowerCase();
    if (key == "pink") return 0;
    if (key == "blue") return 1;
    if (key == "red") return 2;
    if (key == "green") return 3;
    if (key == "yellow") return 4;
    if (key == "purple") return 5;
    if (key == "white") return 6;
    return 6;
}

function parseIntSafe(s, def) {
    try {
        var value = parseInt("" + s, 10);
        return isNaN(value) ? def : value;
    } catch (e) {
        return def;
    }
}

function parseFloatSafe(s, def) {
    try {
        var value = parseFloat("" + s);
        return isNaN(value) ? def : value;
    } catch (e) {
        return def;
    }
}
