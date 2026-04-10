function attack(event) {
    var npc = event.npc;
    var data = npc.getStoreddata();

    if (data.get("arceus_enabled") != "1") return;
    if (data.get("arceus_dying") == "1") return;

    var phase = parseIntSafe(data.get("arceus_phase"), 1);
    var damage = readDamage(event);

    if (phase == 2) {
        damage = damage * getCfgFloat(npc, "arceus_phase2_damage_mult", 1.20);
    } else if (phase >= 3) {
        damage = damage * getCfgFloat(npc, "arceus_phase3_damage_mult", 1.45)
            + getCfgFloat(npc, "arceus_phase3_flat_bonus", 4.0);
    }

    writeDamage(event, damage);
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
