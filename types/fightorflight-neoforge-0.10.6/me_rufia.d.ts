declare module 'me.rufia.fightorflight.client.hud.moveslots' {
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';
  import { PokemonEntity } from 'com.cobblemon.mod.common.entity.pokemon';
  import { Move } from 'com.cobblemon.mod.common.api.moves';

  class MoveSlotsRender {
    static render(graphics: GuiGraphics, tickDelta: number, pokemon: Pokemon): void;
    static renderMoveSlot(graphics: GuiGraphics, font: Font, x: number, y: number, entity: PokemonEntity, move: Move): void;
  }

}

declare module 'me.rufia.fightorflight.client.keybinds' {
  import { KeyMapping } from 'net.minecraft.client';
  import { Type } from 'InputConstants';
  import { CMDMODE } from 'me.rufia.fightorflight.item.component.PokeStaffComponent';
  import { List } from 'java.util';

  interface CommandKeybind extends KeyMapping {}
  class CommandKeybind extends KeyMapping {
    constructor(name: string, type: Type, keyCode: number, category: string, cmdmode: CMDMODE);
    get cmdmode(): CMDMODE;
  }


  class KeybindCategories {
    static readonly FOF: string;
    static readonly FOF_POKESTAFF: string;
  }


  class KeybindFightOrFlight {
    static bindings: List;
    static START_BATTLE: KeyMapping;
    static MOVE_SLOT_1: MoveSlotKeybind;
    static MOVE_SLOT_2: MoveSlotKeybind;
    static MOVE_SLOT_3: MoveSlotKeybind;
    static MOVE_SLOT_4: MoveSlotKeybind;
    static commandKeybinds: List;
  }


  interface MoveSlotKeybind extends KeyMapping {}
  class MoveSlotKeybind extends KeyMapping {
    constructor(name: string, type: Type, keyCode: number, category: string, moveSlot: number);
    get moveSlot(): number;
  }

}

declare module 'me.rufia.fightorflight.client.model' {
  import { EntityModel, HierarchicalModel } from 'net.minecraft.client.model';
  import { ModelLayerLocation, ModelPart } from 'net.minecraft.client.model.geom';
  import { LayerDefinition } from 'net.minecraft.client.model.geom.builders';
  import { Entity } from 'net.minecraft.world.entity';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { AbstractPokemonSpike } from 'me.rufia.fightorflight.entity.projectile';

  interface PokemonAreaEffectMagicModel<T extends Entity = any> extends EntityModel<T> {}
  class PokemonAreaEffectMagicModel<T extends Entity = any> extends EntityModel<T> {
    static readonly LAYER_LOCATION: ModelLayerLocation;
    constructor(root: ModelPart);
    static createBodyLayer(): LayerDefinition;
    renderBeam(poseStack: PoseStack, vertexConsumer: VertexConsumer, packedLight: number, packedOverlay: number, color: number): void;
    renderBottom(poseStack: PoseStack, vertexConsumer: VertexConsumer, packedLight: number, packedOverlay: number, color: number): void;
    renderToBuffer(poseStack: PoseStack, vertexConsumer: VertexConsumer, packedLight: number, packedOverlay: number, color: number): void;
    setupAnim(entity: Entity, limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface PokemonAreaEffectTornadoModel<T extends AbstractPokemonAreaEffect = any> extends EntityModel<T> {}
  class PokemonAreaEffectTornadoModel<T extends AbstractPokemonAreaEffect = any> extends EntityModel<T> {
    static readonly LAYER_LOCATION: ModelLayerLocation;
    constructor(root: ModelPart);
    static createBodyLayer(): LayerDefinition;
    renderPreEffect(poseStack: PoseStack, vertexConsumer: VertexConsumer, packedLight: number, packedOverlay: number, color: number): void;
    renderToBuffer(poseStack: PoseStack, vertexConsumer: VertexConsumer, packedLight: number, packedOverlay: number, color: number): void;
    renderTornado(poseStack: PoseStack, vertexConsumer: VertexConsumer, packedLight: number, packedOverlay: number, color: number): void;
    setupAnim(entity: T, limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface PokemonAreaEffectWhirlpoolModel<T extends AbstractPokemonAreaEffect = any> extends EntityModel<T> {}
  class PokemonAreaEffectWhirlpoolModel<T extends AbstractPokemonAreaEffect = any> extends EntityModel<T> {
    static readonly LAYER_LOCATION: ModelLayerLocation;
    constructor(root: ModelPart);
    static createBodyLayer(): LayerDefinition;
    renderEffect(poseStack: PoseStack, vertexConsumer: VertexConsumer, packedLight: number, packedOverlay: number, color: number, secondaryColor: number): void;
    renderPane(poseStack: PoseStack, vertexConsumer: VertexConsumer, packedLight: number, packedOverlay: number, color: number): void;
    renderSecondaryPane(poseStack: PoseStack, vertexConsumer: VertexConsumer, packedLight: number, packedOverlay: number, color: number): void;
    renderToBuffer(poseStack: PoseStack, vertexConsumer: VertexConsumer, packedLight: number, packedOverlay: number, color: number): void;
    setupAnim(entity: T, limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface PokemonBulletModel<T extends Entity = any> extends HierarchicalModel<T> {}
  class PokemonBulletModel<T extends Entity = any> extends HierarchicalModel<T> {
    constructor(root: ModelPart);
    static createBodyLayer(): LayerDefinition;
    root(): ModelPart;
    setupAnim(entity: T, limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface PokemonSpikeModel<T extends AbstractPokemonSpike = any> extends EntityModel<T> {}
  class PokemonSpikeModel<T extends AbstractPokemonSpike = any> extends EntityModel<T> {
    static readonly LAYER_LOCATION: ModelLayerLocation;
    constructor(root: ModelPart);
    static createBodyLayer(): LayerDefinition;
    renderToBuffer(poseStack: PoseStack, vertexConsumer: VertexConsumer, packedLight: number, packedOverlay: number, color: number): void;
    setupAnim(entity: AbstractPokemonSpike, limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface PokemonTransformingProjectileModel<T extends AbstractPokemonSpike = any> extends EntityModel<T> {}
  class PokemonTransformingProjectileModel<T extends AbstractPokemonSpike = any> extends EntityModel<T> {
    static readonly LAYER_LOCATION: ModelLayerLocation;
    constructor(root: ModelPart);
    static createBodyLayer(): LayerDefinition;
    renderMain(poseStack: PoseStack, vertexConsumer: VertexConsumer, packedLight: number, packedOverlay: number, color: number): void;
    renderSide(poseStack: PoseStack, vertexConsumer: VertexConsumer, packedLight: number, packedOverlay: number, color: number): void;
    renderToBuffer(poseStack: PoseStack, vertexConsumer: VertexConsumer, packedLight: number, packedOverlay: number, color: number): void;
    setupAnim(entity: AbstractPokemonSpike, limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }

}

declare module 'me.rufia.fightorflight.client.renderer' {
  import { EntityRenderer, RenderLayerParent } from 'net.minecraft.client.renderer.entity';
  import { PokemonAreaEffectMagic, AbstractPokemonAreaEffect } from 'me.rufia.fightorflight.entity.areaeffect';
  import { PokemonAreaEffectMagicModel } from 'me.rufia.fightorflight.client.model';
  import { Context } from 'EntityRendererProvider';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Color } from 'java.awt';
  import { PokemonArrow, PokemonBullet, AbstractPokemonSpike, PokemonTracingBullet } from 'me.rufia.fightorflight.entity.projectile';
  import { Pose } from 'PoseStack';
  import { PokemonEntity } from 'com.cobblemon.mod.common.entity.pokemon';

  interface PokemonAreaEffectMagicRenderer extends RenderLayerParent<PokemonAreaEffectMagic, PokemonAreaEffectMagicModel>, EntityRenderer<PokemonAreaEffectMagic> {}
  class PokemonAreaEffectMagicRenderer extends RenderLayerParent<PokemonAreaEffectMagic, PokemonAreaEffectMagicModel> {
    constructor(context: Context);
    get model(): PokemonAreaEffectMagicModel<PokemonAreaEffectMagic>;
    static getColor(entity: PokemonAreaEffectMagic): Color;
    getTextureLocation(entity: PokemonAreaEffectMagic): ResourceLocation;
    static hasSpecialTexture(entity: PokemonAreaEffectMagic): boolean;
    render(entity: PokemonAreaEffectMagic, entityYaw: number, partialTicks: number, poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number): void;
  }


  interface PokemonAreaEffectTornadoRenderer extends EntityRenderer<AbstractPokemonAreaEffect> {}
  class PokemonAreaEffectTornadoRenderer extends EntityRenderer<AbstractPokemonAreaEffect> {
    constructor(context: Context);
    getTextureLocation(entity: AbstractPokemonAreaEffect): ResourceLocation;
    render(entity: AbstractPokemonAreaEffect, entityYaw: number, partialTicks: number, poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number): void;
  }


  interface PokemonAreaEffectWhirlpoolRenderer extends EntityRenderer<AbstractPokemonAreaEffect> {}
  class PokemonAreaEffectWhirlpoolRenderer extends EntityRenderer<AbstractPokemonAreaEffect> {
    constructor(context: Context);
    getSecondaryColorCode(typeName: string): number;
    getTextureLocation(entity: AbstractPokemonAreaEffect): ResourceLocation;
    render(entity: AbstractPokemonAreaEffect, entityYaw: number, partialTicks: number, poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number): void;
  }


  interface PokemonArrowRenderer extends EntityRenderer<PokemonArrow> {}
  class PokemonArrowRenderer extends EntityRenderer<PokemonArrow> {
    constructor(context: Context);
    getTextureLocation(entity: PokemonArrow): ResourceLocation;
    render(entity: PokemonArrow, entityYaw: number, partialTicks: number, poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number): void;
    vertex(pose: Pose, consumer: VertexConsumer, x: number, y: number, z: number, u: number, v: number, normalX: number, normalZ: number, normalY: number, packedLight: number, col: Color): void;
  }


  interface PokemonBulletRenderer extends EntityRenderer<PokemonBullet> {}
  class PokemonBulletRenderer extends EntityRenderer<PokemonBullet> {
    constructor(context: Context);
    getTextureLocation(entity: PokemonBullet): ResourceLocation;
    render(entity: PokemonBullet, entityYaw: number, partialTicks: number, poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number): void;
  }


  class PokemonPostRenderer {
    static postRender(entity: PokemonEntity, entityYaw: number, partialTicks: number, poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number): void;
  }


  interface PokemonSpikeRenderer extends EntityRenderer<AbstractPokemonSpike> {}
  class PokemonSpikeRenderer extends EntityRenderer<AbstractPokemonSpike> {
    constructor(context: Context);
    getColor(entity: AbstractPokemonSpike): Color;
    getTextureLocation(entity: AbstractPokemonSpike): ResourceLocation;
    render(entity: AbstractPokemonSpike, entityYaw: number, partialTicks: number, poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number): void;
  }


  interface PokemonStickyWebRenderer extends EntityRenderer<AbstractPokemonSpike> {}
  class PokemonStickyWebRenderer extends EntityRenderer<AbstractPokemonSpike> {
    constructor(context: Context);
    getTextureLocation(entity: AbstractPokemonSpike): ResourceLocation;
    render(entity: AbstractPokemonSpike, entityYaw: number, partialTicks: number, poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number): void;
  }


  interface PokemonTracingBulletRenderer extends EntityRenderer<PokemonTracingBullet> {}
  class PokemonTracingBulletRenderer extends EntityRenderer<PokemonTracingBullet> {
    constructor(context: Context);
    getTextureLocation(entity: PokemonTracingBullet): ResourceLocation;
    render(entity: PokemonTracingBullet, entityYaw: number, partialTicks: number, poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number): void;
  }

}

declare module 'me.rufia.fightorflight' {
  import { Logger } from 'org.slf4j';
  import { FightOrFlightCommonConfigModel, FightOrFlightMoveConfigModel, FightOrFlightVisualEffectConfigModel } from 'me.rufia.fightorflight.config';
  import { TriConsumer } from 'org.apache.logging.log4j.util';
  import { PokemonEntity } from 'com.cobblemon.mod.common.entity.pokemon';
  import { Integer } from 'java.lang';
  import { Goal } from 'net.minecraft.world.entity.ai.goal';
  import { Set } from 'java.util';
  import { Mob, LivingEntity } from 'net.minecraft.world.entity';
  import { Move } from 'com.cobblemon.mod.common.api.moves';
  import { BlockPos } from 'net.minecraft.core';

  class CobblemonFightOrFlight {
    static readonly MODID: string;
    static readonly COBBLEMON_MOD_ID: string;
    static readonly LOGGER: Logger;
    static AUTO_AGGRO_THRESHOLD(): number;
    static AspectsAlwaysAggro(pokemonAspects: Set<string>): boolean;
    static BelowAlwaysAggro(height: number): boolean;
    static PokemonEmoteAngry(mob: Mob): void;
    static SpeciesAlwaysAggro(speciesName: string): boolean;
    static SpeciesAlwaysFlee(speciesName: string): boolean;
    static SpeciesNeverAggro(speciesName: string): boolean;
    static addPokemonGoal(pokemonEntity: PokemonEntity): void;
    static commonConfig(): FightOrFlightCommonConfigModel;
    static fromConfigToMoveData(): void;
    static getFightOrFlightCoefficient(pokemonEntity: PokemonEntity): number;
    static init(goalAdder: TriConsumer<PokemonEntity, number, Goal>): void;
    static moveConfig(): FightOrFlightMoveConfigModel;
    static visualEffectConfig(): FightOrFlightVisualEffectConfigModel;
  }


  class PokemonInterface {
    get attackMode(): number;
    get attackTime(): number;
    get capturedBy(): number;
    get command(): string;
    get commandData(): string;
    get currentMove(): string;
    get maxAttackTime(): number;
    get moveDuration(): number;
    get nextCryTime(): number;
    get ownerLastHurt(): LivingEntity;
    get ownerLastHurtTick(): number;
    get targetBlockPos(): BlockPos;
    refreshMovesList(): void;
    set attackMode(attackMode: number);
    set attackTime(val: number);
    set capturedBy(id: number);
    set command(cmd: string);
    set commandData(cmdData: string);
    set currentMove(move: Move);
    set maxAttackTime(val: number);
    set moveDuration(duration: number);
    set nextCryTime(time: number);
    set ownerLastHurt(livingEntity: LivingEntity);
    set targetBlockPos(blockPos: BlockPos);
    switchMove(move: Move): void;
    tryUsingStatusMoves(): void;
    usingBeam(): boolean;
    usingMagic(): boolean;
    usingSound(): boolean;
  }

}

declare module 'me.rufia.fightorflight.compat' {
  class LivelierPokemonCompat {
    static get modID(): string;
    static isLoaded(): boolean;
    static load(value: boolean): void;
  }

}

declare module 'me.rufia.fightorflight.config' {
  import { ConfigData } from 'me.shedaniel.autoconfig';

  interface FightOrFlightCommonConfigModel extends ConfigData {}
  class FightOrFlightCommonConfigModel extends ConfigData {
    do_pokemon_attack: boolean;
    do_pokemon_attack_unprovoked: boolean;
    light_dependent_unprovoked_attack: boolean;
    failed_capture_counted_as_provocation: boolean;
    do_pokemon_attack_in_battle: boolean;
    aggressive_pokemon_catchable: boolean;
    minimum_attack_level: number;
    minimum_attack_unprovoked_level: number;
    not_attacking_wild_shiny: boolean;
    aggressive_threshold: number;
    neutral_threshold: number;
    aggression_level_base_value: number;
    aggression_level_multiplier: number;
    aggression_atk_def_dif_base_value: number;
    dark_light_level_aggro: boolean;
    ghost_light_level_aggro: boolean;
    aggression_light_level_base_value: number;
    aggression_nature_base_value: number;
    aggression_intimidation_base_value: number;
    always_aggro_below: number;
    stop_running_after_hurt: boolean;
    slow_down_after_hurt: boolean;
    aggressive_nature: string[];
    aggressive_nature_multiplier: number;
    more_aggressive_nature: string[];
    more_aggressive_nature_multiplier: number;
    peaceful_nature: string[];
    peaceful_nature_multiplier: number;
    more_peaceful_nature: string[];
    more_peaceful_nature_multiplier: number;
    enable_datapack_driven_behavior: boolean;
    always_aggro_aspects: string[];
    always_aggro: string[];
    never_aggro: string[];
    provoke_only_aggro: string[];
    always_flee: string[];
    aggro_reducing_abilities: string[];
    mold_breaker_like_ablilities: string[];
    all_pokemon_targeting_whitelist: string[];
    wild_pokemon_targeting_whitelist: string[];
    player_owned_pokemon_targeting_whitelist: string[];
    allow_teleport_to_flee: boolean;
    do_pokemon_defend_owner: boolean;
    do_pokemon_defend_proactive: boolean;
    do_player_pokemon_attack_other_players: boolean;
    do_player_pokemon_attack_other_player_pokemon: boolean;
    multiple_cries: boolean;
    time_to_cry_again: number;
    experience_multiplier: number;
    can_gain_ev: boolean;
    can_progress_use_move_evolution: boolean;
    suffocation_immunity: boolean;
    pvp_immunity: boolean;
    friendly_fire_immunity_team: boolean;
    friendly_fire_immunity_owner: boolean;
    max_bonus_from_stat: number;
    minimum_attack_damage: number;
    maximum_attack_damage: number;
    minimum_attack_damage_player: number;
    attack_damage_player: number;
    maximum_attack_damage_player: number;
    maximum_attack_stat: number;
    minimum_movement_speed: number;
    maximum_movement_speed: number;
    speed_stat_limit: number;
    activate_type_effect: boolean;
    activate_move_effect: boolean;
    max_damage_reduction_multiplier: number;
    max_damage_reduction_multiplier_player: number;
    defense_stat_limit: number;
    force_wild_battle_on_player_attack: boolean;
    force_player_battle_on_player_attack: boolean;
    force_wild_battle_on_pokemon_hurt: boolean;
    force_player_battle_on_pokemon_hurt: boolean;
    force_wild_battle_on_player_hurt: boolean;
    force_player_battle_on_player_hurt: boolean;
    force_player_battle_check_team: boolean;
    wild_pokemon_ranged_attack: boolean;
    minimum_ranged_attack_interval: number;
    maximum_ranged_attack_interval: number;
    minimum_melee_attack_interval: number;
    maximum_melee_attack_interval: number;
    minimum_ranged_attack_damage: number;
    maximum_ranged_attack_damage: number;
    minimum_ranged_attack_damage_player: number;
    ranged_attack_damage_player: number;
    maximum_ranged_attack_damage_player: number;
    maximum_special_attack_stat: number;
    type_effectiveness_between_pokemon: boolean;
    super_effective_multiplier: number;
    not_very_effective_multiplier: number;
    no_effect_multiplier: number;
    water_type_super_effective_dmg_multiplier: number;
    fire_type_no_effect_dmg_multiplier: number;
    ice_type_no_effect_dmg_multiplier: number;
    ice_type_super_effective_dmg_multiplier: number;
    poison_type_no_effect_dmg_multiplier: number;
    shouldOverrideHealthMechanic: boolean;
    use_fof_style_hp_calculation: boolean;
    enable_health_sync_for_wild_pokemon: boolean;
    min_HP: number;
    mid_HP: number;
    max_HP: number;
    min_HP_required_stat: number;
    mid_HP_required_stat: number;
    max_HP_required_stat: number;
    can_use_poke_staff: boolean;
    stay_after_move_command: boolean;
    should_check_poke_staff: boolean;
    can_use_held_item: boolean;
    can_use_held_item_damage_influencing: boolean;
    can_use_held_item_hp_influencing: boolean;
    player_pokemon_can_hurt_ender_dragon: boolean;
    wild_pokemon_can_hurt_ender_dragon: boolean;
    use_fof_style_melee: boolean;
    use_range_attack: boolean;
    force_enable_defend_owner: boolean;
    force_enable_defend_self: boolean;
  }


  interface FightOrFlightMoveConfigModel extends ConfigData {}
  class FightOrFlightMoveConfigModel extends ConfigData {
    move_power_multiplier: number;
    indirect_attack_move_power_multiplier: number;
    base_power: number;
    min_AoE_radius: number;
    max_AoE_radius: number;
    min_AoE_damage_multiplier: number;
    status_move_radius: number;
    taunt_moves_needed: boolean;
    wild_pokemon_taunt: boolean;
    special_contact_moves: string[];
    physical_single_arrow_moves: string[];
    multiple_bullet_moves: string[];
    single_bullet_moves: string[];
    multiple_tracing_bullet_moves: string[];
    single_tracing_bullet_moves: string[];
    single_beam_moves: string[];
    magic_attack_moves: string[];
    self_centered_aoe_moves: string[];
    hp_draining_moves_50: string[];
    hp_draining_moves_75: string[];
    mold_breaker_like_moves: string[];
    explosive_moves: string[];
    sound_based_moves: string[];
    switch_moves: string[];
    emergency_exit_like_abilities: string[];
    recoil_moves_allHP: string[];
    enable_spikes: boolean;
    spike_basic_damage: number;
    taunting_moves: string[];
    burn_status_move: string[];
    self_targeting_status_move: string[];
    quick_attack_like_move: string[];
    delayed_aoe_at_target_position: string[];
    delayed_aoe_can_float: string[];
    delayed_aoe_rise_up_tornado: string[];
    delayed_aoe_bounding_whirlpool: string[];
    delayed_aoe_is_instant: string[];
    pokemon_griefing: boolean;
    should_create_fire: boolean;
  }


  interface FightOrFlightVisualEffectConfigModel extends ConfigData {}
  class FightOrFlightVisualEffectConfigModel extends ConfigData {
    self_angry_moves: string[];
    target_soul_fire_moves: string[];
    target_soul_moves: string[];
    slicing_moves: string[];
    enable_move_indicator: boolean;
    move_indicator_size: number;
    move_indicator_x_relative: number;
    move_indicator_y_relative: number;
  }

}

declare module 'me.rufia.fightorflight.data.behavior' {
  import { Map, List } from 'java.util';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { PokemonEntity } from 'com.cobblemon.mod.common.entity.pokemon';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';

  class PokemonBehaviorData {
    static readonly behaviorData: Map;
    constructor(species: string, aspects: string[], gender: string, ability: string[], move: string[], nature: string[], biome: string[], levelRequirement: string, healthRatio: string, lightLevel: string, x: string, y: string, z: string, distanceToPlayer: string, type: string);
    check(entity: LivingEntity, pokemonEntity: PokemonEntity): boolean;
    check(pokemonEntity: PokemonEntity): boolean;
    check(pokemon: Pokemon): boolean;
    get type(): string;
  }


  class PokemonBehaviorDataContainer {
    constructor(species: string[], aspects: string[], gender: string, ability: string[], move: string[], nature: string[], biome: string[], levelRequirement: string, healthRatio: string, lightLevel: string, x: string, y: string, z: string, distanceToPlayer: string, type: string);
    build(): Map<string, PokemonBehaviorData>;
  }

}

declare module 'me.rufia.fightorflight.data.movedata.container' {
  import { MoveDataContainer } from 'me.rufia.fightorflight.data.movedata';
  import { MiscMoveData, StatChangeMoveData, StatusEffectMoveData } from 'me.rufia.fightorflight.data.movedata.movedatas';
  import { List, Map } from 'java.util';

  interface MiscMoveDataContainer extends MoveDataContainer<MiscMoveData> {}
  class MiscMoveDataContainer extends MoveDataContainer<MiscMoveData> {
    constructor(type: string, target: string, triggerEvent: string, chance: number, canActivateSheerForce: boolean, name: string, move_list: string[]);
    build(): Map<string, MiscMoveData>;
  }


  interface StatChangeMoveDataContainer extends MoveDataContainer<StatChangeMoveData> {}
  class StatChangeMoveDataContainer extends MoveDataContainer<StatChangeMoveData> {
    constructor(type: string, target: string, triggerEvent: string, chance: number, canActivateSheerForce: boolean, name: string, move_list: string[], stage: number);
    build(): Map<string, StatChangeMoveData>;
  }


  interface StatusEffectMoveDataContainer extends MoveDataContainer<StatusEffectMoveData> {}
  class StatusEffectMoveDataContainer extends MoveDataContainer<StatusEffectMoveData> {
    constructor(type: string, target: string, triggerEvent: string, chance: number, canActivateSheerForce: boolean, name: string, move_list: string[]);
    build(): Map<string, StatusEffectMoveData>;
  }

}

declare module 'me.rufia.fightorflight.data.movedata' {
  import { Map, List } from 'java.util';
  import { PokemonEntity } from 'com.cobblemon.mod.common.entity.pokemon';
  import { LivingEntity } from 'net.minecraft.world.entity';

  class MoveData {
    static readonly moveData: Map;
    constructor(type: string, target: string, triggerEvent: string, chance: number, canActivateSheerForce: boolean, name: string);
    calculateEffectDuration(pokemonEntity: PokemonEntity): number;
    canActivateSheerForce(): boolean;
    get chance(): number;
    get name(): string;
    get target(): string;
    get triggerEvent(): string;
    get type(): string;
    invoke(var1: PokemonEntity, var2: LivingEntity): void;
    isBeforeUse(): boolean;
    isOnHit(): boolean;
    isOnUse(): boolean;
    set name(name: string);
  }


  class MoveDataContainer<T extends MoveData = any> {
    constructor(type: string, target: string, triggerEvent: string, chance: number, canActivateSheerForce: boolean, name: string, move_list: string[]);
    build(): Map<string, T>;
    canActivateSheerForce(): boolean;
    get chance(): number;
    get moveList(): string[];
    get name(): string;
    get target(): string;
    get triggerEvent(): string;
    get type(): string;
    toString(): string;
  }

}

declare module 'me.rufia.fightorflight.data.movedata.movedatas' {
  import { MoveData } from 'me.rufia.fightorflight.data.movedata';
  import { PokemonEntity } from 'com.cobblemon.mod.common.entity.pokemon';
  import { LivingEntity } from 'net.minecraft.world.entity';

  interface MiscMoveData extends MoveData {}
  class MiscMoveData extends MoveData {
    constructor(target: string, triggerEvent: string, chance: number, canActivateSheerForce: boolean, name: string);
    invoke(pokemonEntity: PokemonEntity, target: LivingEntity): void;
  }


  interface StatChangeMoveData extends MoveData {}
  class StatChangeMoveData extends MoveData {
    constructor(target: string, triggerEvent: string, chance: number, canActivateSheerForce: boolean, name: string, stage: number);
    invoke(pokemonEntity: PokemonEntity, target: LivingEntity): void;
  }


  interface StatusEffectMoveData extends MoveData {}
  class StatusEffectMoveData extends MoveData {
    constructor(target: string, triggerEvent: string, chance: number, canActivateSheerForce: boolean, name: string);
    invoke(pokemonEntity: PokemonEntity, target: LivingEntity): void;
  }

}

declare module 'me.rufia.fightorflight.effects' {
  import { Holder } from 'net.minecraft.core';
  import { MobEffect, MobEffectCategory } from 'net.minecraft.world.effect';

  class FOFEffects {
    static readonly RESISTANCE_WEAKENED: Holder;
    static bootstrap(): void;
  }


  interface FOFStatusEffect extends MobEffect {}
  class FOFStatusEffect extends MobEffect {
    constructor(category: MobEffectCategory, color: number);
  }


  interface RepelStatusEffect extends MobEffect {}
  class RepelStatusEffect extends MobEffect {
  }

}

declare module 'me.rufia.fightorflight.entity.ai.config.task' {
  import { SingleTaskConfig } from 'com.cobblemon.mod.common.api.ai.config.task';
  import { BehaviorControl } from 'net.minecraft.world.entity.ai.behavior';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { BehaviourConfigurationContext } from 'com.cobblemon.mod.common.api.ai';
  import { List } from 'java.util';
  import { MoLangConfigVariable } from 'com.cobblemon.mod.common.api.npc.configuration';

  interface FOFPokemonRangeTaskConfig extends SingleTaskConfig {}
  class FOFPokemonRangeTaskConfig extends SingleTaskConfig {
    createTask(livingEntity: LivingEntity, behaviourConfigurationContext: BehaviourConfigurationContext): BehaviorControl<LivingEntity>;
    getVariables(livingEntity: LivingEntity, behaviourConfigurationContext: BehaviourConfigurationContext): MoLangConfigVariable[];
  }

}

declare module 'me.rufia.fightorflight.entity.ai' {
  import { MemoryModuleType } from 'net.minecraft.world.entity.ai.memory';
  import { Codec } from 'com.mojang.serialization';

  class FOFAI {
  }


  class FOFMemories {
    static ATTACK_MODE: MemoryModuleType;
    static register<T>(id: string, codec: Codec<T>): MemoryModuleType<T>;
  }

}

declare module 'me.rufia.fightorflight.entity.ai.sensors' {
  import { Map, Set } from 'java.util';
  import { SensorType, Sensor } from 'net.minecraft.world.entity.ai.sensing';
  import { Supplier } from 'java.util.function';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { PokemonEntity } from 'com.cobblemon.mod.common.entity.pokemon';
  import { MemoryModuleType } from 'net.minecraft.world.entity.ai.memory';

  class FOFSensors {
    static readonly sensors: Map;
    static readonly POKEMON_HELP_OWNER: SensorType;
    static readonly POKEMON_WILD_PROACTIVE: SensorType;
    static readonly POKEMON_CAUGHT_BY: SensorType;
    static readonly POKESTAFF_ATTACK_TARGET: SensorType;
    static readonly POKESTAFF_WALK_TARGET: SensorType;
    static register<E extends LivingEntity, U extends Sensor<E>>(id: string, supplier: Supplier<U>): SensorType<U>;
  }


  interface PokemonCaughtBySensor extends Sensor<PokemonEntity> {}
  class PokemonCaughtBySensor extends Sensor<PokemonEntity> {
    constructor();
    requires(): Set<MemoryModuleType<any>>;
  }


  interface PokemonHelpOwnerSensor extends Sensor<PokemonEntity> {}
  class PokemonHelpOwnerSensor extends Sensor<PokemonEntity> {
    constructor();
    requires(): Set<MemoryModuleType<any>>;
  }


  interface PokemonWildProactiveSensor extends Sensor<PokemonEntity> {}
  class PokemonWildProactiveSensor extends Sensor<PokemonEntity> {
    constructor();
    requires(): Set<MemoryModuleType<any>>;
  }


  interface PokeStaffAttackTargetSensor extends Sensor<PokemonEntity> {}
  class PokeStaffAttackTargetSensor extends Sensor<PokemonEntity> {
    constructor();
    requires(): Set<MemoryModuleType<any>>;
  }


  interface PokeStaffWalkTargetSensor extends Sensor<PokemonEntity> {}
  class PokeStaffWalkTargetSensor extends Sensor<PokemonEntity> {
    requires(): Set<MemoryModuleType<any>>;
  }

}

declare module 'me.rufia.fightorflight.entity.ai.tasks' {
  import { OneShot, Behavior } from 'net.minecraft.world.entity.ai.behavior';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { PokemonEntity } from 'com.cobblemon.mod.common.entity.pokemon';
  import { Expression } from 'com.bedrockk.molang';

  class FOFBackUpIfTooClose {
    static create(tooCloseDistance: number, strafeSpeed: number): OneShot<LivingEntity>;
  }


  class FOFDefendOwnerTask {
    static create(): OneShot<PokemonEntity>;
  }


  class FOFMoveToAttackTargetTask {
    static create(speedMultiplierExp: Expression, closeEnoughDistanceExp: Expression): OneShot<LivingEntity>;
  }


  class FOFPokemonAttackTask {
    static getAttackTime(pokemonEntity: PokemonEntity): number;
    static getTarget(pokemonEntity: PokemonEntity): LivingEntity;
    static isTargetInBattle(pokemonEntity: PokemonEntity): boolean;
    static refreshAttackTime(pokemonEntity: PokemonEntity, ticks: number): void;
    static resetAttackTime(pokemonEntity: PokemonEntity, dis: number): void;
    static sharedStartCondition(pokemonEntity: PokemonEntity): boolean;
  }


  class FOFPokemonMeleeTask {
    static create(cooldownBetweenAttacks: number): OneShot<LivingEntity>;
  }


  interface FOFPokemonRangeTask extends Behavior<LivingEntity> {}
  class FOFPokemonRangeTask extends Behavior<LivingEntity> {
    constructor();
  }

}

declare module 'me.rufia.fightorflight.entity.areaeffect' {
  import { Entity, EntityType, LivingEntity, EntityDimensions, Pose } from 'net.minecraft.world.entity';
  import { IPokemonAttack } from 'me.rufia.fightorflight.entity';
  import { Level } from 'net.minecraft.world.level';
  import { PokemonEntity } from 'com.cobblemon.mod.common.entity.pokemon';
  import { Move } from 'com.cobblemon.mod.common.api.moves';
  import { PushReaction } from 'net.minecraft.world.level.material';
  import { EntityDataAccessor } from 'net.minecraft.network.syncher';

  interface AbstractPokemonAreaEffect extends IPokemonAttack, Entity {}
  class AbstractPokemonAreaEffect extends IPokemonAttack {
    constructor(entityType: EntityType<AbstractPokemonAreaEffect>, level: Level);
    get applicationTime(): number;
    get duration(): number;
    get elementalType(): string;
    get height(): number;
    get moveName(): string;
    get owner(): LivingEntity;
    get pistonPushReaction(): PushReaction;
    get radius(): number;
    get waitTime(): number;
    getDimensions(pose: Pose): EntityDimensions;
    init(target: LivingEntity, duration: number, waitTime: number, canFloat: boolean, isInstant: boolean): void;
    isActivated(): boolean;
    isWaiting(): boolean;
    onSyncedDataUpdated(dataAccessor: EntityDataAccessor<any>): void;
    refreshDimensions(): void;
    refreshHeight(): void;
    set elementalType(type: string);
    set height(h: number);
    set moveName(moveName: string);
    set owner(owner: LivingEntity);
    set radius(r: number);
    tick(): void;
    static tryToCreate(owner: PokemonEntity, target: LivingEntity, move: Move): AbstractPokemonAreaEffect;
  }


  interface PokemonAreaEffectMagic extends AbstractPokemonAreaEffect {}
  class PokemonAreaEffectMagic extends AbstractPokemonAreaEffect {
    constructor(entityType: EntityType<AbstractPokemonAreaEffect>, level: Level);

    constructor(owner: LivingEntity);
  }


  interface PokemonTornado extends AbstractPokemonAreaEffect {}
  class PokemonTornado extends AbstractPokemonAreaEffect {
    constructor(entityType: EntityType<AbstractPokemonAreaEffect>, level: Level);

    constructor(owner: LivingEntity);
  }


  interface PokemonWhirlPool extends AbstractPokemonAreaEffect {}
  class PokemonWhirlPool extends AbstractPokemonAreaEffect {
    constructor(entityType: EntityType<AbstractPokemonAreaEffect>, level: Level);

    constructor(owner: LivingEntity);
  }

}

declare module 'me.rufia.fightorflight.entity' {
  import { DeferredRegister, RegistrySupplier } from 'dev.architectury.registry.registries';
  import { EntityType, LivingEntity, Entity } from 'net.minecraft.world.entity';
  import { Builder } from 'EntityType';
  import { Supplier } from 'java.util.function';
  import { Builder as attributesupplier_Builder } from 'AttributeSupplier';
  import { Projectile } from 'net.minecraft.world.entity.projectile';
  import { SimpleParticleType } from 'net.minecraft.core.particles';
  import { Color } from 'java.awt';
  import { Item } from 'net.minecraft.world.item';
  import { ElementalType } from 'com.cobblemon.mod.common.api.types';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';
  import { PokemonEntity } from 'com.cobblemon.mod.common.entity.pokemon';
  import { Move } from 'com.cobblemon.mod.common.api.moves';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';

  class EntityFightOrFlight {
    static readonly ENTITY_TYPES: DeferredRegister;
    static readonly TRACING_BULLET: RegistrySupplier;
    static readonly ARROW_PROJECTILE: RegistrySupplier;
    static readonly BULLET: RegistrySupplier;
    static readonly SPIKE: RegistrySupplier;
    static readonly FLOATING_SPIKE: RegistrySupplier;
    static readonly STICKY_WEB: RegistrySupplier;
    static readonly TORNADO: RegistrySupplier;
    static readonly WHIRLPOOL: RegistrySupplier;
    static readonly MAGIC_EFFECT: RegistrySupplier;
    static bootstrap(): void;
    static register<T extends LivingEntity>(name: string, builder: Builder<T>, attributes: Supplier<attributesupplier_Builder>): RegistrySupplier<EntityType<T>>;
    static registerMiscEntity<T extends Entity>(name: string, builder: Builder<T>): RegistrySupplier<EntityType<T>>;
    static registerProjectile<T extends Projectile>(name: string, builder: Builder<T>): RegistrySupplier<EntityType<T>>;
  }


  class IPokemonAttack {
    get elementalType(): string;
    set elementalType(var1: string);
  }


  class PokemonAttackEffect {
    static applyOnHitVisualEffect(pokemonEntity: PokemonEntity, hurtTarget: Entity, move: Move): void;
    static applyOnHitVisualEffect(pokemonEntity: PokemonEntity, hurtTarget: Entity, moveName: string): void;
    static applyOnUseEffect(pokemonEntity: PokemonEntity, hurtTarget: LivingEntity, move: Move): void;
    static applyPostEffect(pokemonEntity: PokemonEntity, hurtTarget: LivingEntity, move: Move, targetIsHurt: boolean): void;
    static applySFX(level: Level, move: Move, blockPos: BlockPos): void;
    static applyTypeEffect(pokemonEntity: PokemonEntity, hurtTarget: Entity, typeName: string): void;
    static applyTypeEffect(pokemonEntity: PokemonEntity, hurtTarget: Entity): void;
    static calculateAttackTime(pokemonEntity: PokemonEntity, distance: number): number;
    static calculatePokemonDamage(pokemonEntity: PokemonEntity, target: Entity, isSpecial: boolean): number;
    static calculatePokemonDamage(pokemonEntity: PokemonEntity, target: Entity, isSpecial: boolean, movePower: number, type: ElementalType): number;
    static calculatePokemonDamage(pokemonEntity: PokemonEntity, target: Entity, move: Move): number;
    static canChangeMove(pokemonEntity: PokemonEntity): boolean;
    static createAOE(pokemonEntity: PokemonEntity, target: LivingEntity, move: Move): void;
    static dealAoEDamage(pokemonEntity: PokemonEntity, centerEntity: Entity, shouldHurtAlly: boolean, decreaseOverDistance: boolean, hasDirectContact: boolean): void;
    static dealAoEDamage(pokemonEntity: PokemonEntity, centerEntity: Entity, shouldHurtAlly: boolean, hasDirectContact: boolean): void;
    static getAoERadius(entity: PokemonEntity, move: Move): number;
    static getColorFromType(typeName: string): Color;
    static getColorFromType(type: ElementalType): Color;
    static getColorFromType(pokemon: Pokemon): Color;
    static getHeldItemDmgMultiplier(pokemonEntity: PokemonEntity, target: Entity): number;
    static getMobEffectBoost(pokemonEntity: PokemonEntity): number;
    static getParticleFromType(name: string): SimpleParticleType;
    static getParticleFromType(type: ElementalType): SimpleParticleType;
    static getTypeEnhancingItem(typeName: string): Item;
    static makeMagicAttackParticle(pokemonEntity: PokemonEntity, target: Entity): void;
    static makeTypeEffectParticle(particleAmount: number, entity: Entity, typeName: string): void;
    static pokemonAttack(pokemonEntity: PokemonEntity, hurtTarget: Entity): boolean;
    static pokemonExplode(entity: PokemonEntity, level: Level): void;
    static pokemonPerformRangedAttack(pokemonEntity: PokemonEntity, target: LivingEntity): void;
    static pokemonRecallWithAnimation(pokemonEntity: PokemonEntity): void;
    static pokemonRecoilSelf(pokemonEntity: PokemonEntity, percent: number): void;
    static refreshAttackTime(pokemonEntity: PokemonEntity, attackTime: number): void;
    static resetAttackTime(pokemonEntity: PokemonEntity, distance: number): void;
    static shouldBeHurtByAllyMob(pokemonEntity: PokemonEntity, attacker: LivingEntity): boolean;
    static shouldHurtAllyMob(pokemonEntity: PokemonEntity, target: LivingEntity): boolean;
    static spreadSpikes(pokemonEntity: PokemonEntity, type: string): void;
  }

}

declare module 'me.rufia.fightorflight.entity.projectile' {
  import { ThrowableProjectile } from 'net.minecraft.world.entity.projectile';
  import { IPokemonAttack } from 'me.rufia.fightorflight.entity';
  import { EntityType, LivingEntity, MoverType, Entity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { PokemonEntity } from 'com.cobblemon.mod.common.entity.pokemon';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Axis } from 'Direction';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { ClientboundAddEntityPacket } from 'net.minecraft.network.protocol.game';

  interface AbstractPokemonProjectile extends IPokemonAttack, ThrowableProjectile {}
  class AbstractPokemonProjectile extends IPokemonAttack {
    constructor(entityType: EntityType<AbstractPokemonProjectile>, level: Level);
    accurateShoot(x: number, y: number, z: number, velocity: number, inaccuracy: number): void;
    applyTypeEffect(pokemonEntity: PokemonEntity, hurtTarget: LivingEntity): void;
    get damage(): number;
    get elementalType(): string;
    set damage(Damage: number);
    set elementalType(Type2: string);
    tick(): void;
  }


  interface AbstractPokemonSpike extends AbstractPokemonProjectile {}
  class AbstractPokemonSpike extends AbstractPokemonProjectile {
    constructor(entityType: EntityType<AbstractPokemonProjectile>, level: Level);
    addAdditionalSaveData(compound: CompoundTag): void;
    get inGroundTick(): number;
    move(type: MoverType, pos: Vec3): void;
    readAdditionalSaveData(compound: CompoundTag): void;
    set inGroundTick(value: number);
    tick(): void;
  }


  interface ExplosivePokemonProjectile extends AbstractPokemonProjectile {}
  class ExplosivePokemonProjectile extends AbstractPokemonProjectile {
    constructor(entityType: EntityType<AbstractPokemonProjectile>, level: Level);
  }


  interface PokemonArrow extends AbstractPokemonProjectile {}
  class PokemonArrow extends AbstractPokemonProjectile {
    constructor(entityType: EntityType<AbstractPokemonProjectile>, level: Level);

    constructor(level: Level, shooter: LivingEntity, finalTarget: Entity);
    lerpMotion(x: number, y: number, z: number): void;
    move(type: MoverType, pos: Vec3): void;
    shoot(x: number, y: number, z: number, velocity: number, inaccuracy: number): void;
    tick(): void;
  }


  interface PokemonBullet extends ExplosivePokemonProjectile {}
  class PokemonBullet extends ExplosivePokemonProjectile {
    constructor(entityType: EntityType<AbstractPokemonProjectile>, level: Level);

    constructor(level: Level, shooter: LivingEntity);
    tick(): void;
  }


  interface PokemonFloatingSpike extends AbstractPokemonSpike {}
  class PokemonFloatingSpike extends AbstractPokemonSpike {
    constructor(entityType: EntityType<AbstractPokemonProjectile>, level: Level);

    constructor(level: Level, shooter: LivingEntity);
    addAdditionalSaveData(compound: CompoundTag): void;
    readAdditionalSaveData(compound: CompoundTag): void;
    tick(): void;
  }


  interface PokemonSpike extends AbstractPokemonSpike {}
  class PokemonSpike extends AbstractPokemonSpike {
    constructor(entityType: EntityType<AbstractPokemonProjectile>, level: Level);

    constructor(level: Level, shooter: LivingEntity);
  }


  interface PokemonStickyWeb extends AbstractPokemonSpike {}
  class PokemonStickyWeb extends AbstractPokemonSpike {
    constructor(entityType: EntityType<AbstractPokemonProjectile>, level: Level);

    constructor(level: Level, shooter: LivingEntity);
  }


  interface PokemonTracingBullet extends ExplosivePokemonProjectile {}
  class PokemonTracingBullet extends ExplosivePokemonProjectile {
    constructor(entityType: EntityType<PokemonTracingBullet>, level: Level);

    constructor(level: Level, shooter: LivingEntity, finalTarget: Entity, axis: Axis);
    checkDespawn(): void;
    hurt(source: DamageSource, amount: number): boolean;
    isOnFire(): boolean;
    recreateFromPacket(packet: ClientboundAddEntityPacket): void;
    shouldRenderAtSqrDistance(distance: number): boolean;
    tick(): void;
  }

}

declare module 'me.rufia.fightorflight.forge' {
  import { Post } from 'RenderGuiEvent';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';
  import { FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { RegisterKeyMappingsEvent } from 'net.neoforged.neoforge.client.event';
  import { RegisterLayerDefinitions } from 'EntityRenderersEvent';
  import { RegisterEvent } from 'net.neoforged.neoforge.registries';

  class ClientBusEvent {
    static onRenderHud(event: Post): void;
  }


  class CobblemonFightOrFlightForge {
    constructor(modEventBus: IEventBus, modContainer: ModContainer);
  }


  class FOFForgeClient {
    static registerEntityLayer(event: RegisterLayerDefinitions): void;
    static registerKeys(event: RegisterKeyMappingsEvent): void;
    static setup(event: FMLClientSetupEvent): void;
  }


  class ForgeBusEvent {
    static onRegister(event: RegisterEvent): void;
  }

}

declare module 'me.rufia.fightorflight.goals' {
  import { Goal, PanicGoal } from 'net.minecraft.world.entity.ai.goal';
  import { PokemonEntity } from 'com.cobblemon.mod.common.entity.pokemon';
  import { Entity, PathfinderMob } from 'net.minecraft.world.entity';

  interface PokemonAttackGoal extends Goal {}
  class PokemonAttackGoal extends Goal {
    constructor(pokemonEntity: PokemonEntity, speedModifier: number);
    canContinueToUse(): boolean;
    canUse(): boolean;
    isTargetInBattle(): boolean;
    pokemonDoHurtTarget(hurtTarget: Entity): boolean;
    requiresUpdateEveryTick(): boolean;
    stop(): void;
    tick(): void;
  }


  interface PokemonAttackPosGoal extends PokemonAttackGoal {}
  class PokemonAttackPosGoal extends PokemonAttackGoal {
    constructor(pokemonEntity: PokemonEntity, speedModifier: number);
    canContinueToUse(): boolean;
    canUse(): boolean;
    tick(): void;
  }


  interface PokemonAvoidGoal extends Goal {}
  class PokemonAvoidGoal extends Goal {
    constructor(mob: PathfinderMob, maxDist: number, walkSpeedModifier: number, sprintSpeedModifier: number);
    canContinueToUse(): boolean;
    canUse(): boolean;
    start(): void;
    stop(): void;
    tick(): void;
  }


  interface PokemonGoToPosGoal extends Goal {}
  class PokemonGoToPosGoal extends Goal {
    constructor(entity: PokemonEntity, speedModifier: number);
    canContinueToUse(): boolean;
    canUse(): boolean;
    start(): void;
    stop(): void;
    tick(): void;
  }


  interface PokemonPanicGoal extends PanicGoal {}
  class PokemonPanicGoal extends PanicGoal {
    constructor(mob: PathfinderMob, speedModifier: number);
  }


  interface PokemonPassiveAbilityGoal extends Goal {}
  class PokemonPassiveAbilityGoal extends Goal {
    constructor(entity: PokemonEntity);
    canUse(): boolean;
    tick(): void;
  }

}

declare module 'me.rufia.fightorflight.goals.targeting' {
  import { TargetGoal, NearestAttackableTargetGoal } from 'net.minecraft.world.entity.ai.goal.target';
  import { Mob, LivingEntity } from 'net.minecraft.world.entity';
  import { Class } from 'java.lang';
  import { PokemonEntity } from 'com.cobblemon.mod.common.entity.pokemon';
  import { Predicate } from 'java.util.function';

  interface CaughtByTargetGoal extends TargetGoal {}
  class CaughtByTargetGoal extends TargetGoal {
    constructor(mob: Mob);
    canUse(): boolean;
    start(): void;
  }


  interface PokemonCommandedTargetGoal<T extends LivingEntity = any> extends NearestAttackableTargetGoal<T> {}
  class PokemonCommandedTargetGoal<T extends LivingEntity = any> extends NearestAttackableTargetGoal<T> {
    constructor(mob: Mob, targetType: Class<T>, mustSee: boolean);
    canUse(): boolean;
    stop(): void;
  }


  interface PokemonNearestAttackableTargetGoal<T extends LivingEntity = any> extends NearestAttackableTargetGoal<T> {}
  class PokemonNearestAttackableTargetGoal<T extends LivingEntity = any> extends NearestAttackableTargetGoal<T> {
    ticksUntilNewAngerParticle: number;
    safeDistanceSqr: number;
    constructor(mob: Mob, targetType: Class<T>, safeDistanceSqr: number, mustSee: boolean, mustReach: boolean);
    canUse(): boolean;
  }


  interface PokemonOwnerHurtByTargetGoal extends TargetGoal {}
  class PokemonOwnerHurtByTargetGoal extends TargetGoal {
    constructor(pokemonEntity: PokemonEntity);
    canUse(): boolean;
    start(): void;
  }


  interface PokemonOwnerHurtTargetGoal extends TargetGoal {}
  class PokemonOwnerHurtTargetGoal extends TargetGoal {
    constructor(pokemonEntity: PokemonEntity);
    canUse(): boolean;
    start(): void;
  }


  interface PokemonProactiveTargetGoal<T extends LivingEntity = any> extends NearestAttackableTargetGoal<T> {}
  class PokemonProactiveTargetGoal<T extends LivingEntity = any> extends NearestAttackableTargetGoal<T> {
    safeDistanceSqr: number;
    constructor(mob: Mob, targetType: Class<T>, safeDistanceSqr: number, randomInterval: number, mustSee: boolean, mustReach: boolean, targetPredicate: Predicate<LivingEntity>);
    canUse(): boolean;
  }


  interface PokemonTauntedTargetGoal extends NearestAttackableTargetGoal<PokemonEntity> {}
  class PokemonTauntedTargetGoal extends NearestAttackableTargetGoal<PokemonEntity> {
    constructor(entity: PokemonEntity, mustSee: boolean);
    canUse(): boolean;
    isTaunted(): boolean;
  }

}

declare module 'me.rufia.fightorflight.item.component' {
  import { DataComponentType } from 'net.minecraft.core.component';

  class ItemComponentFOF {
    static readonly POKE_STAFF_COMMAND_MODE_COMPONENT: DataComponentType;
  }

}

declare module 'me.rufia.fightorflight.item.component.PokeStaffComponent' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface MODE extends Enum<MODE> {}
  class MODE extends Enum<MODE> {
    static readonly SEND: MODE;
    static readonly SETMOVE: MODE;
    static readonly SETCMDMODE: MODE;
    static valueOf(name: string): MODE;
    static values(): MODE[];
  }


  interface CMDMODE extends Enum<CMDMODE> {}
  class CMDMODE extends Enum<CMDMODE> {
    static readonly MOVE_ATTACK: CMDMODE;
    static readonly MOVE: CMDMODE;
    static readonly STAY: CMDMODE;
    static readonly ATTACK: CMDMODE;
    static readonly ATTACK_POSITION: CMDMODE;
    static readonly NOCMD: CMDMODE;
    static readonly CLEAR: CMDMODE;
    static valueOf(name: string): CMDMODE;
    static values(): CMDMODE[];
  }

}

declare module 'me.rufia.fightorflight.item' {
  import { DeferredRegister, RegistrySupplier } from 'dev.architectury.registry.registries';
  import { Item, ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { Supplier } from 'java.util.function';
  import { Properties, TooltipContext } from 'Item';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { InteractionResultHolder, InteractionHand } from 'net.minecraft.world';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Entity } from 'net.minecraft.world.entity';

  class ItemFightOrFlight {
    static readonly ITEMS: DeferredRegister;
    static readonly POKESTAFF: RegistrySupplier;
    static readonly ORANLUCKYEGG: RegistrySupplier;
    static bootstrap(): void;
    static register(name: string, item: Supplier<Item>): RegistrySupplier<Item>;
  }


  interface OranLuckyEgg extends Item {}
  class OranLuckyEgg extends Item {
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltipComponents: Component[], isAdvanced: TooltipFlag): void;
  }


  interface PokeStaff extends Item {}
  class PokeStaff extends Item {
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltipComponents: Component[], isAdvanced: TooltipFlag): void;
    getCommandMode(itemStack: ItemStack): string;
    getMoveSlot(itemStack: ItemStack): number;
    static getTranslatedCmdModeName(cmdModeName: string): Component;
    inventoryTick(stack: ItemStack, level: Level, entity: Entity, slotId: number, isSelected: boolean): void;
    isEnchantable(stack: ItemStack): boolean;
    setCommandMode(stack: ItemStack, mode: string): void;
    setMode(stack: ItemStack, mode: string): void;
    setMoveSlot(stack: ItemStack, moveSlot: number): void;
    use(level: Level, player: Player, usedHand: InteractionHand): InteractionResultHolder<ItemStack>;
    useOnRelease(stack: ItemStack): boolean;
  }

}

declare module 'me.rufia.fightorflight.mixin' {
  import { SensorType } from 'net.minecraft.world.entity.ai.sensing';
  import { ThrowableProjectile } from 'net.minecraft.world.entity.projectile';
  import { CaptureState } from 'EmptyPokeBallEntity';
  import { LivingEntity, TamableAnimal } from 'net.minecraft.world.entity';
  import { EnderDragonPart } from 'net.minecraft.world.entity.boss';
  import { MobEffectInstance, MobEffect } from 'net.minecraft.world.effect';
  import { Holder, BlockPos } from 'net.minecraft.core';
  import { LocalPlayer } from 'net.minecraft.client.player';
  import { Minecraft } from 'net.minecraft.client';
  import { PokemonInterface } from 'me.rufia.fightorflight';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';
  import { EntityDataAccessor } from 'net.minecraft.network.syncher';
  import { CallbackInfo, CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Move } from 'com.cobblemon.mod.common.api.moves';
  import { PokemonSideDelegate } from 'com.cobblemon.mod.common.api.entity';
  import { PokemonEntity } from 'com.cobblemon.mod.common.entity.pokemon';
  import { Integer } from 'java.lang';

  class ActivityConfigurationContextMixin {
  }


  class BehaviourConfigurationContextMixin {
    addSensors(...var1: SensorType<any>[]): void;
  }


  class DefendOwnerTaskMixin {
  }


  interface EmptyPokeBallEntityMixin extends ThrowableProjectile {}
  class EmptyPokeBallEntityMixin extends ThrowableProjectile {
    get captureState(): CaptureState;
  }


  interface EnderDragonMixin extends LivingEntity {}
  class EnderDragonMixin extends LivingEntity {
    head: EnderDragonPart;
  }


  class LivingEntityMixin {
    getEffect(var1: Holder<MobEffect>): MobEffectInstance;
    hasEffect(var1: Holder<MobEffect>): boolean;
  }


  class MeleeAttackTaskMixin {
  }


  class MinecraftClientInject {
    player: LocalPlayer;
    static get instance(): Minecraft;
  }


  class MoveToAttackTargetTaskMixin {
  }


  class PokemonBrainMixin {
  }


  interface PokemonEntityMixin extends PokemonInterface, TamableAnimal {}
  class PokemonEntityMixin extends PokemonInterface {
    cry(): void;
    get attackMode(): number;
    get attackTime(): number;
    get beamMode(): number;
    get capturedBy(): number;
    get command(): string;
    get commandData(): string;
    get currentMove(): string;
    get maxAttackTime(): number;
    get moveDuration(): number;
    get nextCryTime(): number;
    get ownerLastHurt(): LivingEntity;
    get ownerLastHurtTick(): number;
    get pokemon(): Pokemon;
    get target(): LivingEntity;
    get targetBlockPos(): BlockPos;
    heal(healAmount: number): void;
    onSyncedDataUpdated(key: EntityDataAccessor<any>, ci: CallbackInfo): void;
    refreshMovesList(): void;
    set attackMode(attackMode: number);
    set attackTime(val: number);
    set capturedBy(id: number);
    set command(cmd: string);
    set commandData(cmdData: string);
    set currentMove(move: Move);
    set maxAttackTime(val: number);
    set moveDuration(duration: number);
    set nextCryTime(time: number);
    set ownerLastHurt(livingEntity: LivingEntity);
    set target(target: LivingEntity);
    set targetBlockPos(blockPos: BlockPos);
    switchMove(move: Move): void;
    tryUsingStatusMoves(): void;
    usingBeam(): boolean;
    usingMagic(): boolean;
    usingSound(): boolean;
  }


  class PokemonMeleeTaskMixin {
  }


  interface PokemonServerDelegateMixin extends PokemonSideDelegate {}
  class PokemonServerDelegateMixin extends PokemonSideDelegate {
    entity: PokemonEntity;
    maxHpToMaxHealthCurveMixin(max_hp: number, cir: CallbackInfoReturnable<number>): void;
    updateAttributesMixin(pokemon: Pokemon, ci: CallbackInfo): void;
  }


  class RendererInjector {
  }


  class TaskConfigMixin {
  }

}

declare module 'me.rufia.fightorflight.net' {
  import { PacketContext } from 'NetworkManager';

  class CobblemonFightOrFlightNetwork {
    static init(): void;
  }


  class NetworkPacket {
  }


  class NetworkPacketHandler<T extends NetworkPacket = any> {
    handle(var1: T, var2: PacketContext): void;
  }

}

declare module 'me.rufia.fightorflight.net.handler' {
  import { NetworkPacketHandler } from 'me.rufia.fightorflight.net';
  import { SendCommandPacket, SendMoveSlotPacket } from 'me.rufia.fightorflight.net.packet';
  import { PacketContext } from 'NetworkManager';

  interface PokeStaffCmdHandler<T extends PokeStaffCmdPacket = any> extends NetworkPacketHandler<T> {}
  class PokeStaffCmdHandler<T extends PokeStaffCmdPacket = any> extends NetworkPacketHandler<T> {
  }


  interface SendCommandHandler extends PokeStaffCmdHandler<SendCommandPacket> {}
  class SendCommandHandler extends PokeStaffCmdHandler<SendCommandPacket> {
    handle(packet: SendCommandPacket, context: PacketContext): void;
  }


  interface SendMoveSlotHandler extends PokeStaffCmdHandler<SendMoveSlotPacket> {}
  class SendMoveSlotHandler extends PokeStaffCmdHandler<SendMoveSlotPacket> {
    handle(packet: SendMoveSlotPacket, context: PacketContext): void;
  }

}

declare module 'me.rufia.fightorflight.net.packet' {
  import { NetworkPacket } from 'me.rufia.fightorflight.net';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Type } from 'CustomPacketPayload';

  interface PokeStaffCmdPacket extends NetworkPacket, CustomPacketPayload {}
  class PokeStaffCmdPacket extends NetworkPacket {
    constructor(slot: number, isFromPokeStaff: boolean);
    get slot(): number;
    isFromPokeStaff(): boolean;
  }


  interface SendCommandPacket extends PokeStaffCmdPacket {}
  class SendCommandPacket extends PokeStaffCmdPacket {
    static readonly SEND_COMMAND_PACKET_ID: ResourceLocation;
    static readonly STREAM_CODEC: StreamCodec;
    static readonly TYPE: Type;
    constructor(slot: number, command: string, commandData: string, isFromPokeStaff: boolean);

    constructor(slot: number, command: string, commandData: string);
    get command(): string;
    get commandData(): string;
    type(): Type<CustomPacketPayload>;
  }


  interface SendMoveSlotPacket extends PokeStaffCmdPacket {}
  class SendMoveSlotPacket extends PokeStaffCmdPacket {
    static readonly SEND_MOVE_SLOT_PACKET_ID: ResourceLocation;
    static readonly STREAM_CODEC: StreamCodec;
    static readonly TYPE: Type;
    constructor(slot: number, moveSlot: number, isFromPokeStaff: boolean);

    constructor(slot: number, moveSlot: number);
    get moveSlot(): number;
    type(): Type<CustomPacketPayload>;
  }

}

declare module 'me.rufia.fightorflight.utils.explosion' {
  import { Explosion, Level, ExplosionDamageCalculator } from 'net.minecraft.world.level';
  import { Entity } from 'net.minecraft.world.entity';
  import { PokemonEntity } from 'com.cobblemon.mod.common.entity.pokemon';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { BlockInteraction } from 'Explosion';
  import { Optional } from 'java.util';
  import { Float } from 'java.lang';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { FluidState } from 'net.minecraft.world.level.material';

  interface FOFExplosion extends Explosion {}
  class FOFExplosion extends Explosion {
    readonly source: Entity;
    readonly radius: number;
    constructor(level: Level, source: Entity, pokemon: PokemonEntity, damageSource: DamageSource, damageCalculator: ExplosionDamageCalculator, toBlowX: number, toBlowY: number, toBlowZ: number, radius: number, fire: boolean, blockInteraction: BlockInteraction, shouldHurtAlly: boolean, isProjectileExplosion: boolean);
    static createExplosion(source: Entity, pokemonEntity: PokemonEntity, x: number, y: number, z: number, shouldHurtAlly: boolean, isProjectileExplosion: boolean): FOFExplosion;
    explode(): void;
    finalizeExplosion(spawnParticles: boolean): void;
    finalizeExplosion(): void;
    static getBlockExplosionResistance(state: BlockState, fluid: FluidState): Optional<number>;
    interactsWithBlocks(): boolean;
  }

}

declare module 'me.rufia.fightorflight.utils' {
  import { Map, List, Set } from 'java.util';
  import { Stat } from 'com.cobblemon.mod.common.api.pokemon.stats';
  import { Integer, Boolean, Float } from 'java.lang';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';
  import { PokemonEntity } from 'com.cobblemon.mod.common.entity.pokemon';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { ElementalType } from 'com.cobblemon.mod.common.api.types';
  import { Vec3i, BlockPos } from 'net.minecraft.core';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CMDMODE } from 'me.rufia.fightorflight.item.component.PokeStaffComponent';
  import { RandomSource } from 'net.minecraft.util';
  import { MoveData } from 'me.rufia.fightorflight.data.movedata';
  import { LivingEntity, Entity } from 'net.minecraft.world.entity';
  import { MoveTemplate, Move } from 'com.cobblemon.mod.common.api.moves';
  import { SimpleParticleType } from 'net.minecraft.core.particles';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { BlockHitResult } from 'net.minecraft.world.phys';

  class FOFEVCalculator {
    static calculate(battlePokemon: Pokemon, opponentPokemon: Pokemon): Map<Stat, number>;
  }


  class FOFExpCalculator {
    static calculate(battlePokemon: Pokemon, opponentPokemon: Pokemon): number;
  }


  class FOFHeldItemManager {
    static canUse(pokemonEntity: PokemonEntity, item: Item): boolean;
    static canUse(pokemon: Pokemon, item: Item): boolean;
    static canUseHeldItemDamageInfluencing(): boolean;
    static canUseHeldItemGlobal(): boolean;
    static canUseHeldItemHPInfluencing(): boolean;
  }


  class FOFMove {
    constructor(name: string, remainingCooldown: number, originalCooldown: number);
    get name(): string;
    get originalCooldown(): number;
    get remainingCooldown(): number;
    set originalCooldown(cooldown: number);
    set remainingCooldown(cooldown: number);
  }


  class FOFSoundManager {
    static getTypeSound(typeName: string): SoundEvent;
    static getTypeSound(type: ElementalType): SoundEvent;
  }


  class FOFUtils {
    static chanceTest(conditions: boolean[], chances: number[], source: RandomSource): boolean;
    static createCommandData(player: Player, cmdmode: CMDMODE): string;
    static multiSamplingCollisionCheckBlock(viewer: LivingEntity, target: LivingEntity, verticalSampleCount: number, horizontalSampleCount: number, allowedHit: number): boolean;
    static multiSamplingCollisionCheckBlock(viewer: LivingEntity, target: LivingEntity, verticalSampleCount: number, horizontalSampleCount: number): boolean;
    static registerMoveData(moveName: string, data: MoveData): void;
    static stringToVec3i(data: string): Vec3i;
    static teamCheck(entity1: LivingEntity, entity2: LivingEntity): boolean;
    static toAngle(num: number): number;
    static toRad(num: number): number;
  }


  class PokemonMultipliers {
    constructor(pokemonEntity: PokemonEntity);
    get maximumAttackDamage(): number;
    get maximumAttackDamageMultiplier(): number;
    get maximumDamageReduction(): number;
    get maximumRangeAttackDamage(): number;
    get maximumRangeAttackDamageMultiplier(): number;
    get minimumAttackDamage(): number;
    get minimumAttackDamageMultiplier(): number;
    get minimumRangeAttackDamage(): number;
    get minimumRangeAttackDamageMultiplier(): number;
    getPlayerOwnedDamageMultiplier(isRangeAttack: boolean, isMeleeAttack: boolean): number;
  }


  class PokemonUtils {
    static WildPokemonCanPerformUnprovokedAttack(pokemonEntity: PokemonEntity): boolean;
    static abilityIs(pokemonEntity: PokemonEntity, abilityName: string): boolean;
    static attackPositionAvailable(pokemonEntity: PokemonEntity): boolean;
    static calculateExtraSpeed(pokemonEntity: PokemonEntity): number;
    static canActivateSheerForce(pokemonEntity: PokemonEntity): boolean;
    static canBattlePlayer(serverPlayer: ServerPlayer): boolean;
    static canTaunt(pokemonEntity: PokemonEntity): boolean;
    static clearCommand(pokemonEntity: PokemonEntity): void;
    static createSonicBoomParticle(pokemonEntity: PokemonEntity, target: LivingEntity): void;
    static entityHpToPokemonHp(pokemonEntity: PokemonEntity, amount: number, isHealing: boolean): void;
    static findMove(pokemonEntity: PokemonEntity, moveName: string): Move;
    static findMoveEffectData(effect: string): boolean;
    static finishMoving(pokemonEntity: PokemonEntity): void;
    static get attackRadius(): number;
    static getAllLearnableMoveTemplates(pokemon: Pokemon): Set<MoveTemplate>;
    static getCommandData(pokemonEntity: PokemonEntity): string;
    static getCommandMode(pokemon: PokemonEntity): CMDMODE;
    static getHPStat(pokemon: Pokemon): number;
    static getHeldItem(pokemonEntity: PokemonEntity): ItemStack;
    static getHeldItem(pokemon: Pokemon): ItemStack;
    static getMaxHealth(pokemonEntity: PokemonEntity): number;
    static getMaxHealth(pokemon: Pokemon): number;
    static getMeleeMove(pokemonEntity: PokemonEntity): Move;
    static getMove(pokemonEntity: PokemonEntity): Move;
    static getNatureName(pokemonEntity: PokemonEntity): string;
    static getNatureName(pokemon: Pokemon): string;
    static getRangeAttackMove(pokemonEntity: PokemonEntity): Move;
    static getStatusMove(pokemonEntity: PokemonEntity): Move;
    static getTarget(pokemonEntity: PokemonEntity): LivingEntity;
    static hasType(pokemonEntity: PokemonEntity, type: ElementalType): boolean;
    static hasType(pokemon: Pokemon, type: ElementalType): boolean;
    static isExplosiveMove(moveName: string): boolean;
    static isMeleeAttackMove(move: Move): boolean;
    static isPhysicalMove(move: Move): boolean;
    static isRangeAttackMove(move: Move): boolean;
    static isSheerForce(pokemonEntity: PokemonEntity): boolean;
    static isSpecialMove(move: Move): boolean;
    static isStatusMove(move: Move): boolean;
    static isUsingNewHealthMechanic(): boolean;
    static makeCobblemonParticle(entity: Entity, particleName: string): void;
    static makeParticle(particleAmount: number, entity: Entity, particleType: SimpleParticleType): void;
    static moveAttackCommandAvailable(pokemonEntity: PokemonEntity): boolean;
    static moveCommandAvailable(pokemonEntity: PokemonEntity): boolean;
    static pokemonEntityApproachPos(pokemonEntity: PokemonEntity, pos: BlockPos, speedModifier: number): void;
    static pokemonForceEncounterPvE(serverPlayer: ServerPlayer, wildPokemon: PokemonEntity): boolean;
    static pokemonForceEncounterPvE(playerPokemon: PokemonEntity, wildPokemon: PokemonEntity): boolean;
    static pokemonForceEncounterPvP(playerPokemon: PokemonEntity, opponentPokemon: PokemonEntity): boolean;
    static pokemonForceEncounterPvP(serverPlayer: ServerPlayer, opponentPokemon: PokemonEntity): boolean;
    static pokemonTryForceEncounter(attackingPokemon: PokemonEntity, hurtTarget: Entity): boolean;
    static sendAnimationPacket(pokemonEntity: PokemonEntity, mode: string): void;
    static setHurtByPlayer(pokemonEntity: PokemonEntity, target: Entity): void;
    static shouldCheckPokeStaff(): boolean;
    static shouldDisableFollowOwner(pokemon: PokemonEntity): boolean;
    static shouldFightTarget(pokemonEntity: PokemonEntity): boolean;
    static shouldMelee(pokemonEntity: PokemonEntity): boolean;
    static shouldRetreat(pokemonEntity: PokemonEntity): boolean;
    static shouldShoot(pokemonEntity: PokemonEntity): boolean;
    static shouldStopRunningAfterHurt(pokemonEntity: PokemonEntity): boolean;
    static stayCommandAvailable(pokemonEntity: PokemonEntity): boolean;
    static taunt(pokemonEntity: PokemonEntity): void;
    static updateMoveEvolutionProgress(pokemon: Pokemon, move: MoveTemplate): void;
  }


  class RayTrace {
    static rayTraceBlock(viewer: LivingEntity, distance: number): BlockHitResult;
    static rayTraceEntity(viewer: LivingEntity, distance: number): LivingEntity;
  }


  class TargetingWhitelist {
    static getWhitelist(hasOwner: boolean): Set<string>;
    static getWhitelist(pokemonEntity: PokemonEntity): Set<string>;
    static getWhitelist(pokemon: Pokemon): Set<string>;
    static init(): void;
  }


  class TypeEffectiveness {
    static getTypeEffectiveness(offense: PokemonEntity, defense: PokemonEntity): number;
    static getTypeEffectiveness(offense: PokemonEntity, defense: PokemonEntity, shouldCheckAbility: boolean): number;
    static getTypeEffectiveness(offenseMove: Move, defenseType: ElementalType): number;
    static getTypeEffectiveness(offenseType: ElementalType, defenseType: ElementalType): number;
    static getTypeEffectiveness(offenseTypeName: string, defenseTypeName: string): number;
    static getTypeEffectivenessSimple(offenseType: ElementalType, defendingPokemon: PokemonEntity): number;
    static getTypeEffectivenessSimple(typeName: string, defendingPokemon: PokemonEntity): number;
  }

}

declare module 'me.rufia.fightorflight.utils.listeners' {
  import { SimplePreparableReloadListener } from 'net.minecraft.server.packs.resources';
  import { Map } from 'java.util';

  interface BehaviorDataListener extends SimplePreparableReloadListener<Map> {}
  class BehaviorDataListener extends SimplePreparableReloadListener<Map> {
  }


  interface MoveDataListener extends SimplePreparableReloadListener<Map> {}
  class MoveDataListener extends SimplePreparableReloadListener<Map> {
  }

}

declare module 'me.rufia.fightorflight.utils.signednumber' {
  interface SignedFloat extends SignedNumber {}
  class SignedFloat extends SignedNumber {
    check(i: number): boolean;
    check(i: number): boolean;
    load(str: string): boolean;
  }


  interface SignedInt extends SignedNumber {}
  class SignedInt extends SignedNumber {
    check(i: number): boolean;
    load(str: string): boolean;
  }


  class SignedNumber {
    load(var1: string): boolean;
  }

}