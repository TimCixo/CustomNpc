declare module 'de.markusbordihn.easynpc.access' {
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { UUID } from 'java.util';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { Level, SpawnData } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { SpawnerType } from 'de.markusbordihn.easynpc.data.spawner';

  class AccessManager {
    static getEasyNPCEntityByUUID(uuid: UUID, serverPlayer: ServerPlayer): EasyNPC<any>;
    static hasAccess(context: CommandSourceStack, uuid: UUID): boolean;
    static hasAccess(serverPlayer: ServerPlayer, easyNPC: EasyNPC<any>): boolean;
    static hasAccess(serverPlayer: ServerPlayer, uuid: UUID): boolean;
  }


  class SpawnerAccessHelper {
    get maxNearbyEntities(): number;
    get maxSpawnDelay(): number;
    get minSpawnDelay(): number;
    get requiredPlayerRange(): number;
    get spawnCount(): number;
    get spawnDataDirect(): SpawnData;
    get spawnDelay(): number;
    get spawnRange(): number;
    get spawnerType(): SpawnerType;
    initializeSpawnerData(var1: SpawnerType, var2: SpawnData): void;
    set maxNearbyEntities(var1: number);
    set maxSpawnDelay(var1: number);
    set minSpawnDelay(var1: number);
    set requiredPlayerRange(var1: number);
    set spawnCount(var1: number);
    set spawnDelay(var1: number);
    set spawnRange(var1: number);
    setSpawnDataDirect(var1: Level, var2: BlockPos, var3: SpawnData): void;
  }

}

declare module 'de.markusbordihn.easynpc.api.model.CustomModelConfig' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface RenderMode extends Enum<RenderMode> {}
  class RenderMode extends Enum<RenderMode> {
    static readonly NONE: RenderMode;
    static readonly OVERLAY: RenderMode;
    static readonly OVERLAY_USE_ENTITY_TEXTURE: RenderMode;
    static readonly OVERLAY_USE_VARIANT_TEXTURE: RenderMode;
    static readonly REPLACEMENT: RenderMode;
    static readonly REPLACEMENT_USE_ENTITY_TEXTURE: RenderMode;
    static readonly REPLACEMENT_USE_VARIANT_TEXTURE: RenderMode;
    static valueOf(name: string): RenderMode;
    static values(): RenderMode[];
  }

}

declare module 'de.markusbordihn.easynpc.api.npc' {
  import { Allay } from 'net.minecraft.world.entity.animal.allay';
  import { EasyNPCBase, EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { RawNPCType, NPCType } from 'de.markusbordihn.easynpc.data.npc';
  import { EntityType, Entity, SpawnGroupData, MobSpawnType, LivingEntity, EntityDimensions, Pose, PathfinderMob } from 'net.minecraft.world.entity';
  import { Level, ServerLevelAccessor } from 'net.minecraft.world.level';
  import { Enum, Boolean } from 'java.lang';
  import { FakePlayer } from 'de.markusbordihn.easynpc.server.player';
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { TickerType } from 'de.markusbordihn.easynpc.data.ticker';
  import { EnumMap, UUID } from 'java.util';
  import { StatusDataType } from 'de.markusbordihn.easynpc.data.status';
  import { Component } from 'net.minecraft.network.chat';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { DimensionTransition } from 'net.minecraft.world.level.portal';
  import { InteractionResult, InteractionHand, DifficultyInstance } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { MerchantOffers, MerchantOffer } from 'net.minecraft.world.item.trading';
  import { ProjectileWeaponItem, ItemStack } from 'net.minecraft.world.item';
  import { GoalSelector } from 'net.minecraft.world.entity.ai.goal';
  import { Builder } from 'SynchedEntityData';
  import { SynchedDataIndex } from 'de.markusbordihn.easynpc.data.synched';
  import { ServerEntityData, ServerDataAccessor } from 'de.markusbordihn.easynpc.data.server';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ConfigurationData } from 'de.markusbordihn.easynpc.data.configuration';
  import { SkinModel } from 'de.markusbordihn.easynpc.data.skin';
  import { ModelType } from 'de.markusbordihn.easynpc.data.model';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Bogged, Creeper, EnderMan, Evoker, Illusioner, Pillager, Vex, Vindicator, Witch } from 'net.minecraft.world.entity.monster';
  import { Cat, Chicken, Fox, IronGolem, Pig, Wolf } from 'net.minecraft.world.entity.animal';

  interface AllayRaw extends EasyNPCBase<Allay>, Allay {}
  class AllayRaw extends EasyNPCBase<Allay> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Allay>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Allay>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  class BaseEasyNPC<T extends Mob = any> {
    get configurationData(): ConfigurationData;
  }


  interface BoggedRaw extends EasyNPCBase<Bogged>, Bogged {}
  class BoggedRaw extends EasyNPCBase<Bogged> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Bogged>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Bogged>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface CatRaw extends EasyNPCBase<Cat>, Cat {}
  class CatRaw extends EasyNPCBase<Cat> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Cat>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Cat>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get ownerUUID(): UUID;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    handleSkinVariantTypeChange(variant: Enum<any>): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface ChickenRaw extends EasyNPCBase<Chicken>, Chicken {}
  class ChickenRaw extends EasyNPCBase<Chicken> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Chicken>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Chicken>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface CreeperRaw extends EasyNPCBase<Creeper>, Creeper {}
  class CreeperRaw extends EasyNPCBase<Creeper> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Creeper>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Creeper>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface EnderManRaw extends EasyNPCBase<EnderMan>, EnderMan {}
  class EnderManRaw extends EasyNPCBase<EnderMan> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<EnderMan>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<EnderMan>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface EvokerRaw extends EasyNPCBase<Evoker>, Evoker {}
  class EvokerRaw extends EasyNPCBase<Evoker> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Evoker>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Evoker>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface FoxRaw extends EasyNPCBase<Fox>, Fox {}
  class FoxRaw extends EasyNPCBase<Fox> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Fox>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Fox>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface HumanoidRaw extends EasyNPCBase<PathfinderMob>, PathfinderMob {}
  class HumanoidRaw extends EasyNPCBase<PathfinderMob> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<PathfinderMob>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<PathfinderMob>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface HumanoidSlimRaw extends EasyNPCBase<PathfinderMob>, PathfinderMob {}
  class HumanoidSlimRaw extends EasyNPCBase<PathfinderMob> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<PathfinderMob>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<PathfinderMob>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface IllusionerRaw extends EasyNPCBase<Illusioner>, Illusioner {}
  class IllusionerRaw extends EasyNPCBase<Illusioner> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Illusioner>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Illusioner>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface IronGolemRaw extends EasyNPCBase<IronGolem>, IronGolem {}
  class IronGolemRaw extends EasyNPCBase<IronGolem> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<IronGolem>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<IronGolem>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface PathfinderMobRaw extends EasyNPCBase<PathfinderMob>, PathfinderMob {}
  class PathfinderMobRaw extends EasyNPCBase<PathfinderMob> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<PathfinderMob>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<PathfinderMob>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface PigRaw extends EasyNPCBase<Pig>, Pig {}
  class PigRaw extends EasyNPCBase<Pig> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Pig>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Pig>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface PillagerRaw extends EasyNPCBase<Pillager>, Pillager {}
  class PillagerRaw extends EasyNPCBase<Pillager> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Pillager>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Pillager>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface VexRaw extends EasyNPCBase<Vex>, Vex {}
  class VexRaw extends EasyNPCBase<Vex> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Vex>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Vex>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface VindicatorRaw extends EasyNPCBase<Vindicator>, Vindicator {}
  class VindicatorRaw extends EasyNPCBase<Vindicator> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Vindicator>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Vindicator>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface WitchRaw extends EasyNPCBase<Witch>, Witch {}
  class WitchRaw extends EasyNPCBase<Witch> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Witch>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Witch>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface WolfRaw extends EasyNPCBase<Wolf>, Wolf {}
  class WolfRaw extends EasyNPCBase<Wolf> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Wolf>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Wolf>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get ownerUUID(): UUID;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }

}

declare module 'de.markusbordihn.easynpc.api.npc.base' {
  import { AllayRaw, CatRaw, ChickenRaw, CreeperRaw, EnderManRaw, FoxRaw, PathfinderMobRaw, IronGolemRaw, PigRaw, VexRaw, WitchRaw, WolfRaw } from 'de.markusbordihn.easynpc.api.npc.raw';
  import { BaseEasyNPC } from 'de.markusbordihn.easynpc.api.npc';
  import { EntityType, PathfinderMob } from 'net.minecraft.world.entity';
  import { Allay } from 'net.minecraft.world.entity.animal.allay';
  import { Level } from 'net.minecraft.world.level';
  import { Enum } from 'java.lang';
  import { Builder } from 'AttributeSupplier';
  import { ConfigurationData } from 'de.markusbordihn.easynpc.data.configuration';
  import { SoundDataSet } from 'de.markusbordihn.easynpc.data.sound';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Cat, Chicken, Fox, IronGolem, Pig, Wolf } from 'net.minecraft.world.entity.animal';
  import { Creeper, EnderMan, Vex, Witch } from 'net.minecraft.world.entity.monster';
  import { SkinModel } from 'de.markusbordihn.easynpc.data.skin';

  interface AllayBase extends BaseEasyNPC<AllayRaw>, AllayRaw {}
  class AllayBase extends BaseEasyNPC<AllayRaw> {
    constructor(entityType: EntityType<Allay>, level: Level);

    constructor(entityType: EntityType<Allay>, level: Level, variantType: Enum<any>);
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    get entityDialogScaling(): number;
    get entityDialogTop(): number;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    travel(vec3: Vec3): void;
  }


  interface CatBase extends BaseEasyNPC<CatRaw>, CatRaw {}
  class CatBase extends BaseEasyNPC<CatRaw> {
    constructor(entityType: EntityType<Cat>, level: Level);

    constructor(entityType: EntityType<Cat>, level: Level, variantType: Enum<any>);
    canUseOffHand(): boolean;
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    get entityDialogScaling(): number;
    get entityDialogTop(): number;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    travel(vec3: Vec3): void;
  }


  interface ChickenBase extends BaseEasyNPC<ChickenRaw>, ChickenRaw {}
  class ChickenBase extends BaseEasyNPC<ChickenRaw> {
    constructor(entityType: EntityType<Chicken>, level: Level);

    constructor(entityType: EntityType<Chicken>, level: Level, variantType: Enum<any>);
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    get entityDialogScaling(): number;
    get entityDialogTop(): number;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    travel(vec3: Vec3): void;
  }


  interface CreeperBase extends BaseEasyNPC<CreeperRaw>, CreeperRaw {}
  class CreeperBase extends BaseEasyNPC<CreeperRaw> {
    constructor(entityType: EntityType<Creeper>, level: Level);

    constructor(entityType: EntityType<Creeper>, level: Level, variantType: Enum<any>);
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    get entityDialogLeft(): number;
    get entityDialogTop(): number;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    isIgnited(): boolean;
    tick(): void;
    travel(vec3: Vec3): void;
  }


  interface EnderManBase extends BaseEasyNPC<EnderManRaw>, EnderManRaw {}
  class EnderManBase extends BaseEasyNPC<EnderManRaw> {
    constructor(entityType: EntityType<EnderMan>, level: Level);

    constructor(entityType: EntityType<EnderMan>, level: Level, variantType: Enum<any>);
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    get entityDialogLeft(): number;
    get entityDialogTop(): number;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    travel(vec3: Vec3): void;
  }


  interface FoxBase extends BaseEasyNPC<FoxRaw>, FoxRaw {}
  class FoxBase extends BaseEasyNPC<FoxRaw> {
    constructor(entityType: EntityType<Fox>, level: Level);

    constructor(entityType: EntityType<Fox>, level: Level, variantType: Enum<any>);
    canUseOffHand(): boolean;
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    travel(vec3: Vec3): void;
  }


  interface HumanoidBase extends BaseEasyNPC<PathfinderMobRaw>, PathfinderMobRaw {}
  class HumanoidBase extends BaseEasyNPC<PathfinderMobRaw> {
    constructor(entityType: EntityType<PathfinderMob>, level: Level);

    constructor(entityType: EntityType<PathfinderMob>, level: Level, variantType: Enum<any>);
    canUseArmor(): boolean;
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    get defaultSkinVariantType(): Enum<any>;
    get skinVariantTypes(): Enum<any>;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    getSkinVariantType(name: string): Enum<any>;
  }


  interface HumanoidSlimBase extends BaseEasyNPC<PathfinderMobRaw>, PathfinderMobRaw {}
  class HumanoidSlimBase extends BaseEasyNPC<PathfinderMobRaw> {
    constructor(entityType: EntityType<PathfinderMob>, level: Level);

    constructor(entityType: EntityType<PathfinderMob>, level: Level, variantType: Enum<any>);
    canUseArmor(): boolean;
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    get defaultSkinVariantType(): Enum<any>;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    getSkinVariantType(name: string): Enum<any>;
  }


  interface IronGolemBase extends BaseEasyNPC<IronGolemRaw>, IronGolemRaw {}
  class IronGolemBase extends BaseEasyNPC<IronGolemRaw> {
    constructor(entityType: EntityType<IronGolem>, level: Level);

    constructor(entityType: EntityType<IronGolem>, level: Level, variantType: Enum<any>);
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    get entityDialogScaling(): number;
    get entitySkinScaling(): number;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    travel(vec3: Vec3): void;
  }


  interface PigBase extends BaseEasyNPC<PigRaw>, PigRaw {}
  class PigBase extends BaseEasyNPC<PigRaw> {
    constructor(entityType: EntityType<Pig>, level: Level);

    constructor(entityType: EntityType<Pig>, level: Level, variantType: Enum<any>);
    canUseOffHand(): boolean;
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    get entityDialogTop(): number;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    travel(vec3: Vec3): void;
  }


  interface VexBase extends BaseEasyNPC<VexRaw>, VexRaw {}
  class VexBase extends BaseEasyNPC<VexRaw> {
    constructor(entityType: EntityType<Vex>, level: Level);

    constructor(entityType: EntityType<Vex>, level: Level, variantType: Enum<any>);
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    get entityDialogLeft(): number;
    get entityDialogTop(): number;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    travel(vec3: Vec3): void;
  }


  interface WitchBase extends BaseEasyNPC<WitchRaw>, WitchRaw {}
  class WitchBase extends BaseEasyNPC<WitchRaw> {
    constructor(entityType: EntityType<Witch>, level: Level);

    constructor(entityType: EntityType<Witch>, level: Level, variantType: Enum<any>);
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    get entityDialogLeft(): number;
    get entityDialogTop(): number;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    travel(vec3: Vec3): void;
  }


  interface WolfBase extends BaseEasyNPC<WolfRaw>, WolfRaw {}
  class WolfBase extends BaseEasyNPC<WolfRaw> {
    constructor(entityType: EntityType<Wolf>, level: Level);

    constructor(entityType: EntityType<Wolf>, level: Level, variantType: Enum<any>);
    canUseOffHand(): boolean;
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    get entityDialogTop(): number;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    travel(vec3: Vec3): void;
  }

}

declare module 'de.markusbordihn.easynpc.api.npc.base.ghast' {
  import { GhastRaw } from 'de.markusbordihn.easynpc.api.npc.raw';
  import { BaseEasyNPC } from 'de.markusbordihn.easynpc.api.npc';
  import { EntityType, SpawnGroupData, MobSpawnType } from 'net.minecraft.world.entity';
  import { Ghast } from 'net.minecraft.world.entity.monster';
  import { Level, ServerLevelAccessor } from 'net.minecraft.world.level';
  import { Enum } from 'java.lang';
  import { Builder } from 'AttributeSupplier';
  import { ConfigurationData } from 'de.markusbordihn.easynpc.data.configuration';
  import { SoundDataSet } from 'de.markusbordihn.easynpc.data.sound';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { DifficultyInstance } from 'net.minecraft.world';
  import { CustomScale } from 'de.markusbordihn.easynpc.data.scale';

  interface GhastBase extends BaseEasyNPC<GhastRaw>, GhastRaw {}
  class GhastBase extends BaseEasyNPC<GhastRaw> {
    constructor(entityType: EntityType<Ghast>, level: Level);

    constructor(entityType: EntityType<Ghast>, level: Level, variantType: Enum<any>);
    canFly(): boolean;
    canUseOffHand(): boolean;
    static createAttributes(): Builder;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get configurationData(): ConfigurationData;
    get entityDialogTop(): number;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    travel(vec3: Vec3): void;
  }


  interface GhastMediumBase extends GhastBase {}
  class GhastMediumBase extends GhastBase {
    constructor(entityType: EntityType<Ghast>, level: Level);

    constructor(entityType: EntityType<Ghast>, level: Level, variantType: Enum<any>);
    get defaultModelScale(): CustomScale;
  }


  interface GhastSmallBase extends GhastBase {}
  class GhastSmallBase extends GhastBase {
    constructor(entityType: EntityType<Ghast>, level: Level);

    constructor(entityType: EntityType<Ghast>, level: Level, variantType: Enum<any>);
    get defaultModelScale(): CustomScale;
  }

}

declare module 'de.markusbordihn.easynpc.api.npc.base.horse' {
  import { HorseRaw } from 'de.markusbordihn.easynpc.api.npc.raw.horse';
  import { BaseEasyNPC } from 'de.markusbordihn.easynpc.api.npc';
  import { EntityType } from 'net.minecraft.world.entity';
  import { Horse } from 'net.minecraft.world.entity.animal.horse';
  import { Level } from 'net.minecraft.world.level';
  import { Enum } from 'java.lang';
  import { Builder } from 'AttributeSupplier';
  import { ConfigurationData } from 'de.markusbordihn.easynpc.data.configuration';
  import { SkinModel } from 'de.markusbordihn.easynpc.data.skin';
  import { SoundDataSet } from 'de.markusbordihn.easynpc.data.sound';
  import { Vec3 } from 'net.minecraft.world.phys';

  interface HorseBase extends BaseEasyNPC<HorseRaw>, HorseRaw {}
  class HorseBase extends BaseEasyNPC<HorseRaw> {
    constructor(entityType: EntityType<Horse>, level: Level);

    constructor(entityType: EntityType<Horse>, level: Level, variantType: Enum<any>);
    canUseMainHand(): boolean;
    canUseOffHand(): boolean;
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    get entityDialogTop(): number;
    get skinModel(): SkinModel;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    travel(vec3: Vec3): void;
  }

}

declare module 'de.markusbordihn.easynpc.api.npc.base.illager' {
  import { EvokerRaw, IllusionerRaw, PillagerRaw, VindicatorRaw } from 'de.markusbordihn.easynpc.api.npc.raw.illager';
  import { BaseEasyNPC } from 'de.markusbordihn.easynpc.api.npc';
  import { EntityType } from 'net.minecraft.world.entity';
  import { Evoker, Illusioner, Pillager, Vindicator } from 'net.minecraft.world.entity.monster';
  import { Level } from 'net.minecraft.world.level';
  import { Enum } from 'java.lang';
  import { Builder } from 'AttributeSupplier';
  import { ConfigurationData } from 'de.markusbordihn.easynpc.data.configuration';
  import { SoundDataSet } from 'de.markusbordihn.easynpc.data.sound';
  import { Vec3 } from 'net.minecraft.world.phys';

  interface EvokerBase extends BaseEasyNPC<EvokerRaw>, EvokerRaw {}
  class EvokerBase extends BaseEasyNPC<EvokerRaw> {
    constructor(entityType: EntityType<Evoker>, level: Level);

    constructor(entityType: EntityType<Evoker>, level: Level, variant: Enum<any>);
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    travel(vec3: Vec3): void;
  }


  interface IllusionerBase extends BaseEasyNPC<IllusionerRaw>, IllusionerRaw {}
  class IllusionerBase extends BaseEasyNPC<IllusionerRaw> {
    constructor(entityType: EntityType<Illusioner>, level: Level);

    constructor(entityType: EntityType<Illusioner>, level: Level, variant: Enum<any>);
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    travel(vec3: Vec3): void;
  }


  interface PillagerBase extends BaseEasyNPC<PillagerRaw>, PillagerRaw {}
  class PillagerBase extends BaseEasyNPC<PillagerRaw> {
    constructor(entityType: EntityType<Pillager>, level: Level);

    constructor(entityType: EntityType<Pillager>, level: Level, variant: Enum<any>);
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    travel(vec3: Vec3): void;
  }


  interface VindicatorBase extends BaseEasyNPC<VindicatorRaw>, VindicatorRaw {}
  class VindicatorBase extends BaseEasyNPC<VindicatorRaw> {
    constructor(entityType: EntityType<Vindicator>, level: Level);

    constructor(entityType: EntityType<Vindicator>, level: Level, variant: Enum<any>);
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    travel(vec3: Vec3): void;
  }

}

declare module 'de.markusbordihn.easynpc.api.npc.base.piglin' {
  import { PiglinRaw, PiglinBruteRaw, ZombifiedPiglinRaw } from 'de.markusbordihn.easynpc.api.npc.raw.piglin';
  import { BaseEasyNPC } from 'de.markusbordihn.easynpc.api.npc';
  import { EntityType } from 'net.minecraft.world.entity';
  import { Piglin, PiglinBrute } from 'net.minecraft.world.entity.monster.piglin';
  import { Level } from 'net.minecraft.world.level';
  import { Enum } from 'java.lang';
  import { Builder } from 'AttributeSupplier';
  import { ConfigurationData } from 'de.markusbordihn.easynpc.data.configuration';
  import { SoundDataSet } from 'de.markusbordihn.easynpc.data.sound';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ZombifiedPiglin } from 'net.minecraft.world.entity.monster';

  interface PiglinBase extends BaseEasyNPC<PiglinRaw>, PiglinRaw {}
  class PiglinBase extends BaseEasyNPC<PiglinRaw> {
    constructor(entityType: EntityType<Piglin>, level: Level);

    constructor(entityType: EntityType<Piglin>, level: Level, variantType: Enum<any>);
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    isConverting(): boolean;
    travel(vec3: Vec3): void;
  }


  interface PiglinBruteBase extends BaseEasyNPC<PiglinBruteRaw>, PiglinBruteRaw {}
  class PiglinBruteBase extends BaseEasyNPC<PiglinBruteRaw> {
    constructor(entityType: EntityType<PiglinBrute>, level: Level);
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    travel(vec3: Vec3): void;
  }


  interface ZombifiedPiglinBase extends BaseEasyNPC<ZombifiedPiglinRaw>, ZombifiedPiglinRaw {}
  class ZombifiedPiglinBase extends BaseEasyNPC<ZombifiedPiglinRaw> {
    constructor(entityType: EntityType<ZombifiedPiglin>, level: Level);
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    travel(vec3: Vec3): void;
  }

}

declare module 'de.markusbordihn.easynpc.api.npc.base.skeleton' {
  import { BoggedRaw } from 'de.markusbordihn.easynpc.api.npc.raw';
  import { BaseEasyNPC } from 'de.markusbordihn.easynpc.api.npc';
  import { EntityType } from 'net.minecraft.world.entity';
  import { Bogged, Skeleton, Stray, WitherSkeleton } from 'net.minecraft.world.entity.monster';
  import { Level } from 'net.minecraft.world.level';
  import { Builder } from 'AttributeSupplier';
  import { ConfigurationData } from 'de.markusbordihn.easynpc.data.configuration';
  import { SoundDataSet } from 'de.markusbordihn.easynpc.data.sound';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { SkeletonRaw, StrayRaw, WitherSkeletonRaw } from 'de.markusbordihn.easynpc.api.npc.raw.skeleton';
  import { Enum } from 'java.lang';

  interface BoggedBase extends BaseEasyNPC<BoggedRaw>, BoggedRaw {}
  class BoggedBase extends BaseEasyNPC<BoggedRaw> {
    constructor(entityType: EntityType<Bogged>, level: Level);
    canUseArmor(): boolean;
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    travel(vec3: Vec3): void;
  }


  interface SkeletonBase extends BaseEasyNPC<SkeletonRaw>, SkeletonRaw {}
  class SkeletonBase extends BaseEasyNPC<SkeletonRaw> {
    constructor(entityType: EntityType<Skeleton>, level: Level);

    constructor(entityType: EntityType<Skeleton>, level: Level, variantType: Enum<any>);
    canUseArmor(): boolean;
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    travel(vec3: Vec3): void;
  }


  interface StrayBase extends BaseEasyNPC<StrayRaw>, StrayRaw {}
  class StrayBase extends BaseEasyNPC<StrayRaw> {
    constructor(entityType: EntityType<Stray>, level: Level);
    canUseArmor(): boolean;
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    travel(vec3: Vec3): void;
  }


  interface WitherSkeletonBase extends BaseEasyNPC<WitherSkeletonRaw>, WitherSkeletonRaw {}
  class WitherSkeletonBase extends BaseEasyNPC<WitherSkeletonRaw> {
    constructor(entityType: EntityType<WitherSkeleton>, level: Level);
    canUseArmor(): boolean;
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    travel(vec3: Vec3): void;
  }

}

declare module 'de.markusbordihn.easynpc.api.npc.base.slime' {
  import { SlimeRaw } from 'de.markusbordihn.easynpc.api.npc.raw';
  import { BaseEasyNPC } from 'de.markusbordihn.easynpc.api.npc';
  import { EntityType } from 'net.minecraft.world.entity';
  import { Slime } from 'net.minecraft.world.entity.monster';
  import { Level } from 'net.minecraft.world.level';
  import { Enum } from 'java.lang';
  import { Builder } from 'AttributeSupplier';
  import { ConfigurationData } from 'de.markusbordihn.easynpc.data.configuration';
  import { SoundDataSet } from 'de.markusbordihn.easynpc.data.sound';
  import { Vec3 } from 'net.minecraft.world.phys';

  interface SlimeBase extends BaseEasyNPC<SlimeRaw>, SlimeRaw {}
  class SlimeBase extends BaseEasyNPC<SlimeRaw> {
    constructor(entityType: EntityType<Slime>, level: Level);

    constructor(entityType: EntityType<Slime>, level: Level, variantType: Enum<any>);

    constructor(entityType: EntityType<Slime>, level: Level, variantType: Enum<any>, size: number);
    canJump(): boolean;
    canUseOffHand(): boolean;
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    get entityDialogTop(): number;
    get slimeJumpDelay(): number;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    shouldPlayJumpSound(): boolean;
    travel(vec3: Vec3): void;
  }


  interface SlimeLargeBase extends SlimeBase {}
  class SlimeLargeBase extends SlimeBase {
    constructor(entityType: EntityType<Slime>, level: Level);

    constructor(entityType: EntityType<Slime>, level: Level, variantType: Enum<any>);
    get entityDialogTop(): number;
  }


  interface SlimeSmallBase extends SlimeBase {}
  class SlimeSmallBase extends SlimeBase {
    constructor(entityType: EntityType<Slime>, level: Level);

    constructor(entityType: EntityType<Slime>, level: Level, variantType: Enum<any>);
    get entityDialogTop(): number;
  }

}

declare module 'de.markusbordihn.easynpc.api.npc.base.spider' {
  import { SpiderRaw } from 'de.markusbordihn.easynpc.api.npc.raw.spider';
  import { BaseEasyNPC } from 'de.markusbordihn.easynpc.api.npc';
  import { EntityType } from 'net.minecraft.world.entity';
  import { Spider } from 'net.minecraft.world.entity.monster';
  import { Level } from 'net.minecraft.world.level';
  import { Enum } from 'java.lang';
  import { Builder } from 'AttributeSupplier';
  import { ConfigurationData } from 'de.markusbordihn.easynpc.data.configuration';
  import { SoundDataSet } from 'de.markusbordihn.easynpc.data.sound';
  import { Vec3 } from 'net.minecraft.world.phys';

  interface SpiderBase extends BaseEasyNPC<SpiderRaw>, SpiderRaw {}
  class SpiderBase extends BaseEasyNPC<SpiderRaw> {
    constructor(entityType: EntityType<Spider>, level: Level);

    constructor(entityType: EntityType<Spider>, level: Level, variantType: Enum<any>);
    canUseArmor(): boolean;
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    travel(vec3: Vec3): void;
  }

}

declare module 'de.markusbordihn.easynpc.api.npc.base.villager' {
  import { VillagerRaw, ZombieVillagerRaw } from 'de.markusbordihn.easynpc.api.npc.raw.villager';
  import { BaseEasyNPC } from 'de.markusbordihn.easynpc.api.npc';
  import { EntityType } from 'net.minecraft.world.entity';
  import { Villager } from 'net.minecraft.world.entity.npc';
  import { Level } from 'net.minecraft.world.level';
  import { Enum } from 'java.lang';
  import { Builder } from 'AttributeSupplier';
  import { Component } from 'net.minecraft.network.chat';
  import { ConfigurationData } from 'de.markusbordihn.easynpc.data.configuration';
  import { SoundDataSet } from 'de.markusbordihn.easynpc.data.sound';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ZombieVillager } from 'net.minecraft.world.entity.monster';

  interface VillagerBase extends BaseEasyNPC<VillagerRaw>, VillagerRaw {}
  class VillagerBase extends BaseEasyNPC<VillagerRaw> {
    constructor(entityType: EntityType<Villager>, level: Level);

    constructor(entityType: EntityType<Villager>, level: Level, variantType: Enum<any>);
    canUseOffHand(): boolean;
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    get name(): Component;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    hasProfessions(): boolean;
    travel(vec3: Vec3): void;
    wantsToSpawnGolem(gameTime: number): boolean;
  }


  interface ZombieVillagerBase extends BaseEasyNPC<ZombieVillagerRaw>, ZombieVillagerRaw {}
  class ZombieVillagerBase extends BaseEasyNPC<ZombieVillagerRaw> {
    constructor(entityType: EntityType<ZombieVillager>, level: Level);

    constructor(entityType: EntityType<ZombieVillager>, level: Level, variantType: Enum<any>);
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    get name(): Component;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    hasProfessions(): boolean;
    travel(vec3: Vec3): void;
  }

}

declare module 'de.markusbordihn.easynpc.api.npc.base.zombie' {
  import { DrownedRaw, HuskRaw, ZombieRaw } from 'de.markusbordihn.easynpc.api.npc.raw.zombie';
  import { BaseEasyNPC } from 'de.markusbordihn.easynpc.api.npc';
  import { EntityType } from 'net.minecraft.world.entity';
  import { Drowned, Husk, Zombie } from 'net.minecraft.world.entity.monster';
  import { Level } from 'net.minecraft.world.level';
  import { Enum } from 'java.lang';
  import { Builder } from 'AttributeSupplier';
  import { ConfigurationData } from 'de.markusbordihn.easynpc.data.configuration';
  import { SoundDataSet } from 'de.markusbordihn.easynpc.data.sound';
  import { Vec3 } from 'net.minecraft.world.phys';

  interface DrownedBase extends BaseEasyNPC<DrownedRaw>, DrownedRaw {}
  class DrownedBase extends BaseEasyNPC<DrownedRaw> {
    constructor(entityType: EntityType<Drowned>, level: Level);

    constructor(entityType: EntityType<Drowned>, level: Level, variantType: Enum<any>);
    canUseArmor(): boolean;
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    travel(vec3: Vec3): void;
  }


  interface HuskBase extends BaseEasyNPC<HuskRaw>, HuskRaw {}
  class HuskBase extends BaseEasyNPC<HuskRaw> {
    constructor(entityType: EntityType<Husk>, level: Level);

    constructor(entityType: EntityType<Husk>, level: Level, variantType: Enum<any>);
    canUseArmor(): boolean;
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    travel(vec3: Vec3): void;
  }


  interface ZombieBase extends BaseEasyNPC<ZombieRaw>, ZombieRaw {}
  class ZombieBase extends BaseEasyNPC<ZombieRaw> {
    constructor(entityType: EntityType<Zombie>, level: Level);

    constructor(entityType: EntityType<Zombie>, level: Level, variantType: Enum<any>);
    canUseArmor(): boolean;
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    travel(vec3: Vec3): void;
  }

}

declare module 'de.markusbordihn.easynpc.api.npc.horse' {
  import { Horse } from 'net.minecraft.world.entity.animal.horse';
  import { EasyNPCBase, EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { RawNPCType, NPCType } from 'de.markusbordihn.easynpc.data.npc';
  import { EntityType, Entity, SpawnGroupData, MobSpawnType, LivingEntity, EntityDimensions, Pose } from 'net.minecraft.world.entity';
  import { Level, ServerLevelAccessor } from 'net.minecraft.world.level';
  import { Enum, Boolean } from 'java.lang';
  import { FakePlayer } from 'de.markusbordihn.easynpc.server.player';
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { TickerType } from 'de.markusbordihn.easynpc.data.ticker';
  import { EnumMap, UUID } from 'java.util';
  import { StatusDataType } from 'de.markusbordihn.easynpc.data.status';
  import { Component } from 'net.minecraft.network.chat';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { DimensionTransition } from 'net.minecraft.world.level.portal';
  import { InteractionResult, InteractionHand, DifficultyInstance } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { MerchantOffers, MerchantOffer } from 'net.minecraft.world.item.trading';
  import { ProjectileWeaponItem, ItemStack } from 'net.minecraft.world.item';
  import { GoalSelector } from 'net.minecraft.world.entity.ai.goal';
  import { Builder } from 'SynchedEntityData';
  import { SynchedDataIndex } from 'de.markusbordihn.easynpc.data.synched';
  import { ServerEntityData, ServerDataAccessor } from 'de.markusbordihn.easynpc.data.server';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ConfigurationData } from 'de.markusbordihn.easynpc.data.configuration';
  import { SkinModel } from 'de.markusbordihn.easynpc.data.skin';
  import { ModelType } from 'de.markusbordihn.easynpc.data.model';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface HorseRaw extends EasyNPCBase<Horse>, Horse {}
  class HorseRaw extends EasyNPCBase<Horse> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Horse>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Horse>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }

}

declare module 'de.markusbordihn.easynpc.api.npc.piglin' {
  import { PiglinBrute, Piglin } from 'net.minecraft.world.entity.monster.piglin';
  import { EasyNPCBase, EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { RawNPCType, NPCType } from 'de.markusbordihn.easynpc.data.npc';
  import { EntityType, Entity, SpawnGroupData, MobSpawnType, LivingEntity, EntityDimensions, Pose } from 'net.minecraft.world.entity';
  import { Level, ServerLevelAccessor } from 'net.minecraft.world.level';
  import { Enum, Boolean } from 'java.lang';
  import { FakePlayer } from 'de.markusbordihn.easynpc.server.player';
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { TickerType } from 'de.markusbordihn.easynpc.data.ticker';
  import { EnumMap, UUID } from 'java.util';
  import { StatusDataType } from 'de.markusbordihn.easynpc.data.status';
  import { Component } from 'net.minecraft.network.chat';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { DimensionTransition } from 'net.minecraft.world.level.portal';
  import { InteractionResult, InteractionHand, DifficultyInstance } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { MerchantOffers, MerchantOffer } from 'net.minecraft.world.item.trading';
  import { ProjectileWeaponItem, ItemStack } from 'net.minecraft.world.item';
  import { GoalSelector } from 'net.minecraft.world.entity.ai.goal';
  import { Builder } from 'SynchedEntityData';
  import { SynchedDataIndex } from 'de.markusbordihn.easynpc.data.synched';
  import { ServerEntityData, ServerDataAccessor } from 'de.markusbordihn.easynpc.data.server';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ConfigurationData } from 'de.markusbordihn.easynpc.data.configuration';
  import { SkinModel } from 'de.markusbordihn.easynpc.data.skin';
  import { ModelType } from 'de.markusbordihn.easynpc.data.model';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ZombifiedPiglin } from 'net.minecraft.world.entity.monster';

  interface PiglinBruteRaw extends EasyNPCBase<PiglinBrute>, PiglinBrute {}
  class PiglinBruteRaw extends EasyNPCBase<PiglinBrute> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<PiglinBrute>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<PiglinBrute>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface PiglinRaw extends EasyNPCBase<Piglin>, Piglin {}
  class PiglinRaw extends EasyNPCBase<Piglin> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Piglin>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Piglin>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface ZombifiedPiglinRaw extends EasyNPCBase<ZombifiedPiglin>, ZombifiedPiglin {}
  class ZombifiedPiglinRaw extends EasyNPCBase<ZombifiedPiglin> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<ZombifiedPiglin>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<ZombifiedPiglin>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }

}

declare module 'de.markusbordihn.easynpc.api.npc.raw' {
  import { Allay } from 'net.minecraft.world.entity.animal.allay';
  import { EasyNPCBase, EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { RawNPCType, NPCType } from 'de.markusbordihn.easynpc.data.npc';
  import { EntityType, Entity, SpawnGroupData, MobSpawnType, LivingEntity, EntityDimensions, Pose, PathfinderMob } from 'net.minecraft.world.entity';
  import { Level, ServerLevelAccessor } from 'net.minecraft.world.level';
  import { Enum, Boolean } from 'java.lang';
  import { FakePlayer } from 'de.markusbordihn.easynpc.server.player';
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { TickerType } from 'de.markusbordihn.easynpc.data.ticker';
  import { EnumMap, UUID } from 'java.util';
  import { StatusDataType } from 'de.markusbordihn.easynpc.data.status';
  import { Component } from 'net.minecraft.network.chat';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { DimensionTransition } from 'net.minecraft.world.level.portal';
  import { InteractionResult, InteractionHand, DifficultyInstance } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { MerchantOffers, MerchantOffer } from 'net.minecraft.world.item.trading';
  import { ProjectileWeaponItem, ItemStack } from 'net.minecraft.world.item';
  import { GoalSelector } from 'net.minecraft.world.entity.ai.goal';
  import { Builder } from 'SynchedEntityData';
  import { SynchedDataIndex } from 'de.markusbordihn.easynpc.data.synched';
  import { ServerEntityData, ServerDataAccessor } from 'de.markusbordihn.easynpc.data.server';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ConfigurationData } from 'de.markusbordihn.easynpc.data.configuration';
  import { SkinModel } from 'de.markusbordihn.easynpc.data.skin';
  import { ModelType } from 'de.markusbordihn.easynpc.data.model';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Bogged, Creeper, EnderMan, Ghast, Zombie, Slime, Vex, Witch } from 'net.minecraft.world.entity.monster';
  import { Cat, Chicken, Fox, IronGolem, Pig, Wolf } from 'net.minecraft.world.entity.animal';
  import { Builder as attributesupplier_Builder } from 'AttributeSupplier';

  interface AllayRaw extends EasyNPCBase<Allay>, Allay {}
  class AllayRaw extends EasyNPCBase<Allay> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Allay>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Allay>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface BoggedRaw extends EasyNPCBase<Bogged>, Bogged {}
  class BoggedRaw extends EasyNPCBase<Bogged> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Bogged>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Bogged>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface CatRaw extends EasyNPCBase<Cat>, Cat {}
  class CatRaw extends EasyNPCBase<Cat> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Cat>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Cat>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get ownerUUID(): UUID;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    handleSkinVariantTypeChange(variant: Enum<any>): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface ChickenRaw extends EasyNPCBase<Chicken>, Chicken {}
  class ChickenRaw extends EasyNPCBase<Chicken> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Chicken>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Chicken>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface CreeperRaw extends EasyNPCBase<Creeper>, Creeper {}
  class CreeperRaw extends EasyNPCBase<Creeper> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Creeper>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Creeper>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface EnderManRaw extends EasyNPCBase<EnderMan>, EnderMan {}
  class EnderManRaw extends EasyNPCBase<EnderMan> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<EnderMan>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<EnderMan>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface FoxRaw extends EasyNPCBase<Fox>, Fox {}
  class FoxRaw extends EasyNPCBase<Fox> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Fox>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Fox>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface GhastRaw extends EasyNPCBase<Ghast>, Ghast {}
  class GhastRaw extends EasyNPCBase<Ghast> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Ghast>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Ghast>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    static createAttributes(): attributesupplier_Builder;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface HumanoidRaw extends EasyNPCBase<PathfinderMob>, PathfinderMob {}
  class HumanoidRaw extends EasyNPCBase<PathfinderMob> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<PathfinderMob>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<PathfinderMob>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface HumanoidSlimRaw extends EasyNPCBase<PathfinderMob>, PathfinderMob {}
  class HumanoidSlimRaw extends EasyNPCBase<PathfinderMob> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<PathfinderMob>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<PathfinderMob>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface IronGolemRaw extends EasyNPCBase<IronGolem>, IronGolem {}
  class IronGolemRaw extends EasyNPCBase<IronGolem> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<IronGolem>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<IronGolem>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface NPCRawTemplate extends EasyNPCBase<Zombie>, Zombie {}
  class NPCRawTemplate extends EasyNPCBase<Zombie> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Zombie>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Zombie>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface PathfinderMobRaw extends EasyNPCBase<PathfinderMob>, PathfinderMob {}
  class PathfinderMobRaw extends EasyNPCBase<PathfinderMob> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<PathfinderMob>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<PathfinderMob>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface PigRaw extends EasyNPCBase<Pig>, Pig {}
  class PigRaw extends EasyNPCBase<Pig> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Pig>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Pig>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface SlimeRaw extends EasyNPCBase<Slime>, Slime {}
  class SlimeRaw extends EasyNPCBase<Slime> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Slime>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Slime>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    static createAttributes(): attributesupplier_Builder;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface VexRaw extends EasyNPCBase<Vex>, Vex {}
  class VexRaw extends EasyNPCBase<Vex> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Vex>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Vex>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface WitchRaw extends EasyNPCBase<Witch>, Witch {}
  class WitchRaw extends EasyNPCBase<Witch> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Witch>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Witch>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface WolfRaw extends EasyNPCBase<Wolf>, Wolf {}
  class WolfRaw extends EasyNPCBase<Wolf> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Wolf>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Wolf>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get ownerUUID(): UUID;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }

}

declare module 'de.markusbordihn.easynpc.api.npc.raw.horse' {
  import { Horse } from 'net.minecraft.world.entity.animal.horse';
  import { EasyNPCBase, EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { RawNPCType, NPCType } from 'de.markusbordihn.easynpc.data.npc';
  import { EntityType, Entity, SpawnGroupData, MobSpawnType, LivingEntity, EntityDimensions, Pose } from 'net.minecraft.world.entity';
  import { Level, ServerLevelAccessor } from 'net.minecraft.world.level';
  import { Enum, Boolean } from 'java.lang';
  import { FakePlayer } from 'de.markusbordihn.easynpc.server.player';
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { TickerType } from 'de.markusbordihn.easynpc.data.ticker';
  import { EnumMap, UUID } from 'java.util';
  import { StatusDataType } from 'de.markusbordihn.easynpc.data.status';
  import { Component } from 'net.minecraft.network.chat';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { DimensionTransition } from 'net.minecraft.world.level.portal';
  import { InteractionResult, InteractionHand, DifficultyInstance } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { MerchantOffers, MerchantOffer } from 'net.minecraft.world.item.trading';
  import { ProjectileWeaponItem, ItemStack } from 'net.minecraft.world.item';
  import { GoalSelector } from 'net.minecraft.world.entity.ai.goal';
  import { Builder } from 'SynchedEntityData';
  import { SynchedDataIndex } from 'de.markusbordihn.easynpc.data.synched';
  import { ServerEntityData, ServerDataAccessor } from 'de.markusbordihn.easynpc.data.server';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ConfigurationData } from 'de.markusbordihn.easynpc.data.configuration';
  import { SkinModel } from 'de.markusbordihn.easynpc.data.skin';
  import { ModelType } from 'de.markusbordihn.easynpc.data.model';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface HorseRaw extends EasyNPCBase<Horse>, Horse {}
  class HorseRaw extends EasyNPCBase<Horse> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Horse>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Horse>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }

}

declare module 'de.markusbordihn.easynpc.api.npc.raw.illager' {
  import { Evoker, Illusioner, Pillager, Vindicator } from 'net.minecraft.world.entity.monster';
  import { EasyNPCBase, EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { RawNPCType, NPCType } from 'de.markusbordihn.easynpc.data.npc';
  import { EntityType, Entity, SpawnGroupData, MobSpawnType, LivingEntity, EntityDimensions, Pose } from 'net.minecraft.world.entity';
  import { Level, ServerLevelAccessor } from 'net.minecraft.world.level';
  import { Enum, Boolean } from 'java.lang';
  import { FakePlayer } from 'de.markusbordihn.easynpc.server.player';
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { TickerType } from 'de.markusbordihn.easynpc.data.ticker';
  import { EnumMap, UUID } from 'java.util';
  import { StatusDataType } from 'de.markusbordihn.easynpc.data.status';
  import { Component } from 'net.minecraft.network.chat';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { DimensionTransition } from 'net.minecraft.world.level.portal';
  import { InteractionResult, InteractionHand, DifficultyInstance } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { MerchantOffers, MerchantOffer } from 'net.minecraft.world.item.trading';
  import { ProjectileWeaponItem, ItemStack } from 'net.minecraft.world.item';
  import { GoalSelector } from 'net.minecraft.world.entity.ai.goal';
  import { Builder } from 'SynchedEntityData';
  import { SynchedDataIndex } from 'de.markusbordihn.easynpc.data.synched';
  import { ServerEntityData, ServerDataAccessor } from 'de.markusbordihn.easynpc.data.server';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ConfigurationData } from 'de.markusbordihn.easynpc.data.configuration';
  import { SkinModel } from 'de.markusbordihn.easynpc.data.skin';
  import { ModelType } from 'de.markusbordihn.easynpc.data.model';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface EvokerRaw extends EasyNPCBase<Evoker>, Evoker {}
  class EvokerRaw extends EasyNPCBase<Evoker> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Evoker>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Evoker>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface IllusionerRaw extends EasyNPCBase<Illusioner>, Illusioner {}
  class IllusionerRaw extends EasyNPCBase<Illusioner> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Illusioner>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Illusioner>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface PillagerRaw extends EasyNPCBase<Pillager>, Pillager {}
  class PillagerRaw extends EasyNPCBase<Pillager> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Pillager>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Pillager>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface VindicatorRaw extends EasyNPCBase<Vindicator>, Vindicator {}
  class VindicatorRaw extends EasyNPCBase<Vindicator> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Vindicator>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Vindicator>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }

}

declare module 'de.markusbordihn.easynpc.api.npc.raw.piglin' {
  import { PiglinBrute, Piglin } from 'net.minecraft.world.entity.monster.piglin';
  import { EasyNPCBase, EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { RawNPCType, NPCType } from 'de.markusbordihn.easynpc.data.npc';
  import { EntityType, Entity, SpawnGroupData, MobSpawnType, LivingEntity, EntityDimensions, Pose } from 'net.minecraft.world.entity';
  import { Level, ServerLevelAccessor } from 'net.minecraft.world.level';
  import { Enum, Boolean } from 'java.lang';
  import { FakePlayer } from 'de.markusbordihn.easynpc.server.player';
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { TickerType } from 'de.markusbordihn.easynpc.data.ticker';
  import { EnumMap, UUID } from 'java.util';
  import { StatusDataType } from 'de.markusbordihn.easynpc.data.status';
  import { Component } from 'net.minecraft.network.chat';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { DimensionTransition } from 'net.minecraft.world.level.portal';
  import { InteractionResult, InteractionHand, DifficultyInstance } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { MerchantOffers, MerchantOffer } from 'net.minecraft.world.item.trading';
  import { ProjectileWeaponItem, ItemStack } from 'net.minecraft.world.item';
  import { GoalSelector } from 'net.minecraft.world.entity.ai.goal';
  import { Builder } from 'SynchedEntityData';
  import { SynchedDataIndex } from 'de.markusbordihn.easynpc.data.synched';
  import { ServerEntityData, ServerDataAccessor } from 'de.markusbordihn.easynpc.data.server';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ConfigurationData } from 'de.markusbordihn.easynpc.data.configuration';
  import { SkinModel } from 'de.markusbordihn.easynpc.data.skin';
  import { ModelType } from 'de.markusbordihn.easynpc.data.model';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ZombifiedPiglin } from 'net.minecraft.world.entity.monster';

  interface PiglinBruteRaw extends EasyNPCBase<PiglinBrute>, PiglinBrute {}
  class PiglinBruteRaw extends EasyNPCBase<PiglinBrute> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<PiglinBrute>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<PiglinBrute>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface PiglinRaw extends EasyNPCBase<Piglin>, Piglin {}
  class PiglinRaw extends EasyNPCBase<Piglin> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Piglin>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Piglin>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface ZombifiedPiglinRaw extends EasyNPCBase<ZombifiedPiglin>, ZombifiedPiglin {}
  class ZombifiedPiglinRaw extends EasyNPCBase<ZombifiedPiglin> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<ZombifiedPiglin>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<ZombifiedPiglin>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }

}

declare module 'de.markusbordihn.easynpc.api.npc.raw.skeleton' {
  import { Skeleton, Stray, WitherSkeleton } from 'net.minecraft.world.entity.monster';
  import { EasyNPCBase, EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { RawNPCType, NPCType } from 'de.markusbordihn.easynpc.data.npc';
  import { EntityType, Entity, SpawnGroupData, MobSpawnType, LivingEntity, EntityDimensions, Pose } from 'net.minecraft.world.entity';
  import { Level, ServerLevelAccessor } from 'net.minecraft.world.level';
  import { Enum, Boolean } from 'java.lang';
  import { FakePlayer } from 'de.markusbordihn.easynpc.server.player';
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { TickerType } from 'de.markusbordihn.easynpc.data.ticker';
  import { EnumMap, UUID } from 'java.util';
  import { StatusDataType } from 'de.markusbordihn.easynpc.data.status';
  import { Component } from 'net.minecraft.network.chat';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { DimensionTransition } from 'net.minecraft.world.level.portal';
  import { InteractionResult, InteractionHand, DifficultyInstance } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { MerchantOffers, MerchantOffer } from 'net.minecraft.world.item.trading';
  import { ProjectileWeaponItem, ItemStack } from 'net.minecraft.world.item';
  import { GoalSelector } from 'net.minecraft.world.entity.ai.goal';
  import { Builder } from 'SynchedEntityData';
  import { SynchedDataIndex } from 'de.markusbordihn.easynpc.data.synched';
  import { ServerEntityData, ServerDataAccessor } from 'de.markusbordihn.easynpc.data.server';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ConfigurationData } from 'de.markusbordihn.easynpc.data.configuration';
  import { SkinModel } from 'de.markusbordihn.easynpc.data.skin';
  import { ModelType } from 'de.markusbordihn.easynpc.data.model';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface SkeletonRaw extends EasyNPCBase<Skeleton>, Skeleton {}
  class SkeletonRaw extends EasyNPCBase<Skeleton> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Skeleton>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Skeleton>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface StrayRaw extends EasyNPCBase<Stray>, Stray {}
  class StrayRaw extends EasyNPCBase<Stray> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Stray>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Stray>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface WitherSkeletonRaw extends EasyNPCBase<WitherSkeleton>, WitherSkeleton {}
  class WitherSkeletonRaw extends EasyNPCBase<WitherSkeleton> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<WitherSkeleton>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<WitherSkeleton>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }

}

declare module 'de.markusbordihn.easynpc.api.npc.raw.spider' {
  import { Spider } from 'net.minecraft.world.entity.monster';
  import { EasyNPCBase, EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { RawNPCType, NPCType } from 'de.markusbordihn.easynpc.data.npc';
  import { EntityType, Entity, SpawnGroupData, MobSpawnType, LivingEntity, EntityDimensions, Pose } from 'net.minecraft.world.entity';
  import { Level, ServerLevelAccessor } from 'net.minecraft.world.level';
  import { Enum, Boolean } from 'java.lang';
  import { FakePlayer } from 'de.markusbordihn.easynpc.server.player';
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { TickerType } from 'de.markusbordihn.easynpc.data.ticker';
  import { EnumMap, UUID } from 'java.util';
  import { StatusDataType } from 'de.markusbordihn.easynpc.data.status';
  import { Component } from 'net.minecraft.network.chat';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { DimensionTransition } from 'net.minecraft.world.level.portal';
  import { InteractionResult, InteractionHand, DifficultyInstance } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { MerchantOffers, MerchantOffer } from 'net.minecraft.world.item.trading';
  import { ProjectileWeaponItem, ItemStack } from 'net.minecraft.world.item';
  import { GoalSelector } from 'net.minecraft.world.entity.ai.goal';
  import { Builder } from 'SynchedEntityData';
  import { SynchedDataIndex } from 'de.markusbordihn.easynpc.data.synched';
  import { ServerEntityData, ServerDataAccessor } from 'de.markusbordihn.easynpc.data.server';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ConfigurationData } from 'de.markusbordihn.easynpc.data.configuration';
  import { SkinModel } from 'de.markusbordihn.easynpc.data.skin';
  import { ModelType } from 'de.markusbordihn.easynpc.data.model';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface SpiderRaw extends EasyNPCBase<Spider>, Spider {}
  class SpiderRaw extends EasyNPCBase<Spider> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Spider>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Spider>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }

}

declare module 'de.markusbordihn.easynpc.api.npc.raw.villager' {
  import { Villager } from 'net.minecraft.world.entity.npc';
  import { EasyNPCBase, EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { RawNPCType, NPCType } from 'de.markusbordihn.easynpc.data.npc';
  import { EntityType, Entity, SpawnGroupData, MobSpawnType, LivingEntity, EntityDimensions, Pose } from 'net.minecraft.world.entity';
  import { Level, ServerLevelAccessor } from 'net.minecraft.world.level';
  import { Enum, Boolean } from 'java.lang';
  import { FakePlayer } from 'de.markusbordihn.easynpc.server.player';
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { TickerType } from 'de.markusbordihn.easynpc.data.ticker';
  import { EnumMap, UUID } from 'java.util';
  import { StatusDataType } from 'de.markusbordihn.easynpc.data.status';
  import { Component } from 'net.minecraft.network.chat';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { DimensionTransition } from 'net.minecraft.world.level.portal';
  import { InteractionResult, InteractionHand, DifficultyInstance } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { MerchantOffers, MerchantOffer } from 'net.minecraft.world.item.trading';
  import { ProjectileWeaponItem, ItemStack } from 'net.minecraft.world.item';
  import { GoalSelector } from 'net.minecraft.world.entity.ai.goal';
  import { Builder } from 'SynchedEntityData';
  import { SynchedDataIndex } from 'de.markusbordihn.easynpc.data.synched';
  import { ServerEntityData, ServerDataAccessor } from 'de.markusbordihn.easynpc.data.server';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ConfigurationData } from 'de.markusbordihn.easynpc.data.configuration';
  import { SkinModel } from 'de.markusbordihn.easynpc.data.skin';
  import { ModelType } from 'de.markusbordihn.easynpc.data.model';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ZombieVillager } from 'net.minecraft.world.entity.monster';

  interface VillagerRaw extends EasyNPCBase<Villager>, Villager {}
  class VillagerRaw extends EasyNPCBase<Villager> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Villager>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Villager>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get offers(): MerchantOffers;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    handleSkinVariantTypeChange(variant: Enum<any>): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface ZombieVillagerRaw extends EasyNPCBase<ZombieVillager>, ZombieVillager {}
  class ZombieVillagerRaw extends EasyNPCBase<ZombieVillager> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<ZombieVillager>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<ZombieVillager>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }

}

declare module 'de.markusbordihn.easynpc.api.npc.raw.zombie' {
  import { Drowned, Husk, Zombie } from 'net.minecraft.world.entity.monster';
  import { EasyNPCBase, EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { RawNPCType, NPCType } from 'de.markusbordihn.easynpc.data.npc';
  import { EntityType, Entity, SpawnGroupData, MobSpawnType, LivingEntity, EntityDimensions, Pose } from 'net.minecraft.world.entity';
  import { Level, ServerLevelAccessor } from 'net.minecraft.world.level';
  import { Enum, Boolean } from 'java.lang';
  import { FakePlayer } from 'de.markusbordihn.easynpc.server.player';
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { TickerType } from 'de.markusbordihn.easynpc.data.ticker';
  import { EnumMap, UUID } from 'java.util';
  import { StatusDataType } from 'de.markusbordihn.easynpc.data.status';
  import { Component } from 'net.minecraft.network.chat';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { DimensionTransition } from 'net.minecraft.world.level.portal';
  import { InteractionResult, InteractionHand, DifficultyInstance } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { MerchantOffers, MerchantOffer } from 'net.minecraft.world.item.trading';
  import { ProjectileWeaponItem, ItemStack } from 'net.minecraft.world.item';
  import { GoalSelector } from 'net.minecraft.world.entity.ai.goal';
  import { Builder } from 'SynchedEntityData';
  import { SynchedDataIndex } from 'de.markusbordihn.easynpc.data.synched';
  import { ServerEntityData, ServerDataAccessor } from 'de.markusbordihn.easynpc.data.server';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ConfigurationData } from 'de.markusbordihn.easynpc.data.configuration';
  import { SkinModel } from 'de.markusbordihn.easynpc.data.skin';
  import { ModelType } from 'de.markusbordihn.easynpc.data.model';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface DrownedRaw extends EasyNPCBase<Drowned>, Drowned {}
  class DrownedRaw extends EasyNPCBase<Drowned> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Drowned>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Drowned>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface HuskRaw extends EasyNPCBase<Husk>, Husk {}
  class HuskRaw extends EasyNPCBase<Husk> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Husk>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Husk>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface ZombieRaw extends EasyNPCBase<Zombie>, Zombie {}
  class ZombieRaw extends EasyNPCBase<Zombie> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Zombie>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Zombie>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }

}

declare module 'de.markusbordihn.easynpc.api.npc.skeleton' {
  import { Skeleton, Stray, WitherSkeleton } from 'net.minecraft.world.entity.monster';
  import { EasyNPCBase, EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { RawNPCType, NPCType } from 'de.markusbordihn.easynpc.data.npc';
  import { EntityType, Entity, SpawnGroupData, MobSpawnType, LivingEntity, EntityDimensions, Pose } from 'net.minecraft.world.entity';
  import { Level, ServerLevelAccessor } from 'net.minecraft.world.level';
  import { Enum, Boolean } from 'java.lang';
  import { FakePlayer } from 'de.markusbordihn.easynpc.server.player';
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { TickerType } from 'de.markusbordihn.easynpc.data.ticker';
  import { EnumMap, UUID } from 'java.util';
  import { StatusDataType } from 'de.markusbordihn.easynpc.data.status';
  import { Component } from 'net.minecraft.network.chat';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { DimensionTransition } from 'net.minecraft.world.level.portal';
  import { InteractionResult, InteractionHand, DifficultyInstance } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { MerchantOffers, MerchantOffer } from 'net.minecraft.world.item.trading';
  import { ProjectileWeaponItem, ItemStack } from 'net.minecraft.world.item';
  import { GoalSelector } from 'net.minecraft.world.entity.ai.goal';
  import { Builder } from 'SynchedEntityData';
  import { SynchedDataIndex } from 'de.markusbordihn.easynpc.data.synched';
  import { ServerEntityData, ServerDataAccessor } from 'de.markusbordihn.easynpc.data.server';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ConfigurationData } from 'de.markusbordihn.easynpc.data.configuration';
  import { SkinModel } from 'de.markusbordihn.easynpc.data.skin';
  import { ModelType } from 'de.markusbordihn.easynpc.data.model';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface SkeletonRaw extends EasyNPCBase<Skeleton>, Skeleton {}
  class SkeletonRaw extends EasyNPCBase<Skeleton> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Skeleton>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Skeleton>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface StrayRaw extends EasyNPCBase<Stray>, Stray {}
  class StrayRaw extends EasyNPCBase<Stray> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Stray>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Stray>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface WitherSkeletonRaw extends EasyNPCBase<WitherSkeleton>, WitherSkeleton {}
  class WitherSkeletonRaw extends EasyNPCBase<WitherSkeleton> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<WitherSkeleton>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<WitherSkeleton>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }

}

declare module 'de.markusbordihn.easynpc.api.npc.spider' {
  import { Spider } from 'net.minecraft.world.entity.monster';
  import { EasyNPCBase, EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { RawNPCType, NPCType } from 'de.markusbordihn.easynpc.data.npc';
  import { EntityType, Entity, SpawnGroupData, MobSpawnType, LivingEntity, EntityDimensions, Pose } from 'net.minecraft.world.entity';
  import { Level, ServerLevelAccessor } from 'net.minecraft.world.level';
  import { Enum, Boolean } from 'java.lang';
  import { FakePlayer } from 'de.markusbordihn.easynpc.server.player';
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { TickerType } from 'de.markusbordihn.easynpc.data.ticker';
  import { EnumMap, UUID } from 'java.util';
  import { StatusDataType } from 'de.markusbordihn.easynpc.data.status';
  import { Component } from 'net.minecraft.network.chat';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { DimensionTransition } from 'net.minecraft.world.level.portal';
  import { InteractionResult, InteractionHand, DifficultyInstance } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { MerchantOffers, MerchantOffer } from 'net.minecraft.world.item.trading';
  import { ProjectileWeaponItem, ItemStack } from 'net.minecraft.world.item';
  import { GoalSelector } from 'net.minecraft.world.entity.ai.goal';
  import { Builder } from 'SynchedEntityData';
  import { SynchedDataIndex } from 'de.markusbordihn.easynpc.data.synched';
  import { ServerEntityData, ServerDataAccessor } from 'de.markusbordihn.easynpc.data.server';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ConfigurationData } from 'de.markusbordihn.easynpc.data.configuration';
  import { SkinModel } from 'de.markusbordihn.easynpc.data.skin';
  import { ModelType } from 'de.markusbordihn.easynpc.data.model';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface SpiderRaw extends EasyNPCBase<Spider>, Spider {}
  class SpiderRaw extends EasyNPCBase<Spider> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Spider>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Spider>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }

}

declare module 'de.markusbordihn.easynpc.api.npc.villager' {
  import { Villager } from 'net.minecraft.world.entity.npc';
  import { EasyNPCBase, EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { RawNPCType, NPCType } from 'de.markusbordihn.easynpc.data.npc';
  import { EntityType, Entity, SpawnGroupData, MobSpawnType, LivingEntity, EntityDimensions, Pose } from 'net.minecraft.world.entity';
  import { Level, ServerLevelAccessor } from 'net.minecraft.world.level';
  import { Enum, Boolean } from 'java.lang';
  import { FakePlayer } from 'de.markusbordihn.easynpc.server.player';
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { TickerType } from 'de.markusbordihn.easynpc.data.ticker';
  import { EnumMap, UUID } from 'java.util';
  import { StatusDataType } from 'de.markusbordihn.easynpc.data.status';
  import { Component } from 'net.minecraft.network.chat';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { DimensionTransition } from 'net.minecraft.world.level.portal';
  import { InteractionResult, InteractionHand, DifficultyInstance } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { MerchantOffers, MerchantOffer } from 'net.minecraft.world.item.trading';
  import { ProjectileWeaponItem, ItemStack } from 'net.minecraft.world.item';
  import { GoalSelector } from 'net.minecraft.world.entity.ai.goal';
  import { Builder } from 'SynchedEntityData';
  import { SynchedDataIndex } from 'de.markusbordihn.easynpc.data.synched';
  import { ServerEntityData, ServerDataAccessor } from 'de.markusbordihn.easynpc.data.server';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ConfigurationData } from 'de.markusbordihn.easynpc.data.configuration';
  import { SkinModel } from 'de.markusbordihn.easynpc.data.skin';
  import { ModelType } from 'de.markusbordihn.easynpc.data.model';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ZombieVillager } from 'net.minecraft.world.entity.monster';

  interface VillagerRaw extends EasyNPCBase<Villager>, Villager {}
  class VillagerRaw extends EasyNPCBase<Villager> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Villager>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Villager>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get offers(): MerchantOffers;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    handleSkinVariantTypeChange(variant: Enum<any>): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface ZombieVillagerRaw extends EasyNPCBase<ZombieVillager>, ZombieVillager {}
  class ZombieVillagerRaw extends EasyNPCBase<ZombieVillager> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<ZombieVillager>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<ZombieVillager>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }

}

declare module 'de.markusbordihn.easynpc.api.npc.zombie' {
  import { Drowned, Husk, Zombie } from 'net.minecraft.world.entity.monster';
  import { EasyNPCBase, EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { RawNPCType, NPCType } from 'de.markusbordihn.easynpc.data.npc';
  import { EntityType, Entity, SpawnGroupData, MobSpawnType, LivingEntity, EntityDimensions, Pose } from 'net.minecraft.world.entity';
  import { Level, ServerLevelAccessor } from 'net.minecraft.world.level';
  import { Enum, Boolean } from 'java.lang';
  import { FakePlayer } from 'de.markusbordihn.easynpc.server.player';
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { TickerType } from 'de.markusbordihn.easynpc.data.ticker';
  import { EnumMap, UUID } from 'java.util';
  import { StatusDataType } from 'de.markusbordihn.easynpc.data.status';
  import { Component } from 'net.minecraft.network.chat';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { DimensionTransition } from 'net.minecraft.world.level.portal';
  import { InteractionResult, InteractionHand, DifficultyInstance } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { MerchantOffers, MerchantOffer } from 'net.minecraft.world.item.trading';
  import { ProjectileWeaponItem, ItemStack } from 'net.minecraft.world.item';
  import { GoalSelector } from 'net.minecraft.world.entity.ai.goal';
  import { Builder } from 'SynchedEntityData';
  import { SynchedDataIndex } from 'de.markusbordihn.easynpc.data.synched';
  import { ServerEntityData, ServerDataAccessor } from 'de.markusbordihn.easynpc.data.server';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ConfigurationData } from 'de.markusbordihn.easynpc.data.configuration';
  import { SkinModel } from 'de.markusbordihn.easynpc.data.skin';
  import { ModelType } from 'de.markusbordihn.easynpc.data.model';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface DrownedRaw extends EasyNPCBase<Drowned>, Drowned {}
  class DrownedRaw extends EasyNPCBase<Drowned> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Drowned>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Drowned>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface HuskRaw extends EasyNPCBase<Husk>, Husk {}
  class HuskRaw extends EasyNPCBase<Husk> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Husk>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Husk>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }


  interface ZombieRaw extends EasyNPCBase<Zombie>, Zombie {}
  class ZombieRaw extends EasyNPCBase<Zombie> {
    static readonly NPC_TYPE: RawNPCType;
    constructor(entityType: EntityType<Zombie>, level: Level, variant: Enum<any>);

    constructor(entityType: EntityType<Zombie>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeHitByProjectile(): boolean;
    canBeLeashed(): boolean;
    canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    changeDimension(dimensionTransition: DimensionTransition): Entity;
    defineServerEntityData(): void;
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineSynchedEntityData<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    die(damageSource: DamageSource): void;
    doHurtTarget(entity: Entity): boolean;
    equals(object: any): boolean;
    equipSaddle(itemStack: ItemStack, soundSource: SoundSource): void;
    finalizeSpawn(serverLevelAccessor: ServerLevelAccessor, difficulty: DifficultyInstance, mobSpawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get ambientSoundInterval(): number;
    get attackAnimationTick(): number;
    get configurationData(): ConfigurationData;
    get deathSound(): SoundEvent;
    get defaultSkinVariantType(): Enum<any>;
    get entityGoalSelector(): GoalSelector;
    get entityTargetSelector(): GoalSelector;
    get merchantTradingOffers(): MerchantOffers;
    get modelType(): ModelType;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get name(): Component;
    get persistentAngerTarget(): UUID;
    get remainingPersistentAngerTime(): number;
    get serverEntityData(): ServerEntityData;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    get tradingPlayer(): Player;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    getFakePlayer(level: ServerLevel, blockPos: BlockPos): FakePlayer;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    getSkinVariantType(name: string): Enum<any>;
    getSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex): T;
    getTicker(tickerType: TickerType): number;
    handleEasyNPCJoinEvent(easyNPC: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(easyNPC: EasyNPC<any>): void;
    handleEntityEvent(flag: number): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    hashCode(): number;
    hurt(damageSource: DamageSource, damage: number): boolean;
    isAttackable(): boolean;
    isClientSide(): boolean;
    isCustomNameVisible(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isInvulnerable(): boolean;
    isInvulnerableTo(damageSource: DamageSource): boolean;
    isPushable(): boolean;
    isSaddleable(): boolean;
    isSaddled(): boolean;
    kill(): void;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    onCrossbowAttackPerformed(): void;
    playAmbientSound(): void;
    playHurtSound(damageSource: DamageSource): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    removeWhenFarAway(distance: number): boolean;
    rewardTradeXp(merchantOffer: MerchantOffer): void;
    set merchantTradingOffers(merchantOffers: MerchantOffers);
    set nPCDataVersion(version: number);
    set persistentAngerTarget(targetUUID: UUID);
    set remainingPersistentAngerTime(remainingPersistentAngerTime: number);
    set tradingPlayer(player: Player);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setTicker(tickerType: TickerType, ticker: number): void;
    startPersistentAngerTimer(): void;
    stopTrading(): void;
    travel(vec3: Vec3): void;
  }

}

declare module 'de.markusbordihn.easynpc.api.skin' {
  import { ResourceLocation } from 'net.minecraft.resources';

  class VariantTexture {
    get textureLocation(): ResourceLocation;
    parseTextureLocation(namespace: string, path: string): ResourceLocation;
  }

}

declare module 'de.markusbordihn.easynpc.backup' {
  class BackupManager {
    static performBackup(): void;
  }

}

declare module 'de.markusbordihn.easynpc.block' {
  import { SpawnerBlock } from 'net.minecraft.world.level.block';
  import { EnumProperty } from 'net.minecraft.world.level.block.state.properties';
  import { Properties } from 'BlockBehaviour';
  import { SpawnerType } from 'de.markusbordihn.easynpc.data.spawner';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockEntity, BlockEntityTicker, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { Level } from 'net.minecraft.world.level';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Blocks } from 'DeferredRegister';
  import { DeferredRegister, DeferredBlock, DeferredHolder } from 'net.neoforged.neoforge.registries';

  interface EasyNPCSpawnerBlock extends SpawnerBlock {}
  class EasyNPCSpawnerBlock extends SpawnerBlock {
    static readonly SPAWNER_TYPE: EnumProperty;
    constructor(properties: Properties, spawnerType: SpawnerType);
    static getSpawnerType(blockState: BlockState): SpawnerType;
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
    setPlacedBy(level: Level, blockPos: BlockPos, blockState: BlockState, livingEntity: LivingEntity, itemStack: ItemStack): void;
  }


  interface EasyNPCSpawnerBlockWrapper extends EasyNPCSpawnerBlock {}
  class EasyNPCSpawnerBlockWrapper extends EasyNPCSpawnerBlock {
    constructor(properties: Properties, spawnerType: SpawnerType);
    getTicker<T extends BlockEntity>(level: Level, blockState: BlockState, blockEntityType: BlockEntityType<T>): BlockEntityTicker<T>;
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
  }


  class ModBlocks {
    static readonly BLOCKS: Blocks;
    static readonly BLOCK_ENTITY_TYPES: DeferredRegister;
    static readonly EASY_NPC_SPAWNER_BOSS: DeferredBlock;
    static readonly EASY_NPC_SPAWNER_DEFAULT: DeferredBlock;
    static readonly EASY_NPC_SPAWNER_GROUP: DeferredBlock;
    static readonly EASY_NPC_SPAWNER_SINGLE: DeferredBlock;
    static readonly EASY_NPC_SPAWNER_ENTITY: DeferredHolder;
  }

}

declare module 'de.markusbordihn.easynpc.block.entity' {
  import { BlockEntity, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { SpawnerType } from 'de.markusbordihn.easynpc.data.spawner';
  import { Level } from 'net.minecraft.world.level';
  import { UUID } from 'java.util';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { ClientboundBlockEntityDataPacket } from 'net.minecraft.network.protocol.game';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { BaseEasyNPCSpawner } from 'de.markusbordihn.easynpc.level';

  interface EasyNPCSpawnerBlockEntity extends BlockEntity {}
  class EasyNPCSpawnerBlockEntity extends BlockEntity {
    static readonly NAME: string;
    static readonly SPAWNER_OWNER_TAG: string;
    static readonly UUID_TAG: string;
    constructor(blockEntityType: BlockEntityType<any>, blockPos: BlockPos, blockState: BlockState);

    constructor(blockEntityType: BlockEntityType<any>, blockPos: BlockPos, blockState: BlockState, spawnerType: SpawnerType);
    static clientTick(level: Level, blockPos: BlockPos, blockState: BlockState, blockEntity: EasyNPCSpawnerBlockEntity): void;
    get owner(): UUID;
    get spawner(): BaseEasyNPCSpawner;
    get spawnerType(): SpawnerType;
    get spawnerUUID(): UUID;
    get updatePacket(): ClientboundBlockEntityDataPacket;
    getUpdateTag(provider: Provider): CompoundTag;
    loadAdditional(compoundTag: CompoundTag, provider: Provider): void;
    saveAdditional(compoundTag: CompoundTag, provider: Provider): void;
    static serverTick(level: Level, blockPos: BlockPos, blockState: BlockState, blockEntity: EasyNPCSpawnerBlockEntity): void;
    set owner(livingEntity: LivingEntity);
    set spawnerUUID(spawnerUUID: UUID);
    setChanged(): void;
    triggerEvent(id: number, value: number): boolean;
  }


  interface EasyNPCSpawnerBlockEntityWrapper extends EasyNPCSpawnerBlockEntity {}
  class EasyNPCSpawnerBlockEntityWrapper extends EasyNPCSpawnerBlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
  }

}

declare module 'de.markusbordihn.easynpc.client' {
  import { FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { Minecraft } from 'net.minecraft.client';
  import { LoggingOut } from 'ClientPlayerNetworkEvent';

  class ClientEventHandler {
    static onClientSetup(event: FMLClientSetupEvent): void;
  }


  class ClientEvents {
    static handleClientStartedEvent(client: Minecraft): void;
    static handleWorldUnloadEvent(): void;
  }


  class ClientPlayerEventHandler {
    static onPlayerLoggedOut(event: LoggingOut): void;
  }

}

declare module 'de.markusbordihn.easynpc.client.model.armpose' {
  import { ModelArmPose } from 'de.markusbordihn.easynpc.data.model';
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';

  class ModelArmPoseUtils {
    static getArmPoseForLeftArm(easyNPC: EasyNPC<any>): ModelArmPose;
    static getArmPoseForRightArm(easyNPC: EasyNPC<any>): ModelArmPose;
  }

}

declare module 'de.markusbordihn.easynpc.client.model.custom' {
  import { HumanoidModel } from 'net.minecraft.client.model';
  import { ModelPart } from 'net.minecraft.client.model.geom';
  import { LayerDefinition } from 'net.minecraft.client.model.geom.builders';

  interface DopplerModel<T extends LivingEntity = any> extends HumanoidModel<T> {}
  class DopplerModel<T extends LivingEntity = any> extends HumanoidModel<T> {
    constructor(modelPart: ModelPart);
    static createBodyLayer(): LayerDefinition;
    setupAnim(livingEntity: T, limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface FairyModel<T extends LivingEntity = any> extends HumanoidModel<T> {}
  class FairyModel<T extends LivingEntity = any> extends HumanoidModel<T> {
    static readonly MODEL_OFFSET_Y: number;
    constructor(modelPart: ModelPart);
    static createBodyLayer(): LayerDefinition;
    setupAnim(entity: T, limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface OrcModel<T extends LivingEntity = any> extends HumanoidModel<T> {}
  class OrcModel<T extends LivingEntity = any> extends HumanoidModel<T> {
    constructor(modelPart: ModelPart);
    static createBodyLayer(): LayerDefinition;
    setupAnim(livingEntity: T, limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }

}

declare module 'de.markusbordihn.easynpc.client.model' {
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { ModelDataCapable, DisplayAttributeDataCapable } from 'de.markusbordihn.easynpc.entity.easynpc.data';
  import { BlockPos } from 'net.minecraft.core';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { ModelArmPose, ModelPartType } from 'de.markusbordihn.easynpc.data.model';
  import { ModelPart, ModelLayerLocation } from 'net.minecraft.client.model.geom';
  import { Function } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { CustomPosition } from 'de.markusbordihn.easynpc.data.position';
  import { CustomRotation } from 'de.markusbordihn.easynpc.data.rotation';
  import { CustomScale } from 'de.markusbordihn.easynpc.data.scale';
  import { RegisterLayerDefinitions } from 'EntityRenderersEvent';

  class EasyNPCModel {
    static applyArmPoseToModelPart(armPose: ModelArmPose, armModelPart: ModelPart, isRightArm: boolean, head: ModelPart, easyNPC: EasyNPC<any>): void;
    static getEntityLightLevel(easyNPC: EasyNPC<any>, displayAttributeData: DisplayAttributeDataCapable<any>, blockPos: BlockPos): number;
    static renderEntityNameTag(easyNPC: EasyNPC<any>, modelData: ModelDataCapable<any>, poseStack: PoseStack): void;
    static setupAnimation(easyNPC: EasyNPC<any>, modelData: ModelDataCapable<any>, modelManager: EasyNPCModelManager): boolean;
    static setupAnimationEnd(easyNPC: EasyNPC<any>, modelManager: EasyNPCModelManager): void;
    static setupAnimationStart(easyNPC: EasyNPC<any>, modelManager: EasyNPCModelManager): boolean;
    static setupArmPoses(easyNPC: EasyNPC<any>, modelManager: EasyNPCModelManager): void;
    static setupLegAnimations(easyNPC: EasyNPC<any>, modelManager: EasyNPCModelManager, limbSwing: number, limbSwingAmount: number, isSitting: boolean): void;
  }


  class EasyNPCModelManager {
    constructor(rootModelPart: ModelPart);

    constructor(rootModelPart: ModelPart, renderType: Function<ResourceLocation, RenderType>);
    applySelectiveChanges(modelData: ModelDataCapable<any>): void;
    applyVisibilityChanges(modelData: ModelDataCapable<any>): void;
    defineModelPart(modelPartType: ModelPartType, modelPartName: string): EasyNPCModelManager;
    defineModelPart(modelPartType: ModelPartType, modelPart: ModelPart): EasyNPCModelManager;
    getModelPart(modelPartType: ModelPartType): ModelPart;
    resetModelParts(): void;
    setDefaultModelPart(modelPartType: ModelPartType, modelPart: ModelPart): void;
    setDefaultModelPartPosition(modelPartType: ModelPartType, customPosition: CustomPosition): void;
    setDefaultModelPartRotation(modelPartType: ModelPartType, rotation: CustomRotation): void;
    setDefaultModelPartScale(modelPartType: ModelPartType, customScale: CustomScale): void;
    setDefaultModelPartVisibility(modelPartType: ModelPartType, isVisible: boolean): void;
    setupModelParts(modelData: ModelDataCapable<any>, applyVisibility: boolean): boolean;
    shouldCancelAnimation(modelData: ModelDataCapable<any>): boolean;
    syncModelParts(modelData: ModelDataCapable<any>): void;
  }


  class ModModelLayer {
    static registerEntityLayerDefinitions(event: RegisterLayerDefinitions): void;
  }


  class ModModelLayers {
    static readonly DOPPLER: ModelLayerLocation;
    static readonly FAIRY: ModelLayerLocation;
    static readonly ORC: ModelLayerLocation;
  }

}

declare module 'de.markusbordihn.easynpc.client.pose' {
  import { SkinModel } from 'de.markusbordihn.easynpc.data.skin';
  import { AnimationData } from 'de.markusbordihn.easynpc.data.animation';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Animation } from 'de.markusbordihn.easynpc.data.animation.AnimationData';
  import { Set } from 'java.util';
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';

  class PoseManager {
    static get poseDataKeys(): Set<ResourceLocation>;
    static getPoseData(resourceLocation: ResourceLocation): Animation;
    static getResourceLocation(skinModel: SkinModel, animation: Animation): ResourceLocation;
    static registerPoseData(skinModel: SkinModel, animationData: AnimationData): void;
    static resetModelPose(easyNPC: EasyNPC<any>): void;
    static setModelPose(easyNPC: EasyNPC<any>, animation: Animation): boolean;
  }

}

declare module 'de.markusbordihn.easynpc.client.renderer.blockentity' {
  import { BlockEntityRenderer } from 'net.minecraft.client.renderer.blockentity';
  import { Context } from 'BlockEntityRendererProvider';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';

  interface BaseEasyNPCSpawnerBlockEntityRenderer<T extends EasyNPCSpawnerBlockEntity = any> extends BlockEntityRenderer<T> {}
  class BaseEasyNPCSpawnerBlockEntityRenderer<T extends EasyNPCSpawnerBlockEntity = any> extends BlockEntityRenderer<T> {
    constructor(context: Context);
    render(baseEasyNPCSpawnerBlockEntity: T, partialTicks: number, poseStack: PoseStack, bufferSource: MultiBufferSource, packedLight: number, packedOverlay: number): void;
  }

}

declare module 'de.markusbordihn.easynpc.client.renderer' {
  import { RegisterRenderers } from 'EntityRenderersEvent';

  class BlockEntityRenderer {
    static register(event: RegisterRenderers): void;
  }


  class EntityRenderer {
    static register(event: RegisterRenderers): void;
  }

}

declare module 'de.markusbordihn.easynpc.client.renderer.entity.custom' {
  import { HumanoidMobRenderer } from 'net.minecraft.client.renderer.entity';
  import { DopplerModel, FairyModel, OrcModel } from 'de.markusbordihn.easynpc.client.model.custom';
  import { EasyNPCEntityRenderer } from 'de.markusbordihn.easynpc.client.renderer.entity';
  import { Context } from 'EntityRendererProvider';
  import { ModelLayerLocation } from 'net.minecraft.client.model.geom';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { SkinDataCapable } from 'de.markusbordihn.easynpc.entity.easynpc.data';

  interface DopplerRenderer<E extends PathfinderMob = any> extends EasyNPCEntityRenderer, HumanoidMobRenderer<E, DopplerModel> {}
  class DopplerRenderer<E extends PathfinderMob = any> extends EasyNPCEntityRenderer {
    constructor(context: Context, modelLayerLocation: ModelLayerLocation);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: E): ResourceLocation;
    render(entity: E, entityYaw: number, partialTicks: number, poseStack: PoseStack, bufferSource: MultiBufferSource, packedLight: number): void;
  }


  interface FairyRenderer<E extends Fairy = any> extends EasyNPCEntityRenderer, HumanoidMobRenderer<E, FairyModel> {}
  class FairyRenderer<E extends Fairy = any> extends EasyNPCEntityRenderer {
    constructor(context: Context, modelLayerLocation: ModelLayerLocation);
    get defaultTexture(): ResourceLocation;
    getCustomTexture(entity: SkinDataCapable<any>): ResourceLocation;
    getRemoteTexture(entity: SkinDataCapable<any>): ResourceLocation;
    getTextureLocation(entity: E): ResourceLocation;
  }


  interface OrcRenderer<E extends Orc = any> extends EasyNPCEntityRenderer, HumanoidMobRenderer<E, OrcModel> {}
  class OrcRenderer<E extends Orc = any> extends EasyNPCEntityRenderer {
    constructor(context: Context, modelLayerLocation: ModelLayerLocation);
    get defaultTexture(): ResourceLocation;
    getCustomTexture(entity: SkinDataCapable<any>): ResourceLocation;
    getRemoteTexture(entity: SkinDataCapable<any>): ResourceLocation;
    getTextureLocation(entity: E): ResourceLocation;
  }

}

declare module 'de.markusbordihn.easynpc.client.renderer.entity' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { OriginalModelConfig, CustomModelConfig } from 'de.markusbordihn.easynpc.api.model';
  import { LivingEntity, EntityType, Entity } from 'net.minecraft.world.entity';
  import { Enum } from 'java.lang';
  import { SkinDataCapable } from 'de.markusbordihn.easynpc.entity.easynpc.data';
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { Supplier, Function } from 'java.util.function';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { Context } from 'EntityRendererProvider';
  import { EntityRenderer } from 'net.minecraft.client.renderer.entity';
  import { ModCustomEntityType, EpicFightEntityType, ModNPCEntityType, ModRawEntityType } from 'de.markusbordihn.easynpc.entity';
  import { List } from 'java.util';

  class EasyNPCEntityRenderer {
    get customModelConfig(): CustomModelConfig;
    get defaultTexture(): ResourceLocation;
    get originalModelConfig(): OriginalModelConfig;
    get transparentTexture(): ResourceLocation;
    getCustomTexture(entity: SkinDataCapable<any>): ResourceLocation;
    getEntityPlayerTexture(easyNPC: EasyNPC<any>): ResourceLocation;
    getEntityTexture(easyNPC: EasyNPC<any>): ResourceLocation;
    getEntityTextureWithDefaultCallback(easyNPC: EasyNPC<any>, defaultTextureSupplier: Supplier<ResourceLocation>): ResourceLocation;
    getPlayerTexture(entity: SkinDataCapable<any>): ResourceLocation;
    getRemoteTexture(entity: SkinDataCapable<any>): ResourceLocation;
    getTextureByVariant(variant: Enum<any>): ResourceLocation;
    getTextureLocationWithConfig(entity: LivingEntity): ResourceLocation;
    getVariantTexture(easyNPC: EasyNPC<any>): ResourceLocation;
  }


  class EasyNPCLivingEntityRenderer {
    static handleRenderEnd(easyNPC: EasyNPC<any>, poseStack: PoseStack, bufferSource: MultiBufferSource, packedLight: number): void;
    static handleRenderStart(easyNPC: EasyNPC<any>, poseStack: PoseStack, bufferSource: MultiBufferSource, packedLight: number): void;
    static handleScale(easyNPC: EasyNPC<any>, poseStack: PoseStack): void;
  }


  class EntityRendererUtils {
    static createFallbackRenderer(context: Context, entityType: EntityType<any>): EntityRenderer<LivingEntity>;
    static getVanillaRendererFactory(entityType: EntityType<any>): Function<Context, EntityRenderer<LivingEntity>>;
  }


  interface ModCustomEntityRenderer extends Enum<ModCustomEntityRenderer> {}
  class ModCustomEntityRenderer extends Enum<ModCustomEntityRenderer> {
    static readonly DOPPLER: ModCustomEntityRenderer;
    static readonly FAIRY: ModCustomEntityRenderer;
    static readonly ORC: ModCustomEntityRenderer;
    static readonly ORC_WARRIOR: ModCustomEntityRenderer;
    get entityType(): ModCustomEntityType;
    get renderer(): Function<Context, EntityRenderer<Entity>>;
    static valueOf(name: string): ModCustomEntityRenderer;
    static values(): ModCustomEntityRenderer[];
  }


  interface ModEpicFightEntityRenderer extends Enum<ModEpicFightEntityRenderer> {}
  class ModEpicFightEntityRenderer extends Enum<ModEpicFightEntityRenderer> {
    static readonly CAVE_SPIDER: ModEpicFightEntityRenderer;
    static readonly CREEPER: ModEpicFightEntityRenderer;
    static readonly DROWNED: ModEpicFightEntityRenderer;
    static readonly ENDERMAN: ModEpicFightEntityRenderer;
    static readonly EVOKER: ModEpicFightEntityRenderer;
    static readonly HUSK: ModEpicFightEntityRenderer;
    static readonly HUMANOID_SLIM: ModEpicFightEntityRenderer;
    static readonly HUMANOID: ModEpicFightEntityRenderer;
    static readonly IRON_GOLEM: ModEpicFightEntityRenderer;
    static readonly PIGLIN_BRUTE: ModEpicFightEntityRenderer;
    static readonly PIGLIN: ModEpicFightEntityRenderer;
    static readonly PILLAGER: ModEpicFightEntityRenderer;
    static readonly SKELETON: ModEpicFightEntityRenderer;
    static readonly SPIDER: ModEpicFightEntityRenderer;
    static readonly STRAY: ModEpicFightEntityRenderer;
    static readonly VEX: ModEpicFightEntityRenderer;
    static readonly VINDICATOR: ModEpicFightEntityRenderer;
    static readonly WITCH: ModEpicFightEntityRenderer;
    static readonly WITHER_SKELETON: ModEpicFightEntityRenderer;
    static readonly ZOMBIE_VILLAGER: ModEpicFightEntityRenderer;
    static readonly ZOMBIE: ModEpicFightEntityRenderer;
    static readonly ZOMBIFIED_PIGLIN: ModEpicFightEntityRenderer;
    get entityType(): EpicFightEntityType;
    get renderer(): Function<Context, EntityRenderer<Entity>>;
    static valueOf(name: string): ModEpicFightEntityRenderer;
    static values(): ModEpicFightEntityRenderer[];
  }


  interface ModNPCEntityRenderer extends Enum<ModNPCEntityRenderer> {}
  class ModNPCEntityRenderer extends Enum<ModNPCEntityRenderer> {
    static readonly ALLAY: ModNPCEntityRenderer;
    static readonly BOGGED: ModNPCEntityRenderer;
    static readonly CAT: ModNPCEntityRenderer;
    static readonly CHICKEN: ModNPCEntityRenderer;
    static readonly CREEPER: ModNPCEntityRenderer;
    static readonly DROWNED: ModNPCEntityRenderer;
    static readonly ENDERMAN: ModNPCEntityRenderer;
    static readonly EVOKER: ModNPCEntityRenderer;
    static readonly GHAST: ModNPCEntityRenderer;
    static readonly FOX: ModNPCEntityRenderer;
    static readonly HORSE_SKELETON: ModNPCEntityRenderer;
    static readonly HORSE_ZOMBIE: ModNPCEntityRenderer;
    static readonly HORSE: ModNPCEntityRenderer;
    static readonly HUMANOID_SLIM: ModNPCEntityRenderer;
    static readonly HUMANOID: ModNPCEntityRenderer;
    static readonly ILLUSIONER: ModNPCEntityRenderer;
    static readonly IRON_GOLEM: ModNPCEntityRenderer;
    static readonly PIG: ModNPCEntityRenderer;
    static readonly PIGLIN_BRUTE: ModNPCEntityRenderer;
    static readonly PIGLIN_ZOMBIFIED: ModNPCEntityRenderer;
    static readonly PIGLIN: ModNPCEntityRenderer;
    static readonly PILLAGER: ModNPCEntityRenderer;
    static readonly SLIME: ModNPCEntityRenderer;
    static readonly SKELETON: ModNPCEntityRenderer;
    static readonly CAVE_SPIDER: ModNPCEntityRenderer;
    static readonly SPIDER: ModNPCEntityRenderer;
    static readonly STRAY: ModNPCEntityRenderer;
    static readonly VEX: ModNPCEntityRenderer;
    static readonly VILLAGER: ModNPCEntityRenderer;
    static readonly VINDICATOR: ModNPCEntityRenderer;
    static readonly WITCH: ModNPCEntityRenderer;
    static readonly WITHER_SKELETON: ModNPCEntityRenderer;
    static readonly WOLF: ModNPCEntityRenderer;
    static readonly ZOMBIE_HUSK: ModNPCEntityRenderer;
    static readonly ZOMBIE_VILLAGER: ModNPCEntityRenderer;
    static readonly ZOMBIE: ModNPCEntityRenderer;
    get entityType(): ModNPCEntityType;
    get renderer(): Function<Context, EntityRenderer<Entity>>;
    static valueOf(name: string): ModNPCEntityRenderer;
    static values(): ModNPCEntityRenderer[];
  }


  interface ModRawEntityRenderer extends Enum<ModRawEntityRenderer> {}
  class ModRawEntityRenderer extends Enum<ModRawEntityRenderer> {
    static readonly ALLAY: ModRawEntityRenderer;
    static readonly BOGGED: ModRawEntityRenderer;
    static readonly CAT: ModRawEntityRenderer;
    static readonly CHICKEN: ModRawEntityRenderer;
    static readonly CREEPER: ModRawEntityRenderer;
    static readonly DROWNED: ModRawEntityRenderer;
    static readonly ENDER_MAN: ModRawEntityRenderer;
    static readonly EVOKER: ModRawEntityRenderer;
    static readonly FOX: ModRawEntityRenderer;
    static readonly GHAST: ModRawEntityRenderer;
    static readonly HORSE: ModRawEntityRenderer;
    static readonly HUSK: ModRawEntityRenderer;
    static readonly ILLUSIONER: ModRawEntityRenderer;
    static readonly IRON_GOLEM: ModRawEntityRenderer;
    static readonly PIG: ModRawEntityRenderer;
    static readonly PIGLIN_BRUTE: ModRawEntityRenderer;
    static readonly PIGLIN: ModRawEntityRenderer;
    static readonly PILLAGER: ModRawEntityRenderer;
    static readonly SKELETON: ModRawEntityRenderer;
    static readonly SPIDER: ModRawEntityRenderer;
    static readonly SLIME: ModRawEntityRenderer;
    static readonly STRAY: ModRawEntityRenderer;
    static readonly VEX: ModRawEntityRenderer;
    static readonly VILLAGER: ModRawEntityRenderer;
    static readonly VINDICATOR: ModRawEntityRenderer;
    static readonly WITCH: ModRawEntityRenderer;
    static readonly WITHER_SKELETON: ModRawEntityRenderer;
    static readonly WOLF: ModRawEntityRenderer;
    static readonly ZOMBIE: ModRawEntityRenderer;
    static readonly ZOMBIFIED_PIGLIN: ModRawEntityRenderer;
    static readonly ZOMBIE_VILLAGER: ModRawEntityRenderer;
    get entityType(): ModRawEntityType;
    get renderer(): Function<Context, EntityRenderer<Entity>>;
    static valueOf(name: string): ModRawEntityRenderer;
    static values(): ModRawEntityRenderer[];
  }

}

declare module 'de.markusbordihn.easynpc.client.renderer.entity.layers' {
  import { Chicken, Pig } from 'net.minecraft.world.entity.animal';
  import { ChickenModel, GhastModel, PigModel, SlimeModel } from 'net.minecraft.client.model';
  import { RenderLayerParent } from 'net.minecraft.client.renderer.entity';
  import { EntityModelSet } from 'net.minecraft.client.model.geom';
  import { CustomModelConfig } from 'de.markusbordihn.easynpc.api.model';
  import { RenderLayer } from 'net.minecraft.client.renderer.entity.layers';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { Ghast, Slime } from 'net.minecraft.world.entity.monster';

  interface ChickenCustomModelLayer extends CustomModelRenderLayer<Chicken, ChickenModel> {}
  class ChickenCustomModelLayer extends CustomModelRenderLayer<Chicken, ChickenModel> {
    constructor(renderer: RenderLayerParent<Chicken, ChickenModel<Chicken>>, modelSet: EntityModelSet, config: CustomModelConfig);
  }


  interface CustomModelRenderLayer<T extends LivingEntity = any, M extends EntityModel<T> = any> extends RenderLayer<T, M> {}
  class CustomModelRenderLayer<T extends LivingEntity = any, M extends EntityModel<T> = any> extends RenderLayer<T, M> {
    render(poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number, entity: T, limbSwing: number, limbSwingAmount: number, partialTick: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface CustomModelRenderMode extends Enum<CustomModelRenderMode> {}
  class CustomModelRenderMode extends Enum<CustomModelRenderMode> {
    static readonly NONE: CustomModelRenderMode;
    static readonly OVERLAY: CustomModelRenderMode;
    static readonly OVERLAY_INHERIT_TEXTURE: CustomModelRenderMode;
    static readonly REPLACEMENT: CustomModelRenderMode;
    shouldHideOriginal(): boolean;
    shouldInheritTexture(): boolean;
    static valueOf(name: string): CustomModelRenderMode;
    static values(): CustomModelRenderMode[];
  }


  interface GhastCustomModelLayer extends CustomModelRenderLayer<Ghast, GhastModel> {}
  class GhastCustomModelLayer extends CustomModelRenderLayer<Ghast, GhastModel> {
    constructor(renderer: RenderLayerParent<Ghast, GhastModel<Ghast>>, modelSet: EntityModelSet, config: CustomModelConfig);
  }


  interface PigCustomModelLayer extends CustomModelRenderLayer<Pig, PigModel> {}
  class PigCustomModelLayer extends CustomModelRenderLayer<Pig, PigModel> {
    constructor(renderer: RenderLayerParent<Pig, PigModel<Pig>>, modelSet: EntityModelSet, config: CustomModelConfig);
  }


  interface SlimeCustomModelLayer extends CustomModelRenderLayer<Slime, SlimeModel> {}
  class SlimeCustomModelLayer extends CustomModelRenderLayer<Slime, SlimeModel> {
    constructor(renderer: RenderLayerParent<Slime, SlimeModel<Slime>>, modelSet: EntityModelSet, config: CustomModelConfig);
  }

}

declare module 'de.markusbordihn.easynpc.client.renderer.entity.raw' {
  import { AllayRenderer, BoggedRenderer, CatRenderer, ChickenRenderer, CreeperRenderer, DrownedRenderer, EndermanRenderer, EvokerRenderer, FoxRenderer, GhastRenderer, AbstractHorseRenderer, ZombieRenderer, IllusionerRenderer, IronGolemRenderer, PiglinRenderer, PigRenderer, PillagerRenderer, SkeletonRenderer, SlimeRenderer, SpiderRenderer, StrayRenderer, VexRenderer, VillagerRenderer, VindicatorRenderer, WitchRenderer, WitherSkeletonRenderer, WolfRenderer, ZombieVillagerRenderer } from 'net.minecraft.client.renderer.entity';
  import { EasyNPCEntityRenderer } from 'de.markusbordihn.easynpc.client.renderer.entity';
  import { Context } from 'EntityRendererProvider';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Allay } from 'net.minecraft.world.entity.animal.allay';
  import { Bogged, Creeper, Drowned, EnderMan, Ghast, Zombie, Illusioner, Pillager, AbstractSkeleton, Slime, Spider, Stray, Vex, Vindicator, Witch, WitherSkeleton, ZombieVillager } from 'net.minecraft.world.entity.monster';
  import { Cat, Chicken, Fox, IronGolem, Pig, Wolf } from 'net.minecraft.world.entity.animal';
  import { OriginalModelConfig, CustomModelConfig } from 'de.markusbordihn.easynpc.api.model';
  import { Horse } from 'net.minecraft.world.entity.animal.horse';
  import { HorseModel } from 'net.minecraft.client.model';
  import { Mob } from 'net.minecraft.world.entity';
  import { Villager } from 'net.minecraft.world.entity.npc';

  interface AllayRawRenderer extends EasyNPCEntityRenderer, AllayRenderer {}
  class AllayRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: Allay): ResourceLocation;
  }


  interface BoggedRawRenderer extends EasyNPCEntityRenderer, BoggedRenderer {}
  class BoggedRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: Bogged): ResourceLocation;
  }


  interface CatRawRenderer extends EasyNPCEntityRenderer, CatRenderer {}
  class CatRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: Cat): ResourceLocation;
  }


  interface ChickenRawRenderer extends EasyNPCEntityRenderer, ChickenRenderer {}
  class ChickenRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);

    constructor(context: Context, originalConfig: OriginalModelConfig);

    constructor(context: Context, customConfig: CustomModelConfig);

    constructor(context: Context, originalConfig: OriginalModelConfig, customConfig: CustomModelConfig);
    get customModelConfig(): CustomModelConfig;
    get defaultTexture(): ResourceLocation;
    get originalModelConfig(): OriginalModelConfig;
    getTextureLocation(entity: Chicken): ResourceLocation;
  }


  interface CreeperRawRenderer extends EasyNPCEntityRenderer, CreeperRenderer {}
  class CreeperRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: Creeper): ResourceLocation;
  }


  interface DrownedRawRenderer extends EasyNPCEntityRenderer, DrownedRenderer {}
  class DrownedRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: Drowned): ResourceLocation;
  }


  interface EnderManRawRenderer extends EasyNPCEntityRenderer, EndermanRenderer {}
  class EnderManRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: EnderMan): ResourceLocation;
  }


  interface EvokerRawRenderer<T extends SpellcasterIllager = any> extends EasyNPCEntityRenderer, EvokerRenderer<T> {}
  class EvokerRawRenderer<T extends SpellcasterIllager = any> extends EasyNPCEntityRenderer {
    constructor(context: Context);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: T): ResourceLocation;
  }


  interface FoxRawRenderer extends EasyNPCEntityRenderer, FoxRenderer {}
  class FoxRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: Fox): ResourceLocation;
  }


  interface GhastRawRenderer extends EasyNPCEntityRenderer, GhastRenderer {}
  class GhastRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);

    constructor(context: Context, originalConfig: OriginalModelConfig);

    constructor(context: Context, customConfig: CustomModelConfig);

    constructor(context: Context, originalConfig: OriginalModelConfig, customConfig: CustomModelConfig);
    get customModelConfig(): CustomModelConfig;
    get defaultTexture(): ResourceLocation;
    get originalModelConfig(): OriginalModelConfig;
    getTextureLocation(entity: Ghast): ResourceLocation;
  }


  interface HorseRawRenderer extends EasyNPCEntityRenderer, AbstractHorseRenderer<Horse, HorseModel> {}
  class HorseRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: Horse): ResourceLocation;
  }


  interface HuskRawRenderer extends EasyNPCEntityRenderer, ZombieRenderer {}
  class HuskRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: Zombie): ResourceLocation;
  }


  interface IllusionerRawRenderer extends EasyNPCEntityRenderer, IllusionerRenderer {}
  class IllusionerRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: Illusioner): ResourceLocation;
  }


  interface IronGolemRawRenderer extends EasyNPCEntityRenderer, IronGolemRenderer {}
  class IronGolemRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: IronGolem): ResourceLocation;
  }


  interface PiglinBruteRawRenderer extends EasyNPCEntityRenderer, PiglinRenderer {}
  class PiglinBruteRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: Mob): ResourceLocation;
  }


  interface PiglinRawRenderer extends EasyNPCEntityRenderer, PiglinRenderer {}
  class PiglinRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: Mob): ResourceLocation;
  }


  interface PigRawRenderer extends EasyNPCEntityRenderer, PigRenderer {}
  class PigRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);

    constructor(context: Context, originalConfig: OriginalModelConfig);

    constructor(context: Context, customConfig: CustomModelConfig);

    constructor(context: Context, originalConfig: OriginalModelConfig, customConfig: CustomModelConfig);
    get customModelConfig(): CustomModelConfig;
    get defaultTexture(): ResourceLocation;
    get originalModelConfig(): OriginalModelConfig;
    getTextureLocation(entity: Pig): ResourceLocation;
  }


  interface PillagerRawRenderer extends EasyNPCEntityRenderer, PillagerRenderer {}
  class PillagerRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: Pillager): ResourceLocation;
  }


  interface SkeletonRawRenderer extends EasyNPCEntityRenderer, SkeletonRenderer {}
  class SkeletonRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: AbstractSkeleton): ResourceLocation;
  }


  interface SlimeRawRenderer extends EasyNPCEntityRenderer, SlimeRenderer {}
  class SlimeRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);

    constructor(context: Context, originalConfig: OriginalModelConfig);

    constructor(context: Context, customConfig: CustomModelConfig);

    constructor(context: Context, originalConfig: OriginalModelConfig, customConfig: CustomModelConfig);
    get customModelConfig(): CustomModelConfig;
    get defaultTexture(): ResourceLocation;
    get originalModelConfig(): OriginalModelConfig;
    getTextureLocation(entity: Slime): ResourceLocation;
  }


  interface SpiderRawRenderer extends EasyNPCEntityRenderer, SpiderRenderer<Spider> {}
  class SpiderRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: Spider): ResourceLocation;
  }


  interface StrayRawRenderer extends EasyNPCEntityRenderer, StrayRenderer {}
  class StrayRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: Stray): ResourceLocation;
  }


  interface VexRawRenderer extends EasyNPCEntityRenderer, VexRenderer {}
  class VexRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: Vex): ResourceLocation;
  }


  interface VillagerRawRenderer extends EasyNPCEntityRenderer, VillagerRenderer {}
  class VillagerRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: Villager): ResourceLocation;
  }


  interface VindicatorRawRenderer extends EasyNPCEntityRenderer, VindicatorRenderer {}
  class VindicatorRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: Vindicator): ResourceLocation;
  }


  interface WitchRawRenderer extends EasyNPCEntityRenderer, WitchRenderer {}
  class WitchRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: Witch): ResourceLocation;
  }


  interface WitherSkeletonRawRenderer extends EasyNPCEntityRenderer, WitherSkeletonRenderer {}
  class WitherSkeletonRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: WitherSkeleton): ResourceLocation;
  }


  interface WolfRawRenderer extends EasyNPCEntityRenderer, WolfRenderer {}
  class WolfRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: Wolf): ResourceLocation;
  }


  interface ZombieRawRenderer extends EasyNPCEntityRenderer, ZombieRenderer {}
  class ZombieRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: Zombie): ResourceLocation;
  }


  interface ZombieVillagerRawRenderer extends EasyNPCEntityRenderer, ZombieVillagerRenderer {}
  class ZombieVillagerRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: ZombieVillager): ResourceLocation;
  }


  interface ZombifiedPiglinRawRenderer extends EasyNPCEntityRenderer, PiglinRenderer {}
  class ZombifiedPiglinRawRenderer extends EasyNPCEntityRenderer {
    constructor(context: Context);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: Mob): ResourceLocation;
  }

}

declare module 'de.markusbordihn.easynpc.client.renderer.entity.standard' {
  import { LivingEntityRenderer } from 'net.minecraft.client.renderer.entity';
  import { PlayerModel } from 'net.minecraft.client.model';
  import { EasyNPCEntityRenderer } from 'de.markusbordihn.easynpc.client.renderer.entity';
  import { Context } from 'EntityRendererProvider';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { SkinDataCapable } from 'de.markusbordihn.easynpc.entity.easynpc.data';
  import { PathfinderMob } from 'net.minecraft.world.entity';

  interface PlayerRenderer<T extends PathfinderMob = any> extends EasyNPCEntityRenderer, LivingEntityRenderer<T, PlayerModel> {}
  class PlayerRenderer<T extends PathfinderMob = any> extends EasyNPCEntityRenderer {
    constructor(context: Context);

    constructor(context: Context, slim: boolean);
    get defaultTexture(): ResourceLocation;
    getCustomTexture(entity: SkinDataCapable<any>): ResourceLocation;
    getRemoteTexture(entity: SkinDataCapable<any>): ResourceLocation;
    getTextureLocation(entity: T): ResourceLocation;
  }


  interface PlayerSlimRenderer extends PlayerRenderer {}
  class PlayerSlimRenderer extends PlayerRenderer {
    constructor(context: Context);
    get defaultTexture(): ResourceLocation;
    getTextureLocation(entity: PathfinderMob): ResourceLocation;
  }

}

declare module 'de.markusbordihn.easynpc.client.renderer.entity.state' {
  import { UUID } from 'java.util';

  class EasyNPCRenderStateExtension {
    get easyNpcUUID(): UUID;
    set easyNpcUUID(var1: UUID);
  }

}

declare module 'de.markusbordihn.easynpc.client.renderer.manager' {
  import { EntityType, Entity, PathfinderMob, LivingEntity } from 'net.minecraft.world.entity';
  import { Set, List } from 'java.util';
  import { Level } from 'net.minecraft.world.level';
  import { LivingEntityRenderer, EntityRenderer } from 'net.minecraft.client.renderer.entity';
  import { EntityModel } from 'net.minecraft.client.model';

  class EntityTypeManager {
    static addSupportedEntityType(entityType: EntityType<any>): void;
    static addUnknownEntityType(entityType: EntityType<any>): void;
    static addUnsupportedEntityType(entityType: EntityType<any>): void;
    static calculateScaleFactor(entityType: EntityType<Entity>): number;
    static get supportedEntityTypes(): Set<EntityType<Entity>>;
    static get unknownAndSupportedEntityTypes(): EntityType<Entity>[];
    static get unknownEntityTypes(): Set<EntityType<Entity>>;
    static get unsupportedEntityTypes(): Set<EntityType<Entity>>;
    static getEntityTypeName(entityType: EntityType<Entity>): string;
    static getPathfinderMob(entityType: EntityType<any>, level: Level): PathfinderMob;
    static getScaleFactor(entityType: EntityType<Entity>): number;
    static isSupportedEntityType(entityType: EntityType<any>): boolean;
    static isUnsupportedEntityType(entityType: EntityType<any>): boolean;
    static register(): void;
  }


  class RendererManager {
    static copyCustomEntityData(sourceEntity: PathfinderMob, targetEntity: Entity, entityTypeName: string): void;
    static copyCustomLivingEntityData(sourceEntity: PathfinderMob, targetEntity: LivingEntity, entityTypeName: string): void;
    static copyModSpecificData(sourceEntity: PathfinderMob, targetEntity: Entity, entityTypeName: string): void;
    static getEntityRenderer(entityType: EntityType<any>, pathfinderMob: PathfinderMob): EntityRenderer<Entity>;
    static getLivingEntityRenderer(entityType: EntityType<Entity>, pathfinderMob: PathfinderMob): LivingEntityRenderer<LivingEntity, EntityModel<LivingEntity>>;
    static registerEntityRenderer(entityType: EntityType<Entity>, pathfinderMob: PathfinderMob): EntityRenderer<Entity>;
    static registerLivingEntityRenderer(entityType: EntityType<Entity>, pathfinderMob: PathfinderMob): LivingEntityRenderer<LivingEntity, EntityModel<LivingEntity>>;
  }

}

declare module 'de.markusbordihn.easynpc.client.renderer.screen' {
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { EntityRenderConfig } from 'de.markusbordihn.easynpc.data.render';

  class EntityScreenRenderer {
    static renderEntity(guiGraphics: GuiGraphics, easyNPC: EasyNPC<any>, config: EntityRenderConfig, mouseX: number, mouseY: number): void;
  }

}

declare module 'de.markusbordihn.easynpc.client.screen' {
  import { RegisterMenuScreensEvent } from 'net.neoforged.neoforge.client.event';
  import { Screen as net_minecraft_client_gui_screens_Screen } from 'net.minecraft.client.gui.screens';
  import { MenuAccess } from 'net.minecraft.client.gui.screens.inventory';
  import { UUID } from 'java.util';
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { ScreenData } from 'de.markusbordihn.easynpc.data.screen';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Entity, LivingEntity } from 'net.minecraft.world.entity';
  import { OwnerDataCapable } from 'de.markusbordihn.easynpc.entity.easynpc.data';
  import { SkinModel } from 'de.markusbordihn.easynpc.data.skin';
  import { Component } from 'net.minecraft.network.chat';
  import { ActionEventSet } from 'de.markusbordihn.easynpc.data.action';
  import { DialogDataSet, DialogDataEntry, DialogButtonEntry } from 'de.markusbordihn.easynpc.data.dialog';
  import { RenderDataEntry } from 'de.markusbordihn.easynpc.data.render';

  class ClientScreens {
    static registerScreens(event: RegisterMenuScreensEvent): void;
  }


  interface Screen<T extends AbstractContainerMenu = any, D extends AdditionalScreenDataInterface = any> extends MenuAccess<T>, ScreenInterface<D>, net_minecraft_client_gui_screens_Screen {}
  class Screen<T extends AbstractContainerMenu = any, D extends AdditionalScreenDataInterface = any> extends MenuAccess<T> {
    get additionalScreenData(): D;
    get easyNPC(): EasyNPC<any>;
    get easyNPCUUID(): UUID;
    get menu(): T;
    get screenData(): ScreenData;
    isPauseScreen(): boolean;
    keyPressed(keyCode: number, unused1: number, unused2: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    onClose(): void;
    removed(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
    renderBackground(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
    tick(): void;
  }


  class ScreenInterface<D extends AdditionalScreenDataInterface = any> {
    get actionDataEntryUUID(): UUID;
    get actionEventSet(): ActionEventSet;
    get additionalScreenData(): D;
    get conditionDataEntryUUID(): UUID;
    get dialogButtonData(): DialogButtonEntry;
    get dialogButtonUUID(): UUID;
    get dialogData(): DialogDataEntry;
    get dialogDataSet(): DialogDataSet;
    get dialogText(): Component;
    get dialogUUID(): UUID;
    get easyNPC(): EasyNPC<any>;
    get easyNPCEntity(): Entity;
    get easyNPCLivingEntity(): LivingEntity;
    get easyNPCUUID(): UUID;
    get ownerData(): OwnerDataCapable<any>;
    get pageIndex(): number;
    get renderDataEntry(): RenderDataEntry;
    get screenData(): ScreenData;
    get skinModel(): SkinModel;
    getDialogData(dialogUUID: UUID): DialogDataEntry;
    hasDialog(): boolean;
    hasDialogData(): boolean;
    isSwitchingToAnotherEasyNPCScreen(newScreen: net_minecraft_client_gui_screens_Screen): boolean;
    renderDefaultScreenBg(guiGraphics: GuiGraphics, leftPos: number, topPos: number): void;
    renderDefaultTitleBg(guiGraphics: GuiGraphics, leftPos: number, topPos: number): void;
  }

}

declare module 'de.markusbordihn.easynpc.client.screen.components' {
  import { OnPress } from 'Button';
  import { Component } from 'net.minecraft.network.chat';
  import { AbstractButton, Button, AbstractWidget, AbstractSliderButton, EditBox } from 'net.minecraft.client.gui.components';
  import { OnChange } from 'de.markusbordihn.easynpc.client.screen.components.Checkbox';
  import { NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ToggleState, OnStateChange } from 'de.markusbordihn.easynpc.client.screen.components.MultiStateToggleButton';
  import { OnChange as de_markusbordihn_easynpc_client_screen_components_sliderbutton_OnChange, Type } from 'de.markusbordihn.easynpc.client.screen.components.SliderButton';
  import { Set, List } from 'java.util';
  import { OnChange as de_markusbordihn_easynpc_client_screen_components_spinbutton_OnChange } from 'de.markusbordihn.easynpc.client.screen.components.SpinButton';
  import { FormattedCharSequence } from 'net.minecraft.util';
  import { OnUp, OnDown } from 'de.markusbordihn.easynpc.client.screen.components.UpDownButton';

  interface AddButton extends SpriteButton {}
  class AddButton extends SpriteButton {
    constructor(left: number, top: number, width: number, label: string, onPress: OnPress);

    constructor(left: number, top: number, width: number, component: Component, onPress: OnPress);
  }


  interface CancelButton extends SpriteButton {}
  class CancelButton extends SpriteButton {
    constructor(left: number, top: number, label: string, onPress: OnPress);

    constructor(left: number, top: number, width: number, label: string, onPress: OnPress);
  }


  interface Checkbox extends AbstractButton {}
  class Checkbox extends AbstractButton {
    constructor(left: number, top: number, label: string, selected: boolean, onChange: OnChange);

    constructor(left: number, top: number, label: string, data: Component, selected: boolean, onChange: OnChange);

    constructor(left: number, top: number, label: string, data: string, selected: boolean, onChange: OnChange);

    constructor(left: number, top: number, label: string, selected: boolean);

    constructor(left: number, top: number, component: Component, selected: boolean, showLabel: boolean);

    constructor(left: number, top: number, component: Component, selected: boolean, showLabel: boolean, onChange: OnChange);
    onPress(): void;
    renderButton(guiGraphics: GuiGraphics, left: number, top: number, partialTicks: number): void;
    renderWidget(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    selected(): boolean;
    setSelected(selected: boolean): void;
    updateWidgetNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  interface CloseButton extends SpriteButton {}
  class CloseButton extends SpriteButton {
    constructor(left: number, top: number, onPress: OnPress);
  }


  interface CopyButton extends SpriteButton {}
  class CopyButton extends SpriteButton {
    constructor(left: number, top: number, onPress: OnPress);

    constructor(left: number, top: number, width: number, label: string, onPress: OnPress);
  }


  interface CustomButton extends Button {}
  class CustomButton extends Button {
    constructor(left: number, top: number, width: number, height: number);

    constructor(left: number, top: number, width: number, height: number, onPress: OnPress);

    constructor(left: number, top: number, width: number, height: number, component: Component, onPress: OnPress);
    isHovered(): boolean;
    onPress(): void;
    renderButton(guiGraphics: GuiGraphics, left: number, top: number, partialTicks: number): void;
    renderButtonText(guiGraphics: GuiGraphics, font: Font, component: Component, x: number, y: number): void;
    renderWidget(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface DegreeNumberField extends TextField {}
  class DegreeNumberField extends TextField {
    constructor(font: Font, x: number, y: number, width: number, height: number, value: number);
  }


  interface DeleteButton extends SpriteButton {}
  class DeleteButton extends SpriteButton {
    constructor(left: number, top: number, width: number, onPress: OnPress);

    constructor(left: number, top: number, onPress: OnPress);
  }


  class DrawBorder {
    static draw(guiGraphics: GuiGraphics, x: number, y: number, width: number, height: number): void;
    static draw(guiGraphics: GuiGraphics, x: number, y: number, width: number, height: number, borderColor: number): void;
    static drawVerticalSeparator(guiGraphics: GuiGraphics, x: number, y: number, height: number, color: number): void;
  }


  class DrawBox {
    static draw(guiGraphics: GuiGraphics, x: number, y: number, width: number, height: number): void;
    static draw(guiGraphics: GuiGraphics, x: number, y: number, width: number, height: number, backgroundColor: number): void;
  }


  class DrawBoxWithBorder {
    static draw(guiGraphics: GuiGraphics, x: number, y: number, width: number, height: number): void;
    static draw(guiGraphics: GuiGraphics, x: number, y: number, width: number, height: number, backgroundColor: number, borderColor: number): void;
  }


  interface EditButton extends SpriteButton {}
  class EditButton extends SpriteButton {
    constructor(left: number, top: number, onPress: OnPress);

    constructor(left: number, top: number, width: number, height: number, component: Component, onPress: OnPress);

    constructor(left: number, top: number, width: number, component: Component, onPress: OnPress);

    constructor(left: number, top: number, width: number, height: number, onPress: OnPress);
  }


  interface ExportButton extends SpriteButton {}
  class ExportButton extends SpriteButton {
    constructor(left: number, top: number, onPress: OnPress);

    constructor(left: number, top: number, width: number, height: number, label: string, onPress: OnPress);

    constructor(left: number, top: number, width: number, height: number, component: Component, onPress: OnPress);

    constructor(left: number, top: number, width: number, component: Component, onPress: OnPress);

    constructor(left: number, top: number, width: number, height: number, onPress: OnPress);
  }


  interface FileBrowserButton extends SpriteButton {}
  class FileBrowserButton extends SpriteButton {
    constructor(left: number, top: number, onPress: OnPress);

    constructor(left: number, top: number, width: number, height: number, component: Component, onPress: OnPress);

    constructor(left: number, top: number, width: number, height: number, label: string, onPress: OnPress);

    constructor(left: number, top: number, width: number, component: Component, onPress: OnPress);

    constructor(left: number, top: number, width: number, height: number, onPress: OnPress);
  }


  class Graphics {
    static blit(guiGraphics: GuiGraphics, texture: ResourceLocation, x: number, y: number, width: number, height: number, textureX: number, textureY: number): void;
    static blit(guiGraphics: GuiGraphics, texture: ResourceLocation, x: number, y: number, width: number, height: number, textureX: number, textureY: number, textureWidth: number, textureHeight: number): void;
  }


  interface ImportButton extends SpriteButton {}
  class ImportButton extends SpriteButton {
    constructor(left: number, top: number, onPress: OnPress);

    constructor(left: number, top: number, width: number, height: number, component: Component, onPress: OnPress);

    constructor(left: number, top: number, width: number, height: number, label: string, onPress: OnPress);

    constructor(left: number, top: number, width: number, component: Component, onPress: OnPress);

    constructor(left: number, top: number, width: number, height: number, onPress: OnPress);
  }


  interface MultiStateToggleButton extends CustomButton {}
  class MultiStateToggleButton extends CustomButton {
    static readonly MIN_STATES: number;
    static readonly MAX_STATES: number;
    static readonly DEFAULT_WIDTH: number;
    static readonly DEFAULT_HEIGHT: number;
    static readonly DEFAULT_SPRITE_WIDTH: number;
    static readonly DEFAULT_SPRITE_HEIGHT: number;
    static readonly DEFAULT_SPRITE_X: number;
    static readonly DEFAULT_SPRITE_Y: number;
    static readonly DEFAULT_SPRITE: ResourceLocation;
    constructor(left: number, top: number, states: ToggleState[], initialStateIndex: number, onStateChange: OnStateChange);

    constructor(left: number, top: number, width: number, height: number, states: ToggleState[], initialStateIndex: number, onStateChange: OnStateChange);

    constructor(left: number, top: number, width: number, height: number, spriteTexture: ResourceLocation, spriteX: number, spriteY: number, spriteWidth: number, spriteHeight: number, states: ToggleState[], initialStateIndex: number, onStateChange: OnStateChange);
    get currentState(): ToggleState;
    get currentStateIndex(): number;
    isMouseOver(x: number, y: number): boolean;
    mouseClicked(x: number, y: number, button: number): boolean;
    renderButton(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    set currentStateIndex(stateIndex: number);
    setRenderBackground(renderBackground: boolean): void;
  }


  interface PositionNumberField extends TextField {}
  class PositionNumberField extends TextField {
    constructor(font: Font, x: number, y: number, width: number, height: number, value: number, minValue: number, maxValue: number);
  }


  interface PositiveNumberField extends TextField {}
  class PositiveNumberField extends TextField {
    constructor(font: Font, x: number, y: number, width: number);

    constructor(font: Font, x: number, y: number, width: number, value: number, maxLength: number);

    constructor(font: Font, x: number, y: number, width: number, height: number, value: number);
  }


  interface RangeSliderButton extends AbstractWidget {}
  class RangeSliderButton extends AbstractWidget {
    static readonly DECREASE_TEXT: Component;
    static readonly INCREASE_TEXT: Component;
    static readonly RESET_TEXT: Component;
    static readonly EDIT_TEXT: Component;
    static readonly DONE_TEXT: Component;
    constructor(left: number, top: number, value: number, minValue: number, maxValue: number, defaultValue: number, stepSize: number, onChange: de_markusbordihn_easynpc_client_screen_components_sliderbutton_OnChange);

    constructor(left: number, top: number, width: number, height: number, value: number, defaultValue: number, sliderType: Type, onChange: de_markusbordihn_easynpc_client_screen_components_sliderbutton_OnChange);

    constructor(left: number, top: number, width: number, height: number, value: number, defaultValue: number, sliderType: Type, showButtons: boolean, onChange: de_markusbordihn_easynpc_client_screen_components_sliderbutton_OnChange);

    constructor(left: number, top: number, width: number, height: number, value: number, minValue: number, maxValue: number, defaultValue: number, stepSize: number, onChange: de_markusbordihn_easynpc_client_screen_components_sliderbutton_OnChange);

    constructor(left: number, top: number, width: number, height: number, value: number, minValue: number, maxValue: number, defaultValue: number, stepSize: number, sliderType: Type, showButtons: boolean, onChange: de_markusbordihn_easynpc_client_screen_components_sliderbutton_OnChange);
    charTyped(character: string, keyCode: number): boolean;
    get defaultSliderWidth(): number;
    get targetValue(): number;
    keyPressed(keyCode: number, unused1: number, unused2: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(x: number, y: number, scrollAmount: number, scrollDelta: number): boolean;
    onDrag(mouseX: number, mouseY: number, deltaX: number, deltaY: number): void;
    renderWidget(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    reset(): void;
    set targetValue(newValue: number);
    setX(x: number): void;
    setY(y: number): void;
    showSliderButton(): void;
    showTextField(): void;
  }


  interface ReloadButton extends SpriteButton {}
  class ReloadButton extends SpriteButton {
    constructor(left: number, top: number, width: number, height: number, label: string, onPress: OnPress);
  }


  interface SaveButton extends SpriteButton {}
  class SaveButton extends SpriteButton {
    constructor(left: number, top: number, onPress: OnPress);

    constructor(left: number, top: number, label: string, onPress: OnPress);

    constructor(left: number, top: number, width: number, label: string, onPress: OnPress);
  }


  interface ScaleNumberField extends TextField {}
  class ScaleNumberField extends TextField {
    constructor(font: Font, x: number, y: number, width: number, height: number, value: number, minValue: number, maxValue: number);
  }


  interface SearchField extends TextField {}
  class SearchField extends TextField {
    constructor(font: Font, x: number, y: number, width: number, height: number);
    renderWidget(guiGraphics: GuiGraphics, left: number, top: number, partialTicks: number): void;
  }


  interface SkinSelectionButton extends SpriteButton {}
  class SkinSelectionButton extends SpriteButton {
    constructor(left: number, top: number, onPress: OnPress);
  }


  interface SliderButton extends AbstractSliderButton {}
  class SliderButton extends AbstractSliderButton {
    static readonly DEFAULT_HEIGHT: number;
    constructor(x: number, y: number, width: number, name: string, initValue: number, type: Type, onChange: de_markusbordihn_easynpc_client_screen_components_sliderbutton_OnChange);

    constructor(x: number, y: number, width: number, height: number, initValue: number, type: Type, onChange: de_markusbordihn_easynpc_client_screen_components_sliderbutton_OnChange);

    constructor(x: number, y: number, width: number, height: number, name: string, initValue: number, minValue: number, maxValue: number, onChange: de_markusbordihn_easynpc_client_screen_components_sliderbutton_OnChange);

    constructor(x: number, y: number, width: number, height: number, initValue: number, minValue: number, maxValue: number, onChange: de_markusbordihn_easynpc_client_screen_components_sliderbutton_OnChange, type: Type);

    constructor(x: number, y: number, width: number, height: number, name: Component, initValue: number, minValue: number, maxValue: number, onChange: de_markusbordihn_easynpc_client_screen_components_sliderbutton_OnChange, type: Type);
    get targetDoubleValue(): number;
    get targetValue(): number;
    isVisible(): boolean;
    keyPressed(keyCode: number, unused1: number, unused2: number): boolean;
    mouseScrolled(x: number, y: number, scrollAmount: number, scrollDelta: number): boolean;
    renderButton(guiGraphics: GuiGraphics, left: number, top: number, partialTicks: number): void;
    renderWidget(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    reset(): void;
    setDefaultValue(value: number): void;
    setDefaultValue(value: number): void;
    setFocused(focus: boolean): void;
    triggerOnDrag(mouseX: number, mouseY: number, deltaX: number, deltaY: number): void;
  }


  interface SpinButton<T = any> extends CustomButton {}
  class SpinButton<T = any> extends CustomButton {
    constructor(x: number, y: number, width: number, height: number, values: Set<T>, initialValue: T, onChange: de_markusbordihn_easynpc_client_screen_components_spinbutton_OnChange<T>);
    get (): T;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    renderButton(guiGraphics: GuiGraphics, left: number, top: number, partialTicks: number): void;
    setX(x: number): void;
    setY(y: number): void;
  }


  interface SpriteButton extends CustomButton {}
  class SpriteButton extends CustomButton {
    static readonly DEFAULT_HEIGHT: number;
    static readonly DEFAULT_SPRITE: ResourceLocation;
    constructor(left: number, top: number, width: number, sprite: ResourceLocation, spriteX: number, spriteY: number, spriteOffsetX: number, spriteOffsetY: number, spriteWidth: number, spriteHeight: number, onPress: OnPress);

    constructor(left: number, top: number, width: number, height: number, sprite: ResourceLocation, spriteX: number, spriteY: number, spriteOffsetX: number, spriteOffsetY: number, spriteWidth: number, spriteHeight: number, onPress: OnPress);

    constructor(left: number, top: number, width: number, height: number, spriteX: number, spriteY: number, spriteOffsetX: number, spriteOffsetY: number, spriteWidth: number, spriteHeight: number, onPress: OnPress);

    constructor(left: number, top: number, width: number, height: number, sprite: ResourceLocation, spriteOffsetX: number, spriteOffsetY: number, spriteWidth: number, spriteHeight: number, onPress: OnPress);

    constructor(left: number, top: number, width: number, height: number, label: string, spriteX: number, spriteY: number, spriteOffsetX: number, spriteOffsetY: number, spriteWidth: number, spriteHeight: number, onPress: OnPress);

    constructor(left: number, top: number, width: number, height: number, label: string, sprite: ResourceLocation, spriteX: number, spriteY: number, spriteOffsetX: number, spriteOffsetY: number, spriteWidth: number, spriteHeight: number, onPress: OnPress);

    constructor(left: number, top: number, width: number, height: number, component: Component, spriteX: number, spriteY: number, spriteOffsetX: number, spriteOffsetY: number, spriteWidth: number, spriteHeight: number, onPress: OnPress);

    constructor(left: number, top: number, width: number, height: number, component: Component, sprite: ResourceLocation, spriteX: number, spriteY: number, spriteOffsetX: number, spriteOffsetY: number, spriteWidth: number, spriteHeight: number, onPress: OnPress);
    renderButton(guiGraphics: GuiGraphics, left: number, top: number, partialTicks: number): void;
    renderButtonText(guiGraphics: GuiGraphics, font: Font, component: Component, x: number, y: number): void;
    setRenderBackground(renderBackground: boolean): void;
    setRenderCenter(renderCenter: boolean): SpriteButton;
  }


  interface SpriteToggleButton extends SpriteButton {}
  class SpriteToggleButton extends SpriteButton {
    constructor(left: number, top: number, width: number, height: number, label: string, spriteX: number, spriteY: number, spriteOffsetX: number, spriteOffsetY: number, spriteWidth: number, spriteHeight: number, onPress: OnPress);
    isMouseOver(x: number, y: number): boolean;
    mouseClicked(x: number, y: number, button: number): boolean;
  }


  class Text {
    static drawConfigString(guiGraphics: GuiGraphics, font: Font, translationKey: string, x: number, y: number): void;
    static drawConfigString(guiGraphics: GuiGraphics, font: Font, translationKey: string, x: number, y: number, color: number): void;
    static drawConfigStringShadow(guiGraphics: GuiGraphics, font: Font, translationKey: string, x: number, y: number, color: number): void;
    static drawConfigStringShadowWithData(guiGraphics: GuiGraphics, font: Font, translationKey: string, data: string, x: number, y: number, color: number): void;
    static drawErrorMessage(guiGraphics: GuiGraphics, font: Font, text: string, x: number, y: number, width: number): void;
    static drawErrorMessage(guiGraphics: GuiGraphics, font: Font, component: Component, x: number, y: number, width: number): void;
    static drawString(guiGraphics: GuiGraphics, font: Font, text: string, x: number, y: number): void;
    static drawString(guiGraphics: GuiGraphics, font: Font, component: Component, x: number, y: number): void;
    static drawString(guiGraphics: GuiGraphics, font: Font, component: Component, x: number, y: number, color: number): void;
    static drawString(guiGraphics: GuiGraphics, font: Font, formattedCharSequence: FormattedCharSequence, x: number, y: number): void;
    static drawString(guiGraphics: GuiGraphics, font: Font, text: string, x: number, y: number, color: number): void;
    static drawString(guiGraphics: GuiGraphics, font: Font, formattedCharSequence: FormattedCharSequence, x: number, y: number, color: number): void;
    static drawStringShadow(guiGraphics: GuiGraphics, font: Font, text: string, x: number, y: number, color: number): void;
    static drawStringShadow(guiGraphics: GuiGraphics, font: Font, component: Component, x: number, y: number, color: number): void;
    static wrapText(font: Font, text: string, maxWidth: number): string[];
  }


  interface TextButton extends CustomButton {}
  class TextButton extends CustomButton {
    static readonly DEFAULT_HEIGHT: number;
    constructor(left: number, top: number, width: number, height: number);

    constructor(left: number, top: number, width: number, label: string, data: Component, onPress: OnPress);

    constructor(left: number, top: number, width: number, label: string, data: string, onPress: OnPress);

    constructor(left: number, top: number, width: number, label: string, onPress: OnPress);

    constructor(left: number, top: number, width: number, height: number, label: string, onPress: OnPress);

    constructor(left: number, top: number, width: number, label: Component, onPress: OnPress);

    constructor(left: number, top: number, width: number, height: number, label: Component, onPress: OnPress);
    isVisible(): boolean;
  }


  interface TextEditButton extends SpriteButton {}
  class TextEditButton extends SpriteButton {
    constructor(left: number, top: number, onPress: OnPress);

    constructor(left: number, top: number, width: number, label: string, onPress: OnPress);

    constructor(left: number, top: number, width: number, height: number, label: string, onPress: OnPress);
  }


  interface TextField extends EditBox {}
  class TextField extends EditBox {
    constructor(font: Font, x: number, y: number, width: number);

    constructor(font: Font, x: number, y: number, width: number, value: string);

    constructor(font: Font, x: number, y: number, width: number, value: number, maxLength: number);

    constructor(font: Font, x: number, y: number, width: number, text: string, maxLength: number);

    constructor(font: Font, x: number, y: number, width: number, height: number, value: number);

    constructor(font: Font, x: number, y: number, width: number, height: number, value: string, maxLength: number);

    constructor(font: Font, x: number, y: number, width: number, height: number);
  }


  interface UpDownButton extends AbstractWidget {}
  class UpDownButton extends AbstractWidget {
    constructor(left: number, top: number, width: number, height: number, onUp: OnUp, onDown: OnDown);
    enableDownButton(enable: boolean): void;
    enableUpButton(enable: boolean): void;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    renderWidget(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    setX(x: number): void;
    setY(y: number): void;
    updateWidgetNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  interface VisibilityButton extends SpriteButton {}
  class VisibilityButton extends SpriteButton {
    constructor(left: number, top: number, onPress: OnPress);

    constructor(left: number, top: number, width: number, height: number, label: string, onPress: OnPress);
  }


  interface VisibilityToggleButton extends SpriteToggleButton {}
  class VisibilityToggleButton extends SpriteToggleButton {
    constructor(left: number, top: number, onPress: OnPress);

    constructor(left: number, top: number, width: number, height: number, label: string, onPress: OnPress);
  }

}

declare module 'de.markusbordihn.easynpc.client.screen.components.Checkbox' {
  import { Checkbox } from 'de.markusbordihn.easynpc.client.screen.components';

  class OnChange {
    onChange(var1: Checkbox): void;
  }

}

declare module 'de.markusbordihn.easynpc.client.screen.components.MultiStateToggleButton' {
  import { MultiStateToggleButton } from 'de.markusbordihn.easynpc.client.screen.components';

  class OnStateChange {
    onStateChange(var1: MultiStateToggleButton, var2: number): void;
  }

}

declare module 'de.markusbordihn.easynpc.client.screen.components.SliderButton' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { SliderButton } from 'de.markusbordihn.easynpc.client.screen.components';

  interface Type extends Enum<Type> {}
  class Type extends Enum<Type> {
    static readonly DOUBLE: Type;
    static readonly DEGREE: Type;
    static readonly POSITION: Type;
    static readonly SCALE: Type;
    static readonly UNKNOWN: Type;
    static valueOf(name: string): Type;
    static values(): Type[];
  }


  class OnChange {
    onChange(var1: SliderButton): void;
  }

}

declare module 'de.markusbordihn.easynpc.client.screen.components.SpinButton' {
  import { SpinButton } from 'de.markusbordihn.easynpc.client.screen.components';

  class OnChange<T = any> {
    onChange(var1: SpinButton<T>): void;
  }

}

declare module 'de.markusbordihn.easynpc.client.screen.components.UpDownButton' {
  import { UpDownButton } from 'de.markusbordihn.easynpc.client.screen.components';

  class OnUp {
    onUp(var1: UpDownButton): void;
  }


  class OnDown {
    onDown(var1: UpDownButton): void;
  }

}

declare module 'de.markusbordihn.easynpc.client.screen.dialog' {
  import { Screen } from 'de.markusbordihn.easynpc.client.screen';
  import { AdditionalScreenData } from 'de.markusbordihn.easynpc.data.screen';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { DialogMenu } from 'de.markusbordihn.easynpc.menu.dialog';

  interface DialogScreen<T extends DialogMenu = any> extends Screen<T, AdditionalScreenData> {}
  class DialogScreen<T extends DialogMenu = any> extends Screen<T, AdditionalScreenData> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    onClose(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface DialogScreenWrapper extends DialogScreen<DialogMenu> {}
  class DialogScreenWrapper extends DialogScreen<DialogMenu> {
    constructor(menu: DialogMenu, inventory: Inventory, component: Component);
  }

}

declare module 'de.markusbordihn.easynpc.client.texture' {
  import { CompletableFuture } from 'java.util.concurrent';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Path } from 'java.nio.file';
  import { UUID, Set, Map } from 'java.util';
  import { SkinModel, SkinType } from 'de.markusbordihn.easynpc.data.skin';
  import { SkinDataCapable } from 'de.markusbordihn.easynpc.entity.easynpc.data';
  import { File } from 'java.io';
  import { TextureFailureType } from 'de.markusbordihn.easynpc.data.texture';
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { Enum } from 'java.lang';

  class AsyncTextureLoader {
    static loadPlayerTextureAsync(key: TextureModelKey, playerUUID: UUID, targetDirectory: Path): CompletableFuture<ResourceLocation>;
    static loadTextureAsync(key: TextureModelKey, url: string, targetDirectory: Path): CompletableFuture<ResourceLocation>;
    static shutdown(): void;
  }


  class CustomTextureManager {
    static clearTextureCache(): void;
    static getCustomTextureCacheKeys(skinModel: SkinModel): Set<UUID>;
    static getCustomTextureCacheKeys(skinModel: SkinModel, searchName: string): Set<UUID>;
    static getOrCreateTextureWithDefault(skinData: SkinDataCapable<any>, defaultResourceLocation: ResourceLocation): ResourceLocation;
    static registerTexture(skinModel: SkinModel, textureFile: File): void;
    static registerTexture(textureModelKey: TextureModelKey, textureFile: File): void;
  }


  class PlayerTextureManager {
    static clearTextureCache(): void;
    static getOrCreateTextureWithDefault(skinData: SkinDataCapable<any>, defaultResourceLocation: ResourceLocation): ResourceLocation;
    static getTextureCacheKeys(skinModel: SkinModel): Set<UUID>;
    static getTextureSkinType(textureModelKey: TextureModelKey): SkinType;
    static hasTextureSkinData(textureModelKey: TextureModelKey): boolean;
    static registerTexture(skinModel: SkinModel, textureFile: File): void;
    static registerTexture(textureModelKey: TextureModelKey, textureFile: File): void;
  }


  class RemoteTextureLoader {
    static loadRemoteTexture(textureModelKey: TextureModelKey, remoteUrl: string, targetDirectory: Path): ResourceLocation;
  }


  class RemoteTextureManager {
    static clearAllPermanentFailures(): void;
    static clearPermanentFailure(key: TextureModelKey): void;
    static clearTextureCache(): void;
    static getOrCreateTextureWithDefault(skinData: SkinDataCapable<any>, defaultResourceLocation: ResourceLocation): ResourceLocation;
    static getTextureCacheKeys(skinModel: SkinModel): Set<UUID>;
    static getTextureSkinType(textureModelKey: TextureModelKey): SkinType;
    static getTextureSkinURL(textureModelKey: TextureModelKey): string;
    static hasPermanentFailure(key: TextureModelKey): boolean;
    static hasTextureSkinData(textureModelKey: TextureModelKey): boolean;
    static markPermanentFailure(key: TextureModelKey, type: TextureFailureType, details: string, url: string): void;
    static registerTexture(skinModel: SkinModel, textureFile: File): void;
    static registerTexture(textureModelKey: TextureModelKey, textureFile: File): void;
  }


  class TextureCacheManager {
    static getCachedTexture(textureModelKey: TextureModelKey, targetDirectory: Path): ResourceLocation;
    static getTextureModelKey(skinModel: SkinModel, textureFile: File): TextureModelKey;
    static getUUIDFromFilename(fileName: string): UUID;
    static searchCachedTexture(textureModelKey: TextureModelKey, targetDirectory: Path): ResourceLocation;
  }


  class TextureErrorHandler {
    static clearLastErrorMessage(): void;
    static get lastErrorMessage(): string;
    static hasLastErrorMessage(): boolean;
    static processingErrorMessage(textureModelKey: TextureModelKey, remoteUrl: string, reason: string): void;
    static urlLoadErrorMessage(textureModelKey: TextureModelKey, remoteUrl: string, reason: string): void;
  }


  class TextureImageLoader {
    static getNativeImage(file: File): NativeImage;
    static getNativeImage(file: File, legacySupport: boolean): NativeImage;
    static getNativeImageFromLegacyImage(legacyNativeImage: NativeImage): NativeImage;
    static getNativePlayerImage(file: File): NativeImage;
  }


  class TextureManager {
    static addCustomTexture(textureModelKey: TextureModelKey, file: File): ResourceLocation;
    static addRemoteTexture(textureModelKey: TextureModelKey, remoteUrl: string, targetDirectory: Path): ResourceLocation;
    static clearLastErrorMessage(): void;
    static get lastErrorMessage(): string;
    static getCachedTexture(textureModelKey: TextureModelKey, targetDirectory: Path): ResourceLocation;
    static getFileName(uuid: UUID): string;
    static getFileName(name: string): string;
    static getResourceName(textureModelKey: TextureModelKey): string;
    static getResourceName(name: string, type: string): string;
    static getTextureModelKey(skinModel: SkinModel, textureFile: File): TextureModelKey;
    static getUUIDFromFilename(fileName: string): UUID;
    static hasLastErrorMessage(): boolean;
    static searchCachedTexture(textureModelKey: TextureModelKey, targetDirectory: Path): ResourceLocation;
  }


  class TextureNameHelper {
    static getFileName(uuid: UUID): string;
    static getFileName(name: string): string;
    static getResourceName(textureModelKey: TextureModelKey): string;
    static getResourceName(name: string, type: string): string;
  }


  class TextureRegistrationHelper {
    static registerTexture(textureModelKey: TextureModelKey, nativeImage: NativeImage): ResourceLocation;
  }


  class VariantTextureManager {
    static clearVariantTextureCache(): void;
    static getVariantTexture(skinModel: SkinModel, variantType: Enum<any>): ResourceLocation;
    static getVariantTextureOrDefault(skinModel: SkinModel, variantType: Enum<any>, defaultTexture: ResourceLocation): ResourceLocation;
    static getVariantTextures(skinModel: SkinModel): Map<Enum<any>, ResourceLocation>;
    static hasVariantTexture(skinModel: SkinModel, variantType: Enum<any>): boolean;
    static registerVariantTexture(skinModel: SkinModel, variantType: Enum<any>, texture: ResourceLocation): void;
    static registerVariantTextures(skinModel: SkinModel, textures: Map<Enum<any>, ResourceLocation>): void;
  }

}

declare module 'de.markusbordihn.easynpc.commands.arguments' {
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { Pair } from 'com.mojang.datafixers.util';
  import { SimpleCommandExceptionType } from 'com.mojang.brigadier.exceptions';
  import { UUID, Collection } from 'java.util';
  import { CommandContext } from 'com.mojang.brigadier.context';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { StringReader } from 'com.mojang.brigadier';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Suggestions, SuggestionsBuilder } from 'com.mojang.brigadier.suggestion';
  import { EntitySelector } from 'net.minecraft.commands.arguments.selector';
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { EntityType, Entity, EquipmentSlot } from 'net.minecraft.world.entity';

  interface DialogArgument extends ArgumentType<Pair> {}
  class DialogArgument extends ArgumentType<Pair> {
    static readonly ERROR_INVALID_UUID: SimpleCommandExceptionType;
    get examples(): Collection<string>;
    static getUuidOrLabel(commandContext: CommandContext<CommandSourceStack>, dialog: string): Pair<UUID, string>;
    listSuggestions<S>(context: CommandContext<S>, suggestionsBuilder: SuggestionsBuilder): CompletableFuture<Suggestions>;
    parse(stringReader: StringReader): Pair<UUID, string>;
    static uuidOrLabel(): DialogArgument;
  }


  interface EasyNPCArgument extends ArgumentType<EntitySelector> {}
  class EasyNPCArgument extends ArgumentType<EntitySelector> {
    static readonly NO_ENTITIES_FOUND: SimpleCommandExceptionType;
    get examples(): Collection<string>;
    static getEntities(context: CommandContext<CommandSourceStack>, name: string): Collection<EasyNPC<any>>;
    static getEntitiesWithAccess(context: CommandContext<CommandSourceStack>, name: string): Collection<EasyNPC<any>>;
    static getEntity(context: CommandContext<CommandSourceStack>, name: string): EasyNPC<any>;
    static getEntityWithAccess(context: CommandContext<CommandSourceStack>, name: string): EasyNPC<any>;
    static getOptionalEntities(context: CommandContext<CommandSourceStack>, name: string): Collection<EasyNPC<any>>;
    listSuggestions<S>(context: CommandContext<S>, suggestionsBuilder: SuggestionsBuilder): CompletableFuture<Suggestions>;
    static npc(): EasyNPCArgument;
    parse(stringReader: StringReader): EntitySelector;
  }


  interface EntityTypeArgument extends ArgumentType<EntityType> {}
  class EntityTypeArgument extends ArgumentType<EntityType> {
    static entityType(): EntityTypeArgument;
    get examples(): Collection<string>;
    static getEntityType(commandContext: CommandContext<CommandSourceStack>, entityName: string): EntityType<Entity>;
    listSuggestions<S>(context: CommandContext<S>, suggestionsBuilder: SuggestionsBuilder): CompletableFuture<Suggestions>;
    parse(stringReader: StringReader): EntityType<Entity>;
  }


  interface EquipmentSlotArgument extends ArgumentType<EquipmentSlot> {}
  class EquipmentSlotArgument extends ArgumentType<EquipmentSlot> {
    get examples(): Collection<string>;
    static getEquipmentSlot(commandContext: CommandContext<CommandSourceStack>, slotName: string): EquipmentSlot;
    listSuggestions<S>(commandContext: CommandContext<S>, suggestionsBuilder: SuggestionsBuilder): CompletableFuture<Suggestions>;
    parse(stringReader: StringReader): EquipmentSlot;
    static slot(): EquipmentSlotArgument;
  }

}

declare module 'de.markusbordihn.easynpc.commands' {
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { Component } from 'net.minecraft.network.chat';
  import { ChatFormatting } from 'net.minecraft';
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { RegisterCommandsEvent } from 'net.neoforged.neoforge.event';
  import { DeferredRegister, DeferredHolder } from 'net.neoforged.neoforge.registries';

  class Command {
    static readonly FAILURE: number;
    static readonly SINGLE_SUCCESS: number;
    static readonly COLOR_ARG: string;
    static readonly DIALOG_ARG: string;
    static readonly ENABLE_ARG: string;
    static readonly ENTITY_ARG: string;
    static readonly ITEM_ARG: string;
    static readonly MODEL_PART_ARG: string;
    static readonly NAME_ARG: string;
    static readonly NPC_TARGET_ARG: string;
    static readonly NPC_TARGETS_ARG: string;
    static readonly PARAMETER_ARG: string;
    static readonly PLAYER_ARG: string;
    static readonly POSITION_ARG: string;
    static readonly SCALE_ARG: string;
    static readonly SLOT_ARG: string;
    static readonly SOUND_ARG: string;
    static readonly TARGET_ARG: string;
    static readonly TYPE_ARG: string;
    static readonly VALUE_ARG: string;
    static readonly VARIANT_ARG: string;
    static readonly VISIBILITY_ARG: string;
    static readonly X_ARG: string;
    static readonly Y_ARG: string;
    static readonly YAW_ARG: string;
    static readonly Z_ARG: string;
    static sendFailureMessage(context: CommandSourceStack, message: Component): number;
    static sendFailureMessage(context: CommandSourceStack, message: string): number;
    static sendFailureMessageNoData(context: CommandSourceStack, easyNPC: EasyNPC<any>, dataName: string): number;
    static sendFailureMessageNoDialogData(context: CommandSourceStack, easyNPC: EasyNPC<any>): number;
    static sendFailureMessageNoMerchant(context: CommandSourceStack, easyNPC: EasyNPC<any>): number;
    static sendFailureMessageNoNavigationData(context: CommandSourceStack, easyNPC: EasyNPC<any>): number;
    static sendFailureMessageNoObjectiveData(context: CommandSourceStack, easyNPC: EasyNPC<any>): number;
    static sendFailureMessageNoObjectiveData(context: CommandSourceStack, easyNPC: EasyNPC<any>, objectiveType: string): number;
    static sendFailureMessageNoOwnerData(context: CommandSourceStack, easyNPC: EasyNPC<any>): number;
    static sendFailureMessageNoSoundData(context: CommandSourceStack, easyNPC: EasyNPC<any>): number;
    static sendFailureMessageNoSoundDataSet(context: CommandSourceStack, easyNPC: EasyNPC<any>): number;
    static sendFailureMessageNoTradingData(context: CommandSourceStack, easyNPC: EasyNPC<any>): number;
    static sendSuccessMessage(context: CommandSourceStack, message: Component): number;
    static sendSuccessMessage(context: CommandSourceStack, message: string): number;
    static sendSuccessMessage(context: CommandSourceStack, message: string, formatting: ChatFormatting): number;
  }


  class CommandsEventHandler {
    static handleRegisterCommandsEvent(event: RegisterCommandsEvent): void;
  }


  class ModArgumentTypes {
    static readonly COMMAND_ARGUMENT_TYPES: DeferredRegister;
    static readonly DIALOG_ARGUMENT: DeferredHolder;
    static readonly EASY_NPC_ARGUMENT: DeferredHolder;
    static readonly ENTITY_TYPE_ARGUMENT: DeferredHolder;
    static readonly EQUIPMENT_SLOT_ARGUMENT: DeferredHolder;
  }

}

declare module 'de.markusbordihn.easynpc.commands.manager' {
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack, CommandBuildContext } from 'net.minecraft.commands';

  class CommandManager {
    static registerCommands(commandDispatcher: CommandDispatcher<CommandSourceStack>, context: CommandBuildContext): void;
  }

}

declare module 'de.markusbordihn.easynpc.commands.selector' {
  import { EntitySelectorParser } from 'net.minecraft.commands.arguments.selector';
  import { StringReader } from 'com.mojang.brigadier';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Suggestions, SuggestionsBuilder } from 'com.mojang.brigadier.suggestion';
  import { Consumer } from 'java.util.function';

  interface EasyNPCSelectorParser extends EntitySelectorParser {}
  class EasyNPCSelectorParser extends EntitySelectorParser {
    constructor(stringReader: StringReader);

    constructor(stringReader: StringReader, allowSelectors: boolean);
    fillSuggestions(suggestionsBuilder: SuggestionsBuilder, consumer: Consumer<SuggestionsBuilder>): CompletableFuture<Suggestions>;
  }

}

declare module 'de.markusbordihn.easynpc.commands.suggestion' {
  import { SuggestionProvider, Suggestions, SuggestionsBuilder } from 'com.mojang.brigadier.suggestion';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { CompletableFuture } from 'java.util.concurrent';
  import { CommandContext } from 'com.mojang.brigadier.context';
  import { Stream } from 'java.util.stream';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { UUID } from 'java.util';

  interface ColorSuggestions extends SuggestionProvider<CommandSourceStack> {}
  class ColorSuggestions extends SuggestionProvider<CommandSourceStack> {
    static readonly INSTANCE: ColorSuggestions;
    getSuggestions(context: CommandContext<CommandSourceStack>, builder: SuggestionsBuilder): CompletableFuture<Suggestions>;
  }


  class EasyNPCSuggestions {
    static suggestUUID(serverPlayer: ServerPlayer): Stream<string>;
    static suggestUUID(startWith: string): Stream<string>;
    static suggestUUID(context: CommandContext<CommandSourceStack>, build: SuggestionsBuilder): CompletableFuture<Suggestions>;
  }


  class EntityTypeSuggestions {
    static suggest(context: CommandContext<CommandSourceStack>, build: SuggestionsBuilder): CompletableFuture<Suggestions>;
  }


  interface NameVisibilitySuggestions extends SuggestionProvider<CommandSourceStack> {}
  class NameVisibilitySuggestions extends SuggestionProvider<CommandSourceStack> {
    static readonly INSTANCE: NameVisibilitySuggestions;
    getSuggestions(context: CommandContext<CommandSourceStack>, builder: SuggestionsBuilder): CompletableFuture<Suggestions>;
  }


  class PoseSuggestions {
    static suggest(context: CommandContext<CommandSourceStack>, build: SuggestionsBuilder): CompletableFuture<Suggestions>;
  }


  class PresetSuggestions {
    static suggest(context: CommandContext<CommandSourceStack>, build: SuggestionsBuilder): CompletableFuture<Suggestions>;
    static suggestCustom(context: CommandContext<CommandSourceStack>, build: SuggestionsBuilder): CompletableFuture<Suggestions>;
    static suggestData(context: CommandContext<CommandSourceStack>, build: SuggestionsBuilder): CompletableFuture<Suggestions>;
    static suggestDefault(context: CommandContext<CommandSourceStack>, build: SuggestionsBuilder): CompletableFuture<Suggestions>;
    static suggestWorld(context: CommandContext<CommandSourceStack>, build: SuggestionsBuilder): CompletableFuture<Suggestions>;
  }


  class RenderTypeSuggestions {
    static suggest(context: CommandContext<CommandSourceStack>, build: SuggestionsBuilder): CompletableFuture<Suggestions>;
  }


  class SoundTypeSuggestions {
    static suggest(context: CommandContext<CommandSourceStack>, build: SuggestionsBuilder): CompletableFuture<Suggestions>;
  }


  class VariantSuggestions {
    static suggest(context: CommandContext<CommandSourceStack>, build: SuggestionsBuilder, uuid: UUID): CompletableFuture<Suggestions>;
  }

}

declare module 'de.markusbordihn.easynpc.compat' {
  import { Logger } from 'org.apache.logging.log4j';

  class CompatConstants {
    static readonly MOD_EPIC_FIGHT_ID: string;
    static readonly MOD_EPIC_FIGHT_NAME: string;
    static readonly MOD_EPIC_FIGHT_PREFIX: string;
    static readonly MOD_COBBLEMON_ID: string;
    static readonly MOD_COBBLEMON_NAME: string;
    static readonly MOD_COBBLEMON_PREFIX: string;
    static MOD_EPIC_FIGHT_LOADED: boolean;
    static MOD_COBBLEMON_LOADED: boolean;
  }


  interface CompatHandler extends CompatHandlerInterface {}
  class CompatHandler extends CompatHandlerInterface {
    isModLoaded(modId: string): boolean;
  }


  class CompatHandlerInterface {
    static readonly COMPAT_LOG_PREFIX: string;
    static readonly log: Logger;
    isModLoaded(var1: string): boolean;
    logFoundMod(modName: string, modId: string, modLoaded: boolean): void;
    register(): void;
  }


  class CompatManager {
    static get handler(): CompatHandlerInterface;
    static isModLoaded(modId: string): boolean;
    static registerCompatHandler(compatHandlerInterface: CompatHandlerInterface): void;
  }

}

declare module 'de.markusbordihn.easynpc.component' {
  import { DataComponentType } from 'net.minecraft.core.component';
  import { Supplier } from 'java.util.function';
  import { PresetData } from 'de.markusbordihn.easynpc.data.preset';
  import { TestItemData } from 'de.markusbordihn.easynpc.data.test';
  import { DeferredRegister } from 'net.neoforged.neoforge.registries';
  import { FMLCommonSetupEvent } from 'net.neoforged.fml.event.lifecycle';

  class DataComponents {
    static PRESET_DATA: DataComponentType;
    static TEST_ITEM_DATA: DataComponentType;
    static registerDataComponents(): void;
    static registerPresetData(supplier: Supplier<DataComponentType<PresetData>>): void;
    static registerTestItemData(supplier: Supplier<DataComponentType<TestItemData>>): void;
  }


  class ModDataComponents {
    static readonly DATA_COMPONENTS: DeferredRegister;
    static readonly PRESET_DATA: Supplier;
    static readonly TEST_ITEM_DATA: Supplier;
    static onCommonSetup(event: FMLCommonSetupEvent): void;
  }

}

declare module 'de.markusbordihn.easynpc.config' {
  import { Properties, Set } from 'java.util';
  import { File } from 'java.io';

  class Config {
    static createConfigFile(configFile: File, header: string): void;
    static getConfigFile(configFileName: string): File;
    static prepareConfiguration(): void;
    static readConfigFile(configFile: File): Properties;
    static register(isServer: boolean): void;
    static registerClientConfig(): void;
    static registerCommonConfig(): void;
    static registerConfigFile(configFileName: string, configFileHeader: string): void;
    static registerServerConfig(): void;
    static updateConfigFileIfChanged(configFile: File, configFileHeader: string, properties: Properties, unmodifiedProperties: Properties): void;
  }


  interface NPCBaseConfig extends Config {}
  class NPCBaseConfig extends Config {
    static readonly CONFIG_FILE_NAME: string;
    static readonly CONFIG_FILE_HEADER: string;
    static ALLOW_BYPASS_INVULNERABILITY: boolean;
    static parseConfigFile(): void;
    static registerConfig(): void;
  }


  interface RenderEntityTypeSupportConfig extends Config {}
  class RenderEntityTypeSupportConfig extends Config {
    static readonly CONFIG_FILE_NAME: string;
    static readonly CONFIG_FILE_HEADER: string;
    static addSupportedEntityType(entityType: string): void;
    static addUnsupportedEntityType(entityType: string): void;
    static get supportedEntityTypes(): Set<string>;
    static get unsupportedEntityTypes(): Set<string>;
    static isSupportedEntityType(entityType: string): boolean;
    static isUnsupportedEntityType(entityType: string): boolean;
    static parseConfigFile(): void;
    static registerConfig(): void;
  }


  interface SpawnerTypeConfig extends Config {}
  class SpawnerTypeConfig extends Config {
    static readonly CONFIG_FILE_NAME: string;
    static readonly CONFIG_FILE_HEADER: string;
    static BOSS_SPAWNER_DELAY: number;
    static BOSS_SPAWNER_MIN_SPAWN_DELAY: number;
    static BOSS_SPAWNER_MAX_SPAWN_DELAY: number;
    static BOSS_SPAWNER_SPAWN_COUNT: number;
    static BOSS_SPAWNER_MAX_NEARBY_ENTITIES: number;
    static BOSS_SPAWNER_REQUIRED_PLAYER_RANGE: number;
    static BOSS_SPAWNER_SPAWN_RANGE: number;
    static DEFAULT_SPAWNER_DELAY: number;
    static DEFAULT_SPAWNER_MIN_SPAWN_DELAY: number;
    static DEFAULT_SPAWNER_MAX_SPAWN_DELAY: number;
    static DEFAULT_SPAWNER_SPAWN_COUNT: number;
    static DEFAULT_SPAWNER_MAX_NEARBY_ENTITIES: number;
    static DEFAULT_SPAWNER_REQUIRED_PLAYER_RANGE: number;
    static DEFAULT_SPAWNER_SPAWN_RANGE: number;
    static GROUP_SPAWNER_DELAY: number;
    static GROUP_SPAWNER_MIN_SPAWN_DELAY: number;
    static GROUP_SPAWNER_MAX_SPAWN_DELAY: number;
    static GROUP_SPAWNER_SPAWN_COUNT: number;
    static GROUP_SPAWNER_MAX_NEARBY_ENTITIES: number;
    static GROUP_SPAWNER_REQUIRED_PLAYER_RANGE: number;
    static GROUP_SPAWNER_SPAWN_RANGE: number;
    static SINGLE_SPAWNER_DELAY: number;
    static SINGLE_SPAWNER_MIN_SPAWN_DELAY: number;
    static SINGLE_SPAWNER_MAX_SPAWN_DELAY: number;
    static SINGLE_SPAWNER_SPAWN_COUNT: number;
    static SINGLE_SPAWNER_MAX_NEARBY_ENTITIES: number;
    static SINGLE_SPAWNER_REQUIRED_PLAYER_RANGE: number;
    static SINGLE_SPAWNER_SPAWN_RANGE: number;
    static parseConfigFile(): void;
    static registerConfig(): void;
  }

}

declare module 'de.markusbordihn.easynpc' {
  import { Component } from 'net.minecraft.network.chat';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { UUID } from 'java.util';
  import { Path } from 'java.nio.file';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';

  class Constants {
    static readonly EMPTY_TEXT_COMPONENT: Component;
    static readonly HALF_OF_PI: number;
    static readonly MATH_27DEG_TO_RAD: number;
    static readonly MATH_27DEG_TO_RAD_INVERTED: number;
    static readonly PI_180DEG: number;
    static readonly FONT_COLOR_BLACK: number;
    static readonly FONT_COLOR_DARK_GREEN: number;
    static readonly FONT_COLOR_DEFAULT: number;
    static readonly FONT_COLOR_GRAY: number;
    static readonly FONT_COLOR_GREEN: number;
    static readonly FONT_COLOR_LIGHT_GRAY: number;
    static readonly FONT_COLOR_RED: number;
    static readonly FONT_COLOR_WHITE: number;
    static readonly FONT_COLOR_YELLOW: number;
    static readonly NPC_DATA_VERSION: number;
    static readonly MOD_ID: string;
    static readonly MOD_ID_CUSTOM: string;
    static readonly MINECRAFT_PREFIX: string;
    static readonly BLANK_ENTITY_TEXTURE: ResourceLocation;
    static readonly TEXTURE_CONFIGURATION: ResourceLocation;
    static readonly TEXTURE_DEMO_BACKGROUND: ResourceLocation;
    static readonly TEXTURE_DIALOG: ResourceLocation;
    static readonly TEXTURE_INVENTORY: ResourceLocation;
    static readonly TEXTURE_SPAWNER: ResourceLocation;
    static readonly TEXT_PREFIX: string;
    static readonly CONTAINER_PREFIX: string;
    static readonly TEXT_CONFIG_PREFIX: string;
    static readonly TEXT_ITEM_PREFIX: string;
    static readonly ENTITY_MINECRAFT_PREFIX: string;
    static readonly ENTITY_PREFIX: string;
    static readonly ITEM_PREFIX: string;
    static readonly LOG_ICON: string;
    static readonly LOG_NAME: string;
    static readonly LOG_REGISTER_PREFIX: string;
    static readonly MINECRAFT_RESOURCE_PREFIX: string;
    static readonly MOD_EASY_NPC_CONFIG_UI_ID: string;
    static readonly MOD_ARMOURERS_WORKSHOP_ID: string;
    static readonly MOD_ARMOURERS_WORKSHOP_NAME: string;
    static readonly MOD_COMMAND: string;
    static readonly MOD_NAME: string;
    static readonly MOD_PREFIX: string;
    static readonly MOD_PREFIX_ID: string;
    static readonly MOD_URL: string;
    static readonly TOOLTIP_PREFIX: string;
    static readonly BLANK_UUID: UUID;
    static readonly EMPTY_UUID: UUID;
    static GAME_DIR: Path;
    static CONFIG_DIR: Path;
    static WORLD_DIR: Path;
  }


  class EasyNPCClient {
    constructor(modEventBus: IEventBus, modContainer: ModContainer);
  }


  class EasyNPCMain {
    constructor(modEventBus: IEventBus, modContainer: ModContainer);
  }

}

declare module 'de.markusbordihn.easynpc.data.action' {
  import { CompoundTag, ListTag } from 'net.minecraft.nbt';
  import { UUID, Set, List } from 'java.util';
  import { Enum } from 'java.lang';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Mob, LivingEntity } from 'net.minecraft.world.entity';
  import { ServerPlayer } from 'net.minecraft.server.level';

  class ActionDataSet {
    static readonly ACTION_DATA_SET_TAG: string;
    constructor();

    constructor(compoundTag: CompoundTag);

    constructor(compoundTag: CompoundTag, listName: string);
    add(actionDataEntry: ActionDataEntry): void;
    contains(actionDataEntryId: UUID): boolean;
    contains(actionDataEntry: ActionDataEntry): boolean;
    createTag(): CompoundTag;
    equals(object: any): boolean;
    get entries(): Set<ActionDataEntry>;
    getEntry(actionDataEntryId: UUID): ActionDataEntry;
    getEntryOrDefault(actionDataEntryId: UUID): ActionDataEntry;
    getPosition(actionDataEntry: ActionDataEntry): number;
    hasActionData(): boolean;
    hashCode(): number;
    isEmpty(): boolean;
    load(compoundTag: CompoundTag, listName: string): ActionDataSet;
    load(actionDataList: ListTag): ActionDataSet;
    moveDown(actionDataEntry: ActionDataEntry): void;
    moveUp(actionDataEntry: ActionDataEntry): void;
    put(actionDataEntryId: UUID, actionDataEntry: ActionDataEntry): void;
    remove(actionDataEntry: ActionDataEntry): void;
    remove(actionDataEntryId: UUID): void;
    save(compoundTag: CompoundTag, listName: string): void;
    save(actionDataList: ListTag): void;
    size(): number;
    toString(): string;
  }


  interface ActionDataType extends Enum<ActionDataType> {}
  class ActionDataType extends Enum<ActionDataType> {
    static readonly NONE: ActionDataType;
    static readonly COMMAND: ActionDataType;
    static readonly CLOSE_DIALOG: ActionDataType;
    static readonly INTERACT_BLOCK: ActionDataType;
    static readonly OPEN_TRADING_SCREEN: ActionDataType;
    static readonly OPEN_DEFAULT_DIALOG: ActionDataType;
    static readonly OPEN_NAMED_DIALOG: ActionDataType;
    static readonly SCOREBOARD: ActionDataType;
    static get(actionType: string): ActionDataType;
    get id(): string;
    requiresArgument(): boolean;
    static valueOf(name: string): ActionDataType;
    static values(): ActionDataType[];
  }


  class ActionEventSet {
    static readonly DATA_ACTION_EVENT_SET_TAG: string;
    static readonly STREAM_CODEC: StreamCodec;
    constructor();

    constructor(compoundTag: CompoundTag);
    clear(): void;
    createTag(): CompoundTag;
    getActionEvents(actionEventType: ActionEventType): ActionDataSet;
    hasActionEvent(actionEventType: ActionEventType): boolean;
    load(compoundTag: CompoundTag): void;
    save(compoundTag: CompoundTag): CompoundTag;
    setActionEvent(actionEventType: ActionEventType, actionDataSet: ActionDataSet): void;
    toString(): string;
    updateHasDistanceAction(): void;
  }


  interface ActionEventType extends Enum<ActionEventType> {}
  class ActionEventType extends Enum<ActionEventType> {
    static readonly NONE: ActionEventType;
    static readonly ON_BUTTON_CLICK: ActionEventType;
    static readonly ON_CLOSE_DIALOG: ActionEventType;
    static readonly ON_DEATH: ActionEventType;
    static readonly ON_DISTANCE_CLOSE: ActionEventType;
    static readonly ON_DISTANCE_NEAR: ActionEventType;
    static readonly ON_DISTANCE_TOUCH: ActionEventType;
    static readonly ON_DISTANCE_VERY_CLOSE: ActionEventType;
    static readonly ON_HURT: ActionEventType;
    static readonly ON_INTERACTION: ActionEventType;
    static readonly ON_KILL: ActionEventType;
    static readonly ON_OPEN_DIALOG: ActionEventType;
    static get(actionEventType: string): ActionEventType;
    static valueOf(name: string): ActionEventType;
    static values(): ActionEventType[];
  }


  interface ActionGroup extends Enum<ActionGroup> {}
  class ActionGroup extends Enum<ActionGroup> {
    static readonly NONE: ActionGroup;
    static readonly DISTANCE_NEAR: ActionGroup;
    static readonly DISTANCE_CLOSE: ActionGroup;
    static readonly DISTANCE_VERY_CLOSE: ActionGroup;
    static readonly DISTANCE_TOUCH: ActionGroup;
    static get(actionType: string): ActionGroup;
    static valueOf(name: string): ActionGroup;
    static values(): ActionGroup[];
  }


  class ActionManager {
    static addPlayer(mob: Mob, actionGroup: ActionGroup, serverPlayer: ServerPlayer): void;
    static containsPlayer(mob: Mob, actionGroup: ActionGroup, serverPlayer: ServerPlayer): boolean;
    static removeActionGroup(mob: Mob, actionGroup: ActionGroup): void;
    static removePlayer(mob: Mob, actionGroup: ActionGroup, serverPlayer: ServerPlayer): void;
  }


  class ActionUtils {
    static readonly COMMAND_DISPLAY_TITLE: string;
    static readonly MACRO_ERROR_MESSAGE: string;
    static readonly MACRO_INFO_MESSAGE: string;
    static readonly MACRO_INITIATOR: string;
    static readonly MACRO_INITIATOR_UUID: string;
    static readonly MACRO_NPC: string;
    static readonly MACRO_NPC_UUID: string;
    static readonly MACRO_SUCCESS_MESSAGE: string;
    static readonly MACRO_WARN_MESSAGE: string;
    static parseAction(command: string, entity: LivingEntity, player: ServerPlayer): string;
  }

}

declare module 'de.markusbordihn.easynpc.data.animation' {
  import { Map } from 'java.util';
  import { Animation } from 'de.markusbordihn.easynpc.data.animation.AnimationData';
  import { Path } from 'java.nio.file';

  class AnimationData {
    get animations(): Map<string, Animation>;
    get formatVersion(): string;
    set animations(animations: Map<string, Animation>);
    set formatVersion(format_version: string);
    toString(): string;
  }


  class AnimationDataReader {
    static parseAnimationFile(filePath: string): AnimationData;
    static parseAnimationFile(filePath: Path): AnimationData;
  }

}

declare module 'de.markusbordihn.easynpc.data.animation.AnimationData' {
  import { List, Map } from 'java.util';
  import { Float } from 'java.lang';

  class Bone {
    get keyframePosition(): Map<string, number[]>;
    get keyframeRotation(): Map<string, number[]>;
    get position(): number[];
    get rotation(): number[];
    get scale(): number;
    set keyframePosition(keyframePosition: Map<string, number[]>);
    set keyframeRotation(keyframeRotation: Map<string, number[]>);
    set position(position: number[]);
    set rotation(rotation: number[]);
    set scale(scale: number);
    toString(): string;
  }


  class Animation {
    get animationLength(): number;
    get bones(): Map<string, Bone>;
    get loop(): string;
    get name(): string;
    set animationLength(animation_length: number);
    set bones(bones: Map<string, Bone>);
    set loop(loop: string);
    set name(name: string);
    toString(): string;
  }

}

declare module 'de.markusbordihn.easynpc.data.attribute' {
  import { CompoundTag } from 'net.minecraft.nbt';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { StreamCodec } from 'net.minecraft.network.codec';

  class BaseAttributes {
    static readonly ATTACK_DAMAGE_TAG: string;
    static readonly ATTACK_KNOCKBACK_TAG: string;
    static readonly BASE_ATTRIBUTES_TAG: string;
    static readonly FOLLOW_RANGE_TAG: string;
    static readonly KNOCKBACK_RESISTANCE_TAG: string;
    constructor();

    constructor(compoundTag: CompoundTag);

    constructor(livingEntity: LivingEntity);
    createTag(): CompoundTag;
    get attackDamage(): number;
    get attackKnockback(): number;
    get followRange(): number;
    get knockbackResistance(): number;
    load(compoundTag: CompoundTag): void;
    save(compoundTag: CompoundTag): CompoundTag;
    set attackDamage(attackDamage: number);
    set attackKnockback(attackKnockback: number);
    set followRange(followRange: number);
    set knockbackResistance(knockbackResistance: number);
  }


  interface BaseAttributeType extends Enum<BaseAttributeType> {}
  class BaseAttributeType extends Enum<BaseAttributeType> {
    static readonly ATTACK_DAMAGE: BaseAttributeType;
    static readonly ATTACK_KNOCKBACK: BaseAttributeType;
    static readonly FOLLOW_RANGE: BaseAttributeType;
    static readonly KNOCKBACK_RESISTANCE: BaseAttributeType;
    get attributeName(): string;
    get tagName(): string;
    static valueOf(name: string): BaseAttributeType;
    static values(): BaseAttributeType[];
  }


  interface CombatAttributeType extends Enum<CombatAttributeType> {}
  class CombatAttributeType extends Enum<CombatAttributeType> {
    static readonly IS_ATTACKABLE_BY_PLAYERS: CombatAttributeType;
    static readonly IS_ATTACKABLE_BY_MONSTERS: CombatAttributeType;
    static readonly IS_INVULNERABLE: CombatAttributeType;
    static readonly HEALTH_REGENERATION: CombatAttributeType;
    get attributeName(): string;
    get tagName(): string;
    static valueOf(name: string): CombatAttributeType;
    static values(): CombatAttributeType[];
  }


  interface CustomAttributeType extends Enum<CustomAttributeType> {}
  class CustomAttributeType extends Enum<CustomAttributeType> {
    static readonly CUSTOM: CustomAttributeType;
    get tagName(): string;
    static valueOf(name: string): CustomAttributeType;
    static values(): CustomAttributeType[];
  }


  interface EntityAttribute extends Enum<EntityAttribute> {}
  class EntityAttribute extends Enum<EntityAttribute> {
    static readonly SILENT: EntityAttribute;
    get attributeName(): string;
    static valueOf(name: string): EntityAttribute;
    static values(): EntityAttribute[];
  }


  class EntityAttributes {
    static readonly ENTITY_ATTRIBUTE_TAG: string;
    static readonly STREAM_CODEC: StreamCodec;
    constructor();

    constructor(compoundTag: CompoundTag);
    createTag(): CompoundTag;
    get combatAttributes(): CombatAttributes;
    get environmentalAttributes(): EnvironmentalAttributes;
    get interactionAttributes(): InteractionAttributes;
    get movementAttributes(): MovementAttributes;
    getAttribute(entityAttributeType: EntityAttributeType): EntityAttributesInterface;
    hasAttribute(entityAttributeType: EntityAttributeType): boolean;
    hasCombatAttributes(): boolean;
    hasEnvironmentalAttributes(): boolean;
    hasInteractionAttributes(): boolean;
    hasMovementAttributes(): boolean;
    load(compoundTag: CompoundTag): void;
    save(compoundTag: CompoundTag): CompoundTag;
    set combatAttributes(combatAttributes: CombatAttributes);
    set environmentalAttributes(environmentalAttributes: EnvironmentalAttributes);
    set interactionAttributes(interactionAttributes: InteractionAttributes);
    set movementAttributes(movementAttributes: MovementAttributes);
    setAttribute(entityAttributeType: EntityAttributeType, attribute: EntityAttributesInterface): void;
  }


  class EntityAttributesInterface {
  }


  interface EntityAttributeType extends Enum<EntityAttributeType> {}
  class EntityAttributeType extends Enum<EntityAttributeType> {
    static readonly COMBAT: EntityAttributeType;
    static readonly CUSTOM: EntityAttributeType;
    static readonly INTERACTION: EntityAttributeType;
    static readonly MOVEMENT: EntityAttributeType;
    static readonly ENVIRONMENTAL: EntityAttributeType;
    get tagName(): string;
    static valueOf(name: string): EntityAttributeType;
    static values(): EntityAttributeType[];
  }


  class EntityAttributeTypeInterface {
    get attributeName(): string;
    get tagName(): string;
  }


  interface EnvironmentalAttributeType extends Enum<EnvironmentalAttributeType> {}
  class EnvironmentalAttributeType extends Enum<EnvironmentalAttributeType> {
    static readonly CAN_BREATHE_UNDERWATER: EnvironmentalAttributeType;
    static readonly CAN_FLOAT: EnvironmentalAttributeType;
    static readonly FREEFALL: EnvironmentalAttributeType;
    static readonly NO_GRAVITY: EnvironmentalAttributeType;
    get attributeName(): string;
    get tagName(): string;
    static valueOf(name: string): EnvironmentalAttributeType;
    static values(): EnvironmentalAttributeType[];
  }


  interface InteractionAttributeType extends Enum<InteractionAttributeType> {}
  class InteractionAttributeType extends Enum<InteractionAttributeType> {
    static readonly CAN_BE_HIT_BY_PROJECTILE: InteractionAttributeType;
    static readonly CAN_BE_LEASHED: InteractionAttributeType;
    static readonly IS_PUSHABLE: InteractionAttributeType;
    static readonly PUSH_ENTITIES: InteractionAttributeType;
    get attributeName(): string;
    get tagName(): string;
    static valueOf(name: string): InteractionAttributeType;
    static values(): InteractionAttributeType[];
  }


  interface MovementAttributeType extends Enum<MovementAttributeType> {}
  class MovementAttributeType extends Enum<MovementAttributeType> {
    static readonly CAN_CLOSE_DOOR: MovementAttributeType;
    static readonly CAN_OPEN_DOOR: MovementAttributeType;
    static readonly CAN_PASS_DOOR: MovementAttributeType;
    static readonly CAN_USE_NETHER_PORTAL: MovementAttributeType;
    get attributeName(): string;
    get tagName(): string;
    static valueOf(name: string): MovementAttributeType;
    static values(): MovementAttributeType[];
  }

}

declare module 'de.markusbordihn.easynpc.data.condition' {
  import { Set, List, UUID } from 'java.util';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Enum } from 'java.lang';
  import { ServerPlayer } from 'net.minecraft.server.level';

  class ConditionDataSet {
    static readonly EMPTY: ConditionDataSet;
    static readonly CONDITION_DATA_SET_TAG: string;
    constructor();

    constructor(conditionDataEntries: Set<ConditionDataEntry>);

    constructor(compoundTag: CompoundTag);
    add(conditionDataEntry: ConditionDataEntry): void;
    clear(): void;
    equals(object: any): boolean;
    get conditions(): Set<ConditionDataEntry>;
    get conditionsList(): ConditionDataEntry[];
    getCondition(id: UUID): ConditionDataEntry;
    hasCondition(id: UUID): boolean;
    hasConditionData(): boolean;
    hashCode(): number;
    isEmpty(): boolean;
    load(compoundTag: CompoundTag): void;
    put(conditionDataEntryId: UUID, conditionDataEntry: ConditionDataEntry): void;
    remove(id: UUID): boolean;
    save(compoundTag: CompoundTag): CompoundTag;
    save(compoundTag: CompoundTag, tag: string): CompoundTag;
    size(): number;
    toString(): string;
    update(conditionDataEntry: ConditionDataEntry): void;
  }


  interface ConditionOperationType extends Enum<ConditionOperationType> {}
  class ConditionOperationType extends Enum<ConditionOperationType> {
    static readonly NONE: ConditionOperationType;
    static readonly EQUALS: ConditionOperationType;
    static readonly NOT_EQUALS: ConditionOperationType;
    static readonly GREATER_THAN: ConditionOperationType;
    static readonly GREATER_THAN_OR_EQUALS: ConditionOperationType;
    static readonly LESS_THAN: ConditionOperationType;
    static readonly LESS_THAN_OR_EQUALS: ConditionOperationType;
    evaluate(value1: number, value2: number): boolean;
    static get(operationType: string): ConditionOperationType;
    get symbol(): string;
    static valueOf(name: string): ConditionOperationType;
    static values(): ConditionOperationType[];
  }


  interface ConditionType extends Enum<ConditionType> {}
  class ConditionType extends Enum<ConditionType> {
    static readonly NONE: ConditionType;
    static readonly SCOREBOARD: ConditionType;
    static readonly EXECUTION_LIMIT: ConditionType;
    static get(conditionType: string): ConditionType;
    requiresName(): boolean;
    requiresOperation(): boolean;
    requiresValue(): boolean;
    static valueOf(name: string): ConditionType;
    static values(): ConditionType[];
  }


  class ConditionUtils {
    static evaluateCondition(conditionDataEntry: ConditionDataEntry, player: ServerPlayer): boolean;
    static evaluateCondition(conditionDataEntry: ConditionDataEntry, player: ServerPlayer, actionUUID: UUID): boolean;
    static evaluateConditions(conditions: Set<ConditionDataEntry>, player: ServerPlayer): boolean;
    static evaluateConditions(conditions: Set<ConditionDataEntry>, player: ServerPlayer, actionUUID: UUID): boolean;
    static evaluateExecutionLimit(conditionDataEntry: ConditionDataEntry, player: ServerPlayer, actionUUID: UUID): boolean;
    static evaluateScoreboardCondition(conditionDataEntry: ConditionDataEntry, serverPlayer: ServerPlayer): boolean;
    static recordActionExecution(conditionDataEntry: ConditionDataEntry, player: ServerPlayer, actionUUID: UUID): void;
  }

}

declare module 'de.markusbordihn.easynpc.data.configuration' {
  import { Enum } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List } from 'java.util';
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';

  interface ConfigurationType extends Enum<ConfigurationType> {}
  class ConfigurationType extends Enum<ConfigurationType> {
    static readonly NONE: ConfigurationType;
    static readonly ABILITIES_ATTRIBUTE: ConfigurationType;
    static readonly ADVANCED_DIALOG: ConfigurationType;
    static readonly ADVANCED_POSE: ConfigurationType;
    static readonly ADVANCED_TRADING: ConfigurationType;
    static readonly ATTACK_OBJECTIVE: ConfigurationType;
    static readonly BASE_ATTRIBUTE: ConfigurationType;
    static readonly BASIC_ACTION: ConfigurationType;
    static readonly BASIC_DIALOG: ConfigurationType;
    static readonly BASIC_OBJECTIVE: ConfigurationType;
    static readonly BASIC_POSE: ConfigurationType;
    static readonly BASIC_TRADING: ConfigurationType;
    static readonly COMBAT_ATTRIBUTE: ConfigurationType;
    static readonly CUSTOM_MODEL: ConfigurationType;
    static readonly CUSTOM_POSE: ConfigurationType;
    static readonly CUSTOM_PRESET_EXPORT: ConfigurationType;
    static readonly CUSTOM_PRESET_IMPORT: ConfigurationType;
    static readonly CUSTOM_SKIN: ConfigurationType;
    static readonly CUSTOM_TRADING: ConfigurationType;
    static readonly DEFAULT_MODEL: ConfigurationType;
    static readonly DEFAULT_POSE: ConfigurationType;
    static readonly DEFAULT_POSITION: ConfigurationType;
    static readonly DEFAULT_PRESET_IMPORT: ConfigurationType;
    static readonly DEFAULT_ROTATION: ConfigurationType;
    static readonly DEFAULT_SKIN: ConfigurationType;
    static readonly DIALOG: ConfigurationType;
    static readonly DIALOG_ACTION: ConfigurationType;
    static readonly DISPLAY_ATTRIBUTE: ConfigurationType;
    static readonly DISTANCE_ACTION: ConfigurationType;
    static readonly EQUIPMENT: ConfigurationType;
    static readonly FOLLOW_OBJECTIVE: ConfigurationType;
    static readonly LOCAL_PRESET_IMPORT: ConfigurationType;
    static readonly LOOK_OBJECTIVE: ConfigurationType;
    static readonly MAIN: ConfigurationType;
    static readonly NONE_DIALOG: ConfigurationType;
    static readonly NONE_SKIN: ConfigurationType;
    static readonly NONE_TRADING: ConfigurationType;
    static readonly PLAYER_SKIN: ConfigurationType;
    static readonly POSE: ConfigurationType;
    static readonly SCALING: ConfigurationType;
    static readonly SKIN: ConfigurationType;
    static readonly TRADING: ConfigurationType;
    static readonly URL_SKIN: ConfigurationType;
    static readonly WORLD_PRESET_EXPORT: ConfigurationType;
    static readonly WORLD_PRESET_IMPORT: ConfigurationType;
    static readonly YES_NO_DIALOG: ConfigurationType;
    static get(configurationType: string): ConfigurationType;
    get id(): ResourceLocation;
    get name(): string;
    isAlias(): boolean;
    static valueOf(name: string): ConfigurationType;
    static values(): ConfigurationType[];
  }


  class ConfigurationTypeHelper {
    static resolveConfigurationTypeAlias(configurationType: ConfigurationType, easyNPC: EasyNPC<any>): ConfigurationType;
  }

}

declare module 'de.markusbordihn.easynpc.data.dialog' {
  import { Enum } from 'java.lang';
  import { List, Set, UUID, Map } from 'java.util';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Component } from 'net.minecraft.network.chat';
  import { ConditionDataEntry } from 'de.markusbordihn.easynpc.data.condition';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ScoreboardData } from 'de.markusbordihn.easynpc.data.scoreboard';
  import { Font } from 'net.minecraft.client.gui';

  interface DialogButtonType extends Enum<DialogButtonType> {}
  class DialogButtonType extends Enum<DialogButtonType> {
    static readonly ACTION: DialogButtonType;
    static readonly CLOSE: DialogButtonType;
    static readonly CUSTOM: DialogButtonType;
    static readonly DEFAULT: DialogButtonType;
    static get(dialogButtonType: string): DialogButtonType;
    static valueOf(name: string): DialogButtonType;
    static values(): DialogButtonType[];
  }


  class DialogDataEntry {
    static readonly DATA_BUTTONS_TAG: string;
    static readonly DATA_CONDITIONS_TAG: string;
    static readonly DATA_DIALOG_NAME: string;
    static readonly DATA_LABEL_TAG: string;
    static readonly DATA_PRIORITY_TAG: string;
    static readonly DATA_TEXTS_TAG: string;
    static readonly DATA_TEXT_TAG: string;
    static readonly MAX_DIALOG_LABEL_LENGTH: number;
    constructor(compoundTag: CompoundTag);

    constructor(name: string);

    constructor(name: string, text: string);

    constructor(label: string, name: string, text: string);

    constructor(label: string, name: string, text: string, dialogButtons: Set<DialogButtonEntry>);
    createTag(): CompoundTag;
    get conditions(): Set<ConditionDataEntry>;
    get dialogButtons(): Set<DialogButtonEntry>;
    get dialogText(): Component;
    get dialogTexts(): Set<DialogTextData>;
    get id(): UUID;
    get label(): string;
    get name(): string;
    get numberOfDialogButtons(): number;
    get priority(): number;
    get text(): string;
    getDialogButton(dialogButtonId: UUID): DialogButtonEntry;
    getDialogButton(label: string): DialogButtonEntry;
    getDialogText(dialogMetaData: DialogMetaData): string;
    getLabel(maxLength: number): string;
    getName(maxLength: number): string;
    getText(maxLength: number): string;
    hasConditions(): boolean;
    hasDialogButton(label: string): boolean;
    hasDialogButton(dialogButtonId: UUID): boolean;
    load(compoundTag: CompoundTag): void;
    removeDialogButton(dialogButtonId: UUID): boolean;
    save(compoundTag: CompoundTag): CompoundTag;
    set conditions(conditions: Set<ConditionDataEntry>);
    set dialogButtons(buttons: Set<DialogButtonEntry>);
    set dialogTexts(dialogTexts: Set<DialogTextData>);
    set label(label: string);
    set name(name: string);
    set priority(priority: number);
    setDialogButton(dialogButtonEntry: DialogButtonEntry): void;
    setDialogButton(dialogButtonId: UUID, dialogButtonEntry: DialogButtonEntry): void;
    toString(): string;
  }


  class DialogDataManager {
    static addDialogDataSet(uuid: UUID, dialogDataSet: DialogDataSet): void;
    static clearDialogDataSets(): void;
    static getDialogDataSet(uuid: UUID): DialogDataSet;
    static hasDialogDataSet(uuid: UUID): boolean;
    static removeDialogDataSet(uuid: UUID): void;
  }


  class DialogDataSet {
    static readonly DATA_DIALOG_DATA_SET_TAG: string;
    static readonly DATA_TYPE_TAG: string;
    static readonly STREAM_CODEC: StreamCodec;
    constructor();

    constructor(dialogType: DialogType);

    constructor(compoundTag: CompoundTag);
    addDialog(dialogData: DialogDataEntry): boolean;
    createTag(): CompoundTag;
    get dialogByLabelMap(): Map<string, DialogDataEntry>;
    get dialogsByLabel(): DialogDataEntry[];
    get type(): DialogType;
    getDialog(label: string): DialogDataEntry;
    getDialog(id: UUID): DialogDataEntry;
    getDialogButton(dialogId: UUID, dialogButtonId: UUID): DialogButtonEntry;
    getDialogId(dialogLabel: string): UUID;
    getNextAvailableDialog(serverPlayer: ServerPlayer): DialogDataEntry;
    hasDialog(): boolean;
    hasDialog(label: string): boolean;
    hasDialog(id: UUID): boolean;
    hasDialogButton(dialogId: UUID, dialogButtonId: UUID): boolean;
    load(compoundTag: CompoundTag): void;
    recordDialogExecution(dialog: DialogDataEntry, serverPlayer: ServerPlayer): void;
    removeDialog(dialogId: UUID): boolean;
    removeDialogButton(dialogId: UUID, dialogButtonId: UUID): boolean;
    save(compoundTag: CompoundTag): CompoundTag;
    setDialog(dialogId: UUID, dialogData: DialogDataEntry): void;
    toString(): string;
  }


  class DialogPriority {
    static readonly MANUAL_ONLY: number;
    static readonly FALLBACK: number;
    static readonly LOW: number;
    static readonly NORMAL: number;
    static readonly HIGH: number;
    static readonly CRITICAL: number;
    static calculateDefaultPriority(label: string): number;
    static getDisplayName(priority: number): string;
    static getNameForPriority(priority: number): string;
  }


  interface DialogScreenLayout extends Enum<DialogScreenLayout> {}
  class DialogScreenLayout extends Enum<DialogScreenLayout> {
    static readonly UNKNOWN: DialogScreenLayout;
    static readonly COMPACT_TEXT_ONLY: DialogScreenLayout;
    static readonly COMPACT_TEXT_WITH_ONE_BUTTON: DialogScreenLayout;
    static readonly COMPACT_TEXT_WITH_TWO_BUTTONS: DialogScreenLayout;
    static readonly COMPACT_TEXT_WITH_TWO_LARGE_BUTTONS: DialogScreenLayout;
    static readonly COMPACT_TEXT_WITH_THREE_BUTTONS: DialogScreenLayout;
    static readonly COMPACT_TEXT_WITH_FOUR_BUTTONS: DialogScreenLayout;
    static readonly COMPACT_TEXT_WITH_FIVE_BUTTONS: DialogScreenLayout;
    static readonly COMPACT_TEXT_WITH_SIX_BUTTONS: DialogScreenLayout;
    static readonly TEXT_ONLY: DialogScreenLayout;
    static readonly TEXT_WITH_ONE_BUTTON: DialogScreenLayout;
    static readonly TEXT_WITH_TWO_BUTTONS: DialogScreenLayout;
    static readonly TEXT_WITH_THREE_BUTTONS: DialogScreenLayout;
    static readonly TEXT_WITH_FOUR_BUTTONS: DialogScreenLayout;
    static readonly TEXT_WITH_FIVE_BUTTONS: DialogScreenLayout;
    static readonly TEXT_WITH_SIX_BUTTONS: DialogScreenLayout;
    static valueOf(name: string): DialogScreenLayout;
    static values(): DialogScreenLayout[];
  }


  interface DialogType extends Enum<DialogType> {}
  class DialogType extends Enum<DialogType> {
    static readonly STANDARD: DialogType;
    static readonly BASIC: DialogType;
    static readonly YES_NO: DialogType;
    static readonly CUSTOM: DialogType;
    static readonly NONE: DialogType;
    static get(dialogType: string): DialogType;
    static valueOf(name: string): DialogType;
    static values(): DialogType[];
  }


  class DialogUtils {
    static generateButtonLabel(name: string): string;
    static generateDialogLabel(name: string): string;
    static getBasicDialog(dialog: string): DialogDataSet;
    static getDialogScreenLayout(dialogData: DialogDataEntry, font: Font): DialogScreenLayout;
    static getNumbersOfDialogLines(component: Component, font: Font): number;
    static getNumbersOfDialogLines(text: string, font: Font): number;
    static getNumbersOfDialogLines(text: string, maxLineLength: number, font: Font): number;
    static getNumbersOfDialogLines(component: Component, maxLineLength: number, font: Font): number;
    static getYesNoDialog(dialogText: string, yesButtonText: string, noButtonText: string, yesDialogText: string, noDialogText: string): DialogDataSet;
    static hasDialogMacros(component: Component): boolean;
    static hasDialogMacros(text: string): boolean;
    static parseDialogText(component: Component, dialogMetaData: DialogMetaData): string;
    static parseDialogText(text: string, entity: LivingEntity, player: Player): string;
    static parseDialogText(text: string, entity: LivingEntity, player: Player, scoreboardData: ScoreboardData): string;
  }

}

declare module 'de.markusbordihn.easynpc.data.display' {
  import { Enum } from 'java.lang';
  import { ValueType } from 'de.markusbordihn.easynpc.data.type';
  import { List } from 'java.util';

  interface DisplayAttributeType extends Enum<DisplayAttributeType> {}
  class DisplayAttributeType extends Enum<DisplayAttributeType> {
    static readonly NONE: DisplayAttributeType;
    static readonly VISIBLE: DisplayAttributeType;
    static readonly VISIBLE_AT_DAY: DisplayAttributeType;
    static readonly VISIBLE_AT_NIGHT: DisplayAttributeType;
    static readonly VISIBLE_IN_CREATIVE: DisplayAttributeType;
    static readonly VISIBLE_IN_SPECTATOR: DisplayAttributeType;
    static readonly VISIBLE_IN_STANDARD: DisplayAttributeType;
    static readonly VISIBLE_TO_OWNER: DisplayAttributeType;
    static readonly VISIBLE_TO_TEAM: DisplayAttributeType;
    static readonly LIGHT_LEVEL: DisplayAttributeType;
    static readonly NAME_VISIBILITY: DisplayAttributeType;
    static get(displayAttributeType: string): DisplayAttributeType;
    get attributeName(): string;
    get valueType(): ValueType;
    isValidValue(value: string): boolean;
    parseValue(value: string): any;
    static valueOf(name: string): DisplayAttributeType;
    static values(): DisplayAttributeType[];
  }


  interface NameVisibilityType extends Enum<NameVisibilityType> {}
  class NameVisibilityType extends Enum<NameVisibilityType> {
    static readonly NEVER: NameVisibilityType;
    static readonly ALWAYS: NameVisibilityType;
    static readonly NEAR: NameVisibilityType;
    static readonly MID: NameVisibilityType;
    static readonly MOUSE_OVER: NameVisibilityType;
    static fromId(id: number): NameVisibilityType;
    get id(): number;
    next(): NameVisibilityType;
    static valueOf(name: string): NameVisibilityType;
    static values(): NameVisibilityType[];
  }

}

declare module 'de.markusbordihn.easynpc.data.execution' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ExecutionInterval extends Enum<ExecutionInterval> {}
  class ExecutionInterval extends Enum<ExecutionInterval> {
    static readonly PER_MINUTE: ExecutionInterval;
    static readonly PER_HOUR: ExecutionInterval;
    static readonly PER_DAY: ExecutionInterval;
    static readonly PER_WEEK: ExecutionInterval;
    static readonly PER_MONTH: ExecutionInterval;
    static readonly LIFETIME: ExecutionInterval;
    static get(name: string): ExecutionInterval;
    get milliseconds(): number;
    hasIntervalPassed(lastExecution: number): boolean;
    static valueOf(name: string): ExecutionInterval;
    static values(): ExecutionInterval[];
  }

}

declare module 'de.markusbordihn.easynpc.data.faction' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface FactionRelationType extends Enum<FactionRelationType> {}
  class FactionRelationType extends Enum<FactionRelationType> {
    static readonly NEUTRAL: FactionRelationType;
    static readonly FRIENDLY: FactionRelationType;
    static readonly HOSTILE: FactionRelationType;
    static readonly ALLY: FactionRelationType;
    static readonly ENEMY: FactionRelationType;
    static valueOf(name: string): FactionRelationType;
    static values(): FactionRelationType[];
  }


  interface FactionType extends Enum<FactionType> {}
  class FactionType extends Enum<FactionType> {
    static readonly ANIMAL: FactionType;
    static readonly ILLAGER: FactionType;
    static readonly UNDEAD: FactionType;
    static readonly VIILLAGER: FactionType;
    static valueOf(name: string): FactionType;
    static values(): FactionType[];
  }

}

declare module 'de.markusbordihn.easynpc.data.model' {
  import { Enum } from 'java.lang';
  import { List, Set } from 'java.util';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  interface ModelAnimationBehavior extends Enum<ModelAnimationBehavior> {}
  class ModelAnimationBehavior extends Enum<ModelAnimationBehavior> {
    static readonly SMART: ModelAnimationBehavior;
    static readonly DEFAULT: ModelAnimationBehavior;
    static readonly NONE: ModelAnimationBehavior;
    static get(modelAnimationBehavior: string): ModelAnimationBehavior;
    static valueOf(name: string): ModelAnimationBehavior;
    static values(): ModelAnimationBehavior[];
  }


  interface ModelArmPose extends Enum<ModelArmPose> {}
  class ModelArmPose extends Enum<ModelArmPose> {
    static readonly ATTACKING: ModelArmPose;
    static readonly ATTACKING_WITH_MELEE_WEAPON: ModelArmPose;
    static readonly BOW_AND_ARROW: ModelArmPose;
    static readonly CELEBRATING: ModelArmPose;
    static readonly CROSSBOW_CHARGE: ModelArmPose;
    static readonly CROSSBOW_HOLD: ModelArmPose;
    static readonly CROSSED: ModelArmPose;
    static readonly CUSTOM: ModelArmPose;
    static readonly DANCING: ModelArmPose;
    static readonly DEFAULT: ModelArmPose;
    static readonly GUN_HOLD: ModelArmPose;
    static readonly NEUTRAL: ModelArmPose;
    static readonly SPELLCASTING: ModelArmPose;
    static readonly SPYGLASS: ModelArmPose;
    static get(armPose: string): ModelArmPose;
    static valueOf(name: string): ModelArmPose;
    static values(): ModelArmPose[];
  }


  interface ModelPartType extends Enum<ModelPartType> {}
  class ModelPartType extends Enum<ModelPartType> {
    static readonly ROOT: ModelPartType;
    static readonly HEAD: ModelPartType;
    static readonly HAT: ModelPartType;
    static readonly HELMET: ModelPartType;
    static readonly BODY: ModelPartType;
    static readonly CHESTPLATE: ModelPartType;
    static readonly BODY_JACKET: ModelPartType;
    static readonly RIGHT_ARM: ModelPartType;
    static readonly LEFT_ARM: ModelPartType;
    static readonly ARMS: ModelPartType;
    static readonly RIGHT_SLEEVE: ModelPartType;
    static readonly LEFT_SLEEVE: ModelPartType;
    static readonly RIGHT_WING: ModelPartType;
    static readonly LEFT_WING: ModelPartType;
    static readonly RIGHT_LEG: ModelPartType;
    static readonly LEFT_LEG: ModelPartType;
    static readonly LEGGINGS: ModelPartType;
    static readonly BOOTS: ModelPartType;
    static readonly RIGHT_PANTS: ModelPartType;
    static readonly LEFT_PANTS: ModelPartType;
    static readonly RIGHT_FRONT_LEG: ModelPartType;
    static readonly LEFT_FRONT_LEG: ModelPartType;
    static readonly RIGHT_HIND_LEG: ModelPartType;
    static readonly LEFT_HIND_LEG: ModelPartType;
    static readonly TAIL: ModelPartType;
    static readonly TAIL1: ModelPartType;
    static readonly TAIL2: ModelPartType;
    static readonly UNKNOWN: ModelPartType;
    static get(modelPart: string): ModelPartType;
    get tagName(): string;
    static valueOf(name: string): ModelPartType;
    static values(): ModelPartType[];
  }


  interface ModelPose extends Enum<ModelPose> {}
  class ModelPose extends Enum<ModelPose> {
    static readonly DEFAULT: ModelPose;
    static readonly CUSTOM: ModelPose;
    decode(registryFriendlyByteBuf: RegistryFriendlyByteBuf): ModelPose;
    encode(registryFriendlyByteBuf: RegistryFriendlyByteBuf, modelPose: ModelPose): void;
    static get(modelPose: string): ModelPose;
    static valueOf(name: string): ModelPose;
    static values(): ModelPose[];
  }


  interface ModelScaleAxis extends Enum<ModelScaleAxis> {}
  class ModelScaleAxis extends Enum<ModelScaleAxis> {
    static readonly X: ModelScaleAxis;
    static readonly Y: ModelScaleAxis;
    static readonly Z: ModelScaleAxis;
    static valueOf(name: string): ModelScaleAxis;
    static values(): ModelScaleAxis[];
  }


  interface ModelType extends Enum<ModelType> {}
  class ModelType extends Enum<ModelType> {
    static readonly ALLAY: ModelType;
    static readonly AVIAN: ModelType;
    static readonly CANINE: ModelType;
    static readonly CREEPER: ModelType;
    static readonly EQUINE: ModelType;
    static readonly FELINE: ModelType;
    static readonly GOLEM: ModelType;
    static readonly HUMANOID: ModelType;
    static readonly ILLAGER: ModelType;
    static readonly PIXIE: ModelType;
    static readonly QUADRUPED: ModelType;
    static readonly SPIDER: ModelType;
    static readonly SLIME: ModelType;
    static readonly GHAST: ModelType;
    static readonly VILLAGER: ModelType;
    static readonly ZOMBIE: ModelType;
    get modelParts(): Set<ModelPartType>;
    get primaryModelParts(): Set<ModelPartType>;
    requiresHatSync(): boolean;
    static valueOf(name: string): ModelType;
    static values(): ModelType[];
  }

}

declare module 'de.markusbordihn.easynpc.data.npc' {
  import { Enum } from 'java.lang';
  import { List, Map } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface DefaultNPCType extends Enum<DefaultNPCType> {}
  class DefaultNPCType extends Enum<DefaultNPCType> {
    static readonly GENERIC: DefaultNPCType;
    static readonly ALLAY: DefaultNPCType;
    static readonly BOGGED: DefaultNPCType;
    static readonly CAT: DefaultNPCType;
    static readonly CAVE_SPIDER: DefaultNPCType;
    static readonly CHICKEN: DefaultNPCType;
    static readonly CREEPER: DefaultNPCType;
    static readonly DROWNED: DefaultNPCType;
    static readonly ENDERMAN: DefaultNPCType;
    static readonly EVOKER: DefaultNPCType;
    static readonly FOX: DefaultNPCType;
    static readonly GHAST: DefaultNPCType;
    static readonly HORSE: DefaultNPCType;
    static readonly HUMANOID: DefaultNPCType;
    static readonly HUMANOID_SLIM: DefaultNPCType;
    static readonly HUSK: DefaultNPCType;
    static readonly ILLUSIONER: DefaultNPCType;
    static readonly IRON_GOLEM: DefaultNPCType;
    static readonly PIG: DefaultNPCType;
    static readonly PIGLIN: DefaultNPCType;
    static readonly PIGLIN_BRUTE: DefaultNPCType;
    static readonly PILLAGER: DefaultNPCType;
    static readonly SKELETON: DefaultNPCType;
    static readonly SKELETON_HORSE: DefaultNPCType;
    static readonly SLIME: DefaultNPCType;
    static readonly SPIDER: DefaultNPCType;
    static readonly STRAY: DefaultNPCType;
    static readonly VEX: DefaultNPCType;
    static readonly VILLAGER: DefaultNPCType;
    static readonly VINDICATOR: DefaultNPCType;
    static readonly WITCH: DefaultNPCType;
    static readonly WITHER_SKELETON: DefaultNPCType;
    static readonly WOLF: DefaultNPCType;
    static readonly ZOMBIE: DefaultNPCType;
    static readonly ZOMBIE_HORSE: DefaultNPCType;
    static readonly ZOMBIE_VILLAGER: DefaultNPCType;
    static readonly ZOMBIFIED_PIGLIN: DefaultNPCType;
    static fromRegistryId(registryId: string): DefaultNPCType;
    get registryId(): string;
    static valueOf(name: string): DefaultNPCType;
    static values(): DefaultNPCType[];
  }


  class NPCType {
    get registryId(): string;
    getResourceLocation(namespace: string): ResourceLocation;
    isDefault(): boolean;
    isRaw(): boolean;
  }


  interface RawNPCType extends Enum<RawNPCType> {}
  class RawNPCType extends Enum<RawNPCType> {
    static readonly GENERIC: RawNPCType;
    static readonly ALLAY: RawNPCType;
    static readonly BOGGED: RawNPCType;
    static readonly CAT: RawNPCType;
    static readonly CREEPER: RawNPCType;
    static readonly CHICKEN: RawNPCType;
    static readonly DROWNED: RawNPCType;
    static readonly ENDERMAN: RawNPCType;
    static readonly EVOKER: RawNPCType;
    static readonly FOX: RawNPCType;
    static readonly GHAST: RawNPCType;
    static readonly HORSE: RawNPCType;
    static readonly IRON_GOLEM: RawNPCType;
    static readonly ILLUSIONER: RawNPCType;
    static readonly PATHFINDER_MOB: RawNPCType;
    static readonly HUMANOID: RawNPCType;
    static readonly HUMANOID_SLIM: RawNPCType;
    static readonly PILLAGER: RawNPCType;
    static readonly PIG: RawNPCType;
    static readonly PIGLIN: RawNPCType;
    static readonly PIGLIN_BRUTE: RawNPCType;
    static readonly ZOMBIFIED_PIGLIN: RawNPCType;
    static readonly SKELETON: RawNPCType;
    static readonly STRAY: RawNPCType;
    static readonly WITHER_SKELETON: RawNPCType;
    static readonly SPIDER: RawNPCType;
    static readonly SLIME: RawNPCType;
    static readonly VEX: RawNPCType;
    static readonly VILLAGER: RawNPCType;
    static readonly VINDICATOR: RawNPCType;
    static readonly WOLF: RawNPCType;
    static readonly WITCH: RawNPCType;
    static readonly ZOMBIE: RawNPCType;
    static readonly HUSK: RawNPCType;
    static readonly ZOMBIE_VILLAGER: RawNPCType;
    static fromRegistryId(registryId: string): RawNPCType;
    get registryId(): string;
    static valueOf(name: string): RawNPCType;
    static values(): RawNPCType[];
  }


  class UserDefinedConfigurationManager {
    static addConfiguration(configuration: UserDefinedConfiguration): boolean;
    static get userDefinedConfigurations(): Map<string, UserDefinedConfiguration>;
    static getConfiguration(configurationId: string): UserDefinedConfiguration;
    static initialize(): void;
    static removeConfiguration(configurationId: string): boolean;
  }

}

declare module 'de.markusbordihn.easynpc.data.objective' {
  import { CompoundTag } from 'net.minecraft.nbt';
  import { BooleanSupplier } from 'java.util.function';
  import { ServerPlayer, ServerLevel } from 'net.minecraft.server.level';
  import { UUID, Set, List, Optional } from 'java.util';
  import { LivingEntity, Entity } from 'net.minecraft.world.entity';
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { Goal } from 'net.minecraft.world.entity.ai.goal';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Enum } from 'java.lang';

  class ObjectiveDataEntry {
    static readonly DATA_ATTACK_INTERVAL_TAG: string;
    static readonly DATA_ATTACK_RADIUS_TAG: string;
    static readonly DATA_CAN_DEAL_WITH_DOORS_TAG: string;
    static readonly DATA_DISTANCE_TO_POI_TAG: string;
    static readonly DATA_ID_TAG: string;
    static readonly DATA_INTERVAL_TAG: string;
    static readonly DATA_LOOK_DISTANCE_TAG: string;
    static readonly DATA_MUST_REACH_TARGET_TAG: string;
    static readonly DATA_MUST_SEE_TARGET_TAG: string;
    static readonly DATA_ONLY_AT_NIGHT_TAG: string;
    static readonly DATA_PRIORITY_TAG: string;
    static readonly DATA_PROBABILITY_TAG: string;
    static readonly DATA_SPEED_MODIFIER_TAG: string;
    static readonly DATA_START_DISTANCE_TAG: string;
    static readonly DATA_STOP_DISTANCE_TAG: string;
    static readonly DATA_TARGET_ENTITY_UUID_TAG: string;
    static readonly DATA_TARGET_OWNER_UUID_TAG: string;
    static readonly DATA_TARGET_PLAYER_NAME_TAG: string;
    static readonly DATA_TYPE_TAG: string;
    static readonly DEFAULT_SPEED_MODIFIER: number;
    static readonly DEFAULT_ATTACK_RADIUS: number;
    static readonly DEFAULT_LOOK_DISTANCE: number;
    static readonly DEFAULT_PROBABILITY: number;
    static readonly DEFAULT_START_DISTANCE: number;
    static readonly DEFAULT_STOP_DISTANCE: number;
    static readonly DEFAULT_ATTACK_INTERVAL: number;
    static readonly DEFAULT_DISTANCE_TO_POI: number;
    static readonly DEFAULT_INTERVAL: number;
    static readonly DEFAULT_PRIORITY: number;
    constructor();

    constructor(objectiveType: ObjectiveType);

    constructor(objectiveType: ObjectiveType, priority: number);

    constructor(compoundTag: CompoundTag);
    createTag(): CompoundTag;
    get attackInterval(): number;
    get attackRadius(): number;
    get canDealWithDoors(): BooleanSupplier;
    get distanceToPoi(): number;
    get id(): string;
    get interval(): number;
    get lookDistance(): number;
    get onlyAtNight(): boolean;
    get priority(): number;
    get probability(): number;
    get speedModifier(): number;
    get startDistance(): number;
    get stopDistance(): number;
    get targetEntityUUID(): UUID;
    get targetOwnerUUID(): UUID;
    get targetPlayer(): ServerPlayer;
    get targetPlayerName(): string;
    get type(): ObjectiveType;
    getGoal(easyNPC: EasyNPC<any>): Goal;
    getTarget(easyNPC: EasyNPC<any>): Goal;
    getTargetEntity(easyNPC: EasyNPC<any>): LivingEntity;
    getTargetEntity(serverLevel: ServerLevel): LivingEntity;
    getTargetOwner(easyNPC: EasyNPC<any>): Entity;
    getTargetOwner(serverLevel: ServerLevel): Entity;
    hasEntityTarget(): boolean;
    hasOwnerTarget(): boolean;
    hasPlayerTarget(): boolean;
    hasTravelObjective(): boolean;
    hasValidTarget(easyNPC: EasyNPC<any>): boolean;
    hasValidTarget(serverLevel: ServerLevel): boolean;
    isMustReachTarget(): boolean;
    isMustSeeTarget(): boolean;
    isRegistered(): boolean;
    load(compoundTag: CompoundTag): void;
    save(compoundTag: CompoundTag): CompoundTag;
    set priority(priority: number);
    set speedModifier(speedModifier: number);
    set targetEntityUUID(targetEntityUUID: UUID);
    set targetOwnerUUID(targetOwnerUUID: UUID);
    set targetPlayerName(targetPlayerName: string);
    setRegistered(isRegistered: boolean): void;
    toString(): string;
  }


  class ObjectiveDataSet {
    static readonly DATA_OBJECTIVE_DATA_SET_TAG: string;
    static readonly STREAM_CODEC: StreamCodec;
    constructor();

    constructor(compoundTag: CompoundTag);
    addObjective(objectiveDataEntry: ObjectiveDataEntry): void;
    clear(): void;
    createTag(): CompoundTag;
    get objectives(): Set<ObjectiveDataEntry>;
    getObjective(objectiveType: ObjectiveType): ObjectiveDataEntry;
    getObjective(objectiveId: string): ObjectiveDataEntry;
    getOrCreateObjective(objectiveType: ObjectiveType): ObjectiveDataEntry;
    getOrCreateObjective(objectiveType: ObjectiveType, priority: number): ObjectiveDataEntry;
    hasEntityTarget(): boolean;
    hasObjective(objectiveId: string): boolean;
    hasObjective(objectiveType: ObjectiveType): boolean;
    hasObjectives(): boolean;
    hasObjectives(objectiveTypes: Set<ObjectiveType>): boolean;
    hasOwnerTarget(): boolean;
    hasPlayerTarget(): boolean;
    hasTravelTarget(): boolean;
    hasValidTarget(easyNPC: EasyNPC<any>): boolean;
    isTargetedEntity(entityUUID: UUID): boolean;
    isTargetedPlayer(playerName: string): boolean;
    load(compoundTag: CompoundTag): void;
    removeObjective(objectiveType: ObjectiveType): boolean;
    removeObjective(objectiveDataEntry: ObjectiveDataEntry): boolean;
    removeObjective(objectiveId: string): boolean;
    save(compoundTag: CompoundTag): CompoundTag;
    toString(): string;
  }


  class ObjectiveGroup {
    static readonly ATTACK_TYPE: Set;
    static readonly FOLLOW: Set;
    static readonly ATTACK_TARGET: Set;
  }


  interface ObjectiveTarget extends Enum<ObjectiveTarget> {}
  class ObjectiveTarget extends Enum<ObjectiveTarget> {
    static readonly CUSTOM: ObjectiveTarget;
    static readonly ANIMAL: ObjectiveTarget;
    static readonly IRON_GOLEM: ObjectiveTarget;
    static readonly MOB: ObjectiveTarget;
    static readonly PILLAGER: ObjectiveTarget;
    static readonly PLAYER: ObjectiveTarget;
    static readonly RAIDER: ObjectiveTarget;
    static readonly VILLAGER: ObjectiveTarget;
    static readonly NONE: ObjectiveTarget;
    static get(objectiveTarget: string): ObjectiveTarget;
    static valueOf(name: string): ObjectiveTarget;
    static values(): ObjectiveTarget[];
  }


  interface ObjectiveType extends Enum<ObjectiveType> {}
  class ObjectiveType extends Enum<ObjectiveType> {
    static readonly ATTACK_ANIMAL: ObjectiveType;
    static readonly ATTACK_MOB_WITHOUT_CREEPER: ObjectiveType;
    static readonly ATTACK_MOB: ObjectiveType;
    static readonly ATTACK_MONSTER: ObjectiveType;
    static readonly ATTACK_PLAYER_WITHOUT_OWNER: ObjectiveType;
    static readonly ATTACK_PLAYER: ObjectiveType;
    static readonly ATTACK_VILLAGER: ObjectiveType;
    static readonly AVOID_SUN: ObjectiveType;
    static readonly BOW_ATTACK: ObjectiveType;
    static readonly CLOSE_DOOR: ObjectiveType;
    static readonly CROSSBOW_ATTACK: ObjectiveType;
    static readonly FLEE_SUN: ObjectiveType;
    static readonly FLOAT: ObjectiveType;
    static readonly FOLLOW_ENTITY_BY_UUID: ObjectiveType;
    static readonly FOLLOW_ITEM: ObjectiveType;
    static readonly FOLLOW_OWNER: ObjectiveType;
    static readonly FOLLOW_PLAYER: ObjectiveType;
    static readonly GUN_ATTACK: ObjectiveType;
    static readonly HURT_BY_TARGET: ObjectiveType;
    static readonly LOOK_AT_ANIMAL: ObjectiveType;
    static readonly LOOK_AT_ENTITY_BY_UUID: ObjectiveType;
    static readonly LOOK_AT_ITEM: ObjectiveType;
    static readonly LOOK_AT_MOB: ObjectiveType;
    static readonly LOOK_AT_OWNER: ObjectiveType;
    static readonly LOOK_AT_PLAYER: ObjectiveType;
    static readonly LOOK_AT_RESET: ObjectiveType;
    static readonly LOOK_RANDOM_AROUND: ObjectiveType;
    static readonly MELEE_ATTACK: ObjectiveType;
    static readonly MOVE_BACK_TO_HOME: ObjectiveType;
    static readonly MOVE_BACK_TO_VILLAGE: ObjectiveType;
    static readonly MOVE_THROUGH_VILLAGE: ObjectiveType;
    static readonly NONE: ObjectiveType;
    static readonly OPEN_DOOR: ObjectiveType;
    static readonly OWNER_HURT_BY_TARGET: ObjectiveType;
    static readonly PANIC: ObjectiveType;
    static readonly RANDOM_STROLL_AROUND_HOME: ObjectiveType;
    static readonly RANDOM_STROLL_IN_VILLAGE: ObjectiveType;
    static readonly RANDOM_STROLL: ObjectiveType;
    static readonly RANDOM_SWIMMING: ObjectiveType;
    static readonly WATER_AVOIDING_RANDOM_STROLL: ObjectiveType;
    static readonly ZOMBIE_ATTACK: ObjectiveType;
    static byString(objectiveType: string): Optional<ObjectiveType>;
    static get(objectiveType: string): ObjectiveType;
    get defaultPriority(): number;
    get friendlyName(): string;
    get objectiveName(): string;
    hasTravelObjective(): boolean;
    static valueOf(name: string): ObjectiveType;
    static values(): ObjectiveType[];
  }


  class ObjectiveUtils {
    static createObjectiveGoal(objectiveDataEntry: ObjectiveDataEntry, easyNPC: EasyNPC<any>): Goal;
    static createObjectiveTarget(objectiveDataEntry: ObjectiveDataEntry, easyNPC: EasyNPC<any>): Goal;
  }


  class TargetedEntitySet {
    static readonly STREAM_CODEC: StreamCodec;
  }


  class TargetedPlayerSet {
    static readonly STREAM_CODEC: StreamCodec;
  }

}

declare module 'de.markusbordihn.easynpc.data.preset' {
  import { CompoundTag } from 'net.minecraft.nbt';
  import { CleanupMode } from 'de.markusbordihn.easynpc.data.preset.PresetDataUtils';
  import { SpawnData, Level } from 'net.minecraft.world.level';
  import { ItemStack } from 'net.minecraft.world.item';
  import { BlockPos } from 'net.minecraft.core';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class PresetDataUtils {
    static cleanupEntityData(entityData: CompoundTag): CompoundTag;
    static cleanupEntityData(entityData: CompoundTag, mode: CleanupMode): CompoundTag;
    static fromItemStack(itemStack: ItemStack): PresetData;
    static fromSpawnData(spawnData: SpawnData): PresetData;
    static spawnEntity(presetData: PresetData, level: Level, blockPos: BlockPos): boolean;
    static toItemStack(presetData: PresetData): ItemStack;
    static toSpawnData(presetData: PresetData): SpawnData;
  }


  interface PresetExportFormat extends Enum<PresetExportFormat> {}
  class PresetExportFormat extends Enum<PresetExportFormat> {
    static readonly NBT: PresetExportFormat;
    static readonly SNBT: PresetExportFormat;
    static readonly JSON: PresetExportFormat;
    static readonly UNKNOWN: PresetExportFormat;
    static extractCleanFilename(pathOrFilename: string): string;
    static get default(): PresetExportFormat;
    get fileExtension(): string;
    static getPresetExportFormat(filename: string): PresetExportFormat;
    static getPresetExtension(filename: string): string;
    static hasPresetExtension(filename: string): boolean;
    static normalizeFilename(filename: string): string;
    static removePresetExtension(filename: string): string;
    static valueOf(name: string): PresetExportFormat;
    static values(): PresetExportFormat[];
  }


  interface PresetType extends Enum<PresetType> {}
  class PresetType extends Enum<PresetType> {
    static readonly CUSTOM: PresetType;
    static readonly DATA: PresetType;
    static readonly DEFAULT: PresetType;
    static readonly LOCAL: PresetType;
    static readonly WORLD: PresetType;
    static valueOf(name: string): PresetType;
    static values(): PresetType[];
  }

}

declare module 'de.markusbordihn.easynpc.data.preset.PresetDataUtils' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface CleanupMode extends Enum<CleanupMode> {}
  class CleanupMode extends Enum<CleanupMode> {
    static readonly RUNTIME_ONLY: CleanupMode;
    static readonly FULL: CleanupMode;
    static valueOf(name: string): CleanupMode;
    static values(): CleanupMode[];
  }

}

declare module 'de.markusbordihn.easynpc.data.profession' {
  import { Enum } from 'java.lang';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { List } from 'java.util';

  interface Profession extends Enum<Profession> {}
  class Profession extends Enum<Profession> {
    static readonly NONE: Profession;
    static readonly ARMORER: Profession;
    static readonly BUTCHER: Profession;
    static readonly CARTOGRAPHER: Profession;
    static readonly CLERIC: Profession;
    static readonly FARMER: Profession;
    static readonly FISHERMAN: Profession;
    static readonly FLETCHER: Profession;
    static readonly LEATHERWORKER: Profession;
    static readonly LIBRARIAN: Profession;
    static readonly MASON: Profession;
    static readonly NITWIT: Profession;
    static readonly SHEPHERD: Profession;
    static readonly TOOLSMITH: Profession;
    static readonly WEAPONSMITH: Profession;
    decode(registryFriendlyByteBuf: RegistryFriendlyByteBuf): Profession;
    encode(registryFriendlyByteBuf: RegistryFriendlyByteBuf, profession: Profession): void;
    static valueOf(name: string): Profession;
    static values(): Profession[];
  }

}

declare module 'de.markusbordihn.easynpc.data.render' {
  import { Enum } from 'java.lang';
  import { Stream } from 'java.util.stream';
  import { List } from 'java.util';

  interface RenderType extends Enum<RenderType> {}
  class RenderType extends Enum<RenderType> {
    static readonly CUSTOM: RenderType;
    static readonly DEFAULT: RenderType;
    static readonly CUSTOM_ENTITY: RenderType;
    static get(renderType: string): RenderType;
    static get renderTypeNames(): Stream<string>;
    static valueOf(name: string): RenderType;
    static values(): RenderType[];
  }

}

declare module 'de.markusbordihn.easynpc.data.saveddata' {
  import { SavedData } from 'net.minecraft.world.level.saveddata';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { UUID } from 'java.util';
  import { ExecutionInterval } from 'de.markusbordihn.easynpc.data.execution';

  interface ActionExecutionTracker extends SavedData {}
  class ActionExecutionTracker extends SavedData {
    canExecute(playerUUID: UUID, actionUUID: UUID, limit: number, interval: ExecutionInterval): boolean;
    cleanupExpiredRecords(): void;
    static get(serverLevel: ServerLevel): ActionExecutionTracker;
    static load(compoundTag: CompoundTag, provider: Provider): ActionExecutionTracker;
    recordExecution(playerUUID: UUID, actionUUID: UUID, interval: ExecutionInterval): void;
    resetExecution(playerUUID: UUID, actionUUID: UUID): void;
    resetExecutionForAllPlayers(actionUUID: UUID): void;
    save(compoundTag: CompoundTag, provider: Provider): CompoundTag;
  }

}

declare module 'de.markusbordihn.easynpc.data.scoreboard' {
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Set, List } from 'java.util';
  import { Enum } from 'java.lang';

  class ScoreboardData {
    constructor();

    constructor(compoundTag: CompoundTag);

    constructor(serverPlayer: ServerPlayer, objectiveNames: Set<string>);
    createTag(): CompoundTag;
    getScore(objectiveName: string): number;
    hasScore(objectiveName: string): boolean;
    static parseScoreMacros(text: string): Set<string>;
    toString(): string;
  }


  interface ScoreboardOperation extends Enum<ScoreboardOperation> {}
  class ScoreboardOperation extends Enum<ScoreboardOperation> {
    static readonly INCREASE: ScoreboardOperation;
    static readonly DECREASE: ScoreboardOperation;
    static readonly SET: ScoreboardOperation;
    static fromCommand(command: string): ScoreboardOperation;
    static fromCommandName(commandName: string): ScoreboardOperation;
    get commandName(): string;
    get translationKey(): string;
    static valueOf(name: string): ScoreboardOperation;
    static values(): ScoreboardOperation[];
  }

}

declare module 'de.markusbordihn.easynpc.data.screen' {
  import { CompoundTag, ListTag } from 'net.minecraft.nbt';
  import { ActionEventType, ActionEventSet } from 'de.markusbordihn.easynpc.data.action';
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { DialogDataSet } from 'de.markusbordihn.easynpc.data.dialog';
  import { ScoreboardData } from 'de.markusbordihn.easynpc.data.scoreboard';
  import { ServerPlayer } from 'net.minecraft.server.level';

  interface AdditionalScreenData extends AdditionalScreenDataInterface {}
  class AdditionalScreenData extends AdditionalScreenDataInterface {
    constructor(compoundTag: CompoundTag);
    static addActionEventSet(compoundTag: CompoundTag, easyNPC: EasyNPC<any>): void;
    static addActionEventType(compoundTag: CompoundTag, actionEventType: ActionEventType): void;
    static addDialogDataSet(compoundTag: CompoundTag, easyNPC: EasyNPC<any>): void;
    static addDialogDataSet(compoundTag: CompoundTag, easyNPC: EasyNPC<any>, serverPlayer: ServerPlayer): void;
    static addScoreboardData(compoundTag: CompoundTag, scoreboardData: ScoreboardData): void;
    get(dataTag: string): CompoundTag;
    get actionEventSet(): ActionEventSet;
    get actionEventType(): ActionEventType;
    get data(): CompoundTag;
    get dialogDataSet(): DialogDataSet;
    get scoreboardData(): ScoreboardData;
    static getActionEventSet(compoundTag: CompoundTag): ActionEventSet;
    static getActionEventType(compoundTag: CompoundTag): ActionEventType;
    static getDialogDataSet(compoundTag: CompoundTag): DialogDataSet;
    getList(dataTag: string): ListTag;
    static getScoreboardData(compoundTag: CompoundTag): ScoreboardData;
    static hasActionEventSet(compoundTag: CompoundTag): boolean;
    static hasActionEventType(compoundTag: CompoundTag): boolean;
    static hasDialogDataSet(compoundTag: CompoundTag): boolean;
    hasDialogDataSet(): boolean;
    static hasScoreboardData(compoundTag: CompoundTag): boolean;
  }


  class AdditionalScreenDataInterface {
    get actionEventSet(): ActionEventSet;
    get actionEventType(): ActionEventType;
    get data(): CompoundTag;
    get dialogDataSet(): DialogDataSet;
    get scoreboardData(): ScoreboardData;
    hasDialogDataSet(): boolean;
  }

}

declare module 'de.markusbordihn.easynpc.data.server' {
  import { EntityDataSerializer } from 'net.minecraft.network.syncher';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { Entity } from 'net.minecraft.world.entity';

  class ServerDataAccessor<T = any> {
    constructor(serverDataIndex: ServerDataIndex, entityDataSerializer: EntityDataSerializer<T>);
    equals(object: any): boolean;
    get index(): ServerDataIndex;
    hashCode(): number;
    toString(): string;
  }


  interface ServerDataIndex extends Enum<ServerDataIndex> {}
  class ServerDataIndex extends Enum<ServerDataIndex> {
    static readonly DATA_0: ServerDataIndex;
    static readonly DATA_1: ServerDataIndex;
    static readonly DATA_2: ServerDataIndex;
    static readonly DATA_3: ServerDataIndex;
    static readonly DATA_4: ServerDataIndex;
    static readonly DATA_5: ServerDataIndex;
    static readonly DATA_6: ServerDataIndex;
    static readonly DATA_7: ServerDataIndex;
    static readonly DATA_8: ServerDataIndex;
    static readonly DATA_9: ServerDataIndex;
    static readonly DATA_10: ServerDataIndex;
    static readonly DATA_11: ServerDataIndex;
    static readonly DATA_12: ServerDataIndex;
    static readonly DATA_13: ServerDataIndex;
    static readonly DATA_14: ServerDataIndex;
    static readonly DATA_15: ServerDataIndex;
    static readonly DATA_16: ServerDataIndex;
    static readonly DATA_17: ServerDataIndex;
    static readonly DATA_18: ServerDataIndex;
    static readonly DATA_19: ServerDataIndex;
    static readonly ACTION_EVENT_SET: ServerDataIndex;
    static readonly ACTION_PERMISSION_LEVEL: ServerDataIndex;
    static readonly DIALOG_DATA_SET: ServerDataIndex;
    static readonly OBJECTIVE_DATA_SET: ServerDataIndex;
    static readonly OBJECTIVE_PLAYER_SET: ServerDataIndex;
    static readonly OBJECTIVE_ENTITY_SET: ServerDataIndex;
    static readonly PRESET_UUID: ServerDataIndex;
    static readonly UNKNOWN: ServerDataIndex;
    static getIndex(index: number): ServerDataIndex;
    static valueOf(name: string): ServerDataIndex;
    static values(): ServerDataIndex[];
  }


  class ServerDataItem<T = any> {
    constructor(entityDataAccessor: ServerDataAccessor<T>, value: T);
    get value(): T;
    set value(customData: T);
  }


  class ServerEntityData {
    constructor(entity: Entity);
    define<T>(serverDataAccessor: ServerDataAccessor<T>, customData: T): void;
    static defineId<T>(entityDataSerializer: EntityDataSerializer<T>): ServerDataAccessor<T>;
    static defineId<T>(serverDataIndex: ServerDataIndex, entityDataSerializers: EntityDataSerializer<T>): ServerDataAccessor<T>;
    get<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    set<T>(entityDataAccessor: ServerDataAccessor<T>, customData: T): void;
  }

}

declare module 'de.markusbordihn.easynpc.data.skin' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { StreamCodec } from 'net.minecraft.network.codec';

  interface SkinModel extends Enum<SkinModel> {}
  class SkinModel extends Enum<SkinModel> {
    static readonly ALLAY: SkinModel;
    static readonly BOGGED: SkinModel;
    static readonly CAT: SkinModel;
    static readonly CHICKEN: SkinModel;
    static readonly CREEPER: SkinModel;
    static readonly FAIRY: SkinModel;
    static readonly FOX: SkinModel;
    static readonly DROWNED: SkinModel;
    static readonly EVOKER: SkinModel;
    static readonly ENDER_MAN: SkinModel;
    static readonly GHAST: SkinModel;
    static readonly HORSE: SkinModel;
    static readonly HUMANOID_SLIM: SkinModel;
    static readonly HUMANOID: SkinModel;
    static readonly HUSK: SkinModel;
    static readonly ILLAGER: SkinModel;
    static readonly ILLUSIONER: SkinModel;
    static readonly IRON_GOLEM: SkinModel;
    static readonly ORC: SkinModel;
    static readonly PIG: SkinModel;
    static readonly PIGLIN: SkinModel;
    static readonly PIGLIN_BRUTE: SkinModel;
    static readonly PILLAGER: SkinModel;
    static readonly PLAYER: SkinModel;
    static readonly SKELETON: SkinModel;
    static readonly SLIME: SkinModel;
    static readonly SPIDER: SkinModel;
    static readonly VEX: SkinModel;
    static readonly VILLAGER: SkinModel;
    static readonly VINDICATOR: SkinModel;
    static readonly WITCH: SkinModel;
    static readonly WOLF: SkinModel;
    static readonly ZOMBIE_VILLAGER: SkinModel;
    static readonly ZOMBIE: SkinModel;
    static readonly ZOMBIFIED_PIGLIN: SkinModel;
    static readonly STRAY: SkinModel;
    static readonly WITHER_SKELETON: SkinModel;
    static get(skinModel: string): SkinModel;
    get name(): string;
    hasArmourersWorkshopSupport(): boolean;
    static valueOf(name: string): SkinModel;
    static values(): SkinModel[];
  }


  interface SkinType extends Enum<SkinType> {}
  class SkinType extends Enum<SkinType> {
    static readonly CUSTOM: SkinType;
    static readonly DEFAULT: SkinType;
    static readonly INSECURE_REMOTE_URL: SkinType;
    static readonly NONE: SkinType;
    static readonly PLAYER_SKIN: SkinType;
    static readonly SERVER_SKIN: SkinType;
    static readonly SECURE_REMOTE_URL: SkinType;
    decode(registryFriendlyByteBuf: RegistryFriendlyByteBuf): SkinType;
    encode(registryFriendlyByteBuf: RegistryFriendlyByteBuf, skinType: SkinType): void;
    static get(skinType: string): SkinType;
    static valueOf(name: string): SkinType;
    static values(): SkinType[];
  }


  class SkinUUID {
    static readonly STREAM_CODEC: StreamCodec;
  }

}

declare module 'de.markusbordihn.easynpc.data.skin.variant' {
  import { Enum } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List } from 'java.util';

  interface AllaySkinVariant extends Enum<AllaySkinVariant> {}
  class AllaySkinVariant extends Enum<AllaySkinVariant> {
    static readonly ALLAY: AllaySkinVariant;
    static readonly LAVA: AllaySkinVariant;
    static readonly GRASSLAND: AllaySkinVariant;
    static readonly WATER: AllaySkinVariant;
    get textureLocation(): ResourceLocation;
    static valueOf(name: string): AllaySkinVariant;
    static values(): AllaySkinVariant[];
  }


  interface CatSkinVariant extends Enum<CatSkinVariant> {}
  class CatSkinVariant extends Enum<CatSkinVariant> {
    static readonly ALL_BLACK: CatSkinVariant;
    static readonly BLACK: CatSkinVariant;
    static readonly BRITISH_SHORTHAIR: CatSkinVariant;
    static readonly CALICO: CatSkinVariant;
    static readonly JELLIE: CatSkinVariant;
    static readonly OCELOT: CatSkinVariant;
    static readonly PERSIAN: CatSkinVariant;
    static readonly RAGDOLL: CatSkinVariant;
    static readonly RED: CatSkinVariant;
    static readonly SIAMESE: CatSkinVariant;
    static readonly TABBY: CatSkinVariant;
    static readonly WHITE: CatSkinVariant;
    get textureLocation(): ResourceLocation;
    static valueOf(name: string): CatSkinVariant;
    static values(): CatSkinVariant[];
  }


  interface ChickenSkinVariant extends Enum<ChickenSkinVariant> {}
  class ChickenSkinVariant extends Enum<ChickenSkinVariant> {
    static readonly WHITE: ChickenSkinVariant;
    get textureLocation(): ResourceLocation;
    static valueOf(name: string): ChickenSkinVariant;
    static values(): ChickenSkinVariant[];
  }


  interface CreeperSkinVariant extends Enum<CreeperSkinVariant> {}
  class CreeperSkinVariant extends Enum<CreeperSkinVariant> {
    static readonly CREEPER: CreeperSkinVariant;
    static readonly CHARGED: CreeperSkinVariant;
    get textureLocation(): ResourceLocation;
    static valueOf(name: string): CreeperSkinVariant;
    static values(): CreeperSkinVariant[];
  }


  interface DopplerSkinVariant extends Enum<DopplerSkinVariant> {}
  class DopplerSkinVariant extends Enum<DopplerSkinVariant> {
    static readonly DOPPLER: DopplerSkinVariant;
    get textureLocation(): ResourceLocation;
    static valueOf(name: string): DopplerSkinVariant;
    static values(): DopplerSkinVariant[];
  }


  interface EnderManSkinVariant extends Enum<EnderManSkinVariant> {}
  class EnderManSkinVariant extends Enum<EnderManSkinVariant> {
    static readonly ENDERMAN: EnderManSkinVariant;
    get textureLocation(): ResourceLocation;
    static valueOf(name: string): EnderManSkinVariant;
    static values(): EnderManSkinVariant[];
  }


  interface FairySkinVariant extends Enum<FairySkinVariant> {}
  class FairySkinVariant extends Enum<FairySkinVariant> {
    static readonly GREEN: FairySkinVariant;
    static readonly RED: FairySkinVariant;
    static readonly BLUE: FairySkinVariant;
    get textureLocation(): ResourceLocation;
    static valueOf(name: string): FairySkinVariant;
    static values(): FairySkinVariant[];
  }


  interface FoxSkinVariant extends Enum<FoxSkinVariant> {}
  class FoxSkinVariant extends Enum<FoxSkinVariant> {
    static readonly RED: FoxSkinVariant;
    static readonly SNOW: FoxSkinVariant;
    get textureLocation(): ResourceLocation;
    static valueOf(name: string): FoxSkinVariant;
    static values(): FoxSkinVariant[];
  }


  interface GhastSkinVariant extends Enum<GhastSkinVariant> {}
  class GhastSkinVariant extends Enum<GhastSkinVariant> {
    static readonly GHAST: GhastSkinVariant;
    static readonly GHAST_SHOOTING: GhastSkinVariant;
    get textureLocation(): ResourceLocation;
    static valueOf(name: string): GhastSkinVariant;
    static values(): GhastSkinVariant[];
  }


  interface HorseSkinVariant extends Enum<HorseSkinVariant> {}
  class HorseSkinVariant extends Enum<HorseSkinVariant> {
    static readonly WHITE: HorseSkinVariant;
    static readonly WHITE_SADDLED: HorseSkinVariant;
    static readonly CREAMY: HorseSkinVariant;
    static readonly CREAMY_SADDLED: HorseSkinVariant;
    static readonly CHESTNUT: HorseSkinVariant;
    static readonly CHESTNUT_SADDLED: HorseSkinVariant;
    static readonly BROWN: HorseSkinVariant;
    static readonly BROWN_SADDLED: HorseSkinVariant;
    static readonly BLACK: HorseSkinVariant;
    static readonly BLACK_SADDLED: HorseSkinVariant;
    static readonly GRAY: HorseSkinVariant;
    static readonly GRAY_SADDLED: HorseSkinVariant;
    static readonly DARKBROWN: HorseSkinVariant;
    static readonly DARKBROWN_SADDLED: HorseSkinVariant;
    static readonly SKELETON: HorseSkinVariant;
    static readonly SKELETON_SADDLED: HorseSkinVariant;
    static readonly ZOMBIE: HorseSkinVariant;
    static readonly ZOMBIE_SADDLED: HorseSkinVariant;
    static readonly DONKEY: HorseSkinVariant;
    static readonly DONKEY_SADDLED: HorseSkinVariant;
    static readonly MULE: HorseSkinVariant;
    static readonly MULE_SADDLED: HorseSkinVariant;
    get textureLocation(): ResourceLocation;
    static valueOf(name: string): HorseSkinVariant;
    static values(): HorseSkinVariant[];
  }


  interface HumanoidSkinVariant extends Enum<HumanoidSkinVariant> {}
  class HumanoidSkinVariant extends Enum<HumanoidSkinVariant> {
    static readonly ALEX: HumanoidSkinVariant;
    static readonly ARI: HumanoidSkinVariant;
    static readonly EFE: HumanoidSkinVariant;
    static readonly KAI: HumanoidSkinVariant;
    static readonly MAKENA: HumanoidSkinVariant;
    static readonly NOOR: HumanoidSkinVariant;
    static readonly STEVE: HumanoidSkinVariant;
    static readonly SUNNY: HumanoidSkinVariant;
    static readonly ZURI: HumanoidSkinVariant;
    static readonly JAYJASONBO: HumanoidSkinVariant;
    static readonly PROFESSOR_01: HumanoidSkinVariant;
    static readonly SECURITY_01: HumanoidSkinVariant;
    static readonly KNIGHT_01: HumanoidSkinVariant;
    static readonly KNIGHT_02: HumanoidSkinVariant;
    get textureLocation(): ResourceLocation;
    static valueOf(name: string): HumanoidSkinVariant;
    static values(): HumanoidSkinVariant[];
  }


  interface HumanoidSlimSkinVariant extends Enum<HumanoidSlimSkinVariant> {}
  class HumanoidSlimSkinVariant extends Enum<HumanoidSlimSkinVariant> {
    static readonly ALEX: HumanoidSlimSkinVariant;
    static readonly ARI: HumanoidSlimSkinVariant;
    static readonly EFE: HumanoidSlimSkinVariant;
    static readonly KAI: HumanoidSlimSkinVariant;
    static readonly MAKENA: HumanoidSlimSkinVariant;
    static readonly NOOR: HumanoidSlimSkinVariant;
    static readonly STEVE: HumanoidSlimSkinVariant;
    static readonly SUNNY: HumanoidSlimSkinVariant;
    static readonly ZURI: HumanoidSlimSkinVariant;
    static readonly KAWORRU: HumanoidSlimSkinVariant;
    get textureLocation(): ResourceLocation;
    static valueOf(name: string): HumanoidSlimSkinVariant;
    static values(): HumanoidSlimSkinVariant[];
  }


  interface IllagerSkinVariant extends Enum<IllagerSkinVariant> {}
  class IllagerSkinVariant extends Enum<IllagerSkinVariant> {
    static readonly EVOKER: IllagerSkinVariant;
    static readonly EVOKER_CROSSED_ARMS: IllagerSkinVariant;
    static readonly ILLUSIONER: IllagerSkinVariant;
    static readonly ILLUSIONER_CROSSED_ARMS: IllagerSkinVariant;
    static readonly PILLAGER: IllagerSkinVariant;
    static readonly VINDICATOR: IllagerSkinVariant;
    static readonly VINDICATOR_CROSSED_ARMS: IllagerSkinVariant;
    get textureLocation(): ResourceLocation;
    static valueOf(name: string): IllagerSkinVariant;
    static values(): IllagerSkinVariant[];
  }


  interface IronGolemSkinVariant extends Enum<IronGolemSkinVariant> {}
  class IronGolemSkinVariant extends Enum<IronGolemSkinVariant> {
    static readonly IRON_GOLEM: IronGolemSkinVariant;
    static readonly IRON_GOLEM_CRACKINESS_HIGH: IronGolemSkinVariant;
    static readonly IRON_GOLEM_CRACKINESS_MEDIUM: IronGolemSkinVariant;
    static readonly IRON_GOLEM_CRACKINESS_LOW: IronGolemSkinVariant;
    get textureLocation(): ResourceLocation;
    static valueOf(name: string): IronGolemSkinVariant;
    static values(): IronGolemSkinVariant[];
  }


  interface OrcSkinVariant extends Enum<OrcSkinVariant> {}
  class OrcSkinVariant extends Enum<OrcSkinVariant> {
    static readonly ORC: OrcSkinVariant;
    static readonly ORC_WARRIOR: OrcSkinVariant;
    get textureLocation(): ResourceLocation;
    static valueOf(name: string): OrcSkinVariant;
    static values(): OrcSkinVariant[];
  }


  interface PiglinSkinVariant extends Enum<PiglinSkinVariant> {}
  class PiglinSkinVariant extends Enum<PiglinSkinVariant> {
    static readonly PIGLIN: PiglinSkinVariant;
    static readonly PIGLIN_BRUTE: PiglinSkinVariant;
    static readonly ZOMBIFIED_PIGLIN: PiglinSkinVariant;
    get textureLocation(): ResourceLocation;
    static valueOf(name: string): PiglinSkinVariant;
    static values(): PiglinSkinVariant[];
  }


  interface PigSkinVariant extends Enum<PigSkinVariant> {}
  class PigSkinVariant extends Enum<PigSkinVariant> {
    static readonly PIG: PigSkinVariant;
    static readonly SPOTTED: PigSkinVariant;
    get textureLocation(): ResourceLocation;
    static valueOf(name: string): PigSkinVariant;
    static values(): PigSkinVariant[];
  }


  interface SkeletonSkinVariant extends Enum<SkeletonSkinVariant> {}
  class SkeletonSkinVariant extends Enum<SkeletonSkinVariant> {
    static readonly SKELETON: SkeletonSkinVariant;
    static readonly STRAY: SkeletonSkinVariant;
    static readonly WITHER_SKELETON: SkeletonSkinVariant;
    static readonly BOGGED: SkeletonSkinVariant;
    get textureLocation(): ResourceLocation;
    static valueOf(name: string): SkeletonSkinVariant;
    static values(): SkeletonSkinVariant[];
  }


  interface SlimeSkinVariant extends Enum<SlimeSkinVariant> {}
  class SlimeSkinVariant extends Enum<SlimeSkinVariant> {
    static readonly SLIME: SlimeSkinVariant;
    get textureLocation(): ResourceLocation;
    static valueOf(name: string): SlimeSkinVariant;
    static values(): SlimeSkinVariant[];
  }


  interface SpiderSkinVariant extends Enum<SpiderSkinVariant> {}
  class SpiderSkinVariant extends Enum<SpiderSkinVariant> {
    static readonly CAVE_SPIDER: SpiderSkinVariant;
    static readonly SPIDER: SpiderSkinVariant;
    get textureLocation(): ResourceLocation;
    static valueOf(name: string): SpiderSkinVariant;
    static values(): SpiderSkinVariant[];
  }


  interface VexSkinVariant extends Enum<VexSkinVariant> {}
  class VexSkinVariant extends Enum<VexSkinVariant> {
    static readonly VEX: VexSkinVariant;
    static readonly CHARGED: VexSkinVariant;
    get textureLocation(): ResourceLocation;
    static valueOf(name: string): VexSkinVariant;
    static values(): VexSkinVariant[];
  }


  interface VillagerSkinVariant extends Enum<VillagerSkinVariant> {}
  class VillagerSkinVariant extends Enum<VillagerSkinVariant> {
    static readonly DESERT_ARMORER: VillagerSkinVariant;
    static readonly DESERT_BUTCHER: VillagerSkinVariant;
    static readonly DESERT_CARTOGRAPHER: VillagerSkinVariant;
    static readonly DESERT_CLERIC: VillagerSkinVariant;
    static readonly DESERT_FARMER: VillagerSkinVariant;
    static readonly DESERT_FISHERMAN: VillagerSkinVariant;
    static readonly DESERT_FLETCHER: VillagerSkinVariant;
    static readonly DESERT_LEATHERWORKER: VillagerSkinVariant;
    static readonly DESERT_LIBRARIAN: VillagerSkinVariant;
    static readonly DESERT_MASON: VillagerSkinVariant;
    static readonly DESERT_NITWIT: VillagerSkinVariant;
    static readonly DESERT_NONE: VillagerSkinVariant;
    static readonly DESERT_SHEPHERD: VillagerSkinVariant;
    static readonly DESERT_TOOLSMITH: VillagerSkinVariant;
    static readonly DESERT_WEAPONSMITH: VillagerSkinVariant;
    static readonly JUNGLE_ARMORER: VillagerSkinVariant;
    static readonly JUNGLE_BUTCHER: VillagerSkinVariant;
    static readonly JUNGLE_CARTOGRAPHER: VillagerSkinVariant;
    static readonly JUNGLE_CLERIC: VillagerSkinVariant;
    static readonly JUNGLE_FARMER: VillagerSkinVariant;
    static readonly JUNGLE_FISHERMAN: VillagerSkinVariant;
    static readonly JUNGLE_FLETCHER: VillagerSkinVariant;
    static readonly JUNGLE_LEATHERWORKER: VillagerSkinVariant;
    static readonly JUNGLE_LIBRARIAN: VillagerSkinVariant;
    static readonly JUNGLE_MASON: VillagerSkinVariant;
    static readonly JUNGLE_NITWIT: VillagerSkinVariant;
    static readonly JUNGLE_NONE: VillagerSkinVariant;
    static readonly JUNGLE_SHEPHERD: VillagerSkinVariant;
    static readonly JUNGLE_TOOLSMITH: VillagerSkinVariant;
    static readonly JUNGLE_WEAPONSMITH: VillagerSkinVariant;
    static readonly PLAINS_ARMORER: VillagerSkinVariant;
    static readonly PLAINS_BUTCHER: VillagerSkinVariant;
    static readonly PLAINS_CARTOGRAPHER: VillagerSkinVariant;
    static readonly PLAINS_CLERIC: VillagerSkinVariant;
    static readonly PLAINS_FARMER: VillagerSkinVariant;
    static readonly PLAINS_FISHERMAN: VillagerSkinVariant;
    static readonly PLAINS_FLETCHER: VillagerSkinVariant;
    static readonly PLAINS_LEATHERWORKER: VillagerSkinVariant;
    static readonly PLAINS_LIBRARIAN: VillagerSkinVariant;
    static readonly PLAINS_MASON: VillagerSkinVariant;
    static readonly PLAINS_NITWIT: VillagerSkinVariant;
    static readonly PLAINS_NONE: VillagerSkinVariant;
    static readonly PLAINS_SHEPHERD: VillagerSkinVariant;
    static readonly PLAINS_TOOLSMITH: VillagerSkinVariant;
    static readonly PLAINS_WEAPONSMITH: VillagerSkinVariant;
    static readonly SAVANNA_ARMORER: VillagerSkinVariant;
    static readonly SAVANNA_BUTCHER: VillagerSkinVariant;
    static readonly SAVANNA_CARTOGRAPHER: VillagerSkinVariant;
    static readonly SAVANNA_CLERIC: VillagerSkinVariant;
    static readonly SAVANNA_FARMER: VillagerSkinVariant;
    static readonly SAVANNA_FISHERMAN: VillagerSkinVariant;
    static readonly SAVANNA_FLETCHER: VillagerSkinVariant;
    static readonly SAVANNA_LEATHERWORKER: VillagerSkinVariant;
    static readonly SAVANNA_LIBRARIAN: VillagerSkinVariant;
    static readonly SAVANNA_MASON: VillagerSkinVariant;
    static readonly SAVANNA_NITWIT: VillagerSkinVariant;
    static readonly SAVANNA_NONE: VillagerSkinVariant;
    static readonly SAVANNA_SHEPHERD: VillagerSkinVariant;
    static readonly SAVANNA_TOOLSMITH: VillagerSkinVariant;
    static readonly SAVANNA_WEAPONSMITH: VillagerSkinVariant;
    static readonly SNOW_ARMORER: VillagerSkinVariant;
    static readonly SNOW_BUTCHER: VillagerSkinVariant;
    static readonly SNOW_CARTOGRAPHER: VillagerSkinVariant;
    static readonly SNOW_CLERIC: VillagerSkinVariant;
    static readonly SNOW_FARMER: VillagerSkinVariant;
    static readonly SNOW_FISHERMAN: VillagerSkinVariant;
    static readonly SNOW_FLETCHER: VillagerSkinVariant;
    static readonly SNOW_LEATHERWORKER: VillagerSkinVariant;
    static readonly SNOW_LIBRARIAN: VillagerSkinVariant;
    static readonly SNOW_MASON: VillagerSkinVariant;
    static readonly SNOW_NITWIT: VillagerSkinVariant;
    static readonly SNOW_NONE: VillagerSkinVariant;
    static readonly SNOW_SHEPHERD: VillagerSkinVariant;
    static readonly SNOW_TOOLSMITH: VillagerSkinVariant;
    static readonly SNOW_WEAPONSMITH: VillagerSkinVariant;
    static readonly SWAMP_ARMORER: VillagerSkinVariant;
    static readonly SWAMP_BUTCHER: VillagerSkinVariant;
    static readonly SWAMP_CARTOGRAPHER: VillagerSkinVariant;
    static readonly SWAMP_CLERIC: VillagerSkinVariant;
    static readonly SWAMP_FARMER: VillagerSkinVariant;
    static readonly SWAMP_FISHERMAN: VillagerSkinVariant;
    static readonly SWAMP_FLETCHER: VillagerSkinVariant;
    static readonly SWAMP_LEATHERWORKER: VillagerSkinVariant;
    static readonly SWAMP_LIBRARIAN: VillagerSkinVariant;
    static readonly SWAMP_MASON: VillagerSkinVariant;
    static readonly SWAMP_NITWIT: VillagerSkinVariant;
    static readonly SWAMP_NONE: VillagerSkinVariant;
    static readonly SWAMP_SHEPHERD: VillagerSkinVariant;
    static readonly SWAMP_TOOLSMITH: VillagerSkinVariant;
    static readonly SWAMP_WEAPONSMITH: VillagerSkinVariant;
    static readonly TAIGA_ARMORER: VillagerSkinVariant;
    static readonly TAIGA_BUTCHER: VillagerSkinVariant;
    static readonly TAIGA_CARTOGRAPHER: VillagerSkinVariant;
    static readonly TAIGA_CLERIC: VillagerSkinVariant;
    static readonly TAIGA_FARMER: VillagerSkinVariant;
    static readonly TAIGA_FISHERMAN: VillagerSkinVariant;
    static readonly TAIGA_FLETCHER: VillagerSkinVariant;
    static readonly TAIGA_LEATHERWORKER: VillagerSkinVariant;
    static readonly TAIGA_LIBRARIAN: VillagerSkinVariant;
    static readonly TAIGA_MASON: VillagerSkinVariant;
    static readonly TAIGA_NITWIT: VillagerSkinVariant;
    static readonly TAIGA_NONE: VillagerSkinVariant;
    static readonly TAIGA_SHEPHERD: VillagerSkinVariant;
    static readonly TAIGA_TOOLSMITH: VillagerSkinVariant;
    static readonly TAIGA_WEAPONSMITH: VillagerSkinVariant;
    get textureLocation(): ResourceLocation;
    static valueOf(name: string): VillagerSkinVariant;
    static values(): VillagerSkinVariant[];
  }


  interface WitchSkinVariant extends Enum<WitchSkinVariant> {}
  class WitchSkinVariant extends Enum<WitchSkinVariant> {
    static readonly WITCH: WitchSkinVariant;
    get textureLocation(): ResourceLocation;
    static valueOf(name: string): WitchSkinVariant;
    static values(): WitchSkinVariant[];
  }


  interface WolfSkinVariant extends Enum<WolfSkinVariant> {}
  class WolfSkinVariant extends Enum<WolfSkinVariant> {
    static readonly WOLF: WolfSkinVariant;
    static readonly TAMED: WolfSkinVariant;
    static readonly ANGRY: WolfSkinVariant;
    get textureLocation(): ResourceLocation;
    static valueOf(name: string): WolfSkinVariant;
    static values(): WolfSkinVariant[];
  }


  interface ZombieSkinVariant extends Enum<ZombieSkinVariant> {}
  class ZombieSkinVariant extends Enum<ZombieSkinVariant> {
    static readonly ZOMBIE: ZombieSkinVariant;
    static readonly HUSK: ZombieSkinVariant;
    static readonly DROWNED: ZombieSkinVariant;
    get textureLocation(): ResourceLocation;
    static valueOf(name: string): ZombieSkinVariant;
    static values(): ZombieSkinVariant[];
  }


  interface ZombieVillagerSkinVariant extends Enum<ZombieVillagerSkinVariant> {}
  class ZombieVillagerSkinVariant extends Enum<ZombieVillagerSkinVariant> {
    static readonly DESERT_ARMORER: ZombieVillagerSkinVariant;
    static readonly DESERT_BUTCHER: ZombieVillagerSkinVariant;
    static readonly DESERT_CARTOGRAPHER: ZombieVillagerSkinVariant;
    static readonly DESERT_CLERIC: ZombieVillagerSkinVariant;
    static readonly DESERT_FARMER: ZombieVillagerSkinVariant;
    static readonly DESERT_FISHERMAN: ZombieVillagerSkinVariant;
    static readonly DESERT_FLETCHER: ZombieVillagerSkinVariant;
    static readonly DESERT_LEATHERWORKER: ZombieVillagerSkinVariant;
    static readonly DESERT_LIBRARIAN: ZombieVillagerSkinVariant;
    static readonly DESERT_MASON: ZombieVillagerSkinVariant;
    static readonly DESERT_NITWIT: ZombieVillagerSkinVariant;
    static readonly DESERT_NONE: ZombieVillagerSkinVariant;
    static readonly DESERT_SHEPHERD: ZombieVillagerSkinVariant;
    static readonly DESERT_TOOLSMITH: ZombieVillagerSkinVariant;
    static readonly DESERT_WEAPONSMITH: ZombieVillagerSkinVariant;
    static readonly JUNGLE_ARMORER: ZombieVillagerSkinVariant;
    static readonly JUNGLE_BUTCHER: ZombieVillagerSkinVariant;
    static readonly JUNGLE_CARTOGRAPHER: ZombieVillagerSkinVariant;
    static readonly JUNGLE_CLERIC: ZombieVillagerSkinVariant;
    static readonly JUNGLE_FARMER: ZombieVillagerSkinVariant;
    static readonly JUNGLE_FISHERMAN: ZombieVillagerSkinVariant;
    static readonly JUNGLE_FLETCHER: ZombieVillagerSkinVariant;
    static readonly JUNGLE_LEATHERWORKER: ZombieVillagerSkinVariant;
    static readonly JUNGLE_LIBRARIAN: ZombieVillagerSkinVariant;
    static readonly JUNGLE_MASON: ZombieVillagerSkinVariant;
    static readonly JUNGLE_NITWIT: ZombieVillagerSkinVariant;
    static readonly JUNGLE_NONE: ZombieVillagerSkinVariant;
    static readonly JUNGLE_SHEPHERD: ZombieVillagerSkinVariant;
    static readonly JUNGLE_TOOLSMITH: ZombieVillagerSkinVariant;
    static readonly JUNGLE_WEAPONSMITH: ZombieVillagerSkinVariant;
    static readonly PLAINS_ARMORER: ZombieVillagerSkinVariant;
    static readonly PLAINS_BUTCHER: ZombieVillagerSkinVariant;
    static readonly PLAINS_CARTOGRAPHER: ZombieVillagerSkinVariant;
    static readonly PLAINS_CLERIC: ZombieVillagerSkinVariant;
    static readonly PLAINS_FARMER: ZombieVillagerSkinVariant;
    static readonly PLAINS_FISHERMAN: ZombieVillagerSkinVariant;
    static readonly PLAINS_FLETCHER: ZombieVillagerSkinVariant;
    static readonly PLAINS_LEATHERWORKER: ZombieVillagerSkinVariant;
    static readonly PLAINS_LIBRARIAN: ZombieVillagerSkinVariant;
    static readonly PLAINS_MASON: ZombieVillagerSkinVariant;
    static readonly PLAINS_NITWIT: ZombieVillagerSkinVariant;
    static readonly PLAINS_NONE: ZombieVillagerSkinVariant;
    static readonly PLAINS_SHEPHERD: ZombieVillagerSkinVariant;
    static readonly PLAINS_TOOLSMITH: ZombieVillagerSkinVariant;
    static readonly PLAINS_WEAPONSMITH: ZombieVillagerSkinVariant;
    static readonly SAVANNA_ARMORER: ZombieVillagerSkinVariant;
    static readonly SAVANNA_BUTCHER: ZombieVillagerSkinVariant;
    static readonly SAVANNA_CARTOGRAPHER: ZombieVillagerSkinVariant;
    static readonly SAVANNA_CLERIC: ZombieVillagerSkinVariant;
    static readonly SAVANNA_FARMER: ZombieVillagerSkinVariant;
    static readonly SAVANNA_FISHERMAN: ZombieVillagerSkinVariant;
    static readonly SAVANNA_FLETCHER: ZombieVillagerSkinVariant;
    static readonly SAVANNA_LEATHERWORKER: ZombieVillagerSkinVariant;
    static readonly SAVANNA_LIBRARIAN: ZombieVillagerSkinVariant;
    static readonly SAVANNA_MASON: ZombieVillagerSkinVariant;
    static readonly SAVANNA_NITWIT: ZombieVillagerSkinVariant;
    static readonly SAVANNA_NONE: ZombieVillagerSkinVariant;
    static readonly SAVANNA_SHEPHERD: ZombieVillagerSkinVariant;
    static readonly SAVANNA_TOOLSMITH: ZombieVillagerSkinVariant;
    static readonly SAVANNA_WEAPONSMITH: ZombieVillagerSkinVariant;
    static readonly SNOW_ARMORER: ZombieVillagerSkinVariant;
    static readonly SNOW_BUTCHER: ZombieVillagerSkinVariant;
    static readonly SNOW_CARTOGRAPHER: ZombieVillagerSkinVariant;
    static readonly SNOW_CLERIC: ZombieVillagerSkinVariant;
    static readonly SNOW_FARMER: ZombieVillagerSkinVariant;
    static readonly SNOW_FISHERMAN: ZombieVillagerSkinVariant;
    static readonly SNOW_FLETCHER: ZombieVillagerSkinVariant;
    static readonly SNOW_LEATHERWORKER: ZombieVillagerSkinVariant;
    static readonly SNOW_LIBRARIAN: ZombieVillagerSkinVariant;
    static readonly SNOW_MASON: ZombieVillagerSkinVariant;
    static readonly SNOW_NITWIT: ZombieVillagerSkinVariant;
    static readonly SNOW_NONE: ZombieVillagerSkinVariant;
    static readonly SNOW_SHEPHERD: ZombieVillagerSkinVariant;
    static readonly SNOW_TOOLSMITH: ZombieVillagerSkinVariant;
    static readonly SNOW_WEAPONSMITH: ZombieVillagerSkinVariant;
    static readonly SWAMP_ARMORER: ZombieVillagerSkinVariant;
    static readonly SWAMP_BUTCHER: ZombieVillagerSkinVariant;
    static readonly SWAMP_CARTOGRAPHER: ZombieVillagerSkinVariant;
    static readonly SWAMP_CLERIC: ZombieVillagerSkinVariant;
    static readonly SWAMP_FARMER: ZombieVillagerSkinVariant;
    static readonly SWAMP_FISHERMAN: ZombieVillagerSkinVariant;
    static readonly SWAMP_FLETCHER: ZombieVillagerSkinVariant;
    static readonly SWAMP_LEATHERWORKER: ZombieVillagerSkinVariant;
    static readonly SWAMP_LIBRARIAN: ZombieVillagerSkinVariant;
    static readonly SWAMP_MASON: ZombieVillagerSkinVariant;
    static readonly SWAMP_NITWIT: ZombieVillagerSkinVariant;
    static readonly SWAMP_NONE: ZombieVillagerSkinVariant;
    static readonly SWAMP_SHEPHERD: ZombieVillagerSkinVariant;
    static readonly SWAMP_TOOLSMITH: ZombieVillagerSkinVariant;
    static readonly SWAMP_WEAPONSMITH: ZombieVillagerSkinVariant;
    static readonly TAIGA_ARMORER: ZombieVillagerSkinVariant;
    static readonly TAIGA_BUTCHER: ZombieVillagerSkinVariant;
    static readonly TAIGA_CARTOGRAPHER: ZombieVillagerSkinVariant;
    static readonly TAIGA_CLERIC: ZombieVillagerSkinVariant;
    static readonly TAIGA_FARMER: ZombieVillagerSkinVariant;
    static readonly TAIGA_FISHERMAN: ZombieVillagerSkinVariant;
    static readonly TAIGA_FLETCHER: ZombieVillagerSkinVariant;
    static readonly TAIGA_LEATHERWORKER: ZombieVillagerSkinVariant;
    static readonly TAIGA_LIBRARIAN: ZombieVillagerSkinVariant;
    static readonly TAIGA_MASON: ZombieVillagerSkinVariant;
    static readonly TAIGA_NITWIT: ZombieVillagerSkinVariant;
    static readonly TAIGA_NONE: ZombieVillagerSkinVariant;
    static readonly TAIGA_SHEPHERD: ZombieVillagerSkinVariant;
    static readonly TAIGA_TOOLSMITH: ZombieVillagerSkinVariant;
    static readonly TAIGA_WEAPONSMITH: ZombieVillagerSkinVariant;
    get textureLocation(): ResourceLocation;
    static valueOf(name: string): ZombieVillagerSkinVariant;
    static values(): ZombieVillagerSkinVariant[];
  }

}

declare module 'de.markusbordihn.easynpc.data.sound' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Enum } from 'java.lang';
  import { Stream } from 'java.util.stream';
  import { List } from 'java.util';

  class SoundDataEntry {
    static readonly DATA_SOUND_ENABLED_TAG: string;
    static readonly DATA_SOUND_NAME_TAG: string;
    static readonly DATA_SOUND_PITCH_TAG: string;
    static readonly DATA_SOUND_TYPE: string;
    static readonly DATA_SOUND_VOLUME_TAG: string;
    static readonly DEFAULT_ENABLED: boolean;
    static readonly DEFAULT_PITCH: number;
    static readonly DEFAULT_VOLUME: number;
    constructor(type: SoundType, location: ResourceLocation);

    constructor(type: SoundType, location: ResourceLocation, volume: number, pitch: number, enabled: boolean);

    constructor(compoundTag: CompoundTag);
    createTag(): CompoundTag;
    get pitch(): number;
    get soundEvent(): SoundEvent;
    get type(): SoundType;
    get volume(): number;
    isEnabled(): boolean;
    load(compoundTag: CompoundTag): void;
    save(compoundTag: CompoundTag): CompoundTag;
  }


  class SoundDataSet {
    static readonly DATA_SOUND_DATA_SET_TAG: string;
    static readonly STREAM_CODEC: StreamCodec;
    constructor();

    constructor(compoundTag: CompoundTag);
    addDefaultSound(type: SoundType, soundEvent: SoundEvent): void;
    addSound(type: SoundType, soundEvent: SoundEvent): void;
    addSound(type: SoundType, resourceLocation: ResourceLocation): void;
    createTag(): CompoundTag;
    getSound(type: SoundType): SoundDataEntry;
    hasSound(type: SoundType): boolean;
    isEmpty(): boolean;
    load(compoundTag: CompoundTag): void;
    save(compoundTag: CompoundTag): CompoundTag;
  }


  interface SoundType extends Enum<SoundType> {}
  class SoundType extends Enum<SoundType> {
    static readonly AMBIENT: SoundType;
    static readonly AMBIENT_STRAY: SoundType;
    static readonly AMBIENT_TAMED: SoundType;
    static readonly CAST_SPELL: SoundType;
    static readonly CELEBRATE: SoundType;
    static readonly DAMAGE: SoundType;
    static readonly DEATH: SoundType;
    static readonly DEFAULT: SoundType;
    static readonly DRINKING: SoundType;
    static readonly EAT: SoundType;
    static readonly FALL_DAMAGE_BIG: SoundType;
    static readonly FALL_DAMAGE_SMALL: SoundType;
    static readonly HURT: SoundType;
    static readonly STEP: SoundType;
    static readonly SWIM: SoundType;
    static readonly TRADE: SoundType;
    static readonly TRADE_YES: SoundType;
    static readonly TRADE_NO: SoundType;
    static get(soundType: string): SoundType;
    static get soundTypeNames(): Stream<string>;
    static valueOf(name: string): SoundType;
    static values(): SoundType[];
  }

}

declare module 'de.markusbordihn.easynpc.data.spawner' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface SpawnerType extends Enum<SpawnerType> {}
  class SpawnerType extends Enum<SpawnerType> {
    static readonly BOSS_SPAWNER: SpawnerType;
    static readonly DEFAULT_SPAWNER: SpawnerType;
    static readonly GROUP_SPAWNER: SpawnerType;
    static readonly SINGLE_SPAWNER: SpawnerType;
    get descriptionId(): string;
    get id(): string;
    get serializedName(): string;
    static valueOf(name: string): SpawnerType;
    static values(): SpawnerType[];
  }

}

declare module 'de.markusbordihn.easynpc.data.status' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface StatusDataType extends Enum<StatusDataType> {}
  class StatusDataType extends Enum<StatusDataType> {
    static readonly FINALIZED: StatusDataType;
    static get(statusDataType: string): StatusDataType;
    get tagName(): string;
    static valueOf(name: string): StatusDataType;
    static values(): StatusDataType[];
  }

}

declare module 'de.markusbordihn.easynpc.data.synched' {
  import { Enum } from 'java.lang';
  import { List, Map } from 'java.util';
  import { Entity } from 'net.minecraft.world.entity';
  import { EntityDataAccessor } from 'net.minecraft.network.syncher';
  import { Builder } from 'SynchedEntityData';

  interface SynchedDataIndex extends Enum<SynchedDataIndex> {}
  class SynchedDataIndex extends Enum<SynchedDataIndex> {
    static readonly ATTACK_IS_CHARGING_CROSSBOW: SynchedDataIndex;
    static readonly DISPLAY_ATTRIBUTE_SET: SynchedDataIndex;
    static readonly ENTITY_ATTRIBUTES: SynchedDataIndex;
    static readonly MODEL_ANIMATION: SynchedDataIndex;
    static readonly MODEL_POSE: SynchedDataIndex;
    static readonly MODEL_POSITION: SynchedDataIndex;
    static readonly MODEL_ROTATION: SynchedDataIndex;
    static readonly MODEL_SCALE: SynchedDataIndex;
    static readonly MODEL_VISIBILITY: SynchedDataIndex;
    static readonly NAVIGATION_HOME_POSITION: SynchedDataIndex;
    static readonly OWNER_UUID: SynchedDataIndex;
    static readonly PROFESSION: SynchedDataIndex;
    static readonly RENDER_DATA: SynchedDataIndex;
    static readonly SCALE_X: SynchedDataIndex;
    static readonly SCALE_Y: SynchedDataIndex;
    static readonly SCALE_Z: SynchedDataIndex;
    static readonly SKIN_DATA: SynchedDataIndex;
    static readonly SOUND_DATA_SET: SynchedDataIndex;
    static readonly TRADING_DATA_SET: SynchedDataIndex;
    static readonly TRADING_INVENTORY: SynchedDataIndex;
    static readonly TRADING_MERCHANT_OFFERS: SynchedDataIndex;
    static readonly VARIANT_TYPE: SynchedDataIndex;
    static valueOf(name: string): SynchedDataIndex;
    static values(): SynchedDataIndex[];
  }


  class SynchedEntityData {
    constructor(entity: Entity, entityDataAccessorMap: Map<SynchedDataIndex, EntityDataAccessor<any>>);
    define<T>(builder: Builder, synchedDataIndex: SynchedDataIndex, defaultData: T): void;
    get<T>(synchedDataIndex: SynchedDataIndex): T;
    set<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    set<T>(synchedDataIndex: SynchedDataIndex, data: T, forceUpdate: boolean): void;
  }

}

declare module 'de.markusbordihn.easynpc.data.texture' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface TextureFailureType extends Enum<TextureFailureType> {}
  class TextureFailureType extends Enum<TextureFailureType> {
    static readonly INVALID_IMAGE_SIZE: TextureFailureType;
    static readonly DECODING_ERROR: TextureFailureType;
    static readonly INVALID_FORMAT: TextureFailureType;
    static readonly FILE_TOO_LARGE: TextureFailureType;
    static readonly NETWORK_ERROR: TextureFailureType;
    static readonly URL_INVALID: TextureFailureType;
    static readonly TIMEOUT: TextureFailureType;
    static readonly MAX_RETRIES_EXCEEDED: TextureFailureType;
    get message(): string;
    isPermanent(): boolean;
    static valueOf(name: string): TextureFailureType;
    static values(): TextureFailureType[];
  }

}

declare module 'de.markusbordihn.easynpc.data.ticker' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface TickerType extends Enum<TickerType> {}
  class TickerType extends Enum<TickerType> {
    static readonly ATTRIBUTE_BASE_TICK: TickerType;
    static readonly BASE_TICK: TickerType;
    static readonly CUSTOM_OBJECTIVE_DELAYED_REGISTRATION: TickerType;
    static readonly TRADING_ACTION: TickerType;
    static readonly TRADING_RESET: TickerType;
    static readonly TRADING_BASE_TICK: TickerType;
    static readonly TRAVEL_EVENT: TickerType;
    static valueOf(name: string): TickerType;
    static values(): TickerType[];
  }

}

declare module 'de.markusbordihn.easynpc.data.trading' {
  import { Merchant, MerchantOffers, MerchantOffer } from 'net.minecraft.world.item.trading';
  import { TradingDataCapable } from 'de.markusbordihn.easynpc.entity.easynpc.data';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { Component } from 'net.minecraft.network.chat';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Enum } from 'java.lang';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { List } from 'java.util';

  interface SafeMerchantData<E extends Mob = any> extends Merchant {}
  class SafeMerchantData<E extends Mob = any> extends Merchant {
    constructor(tradingData: TradingDataCapable<E>);
    get notifyTradeSound(): SoundEvent;
    get offers(): MerchantOffers;
    get tradingPlayer(): Player;
    get villagerXp(): number;
    isClientSide(): boolean;
    notifyTrade(offer: MerchantOffer): void;
    notifyTradeUpdated(stack: ItemStack): void;
    openTradingScreen(player: Player, name: Component, containerId: number): void;
    overrideOffers(offers: MerchantOffers): void;
    overrideXp(xp: number): void;
    set tradingPlayer(player: Player);
    showProgressBar(): boolean;
  }


  class TradingDataSet {
    static readonly DATA_TRADING_DATA_SET_TAG: string;
    static readonly DATA_TRADING_MAX_USES_TAG: string;
    static readonly DATA_TRADING_REWARDED_XP_TAG: string;
    static readonly DATA_TRADING_RESETS_EVERY_MIN_TAG: string;
    static readonly DATA_TRADING_LAST_RESET_TAG: string;
    static readonly DATA_TYPE_TAG: string;
    static readonly STREAM_CODEC: StreamCodec;
    constructor();

    constructor(compoundTag: CompoundTag);
    createTag(): CompoundTag;
    get lastReset(): number;
    get maxUses(): number;
    get resetsEveryMin(): number;
    get rewardedXP(): number;
    get type(): TradingType;
    isType(tradingType: TradingType): boolean;
    load(compoundTag: CompoundTag): void;
    save(compoundTag: CompoundTag): CompoundTag;
    set lastReset(lastReset: number);
    set maxUses(maxUses: number);
    set resetsEveryMin(resetsEveryMin: number);
    set rewardedXP(rewardedXP: number);
    set type(tradingType: TradingType);
  }


  class TradingSettings {
    static readonly ADVANCED_TRADING_OFFERS: number;
    static readonly BASIC_TRADING_OFFERS: number;
  }


  interface TradingType extends Enum<TradingType> {}
  class TradingType extends Enum<TradingType> {
    static readonly ADVANCED: TradingType;
    static readonly BASIC: TradingType;
    static readonly CUSTOM: TradingType;
    static readonly NONE: TradingType;
    decode(registryFriendlyByteBuf: RegistryFriendlyByteBuf): TradingType;
    encode(registryFriendlyByteBuf: RegistryFriendlyByteBuf, tradingType: TradingType): void;
    static get(dialogType: string): TradingType;
    static valueOf(name: string): TradingType;
    static values(): TradingType[];
  }


  interface TradingValueType extends Enum<TradingValueType> {}
  class TradingValueType extends Enum<TradingValueType> {
    static readonly DEMAND: TradingValueType;
    static readonly LAST_TRADING_RESET: TradingValueType;
    static readonly MAX_USES: TradingValueType;
    static readonly PRICE_MULTIPLIER: TradingValueType;
    static readonly RESET_TRADING_EVERY_MIN: TradingValueType;
    static readonly REWARD_EXP: TradingValueType;
    static valueOf(name: string): TradingValueType;
    static values(): TradingValueType[];
  }

}

declare module 'de.markusbordihn.easynpc.data.type' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ValueType extends Enum<ValueType> {}
  class ValueType extends Enum<ValueType> {
    static readonly BOOLEAN: ValueType;
    static readonly DOUBLE: ValueType;
    static readonly INTEGER: ValueType;
    static readonly STRING: ValueType;
    static get(valueType: string): ValueType;
    get typeName(): string;
    isValidValue(value: string): boolean;
    parseValue(value: string): any;
    static valueOf(name: string): ValueType;
    static values(): ValueType[];
  }

}

declare module 'de.markusbordihn.easynpc.debug' {
  import { Logger, Level } from 'org.apache.logging.log4j';

  class DebugManager {
    static checkForDebugLogging(loggerName: string): void;
    static enableDebugLevel(enable: boolean): void;
    static enableDebugLevel(loggerName: string, enable: boolean): void;
    static getLogLevel(loggerName: string): Level;
    static isDebugLevel(loggerName: string): boolean;
    static isDebugMode(): boolean;
    static isDevelopmentEnvironment(): boolean;
    static setDevelopmentEnvironment(isDevelopmentEnvironment: boolean): void;
    static setLogLevel(logger: Logger, logLevel: Level): void;
  }

}

declare module 'de.markusbordihn.easynpc.entity.ai.goal' {
  import { Mob, EntityType } from 'net.minecraft.world.entity';
  import { GoalSelector } from 'net.minecraft.world.entity.ai.goal';
  import { ServerLevel } from 'net.minecraft.server.level';

  class MobGoalSelectorManager {
    static addMobGoals(mob: Mob, goalSelector: GoalSelector, targetSelector: GoalSelector, entityType: EntityType<any>, serverLevel: ServerLevel): void;
  }

}

declare module 'de.markusbordihn.easynpc.entity.easynpc.ai.control' {
  import { MoveControl } from 'net.minecraft.world.entity.ai.control';
  import { Mob } from 'net.minecraft.world.entity';

  interface JumpEasyNPCMoveControl extends MoveControl {}
  class JumpEasyNPCMoveControl extends MoveControl {
    constructor(mob: Mob);
    setDirection(yRot: number, isAggressive: boolean): void;
    setWantedMovement(speedModifier: number): void;
    tick(): void;
  }

}

declare module 'de.markusbordihn.easynpc.entity.easynpc.ai.goal' {
  import { Goal, LookAtPlayerGoal, MeleeAttackGoal } from 'net.minecraft.world.entity.ai.goal';
  import { UniformInt } from 'net.minecraft.util.valueproviders';
  import { Class } from 'java.lang';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { TargetGoal } from 'net.minecraft.world.entity.ai.goal.target';
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';

  interface BowAttackGoal<T extends EasyNPC<any> = any> extends Goal {}
  class BowAttackGoal<T extends EasyNPC<any> = any> extends Goal {
    constructor(easyNPC: T, targetDistance: number, hasLineOfSight: number, hasSeen: number);
    canContinueToUse(): boolean;
    canUse(): boolean;
    requiresUpdateEveryTick(): boolean;
    setMinAttackInterval(livingEntity: number): void;
    start(): void;
    stop(): void;
    tick(): void;
  }


  interface CrossbowAttackGoal<T extends EasyNPC<any> = any> extends Goal {}
  class CrossbowAttackGoal<T extends EasyNPC<any> = any> extends Goal {
    static readonly PATHFINDING_DELAY_RANGE: UniformInt;
    constructor(easyNPC: T, speedModifier: number, attackRange: number);
    canContinueToUse(): boolean;
    canUse(): boolean;
    requiresUpdateEveryTick(): boolean;
    start(): void;
    stop(): void;
    tick(): void;
  }


  interface CustomLookAtPlayerGoal<T extends EasyNPC<any> = any> extends LookAtPlayerGoal {}
  class CustomLookAtPlayerGoal<T extends EasyNPC<any> = any> extends LookAtPlayerGoal {
    constructor(easyNPC: T, lookAtType: Class<LivingEntity>, lookDistance: number, probability: number);

    constructor(easyNPC: T, lookAtType: Class<LivingEntity>, lookDistance: number, probability: number, onlyHorizontal: boolean);
    canContinueToUse(): boolean;
    canUse(): boolean;
    tick(): void;
  }


  interface CustomMeleeAttackGoal<T extends EasyNPC<any> = any> extends MeleeAttackGoal {}
  class CustomMeleeAttackGoal<T extends EasyNPC<any> = any> extends MeleeAttackGoal {
    constructor(easyNPC: T, speedModifier: number, mustSeeTarget: boolean);
    start(): void;
    stop(): void;
  }


  interface CustomOwnerHurtByTargetGoal<T extends EasyNPC<any> = any> extends TargetGoal {}
  class CustomOwnerHurtByTargetGoal<T extends EasyNPC<any> = any> extends TargetGoal {
    constructor(easyNPC: T);
    canUse(): boolean;
    start(): void;
  }


  interface FollowLivingEntityGoal extends Goal {}
  class FollowLivingEntityGoal extends Goal {
    constructor(easyNPC: EasyNPC<any>, livingEntity: LivingEntity, speedModifier: number, stopDistance: number, startDistance: number);
    canContinueToUse(): boolean;
    canUse(): boolean;
    start(): void;
    stop(): void;
    tick(): void;
  }


  interface GunAttackGoal<T extends EasyNPC<any> = any> extends Goal {}
  class GunAttackGoal<T extends EasyNPC<any> = any> extends Goal {
    constructor(easyNPC: T, targetDistance: number, hasLineOfSight: number, hasSeen: number);
    canContinueToUse(): boolean;
    canUse(): boolean;
    requiresUpdateEveryTick(): boolean;
    start(): void;
    stop(): void;
    tick(): void;
  }


  interface MoveBackToHomeGoal<T extends EasyNPC<any> = any> extends Goal {}
  class MoveBackToHomeGoal<T extends EasyNPC<any> = any> extends Goal {
    constructor(easyNPCEntity: T, speedModifier: number, stopDistance: number);

    constructor(easyNPCEntity: T, speedModifier: number, stopDistance: number, interval: number);
    canContinueToUse(): boolean;
    canUse(): boolean;
    start(): void;
    stop(): void;
  }


  interface RandomStrollAroundGoal<T extends EasyNPC<any> = any> extends Goal {}
  class RandomStrollAroundGoal<T extends EasyNPC<any> = any> extends Goal {
    constructor(easyNPCEntity: T, speedModifier: number);

    constructor(easyNPCEntity: T, speedModifier: number, interval: number);
    canContinueToUse(): boolean;
    canUse(): boolean;
    start(): void;
    stop(): void;
  }


  interface RandomStrollAroundHomeGoal<T extends EasyNPC<any> = any> extends Goal {}
  class RandomStrollAroundHomeGoal<T extends EasyNPC<any> = any> extends Goal {
    constructor(easyNPCEntity: T, speedModifier: number);
    canContinueToUse(): boolean;
    canUse(): boolean;
    start(): void;
    stop(): void;
  }


  interface ResetLookAtPlayerGoal<T extends EasyNPC<any> = any> extends Goal {}
  class ResetLookAtPlayerGoal<T extends EasyNPC<any> = any> extends Goal {
    constructor(easyNPC: T);
    canContinueToUse(): boolean;
    canUse(): boolean;
    start(): void;
    stop(): void;
    tick(): void;
  }


  interface ResetUniversalAngerTargetGoal<T extends EasyNPC<any> = any> extends Goal {}
  class ResetUniversalAngerTargetGoal<T extends EasyNPC<any> = any> extends Goal {
    constructor(easyNPC: T, alertOthersOfSameType: boolean);
    canUse(): boolean;
    start(): void;
  }


  interface ZombieAttackGoal<T extends EasyNPC<any> = any> extends MeleeAttackGoal {}
  class ZombieAttackGoal<T extends EasyNPC<any> = any> extends MeleeAttackGoal {
    constructor(easyNPC: T, speedModifier: number, followingTargetEvenIfNotSeen: boolean);
    start(): void;
    stop(): void;
    tick(): void;
  }

}

declare module 'de.markusbordihn.easynpc.entity.easynpc.ai.goal.CrossbowAttackGoal' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface CrossbowState extends Enum<CrossbowState> {}
  class CrossbowState extends Enum<CrossbowState> {
    static readonly UNCHARGED: CrossbowState;
    static readonly CHARGING: CrossbowState;
    static readonly CHARGED: CrossbowState;
    static readonly READY_TO_ATTACK: CrossbowState;
    static valueOf(name: string): CrossbowState;
    static values(): CrossbowState[];
  }

}

declare module 'de.markusbordihn.easynpc.entity.easynpc.data' {
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { ServerDataAccessor, ServerEntityData } from 'de.markusbordihn.easynpc.data.server';
  import { ActionEventSet, ActionEventType, ActionDataSet } from 'de.markusbordihn.easynpc.data.action';
  import { Builder } from 'SynchedEntityData';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { NeutralMob, LivingEntity, Pose, EquipmentSlot, OwnableEntity } from 'net.minecraft.world.entity';
  import { RangedAttackMob, CrossbowAttackMob } from 'net.minecraft.world.entity.monster';
  import { Holder, BlockPos } from 'net.minecraft.core';
  import { Attribute } from 'net.minecraft.world.entity.ai.attributes';
  import { EntityAttributes } from 'de.markusbordihn.easynpc.data.attribute';
  import { ConfigurationData, ConfigurationType } from 'de.markusbordihn.easynpc.data.configuration';
  import { DialogDataSet, DialogDataEntry, DialogButtonEntry } from 'de.markusbordihn.easynpc.data.dialog';
  import { UUID, EnumMap, Set, Optional, List } from 'java.util';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { DisplayAttributeDataSet, DisplayAttributeType } from 'de.markusbordihn.easynpc.data.display';
  import { Class, Enum, Boolean } from 'java.lang';
  import { ValueType } from 'de.markusbordihn.easynpc.data.type';
  import { ModelAnimationData, ModelAnimationBehavior, ModelPose, ModelType, ModelPartType } from 'de.markusbordihn.easynpc.data.model';
  import { CustomPosition } from 'de.markusbordihn.easynpc.data.position';
  import { CustomRotation } from 'de.markusbordihn.easynpc.data.rotation';
  import { CustomScale } from 'de.markusbordihn.easynpc.data.scale';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { GroundPathNavigation } from 'net.minecraft.world.entity.ai.navigation';
  import { ObjectiveDataSet, ObjectiveType, ObjectiveDataEntry } from 'de.markusbordihn.easynpc.data.objective';
  import { Profession } from 'de.markusbordihn.easynpc.data.profession';
  import { Component } from 'net.minecraft.network.chat';
  import { RenderDataEntry } from 'de.markusbordihn.easynpc.data.render';
  import { SkinType, SkinModel, SkinDataEntry } from 'de.markusbordihn.easynpc.data.skin';
  import { SoundDataSet, SoundType, SoundDataEntry } from 'de.markusbordihn.easynpc.data.sound';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { StatusDataType } from 'de.markusbordihn.easynpc.data.status';
  import { TickerType } from 'de.markusbordihn.easynpc.data.ticker';
  import { Merchant, MerchantOffers, MerchantOffer } from 'net.minecraft.world.item.trading';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { TradingDataSet } from 'de.markusbordihn.easynpc.data.trading';
  import { Provider } from 'HolderLookup';
  import { Stream } from 'java.util.stream';
  import { VillagerProfession, VillagerType } from 'net.minecraft.world.entity.npc';

  interface ActionEventDataCapable<E extends Mob = any> extends EasyNPC<E> {}
  class ActionEventDataCapable<E extends Mob = any> extends EasyNPC<E> {
    static readonly CUSTOM_DATA_ACTION_EVENT_SET: ServerDataAccessor;
    static readonly CUSTOM_DATA_ACTION_PERMISSION_LEVEL: ServerDataAccessor;
    static readonly DATA_ACTION_DATA_TAG: string;
    static readonly DATA_ACTION_PERMISSION_LEVEL_TAG: string;
    addAdditionalActionData(compoundTag: CompoundTag): void;
    clearActionEventSet(): void;
    defineCustomActionData(): void;
    defineSynchedActionData(builder: Builder): void;
    get actionEventSet(): ActionEventSet;
    get actionPermissionLevel(): number;
    getActionDataSet(actionEventType: ActionEventType): ActionDataSet;
    handleActionEvent(actionEventType: ActionEventType): void;
    handleActionEvent(actionEventType: ActionEventType, serverPlayer: ServerPlayer): void;
    hasActionEvent(actionEventType: ActionEventType): boolean;
    hasActionEventSet(): boolean;
    readAdditionalActionData(compoundTag: CompoundTag): void;
    registerDefaultActionInteractionEvents(): void;
    set actionEventSet(actions: ActionEventSet);
    set actionPermissionLevel(actionPermissionLevel: number);
  }


  interface AttackDataCapable<E extends Mob = any> extends EasyNPC<E>, NeutralMob, RangedAttackMob, CrossbowAttackMob {}
  class AttackDataCapable<E extends Mob = any> extends EasyNPC<E> {
    addAdditionalAttackData(compoundTag: CompoundTag): void;
    defineSynchedAttackData(builder: Builder): void;
    get attackAnimationTick(): number;
    isChargingCrossbow(): boolean;
    performRangedAttack(livingEntity: LivingEntity, damage: number): void;
    readAdditionalAttackData(compoundTag: CompoundTag): void;
    setChargingCrossbow(isCharging: boolean): void;
  }


  interface AttributeDataCapable<E extends Mob = any> extends EasyNPC<E> {}
  class AttributeDataCapable<E extends Mob = any> extends EasyNPC<E> {
    addAdditionalAttributeData(compoundTag: CompoundTag): void;
    defineSynchedAttributeData(builder: Builder): void;
    get attributeSilent(): boolean;
    get entityAttributes(): EntityAttributes;
    getBaseAttribute(attribute: Holder<Attribute>): number;
    readAdditionalAttributeData(compoundTag: CompoundTag): void;
    refreshEntityAttributes(): void;
    set attributeSilent(silent: boolean);
    set entityAttributes(entityAttributes: EntityAttributes);
    setBaseAttribute(attribute: Holder<Attribute>, value: number): void;
  }


  interface ConfigDataCapable<T extends Mob = any> extends EasyNPC<T> {}
  class ConfigDataCapable<T extends Mob = any> extends EasyNPC<T> {
    static readonly DATA_EASY_NPC_DATA_VERSION_TAG: string;
    addAdditionalConfigData(compoundTag: CompoundTag): void;
    readAdditionalConfigData(compoundTag: CompoundTag): void;
  }


  interface ConfigurationDataCapable<T extends Mob = any> extends EasyNPC<T> {}
  class ConfigurationDataCapable<T extends Mob = any> extends EasyNPC<T> {
    get configurationData(): ConfigurationData;
    supportsConfigurationType(type: ConfigurationType): boolean;
  }


  interface DialogDataCapable<T extends Mob = any> extends EasyNPC<T> {}
  class DialogDataCapable<T extends Mob = any> extends EasyNPC<T> {
    static readonly CUSTOM_DATA_DIALOG_DATA_SET: ServerDataAccessor;
    static readonly DATA_DIALOG_DATA_TAG: string;
    addAdditionalDialogData(compoundTag: CompoundTag): void;
    clearDialogDataSet(): void;
    defineCustomDialogData(): void;
    defineSynchedDialogData(builder: Builder): void;
    get dialogDataSet(): DialogDataSet;
    get entityDialogLeft(): number;
    get entityDialogScaling(): number;
    get entityDialogTop(): number;
    getDialogButton(dialogId: UUID, dialogButtonId: UUID): DialogButtonEntry;
    getDialogId(dialogLabel: string): UUID;
    hasDialog(): boolean;
    hasDialog(dialogLabel: string): boolean;
    hasDialog(dialogId: UUID): boolean;
    hasDialogButton(dialogId: UUID, dialogButtonId: UUID): boolean;
    openDefaultDialog(serverPlayer: ServerPlayer): void;
    openDialog(serverPlayer: ServerPlayer, dialogId: UUID): void;
    readAdditionalDialogData(compoundTag: CompoundTag): void;
    removeDialog(dialogId: UUID): boolean;
    removeDialogButton(dialogId: UUID, dialogButtonId: UUID): boolean;
    set dialogDataSet(dialogDataSet: DialogDataSet);
    setDialog(dialogId: UUID, dialogData: DialogDataEntry): void;
  }


  interface DisplayAttributeDataCapable<E extends Mob = any> extends EasyNPC<E> {}
  class DisplayAttributeDataCapable<E extends Mob = any> extends EasyNPC<E> {
    static readonly DATA_DISPLAY_ATTRIBUTE_TAG: string;
    static readonly STREAM_CODEC: StreamCodec;
    addAdditionalDisplayAttributeData(compoundTag: CompoundTag): void;
    clearDisplayAttributeData(): void;
    defineSynchedDisplayAttributeData(builder: Builder): void;
    get displayAttributeData(): DisplayAttributeDataSet;
    getDisplayBooleanAttribute(displayAttributeType: DisplayAttributeType): boolean;
    getDisplayEnumAttribute<T extends Enum<T>>(displayAttributeType: DisplayAttributeType, enumClass: Class<T>): T;
    getDisplayIntAttribute(displayAttributeType: DisplayAttributeType): number;
    getDisplayStringAttribute(displayAttributeType: DisplayAttributeType): string;
    hasDisplayAttribute(displayAttributeType: DisplayAttributeType): boolean;
    readAdditionalDisplayAttributeData(compoundTag: CompoundTag): void;
    set displayAttributeData(displayAttributeDataSet: DisplayAttributeDataSet);
    setDisplayAttribute<T>(displayAttributeType: DisplayAttributeType, valueType: ValueType, value: T): void;
    setDisplayAttribute(displayAttributeType: DisplayAttributeType, enumValue: Enum<any>): void;
    syncDisplayAttributesToEntity(displayAttributeDataSet: DisplayAttributeDataSet): void;
  }


  interface ModelAnimationDataCapable<T extends Mob = any> extends EasyNPC<T> {}
  class ModelAnimationDataCapable<T extends Mob = any> extends EasyNPC<T> {
    static readonly EASY_NPC_DATA_ANIMATION_DATA_TAG: string;
    addAdditionalModelAnimationData(compoundTag: CompoundTag): void;
    defineSynchedModelAnimationData(builder: Builder): void;
    get modelAnimationBehavior(): ModelAnimationBehavior;
    get modelAnimationData(): ModelAnimationData;
    readAdditionalModelAnimationData(compoundTag: CompoundTag): void;
    set modelAnimationBehavior(behavior: ModelAnimationBehavior);
    set modelAnimationData(animationData: ModelAnimationData);
  }


  interface ModelDataCapable<T extends Mob = any> extends EasyNPC<T>, ModelAnimationDataCapable<T>, ModelPositionDataCapable<T>, ModelRotationDataCapable<T>, ModelScaleDataCapable<T>, ModelVisibilityDataCapable<T> {}
  class ModelDataCapable<T extends Mob = any> extends EasyNPC<T> {
    static readonly EASY_NPC_DATA_MODEL_DATA_TAG: string;
    static readonly EASY_NPC_DATA_MODEL_DEFAULT_POSE_TAG: string;
    static readonly EASY_NPC_DATA_MODEL_POSE_TAG: string;
    addAdditionalModelData(compoundTag: CompoundTag): void;
    canUseArmor(): boolean;
    canUseMainHand(): boolean;
    canUseOffHand(): boolean;
    defineSynchedModelData(builder: Builder): void;
    get defaultPose(): Pose;
    get modelPose(): ModelPose;
    get modelType(): ModelType;
    hasChangedModel(): boolean;
    readAdditionalModelData(compoundTag: CompoundTag): void;
    set defaultPose(pose: Pose);
    set modelPose(modelPose: ModelPose);
  }


  interface ModelPositionDataCapable<T extends Mob = any> extends EasyNPC<T> {}
  class ModelPositionDataCapable<T extends Mob = any> extends EasyNPC<T> {
    static readonly DEFAULT_MODEL_PART_POSITION: CustomPosition;
    static readonly EASY_NPC_DATA_MODEL_POSITION_TAG: string;
    static readonly MODEL_PART_POSITION_STREAM_CODEC: StreamCodec;
    addAdditionalModelPositionData(compoundTag: CompoundTag): void;
    defineSynchedModelPositionData(builder: Builder): void;
    get modelPartPosition(): EnumMap<ModelPartType, CustomPosition>;
    getModelPartPosition(modelPartType: ModelPartType): CustomPosition;
    hasChangedModelPosition(): boolean;
    readAdditionalModelPositionData(compoundTag: CompoundTag): void;
    set modelPartPosition(modelPartMap: EnumMap<ModelPartType, CustomPosition>);
    setModelPartPosition(modelPartType: ModelPartType, Position: CustomPosition): void;
  }


  interface ModelRotationDataCapable<T extends Mob = any> extends EasyNPC<T> {}
  class ModelRotationDataCapable<T extends Mob = any> extends EasyNPC<T> {
    static readonly DEFAULT_MODEL_PART_ROTATION: CustomRotation;
    static readonly EASY_NPC_DATA_MODEL_ROTATION_TAG: string;
    static readonly MODEL_PART_ROTATION_STREAM_CODEC: StreamCodec;
    addAdditionalModelRotationData(compoundTag: CompoundTag): void;
    defineSynchedModelRotationData(builder: Builder): void;
    get modelPartRotation(): EnumMap<ModelPartType, CustomRotation>;
    getModelPartRotation(modelPartType: ModelPartType): CustomRotation;
    hasChangedModelRotation(): boolean;
    readAdditionalModelRotationData(compoundTag: CompoundTag): void;
    set modelPartRotation(modelPartMap: EnumMap<ModelPartType, CustomRotation>);
    setModelPartRotation(modelPartType: ModelPartType, rotation: CustomRotation): void;
    setModelRotation(y: number): void;
    setModelRotation(x: number, y: number, z: number): void;
  }


  interface ModelScaleDataCapable<T extends Mob = any> extends EasyNPC<T> {}
  class ModelScaleDataCapable<T extends Mob = any> extends EasyNPC<T> {
    static readonly DEFAULT_MODEL_PART_SCALE: CustomScale;
    static readonly DEFAULT_MODEL_SCALE: CustomScale;
    static readonly EASY_NPC_DATA_MODEL_SCALE_TAG: string;
    static readonly MODEL_PART_SCALE_STREAM_CODEC: StreamCodec;
    addAdditionalModelScaleData(compoundTag: CompoundTag): void;
    defineSynchedModelScaleData(builder: Builder): void;
    get defaultModelScale(): CustomScale;
    get modelPartScale(): EnumMap<ModelPartType, CustomScale>;
    getModelPartScale(modelPartType: ModelPartType): CustomScale;
    hasChangedModelScale(): boolean;
    readAdditionalModelScaleData(compoundTag: CompoundTag): void;
    set modelPartScale(modelPartMap: EnumMap<ModelPartType, CustomScale>);
    setModelPartScale(modelPartType: ModelPartType, Scale: CustomScale): void;
  }


  interface ModelVisibilityDataCapable<T extends Mob = any> extends EasyNPC<T> {}
  class ModelVisibilityDataCapable<T extends Mob = any> extends EasyNPC<T> {
    static readonly EASY_NPC_DATA_MODEL_VISIBLE_TAG: string;
    static readonly MODEL_PART_VISIBILITY_STREAM_CODEC: StreamCodec;
    addAdditionalModelVisibilityData(compoundTag: CompoundTag): void;
    defineSynchedModelVisibilityData(builder: Builder): void;
    get modelPartVisibility(): EnumMap<ModelPartType, boolean>;
    getModelPartVisibility(equipmentSlot: EquipmentSlot): boolean;
    getModelPartVisibility(modelPartType: ModelPartType): boolean;
    hasChangedModelVisibility(): boolean;
    readAdditionalModelVisibilityData(compoundTag: CompoundTag): void;
    set modelPartVisibility(modelPartMap: EnumMap<ModelPartType, boolean>);
    setModelPartVisibility(modelPartType: ModelPartType, visible: boolean): void;
    setModelPartVisibility(equipmentSlot: EquipmentSlot, visible: boolean): void;
  }


  interface NavigationDataCapable<T extends Mob = any> extends EasyNPC<T> {}
  class NavigationDataCapable<T extends Mob = any> extends EasyNPC<T> {
    static readonly DATA_HOME_TAG: string;
    static readonly DATA_NAVIGATION_TAG: string;
    static readonly TRAVEL_EVENT_TICK: number;
    addAdditionalNavigationData(compoundTag: CompoundTag): void;
    canFly(): boolean;
    canJump(): boolean;
    defineSynchedNavigationData(builder: Builder): void;
    get groundPathNavigation(): GroundPathNavigation;
    get homePosition(): BlockPos;
    handleNavigationTravelEvent(vec3: Vec3): void;
    hasHomePosition(): boolean;
    isFlying(): boolean;
    readAdditionalNavigationData(compoundTag: CompoundTag): void;
    refreshGroundNavigation(): void;
    set homePosition(blockPos: BlockPos);
    setPosition(pos: Vec3): void;
  }


  interface ObjectiveDataCapable<T extends Mob = any> extends EasyNPC<T> {}
  class ObjectiveDataCapable<T extends Mob = any> extends EasyNPC<T> {
    static readonly CUSTOM_DATA_OBJECTIVE_DATA_SET: ServerDataAccessor;
    static readonly CUSTOM_DATA_TARGETED_ENTITY_SET: ServerDataAccessor;
    static readonly CUSTOM_DATA_TARGETED_PLAYER_SET: ServerDataAccessor;
    static readonly CUSTOM_OBJECTIVE_DELAYED_REGISTRATION_TICK: number;
    static readonly DATA_HAS_ENTITY_TARGET_TAG: string;
    static readonly DATA_HAS_OBJECTIVE_TAG: string;
    static readonly DATA_HAS_PLAYER_TARGET_TAG: string;
    static readonly DATA_HAS_TRAVEL_TARGET_TAG: string;
    static readonly DATA_OBJECTIVE_DATA_TAG: string;
    addAdditionalObjectiveData(compoundTag: CompoundTag): void;
    addObjective(objectiveDataEntry: ObjectiveDataEntry): void;
    addOrUpdateCustomObjective(objectiveDataEntry: ObjectiveDataEntry): boolean;
    defineCustomObjectiveData(): void;
    get objectiveDataSet(): ObjectiveDataSet;
    getObjective(objectiveType: ObjectiveType): ObjectiveDataEntry;
    getObjectiveEntry(objectiveType: ObjectiveType): Optional<ObjectiveDataEntry>;
    handleCustomObjectiveBaseTick(): void;
    hasEntityTargetObjectives(): boolean;
    hasObjective(objectiveId: string): boolean;
    hasObjective(objectiveType: ObjectiveType): boolean;
    hasObjective(objectiveDataEntry: ObjectiveDataEntry): boolean;
    hasObjectives(): boolean;
    hasObjectives(objectiveTypes: Set<ObjectiveType>): boolean;
    hasOwnerTargetObjectives(): boolean;
    hasPlayerTargetObjectives(): boolean;
    hasTravelTargetObjectives(): boolean;
    onEasyNPCJoinUpdateObjective(easyNPC: EasyNPC<any>): void;
    onEasyNPCLeaveUpdateObjective(easyNPC: EasyNPC<any>): void;
    onLivingEntityJoinUpdateObjective(livingEntity: LivingEntity): void;
    onLivingEntityLeaveUpdateObjective(livingEntity: LivingEntity): void;
    onPlayerJoinUpdateObjective(serverPlayer: ServerPlayer): void;
    onPlayerLeaveUpdateObjective(serverPlayer: ServerPlayer): void;
    readAdditionalObjectiveData(compoundTag: CompoundTag): void;
    refreshCustomObjectives(): void;
    registerAttributeBasedObjectives(): void;
    registerCustomObjectives(): void;
    registerStandardObjectives(): void;
    removeCustomObjective(objectiveType: ObjectiveType): boolean;
    removeCustomObjective(objectiveDataEntry: ObjectiveDataEntry): boolean;
    removeObjective(objectiveType: ObjectiveType): boolean;
    set objectiveDataSet(objectiveDataSet: ObjectiveDataSet);
  }


  interface OwnerDataCapable<T extends Mob = any> extends EasyNPC<T>, OwnableEntity {}
  class OwnerDataCapable<T extends Mob = any> extends EasyNPC<T> {
    static readonly DATA_OWNER_TAG: string;
    addAdditionalOwnerData(compoundTag: CompoundTag): void;
    defineSynchedOwnerData(builder: Builder): void;
    get nPCOwnerName(): string;
    get owner(): LivingEntity;
    get ownerUUID(): UUID;
    hasNPCOwner(): boolean;
    isNPCOwnedBy(livingEntity: LivingEntity): boolean;
    isNPCOwner(serverPlayer: ServerPlayer): boolean;
    isNPCOwner(uuid: UUID): boolean;
    readAdditionalOwnerData(compoundTag: CompoundTag): void;
    setNPCOwner(owner: LivingEntity): void;
    setNPCOwnerUUID(uuid: UUID): void;
  }


  interface PresetDataCapable<T extends Mob = any> extends EasyNPC<T> {}
  class PresetDataCapable<T extends Mob = any> extends EasyNPC<T> {
    static readonly CUSTOM_DATA_PRESET_UUID: ServerDataAccessor;
    static readonly PRESET_UUID_TAG: string;
    static readonly PRESET_METADATA_TAG: string;
    static readonly ENTITY_UUID_TAG: string;
    static readonly ENTITY_DATA_VOLATILE_FIELDS: List;
    addAdditionalPresetData(compoundTag: CompoundTag): void;
    defineCustomPresetData(): void;
    get presetUUID(): UUID;
    hasPresetUUID(): boolean;
    importPresetData(compoundTag: CompoundTag): void;
    readAdditionalPresetData(compoundTag: CompoundTag): void;
    serializePresetData(): CompoundTag;
    set presetUUID(uuid: UUID);
  }


  interface ProfessionDataCapable<T extends Mob = any> extends EasyNPC<T> {}
  class ProfessionDataCapable<T extends Mob = any> extends EasyNPC<T> {
    static readonly DATA_PROFESSION_TAG: string;
    addAdditionalProfessionData(compoundTag: CompoundTag): void;
    defineSynchedProfessionData(builder: Builder): void;
    get defaultProfession(): Profession;
    get profession(): Profession;
    get professionName(): Component;
    get professions(): Profession[];
    getProfession(name: string): Profession;
    hasProfessions(): boolean;
    readAdditionalProfessionData(compoundTag: CompoundTag): void;
    set profession(profession: Profession);
  }


  interface RenderDataCapable<E extends Mob = any> extends EasyNPC<E> {}
  class RenderDataCapable<E extends Mob = any> extends EasyNPC<E> {
    static readonly DATA_RENDER_DATA_TAG: string;
    addAdditionalRenderData(compoundTag: CompoundTag): void;
    defineSynchedRenderData(builder: Builder): void;
    get renderDataEntry(): RenderDataEntry;
    readAdditionalRenderData(compoundTag: CompoundTag): void;
    setRenderData(renderData: RenderDataEntry): void;
  }


  interface ServerDataCapable<E extends Mob = any> extends EasyNPC<E> {}
  class ServerDataCapable<E extends Mob = any> extends EasyNPC<E> {
    defineServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
    defineServerEntityData(): void;
    get serverEntityData(): ServerEntityData;
    getServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>): T;
    hasServerEntityData(): boolean;
    setServerEntityData<T>(entityDataAccessor: ServerDataAccessor<T>, entityData: T): void;
  }


  interface SkinDataCapable<T extends Mob = any> extends EasyNPC<T> {}
  class SkinDataCapable<T extends Mob = any> extends EasyNPC<T> {
    static readonly EASY_NPC_DATA_SKIN_DATA_TAG: string;
    addAdditionalSkinData(compoundTag: CompoundTag): void;
    defineSynchedSkinData(builder: Builder): void;
    get entitySkinScaling(): number;
    get skinDataEntry(): SkinDataEntry;
    get skinModel(): SkinModel;
    get skinType(): SkinType;
    get skinURL(): string;
    get skinUUID(): UUID;
    readAdditionalSkinData(compoundTag: CompoundTag): void;
    set skinDataEntry(skinDataEntry: SkinDataEntry);
  }


  interface SoundDataCapable<E extends Mob = any> extends EasyNPC<E> {}
  class SoundDataCapable<E extends Mob = any> extends EasyNPC<E> {
    static readonly EASY_NPC_DATA_SOUND_DATA_TAG: string;
    addAdditionalSoundData(compoundTag: CompoundTag): void;
    clearSoundDataSet(): void;
    defineSynchedSoundData(builder: Builder): void;
    get defaultDeathSound(): SoundEvent;
    get soundDataSet(): SoundDataSet;
    getDefaultSound(soundType: SoundType): SoundDataEntry;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    getDefaultSoundEvent(soundType: SoundType): SoundEvent;
    hasDefaultSound(soundType: SoundType): boolean;
    playDefaultAmbientSound(): void;
    playDefaultHurtSound(damageSource: DamageSource): void;
    playDefaultSound(soundType: SoundType): void;
    playDefaultStepSound(blockPos: BlockPos, blockState: BlockState): void;
    playDefaultTradeUpdatedSound(yesSound: boolean): void;
    readAdditionalSoundData(compoundTag: CompoundTag): void;
    refreshSoundDataSet(): void;
    registerDefaultSoundData(variant: Enum<any>): void;
    set soundDataSet(soundDataSet: SoundDataSet);
  }


  interface StatusDataCapable<T extends Mob = any> extends EasyNPC<T> {}
  class StatusDataCapable<T extends Mob = any> extends EasyNPC<T> {
    static readonly DATA_STATUS_DATA_TAG: string;
    addAdditionalStatusData(compoundTag: CompoundTag): void;
    get statusDataFlags(): EnumMap<StatusDataType, boolean>;
    getStatusDataFlag(key: StatusDataType): boolean;
    readAdditionalStatusData(compoundTag: CompoundTag): void;
    setStatusDataFlag(key: StatusDataType, value: boolean): void;
  }


  interface TickerDataCapable<T extends Mob = any> extends EasyNPC<T> {}
  class TickerDataCapable<T extends Mob = any> extends EasyNPC<T> {
    checkAndIncreaseTicker(tickerType: TickerType, value: number): boolean;
    getTicker(var1: TickerType): number;
    increaseTicker(tickerType: TickerType, value: number): void;
    resetTicker(tickerType: TickerType): void;
    setTicker(var1: TickerType, var2: number): void;
  }


  interface TradingDataCapable<E extends Mob = any> extends EasyNPC<E>, Merchant {}
  class TradingDataCapable<E extends Mob = any> extends EasyNPC<E> {
    static readonly DATA_OFFERS_TAG: string;
    static readonly DATA_TRADING_DATA_TAG: string;
    addAdditionalTradingData(compoundTag: CompoundTag, provider: Provider): void;
    defineSynchedTradingData(builder: Builder): void;
    get merchantTradingOffers(): MerchantOffers;
    get notifyTradeSound(): SoundEvent;
    get offers(): MerchantOffers;
    get tradingDataSet(): TradingDataSet;
    get tradingOffers(): MerchantOffers;
    get tradingPlayer(): Player;
    get villagerXp(): number;
    hasTradingData(): boolean;
    isClientSideInstance(): boolean;
    isValidTradingOffer(itemA: ItemStack, itemB: ItemStack, itemResult: ItemStack): boolean;
    notifyTrade(merchantOffer: MerchantOffer): void;
    notifyTradeUpdated(itemStack: ItemStack): void;
    openTradingScreen(serverPlayer: ServerPlayer): void;
    overrideOffers(merchantOffers: MerchantOffers): void;
    overrideXp(experience: number): void;
    readAdditionalTradingData(compoundTag: CompoundTag, provider: Provider): void;
    resetTradingOffers(): void;
    rewardMerchantTradeXp(merchantOffer: MerchantOffer): void;
    rewardTradeXp(var1: MerchantOffer): void;
    set merchantTradingOffers(var1: MerchantOffers);
    set tradingDataSet(tradingDataSet: TradingDataSet);
    set tradingOffers(merchantOffers: MerchantOffers);
    set tradingPlayer(var1: Player);
    showProgressBar(): boolean;
    stopMerchantTrading(): void;
    stopTrading(): void;
    updateMerchantTradingOffers(): void;
    updateTradingDataSet(): void;
  }


  interface VariantDataCapable<T extends Mob = any> extends EasyNPC<T> {}
  class VariantDataCapable<T extends Mob = any> extends EasyNPC<T> {
    static readonly EASY_NPC_DATA_VARIANT_TYPE_TAG: string;
    addAdditionalVariantData(compoundTag: CompoundTag): void;
    defineSynchedVariantData(builder: Builder): void;
    get defaultSkinVariantType(): Enum<any>;
    get skinVariantType(): Enum<any>;
    get skinVariantTypeName(): Component;
    get skinVariantTypeNames(): Stream<string>;
    get skinVariantTypes(): Enum<any>;
    getSkinVariantType(name: string): Enum<any>;
    getVillagerProfession(variantType: Enum<any>): VillagerProfession;
    getVillagerType(variantType: Enum<any>): VillagerType;
    handleSkinVariantTypeChange(variant: Enum<any>): void;
    hasVariantTypeCrossedArms(): boolean;
    hasVariantTypeCrossedArms(variant: Enum<any>): boolean;
    hasVariantTypeSaddled(): boolean;
    hasVariantTypeSaddled(variant: Enum<any>): boolean;
    readAdditionalVariantData(compoundTag: CompoundTag): void;
    set skinVariantType(variant: Enum<any>);
    setSkinVariantType(name: string): void;
  }

}

declare module 'de.markusbordihn.easynpc.entity.easynpc' {
  import { Npc } from 'net.minecraft.world.entity.npc';
  import { Logger } from 'org.apache.logging.log4j';
  import { Random, UUID } from 'java.util';
  import { NPCType } from 'de.markusbordihn.easynpc.data.npc';
  import { FakePlayer } from 'de.markusbordihn.easynpc.server.player';
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { LookControl } from 'net.minecraft.world.entity.ai.control';
  import { PathfinderMob, LivingEntity, Entity, Mob, Saddleable, SpawnGroupData, EntityType } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { Merchant } from 'net.minecraft.world.item.trading';
  import { RangedAttackMob, CrossbowAttackMob } from 'net.minecraft.world.entity.monster';
  import { ProfilerFiller } from 'net.minecraft.util.profiling';
  import { Component } from 'net.minecraft.network.chat';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { DimensionTransition } from 'net.minecraft.world.level.portal';
  import { Builder } from 'SynchedEntityData';
  import { SynchedDataIndex } from 'de.markusbordihn.easynpc.data.synched';
  import { GoalSelector } from 'net.minecraft.world.entity.ai.goal';
  import { ActionEventDataCapable, AttackDataCapable, AttributeDataCapable, ConfigDataCapable, ConfigurationDataCapable, DialogDataCapable, DisplayAttributeDataCapable, ModelDataCapable, NavigationDataCapable, ObjectiveDataCapable, OwnerDataCapable, PresetDataCapable, ProfessionDataCapable, RenderDataCapable, ServerDataCapable, SkinDataCapable, SoundDataCapable, StatusDataCapable, TickerDataCapable, TradingDataCapable, VariantDataCapable } from 'de.markusbordihn.easynpc.entity.easynpc.data';
  import { ActionHandler, AttributeHandler, BaseTickHandler } from 'de.markusbordihn.easynpc.entity.easynpc.handlers';
  import { Enum } from 'java.lang';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';

  interface EasyNPC<E extends Mob = any> extends EasyNPCDataAccessors<E>, Npc {}
  class EasyNPC<E extends Mob = any> extends EasyNPCDataAccessors<E> {
    static readonly log: Logger;
    static readonly randomNumber: Random;
    defineSynchedEntityData<T>(var1: Builder, var2: SynchedDataIndex, var3: T): void;
    get crossbowAttackMob(): CrossbowAttackMob;
    get entity(): Entity;
    get entityGoalSelector(): GoalSelector;
    get entityLevel(): Level;
    get entityLookControl(): LookControl;
    get entityServerLevel(): ServerLevel;
    get entityTargetSelector(): GoalSelector;
    get entityTypeId(): string;
    get entityTypeName(): Component;
    get entityUUID(): UUID;
    get livingEntity(): LivingEntity;
    get merchant(): Merchant;
    get mob(): Mob;
    get nPCDataVersion(): number;
    get nPCType(): NPCType;
    get pathfinderMob(): PathfinderMob;
    get profiler(): ProfilerFiller;
    get rangedAttackMob(): RangedAttackMob;
    getFakePlayer(var1: ServerLevel, var2: BlockPos): FakePlayer;
    getSynchedEntityData<T>(var1: SynchedDataIndex): T;
    handleChangeDimensionEvent(dimensionTransition: DimensionTransition): void;
    handleDieEvent(damageSource: DamageSource): void;
    handleEasyNPCJoinEvent(entity: EasyNPC<any>): void;
    handleEasyNPCLeaveEvent(entity: EasyNPC<any>): void;
    handleHurtEvent(damageSource: DamageSource, damage: number): void;
    handleKillEvent(): void;
    handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
    handlePlayerJoinEvent(serverPlayer: ServerPlayer): void;
    handlePlayerLeaveEvent(serverPlayer: ServerPlayer): void;
    isClientSideInstance(): boolean;
    isServerSideInstance(): boolean;
    set nPCDataVersion(var1: number);
    setSynchedEntityData<T>(synchedDataIndex: SynchedDataIndex, data: T): void;
    setSynchedEntityData<T>(var1: SynchedDataIndex, var2: T, var3: boolean): void;
  }


  interface EasyNPCBase<E extends Mob = any> extends Saddleable, EasyNPC<E>, ActionEventDataCapable<E>, ActionHandler<E>, AttackDataCapable<E>, AttributeDataCapable<E>, AttributeHandler<E>, BaseTickHandler<E>, ConfigDataCapable<E>, ConfigurationDataCapable<E>, DialogDataCapable<E>, DisplayAttributeDataCapable<E>, ModelDataCapable<E>, NavigationDataCapable<E>, ObjectiveDataCapable<E>, OwnerDataCapable<E>, PresetDataCapable<E>, ProfessionDataCapable<E>, RenderDataCapable<E>, ServerDataCapable<E>, SkinDataCapable<E>, SoundDataCapable<E>, StatusDataCapable<E>, TickerDataCapable<E>, TradingDataCapable<E>, VariantDataCapable<E> {}
  class EasyNPCBase<E extends Mob = any> extends Saddleable {
    addEasyNPCBaseAdditionalSaveData(compoundTag: CompoundTag, provider: Provider): void;
    defineEasyNPCBaseServerSideData(): void;
    defineEasyNPCBaseSyncedData(builder: Builder): void;
    finalizeEasyNPCSpawn(spawnGroupData: SpawnGroupData): SpawnGroupData;
    readEasyNPCBaseAdditionalSaveData(compoundTag: CompoundTag, provider: Provider): void;
    registerEasyNPCDefaultVariant(variant: Enum<any>): void;
  }


  class EasyNPCDataAccessors<E extends Mob = any> {
    get easyNPCActionEventData(): ActionEventDataCapable<E>;
    get easyNPCActionHandler(): ActionHandler<E>;
    get easyNPCAttackData(): AttackDataCapable<E>;
    get easyNPCAttributeData(): AttributeDataCapable<E>;
    get easyNPCAttributeHandler(): AttributeHandler<E>;
    get easyNPCConfigData(): ConfigDataCapable<E>;
    get easyNPCConfigurationData(): ConfigurationDataCapable<E>;
    get easyNPCDialogData(): DialogDataCapable<E>;
    get easyNPCDisplayAttributeData(): DisplayAttributeDataCapable<E>;
    get easyNPCModelData(): ModelDataCapable<E>;
    get easyNPCNavigationData(): NavigationDataCapable<E>;
    get easyNPCObjectiveData(): ObjectiveDataCapable<E>;
    get easyNPCOwnerData(): OwnerDataCapable<E>;
    get easyNPCPresetData(): PresetDataCapable<E>;
    get easyNPCProfessionData(): ProfessionDataCapable<E>;
    get easyNPCRenderData(): RenderDataCapable<E>;
    get easyNPCServerData(): ServerDataCapable<E>;
    get easyNPCSkinData(): SkinDataCapable<E>;
    get easyNPCSoundData(): SoundDataCapable<E>;
    get easyNPCStatusData(): StatusDataCapable<E>;
    get easyNPCTickerData(): TickerDataCapable<E>;
    get easyNPCTradingData(): TradingDataCapable<E>;
    get easyNPCVariantData(): VariantDataCapable<E>;
  }


  class EasyNPCEntityAccess {
    static getCrossbowAttackMob<E extends Mob>(easyNPC: EasyNPC<E>): CrossbowAttackMob;
    static getEntity<E extends Mob>(easyNPC: EasyNPC<E>): Entity;
    static getEntityType<E extends Mob>(easyNPC: EasyNPC<E>): EntityType<any>;
    static getEntityTypeId<E extends Mob>(easyNPC: EasyNPC<E>): string;
    static getEntityTypeName<E extends Mob>(easyNPC: EasyNPC<E>): Component;
    static getEntityUUID<E extends Mob>(easyNPC: EasyNPC<E>): UUID;
    static getLevel<E extends Mob>(easyNPC: EasyNPC<E>): Level;
    static getLivingEntity<E extends Mob>(easyNPC: EasyNPC<E>): LivingEntity;
    static getLookControl<E extends Mob>(easyNPC: EasyNPC<E>): LookControl;
    static getMerchant<E extends Mob>(easyNPC: EasyNPC<E>): Merchant;
    static getMob<E extends Mob>(easyNPC: EasyNPC<E>): Mob;
    static getPathfinderMob<E extends Mob>(easyNPC: EasyNPC<E>): PathfinderMob;
    static getProfiler<E extends Mob>(easyNPC: EasyNPC<E>): ProfilerFiller;
    static getRangedAttackMob<E extends Mob>(easyNPC: EasyNPC<E>): RangedAttackMob;
    static getServerLevel<E extends Mob>(easyNPC: EasyNPC<E>): ServerLevel;
    static isClientSide<E extends Mob>(easyNPC: EasyNPC<E>): boolean;
    static isServerSide<E extends Mob>(easyNPC: EasyNPC<E>): boolean;
  }

}

declare module 'de.markusbordihn.easynpc.entity.easynpc.event' {
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Mob, LivingEntity } from 'net.minecraft.world.entity';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { DimensionTransition } from 'net.minecraft.world.level.portal';

  class EasyNPCEventHandler {
    static handleChangeDimensionEvent<E extends Mob>(easyNPC: EasyNPC<E>, dimensionTransition: DimensionTransition): void;
    static handleDieEvent<E extends Mob>(easyNPC: EasyNPC<E>, damageSource: DamageSource): void;
    static handleEasyNPCJoinEvent<E extends Mob>(easyNPC: EasyNPC<E>, entity: EasyNPC<any>): void;
    static handleEasyNPCLeaveEvent<E extends Mob>(easyNPC: EasyNPC<E>, entity: EasyNPC<any>): void;
    static handleHurtEvent<E extends Mob>(easyNPC: EasyNPC<E>, damageSource: DamageSource, damage: number): void;
    static handleKillEvent<E extends Mob>(easyNPC: EasyNPC<E>): void;
    static handleLivingEntityJoinEvent<E extends Mob>(easyNPC: EasyNPC<E>, livingEntity: LivingEntity): void;
    static handleLivingEntityLeaveEvent<E extends Mob>(easyNPC: EasyNPC<E>, livingEntity: LivingEntity): void;
    static handlePlayerJoinEvent<E extends Mob>(easyNPC: EasyNPC<E>, serverPlayer: ServerPlayer): void;
    static handlePlayerLeaveEvent<E extends Mob>(easyNPC: EasyNPC<E>, serverPlayer: ServerPlayer): void;
  }

}

declare module 'de.markusbordihn.easynpc.entity.easynpc.handlers.action' {
  import { ActionDataEntry } from 'de.markusbordihn.easynpc.data.action';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { DialogDataCapable, TradingDataCapable } from 'de.markusbordihn.easynpc.entity.easynpc.data';
  import { BlockPos } from 'net.minecraft.core';

  class ActionValidator {
    static validateActionData(actionDataEntry: ActionDataEntry, serverPlayer: ServerPlayer): boolean;
    static validateActionDataWithoutPlayer(actionDataEntry: ActionDataEntry): boolean;
    static validateBlockPos(blockPos: BlockPos): boolean;
    static validateCommand(command: string): boolean;
    static validateDialogData(dialogData: DialogDataCapable<any>): boolean;
    static validateNamedDialog(dialogData: DialogDataCapable<any>, dialogLabel: string): boolean;
    static validateServerSide(serverPlayer: ServerPlayer): boolean;
    static validateTradingData(tradingData: TradingDataCapable<any>): boolean;
  }

}

declare module 'de.markusbordihn.easynpc.entity.easynpc.handlers.action.executor' {
  import { ActionDataEntry } from 'de.markusbordihn.easynpc.data.action';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { LivingEntity, Entity } from 'net.minecraft.world.entity';
  import { ActionEventDataCapable, DialogDataCapable } from 'de.markusbordihn.easynpc.entity.easynpc.data';

  class CommandActionExecutor {
    static executeAsEntity(actionDataEntry: ActionDataEntry, serverPlayer: ServerPlayer, entity: Entity, livingEntity: LivingEntity, actionEventData: ActionEventDataCapable<any>): void;
    static executeAsPlayer(actionDataEntry: ActionDataEntry, serverPlayer: ServerPlayer, livingEntity: LivingEntity, actionEventData: ActionEventDataCapable<any>): void;
  }


  class CommandExecutor {
    static executeEntityCommand(command: string, entity: Entity, permissionLevel: number, debug: boolean): void;
    static executePlayerCommand(command: string, serverPlayer: ServerPlayer, permissionLevel: number, debug: boolean): void;
    static isBlockedUnsafeNPCCommand(command: string): boolean;
  }


  class DialogActionExecutor {
    static openDefaultDialog(actionDataEntry: ActionDataEntry, serverPlayer: ServerPlayer, dialogData: DialogDataCapable<any>): void;
    static openNamedDialog(actionDataEntry: ActionDataEntry, serverPlayer: ServerPlayer, dialogData: DialogDataCapable<any>): void;
  }


  class ScoreboardActionExecutor {
    static execute(actionDataEntry: ActionDataEntry, serverPlayer: ServerPlayer): void;
  }

}

declare module 'de.markusbordihn.easynpc.entity.easynpc.handlers' {
  import { EasyNPC, EasyNPCBase } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { List } from 'java.util';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Double } from 'java.lang';
  import { BlockPos } from 'net.minecraft.core';
  import { ActionDataSet, ActionDataEntry } from 'de.markusbordihn.easynpc.data.action';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { ItemStack, ProjectileWeaponItem } from 'net.minecraft.world.item';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { InteractionHand, InteractionResult } from 'net.minecraft.world';
  import { AbstractArrow } from 'net.minecraft.world.entity.projectile';
  import { DamageSource } from 'net.minecraft.world.damagesource';

  interface ActionHandler<E extends Mob = any> extends EasyNPC<E> {}
  class ActionHandler<E extends Mob = any> extends EasyNPC<E> {
    checkDistanceActions(): void;
    checkTradingActions(): void;
    executeAction(actionDataEntry: ActionDataEntry, serverPlayer: ServerPlayer): void;
    executeActions(actionDataSet: ActionDataSet, serverPlayer: ServerPlayer): void;
    getPlayersInRange(range: number): Player[];
    interactWithBlock(blockPos: BlockPos): void;
    lookAtBlock(target: BlockPos): void;
  }


  class AttackHandler {
    static addChargedProjectile(weaponItemStack: ItemStack, projectileItemStack: ItemStack): void;
    static canFireProjectileWeapon(projectileWeaponItem: ProjectileWeaponItem): boolean;
    static getArrow(livingEntity: LivingEntity, itemStackWeapon: ItemStack, itemStackProjectile: ItemStack, damage: number): AbstractArrow;
    static getBowHoldingHand(livingEntity: LivingEntity): InteractionHand;
    static getBullet(livingEntity: LivingEntity, itemStackWeapon: ItemStack, damage: number): AbstractArrow;
    static getCrossbowHoldingHand(livingEntity: LivingEntity): InteractionHand;
    static getGunHoldingHand(livingEntity: LivingEntity): InteractionHand;
    static handleIsInvulnerableTo(easyNPC: EasyNPCBase<any>, damageSource: DamageSource, defaultValue: boolean): boolean;
    static isBowWeapon(itemStack: ItemStack): boolean;
    static isCrossbowWeapon(itemStack: ItemStack): boolean;
    static isGunWeapon(itemStack: ItemStack): boolean;
    static isHoldingBowWeapon(livingEntity: LivingEntity): boolean;
    static isHoldingCrossbowWeapon(livingEntity: LivingEntity): boolean;
    static isHoldingGunWeapon(livingEntity: LivingEntity): boolean;
    static isHoldingMeleeWeapon(livingEntity: LivingEntity): boolean;
    static isHoldingProjectileWeapon(livingEntity: LivingEntity): boolean;
    static isHoldingWeapon(livingEntity: LivingEntity): boolean;
    static isMeleeWeapon(itemStack: ItemStack): boolean;
    static performBowAttack(livingEntity: LivingEntity, livingEntityTarget: LivingEntity, damage: number): void;
    static performDefaultRangedAttack(livingEntity: LivingEntity, targedtedLivingEntity: LivingEntity, damage: number): void;
    static performGunAttack(livingEntity: LivingEntity, livingEntityTarget: LivingEntity, damage: number): void;
  }


  interface AttributeHandler<E extends Mob = any> extends EasyNPC<E> {}
  class AttributeHandler<E extends Mob = any> extends EasyNPC<E> {
    checkAttributeActions(): void;
  }


  interface BaseTickHandler<E extends Mob = any> extends EasyNPC<E> {}
  class BaseTickHandler<E extends Mob = any> extends EasyNPC<E> {
    static readonly BASE_TICK: number;
    static readonly TRADING_BASE_TICK: number;
    static readonly ATTRIBUTE_BASE_TICK: number;
    handleBaseTick(): void;
  }


  class InteractionHandler {
    static handleMobInteraction(easyNPC: EasyNPC<any>, player: Player, hand: InteractionHand): InteractionResult;
  }


  class VisibilityHandler {
    static handleIsCustomNameVisible(easyNPC: EasyNPC<any>, isCustomNameVisible: boolean): boolean;
    static handleIsCustomNameVisibleToPlayer(easyNPC: EasyNPC<any>, player: Player, isCustomNameVisible: boolean): boolean;
    static handleIsInvisible(easyNPC: EasyNPC<any>, isInvisible: boolean): boolean;
    static handleIsInvisibleToPlayer(easyNPC: EasyNPC<any>, player: Player, isInvisibleToPlayers: boolean): boolean;
  }

}

declare module 'de.markusbordihn.easynpc.entity.easynpc.npc.custom' {
  import { PathfinderMobRaw } from 'de.markusbordihn.easynpc.api.npc.raw';
  import { EntityType, PathfinderMob } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { Enum } from 'java.lang';
  import { Builder } from 'AttributeSupplier';
  import { ConfigurationData } from 'de.markusbordihn.easynpc.data.configuration';
  import { CustomScale } from 'de.markusbordihn.easynpc.data.scale';
  import { SkinModel } from 'de.markusbordihn.easynpc.data.skin';
  import { SoundDataSet } from 'de.markusbordihn.easynpc.data.sound';

  interface Doppler extends PathfinderMobRaw {}
  class Doppler extends PathfinderMobRaw {
    static readonly ID: string;
    constructor(entityType: EntityType<PathfinderMob>, level: Level);

    constructor(entityType: EntityType<PathfinderMob>, level: Level, variant: Enum<any>);
    canUseArmor(): boolean;
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    get defaultSkinVariantType(): Enum<any>;
    get skinVariantTypes(): Enum<any>;
    getSkinVariantType(name: string): Enum<any>;
  }


  interface Fairy extends PathfinderMobRaw {}
  class Fairy extends PathfinderMobRaw {
    static readonly ID: string;
    constructor(entityType: EntityType<PathfinderMob>, level: Level);

    constructor(entityType: EntityType<PathfinderMob>, level: Level, variantType: Enum<any>);
    canFly(): boolean;
    canUseArmor(): boolean;
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    get defaultModelScale(): CustomScale;
    get defaultSkinVariantType(): Enum<any>;
    get entityDialogScaling(): number;
    get entityDialogTop(): number;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    getSkinVariantType(name: string): Enum<any>;
  }


  interface Orc extends PathfinderMobRaw {}
  class Orc extends PathfinderMobRaw {
    static readonly ID: string;
    static readonly ID_WARRIOR: string;
    constructor(entityType: EntityType<PathfinderMob>, level: Level);

    constructor(entityType: EntityType<PathfinderMob>, level: Level, variantType: Enum<any>);
    static createAttributes(): Builder;
    get configurationData(): ConfigurationData;
    get defaultSkinVariantType(): Enum<any>;
    get skinModel(): SkinModel;
    get skinVariantTypes(): Enum<any>;
    getDefaultSoundDataSet(soundDataSet: SoundDataSet, variantName: string): SoundDataSet;
    getSkinVariantType(name: string): Enum<any>;
  }

}

declare module 'de.markusbordihn.easynpc.entity.easynpc.npc.custom.Doppler' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface VariantType extends Enum<VariantType> {}
  class VariantType extends Enum<VariantType> {
    static readonly DOPPLER: VariantType;
    static valueOf(name: string): VariantType;
    static values(): VariantType[];
  }

}

declare module 'de.markusbordihn.easynpc.entity.easynpc.npc.epicfight' {
  import { SpiderRaw } from 'de.markusbordihn.easynpc.api.npc.raw.spider';
  import { EntityType, PathfinderMob } from 'net.minecraft.world.entity';
  import { Spider, Creeper, Drowned, EnderMan, Evoker, Husk, Pillager, Skeleton, Stray, Vex, Vindicator, Witch, WitherSkeleton, Zombie, ZombieVillager, ZombifiedPiglin } from 'net.minecraft.world.entity.monster';
  import { Level } from 'net.minecraft.world.level';
  import { ConfigurationData } from 'de.markusbordihn.easynpc.data.configuration';
  import { CreeperRaw, EnderManRaw, HumanoidRaw, HumanoidSlimRaw, IronGolemRaw, VexRaw, WitchRaw } from 'de.markusbordihn.easynpc.api.npc.raw';
  import { Enum } from 'java.lang';
  import { DrownedRaw, HuskRaw, ZombieRaw } from 'de.markusbordihn.easynpc.api.npc.raw.zombie';
  import { EvokerRaw, PillagerRaw, VindicatorRaw } from 'de.markusbordihn.easynpc.api.npc.raw.illager';
  import { IronGolem } from 'net.minecraft.world.entity.animal';
  import { PiglinBruteRaw, PiglinRaw, ZombifiedPiglinRaw } from 'de.markusbordihn.easynpc.api.npc.raw.piglin';
  import { PiglinBrute, Piglin } from 'net.minecraft.world.entity.monster.piglin';
  import { SkeletonRaw, StrayRaw, WitherSkeletonRaw } from 'de.markusbordihn.easynpc.api.npc.raw.skeleton';
  import { ZombieVillagerRaw } from 'de.markusbordihn.easynpc.api.npc.raw.villager';

  interface CaveSpiderEpicFight extends SpiderRaw {}
  class CaveSpiderEpicFight extends SpiderRaw {
    static readonly ID: string;
    constructor(entityType: EntityType<Spider>, level: Level);
    get configurationData(): ConfigurationData;
  }


  interface CreeperEpicFight extends CreeperRaw {}
  class CreeperEpicFight extends CreeperRaw {
    static readonly ID: string;
    constructor(entityType: EntityType<Creeper>, level: Level);

    constructor(entityType: EntityType<Creeper>, level: Level, variant: Enum<any>);
    get configurationData(): ConfigurationData;
  }


  interface DrownedEpicFight extends DrownedRaw {}
  class DrownedEpicFight extends DrownedRaw {
    static readonly ID: string;
    constructor(entityType: EntityType<Drowned>, level: Level);

    constructor(entityType: EntityType<Drowned>, level: Level, variant: Enum<any>);
    get configurationData(): ConfigurationData;
  }


  interface EnderManEpicFight extends EnderManRaw {}
  class EnderManEpicFight extends EnderManRaw {
    static readonly ID: string;
    constructor(entityType: EntityType<EnderMan>, level: Level);

    constructor(entityType: EntityType<EnderMan>, level: Level, variant: Enum<any>);
    get configurationData(): ConfigurationData;
  }


  interface EvokerEpicFight extends EvokerRaw {}
  class EvokerEpicFight extends EvokerRaw {
    static readonly ID: string;
    constructor(entityType: EntityType<Evoker>, level: Level);

    constructor(entityType: EntityType<Evoker>, level: Level, variant: Enum<any>);
    get configurationData(): ConfigurationData;
  }


  interface HumanoidEpicFight extends HumanoidRaw {}
  class HumanoidEpicFight extends HumanoidRaw {
    static readonly ID: string;
    constructor(entityType: EntityType<PathfinderMob>, level: Level);

    constructor(entityType: EntityType<PathfinderMob>, level: Level, variant: Enum<any>);
    get configurationData(): ConfigurationData;
  }


  interface HumanoidSlimEpicFight extends HumanoidSlimRaw {}
  class HumanoidSlimEpicFight extends HumanoidSlimRaw {
    static readonly ID: string;
    constructor(entityType: EntityType<PathfinderMob>, level: Level);

    constructor(entityType: EntityType<PathfinderMob>, level: Level, variant: Enum<any>);
    get configurationData(): ConfigurationData;
  }


  interface HuskEpicFight extends HuskRaw {}
  class HuskEpicFight extends HuskRaw {
    static readonly ID: string;
    constructor(entityType: EntityType<Husk>, level: Level);

    constructor(entityType: EntityType<Husk>, level: Level, variant: Enum<any>);
    get configurationData(): ConfigurationData;
  }


  interface IronGolemEpicFight extends IronGolemRaw {}
  class IronGolemEpicFight extends IronGolemRaw {
    static readonly ID: string;
    constructor(entityType: EntityType<IronGolem>, level: Level);

    constructor(entityType: EntityType<IronGolem>, level: Level, variant: Enum<any>);
    get configurationData(): ConfigurationData;
  }


  interface PiglinBruteEpicFight extends PiglinBruteRaw {}
  class PiglinBruteEpicFight extends PiglinBruteRaw {
    static readonly ID: string;
    constructor(entityType: EntityType<PiglinBrute>, level: Level);

    constructor(entityType: EntityType<PiglinBrute>, level: Level, variant: Enum<any>);
    get configurationData(): ConfigurationData;
  }


  interface PiglinEpicFight extends PiglinRaw {}
  class PiglinEpicFight extends PiglinRaw {
    static readonly ID: string;
    constructor(entityType: EntityType<Piglin>, level: Level);

    constructor(entityType: EntityType<Piglin>, level: Level, variant: Enum<any>);
    get configurationData(): ConfigurationData;
  }


  interface PillagerEpicFight extends PillagerRaw {}
  class PillagerEpicFight extends PillagerRaw {
    static readonly ID: string;
    constructor(entityType: EntityType<Pillager>, level: Level);

    constructor(entityType: EntityType<Pillager>, level: Level, variant: Enum<any>);
    get configurationData(): ConfigurationData;
  }


  interface SkeletonEpicFight extends SkeletonRaw {}
  class SkeletonEpicFight extends SkeletonRaw {
    static readonly ID: string;
    constructor(entityType: EntityType<Skeleton>, level: Level);

    constructor(entityType: EntityType<Skeleton>, level: Level, variant: Enum<any>);
    get configurationData(): ConfigurationData;
  }


  interface SpiderEpicFight extends SpiderRaw {}
  class SpiderEpicFight extends SpiderRaw {
    static readonly ID: string;
    constructor(entityType: EntityType<Spider>, level: Level);

    constructor(entityType: EntityType<Spider>, level: Level, variant: Enum<any>);
    get configurationData(): ConfigurationData;
  }


  interface StrayEpicFight extends StrayRaw {}
  class StrayEpicFight extends StrayRaw {
    static readonly ID: string;
    constructor(entityType: EntityType<Stray>, level: Level);

    constructor(entityType: EntityType<Stray>, level: Level, variant: Enum<any>);
    get configurationData(): ConfigurationData;
  }


  interface VexEpicFight extends VexRaw {}
  class VexEpicFight extends VexRaw {
    static readonly ID: string;
    constructor(entityType: EntityType<Vex>, level: Level);

    constructor(entityType: EntityType<Vex>, level: Level, variant: Enum<any>);
    get configurationData(): ConfigurationData;
  }


  interface VindicatorEpicFight extends VindicatorRaw {}
  class VindicatorEpicFight extends VindicatorRaw {
    static readonly ID: string;
    constructor(entityType: EntityType<Vindicator>, level: Level);

    constructor(entityType: EntityType<Vindicator>, level: Level, variant: Enum<any>);
    get configurationData(): ConfigurationData;
  }


  interface WitchEpicFight extends WitchRaw {}
  class WitchEpicFight extends WitchRaw {
    static readonly ID: string;
    constructor(entityType: EntityType<Witch>, level: Level);

    constructor(entityType: EntityType<Witch>, level: Level, variant: Enum<any>);
    get configurationData(): ConfigurationData;
  }


  interface WitherSkeletonEpicFight extends WitherSkeletonRaw {}
  class WitherSkeletonEpicFight extends WitherSkeletonRaw {
    static readonly ID: string;
    constructor(entityType: EntityType<WitherSkeleton>, level: Level);

    constructor(entityType: EntityType<WitherSkeleton>, level: Level, variant: Enum<any>);
    get configurationData(): ConfigurationData;
  }


  interface ZombieEpicFight extends ZombieRaw {}
  class ZombieEpicFight extends ZombieRaw {
    static readonly ID: string;
    constructor(entityType: EntityType<Zombie>, level: Level);

    constructor(entityType: EntityType<Zombie>, level: Level, variant: Enum<any>);
    get configurationData(): ConfigurationData;
  }


  interface ZombieVillagerEpicFight extends ZombieVillagerRaw {}
  class ZombieVillagerEpicFight extends ZombieVillagerRaw {
    static readonly ID: string;
    constructor(entityType: EntityType<ZombieVillager>, level: Level);

    constructor(entityType: EntityType<ZombieVillager>, level: Level, variant: Enum<any>);
    get configurationData(): ConfigurationData;
  }


  interface ZombifiedPiglinEpicFight extends ZombifiedPiglinRaw {}
  class ZombifiedPiglinEpicFight extends ZombifiedPiglinRaw {
    static readonly ID: string;
    constructor(entityType: EntityType<ZombifiedPiglin>, level: Level);

    constructor(entityType: EntityType<ZombifiedPiglin>, level: Level, variant: Enum<any>);
    get configurationData(): ConfigurationData;
  }

}

declare module 'de.markusbordihn.easynpc.entity.easynpc.npc.standard' {
  import { AllayBase, CatBase, ChickenBase, CreeperBase, EnderManBase, FoxBase, HumanoidBase, HumanoidSlimBase, IronGolemBase, PigBase, VexBase, WitchBase, WolfBase } from 'de.markusbordihn.easynpc.api.npc.base';
  import { StandardEasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc.npc';
  import { DefaultNPCType, NPCType } from 'de.markusbordihn.easynpc.data.npc';
  import { EntityType, PathfinderMob } from 'net.minecraft.world.entity';
  import { Allay } from 'net.minecraft.world.entity.animal.allay';
  import { Level } from 'net.minecraft.world.level';
  import { Cat, Chicken, Fox, IronGolem, Pig, Wolf } from 'net.minecraft.world.entity.animal';
  import { Creeper, EnderMan, Ghast, Slime, Vex, Witch } from 'net.minecraft.world.entity.monster';
  import { GhastSmallBase } from 'de.markusbordihn.easynpc.api.npc.base.ghast';
  import { SlimeBase } from 'de.markusbordihn.easynpc.api.npc.base.slime';

  interface AllayNPC extends StandardEasyNPC<AllayBase>, AllayBase {}
  class AllayNPC extends StandardEasyNPC<AllayBase> {
    static readonly NPC_TYPE: DefaultNPCType;
    constructor(entityType: EntityType<Allay>, level: Level);
    get nPCType(): NPCType;
  }


  interface CatNPC extends StandardEasyNPC<CatBase>, CatBase {}
  class CatNPC extends StandardEasyNPC<CatBase> {
    static readonly NPC_TYPE: DefaultNPCType;
    constructor(entityType: EntityType<Cat>, level: Level);
    get nPCType(): NPCType;
  }


  interface ChickenNPC extends StandardEasyNPC<ChickenBase>, ChickenBase {}
  class ChickenNPC extends StandardEasyNPC<ChickenBase> {
    static readonly NPC_TYPE: DefaultNPCType;
    constructor(entityType: EntityType<Chicken>, level: Level);
    get nPCType(): NPCType;
  }


  interface CreeperNPC extends StandardEasyNPC<CreeperBase>, CreeperBase {}
  class CreeperNPC extends StandardEasyNPC<CreeperBase> {
    static readonly NPC_TYPE: DefaultNPCType;
    constructor(entityType: EntityType<Creeper>, level: Level);
    get nPCType(): NPCType;
  }


  interface EnderManNPC extends StandardEasyNPC<EnderManBase>, EnderManBase {}
  class EnderManNPC extends StandardEasyNPC<EnderManBase> {
    static readonly NPC_TYPE: DefaultNPCType;
    constructor(entityType: EntityType<EnderMan>, level: Level);
    get nPCType(): NPCType;
  }


  interface FoxNPC extends StandardEasyNPC<FoxBase>, FoxBase {}
  class FoxNPC extends StandardEasyNPC<FoxBase> {
    static readonly NPC_TYPE: DefaultNPCType;
    constructor(entityType: EntityType<Fox>, level: Level);
    get nPCType(): NPCType;
  }


  interface GhastNPC extends StandardEasyNPC<GhastSmallBase>, GhastSmallBase {}
  class GhastNPC extends StandardEasyNPC<GhastSmallBase> {
    static readonly NPC_TYPE: DefaultNPCType;
    constructor(entityType: EntityType<Ghast>, level: Level);
    get nPCType(): NPCType;
  }


  interface HumanoidNPC extends StandardEasyNPC<HumanoidBase>, HumanoidBase {}
  class HumanoidNPC extends StandardEasyNPC<HumanoidBase> {
    static readonly NPC_TYPE: DefaultNPCType;
    constructor(entityType: EntityType<PathfinderMob>, level: Level);
    get nPCType(): NPCType;
  }


  interface HumanoidSlimNPC extends StandardEasyNPC<HumanoidSlimBase>, HumanoidSlimBase {}
  class HumanoidSlimNPC extends StandardEasyNPC<HumanoidSlimBase> {
    static readonly NPC_TYPE: DefaultNPCType;
    constructor(entityType: EntityType<PathfinderMob>, level: Level);
    get nPCType(): NPCType;
  }


  interface IronGolemNPC extends StandardEasyNPC<IronGolemBase>, IronGolemBase {}
  class IronGolemNPC extends StandardEasyNPC<IronGolemBase> {
    static readonly NPC_TYPE: DefaultNPCType;
    constructor(entityType: EntityType<IronGolem>, level: Level);
    get nPCType(): NPCType;
  }


  interface PigNPC extends StandardEasyNPC<PigBase>, PigBase {}
  class PigNPC extends StandardEasyNPC<PigBase> {
    static readonly NPC_TYPE: DefaultNPCType;
    constructor(entityType: EntityType<Pig>, level: Level);
    get nPCType(): NPCType;
  }


  interface SlimeNPC extends StandardEasyNPC<SlimeBase>, SlimeBase {}
  class SlimeNPC extends StandardEasyNPC<SlimeBase> {
    static readonly NPC_TYPE: DefaultNPCType;
    constructor(entityType: EntityType<Slime>, level: Level);
    get nPCType(): NPCType;
  }


  interface VexNPC extends StandardEasyNPC<VexBase>, VexBase {}
  class VexNPC extends StandardEasyNPC<VexBase> {
    static readonly NPC_TYPE: DefaultNPCType;
    constructor(entityType: EntityType<Vex>, level: Level);
    get nPCType(): NPCType;
  }


  interface WitchNPC extends StandardEasyNPC<WitchBase>, WitchBase {}
  class WitchNPC extends StandardEasyNPC<WitchBase> {
    static readonly NPC_TYPE: DefaultNPCType;
    constructor(entityType: EntityType<Witch>, level: Level);
    get nPCType(): NPCType;
  }


  interface WolfNPC extends StandardEasyNPC<WolfBase>, WolfBase {}
  class WolfNPC extends StandardEasyNPC<WolfBase> {
    static readonly NPC_TYPE: DefaultNPCType;
    constructor(entityType: EntityType<Wolf>, level: Level);
    get nPCType(): NPCType;
  }

}

declare module 'de.markusbordihn.easynpc.entity.easynpc.npc.standard.horse' {
  import { HorseBase } from 'de.markusbordihn.easynpc.api.npc.base.horse';
  import { StandardEasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc.npc';
  import { EntityType } from 'net.minecraft.world.entity';
  import { Horse } from 'net.minecraft.world.entity.animal.horse';
  import { Level } from 'net.minecraft.world.level';
  import { NPCType, DefaultNPCType } from 'de.markusbordihn.easynpc.data.npc';

  interface HorseNPC extends StandardEasyNPC<HorseBase>, HorseBase {}
  class HorseNPC extends StandardEasyNPC<HorseBase> {
    constructor(entityType: EntityType<Horse>, level: Level);
    get nPCType(): NPCType;
  }


  interface SkeletonHorseNPC extends StandardEasyNPC<HorseBase>, HorseBase {}
  class SkeletonHorseNPC extends StandardEasyNPC<HorseBase> {
    static readonly NPC_TYPE: DefaultNPCType;
    constructor(entityType: EntityType<Horse>, level: Level);
    get nPCType(): NPCType;
  }


  interface ZombieHorseNPC extends StandardEasyNPC<HorseBase>, HorseBase {}
  class ZombieHorseNPC extends StandardEasyNPC<HorseBase> {
    static readonly NPC_TYPE: DefaultNPCType;
    constructor(entityType: EntityType<Horse>, level: Level);
    get nPCType(): NPCType;
  }

}

declare module 'de.markusbordihn.easynpc.entity.easynpc.npc.standard.illager' {
  import { EvokerBase, IllusionerBase, PillagerBase, VindicatorBase } from 'de.markusbordihn.easynpc.api.npc.base.illager';
  import { StandardEasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc.npc';
  import { DefaultNPCType, NPCType } from 'de.markusbordihn.easynpc.data.npc';
  import { EntityType } from 'net.minecraft.world.entity';
  import { Evoker, Illusioner, Pillager, Vindicator } from 'net.minecraft.world.entity.monster';
  import { Level } from 'net.minecraft.world.level';

  interface EvokerNPC extends StandardEasyNPC<EvokerBase>, EvokerBase {}
  class EvokerNPC extends StandardEasyNPC<EvokerBase> {
    static readonly NPC_TYPE: DefaultNPCType;
    constructor(entityType: EntityType<Evoker>, level: Level);
    get nPCType(): NPCType;
  }


  interface IllusionerNPC extends StandardEasyNPC<IllusionerBase>, IllusionerBase {}
  class IllusionerNPC extends StandardEasyNPC<IllusionerBase> {
    static readonly NPC_TYPE: DefaultNPCType;
    constructor(entityType: EntityType<Illusioner>, level: Level);
    get nPCType(): NPCType;
  }


  interface PillagerNPC extends StandardEasyNPC<PillagerBase>, PillagerBase {}
  class PillagerNPC extends StandardEasyNPC<PillagerBase> {
    static readonly NPC_TYPE: DefaultNPCType;
    constructor(entityType: EntityType<Pillager>, level: Level);
    get nPCType(): NPCType;
  }


  interface VindicatorNPC extends StandardEasyNPC<VindicatorBase>, VindicatorBase {}
  class VindicatorNPC extends StandardEasyNPC<VindicatorBase> {
    static readonly NPC_TYPE: DefaultNPCType;
    constructor(entityType: EntityType<Vindicator>, level: Level);
    get nPCType(): NPCType;
  }

}

declare module 'de.markusbordihn.easynpc.entity.easynpc.npc.standard.piglin' {
  import { PiglinBruteBase, PiglinBase, ZombifiedPiglinBase } from 'de.markusbordihn.easynpc.api.npc.base.piglin';
  import { StandardEasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc.npc';
  import { EntityType } from 'net.minecraft.world.entity';
  import { PiglinBrute, Piglin } from 'net.minecraft.world.entity.monster.piglin';
  import { Level } from 'net.minecraft.world.level';
  import { NPCType } from 'de.markusbordihn.easynpc.data.npc';
  import { ZombifiedPiglin } from 'net.minecraft.world.entity.monster';

  interface PiglinBruteNPC extends StandardEasyNPC<PiglinBruteBase>, PiglinBruteBase {}
  class PiglinBruteNPC extends StandardEasyNPC<PiglinBruteBase> {
    constructor(entityType: EntityType<PiglinBrute>, level: Level);
    get nPCType(): NPCType;
  }


  interface PiglinNPC extends StandardEasyNPC<PiglinBase>, PiglinBase {}
  class PiglinNPC extends StandardEasyNPC<PiglinBase> {
    constructor(entityType: EntityType<Piglin>, level: Level);
    get nPCType(): NPCType;
  }


  interface ZombifiedPiglinNPC extends StandardEasyNPC<ZombifiedPiglinBase>, ZombifiedPiglinBase {}
  class ZombifiedPiglinNPC extends StandardEasyNPC<ZombifiedPiglinBase> {
    constructor(entityType: EntityType<ZombifiedPiglin>, level: Level);
    get nPCType(): NPCType;
  }

}

declare module 'de.markusbordihn.easynpc.entity.easynpc.npc.standard.skeleton' {
  import { BoggedBase, SkeletonBase, StrayBase, WitherSkeletonBase } from 'de.markusbordihn.easynpc.api.npc.base.skeleton';
  import { StandardEasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc.npc';
  import { EntityType } from 'net.minecraft.world.entity';
  import { Bogged, Skeleton, Stray, WitherSkeleton } from 'net.minecraft.world.entity.monster';
  import { Level } from 'net.minecraft.world.level';
  import { NPCType } from 'de.markusbordihn.easynpc.data.npc';

  interface BoggedNPC extends StandardEasyNPC<BoggedBase>, BoggedBase {}
  class BoggedNPC extends StandardEasyNPC<BoggedBase> {
    constructor(entityType: EntityType<Bogged>, level: Level);
    get nPCType(): NPCType;
  }


  interface SkeletonNPC extends StandardEasyNPC<SkeletonBase>, SkeletonBase {}
  class SkeletonNPC extends StandardEasyNPC<SkeletonBase> {
    constructor(entityType: EntityType<Skeleton>, level: Level);
    get nPCType(): NPCType;
  }


  interface StrayNPC extends StandardEasyNPC<StrayBase>, StrayBase {}
  class StrayNPC extends StandardEasyNPC<StrayBase> {
    constructor(entityType: EntityType<Stray>, level: Level);
    get nPCType(): NPCType;
  }


  interface WitherSkeletonNPC extends StandardEasyNPC<WitherSkeletonBase>, WitherSkeletonBase {}
  class WitherSkeletonNPC extends StandardEasyNPC<WitherSkeletonBase> {
    constructor(entityType: EntityType<WitherSkeleton>, level: Level);
    get nPCType(): NPCType;
  }

}

declare module 'de.markusbordihn.easynpc.entity.easynpc.npc.standard.spider' {
  import { SpiderBase } from 'de.markusbordihn.easynpc.api.npc.base.spider';
  import { StandardEasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc.npc';
  import { DefaultNPCType, NPCType } from 'de.markusbordihn.easynpc.data.npc';
  import { EntityType } from 'net.minecraft.world.entity';
  import { Spider } from 'net.minecraft.world.entity.monster';
  import { Level } from 'net.minecraft.world.level';

  interface CaveSpiderNPC extends StandardEasyNPC<SpiderBase>, SpiderBase {}
  class CaveSpiderNPC extends StandardEasyNPC<SpiderBase> {
    static readonly NPC_TYPE: DefaultNPCType;
    constructor(entityType: EntityType<Spider>, level: Level);
    get nPCType(): NPCType;
  }


  interface SpiderNPC extends StandardEasyNPC<SpiderBase>, SpiderBase {}
  class SpiderNPC extends StandardEasyNPC<SpiderBase> {
    constructor(entityType: EntityType<Spider>, level: Level);
    get nPCType(): NPCType;
  }

}

declare module 'de.markusbordihn.easynpc.entity.easynpc.npc.standard.villager' {
  import { VillagerBase, ZombieVillagerBase } from 'de.markusbordihn.easynpc.api.npc.base.villager';
  import { StandardEasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc.npc';
  import { DefaultNPCType, NPCType } from 'de.markusbordihn.easynpc.data.npc';
  import { EntityType } from 'net.minecraft.world.entity';
  import { Villager } from 'net.minecraft.world.entity.npc';
  import { Level } from 'net.minecraft.world.level';
  import { ZombieVillager } from 'net.minecraft.world.entity.monster';

  interface VillagerNPC extends StandardEasyNPC<VillagerBase>, VillagerBase {}
  class VillagerNPC extends StandardEasyNPC<VillagerBase> {
    static readonly NPC_TYPE: DefaultNPCType;
    constructor(entityType: EntityType<Villager>, level: Level);
    get nPCType(): NPCType;
  }


  interface ZombieVillagerNPC extends StandardEasyNPC<ZombieVillagerBase>, ZombieVillagerBase {}
  class ZombieVillagerNPC extends StandardEasyNPC<ZombieVillagerBase> {
    constructor(entityType: EntityType<ZombieVillager>, level: Level);
    get nPCType(): NPCType;
  }

}

declare module 'de.markusbordihn.easynpc.entity.easynpc.npc.standard.zombie' {
  import { DrownedBase, HuskBase, ZombieBase } from 'de.markusbordihn.easynpc.api.npc.base.zombie';
  import { StandardEasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc.npc';
  import { EntityType } from 'net.minecraft.world.entity';
  import { Drowned, Husk, Zombie } from 'net.minecraft.world.entity.monster';
  import { Level } from 'net.minecraft.world.level';
  import { NPCType } from 'de.markusbordihn.easynpc.data.npc';

  interface DrownedNPC extends StandardEasyNPC<DrownedBase>, DrownedBase {}
  class DrownedNPC extends StandardEasyNPC<DrownedBase> {
    constructor(entityType: EntityType<Drowned>, level: Level);
    get nPCType(): NPCType;
  }


  interface HuskNPC extends StandardEasyNPC<HuskBase>, HuskBase {}
  class HuskNPC extends StandardEasyNPC<HuskBase> {
    constructor(entityType: EntityType<Husk>, level: Level);
    get nPCType(): NPCType;
  }


  interface ZombieNPC extends StandardEasyNPC<ZombieBase>, ZombieBase {}
  class ZombieNPC extends StandardEasyNPC<ZombieBase> {
    constructor(entityType: EntityType<Zombie>, level: Level);
    get nPCType(): NPCType;
  }

}

declare module 'de.markusbordihn.easynpc.entity.easynpc.npc' {
  import { ConfigurationData } from 'de.markusbordihn.easynpc.data.configuration';

  class StandardEasyNPC<T extends Mob = any> {
    get configurationData(): ConfigurationData;
  }

}

declare module 'de.markusbordihn.easynpc.entity' {
  import { Enum } from 'java.lang';
  import { Builder } from 'EntityType';
  import { Entity, EntityType, LivingEntity } from 'net.minecraft.world.entity';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Builder as attributesupplier_Builder } from 'AttributeSupplier';
  import { List, UUID, Map, Set } from 'java.util';
  import { EntityJoinLevelEvent, EntityLeaveLevelEvent, EntityAttributeCreationEvent } from 'net.neoforged.neoforge.event.entity';
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { ServerPlayer, ServerLevel } from 'net.minecraft.server.level';
  import { Stream } from 'java.util.stream';
  import { ConcurrentHashMap } from 'java.util.concurrent';
  import { DeferredRegister } from 'net.neoforged.neoforge.registries';
  import { Level } from 'net.minecraft.world.level';
  import { BiFunction } from 'java.util.function';

  interface EpicFightEntityType extends Enum<EpicFightEntityType> {}
  class EpicFightEntityType extends Enum<EpicFightEntityType> {
    static readonly ZOMBIE: EpicFightEntityType;
    static readonly CREEPER: EpicFightEntityType;
    static readonly ENDERMAN: EpicFightEntityType;
    static readonly SKELETON: EpicFightEntityType;
    static readonly WITHER_SKELETON: EpicFightEntityType;
    static readonly STRAY: EpicFightEntityType;
    static readonly ZOMBIFIED_PIGLIN: EpicFightEntityType;
    static readonly ZOMBIE_VILLAGER: EpicFightEntityType;
    static readonly HUSK: EpicFightEntityType;
    static readonly SPIDER: EpicFightEntityType;
    static readonly CAVE_SPIDER: EpicFightEntityType;
    static readonly IRON_GOLEM: EpicFightEntityType;
    static readonly VINDICATOR: EpicFightEntityType;
    static readonly EVOKER: EpicFightEntityType;
    static readonly WITCH: EpicFightEntityType;
    static readonly DROWNED: EpicFightEntityType;
    static readonly PILLAGER: EpicFightEntityType;
    static readonly VEX: EpicFightEntityType;
    static readonly PIGLIN: EpicFightEntityType;
    static readonly PIGLIN_BRUTE: EpicFightEntityType;
    static readonly HUMANOID: EpicFightEntityType;
    static readonly HUMANOID_SLIM: EpicFightEntityType;
    get attributes(): attributesupplier_Builder;
    get builder(): Builder<Entity>;
    get id(): string;
    get resourceKey(): ResourceKey<EntityType<any>>;
    static valueOf(name: string): EpicFightEntityType;
    static values(): EpicFightEntityType[];
  }


  class LivingEntityEventHandler {
    static handleEntityJoinWorldEvent(event: EntityJoinLevelEvent): void;
    static handleEntityLeaveWorldEvent(event: EntityLeaveLevelEvent): void;
  }


  class LivingEntityEvents {
    static handleLivingEntityJoinEvent(livingEntity: LivingEntity): void;
    static handleLivingEntityLeaveEvent(livingEntity: LivingEntity): void;
  }


  class LivingEntityManager {
    static addEasyNPC(easyNPC: EasyNPC<any>): void;
    static addLivingEntity(livingEntity: LivingEntity): void;
    static addServerPlayer(serverPlayer: ServerPlayer): void;
    static discardEasyNPCEntityByUUID(uuid: UUID, serverLevel: ServerLevel): void;
    static get npcEntityMap(): ConcurrentHashMap<UUID, EasyNPC<any>>;
    static get uUIDStrings(): Stream<string>;
    static getEasyNPCEntityByUUID(uuid: UUID, serverPlayer: ServerPlayer): EasyNPC<any>;
    static getEasyNPCEntityByUUID(uuid: UUID, serverLevel: ServerLevel): EasyNPC<any>;
    static getEasyNPCEntityByUUID(uuid: UUID): EasyNPC<any>;
    static getEntityCountByPresetUUID(presetUUID: UUID): number;
    static getEntityCountByPresetUUID(presetUUID: UUID, serverLevel: ServerLevel): number;
    static getEntityMapByOwner(serverPlayer: ServerPlayer): Map<UUID, Entity>;
    static getEntityMapByOwner(ownerUUID: UUID): Map<UUID, Entity>;
    static getLivingEntityByUUID(uuid: UUID, serverLevel: ServerLevel): LivingEntity;
    static getPlayerByName(name: string): ServerPlayer;
    static getPlayerByUUID(uuid: UUID, serverLevel: ServerLevel): ServerPlayer;
    static getUUIDStringsByOwner(serverPlayer: ServerPlayer): Stream<string>;
    static hasAccess(uuid: UUID, serverPlayer: ServerPlayer): boolean;
    static hasAccess(entity: Entity, serverPlayer: ServerPlayer): boolean;
    static removeEasyNPC(easyNPC: EasyNPC<any>): void;
    static removeLivingEntity(livingEntity: LivingEntity): void;
    static removeServerPlayer(serverPlayer: ServerPlayer): void;
  }


  interface ModCustomEntityType extends Enum<ModCustomEntityType> {}
  class ModCustomEntityType extends Enum<ModCustomEntityType> {
    static readonly DOPPLER: ModCustomEntityType;
    static readonly FAIRY: ModCustomEntityType;
    static readonly ORC: ModCustomEntityType;
    static readonly ORC_WARRIOR: ModCustomEntityType;
    get attributes(): attributesupplier_Builder;
    get builder(): Builder<Entity>;
    get id(): string;
    get resourceKey(): ResourceKey<EntityType<any>>;
    static valueOf(name: string): ModCustomEntityType;
    static values(): ModCustomEntityType[];
  }


  class ModEntityType {
    static readonly ENTITY_TYPES: DeferredRegister;
    static readonly RAW_TYPE: Map;
    static readonly NPC_TYPE: Map;
    static readonly CUSTOM_TYPE: Map;
    static readonly USER_DEFINED_TYPE: Map;
    static readonly EPIC_FIGHT_TYPE: Map;
    static entityAttributeCreation(event: EntityAttributeCreationEvent): void;
    static getConfigurableEntityType<T extends Entity>(type: UserDefinedEntityType): EntityType<T>;
    static getEntityType<T extends Entity>(type: ModRawEntityType): EntityType<T>;
    static getEntityType<T extends Entity>(type: ModNPCEntityType): EntityType<T>;
    static getEntityType<T extends Entity>(type: ModCustomEntityType): EntityType<T>;
    static getEntityType<T extends Entity>(type: EpicFightEntityType): EntityType<T>;
  }


  class ModEntityTypeProvider {
    get builder(): Builder<Entity>;
    get id(): string;
    get resourceKey(): ResourceKey<EntityType<any>>;
  }


  interface ModNPCEntityType extends Enum<ModNPCEntityType> {}
  class ModNPCEntityType extends Enum<ModNPCEntityType> {
    static readonly ALLAY: ModNPCEntityType;
    static readonly BOGGED: ModNPCEntityType;
    static readonly CAT: ModNPCEntityType;
    static readonly CHICKEN: ModNPCEntityType;
    static readonly CREEPER: ModNPCEntityType;
    static readonly DROWNED: ModNPCEntityType;
    static readonly ENDERMAN: ModNPCEntityType;
    static readonly EVOKER: ModNPCEntityType;
    static readonly FOX: ModNPCEntityType;
    static readonly GHAST: ModNPCEntityType;
    static readonly HORSE: ModNPCEntityType;
    static readonly HORSE_SKELETON: ModNPCEntityType;
    static readonly HORSE_ZOMBIE: ModNPCEntityType;
    static readonly HUMANOID: ModNPCEntityType;
    static readonly HUMANOID_SLIM: ModNPCEntityType;
    static readonly ILLUSIONER: ModNPCEntityType;
    static readonly IRON_GOLEM: ModNPCEntityType;
    static readonly PIGLIN: ModNPCEntityType;
    static readonly PIGLIN_BRUTE: ModNPCEntityType;
    static readonly PIGLIN_ZOMBIFIED: ModNPCEntityType;
    static readonly PIG: ModNPCEntityType;
    static readonly PILLAGER: ModNPCEntityType;
    static readonly SKELETON: ModNPCEntityType;
    static readonly STRAY: ModNPCEntityType;
    static readonly WITHER_SKELETON: ModNPCEntityType;
    static readonly SLIME: ModNPCEntityType;
    static readonly SPIDER: ModNPCEntityType;
    static readonly CAVE_SPIDER: ModNPCEntityType;
    static readonly VILLAGER: ModNPCEntityType;
    static readonly VEX: ModNPCEntityType;
    static readonly VINDICATOR: ModNPCEntityType;
    static readonly WITCH: ModNPCEntityType;
    static readonly WOLF: ModNPCEntityType;
    static readonly ZOMBIE: ModNPCEntityType;
    static readonly ZOMBIE_HUSK: ModNPCEntityType;
    static readonly ZOMBIE_VILLAGER: ModNPCEntityType;
    get attributes(): attributesupplier_Builder;
    get builder(): Builder<Entity>;
    get id(): string;
    get resourceKey(): ResourceKey<EntityType<any>>;
    static valueOf(name: string): ModNPCEntityType;
    static values(): ModNPCEntityType[];
  }


  interface ModRawEntityType extends Enum<ModRawEntityType> {}
  class ModRawEntityType extends Enum<ModRawEntityType> {
    static readonly ALLAY: ModRawEntityType;
    static readonly BOGGED: ModRawEntityType;
    static readonly CAT: ModRawEntityType;
    static readonly CHICKEN: ModRawEntityType;
    static readonly CREEPER: ModRawEntityType;
    static readonly DROWNED: ModRawEntityType;
    static readonly FOX: ModRawEntityType;
    static readonly GHAST: ModRawEntityType;
    static readonly HORSE: ModRawEntityType;
    static readonly ILLUSIONER: ModRawEntityType;
    static readonly IRON_GOLEM: ModRawEntityType;
    static readonly ENDER_MAN: ModRawEntityType;
    static readonly PIGLIN: ModRawEntityType;
    static readonly PIGLIN_BRUTE: ModRawEntityType;
    static readonly ZOMBIFIED_PIGLIN: ModRawEntityType;
    static readonly EVOKER: ModRawEntityType;
    static readonly PIG: ModRawEntityType;
    static readonly PILLAGER: ModRawEntityType;
    static readonly SKELETON: ModRawEntityType;
    static readonly STRAY: ModRawEntityType;
    static readonly WITHER_SKELETON: ModRawEntityType;
    static readonly SPIDER: ModRawEntityType;
    static readonly SLIME: ModRawEntityType;
    static readonly VEX: ModRawEntityType;
    static readonly VILLAGER: ModRawEntityType;
    static readonly VINDICATOR: ModRawEntityType;
    static readonly WITCH: ModRawEntityType;
    static readonly WOLF: ModRawEntityType;
    static readonly ZOMBIE: ModRawEntityType;
    static readonly HUSK: ModRawEntityType;
    static readonly ZOMBIE_VILLAGER: ModRawEntityType;
    get attributes(): attributesupplier_Builder;
    get builder(): Builder<Entity>;
    get id(): string;
    get resourceKey(): ResourceKey<EntityType<any>>;
    static valueOf(name: string): ModRawEntityType;
    static values(): ModRawEntityType[];
  }


  class NPCEntityFactory {
    static createEntityFromBaseType(baseEntityType: EntityType<any>, targetEntityType: EntityType<any>, level: Level): Entity;
    static get supportedBaseTypeIds(): string[];
    static isBaseTypeSupported(baseEntityType: EntityType<any>): boolean;
    static registerEntityConstructor(baseEntityType: EntityType<any>, constructor: BiFunction<EntityType<any>, Level, Entity>): void;
  }


  class UserDefinedEntityRegistry {
    static get availableCount(): number;
    static get availableEntityTypes(): Set<UserDefinedEntityType>;
    static get registeredCount(): number;
    static getRegisteredEntityType(userDefinedType: UserDefinedEntityType): EntityType<any>;
    static initialize(): void;
    static isRegistered(userDefinedType: UserDefinedEntityType): boolean;
    static registerEntityType(userDefinedType: UserDefinedEntityType, entityType: EntityType<any>): void;
    static reload(): void;
  }


  interface UserDefinedEntityType extends ModEntityTypeProvider {}
  class UserDefinedEntityType extends ModEntityTypeProvider {
    constructor(entityId: string, baseEntityType: EntityType<any>, width: number, height: number);
    equals(other: any): boolean;
    get baseEntityType(): EntityType<any>;
    get builder(): Builder<Entity>;
    get id(): string;
    get resourceKey(): ResourceKey<EntityType<any>>;
    hashCode(): number;
    toString(): string;
  }


  class VanillaEntityAttributeHelper {
    static getVanillaAttributesForEntityType(entityType: EntityType<any>): attributesupplier_Builder;
  }

}

declare module 'de.markusbordihn.easynpc.gametest' {
  import { GameTestHelper } from 'net.minecraft.gametest.framework';
  import { UUID } from 'java.util';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { MenuType } from 'net.minecraft.world.inventory';
  import { DialogMenu } from 'de.markusbordihn.easynpc.menu.dialog';
  import { DialogDataSet } from 'de.markusbordihn.easynpc.data.dialog';
  import { EntityType, PathfinderMob, Entity } from 'net.minecraft.world.entity';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Item } from 'net.minecraft.world.item';
  import { ModSpawnEggItem } from 'de.markusbordihn.easynpc.item';

  class DialogScreenTest {
    testOpenBasicDialog(helper: GameTestHelper): void;
    testOpenDialog(helper: GameTestHelper): void;
    testOpenYesNoDialog(helper: GameTestHelper): void;
  }


  class DialogScreenTestHelper {
    static mockOpenDialog(serverPlayer: ServerPlayer, easyNPC: EasyNPC<any>, menuType: MenuType<DialogMenu>): UUID;
    static testDialogScreen(helper: GameTestHelper, dialogDataSet: DialogDataSet, npcEntityType: EntityType<PathfinderMob>, menuType: MenuType<DialogMenu>): void;
  }


  class GameTestHelpers {
    static assertEquals(helper: GameTestHelper, message: string, expected: any, actual: any): void;
    static assertNotNull(helper: GameTestHelper, message: string, object: any): void;
    static assertTrue(helper: GameTestHelper, message: string, condition: boolean): void;
    static mockEasyNPC(helper: GameTestHelper, entityType: EntityType<PathfinderMob>, position: Vec3): EasyNPC<any>;
    static mockServerPlayer(helper: GameTestHelper, position: Vec3): ServerPlayer;
    static spawnEntityType<T extends Entity>(helper: GameTestHelper, entityType: EntityType<PathfinderMob>): T;
    static spawnNPCEntityType(helper: GameTestHelper, entityType: EntityType<PathfinderMob>): EasyNPC<any>;
  }


  class ModSpawnEggItemTest {
    static useAllayNPCSpawnEggItem(helper: GameTestHelper): void;
    static useCatNPCSpawnEggItem(helper: GameTestHelper): void;
    static useChickenNPCSpawnEggItem(helper: GameTestHelper): void;
    static useDrownedNPCSpawnEggItem(helper: GameTestHelper): void;
    static useEvokerNPCSpawnEggItem(helper: GameTestHelper): void;
    static useFairyNPCSpawnEggItem(helper: GameTestHelper): void;
    static useHorseNPCSpawnEggItem(helper: GameTestHelper): void;
    static useHumanoidNPCSpawnEggItem(helper: GameTestHelper): void;
    static useHumanoidSlimNPCSpawnEggItem(helper: GameTestHelper): void;
    static useHuskNPCSpawnEggItem(helper: GameTestHelper): void;
    static useIllusionerNPCSpawnEggItem(helper: GameTestHelper): void;
    static useIronGolemNPCSpawnEggItem(helper: GameTestHelper): void;
    static useOrcNPCSpawnEggItem(helper: GameTestHelper): void;
    static useOrcWarriorNPCSpawnEggItem(helper: GameTestHelper): void;
    static usePigNPCSpawnEggItem(helper: GameTestHelper): void;
    static usePiglinBruteNPCSpawnEggItem(helper: GameTestHelper): void;
    static usePiglinNPCSpawnEggItem(helper: GameTestHelper): void;
    static usePiglinZombifiedNPCSpawnEggItem(helper: GameTestHelper): void;
    static usePillagerNPCSpawnEggItem(helper: GameTestHelper): void;
    static useSkeletonHorseNPCSpawnEggItem(helper: GameTestHelper): void;
    static useSkeletonNPCSpawnEggItem(helper: GameTestHelper): void;
    static useStrayNPCSpawnEggItem(helper: GameTestHelper): void;
    static useVillagerNPCSpawnEggItem(helper: GameTestHelper): void;
    static useVindicatorNPCSpawnEggItem(helper: GameTestHelper): void;
    static useWitherSkeletonNPCSpawnEggItem(helper: GameTestHelper): void;
    static useWolfNPCSpawnEggItem(helper: GameTestHelper): void;
    static useZombieHorseNPCSpawnEggItem(helper: GameTestHelper): void;
    static useZombieNPCSpawnEggItem(helper: GameTestHelper): void;
    static useZombieVillagerNPCSpawnEggItem(helper: GameTestHelper): void;
  }


  class ModSpawnEggItemTestHelper {
    static useSpawnEggItem(helper: GameTestHelper, item: Item, entityType: EntityType<PathfinderMob>): void;
    static useSpawnEggItem(helper: GameTestHelper, modSpawnEggItem: ModSpawnEggItem, entityType: EntityType<PathfinderMob>): void;
  }


  class SmokeTest {
    testModRegistered(helper: GameTestHelper): void;
  }

}

declare module 'de.markusbordihn.easynpc.handler' {
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { CombatAttributeType, EnvironmentalAttributeType, InteractionAttributeType, MovementAttributeType, EntityAttribute } from 'de.markusbordihn.easynpc.data.attribute';
  import { ValueType } from 'de.markusbordihn.easynpc.data.type';
  import { DisplayAttributeType, NameVisibilityType } from 'de.markusbordihn.easynpc.data.display';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Double } from 'java.lang';
  import { Mob, EquipmentSlot, LivingEntity, EntityType, Entity } from 'net.minecraft.world.entity';
  import { InteractionHand } from 'net.minecraft.world';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ObjectiveDataEntry } from 'de.markusbordihn.easynpc.data.objective';
  import { Set, List } from 'java.util';
  import { WrappedGoal, Goal } from 'net.minecraft.world.entity.ai.goal';
  import { Logger } from 'org.apache.logging.log4j';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { RenderType } from 'de.markusbordihn.easynpc.data.render';
  import { SkinDataEntry } from 'de.markusbordihn.easynpc.data.skin';
  import { TradingDataCapable } from 'de.markusbordihn.easynpc.entity.easynpc.data';

  class AttributeHandler {
    static handleDefaultAttributes(mob: Mob): void;
    static setBaseAttribute(easyNPC: EasyNPC<any>, attribute: ResourceLocation, value: number): boolean;
    static setCombatAttribute(easyNPC: EasyNPC<any>, attributeType: CombatAttributeType, valueType: ValueType, value: any): boolean;
    static setCombatAttribute(easyNPC: EasyNPC<any>, attributeType: CombatAttributeType, value: boolean): boolean;
    static setCombatAttribute(easyNPC: EasyNPC<any>, attributeType: CombatAttributeType, value: number): boolean;
    static setDisplayAttribute<T>(easyNPC: EasyNPC<any>, attributeType: DisplayAttributeType, value: T): boolean;
    static setEntityAttribute(easyNPC: EasyNPC<any>, entityAttribute: EntityAttribute, value: boolean): boolean;
    static setEnvironmentalAttribute(easyNPC: EasyNPC<any>, attributeType: EnvironmentalAttributeType, value: boolean): boolean;
    static setInteractionAttribute(easyNPC: EasyNPC<any>, attributeType: InteractionAttributeType, value: boolean): boolean;
    static setMovementAttribute(easyNPC: EasyNPC<any>, attributeType: MovementAttributeType, value: boolean): boolean;
  }


  class EquipmentHandler {
    static setArmorSlotItem(easyNPC: EasyNPC<any>, equipmentSlot: EquipmentSlot, itemStack: ItemStack): void;
    static setEquipmentSlotItem(easyNPC: EasyNPC<any>, equipmentSlot: EquipmentSlot, itemStack: ItemStack): boolean;
    static setHandSlotItem(easyNPC: EasyNPC<any>, interactionHand: InteractionHand, itemStack: ItemStack): void;
  }


  class NameHandler {
    static setCustomName(easyNPC: EasyNPC<any>, name: string, color: number, visible: boolean): boolean;
    static setCustomName(easyNPC: EasyNPC<any>, name: string, color: number, nameVisibilityType: NameVisibilityType): boolean;
  }


  class ObjectiveHandler {
    static addOrUpdateCustomObjective(easyNPC: EasyNPC<any>, objectiveDataEntry: ObjectiveDataEntry): boolean;
    static getUnwrappedGoals(goals: Set<WrappedGoal>): Goal[];
    static logObjectiveGoals(goals: Set<WrappedGoal>): void;
    static logObjectiveTargets(goals: Set<WrappedGoal>): void;
    static removeCustomObjective(easyNPC: EasyNPC<any>, objectiveDataEntry: ObjectiveDataEntry): boolean;
  }


  class OwnerHandler {
    static removeOwner(easyNPC: EasyNPC<any>): boolean;
    static setOwner(easyNPC: EasyNPC<any>, owner: LivingEntity): boolean;
  }


  class ReloadHandler {
    static readonly log: Logger;
    static reloadNPC(easyNPC: EasyNPC<any>, serverLevel: ServerLevel): boolean;
  }


  class RenderHandler {
    static setRenderEntity(easyNPC: EasyNPC<any>, entityType: EntityType<Entity>): boolean;
    static setRenderType(easyNPC: EasyNPC<any>, renderType: RenderType): boolean;
  }


  class RespawnHandler {
    static respawnNPC(easyNPC: EasyNPC<any>, serverLevel: ServerLevel): boolean;
  }


  class SkinHandler {
    static setSkin(easyNPC: EasyNPC<any>, skinDataEntry: SkinDataEntry): boolean;
  }


  class TradingOfferHandler {
    static setAdvancedTradingDemand(tradingData: TradingDataCapable<any>, tradingOfferIndex: number, demand: number): void;
    static setAdvancedTradingMaxUses(tradingData: TradingDataCapable<any>, tradingOfferIndex: number, maxUses: number): void;
    static setAdvancedTradingPriceMultiplier(tradingData: TradingDataCapable<any>, tradingOfferIndex: number, priceMultiplier: number): void;
    static setAdvancedTradingXp(tradingData: TradingDataCapable<any>, tradingOfferIndex: number, xp: number): void;
    static updateBasicTradingOffers(tradingData: TradingDataCapable<any>): void;
  }

}

declare module 'de.markusbordihn.easynpc.io' {
  import { Path } from 'java.nio.file';
  import { UUID, Date, Set } from 'java.util';
  import { Stream } from 'java.util.stream';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { PresetData, PresetMetadata } from 'de.markusbordihn.easynpc.data.preset';
  import { MinecraftServer } from 'net.minecraft.server';
  import { SkinModel } from 'de.markusbordihn.easynpc.data.skin';
  import { File, InputStream } from 'java.io';
  import { CompoundTag } from 'net.minecraft.nbt';

  class BackupDataFiles {
    static get backupDataFolder(): Path;
    static getBackupFile(uuid: UUID, date: Date): Path;
    static registerBackupData(): void;
  }


  class ClientDefaultPresetDataFiles {
    static clearCache(): void;
    static get defaultPresetResourceLocations(): Stream<ResourceLocation>;
    static getPresetDisplayName(resourceLocation: ResourceLocation, metadata: PresetMetadata): string;
    static getPresetMetadata(resourceLocation: ResourceLocation): PresetMetadata;
    static loadDefaultPresetData(resourceLocation: ResourceLocation): PresetData;
  }


  class CustomPoseDataFiles {
    static get customPoseDataFolder(): Path;
    static getCustomPoseDataFolder(skinModel: SkinModel): Path;
    static registerCustomPoseData(minecraftServer: MinecraftServer): void;
    static registerCustomPoseFiles(): void;
  }


  class CustomPresetDataFiles {
    static get presetDataFolder(): Path;
    static get presetResourceLocationSet(): Set<ResourceLocation>;
    static get presetResourceLocations(): Stream<ResourceLocation>;
    static getPresetDataFolder(skinModel: SkinModel): Path;
    static getPresetDisplayName(resourceLocation: ResourceLocation, metadata: PresetMetadata): string;
    static getPresetFile(skinModel: SkinModel, fileName: string): File;
    static getPresetFile(skinModel: SkinModel, uuid: UUID): File;
    static getPresetMetadata(resourceLocation: ResourceLocation): PresetMetadata;
    static getPresetResourceLocations(skinModel: SkinModel): Stream<ResourceLocation>;
    static getPresetsResourceLocationPath(resourceLocation: ResourceLocation): Path;
    static refreshPresetResourceLocations(): void;
    static registerCustomPresetData(): void;
  }


  class CustomSkinDataFiles {
    static get customSkinDataFolder(): Path;
    static getCustomSkinDataFolder(skinModel: SkinModel): Path;
    static refreshRegisterTextureFiles(): void;
    static registerCustomSkinData(): void;
    static registerTextureFiles(): void;
  }


  class DataFileHandler {
    static copyResourceFile(minecraftServer: MinecraftServer, resourceLocation: ResourceLocation, targetFile: File): boolean;
    static copyResourceFile(minecraftServer: MinecraftServer, resourceLocation: ResourceLocation, targetFile: File, overwriteExisting: boolean): boolean;
    static copyResourceFile(resourceLocation: ResourceLocation, targetFile: File): boolean;
    static copyResourceFile(resourceLocation: ResourceLocation, targetFile: File, overwriteExisting: boolean): boolean;
    static get backupFolder(): Path;
    static get cacheFolder(): Path;
    static get customDataFolder(): Path;
    static getFileNameFromResourceLocation(resourceLocation: ResourceLocation): string;
    static getOrCreateBackupFolder(dataLabel: string): Path;
    static getOrCreateCacheFolder(dataLabel: string): Path;
    static getOrCreateCustomDataFolder(dataLabel: string): Path;
    static getPresetFileName(fileName: string): string;
    static isPresetFile(path: Path): boolean;
    static isPresetFile(resourceLocation: ResourceLocation): boolean;
    static isValidPresetFilename(filename: string): boolean;
    static isValidPresetFilename(path: Path): boolean;
    static registerClientDataFiles(): void;
    static registerCommonDataFiles(): void;
    static registerServerDataFiles(minecraftServer: MinecraftServer): void;
  }


  class DataPresetDataFiles {
    static getPresetDisplayName(resourceLocation: ResourceLocation, metadata: PresetMetadata): string;
    static getPresetMetadata(minecraftServer: MinecraftServer, resourceLocation: ResourceLocation): PresetMetadata;
    static getPresetResourceLocations(minecraftServer: MinecraftServer): Stream<ResourceLocation>;
  }


  class DefaultPresetDataFiles {
    static getPresetResourceLocations(minecraftServer: MinecraftServer): Stream<ResourceLocation>;
  }


  class LocalPresetDataFiles {
    static get presetResourceLocationSet(): Set<ResourceLocation>;
    static get presetResourceLocations(): Stream<ResourceLocation>;
    static getPresetDisplayName(resourceLocation: ResourceLocation, metadata: PresetMetadata): string;
    static getPresetMetadata(resourceLocation: ResourceLocation): PresetMetadata;
    static getPresetResourceLocations(skinModel: SkinModel): Stream<ResourceLocation>;
    static getPresetsResourceLocationPath(resourceLocation: ResourceLocation): Path;
    static loadPresetData(resourceLocation: ResourceLocation): PresetData;
    static registerLocalPresetData(): void;
  }


  class PlayerSkinDataFiles {
    static get playerSkinDataFolder(): Path;
    static getPlayerSkinDataFolder(skinModel: SkinModel): Path;
    static registerPlayerSkinData(): void;
  }


  class PresetFileHandler {
    static extractMetadata(compoundTag: CompoundTag): PresetMetadata;
    static extractMetadata(inputStream: InputStream, resourceLocation: ResourceLocation): PresetMetadata;
    static getDisplayName(resourceLocation: ResourceLocation, metadata: PresetMetadata): string;
    static load(file: File): CompoundTag;
    static loadFromInputStream(inputStream: InputStream, resourceLocation: ResourceLocation): CompoundTag;
    static loadNbt(file: File): CompoundTag;
    static loadSnbt(file: File): CompoundTag;
    static save(file: File, compoundTag: CompoundTag): boolean;
    static saveNbt(file: File, compoundTag: CompoundTag): boolean;
    static saveSnbt(file: File, compoundTag: CompoundTag): boolean;
  }


  class RemoteSkinDataFiles {
    static get remoteSkinDataFolder(): Path;
    static getRemoteSkinDataFolder(skinModel: SkinModel): Path;
    static registerRemoteSkinData(): void;
  }


  class WorldPresetDataFiles {
    static get presetDataFolder(): Path;
    static get presetResourceLocationSet(): Set<ResourceLocation>;
    static get presetResourceLocations(): Stream<ResourceLocation>;
    static getPresetDataFolder(skinModel: SkinModel): Path;
    static getPresetFile(skinModel: SkinModel, fileName: string): File;
    static getPresetMetadata(resourceLocation: ResourceLocation): PresetMetadata;
    static getPresetsResourceLocationPath(resourceLocation: ResourceLocation): Path;
    static refreshPresetResourceLocations(): void;
    static registerWorldPresetData(): void;
  }

}

declare module 'de.markusbordihn.easynpc.item.attack' {
  import { ArrowItem } from 'net.minecraft.world.item';
  import { Properties } from 'Item';

  interface BulletItem extends ArrowItem {}
  class BulletItem extends ArrowItem {
    static readonly ID: string;
    constructor(properties: Properties);
  }

}

declare module 'de.markusbordihn.easynpc.item.configuration' {
  import { Item, ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { Properties, TooltipContext } from 'Item';
  import { InteractionResult, InteractionHand } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { UseOnContext } from 'net.minecraft.world.item.context';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { List, UUID } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  interface EasyNPCPresetEmptyItem extends Item {}
  class EasyNPCPresetEmptyItem extends Item {
    static readonly NAME: string;
    constructor(properties: Properties);
    appendHoverText(itemStack: ItemStack, tooltipContext: TooltipContext, tooltipList: Component[], tooltipFlag: TooltipFlag): void;
    canAttackBlock(blockState: BlockState, level: Level, blockPos: BlockPos, player: Player): boolean;
    interactLivingEntity(itemStack: ItemStack, player: Player, livingEntity: LivingEntity, hand: InteractionHand): InteractionResult;
    useOn(useOnContext: UseOnContext): InteractionResult;
  }


  interface EasyNPCPresetItem extends Item {}
  class EasyNPCPresetItem extends Item {
    static readonly NAME: string;
    constructor(properties: Properties);
    appendHoverText(itemStack: ItemStack, tooltipContext: TooltipContext, tooltip: Component[], flag: TooltipFlag): void;
    canAttackBlock(blockState: BlockState, level: Level, blockPos: BlockPos, player: Player): boolean;
    static getCustomName(itemStack: ItemStack): string;
    static getPresetUUID(itemStack: ItemStack): UUID;
    useOn(useOnContext: UseOnContext): InteractionResult;
  }


  interface MoveEasyNPCItem extends Item {}
  class MoveEasyNPCItem extends Item {
    static readonly ID: string;
    constructor(properties: Properties);
    appendHoverText(itemStack: ItemStack, tooltipContext: TooltipContext, tooltipList: Component[], tooltipFlag: TooltipFlag): void;
    canAttackBlock(blockState: BlockState, level: Level, blockPos: BlockPos, player: Player): boolean;
    interactLivingEntity(itemStack: ItemStack, player: Player, livingEntity: LivingEntity, hand: InteractionHand): InteractionResult;
  }

}

declare module 'de.markusbordihn.easynpc.item' {
  import { Item, ItemStack, TooltipFlag, BlockItem, SpawnEggItem } from 'net.minecraft.world.item';
  import { Properties, TooltipContext } from 'Item';
  import { InteractionResultHolder, InteractionHand, InteractionResult } from 'net.minecraft.world';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { List, Map } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { Block } from 'net.minecraft.world.level.block';
  import { SpawnerType } from 'de.markusbordihn.easynpc.data.spawner';
  import { EntityType, Mob } from 'net.minecraft.world.entity';
  import { Supplier } from 'java.util.function';
  import { Items } from 'DeferredRegister';
  import { DeferredItem } from 'net.neoforged.neoforge.registries';
  import { TagKey } from 'net.minecraft.tags';
  import { FeatureFlagSet } from 'net.minecraft.world.flag';
  import { UseOnContext } from 'net.minecraft.world.item.context';

  interface CustomDataTestItem extends Item {}
  class CustomDataTestItem extends Item {
    static readonly ID: string;
    constructor(properties: Properties);
    appendHoverText(itemStack: ItemStack, tooltipContext: TooltipContext, tooltipList: Component[], tooltipFlag: TooltipFlag): void;
    get defaultInstance(): ItemStack;
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface EasyNPCSpawnerBlockItem extends BlockItem {}
  class EasyNPCSpawnerBlockItem extends BlockItem {
    constructor(block: Block, properties: Properties, spawnerType: SpawnerType);
    appendHoverText(itemStack: ItemStack, tooltipContext: TooltipContext, tooltip: Component[], flag: TooltipFlag): void;
  }


  interface ModEpicFightSpawnEggItem extends ModSpawnEggItem {}
  class ModEpicFightSpawnEggItem extends ModSpawnEggItem {
    constructor(entityType: EntityType<Mob>, properties: Properties);

    constructor(entityType: Supplier<EntityType<Mob>>, properties: Properties);
    getName(itemStack: ItemStack): Component;
  }


  class ModItems {
    static readonly ITEMS: Items;
    static readonly NPC_SPAWN_EGGS: Map;
    static readonly CUSTOM_NPC_SPAWN_EGGS: Map;
    static readonly EPIC_FIGHT_SPAWN_EGGS: Map;
    static readonly BULLET_ITEM: DeferredItem;
    static readonly EASY_NPC_PRESET_EMPTY_ITEM: DeferredItem;
    static readonly EASY_NPC_PRESET_ITEM: DeferredItem;
    static readonly EASY_NPC_SPAWNER_BOSS: DeferredItem;
    static readonly EASY_NPC_SPAWNER_DEFAULT: DeferredItem;
    static readonly EASY_NPC_SPAWNER_GROUP: DeferredItem;
    static readonly EASY_NPC_SPAWNER_SINGLE: DeferredItem;
    static readonly MOVE_EASY_NPC: DeferredItem;
    static readonly CUSTOM_DATA_TEST_ITEM: DeferredItem;
  }


  class ModItemTags {
    static readonly RANGED_WEAPON_BOW: TagKey;
    static readonly RANGED_WEAPON_CROSSBOW: TagKey;
    static readonly RANGED_WEAPON_GUN: TagKey;
  }


  interface ModSpawnEggItem extends SpawnEggItem {}
  class ModSpawnEggItem extends SpawnEggItem {
    static readonly SUFFIX: string;
    constructor(entityType: EntityType<Mob>, properties: Properties);

    constructor(entityType: Supplier<EntityType<Mob>>, properties: Properties);
    getName(itemStack: ItemStack): Component;
    getType(itemStack: ItemStack): EntityType<any>;
    requiredFeatures(): FeatureFlagSet;
    useOn(context: UseOnContext): InteractionResult;
  }

}

declare module 'de.markusbordihn.easynpc.level' {
  import { BaseSpawner, Level, SpawnData } from 'net.minecraft.world.level';
  import { SpawnerType } from 'de.markusbordihn.easynpc.data.spawner';
  import { BlockPos } from 'net.minecraft.core';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface BaseEasyNPCSpawner extends BaseSpawner {}
  class BaseEasyNPCSpawner extends BaseSpawner {
    constructor(spawnerType: SpawnerType);
    broadcastEvent(level: Level, blockPos: BlockPos, eventId: number): void;
    clientTick(level: Level, blockPos: BlockPos): void;
    hasEasyNPC(): boolean;
    load(level: Level, blockPos: BlockPos, compoundTag: CompoundTag): void;
    save(compoundTag: CompoundTag): CompoundTag;
    serverTick(serverLevel: ServerLevel, blockPos: BlockPos): void;
    updateSpawnData(level: Level, blockPos: BlockPos, spawnData: SpawnData): void;
  }

}

declare module 'de.markusbordihn.easynpc.menu' {
  import { UUID, List } from 'java.util';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ScreenData, AdditionalScreenData } from 'de.markusbordihn.easynpc.data.screen';
  import { AbstractContainerMenu, MenuType } from 'net.minecraft.world.inventory';
  import { Inventory, Player } from 'net.minecraft.world.entity.player';
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { ItemStack } from 'net.minecraft.world.item';
  import { DialogMenu } from 'de.markusbordihn.easynpc.menu.dialog';
  import { Logger } from 'org.apache.logging.log4j';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { MenuProvider } from 'net.minecraft.world';
  import { Enum } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { DeferredRegister, DeferredHolder } from 'net.neoforged.neoforge.registries';

  class ClientMenuManager {
    static clearMenuData(): void;
    static get additionalScreenData(): AdditionalScreenData;
    static get menuData(): CompoundTag;
    static get menuId(): UUID;
    static get screenData(): ScreenData;
    static hasAdditionalScreenData(): boolean;
    static setMenuData(menuId: UUID, menuData: CompoundTag): void;
  }


  interface EasyNPCMenu extends ScreenMenuInterface<AdditionalScreenData>, AbstractContainerMenu {}
  class EasyNPCMenu extends ScreenMenuInterface<AdditionalScreenData> {
    constructor(menuType: MenuType<any>, containerId: number, playerInventory: Inventory);

    constructor(menuType: MenuType<any>, containerId: number, playerInventory: Inventory, data: CompoundTag);
    get additionalScreenData(): AdditionalScreenData;
    get easyNPC(): EasyNPC<any>;
    get npcUUID(): UUID;
    get pageIndex(): number;
    get screenData(): ScreenData;
    quickMoveStack(player: Player, slotIndex: number): ItemStack;
    stillValid(player: Player): boolean;
  }


  interface MenuHandler extends MenuHandlerInterface {}
  class MenuHandler extends MenuHandlerInterface {
    get dialogMenuType(): MenuType<DialogMenu>;
  }


  class MenuHandlerInterface {
    static readonly log: Logger;
    get dialogMenuType(): MenuType<DialogMenu>;
    openDialogMenu(serverPlayer: ServerPlayer, easyNPC: EasyNPC<any>, dialogId: UUID, pageIndex: number): void;
  }


  class MenuManager {
    static cleanupPlayerMenus(serverPlayer: ServerPlayer): void;
    static get menuHandler(): MenuHandlerInterface;
    static openMenu(uuid: UUID, menuProvider: MenuProvider, serverPlayer: ServerPlayer, data: CompoundTag): void;
    static openMenu(menuId: UUID, serverPlayer: ServerPlayer): void;
    static registerMenu(uuid: UUID, menuProvider: MenuProvider, serverPlayer: ServerPlayer): UUID;
    static registerMenuHandler(menuHandler: MenuHandlerInterface): void;
  }


  interface ModMenuType extends Enum<ModMenuType> {}
  class ModMenuType extends Enum<ModMenuType> {
    static readonly DIALOG: ModMenuType;
    static readonly SPAWNER: ModMenuType;
    get id(): ResourceLocation;
    get name(): string;
    static valueOf(name: string): ModMenuType;
    static values(): ModMenuType[];
  }


  class ModMenuTypes {
    static readonly MENU_TYPES: DeferredRegister;
    static readonly DIALOG_MENU: DeferredHolder;
  }


  class ScreenMenuInterface<D extends AdditionalScreenDataInterface = any> {
    get additionalScreenData(): D;
    get easyNPC(): EasyNPC<any>;
    get npcUUID(): UUID;
    get screenData(): ScreenData;
  }

}

declare module 'de.markusbordihn.easynpc.menu.dialog' {
  import { EasyNPCMenu } from 'de.markusbordihn.easynpc.menu';
  import { MenuType, AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { Inventory, Player } from 'net.minecraft.world.entity.player';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { MenuProvider } from 'net.minecraft.world';
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { ScreenData } from 'de.markusbordihn.easynpc.data.screen';
  import { Component } from 'net.minecraft.network.chat';
  import { UUID } from 'java.util';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  interface DialogMenu extends EasyNPCMenu {}
  class DialogMenu extends EasyNPCMenu {
    constructor(menuType: MenuType<any>, containerId: number, playerInventory: Inventory);

    constructor(menuType: MenuType<any>, containerId: number, playerInventory: Inventory, data: CompoundTag);
  }


  class DialogMenuHandler {
    createMenu(containerId: number, playerInventory: Inventory, player: Player): AbstractContainerMenu;
    get displayName(): Component;
    static getMenuProvider(easyNPC: EasyNPC<any>, menuType: MenuType<DialogMenu>, screenData: ScreenData): MenuProvider;
    static getScreenData(easyNPC: EasyNPC<any>, dialogId: UUID, pageIndex: number, serverPlayer: ServerPlayer): ScreenData;
    toString(): string;
  }


  interface DialogMenuWrapper extends DialogMenu {}
  class DialogMenuWrapper extends DialogMenu {
    constructor(containerId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }

}

declare module 'de.markusbordihn.easynpc.mixin.entity' {
  import { Monster, PatrollingMonster } from 'net.minecraft.world.entity.monster';
  import { PowerableMob } from 'net.minecraft.world.entity';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { AbstractVillager } from 'net.minecraft.world.entity.npc';
  import { Raider } from 'net.minecraft.world.entity.raid';

  interface CreeperMixin extends PowerableMob, Monster {}
  class CreeperMixin extends PowerableMob {
    onTick(callbackInfo: CallbackInfo): void;
  }


  interface EndermanMixin extends Monster {}
  class EndermanMixin extends Monster {
    onCustomServerAiStep(ci: CallbackInfo): void;
  }


  class FoxMixin {
  }


  interface RaiderMixin extends PatrollingMonster {}
  class RaiderMixin extends PatrollingMonster {
    onAiStep(callbackInfo: CallbackInfo): void;
  }


  class SlimeMixin {
  }


  interface VillagerMixin extends AbstractVillager {}
  class VillagerMixin extends AbstractVillager {
    onCustomServerAiStep(ci: CallbackInfo): void;
  }


  interface WitchMixin extends Raider {}
  class WitchMixin extends Raider {
    onAiStep(callbackInfo: CallbackInfo): void;
  }

}

declare module 'de.markusbordihn.easynpc.mixin.menu' {
  class MerchantMenuMixin {
  }

}

declare module 'de.markusbordihn.easynpc.mixin.model' {
  import { OcelotModel } from 'net.minecraft.client.model';
  import { ModelPart } from 'net.minecraft.client.model.geom';
  import { EasyNPCModelManager } from 'de.markusbordihn.easynpc.client.model';

  class EasyNPCAllayModelMixin {
  }


  interface EasyNPCCatModelMixin<T extends Cat = any> extends OcelotModel<T> {}
  class EasyNPCCatModelMixin<T extends Cat = any> extends OcelotModel<T> {
    constructor(modelPart: ModelPart);
  }


  class EasyNPCChickenModelMixin<T extends Entity = any> {
  }


  class EasyNPCCreeperModelMixin<T extends Entity = any> {
  }


  class EasyNPCFoxModelMixin<T extends Fox = any> {
    head: ModelPart;
  }


  class EasyNPCGhastModelMixin<T extends Entity = any> {
  }


  class EasyNPCHumanoidModelMixin<T extends LivingEntity = any> {
    head: ModelPart;
    hat: ModelPart;
    body: ModelPart;
    rightArm: ModelPart;
    leftArm: ModelPart;
    rightLeg: ModelPart;
    leftLeg: ModelPart;
    easyNPC$getModelManager(): EasyNPCModelManager;
  }


  class EasyNPCIllagerModelMixin<T extends AbstractIllager = any> {
  }


  class EasyNPCIronGolemModelMixin<T extends IronGolem = any> {
  }


  interface EasyNPCPlayerModelMixin<T extends LivingEntity = any> extends EasyNPCHumanoidModelMixin<T> {}
  class EasyNPCPlayerModelMixin<T extends LivingEntity = any> extends EasyNPCHumanoidModelMixin<T> {
    leftSleeve: ModelPart;
    rightSleeve: ModelPart;
    leftPants: ModelPart;
    rightPants: ModelPart;
    jacket: ModelPart;
  }


  class EasyNPCQuadrupedModelMixin<T extends Entity = any> {
  }


  class EasyNPCSlimeModelMixin<T extends Entity = any> {
  }


  class EasyNPCSpiderModelMixin<T extends Entity = any> {
  }


  class EasyNPCVexModelMixin {
  }


  class EasyNPCVillagerModelMixin<T extends Entity = any> {
  }


  class EasyNPCWolfModelMixin<T extends Wolf = any> {
  }

}

declare module 'de.markusbordihn.easynpc.mixin.renderer' {
  class CatCollarLayerMixin {
  }


  class DrownedOuterLayerMixin {
  }


  class EasyNPCEntityRendererMixin<T extends Entity = any> {
  }


  class EasyNPCGhastRendererMixin {
  }


  class EasyNPCLivingEntityRendererMixin {
  }


  class EasyNPCSlimeRendererMixin {
  }


  class HumanoidArmorLayerMixin<T extends LivingEntity = any, M extends HumanoidModel<T> = any, A extends HumanoidModel<T> = any> {
  }


  class SkeletonClothingLayerMixin {
  }


  class VillagerProfessionLayerMixin {
  }

}

declare module 'de.markusbordihn.easynpc.mixin.spawner' {
  import { SpawnerAccessHelper } from 'de.markusbordihn.easynpc.access';
  import { Level, SpawnData } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { SpawnerType } from 'de.markusbordihn.easynpc.data.spawner';

  interface BaseSpawnerMixin extends SpawnerAccessHelper {}
  class BaseSpawnerMixin extends SpawnerAccessHelper {
    get maxNearbyEntities(): number;
    get maxSpawnDelay(): number;
    get minSpawnDelay(): number;
    get requiredPlayerRange(): number;
    get spawnCount(): number;
    get spawnDataDirect(): SpawnData;
    get spawnDelay(): number;
    get spawnRange(): number;
    get spawnerType(): SpawnerType;
    initializeSpawnerData(spawnerType: SpawnerType, spawnData: SpawnData): void;
    set maxNearbyEntities(value: number);
    set maxSpawnDelay(value: number);
    set minSpawnDelay(value: number);
    set requiredPlayerRange(value: number);
    set spawnCount(value: number);
    set spawnDelay(value: number);
    set spawnRange(value: number);
    setSpawnDataDirect(level: Level, blockPos: BlockPos, spawnData: SpawnData): void;
  }

}

declare module 'de.markusbordihn.easynpc.mixin.target' {
  import { GoalSelector } from 'net.minecraft.world.entity.ai.goal';

  class LivingEntityTargetingMixin {
  }


  class MobTargetingMixin {
    goalSelector: GoalSelector;
    targetSelector: GoalSelector;
  }

}

declare module 'de.markusbordihn.easynpc.network' {
  import { ClientNetworkMessageHandlerInterface, NetworkMessageRecord, ServerNetworkMessageHandlerInterface } from 'de.markusbordihn.easynpc.network.message';
  import { RegisterPayloadHandlersEvent } from 'net.neoforged.neoforge.network.event';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf, FriendlyByteBuf } from 'net.minecraft.network';
  import { Class, Enum } from 'java.lang';
  import { Function } from 'java.util.function';
  import { Map, List } from 'java.util';
  import { Logger } from 'org.apache.logging.log4j';

  interface ClientNetworkMessageHandler extends ClientNetworkMessageHandlerInterface {}
  class ClientNetworkMessageHandler extends ClientNetworkMessageHandlerInterface {
    constructor();
  }


  interface NetworkHandler extends NetworkHandlerInterface {}
  class NetworkHandler extends NetworkHandlerInterface {
    constructor();
    addClientMessage<M extends NetworkMessageRecord>(messageID: Type<M>, networkMessage: Class<M>): void;
    addRegisteredClientMessage<M extends NetworkMessageRecord>(messageID: Type<M>, networkMessage: Class<M>): void;
    addRegisteredServerMessage<M extends NetworkMessageRecord>(messageID: Type<M>, networkMessage: Class<M>): void;
    addServerMessage<M extends NetworkMessageRecord>(messageID: Type<M>, networkMessage: Class<M>): void;
    get clientMessages(): Map<Type<any>, Class<NetworkMessageRecord>>;
    get registeredClientMessages(): Map<Type<any>, Class<NetworkMessageRecord>>;
    get registeredServerMessages(): Map<Type<any>, Class<NetworkMessageRecord>>;
    get serverMessages(): Map<Type<any>, Class<NetworkMessageRecord>>;
    registerClientNetworkMessageHandler<M extends NetworkMessageRecord>(type: Type<M>, codec: StreamCodec<RegistryFriendlyByteBuf, M>, networkMessage: Class<M>, creator: Function<FriendlyByteBuf, M>): void;
    static registerNetworkHandler(payloadHandlersEvent: RegisterPayloadHandlersEvent): void;
    registerServerNetworkMessageHandler<M extends NetworkMessageRecord>(type: Type<M>, codec: StreamCodec<RegistryFriendlyByteBuf, M>, networkMessage: Class<M>, creator: Function<FriendlyByteBuf, M>): void;
    sendToPlayer<M extends NetworkMessageRecord>(networkMessageRecord: M, serverPlayer: ServerPlayer): void;
    sendToServer<M extends NetworkMessageRecord>(networkMessageRecord: M): void;
  }


  class NetworkHandlerInterface {
    static readonly log: Logger;
    static readonly LOG_PREFIX: string;
    static readonly PROTOCOL_VERSION: number;
    addClientMessage<M extends NetworkMessageRecord>(var1: Type<M>, var2: Class<M>): void;
    addRegisteredClientMessage<M extends NetworkMessageRecord>(var1: Type<M>, var2: Class<M>): void;
    addRegisteredServerMessage<M extends NetworkMessageRecord>(var1: Type<M>, var2: Class<M>): void;
    addServerMessage<M extends NetworkMessageRecord>(var1: Type<M>, var2: Class<M>): void;
    get clientMessages(): Map<Type<any>, Class<NetworkMessageRecord>>;
    get registeredClientMessages(): Map<Type<any>, Class<NetworkMessageRecord>>;
    get registeredServerMessages(): Map<Type<any>, Class<NetworkMessageRecord>>;
    get serverMessages(): Map<Type<any>, Class<NetworkMessageRecord>>;
    getRegisteredClientMessage(messageID: Type<any>): Class<NetworkMessageRecord>;
    getRegisteredClientMessageId(networkMessage: Class<NetworkMessageRecord>): Type<any>;
    getRegisteredServerMessage(messageID: Type<any>): Class<NetworkMessageRecord>;
    getRegisteredServerMessageId(networkMessage: Class<NetworkMessageRecord>): Type<any>;
    hasClientMessage(messageID: Type<any>): boolean;
    hasRegisteredClientMessage(messageID: Type<any>): boolean;
    hasRegisteredClientMessage(networkMessage: Class<NetworkMessageRecord>): boolean;
    hasRegisteredServerMessage(messageID: Type<any>): boolean;
    hasRegisteredServerMessage(networkMessage: Class<NetworkMessageRecord>): boolean;
    hasServerMessage(messageID: Type<any>): boolean;
    logRegisterClientNetworkMessageHandler(messageID: Type<any>, networkMessage: Class<any>): void;
    logRegisterClientNetworkMessageHandler(messageID: Type<any>, networkMessage: Class<any>, registrationID: number): void;
    logRegisterServerNetworkMessageHandler(messageID: Type<any>, networkMessage: Class<any>): void;
    logRegisterServerNetworkMessageHandler(messageID: Type<any>, networkMessage: Class<any>, registrationID: number): void;
    registerClientNetworkMessage<M extends NetworkMessageRecord>(type: Type<M>, codec: StreamCodec<RegistryFriendlyByteBuf, M>, networkMessage: Class<M>, creator: Function<FriendlyByteBuf, M>): void;
    registerClientNetworkMessageHandler<M extends NetworkMessageRecord>(var1: Type<M>, var2: StreamCodec<RegistryFriendlyByteBuf, M>, var3: Class<M>, var4: Function<FriendlyByteBuf, M>): void;
    registerClientPayloadType<M extends NetworkMessageRecord>(type: Type<M>, codec: StreamCodec<RegistryFriendlyByteBuf, M>): void;
    registerServerNetworkMessage<M extends NetworkMessageRecord>(type: Type<M>, codec: StreamCodec<RegistryFriendlyByteBuf, M>, networkMessage: Class<M>, creator: Function<FriendlyByteBuf, M>): void;
    registerServerNetworkMessageHandler<M extends NetworkMessageRecord>(var1: Type<M>, var2: StreamCodec<RegistryFriendlyByteBuf, M>, var3: Class<M>, var4: Function<FriendlyByteBuf, M>): void;
    registerServerPayloadType<M extends NetworkMessageRecord>(type: Type<M>, codec: StreamCodec<RegistryFriendlyByteBuf, M>): void;
    sendMessageToPlayer(networkMessageRecord: NetworkMessageRecord, serverPlayer: ServerPlayer): boolean;
    sendMessageToServer(networkMessageRecord: NetworkMessageRecord): boolean;
    sendToPlayer<M extends NetworkMessageRecord>(var1: M, var2: ServerPlayer): void;
    sendToServer<M extends NetworkMessageRecord>(var1: M): void;
  }


  class NetworkHandlerManager {
    static get handler(): NetworkHandlerInterface;
    static isClientNetworkHandler(): boolean;
    static isServerNetworkHandler(): boolean;
    static registerClientNetworkHandler(): void;
    static registerHandler(networkHandler: NetworkHandlerInterface): void;
    static registerNetworkHandler(): void;
    static registerNetworkMessages(networkHandlerType: NetworkHandlerManagerType): void;
    static registerServerNetworkHandler(): void;
    static sendMessageToPlayer(networkMessageRecord: NetworkMessageRecord, serverPlayer: ServerPlayer): void;
    static sendMessageToServer(networkMessageRecord: NetworkMessageRecord): void;
  }


  interface NetworkHandlerManagerType extends Enum<NetworkHandlerManagerType> {}
  class NetworkHandlerManagerType extends Enum<NetworkHandlerManagerType> {
    static readonly CLIENT: NetworkHandlerManagerType;
    static readonly SERVER: NetworkHandlerManagerType;
    static readonly BOTH: NetworkHandlerManagerType;
    static valueOf(name: string): NetworkHandlerManagerType;
    static values(): NetworkHandlerManagerType[];
  }


  class NetworkMessageHandlerManager {
    static get clientHandler(): ClientNetworkMessageHandlerInterface;
    static get serverHandler(): ServerNetworkMessageHandlerInterface;
    static registerClientHandler(networkMessageHandler: ClientNetworkMessageHandlerInterface): void;
    static registerServerHandler(networkMessageHandler: ServerNetworkMessageHandlerInterface): void;
  }


  interface ServerNetworkMessageHandler extends ServerNetworkMessageHandlerInterface {}
  class ServerNetworkMessageHandler extends ServerNetworkMessageHandlerInterface {
    constructor();
  }

}

declare module 'de.markusbordihn.easynpc.network.components' {
  import { MutableComponent, Component } from 'net.minecraft.network.chat';
  import { Player } from 'net.minecraft.world.entity.player';
  import { LivingEntity } from 'net.minecraft.world.entity';

  class TextComponent {
    static get blankText(): MutableComponent;
    static getText(text: string): MutableComponent;
    static getTextComponent(text: string): MutableComponent;
    static getTextComponent(text: string, player: Player): MutableComponent;
    static getTextComponent(text: string, data: string): MutableComponent;
    static getTextComponent(text: string, data: Component): MutableComponent;
    static getTextComponentRaw(text: string, translate: boolean): MutableComponent;
    static getTranslatedConfigText(translationKey: string): MutableComponent;
    static getTranslatedConfigText(translationKey: string, data: string): MutableComponent;
    static getTranslatedConfigText(translationKey: string, data: string, data2: string): MutableComponent;
    static getTranslatedConfigText(translationKey: string, data: Component): MutableComponent;
    static getTranslatedText(translationKey: string): MutableComponent;
    static getTranslatedText(translationKey: string, data: string): MutableComponent;
    static getTranslatedText(translationKey: string, data: string, data2: string): MutableComponent;
    static getTranslatedText(translationKey: string, data: Component): MutableComponent;
    static getTranslatedText(translationKey: string, livingEntity: LivingEntity, player: Player): MutableComponent;
    static getTranslatedTextRaw(translationKey: string): MutableComponent;
    static getTranslatedTextRaw(translationKey: string, data: string): MutableComponent;
    static getTranslatedTextRaw(translationKey: string, data: string, data2: string): MutableComponent;
    static getTranslatedTextRaw(translationKey: string, data: Component): MutableComponent;
    static getTranslatedTextRaw(translationKey: string, data: Component, data2: Component): MutableComponent;
  }

}

declare module 'de.markusbordihn.easynpc.network.message' {
  import { Logger } from 'org.apache.logging.log4j';
  import { UUID, Random } from 'java.util';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { ActionEventType } from 'de.markusbordihn.easynpc.data.action';

  class ClientNetworkMessageHandlerInterface {
    static readonly log: Logger;
    openMenu(uuid: UUID, menuId: UUID, serverPlayer: ServerPlayer, data: CompoundTag): void;
    syncData(easyNPC: EasyNPC<any>, serverPlayer: ServerPlayer): void;
  }


  interface NetworkMessageRecord extends CustomPacketPayload {}
  class NetworkMessageRecord extends CustomPacketPayload {
    static readonly log: Logger;
    static readonly EMPTY_UUID: UUID;
    static readonly RANDOM: Random;
    static checkAccess(uuid: UUID, serverPlayer: ServerPlayer): boolean;
    getEasyNPC(uuid: UUID, serverPlayer: ServerPlayer): EasyNPC<any>;
    getEasyNPCAndCheckAccess(uuid: UUID, serverPlayer: ServerPlayer): EasyNPC<any>;
    handleClient(): void;
    handleServer(serverPlayer: ServerPlayer): void;
    id(): ResourceLocation;
    payload(): FriendlyByteBuf;
    write(var1: FriendlyByteBuf): void;
  }


  class ServerNetworkMessageHandlerInterface {
    static readonly log: Logger;
    executeActionEvent(uuid: UUID, actionEventType: ActionEventType): void;
    executeDialogButtonAction(uuid: UUID, dialogId: UUID, dialogButtonId: UUID): void;
    openMenu(uuid: UUID, menuId: UUID): void;
    requestDataSync(uuid: UUID): void;
  }

}

declare module 'de.markusbordihn.easynpc.network.syncher' {
  import { EntityDataSerializer } from 'net.minecraft.network.syncher';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { DeferredRegister, DeferredHolder } from 'net.neoforged.neoforge.registries';

  class EntityDataSerializersManager {
    static readonly ACTION_EVENT_SET: EntityDataSerializer;
    static readonly DIALOG_DATA_SET: EntityDataSerializer;
    static readonly DISPLAY_ATTRIBUTE: EntityDataSerializer;
    static readonly ENTITY_ATTRIBUTES: EntityDataSerializer;
    static readonly MERCHANT_OFFERS: EntityDataSerializer;
    static readonly MODEL_POSE: EntityDataSerializer;
    static readonly MODEL_ANIMATION_DATA: EntityDataSerializer;
    static readonly OBJECTIVE_DATA_SET: EntityDataSerializer;
    static readonly POSITION: EntityDataSerializer;
    static readonly PROFESSION: EntityDataSerializer;
    static readonly RENDER_DATA_ENTRY: EntityDataSerializer;
    static readonly SCALE: EntityDataSerializer;
    static readonly SKIN_DATA_ENTRY: EntityDataSerializer;
    static readonly SKIN_TYPE: EntityDataSerializer;
    static readonly SKIN_UUID: EntityDataSerializer;
    static readonly SOUND_DATA_SET: EntityDataSerializer;
    static readonly TARGETED_ENTITY_HASH_SET: EntityDataSerializer;
    static readonly TARGETED_PLAYER_HASH_SET: EntityDataSerializer;
    static readonly TRADING_DATA_SET: EntityDataSerializer;
    static readonly TRADING_TYPE: EntityDataSerializer;
    static readonly UUID: EntityDataSerializer;
    static readonly MODEL_PART_VISIBILITY: EntityDataSerializer;
    static readonly MODEL_PART_ROTATION: EntityDataSerializer;
    static readonly MODEL_PART_POSITION: EntityDataSerializer;
    static readonly MODEL_PART_SCALE: EntityDataSerializer;
    static defineSerializer<T>(className: string, serializer: EntityDataSerializer<T>): EntityDataSerializer<T>;
    static register(): void;
    static validateAndGetNbt(tag: CompoundTag, dataType: string): CompoundTag;
  }


  class ModEntityDataSerializers {
    static readonly ENTITY_DATA_SERIALIZERS: DeferredRegister;
    static readonly ACTION_EVENT_SET: DeferredHolder;
    static readonly DIALOG_DATA_SET: DeferredHolder;
    static readonly DISPLAY_ATTRIBUTE: DeferredHolder;
    static readonly ENTITY_ATTRIBUTES: DeferredHolder;
    static readonly MERCHANT_OFFERS: DeferredHolder;
    static readonly MODEL_POSE: DeferredHolder;
    static readonly MODEL_ANIMATION_DATA: DeferredHolder;
    static readonly OBJECTIVE_DATA_SET: DeferredHolder;
    static readonly POSITION: DeferredHolder;
    static readonly PROFESSION: DeferredHolder;
    static readonly RENDER_DATA_ENTRY: DeferredHolder;
    static readonly SCALE: DeferredHolder;
    static readonly SKIN_DATA_ENTRY: DeferredHolder;
    static readonly SKIN_TYPE: DeferredHolder;
    static readonly SKIN_UUID: DeferredHolder;
    static readonly SOUND_DATA_SET: DeferredHolder;
    static readonly TARGETED_ENTITY_HASH_SET: DeferredHolder;
    static readonly TARGETED_PLAYER_HASH_SET: DeferredHolder;
    static readonly TRADING_DATA_SET: DeferredHolder;
    static readonly TRADING_TYPE: DeferredHolder;
    static readonly UUID: DeferredHolder;
    static readonly MODEL_PART_VISIBILITY: DeferredHolder;
    static readonly MODEL_PART_ROTATION: DeferredHolder;
    static readonly MODEL_PART_POSITION: DeferredHolder;
    static readonly MODEL_PART_SCALE: DeferredHolder;
  }

}

declare module 'de.markusbordihn.easynpc.server.commands' {
  import { Command } from 'de.markusbordihn.easynpc.commands';
  import { ArgumentBuilder } from 'com.mojang.brigadier.builder';
  import { CommandSourceStack, CommandBuildContext } from 'net.minecraft.commands';
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { Pair } from 'com.mojang.datafixers.util';
  import { UUID } from 'java.util';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Class, Enum } from 'java.lang';

  interface DebugCommand extends Command {}
  class DebugCommand extends Command {
    static register(): ArgumentBuilder<CommandSourceStack, any>;
    static setDebug(context: CommandSourceStack, enable: boolean): number;
  }


  interface DeleteCommand extends Command {}
  class DeleteCommand extends Command {
    static register(): ArgumentBuilder<CommandSourceStack, any>;
  }


  interface DialogCommand extends Command {}
  class DialogCommand extends Command {
    static closeDialog(context: CommandSourceStack, serverPlayer: ServerPlayer): number;
    static openDialog(context: CommandSourceStack, easyNPC: EasyNPC<any>, serverPlayer: ServerPlayer): number;
    static openDialog(context: CommandSourceStack, easyNPC: EasyNPC<any>, serverPlayer: ServerPlayer, dialogPair: Pair<UUID, string>): number;
    static openDialog(context: CommandSourceStack, easyNPC: EasyNPC<any>, serverPlayer: ServerPlayer, dialogLabel: string): number;
    static openDialog(context: CommandSourceStack, easyNPC: EasyNPC<any>, serverPlayer: ServerPlayer, dialogUUID: UUID): number;
    static register(): ArgumentBuilder<CommandSourceStack, any>;
    static setPriority(context: CommandSourceStack, easyNPC: EasyNPC<any>, dialogPair: Pair<UUID, string>, priority: number): number;
    static setPriority(context: CommandSourceStack, easyNPC: EasyNPC<any>, dialogLabel: string, priority: number): number;
    static setPriority(context: CommandSourceStack, easyNPC: EasyNPC<any>, dialogUUID: UUID, priority: number): number;
  }


  interface EquipmentCommand extends Command {}
  class EquipmentCommand extends Command {
    static register(buildContext: CommandBuildContext): ArgumentBuilder<CommandSourceStack, any>;
  }


  interface InteractCommand extends Command {}
  class InteractCommand extends Command {
    static register(): ArgumentBuilder<CommandSourceStack, any>;
  }


  interface NameCommand extends Command {}
  class NameCommand extends Command {
    static register(): ArgumentBuilder<CommandSourceStack, any>;
  }


  interface NavigationCommand extends Command {}
  class NavigationCommand extends Command {
    static register(): ArgumentBuilder<CommandSourceStack, any>;
  }


  interface ObjectiveCommand extends Command {}
  class ObjectiveCommand extends Command {
    static register(): ArgumentBuilder<CommandSourceStack, any>;
  }


  interface OwnerCommand extends Command {}
  class OwnerCommand extends Command {
    static register(): ArgumentBuilder<CommandSourceStack, any>;
  }


  interface PoseCommand extends Command {}
  class PoseCommand extends Command {
    static register(): ArgumentBuilder<CommandSourceStack, any>;
  }


  interface PositionCommand extends Command {}
  class PositionCommand extends Command {
    static register(): ArgumentBuilder<CommandSourceStack, any>;
  }


  interface PresetCommand extends Command {}
  class PresetCommand extends Command {
    static register(): ArgumentBuilder<CommandSourceStack, any>;
  }


  interface ReloadCommand extends Command {}
  class ReloadCommand extends Command {
    static register(): ArgumentBuilder<CommandSourceStack, any>;
  }


  interface RenderCommand extends Command {}
  class RenderCommand extends Command {
    static register(): ArgumentBuilder<CommandSourceStack, any>;
  }


  interface RespawnCommand extends Command {}
  class RespawnCommand extends Command {
    static register(): ArgumentBuilder<CommandSourceStack, any>;
  }


  interface RotateCommand extends Command {}
  class RotateCommand extends Command {
    static register(): ArgumentBuilder<CommandSourceStack, any>;
  }


  interface ScaleCommand extends Command {}
  class ScaleCommand extends Command {
    static register(): ArgumentBuilder<CommandSourceStack, any>;
  }


  interface SkinCommand extends Command {}
  class SkinCommand extends Command {
    static register(): ArgumentBuilder<CommandSourceStack, any>;
  }


  interface SoundCommand extends Command {}
  class SoundCommand extends Command {
    static register(): ArgumentBuilder<CommandSourceStack, any>;
  }


  interface SpawnerCommand extends Command {}
  class SpawnerCommand extends Command {
    static register(): ArgumentBuilder<CommandSourceStack, any>;
  }


  interface TestCommand extends Command {}
  class TestCommand extends Command {
    static register(): ArgumentBuilder<CommandSourceStack, any>;
    static spawnAllEntities<T extends Enum<T>>(source: CommandSourceStack, enumClass: Class<T>): number;
    static spawnSingleEntity<T extends Enum<T>>(source: CommandSourceStack, type: T): number;
  }


  interface TradingCommand extends Command {}
  class TradingCommand extends Command {
    static register(): ArgumentBuilder<CommandSourceStack, any>;
  }

}

declare module 'de.markusbordihn.easynpc.server.commands.objectives' {
  import { Command } from 'de.markusbordihn.easynpc.commands';
  import { ArgumentBuilder } from 'com.mojang.brigadier.builder';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { ObjectiveType } from 'de.markusbordihn.easynpc.data.objective';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Entity } from 'net.minecraft.world.entity';

  interface AttackObjective extends Command {}
  class AttackObjective extends Command {
    static list(context: CommandSourceStack, easyNPC: EasyNPC<any>): number;
    static registerList(): ArgumentBuilder<CommandSourceStack, any>;
    static registerRemove(): ArgumentBuilder<CommandSourceStack, any>;
    static registerSet(): ArgumentBuilder<CommandSourceStack, any>;
    static remove(context: CommandSourceStack, easyNPC: EasyNPC<any>): number;
    static removeAttackTargetObjective(context: CommandSourceStack, easyNPC: EasyNPC<any>, targetName: string): number;
    static set(context: CommandSourceStack, easyNPC: EasyNPC<any>): number;
    static setAttackTargetObjective(context: CommandSourceStack, easyNPC: EasyNPC<any>, targetName: string): number;
  }


  interface FollowObjective extends Command {}
  class FollowObjective extends Command {
    static list(context: CommandSourceStack, easyNPC: EasyNPC<any>): number;
    static registerList(): ArgumentBuilder<CommandSourceStack, any>;
    static registerRemove(): ArgumentBuilder<CommandSourceStack, any>;
    static registerSet(): ArgumentBuilder<CommandSourceStack, any>;
    static removeFollowObjective(context: CommandSourceStack, easyNPC: EasyNPC<any>, objectiveType: ObjectiveType): number;
    static setFollowEntity(context: CommandSourceStack, easyNPC: EasyNPC<any>, entity: Entity): number;
    static setFollowOwner(context: CommandSourceStack, easyNPC: EasyNPC<any>): number;
    static setFollowPlayer(context: CommandSourceStack, easyNPC: EasyNPC<any>, serverPlayer: ServerPlayer): number;
  }

}

declare module 'de.markusbordihn.easynpc.server.player' {
  import { ServerPlayer, ServerLevel } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { Component } from 'net.minecraft.network.chat';
  import { Stat } from 'net.minecraft.stats';

  interface FakePlayer extends ServerPlayer {}
  class FakePlayer extends ServerPlayer {
    constructor(level: ServerLevel, blockPos: BlockPos);
    awardStat(stat: Stat, increment: number): void;
    displayClientMessage(chatComponent: Component, actionBar: boolean): void;
    doTick(): void;
    static isInvalidFakePlayer(fakePlayer: FakePlayer): boolean;
    tick(): void;
    updatePosition(level: ServerLevel, blockPos: BlockPos): FakePlayer;
  }

}

declare module 'de.markusbordihn.easynpc.server' {
  import { ServerStartingEvent } from 'net.neoforged.neoforge.event.server';
  import { Post } from 'ServerTickEvent';
  import { MinecraftServer } from 'net.minecraft.server';

  class ServerEventHandler {
    static handleServerAboutToStartEvent(event: ServerStartingEvent): void;
    static onServerTick(event: Post): void;
  }


  class ServerEvents {
    static handleServerStarting(minecraftServer: MinecraftServer): void;
    static handleServerTick(minecraftServer: MinecraftServer): void;
  }

}

declare module 'de.markusbordihn.easynpc.tabs' {
  import { DisplayItemsGenerator, ItemDisplayParameters, Output } from 'CreativeModeTab';
  import { DeferredRegister, DeferredHolder } from 'net.neoforged.neoforge.registries';

  interface ConfigItems extends DisplayItemsGenerator {}
  class ConfigItems extends DisplayItemsGenerator {
    accept(itemDisplayParameters: ItemDisplayParameters, output: Output): void;
  }


  interface EpicFightSpawnEggs extends DisplayItemsGenerator {}
  class EpicFightSpawnEggs extends DisplayItemsGenerator {
    accept(itemDisplayParameters: ItemDisplayParameters, output: Output): void;
  }


  class ModTabs {
    static readonly CREATIVE_TABS: DeferredRegister;
    static readonly TAB_CONFIG_ITEMS: DeferredHolder;
    static readonly TAB_SPAWN_EGGS: DeferredHolder;
    static TAB_EPIC_FIGHT_SPAWN_EGGS: DeferredHolder;
  }


  interface SpawnEggs extends DisplayItemsGenerator {}
  class SpawnEggs extends DisplayItemsGenerator {
    accept(itemDisplayParameters: ItemDisplayParameters, output: Output): void;
  }

}

declare module 'de.markusbordihn.easynpc.utils' {
  import { CompoundTag, ListTag } from 'net.minecraft.nbt';
  import { BlockPos } from 'net.minecraft.core';
  import { CustomScale } from 'de.markusbordihn.easynpc.data.scale';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Set, UUID } from 'java.util';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Item } from 'net.minecraft.world.item';
  import { MinecraftServer } from 'net.minecraft.server';
  import { JsonObject } from 'com.google.gson';
  import { Component } from 'net.minecraft.network.chat';
  import { Double, Integer } from 'java.lang';

  class CompoundTagUtils {
    static readonly ID_PREFIX: string;
    static readonly X_TAG: string;
    static readonly Y_TAG: string;
    static readonly Z_TAG: string;
    static readBlockPos(compoundTag: CompoundTag): BlockPos;
    static readCustomScale(compoundTag: CompoundTag): CustomScale;
    static readResourceLocation(compoundTag: CompoundTag, name: string): ResourceLocation;
    static readResourceLocations(listTag: ListTag): Set<ResourceLocation>;
    static writeBlockPos(blockPos: BlockPos): CompoundTag;
    static writeCustomScale(customScale: CustomScale): CompoundTag;
    static writeResourceLocations(resourceLocations: Set<ResourceLocation>): ListTag;
    static writeScale(x: number, y: number, z: number): CompoundTag;
  }


  class ItemUtils {
    static get easyNPCWandItem(): Item;
    static get moveEasyNPCItem(): Item;
    static isPlayerHoldingEasyNPCWand(player: Player): boolean;
    static isPlayerHoldingItem(player: Player, targetItem: Item): boolean;
    static isPlayerHoldingMoveEasyNPC(player: Player): boolean;
  }


  class PlayersUtils {
    static getJsonObject(data: string): JsonObject;
    static getUUIDfromString(uuidString: string): UUID;
    static getUserTexture(userUUID: UUID): string;
    static getUserTextureFromSessionResponse(data: string): string;
    static getUserUUID(server: MinecraftServer, username: string): UUID;
    static getUserUUID(username: string): UUID;
  }


  class ReflectionUtils {
    static changeIntValueField(object: any, fieldNames: string[], value: number): boolean;
    static changeIntValueField(object: any, fieldName: string, value: number): boolean;
    static getUUIDValueField(object: any, fieldName: string): UUID;
    static getUUIDValueField(object: any, fieldNames: string[]): UUID;
  }


  class SnbtFormatter {
    static format(snbt: string): string;
  }


  class TextFormattingCodes {
    static hasTextFormattingCodes(text: string): boolean;
    static hasTextLinebreakCodes(component: Component): boolean;
    static hasTextLinebreakCodes(text: string): boolean;
    static parseTextFormattingCodes(text: string): string;
    static parseTextLineBreaks(component: Component): Component;
    static parseTextLineBreaks(text: string): string;
  }


  class TextUtils {
    static convertToCamelCase(text: string): string;
    static convertToPascalCase(text: string): string;
    static isTranslationKey(text: string): boolean;
    static limitString(string: string, maxSize: number): string;
    static normalizeName(name: string): Component;
    static normalizeString(string: string): string;
    static normalizeString(string: string, maxSize: number): string;
    static removeAction(component: Component): Component;
  }


  class UUIDUtils {
    static parseUUID(text: string): UUID;
    static textToUUID(text: string): UUID;
  }


  class ValueUtils {
    static getDoubleValue(value: string): number;
    static getIntValue(value: string): number;
    static isDegreeValue(text: string): boolean;
    static isDoubleValue(text: string): boolean;
    static isDoubleValue(text: string, min: number, max: number): boolean;
    static isFloatValue(text: string): boolean;
    static isNumericValue(text: string, min: number, max: number): boolean;
    static isNumericValue(text: string): boolean;
    static isPositionValue(text: string): boolean;
    static isPositionValueInRange(text: string, min: number, max: number): boolean;
    static isPositiveNumericValueOrZero(text: string): boolean;
    static isScaleValue(text: string): boolean;
    static isScaleValueInRange(text: string, min: number, max: number): boolean;
  }

}

declare module 'de.markusbordihn.easynpc.validator' {
  import { NativeImage } from 'com.mojang.blaze3d.platform';

  class ImageValidator {
    static isValidImage(image: NativeImage): boolean;
  }


  class NameValidator {
    static isValidPlayerName(name: string): boolean;
  }


  class UrlValidator {
    static isSecureRemoteUrl(url: string): boolean;
    static isValidUrl(url: string): boolean;
  }

}