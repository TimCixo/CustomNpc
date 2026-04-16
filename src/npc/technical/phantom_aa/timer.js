var TIMER_ID = 1;

var AABB = Java.type("net.minecraft.world.phys.AABB");
var Phantom = Java.type("net.minecraft.world.entity.monster.Phantom");
var Arrow = Java.type("net.minecraft.world.entity.projectile.Arrow");
var EntityType = Java.type("net.minecraft.world.entity.EntityType");
var EntityAnchorArgument = Java.type("net.minecraft.commands.arguments.EntityAnchorArgument");

function timer(event) {
    if (event.id != TIMER_ID) return;

    var npc = event.npc;
    if (npc.getStoreddata().get("aa_enabled") != "1") return;

    var level = npc.getMCEntity().level();
    var target = findNearestPhantom(level, npc);
    if (target == null) return;

    faceTarget(npc, target);

    var now = level.getGameTime();
    var nextShot = parseLongSafe(npc.getStoreddata().get("aa_next_shot_tick"), 0);
    if (now < nextShot) return;

    if (!canShootTarget(npc, target)) return;

    shootArrowAtTarget(npc, target);
    npc.getStoreddata().put(
        "aa_next_shot_tick",
        "" + (now + getCfgInt(npc, "aa_fire_delay_ticks", 20))
    );
}

function findNearestPhantom(level, npc) {
    var range = getCfgFloat(npc, "aa_range", 32.0);
    var box = new AABB(
        npc.getX() - range, npc.getY() - range, npc.getZ() - range,
        npc.getX() + range, npc.getY() + range, npc.getZ() + range
    );

    var list = level.getEntitiesOfClass(Phantom.class, box);
    if (list == null || list.isEmpty()) return null;

    var best = null;
    var bestDist = 999999999;
    var it = list.iterator();

    while (it.hasNext()) {
        var phantom = it.next();
        if (phantom == null || !phantom.isAlive()) continue;

        var dx = phantom.getX() - npc.getX();
        var dy = phantom.getY() - npc.getY();
        var dz = phantom.getZ() - npc.getZ();
        var distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < bestDist) {
            bestDist = distSq;
            best = phantom;
        }
    }

    return best;
}

function faceTarget(npc, target) {
    try {
        npc.getMCEntity().lookAt(EntityAnchorArgument.Anchor.EYES, target.position());
        return;
    } catch (e) {}

    try {
        var dx = target.getX() - npc.getX();
        var dz = target.getZ() - npc.getZ();
        var dy = (target.getY() + target.getBbHeight() * 0.5) - (npc.getY() + npc.getMCEntity().getEyeHeight());
        var xz = Math.sqrt(dx * dx + dz * dz);
        var yaw = Math.atan2(dz, dx) * 180.0 / Math.PI - 90.0;
        var pitch = -(Math.atan2(dy, xz) * 180.0 / Math.PI);

        npc.getMCEntity().setYRot(yaw);
        npc.getMCEntity().setYHeadRot(yaw);
        npc.getMCEntity().setXRot(pitch);
    } catch (e2) {}
}

function canShootTarget(npc, target) {
    try {
        return npc.getMCEntity().hasLineOfSight(target);
    } catch (e) {
        return true;
    }
}

function shootArrowAtTarget(npc, target) {
    var shooter = npc.getMCEntity();
    var level = shooter.level();
    var arrow = EntityType.ARROW.create(level);
    if (arrow == null) return;

    var eyeY = shooter.getY() + shooter.getEyeHeight() - 0.1;
    var targetY = target.getY() + target.getBbHeight() * getCfgFloat(npc, "aa_target_y_offset", 0.3);
    var dx = target.getX() - shooter.getX();
    var dy = targetY - eyeY;
    var dz = target.getZ() - shooter.getZ();

    arrow.setPos(shooter.getX(), eyeY, shooter.getZ());
    arrow.setOwner(shooter);
    arrow.setBaseDamage(getCfgFloat(npc, "aa_arrow_damage", 6.0));
    arrow.shoot(
        dx,
        dy,
        dz,
        getCfgFloat(npc, "aa_arrow_speed", 2.6),
        getCfgFloat(npc, "aa_arrow_inaccuracy", 0.5)
    );

    level.addFreshEntity(arrow);
}

function getCfgInt(npc, key, def) {
    return parseIntSafe(npc.getStoreddata().get(key), def);
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

function parseLongSafe(s, def) {
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
