var utils = require("utils.js");
var visuals = require("visuals.js");

var Damage_EntityType = Java.type("net.minecraft.world.entity.EntityType");

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
    return visuals.readNpcHealth(npc);
}

function readNpcMaxHealth(npc) {
    return visuals.readNpcMaxHealth(npc);
}

function setNpcHealthSafe(npc, value) {
    visuals.setNpcHealthSafe(npc, value);
}

function applyPhaseDamageMitigation(event, npc, phase, damageAmount, config, attacker) {
    if (damageAmount <= 0 || phase < 2) return damageAmount;

    try {
        if (event.damageSource != null && event.damageSource.isProjectile()) {
            var reduced = damageAmount * 0.5;
            reflectProjectileDamageToPlayer(npc, attacker, damageAmount - reduced, config);
            writeDamage(event, reduced);
            return reduced;
        }
    } catch (e) {}

    return damageAmount;
}

function reflectProjectileDamageToPlayer(npc, attacker, reflectDamage, config) {
    if (reflectDamage <= 0 || attacker == null || !isPlayerAttacker(attacker)) return;

    var mcTarget = unwrapMcEntity(attacker);
    if (mcTarget == null) return;

    try {
        shootReflectArrow(npc, mcTarget, reflectDamage, config);
    } catch (e) {}
}

function shootReflectArrow(npc, mcTarget, damageAmount, config) {
    var shooter = npc.getMCEntity();
    var level = shooter.level();
    var arrow = Damage_EntityType.ARROW.create(level);
    if (arrow == null) return;

    var eyeY = shooter.getY() + shooter.getEyeHeight() - 0.1;
    var targetY = mcTarget.getY() + mcTarget.getBbHeight() * 0.35;
    var dx = mcTarget.getX() - shooter.getX();
    var dy = targetY - eyeY;
    var dz = mcTarget.getZ() - shooter.getZ();

    arrow.setPos(shooter.getX(), eyeY, shooter.getZ());
    arrow.setOwner(shooter);
    arrow.setBaseDamage(getHalfArmorAdjustedProjectileDamage(mcTarget, damageAmount));
    arrow.shoot(
        dx,
        dy,
        dz,
        utils.parseFloatSafe(config.reflectArrowSpeed, 2.2),
        utils.parseFloatSafe(config.reflectArrowInaccuracy, 0.2)
    );
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

module.exports = {
    readDamage: readDamage,
    writeDamage: writeDamage,
    cancelDamage: cancelDamage,
    readNpcHealth: readNpcHealth,
    readNpcMaxHealth: readNpcMaxHealth,
    setNpcHealthSafe: setNpcHealthSafe,
    applyPhaseDamageMitigation: applyPhaseDamageMitigation,
    reflectProjectileDamageToPlayer: reflectProjectileDamageToPlayer,
    shootReflectArrow: shootReflectArrow,
    getHalfArmorAdjustedProjectileDamage: getHalfArmorAdjustedProjectileDamage,
    getArmorValue: getArmorValue,
    getArmorTakenMultiplier: getArmorTakenMultiplier,
    isPlayerAttacker: isPlayerAttacker,
    unwrapMcEntity: unwrapMcEntity
};
