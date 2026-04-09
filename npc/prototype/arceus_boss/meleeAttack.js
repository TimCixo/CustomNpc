function meleeAttack(event) {
    var npc = event.npc;
    var data = npc.getStoreddata();

    if (data.get("arceus_enabled") != "1") return;
    if (data.get("arceus_dying") == "1") return;
    if (data.get("arceus_dead") == "1") return;

    var phase = parseIntSafe(data.get("arceus_phase"), 1);
    var damage = readDamage(event);

    if (phase == 2) {
        damage = damage * getCfgFloat(npc, "arceus_phase2_damage_mult", 1.20);
        writeDamage(event, damage);
        return;
    }

    if (phase >= 3) {
        if (!isPlayerTarget(event.target)) {
            oneShotNonPlayerTarget(npc, event.target);
            return;
        }

        damage = damage * getCfgFloat(npc, "arceus_phase3_damage_mult", 1.45)
            + getCfgFloat(npc, "arceus_phase3_flat_bonus", 4.0);
        writeDamage(event, damage);
        applyHalfArmorBypassHit(npc, event.target, damage);
    }
}

function oneShotNonPlayerTarget(npc, target) {
    if (target == null) return;

    try {
        target.damage(1000000, npc);
    } catch (e) {}

    try {
        target.setHealth(0);
        return;
    } catch (e2) {}

    try {
        var mcTarget = unwrapMcEntity(target);
        if (mcTarget != null && mcTarget.kill) {
            mcTarget.kill();
        }
    } catch (e3) {}
}

function isPlayerTarget(target) {
    if (target == null) return false;

    try {
        if (target.getType && target.getType() == 1) return true;
    } catch (e) {}

    try {
        var className = "" + target.getClass().getName();
        if (className.indexOf("PlayerWrapper") >= 0) return true;
    } catch (e2) {}

    try {
        var mcTarget = unwrapMcEntity(target);
        if (mcTarget != null) {
            var mcClassName = "" + mcTarget.getClass().getName();
            if (mcClassName.indexOf("player") >= 0 || mcClassName.indexOf("Player") >= 0) return true;
        }
    } catch (e3) {}

    return false;
}

function applyHalfArmorBypassHit(npc, target, baseDamage) {
    if (target == null || baseDamage <= 0) return;

    var mcTarget = unwrapMcEntity(target);
    if (mcTarget == null) return;

    var armor = getArmorValue(mcTarget);
    var fullMultiplier = getArmorTakenMultiplier(armor);
    var halfMultiplier = getArmorTakenMultiplier(armor * 0.5);
    var bonusDamage = baseDamage * (halfMultiplier - fullMultiplier);
    if (bonusDamage <= 0) return;

    try {
        target.damage(bonusDamage, npc);
    } catch (e) {}
}

function unwrapMcEntity(entity) {
    if (entity == null) return null;

    try {
        if (entity.getMCEntity) return entity.getMCEntity();
    } catch (e) {}

    return null;
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

function readDamage(event) {
    try {
        return event.damage;
    } catch (e) {
        return 0;
    }
}

function writeDamage(event, value) {
    try {
        event.damage = value;
    } catch (e) {}
}

function getCfgFloat(npc, key, def) {
    return parseFloatSafe(npc.getStoreddata().get(key), def);
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
