function timer(event) {
    if (event.id != 31) return;

    var npc = event.npc;
    var data = npc.getStoreddata();
    var anchorUuid = trimString(data.get("pokebattle_anchor_uuid"));
    if (anchorUuid.length == 0) return;

    var entity = resolveEntity(npc, anchorUuid);
    if (entity == null) {
        data.put("pokebattle_anchor_uuid", "");
        return;
    }

    if (isBattling(entity)) {
        if (data.get("pokebattle_spawn_visible") != "1") {
            hideBattleAnchor(entity);
        }
        return;
    }

    try {
        entity.discard();
    } catch (e) {}

    data.put("pokebattle_anchor_uuid", "");
    data.put("pokebattle_player_uuid", "");
    data.put("pokebattle_capture_active_seen", "0");
    data.put("pokebattle_last_pokeball_uuid", "");
}

function resolveEntity(npc, uuid) {
    try {
        return npc.getWorld().getEntity(uuid);
    } catch (e) {
        return null;
    }
}

function isBattling(entity) {
    try {
        if (entity.getBattleId() != null) return true;
    } catch (e0) {}

    try {
        if (entity.battleId != null) return true;
    } catch (e1) {}

    try {
        if (entity.isBattling()) return true;
    } catch (e2) {}

    return false;
}

function hideBattleAnchor(entity) {
    try {
        entity.setInvisible(true);
    } catch (e0) {}

    try {
        entity.setSilent(true);
    } catch (e1) {}

    try {
        entity.setNoGravity(true);
    } catch (e2) {}

    try {
        entity.setInvulnerable(true);
    } catch (e3) {}

    try {
        entity.setNoAi(true);
    } catch (e4) {}

    try {
        entity.noPhysics = true;
    } catch (e5) {}
}

function trimString(value) {
    return ("" + value).replace(/^\s+|\s+$/g, "");
}
