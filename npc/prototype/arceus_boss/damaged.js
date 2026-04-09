var ArceusBoss_ItemEntity = Java.type("net.minecraft.world.entity.item.ItemEntity");
var ArceusBoss_MCItemStack = Java.type("net.minecraft.world.item.ItemStack");
var ArceusBoss_BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var ArceusBoss_ResourceLocation = Java.type("net.minecraft.resources.ResourceLocation");
var ArceusBoss_EntityType = Java.type("net.minecraft.world.entity.EntityType");

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
    var npc = event.npc;
    var data = npc.getStoreddata();

    if (data.get("arceus_enabled") != "1") return;
    if (data.get("arceus_dead") == "1") return;

    if (data.get("arceus_dying") == "1") {
        cancelDamage(event);
        forceHealthFloor(npc);
        return;
    }

    if (parseIntSafe(data.get("arceus_transition_ticks_left"), 0) > 0) {
        cancelDamage(event);
        return;
    }

    var currentPhase = parseIntSafe(data.get("arceus_phase"), 1);
    var currentHp = readNpcHealth(npc);
    var maxHp = readNpcMaxHealth(npc);
    var incomingDamage = readDamage(event);
    incomingDamage = applyPhaseDamageMitigation(event, npc, currentPhase, incomingDamage);
    var hpAfterHit = currentHp - incomingDamage;
    var phase2Threshold = maxHp * getCfgFloat(npc, "arceus_phase2_threshold", 0.10);
    var phase3Threshold = maxHp * getCfgFloat(npc, "arceus_phase3_threshold", 0.10);

    if (incomingDamage > 0) {
        recordDamageContribution(event, npc, incomingDamage);
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
        dropConfiguredItem(
            npc,
            "" + data.get("arceus_phase2_pinata_item"),
            getStageDropCountToThreshold(npc, 2, currentHp, phase3Threshold, maxHp)
        );
        enterPhase(
            npc,
            3,
            getCfgFloat(npc, "arceus_phase3_heal_to", 0.45),
            "§4Аркеус высвобождает истинную силу. Третья стадия!",
            "red",
            "arceus_stage3_sound"
        );
        return;
    }

    if (currentPhase >= 3 && hpAfterHit <= 0.5) {
        cancelDamage(event);
        dropRandomGems(npc, getStageDropCountToThreshold(npc, 3, currentHp, 0.5, maxHp));
        startCustomDeath(npc);
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

    data.put("arceus_phase", "" + phase);
    data.put("arceus_transition_ticks_left", "" + getCfgInt(npc, "arceus_transition_ticks", 40));
    data.put("arceus_pulse_ticks", "0");
    if (phase == 2) data.put("arceus_phase2_drops_given", "0");
    if (phase == 3) data.put("arceus_phase3_drops_given", "0");

    try {
        npc.setHealth(targetHp);
    } catch (e) {}

    applyPhaseMeleeDelay(npc, phase);
    applyBossBarColor(npc, bossBarColor);
    playConfiguredSound(npc, soundKey);
    updateNpcClient(npc);
    safeSay(npc, line);
}

function startCustomDeath(npc) {
    var data = npc.getStoreddata();

    data.put("arceus_dying", "1");
    data.put("arceus_death_ticks_left", "" + getCfgInt(npc, "arceus_custom_death_ticks", 80));
    data.put("arceus_death_line_stage", "0");
    data.put("arceus_death_anim_started", "0");

    forceHealthFloor(npc);
    stopCombatForDeath(npc);
    restartDeathTimer(npc);
    playConfiguredSound(npc, "arceus_death_sound");
    safeSay(npc, "§5Аркеус не падает. Он начинает собственную смерть.");
}

function dropConfiguredItem(npc, itemId, count) {
    if (itemId == null || itemId == "" || itemId == "null") return;
    if (count == null || count <= 0) return;

    for (var i = 0; i < count; i++) {
        spawnScatterItem(npc, itemId);
    }
}

function dropRandomGems(npc, count) {
    if (count == null || count <= 0) return;

    for (var i = 0; i < count; i++) {
        spawnScatterItem(npc, pickRandomGemId());
    }
}

function spawnScatterItem(npc, itemId) {
    if (itemId == null || itemId == "" || itemId == "null") return;

    try {
        var itemType = ArceusBoss_BuiltInRegistries.ITEM.get(ArceusBoss_ResourceLocation.parse(itemId));
        if (itemType == null) return;

        var stack = new ArceusBoss_MCItemStack(itemType, 1);
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
    return 0.5;
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
    if (phase == 2) return getCfgInt(npc, "arceus_phase2_total_drops", 32);
    return getCfgInt(npc, "arceus_phase3_total_drops", 12);
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
    var attacker = resolveDamageDealer(event);
    if (attacker == null) return;

    var data = npc.getStoreddata();
    var uuid = safeAttackerUuid(attacker);
    if (uuid == null || uuid == "") return;

    var damageKey = "arceus_dmg_" + uuid;
    var nameKey = "arceus_dmg_name_" + uuid;
    var total = parseFloatSafe(data.get(damageKey), 0) + damage;

    data.put(damageKey, "" + total);
    data.put(nameKey, getAttackerName(attacker));
}

function resolveDamageDealer(event) {
    try {
        if (event.damageSource != null && event.damageSource.getTrueSource() != null) {
            return event.damageSource.getTrueSource();
        }
    } catch (e) {}

    try {
        if (event.source != null) {
            return event.source;
        }
    } catch (e2) {}

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

function forceHealthFloor(npc) {
    try {
        if (npc.getHealth() < 1) {
            npc.setHealth(1);
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

    var attacker = resolveDamageDealer(event);
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
        npc.timers.forceStart(1, getCfgInt(npc, "arceus_death_timer_ticks", 1), true);
    } catch (e) {}
}

function applyPhaseMeleeDelay(npc, phase) {
    var key = "arceus_phase1_melee_delay";
    if (phase == 2) key = "arceus_phase2_melee_delay";
    if (phase >= 3) key = "arceus_phase3_melee_delay";

    try {
        npc.getStats().getMelee().setDelay(getCfgInt(npc, key, phase >= 3 ? 12 : (phase == 2 ? 18 : 24)));
    } catch (e) {}
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
