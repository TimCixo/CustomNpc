declare module 'noppes.npcs.ability' {
  import { EntityNPCInterface } from 'noppes.npcs.entity';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { EnumAbilityType } from 'noppes.npcs.constants';
  import { DamagedEvent } from 'noppes.npcs.api.event.NpcEvent';

  interface AbilityBlock extends IAbilityDamaged, AbstractAbility {}
  class AbilityBlock extends IAbilityDamaged {
    constructor(npc: EntityNPCInterface);
    canRun(target: LivingEntity): boolean;
    handleEvent(event: DamagedEvent): void;
    isType(type: EnumAbilityType): boolean;
  }


  interface AbilityPull extends IAbilityUpdate, AbstractAbility {}
  class AbilityPull extends IAbilityUpdate {
    constructor(entity: EntityNPCInterface);
    isActive(): boolean;
    isType(type: EnumAbilityType): boolean;
    update(): void;
  }


  class AbilityPush {
  }


  interface AbilitySmash extends IAbilityUpdate, AbstractAbility {}
  class AbilitySmash extends IAbilityUpdate {
    constructor(entity: EntityNPCInterface);
    isActive(): boolean;
    isType(type: EnumAbilityType): boolean;
    update(): void;
  }


  interface AbilitySnare extends IAbilityUpdate, AbstractAbility {}
  class AbilitySnare extends IAbilityUpdate {
    constructor(entity: EntityNPCInterface);
    isActive(): boolean;
    isType(type: EnumAbilityType): boolean;
    update(): void;
  }


  interface AbilityTeleport extends IAbilityUpdate, AbstractAbility {}
  class AbilityTeleport extends IAbilityUpdate {
    constructor(entity: EntityNPCInterface);
    isActive(): boolean;
    isType(type: EnumAbilityType): boolean;
    update(): void;
  }


  interface AbstractAbility extends IAbility {}
  class AbstractAbility extends IAbility {
    maxHP: number;
    minHP: number;
    constructor(npc: EntityNPCInterface);
    canRun(target: LivingEntity): boolean;
    endAbility(): void;
    get rNG(): number;
    isType(var1: EnumAbilityType): boolean;
    startCombat(): void;
  }


  class IAbility {
  }


  interface IAbilityAttack extends IAbility {}
  class IAbilityAttack extends IAbility {
  }


  interface IAbilityDamaged extends IAbility {}
  class IAbilityDamaged extends IAbility {
    handleEvent(var1: DamagedEvent): void;
  }


  interface IAbilityUpdate extends IAbility {}
  class IAbilityUpdate extends IAbility {
    isActive(): boolean;
    update(): void;
  }

}

declare module 'noppes.npcs' {
  import { DamagedEvent, MeleeAttackEvent, RangedLaunchedEvent, TargetEvent, DiedEvent } from 'noppes.npcs.api.event.NpcEvent';
  import { EntityNPCInterface, EntityProjectile, EntityCustomNpc } from 'noppes.npcs.entity';
  import { EnumGuiType, EnumParts } from 'noppes.npcs.constants';
  import { Player, Inventory } from 'net.minecraft.world.entity.player';
  import { LivingEntity, EntityType, Entity } from 'net.minecraft.world.entity';
  import { ParticleOptions } from 'net.minecraft.core.particles';
  import { PlayerData, Dialog, DialogOption, PlayerScriptData, ForgeScriptData, Quest, SpawnData } from 'noppes.npcs.controllers.data';
  import { Block } from 'net.minecraft.world.level.block';
  import { Item, ItemStack, CreativeModeTab } from 'net.minecraft.world.item';
  import { BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { RegisterEvent, DeferredRegister, DeferredHolder } from 'net.neoforged.neoforge.registries';
  import { MenuType, AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { EntityAttributeCreationEvent, EntityEvent, EntityJoinLevelEvent } from 'net.neoforged.neoforge.event.entity';
  import { ItemScripted, ItemNbtBook } from 'noppes.npcs.items';
  import { BlockSource } from 'net.minecraft.core.dispenser';
  import { File } from 'java.io';
  import { ConfigLoader } from 'noppes.npcs.config';
  import { MinecraftServer } from 'net.minecraft.server';
  import { IEventBus, Event } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';
  import { Supplier, Consumer } from 'java.util.function';
  import { ServerAboutToStartEvent, ServerStartedEvent, ServerStoppedEvent, ServerStartingEvent } from 'net.neoforged.neoforge.event.server';
  import { RegisterCommandsEvent, ServerChatEvent, CommandEvent } from 'net.neoforged.neoforge.event';
  import { Class, Boolean, Integer, Float, Long } from 'java.lang';
  import { PermissionNode } from 'net.neoforged.neoforge.server.permission.nodes';
  import { Nodes } from 'PermissionGatherEvent';
  import { ServerPlayer, ServerLevel } from 'net.minecraft.server.level';
  import { PortalForcer } from 'net.minecraft.world.level.portal';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Optional, List, Map, ArrayList, HashMap, HashSet, Vector, Collection, TreeMap, UUID } from 'java.util';
  import { BlockPos, LayeredRegistryAccess, NonNullList } from 'net.minecraft.core';
  import { WorldBorder } from 'net.minecraft.world.level.border';
  import { RoleEvent, CustomNPCsEvent } from 'noppes.npcs.api.event';
  import { IScriptBlockHandler, IScriptHandler, ScriptContainer } from 'noppes.npcs.controllers';
  import { IRecipeHandler, IFactionHandler } from 'noppes.npcs.api.handler';
  import { InteractEvent, AttackEvent, BreakEvent, DamagedEvent as noppes_npcs_api_event_playerevent_DamagedEvent, ChatEvent, RangedLaunchedEvent as noppes_npcs_api_event_playerevent_RangedLaunchedEvent, DamagedEntityEvent, FactionUpdateEvent } from 'noppes.npcs.api.event.PlayerEvent';
  import { ItemEntity } from 'net.minecraft.world.entity.item';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { LevelEvent } from 'net.neoforged.neoforge.event.level';
  import { QuestTurnedInEvent } from 'noppes.npcs.api.event.QuestEvent';
  import { ItemScriptedWrapper, PlayerWrapper, ItemStackWrapper } from 'noppes.npcs.api.wrapper';
  import { InteractEvent as noppes_npcs_api_event_itemevent_InteractEvent, AttackEvent as noppes_npcs_api_event_itemevent_AttackEvent } from 'noppes.npcs.api.event.ItemEvent';
  import { ImpactEvent } from 'noppes.npcs.api.event.ProjectileEvent';
  import { IWorld, IPos } from 'noppes.npcs.api';
  import { IEntity } from 'noppes.npcs.api.entity';
  import { ICustomGui, IButton, IItemSlot, IScroll } from 'noppes.npcs.api.gui';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { CompoundTag, ListTag, Tag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { IData } from 'noppes.npcs.api.entity.data';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { MpmPartData } from 'noppes.npcs.client.parts';
  import { NopVector3f, NopVector2i } from 'noppes.npcs.shared.common.util';
  import { IItemStack } from 'noppes.npcs.api.item';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { Container, SimpleContainer } from 'net.minecraft.world';
  import { Level, ServerLevelAccessor, LevelReader } from 'net.minecraft.world.level';
  import { Component } from 'net.minecraft.network.chat';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { RandomSource } from 'net.minecraft.util';
  import { ItemTossEvent } from 'net.neoforged.neoforge.event.entity.item';
  import { Pre } from 'ItemEntityPickupEvent';
  import { Pre as playertickevent_Pre } from 'PlayerTickEvent';
  import { LeftClickBlock, RightClickBlock, EntityInteract, RightClickItem } from 'PlayerInteractEvent';
  import { ArrowLooseEvent, AttackEntityEvent } from 'net.neoforged.neoforge.event.entity.player';
  import { BreakEvent as blockevent_BreakEvent } from 'BlockEvent';
  import { Open, Close } from 'PlayerContainerEvent';
  import { LivingDeathEvent } from 'net.neoforged.neoforge.event.entity.living';
  import { Pre as livingdamageevent_Pre } from 'LivingDamageEvent';
  import { PlayerLoggedInEvent, PlayerLoggedOutEvent } from 'PlayerEvent';
  import { Villager } from 'net.minecraft.world.entity.npc';
  import { Pre as leveltickevent_Pre } from 'LevelTickEvent';
  import { Pre as servertickevent_Pre } from 'ServerTickEvent';

  class AbilityEventHandler {
    invoke(event: DamagedEvent): void;
  }


  class CommonProxy {
    newVersionAvailable: boolean;
    revision: number;
    get player(): Player;
    getPlayerData(player: Player): PlayerData;
    hasClient(): boolean;
    load(): void;
    openGui(npc: EntityNPCInterface, gui: EnumGuiType): void;
    openGui(player: Player, gui: EnumGuiType): void;
    openGui(player: Player, guiscreen: any): void;
    postload(): void;
    spawnParticle(player: LivingEntity, string: string, ...ob: any[]): void;
    spawnParticle(type: ParticleOptions, x: number, y: number, z: number, motionX: number, motionY: number, motionZ: number, scale: number): void;
  }


  class CustomBlocks {
    static redstone: Block;
    static redstone_item: Item;
    static mailbox: Block;
    static mailbox_item: Item;
    static mailbox2: Block;
    static mailbox2_item: Item;
    static mailbox3: Block;
    static mailbox3_item: Item;
    static waypoint: Block;
    static waypoint_item: Item;
    static border: Block;
    static border_item: Item;
    static scripted: Block;
    static scripted_item: Item;
    static scripted_door: Block;
    static scripted_door_item: Item;
    static builder: Block;
    static builder_item: Item;
    static copy: Block;
    static copy_item: Item;
    static carpenty: Block;
    static carpentry_item: Item;
    static tile_anvil: BlockEntityType;
    static tile_border: BlockEntityType;
    static tile_builder: BlockEntityType;
    static tile_copy: BlockEntityType;
    static tile_mailbox: BlockEntityType;
    static tile_redstoneblock: BlockEntityType;
    static tile_scripted: BlockEntityType;
    static tile_scripteddoor: BlockEntityType;
    static tile_waypoint: BlockEntityType;
    static createItem(block: Block): Item;
    static registerBlocks(event: RegisterEvent): void;
  }


  class CustomContainer {
    static container_carpentrybench: MenuType;
    static container_customgui: MenuType;
    static container_mail: MenuType;
    static container_managebanks: MenuType;
    static container_managerecipes: MenuType;
    static container_merchantadd: MenuType;
    static container_banklarge: MenuType;
    static container_banksmall: MenuType;
    static container_bankunlock: MenuType;
    static container_bankupgrade: MenuType;
    static container_companion: MenuType;
    static container_follower: MenuType;
    static container_followerhire: MenuType;
    static container_followersetup: MenuType;
    static container_inv: MenuType;
    static container_itemgiver: MenuType;
    static container_questreward: MenuType;
    static container_questtypeitem: MenuType;
    static container_trader: MenuType;
    static container_tradersetup: MenuType;
    static registerBlocks(event: RegisterEvent): void;
  }


  class CustomEntities {
    static entityNpcPony: EntityType;
    static entityNpcCrystal: EntityType;
    static entityNpcSlime: EntityType;
    static entityNpcDragon: EntityType;
    static entityNPCGolem: EntityType;
    static entityCustomNpc: EntityType;
    static entityNPC64x32: EntityType;
    static entityNpcAlex: EntityType;
    static entityNpcClassicPlayer: EntityType;
    static entityChairMount: EntityType;
    static entityProjectile: EntityType;
    static attribute(event: EntityAttributeCreationEvent): void;
    static registerEntities(event: RegisterEvent): void;
  }


  class CustomItems {
    static wand: Item;
    static cloner: Item;
    static scripter: Item;
    static moving: Item;
    static mount: Item;
    static teleporter: Item;
    static scripted_item: ItemScripted;
    static nbt_book: ItemNbtBook;
    static soulstoneEmpty: Item;
    static soulstoneFull: Item;
    execute(source: BlockSource, item: ItemStack): ItemStack;
    static registerDispenser(): void;
    static registerItem(event: RegisterEvent): void;
  }


  class CustomNpcs {
    static readonly MODID: string;
    static readonly VERSION: string;
    static EnableScripting: boolean;
    static NashorArguments: string;
    static EnableChatBubbles: boolean;
    static NpcNavRange: number;
    static NpcNaturalSpawningChunkLimit: number;
    static NpcUseOpCommands: boolean;
    static NoppesCommandOpOnly: boolean;
    static InventoryGuiEnabled: boolean;
    static FixUpdateFromPre_1_12: boolean;
    static DisablePermissions: boolean;
    static SceneButtonsEnabled: boolean;
    static ticks: number;
    static EnableUpdateChecker: boolean;
    static instance: CustomNpcs;
    static FreezeNPCs: boolean;
    static OpsOnly: boolean;
    static DefaultInteractLine: string;
    static ChuckLoaders: number;
    static Dir: File;
    static LeavesDecayEnabled: boolean;
    static VineGrowthEnabled: boolean;
    static IceMeltsEnabled: boolean;
    static SoulStoneAnimals: boolean;
    static SoulStoneNPCs: boolean;
    static ClonerSavePath: boolean;
    static HeadWearType: number;
    static FontType: string;
    static FontSize: number;
    static EnableInvisibleNpcs: boolean;
    static NpcSpeachTriggersChatEvent: boolean;
    static Config: ConfigLoader;
    static VerboseDebug: boolean;
    static Server: MinecraftServer;
    static proxy: CommonProxy;
    constructor(modEventBus: IEventBus, modContainer: ModContainer);
    static get levelSaveDirectory(): File;
    static getLevelSaveDirectory(s: string): File;
    registerCommand(e: RegisterCommandsEvent): void;
    static runForDist<T>(clientTarget: Supplier<Supplier<T>>, serverTarget: Supplier<Supplier<T>>): T;
    serverstart(event: ServerStartingEvent): void;
    setAboutToStart(event: ServerAboutToStartEvent): void;
    static setPrivateValue<T, E>(classToAccess: Class<T>, instance: T, value: E, fieldIndex: number): void;
    started(event: ServerStartedEvent): void;
    stopped(event: ServerStoppedEvent): void;
    static unsafeRunForDist<T>(clientTarget: Supplier<Supplier<T>>, serverTarget: Supplier<Supplier<T>>): T;
  }


  class CustomNpcsPermissions {
    static readonly NPC_DELETE: PermissionNode;
    static readonly NPC_CREATE: PermissionNode;
    static readonly NPC_GUI: PermissionNode;
    static readonly NPC_FREEZE: PermissionNode;
    static readonly NPC_RESET: PermissionNode;
    static readonly NPC_AI: PermissionNode;
    static readonly NPC_ADVANCED: PermissionNode;
    static readonly NPC_DISPLAY: PermissionNode;
    static readonly NPC_INVENTORY: PermissionNode;
    static readonly NPC_STATS: PermissionNode;
    static readonly NPC_CLONE: PermissionNode;
    static readonly GLOBAL_LINKED: PermissionNode;
    static readonly GLOBAL_PLAYERDATA: PermissionNode;
    static readonly GLOBAL_BANK: PermissionNode;
    static readonly GLOBAL_DIALOG: PermissionNode;
    static readonly GLOBAL_QUEST: PermissionNode;
    static readonly GLOBAL_FACTION: PermissionNode;
    static readonly GLOBAL_TRANSPORT: PermissionNode;
    static readonly GLOBAL_RECIPE: PermissionNode;
    static readonly GLOBAL_NATURALSPAWN: PermissionNode;
    static readonly SPAWNER_MOB: PermissionNode;
    static readonly SPAWNER_CREATE: PermissionNode;
    static readonly TOOL_MOUNTER: PermissionNode;
    static readonly TOOL_PATHER: PermissionNode;
    static readonly TOOL_SCRIPTER: PermissionNode;
    static readonly TOOL_NBTBOOK: PermissionNode;
    static readonly EDIT_VILLAGER: PermissionNode;
    static readonly EDIT_BLOCKS: PermissionNode;
    static readonly SOULSTONE_ALL: PermissionNode;
    static readonly SCENES: PermissionNode;
    static hasPermission(player: ServerPlayer, permission: PermissionNode<boolean>): boolean;
    registerNodes(event: Nodes): void;
  }


  class CustomTabs {
    static readonly CREATIVE_TABS: DeferredRegister;
    static readonly CNPCS: DeferredHolder;
    static readonly tab: CreativeModeTab;
  }


  interface CustomTeleporter extends PortalForcer {}
  class CustomTeleporter extends PortalForcer {
    constructor(par1ServerLevel: ServerLevel, pos: Vec3, yRot: number, xRot: number);
    findClosestPortalPosition(exitPos: BlockPos, isNether: boolean, worldBorder: WorldBorder): Optional<BlockPos>;
  }


  class EventHooks {
    static OnPlayerFactionChange(handler: PlayerScriptData, event: FactionUpdateEvent): void;
    static onCustomGuiButton(player: PlayerWrapper, gui: ICustomGui, button: IButton): void;
    static onCustomGuiClose(player: PlayerWrapper, gui: ICustomGui): void;
    static onCustomGuiScrollClick(player: PlayerWrapper, gui: ICustomGui, scroll: IScroll, scrollIndex: number, selection: string[], doubleClick: boolean): void;
    static onCustomGuiSlot(player: PlayerWrapper, gui: ICustomGui, slot: IItemSlot): void;
    static onCustomGuiSlotClicked(player: PlayerWrapper, gui: ICustomGui, slot: IItemSlot, dragType: number, clickType: string): boolean;
    static onForgeEntityEvent(event: EntityEvent): void;
    static onForgeEvent(ev: CustomNPCsEvent, event: Event): void;
    static onForgeInit(handler: ForgeScriptData): void;
    static onForgeLevelEvent(event: LevelEvent): void;
    static onGlobalFactionsLoaded(handler: IFactionHandler): void;
    static onGlobalRecipesLoaded(handler: IRecipeHandler): void;
    static onNPCAttacksMelee(npc: EntityNPCInterface, event: MeleeAttackEvent): boolean;
    static onNPCCollide(npc: EntityNPCInterface, entity: Entity): void;
    static onNPCDamaged(npc: EntityNPCInterface, event: DamagedEvent): boolean;
    static onNPCDialog(npc: EntityNPCInterface, player: Player, dialog: Dialog): boolean;
    static onNPCDialogClose(npc: EntityNPCInterface, player: ServerPlayer, dialog: Dialog): void;
    static onNPCDialogOption(npc: EntityNPCInterface, player: ServerPlayer, dialog: Dialog, option: DialogOption): boolean;
    static onNPCDied(npc: EntityNPCInterface, event: DiedEvent): void;
    static onNPCInit(npc: EntityNPCInterface): void;
    static onNPCInteract(npc: EntityNPCInterface, player: Player): boolean;
    static onNPCKills(npc: EntityNPCInterface, entityLiving: LivingEntity): void;
    static onNPCRangedLaunched(npc: EntityNPCInterface, event: RangedLaunchedEvent): void;
    static onNPCRole(npc: EntityNPCInterface, event: RoleEvent): boolean;
    static onNPCTarget(npc: EntityNPCInterface, event: TargetEvent): boolean;
    static onNPCTargetLost(npc: EntityNPCInterface, prevtarget: LivingEntity): boolean;
    static onNPCTick(npc: EntityNPCInterface): void;
    static onNPCTimer(npc: EntityNPCInterface, id: number): void;
    static onPlayerAttack(handler: PlayerScriptData, event: AttackEvent): boolean;
    static onPlayerBreak(handler: PlayerScriptData, event: BreakEvent): boolean;
    static onPlayerChat(handler: PlayerScriptData, event: ChatEvent): void;
    static onPlayerContainerClose(handler: PlayerScriptData, container: AbstractContainerMenu): void;
    static onPlayerContainerOpen(handler: PlayerScriptData, container: AbstractContainerMenu): void;
    static onPlayerDamaged(handler: PlayerScriptData, event: noppes_npcs_api_event_playerevent_DamagedEvent): boolean;
    static onPlayerDamagedEntity(handler: PlayerScriptData, event: DamagedEntityEvent): boolean;
    static onPlayerDeath(handler: PlayerScriptData, source: DamageSource, entity: Entity): void;
    static onPlayerInit(handler: PlayerScriptData): void;
    static onPlayerInteract(handler: PlayerScriptData, event: InteractEvent): boolean;
    static onPlayerKeyEvent(player: ServerPlayer, button: number, isCtrlPressed: boolean, isShiftPressed: boolean, isAltPressed: boolean, isMetaPressed: boolean, released: boolean, openGui: string): void;
    static onPlayerKills(handler: PlayerScriptData, entityLiving: LivingEntity): void;
    static onPlayerLevelUp(handler: PlayerScriptData, change: number): void;
    static onPlayerLogin(handler: PlayerScriptData): void;
    static onPlayerLogout(handler: PlayerScriptData): void;
    static onPlayerPickUp(handler: PlayerScriptData, entityItem: ItemEntity): boolean;
    static onPlayerPlaySound(player: ServerPlayer, sound: string, category: string, looping: boolean): void;
    static onPlayerRanged(handler: PlayerScriptData, event: noppes_npcs_api_event_playerevent_RangedLaunchedEvent): boolean;
    static onPlayerTick(handler: PlayerScriptData): void;
    static onPlayerTimer(data: PlayerData, id: number): void;
    static onPlayerToss(handler: PlayerScriptData, entityItem: ItemEntity): boolean;
    static onProjectileImpact(projectile: EntityProjectile, event: ImpactEvent): void;
    static onProjectileTick(projectile: EntityProjectile): void;
    static onQuestFinished(handler: PlayerScriptData, quest: Quest): void;
    static onQuestStarted(handler: PlayerScriptData, quest: Quest): boolean;
    static onQuestTurnedIn(handler: PlayerScriptData, event: QuestTurnedInEvent): void;
    static onScriptBlockBreak(handler: IScriptBlockHandler): void;
    static onScriptBlockClicked(handler: IScriptBlockHandler, player: Player): void;
    static onScriptBlockCollide(handler: IScriptBlockHandler, entityIn: Entity): void;
    static onScriptBlockDoorToggle(handler: IScriptBlockHandler): boolean;
    static onScriptBlockExploded(handler: IScriptBlockHandler): boolean;
    static onScriptBlockFallenUpon(handler: IScriptBlockHandler, entity: Entity, distance: number): number;
    static onScriptBlockHarvest(handler: IScriptBlockHandler, player: Player): boolean;
    static onScriptBlockInit(handler: IScriptBlockHandler): void;
    static onScriptBlockInteract(handler: IScriptBlockHandler, player: Player, side: number, hitX: number, hitY: number, hitZ: number): boolean;
    static onScriptBlockNeighborChanged(handler: IScriptBlockHandler, changedPos: BlockPos): void;
    static onScriptBlockRainFill(handler: IScriptBlockHandler): void;
    static onScriptBlockRedstonePower(handler: IScriptBlockHandler, prevPower: number, power: number): void;
    static onScriptBlockTimer(handler: IScriptBlockHandler, id: number): void;
    static onScriptBlockUpdate(handler: IScriptBlockHandler): void;
    static onScriptItemAttack(handler: ItemScriptedWrapper, event: noppes_npcs_api_event_itemevent_AttackEvent): boolean;
    static onScriptItemInit(handler: ItemScriptedWrapper): void;
    static onScriptItemInteract(handler: ItemScriptedWrapper, event: noppes_npcs_api_event_itemevent_InteractEvent): boolean;
    static onScriptItemPickedUp(handler: ItemScriptedWrapper, player: Player, entity: ItemEntity): boolean;
    static onScriptItemSpawn(handler: ItemScriptedWrapper, entity: ItemEntity): boolean;
    static onScriptItemTossed(handler: ItemScriptedWrapper, player: Player, entity: ItemEntity): boolean;
    static onScriptItemUpdate(handler: ItemScriptedWrapper, player: Player): void;
    static onScriptTriggerEvent(id: number, level: IWorld, pos: IPos, entity: IEntity, arguments: any[]): void;
    static onScriptTriggerEvent(handler: IScriptHandler, id: number, level: IWorld, pos: IPos, entity: IEntity, arguments: any[]): void;
    static returnCancelled(event: Event): boolean;
  }


  class ForgeEventHandler {
    static eventNames: List;
    forgeEntity(event: Event): void;
    static getEventName(c: Class): string;
  }


  class IChatMessages {
    addMessage(var1: string, var2: EntityNPCInterface): void;
    renderMessages(var1: PoseStack, var2: MultiBufferSource, var3: number, var4: boolean, var5: number): void;
  }


  class ICompatibilty {
    get version(): number;
    save(var1: Provider, var2: CompoundTag): CompoundTag;
    set version(var1: number);
  }


  interface ItemStackEmptyWrapper extends ItemStackWrapper {}
  class ItemStackEmptyWrapper extends ItemStackWrapper {
    constructor();
    get storeddata(): IData;
    get tempdata(): IData;
  }


  interface ModelData extends ModelDataShared {}
  class ModelData extends ModelDataShared {
    simpleRender: boolean;
    npc: EntityCustomNpc;
    constructor(npc: EntityCustomNpc);
    copy(): ModelData;
    static get(npc: EntityCustomNpc): ModelData;
    get owner(): LivingEntity;
    getEntity(npc: EntityNPCInterface): LivingEntity;
    load(compound: CompoundTag): void;
    save(): CompoundTag;
    setExtra(entity: LivingEntity, key: string, value: string): void;
  }


  class ModelDataShared {
    arm1: ModelPartConfig;
    arm2: ModelPartConfig;
    body: ModelPartConfig;
    leg1: ModelPartConfig;
    leg2: ModelPartConfig;
    head: ModelPartConfig;
    extra: CompoundTag;
    oldPartData: ListTag;
    mpmParts: List;
    hiddenParts: List;
    wingMode: number;
    url: string;
    displayName: string;
    lastEdited: number;
    inLove: number;
    animationTime: number;
    modelType: number;
    moveAnimation: number;
    prevMoveAnimation: number;
    startMoveAnimation: boolean;
    animation: number;
    prevAnimation: number;
    startAnimation: boolean;
    animationStart: number;
    sleepRotation: number;
    clearEntity(): void;
    get bodyY(): number;
    get entityName(): ResourceLocation;
    get legsY(): number;
    get owner(): LivingEntity;
    getMoveAnimtion(player: LivingEntity): number;
    getPartConfig(type: EnumParts): ModelPartConfig;
    hasEntity(): boolean;
    isMovementAnimation(ani: number): boolean;
    load(compound: CompoundTag): void;
    offsetY(): number;
    refreshParts(): void;
    save(): CompoundTag;
    setAnimation(ani: number): void;
    setEntity(resourceLocation: ResourceLocation): void;
    setMoveAnimation(ani: number): void;
    updateTransate(): void;
  }


  interface ModelEyeData extends MpmPartData {}
  class ModelEyeData extends MpmPartData {
    static readonly RESOURCE: ResourceLocation;
    static readonly RESOURCE_LEFT: ResourceLocation;
    static readonly RESOURCE_RIGHT: ResourceLocation;
    glint: boolean;
    browThickness: NopVector3f;
    eyePos: NopVector2i;
    mirror: boolean;
    eyeSize: number;
    skinType: number;
    useLidTexture: boolean;
    lidColor: NopVector3f;
    browColor: NopVector3f;
    blinkStart: number;
    disableBlink: boolean;
    constructor();
    get nbt(): CompoundTag;
    get urlTexture(): ResourceLocation;
    set nbt(compound: CompoundTag);
    update(player: LivingEntity): void;
  }


  class ModelPartConfig {
    scaleX: number;
    scaleY: number;
    scaleZ: number;
    transX: number;
    transY: number;
    transZ: number;
    notShared: boolean;
    checkValue(given: number, min: number, max: number): number;
    copyValues(config: ModelPartConfig): void;
    readFromNBT(compound: CompoundTag): void;
    setScale(x: number, y: number, z: number): void;
    setScale(x: number, y: number): void;
    setTranslate(transX: number, transY: number, transZ: number): void;
    toString(): string;
    writeToNBT(): CompoundTag;
  }


  class ModelPartData {
    color: number;
    colorPattern: number;
    type: number;
    pattern: number;
    playerTexture: boolean;
    name: string;
    constructor(name: string);
    get color(): string;
    get resource(): ResourceLocation;
    load(compound: CompoundTag): void;
    save(): CompoundTag;
    setType(type: number): void;
    toString(): string;
  }


  class NBTTags {
    static access: LayeredRegistryAccess;
    static server: MinecraftServer;
    static GetLongStringMap(tagList: ListTag): TreeMap<Long, string>;
    static GetScript(list: ListTag, handler: IScriptHandler): ScriptContainer[];
    static NBTLongStringMap(map: Map<Long, string>): ListTag;
    static NBTMerge(data: CompoundTag, merge: CompoundTag): CompoundTag;
    static NBTScript(scripts: ScriptContainer[]): ListTag;
    static get provider(): Provider;
    static getBooleanList(tagList: ListTag): HashMap<number, boolean>;
    static getFloatIntegerMap(tagList: ListTag): HashMap<number, number>;
    static getIItemStackMap(lookupProvider: Provider, tagList: ListTag): Map<number, IItemStack>;
    static getIngredientList(lookupProvider: Provider, tagList: ListTag): NonNullList<Ingredient>;
    static getIntegerArraySet(tagList: ListTag): ArrayList<number[]>;
    static getIntegerIntegerMap(tagList: ListTag): HashMap<number, number>;
    static getIntegerList(tagList: ListTag): number[];
    static getIntegerLongMap(tagList: ListTag): HashMap<number, Long>;
    static getIntegerSet(tagList: ListTag): HashSet<number>;
    static getIntegerStringMap(tagList: ListTag): HashMap<number, string>;
    static getItemStackList(lookupProvider: Provider, tagList: ListTag, items: NonNullList<ItemStack>): void;
    static getResourceLocationList(tagList: ListTag): ResourceLocation[];
    static getStringArray(tagList: ListTag, size: number): string[];
    static getStringIntegerMap(tagList: ListTag): HashMap<string, number>;
    static getStringList(tagList: ListTag): string[];
    static getStringStringMap(tagList: ListTag): HashMap<string, string>;
    static getVectorMap(tagList: ListTag): HashMap<string, Vector<string>>;
    static nbtBooleanList(updatedSlots: HashMap<number, boolean>): ListTag;
    static nbtDoubleList(...par1ArrayOfDouble: number[]): ListTag;
    static nbtFloatMap(lines: Map<number, number>): ListTag;
    static nbtIItemStackMap(lookupProvider: Provider, inventory: Map<number, IItemStack>): ListTag;
    static nbtIngredientList(lookupProvider: Provider, inventory: NonNullList<Ingredient>): ListTag;
    static nbtIntegerArraySet(set: number[][]): ListTag;
    static nbtIntegerCollection(set: Collection<number>): ListTag;
    static nbtIntegerIntegerMap(lines: Map<number, number>): ListTag;
    static nbtIntegerLongMap(lines: HashMap<number, Long>): ListTag;
    static nbtIntegerStringMap(map: Map<number, string>): Tag;
    static nbtItemStackList(lookupProvider: Provider, inventory: NonNullList<ItemStack>): ListTag;
    static nbtResourceLocationList(list: ResourceLocation[]): ListTag;
    static nbtStringArray(list: string[]): ListTag;
    static nbtStringIntegerMap(map: Map<string, number>): ListTag;
    static nbtStringList(list: string[]): ListTag;
    static nbtStringStringMap(map: HashMap<string, string>): ListTag;
    static nbtVectorMap(map: HashMap<string, Vector<string>>): ListTag;
  }


  class NoppesUtilPlayer {
    static compareItems(item: ItemStack, item2: ItemStack, ignoreDamage: boolean, ignoreNBT: boolean): boolean;
    static compareItems(player: Player, item: ItemStack, ignoreDamage: boolean, ignoreNBT: boolean): boolean;
    static consumeItem(player: Player, item: ItemStack, ignoreDamage: boolean, ignoreNBT: boolean): void;
    static countStacks(inv: Container, ignoreDamage: boolean, ignoreNBT: boolean): ItemStack[];
  }


  class NoppesUtilServer {
    static GetClosePos(origin: BlockPos, level: Level): BlockPos;
    static GetDamageSourcee(damagesource: DamageSource): Entity;
    static GivePlayerItem(entity: Entity, player: Player, item: ItemStack): void;
    static IsItemStackNull(is: ItemStack): boolean;
    acceptsFailure(): boolean;
    acceptsSuccess(): boolean;
    createMenu(p_createMenu_1_: number, p_createMenu_2_: Inventory, p_createMenu_3_: Player): AbstractContainerMenu;
    get displayName(): Component;
    static getEditingNpc(player: Player): EntityNPCInterface;
    static getEditingQuest(player: Player): Quest;
    static getPlayer(minecraftserver: MinecraftServer, id: UUID): Player;
    static openContainerGui(player: ServerPlayer, gui: EnumGuiType, extraDataWriter: Consumer<RegistryFriendlyByteBuf>): void;
    static openDialog(player: Player, npc: EntityNPCInterface, dia: Dialog): void;
    static playSound(entity: LivingEntity, sound: SoundEvent, volume: number, pitch: number): void;
    static playSound(level: Level, pos: BlockPos, sound: SoundEvent, cat: SoundSource, volume: number, pitch: number): void;
    static runCommand(executer: Entity, name: string, command: string, player: Player): string;
    static runCommand(level: Level, pos: BlockPos, name: string, command: string, player: Player, executer: Entity): string;
    sendFailure(text: Component): void;
    static sendGuiClose(player: ServerPlayer, i: number, comp: CompoundTag): void;
    static sendGuiError(player: Player, i: number): void;
    static sendOpenGui(player: Player, gui: EnumGuiType, npc: EntityNPCInterface): void;
    static sendScrollData(player: ServerPlayer, map: Map<string, number>): void;
    sendSystemMessage(component: Component): void;
    static setEditingNpc(player: Player, npc: EntityNPCInterface): void;
    static setEditingQuest(player: Player, quest: Quest): void;
    shouldInformAdmins(): boolean;
    static spawnParticle(entity: Entity, particle: string, dimension: number): void;
  }


  class NpcDamageSource {
    static readonly NPC: ResourceKey;
  }


  interface NpcMiscInventory extends SimpleContainer {}
  class NpcMiscInventory extends SimpleContainer {
    readonly items: NonNullList;
    stackLimit: number;
    constructor(size: number);
    addItemStack(item: ItemStack): boolean;
    canPlaceItem(i: number, itemstack: ItemStack): boolean;
    clearContent(): void;
    firstFreeSlot(): number;
    get containerSize(): number;
    get maxStackSize(): number;
    getItem(index: number): ItemStack;
    getMergableItem(item: ItemStack): ItemStack;
    getToNBT(lookupProvider: Provider): CompoundTag;
    isEmpty(): boolean;
    removeItem(index: number, count: number): ItemStack;
    removeItem(eating: ItemStack, decrease: number): boolean;
    removeItemNoUpdate(var1: number): ItemStack;
    setChanged(): void;
    setFromNBT(lookupProvider: Provider, nbttagcompound: CompoundTag): void;
    setItem(var1: number, var2: ItemStack): void;
    setSize(i: number): void;
    startOpen(player: Player): void;
    stillValid(var1: Player): boolean;
    stopOpen(player: Player): void;
  }


  class NPCSpawning {
    static canCreatureTypeSpawnAtLocation(data: SpawnData, level: LevelReader, pos: BlockPos): boolean;
    static countNPCs(level: ServerLevel): number;
    static findChunksForSpawning(level: ServerLevel): void;
    static getLightLevel(level: LevelReader, pos: BlockPos): number;
    static performLevelGenSpawning(level: ServerLevelAccessor, biome: Biome, x: number, z: number, rand: RandomSource): void;
  }


  class Resistances {
    knockback: number;
    arrow: number;
    melee: number;
    explosion: number;
    applyResistance(source: DamageSource, damage: number): number;
    readToNBT(compound: CompoundTag): void;
    save(): CompoundTag;
  }


  class ScriptItemEventHandler {
    invoke(event: ItemTossEvent): void;
    invoke(event: Pre): void;
  }


  class ScriptPlayerEventHandler {
    invoke(event: LeftClickBlock): void;
    invoke(event: RightClickBlock): void;
    invoke(event: EntityInteract): void;
    invoke(event: RightClickItem): void;
    invoke(event: ArrowLooseEvent): void;
    invoke(event: blockevent_BreakEvent): void;
    invoke(event: ItemTossEvent): void;
    invoke(event: Pre): void;
    invoke(event: Open): void;
    invoke(event: Close): void;
    invoke(event: LivingDeathEvent): void;
    invoke(event: livingdamageevent_Pre): void;
    invoke(event: AttackEntityEvent): void;
    invoke(event: PlayerLoggedInEvent): void;
    invoke(event: PlayerLoggedOutEvent): void;
    invoke(event: ServerChatEvent): void;
    onServerTick(event: playertickevent_Pre): void;
    registerForgeEvents(): ScriptPlayerEventHandler;
  }


  class ServerEventsHandler {
    static Merchant: Villager;
    commandGive(event: CommandEvent): void;
    commandTime(event: CommandEvent): void;
    invoke(event: EntityInteract): void;
    invoke(event: LivingDeathEvent): void;
    world(event: EntityJoinLevelEvent): void;
  }


  class ServerTickHandler {
    ticks: number;
    dataChanged(container: AbstractContainerMenu, varToUpdate: number, newValue: number): void;
    onServerTick(event: playertickevent_Pre): void;
    onServerTick(event: leveltickevent_Pre): void;
    onServerTick(event: servertickevent_Pre): void;
    playerLogin(event: PlayerLoggedInEvent): void;
    slotChanged(container: AbstractContainerMenu, slotInd: number, stack: ItemStack): void;
  }


  class SkinEventHandler {
    static onServerTick(event: servertickevent_Pre): void;
    static playerLogin(event: PlayerLoggedInEvent): void;
  }


  class TextBlock {
    lines: List;
  }


  class VersionCompatibility {
    static ModRev: number;
    static CheckAvailabilityCompatibility(lookupProvider: Provider, compatibilty: ICompatibilty, compound: CompoundTag): void;
    static CheckNpcCompatibility(npc: EntityNPCInterface, compound: CompoundTag): void;
  }

}

declare module 'noppes.npcs.ai' {
  import { EntityNPCInterface } from 'noppes.npcs.entity';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { LivingEntity, Mob, PathfinderMob, Entity } from 'net.minecraft.world.entity';
  import { Goal, DoorInteractGoal } from 'net.minecraft.world.entity.ai.goal';
  import { BlockPos } from 'net.minecraft.core';
  import { EnumSet } from 'java.util';
  import { Flag } from 'Goal';
  import { RangedAttackMob } from 'net.minecraft.world.entity.monster';
  import { NPCInteractSelector } from 'noppes.npcs.ai.selector';
  import { Class } from 'java.lang';
  import { MoveControl } from 'net.minecraft.world.entity.ai.control';
  import { GroundPathNavigation } from 'net.minecraft.world.entity.ai.navigation';
  import { Level } from 'net.minecraft.world.level';
  import { WalkNodeEvaluator, PathType } from 'net.minecraft.world.level.pathfinder';

  class CombatHandler {
    constructor(npc: EntityNPCInterface);
    checkTarget(): boolean;
    damage(source: DamageSource, damageAmount: number): void;
    isValidTarget(target: LivingEntity): boolean;
    reset(): void;
    start(): void;
    update(): void;
  }


  interface EntityAIAbilities extends Goal {}
  class EntityAIAbilities extends Goal {
    constructor(npc: EntityNPCInterface);
    canContinueToUse(): boolean;
    canUse(): boolean;
    stop(): void;
    tick(): void;
  }


  interface EntityAIAnimation extends Goal {}
  class EntityAIAnimation extends Goal {
    temp: number;
    constructor(npc: EntityNPCInterface);
    canUse(): boolean;
    static getWalkingAnimationGuiIndex(animation: number): number;
    static isWalkingAnimation(animation: number): boolean;
    stop(): void;
    tick(): void;
  }


  interface EntityAIAttackTarget extends Goal {}
  class EntityAIAttackTarget extends Goal {
    constructor(par1EntityLiving: EntityNPCInterface);
    canContinueToUse(): boolean;
    canUse(): boolean;
    isWithinRestriction(pos: BlockPos): boolean;
    requiresUpdateEveryTick(): boolean;
    start(): void;
    stop(): void;
    tick(): void;
  }


  interface EntityAIAvoidTarget extends Goal {}
  class EntityAIAvoidTarget extends Goal {
    constructor(par1EntityNPC: EntityNPCInterface);
    canContinueToUse(): boolean;
    canUse(): boolean;
    start(): void;
    stop(): void;
    tick(): void;
  }


  interface EntityAIBustDoor extends DoorInteractGoal {}
  class EntityAIBustDoor extends DoorInteractGoal {
    constructor(par1EntityLiving: Mob);
    canContinueToUse(): boolean;
    canUse(): boolean;
    start(): void;
    stop(): void;
    tick(): void;
  }


  interface EntityAIFindShade extends Goal {}
  class EntityAIFindShade extends Goal {
    constructor(par1Mob: PathfinderMob);
    canContinueToUse(): boolean;
    canUse(): boolean;
    start(): void;
  }


  interface EntityAIFollow extends Goal {}
  class EntityAIFollow extends Goal {
    updateTick: number;
    constructor(npc: EntityNPCInterface);
    canContinueToUse(): boolean;
    canExcute(): boolean;
    canUse(): boolean;
    start(): void;
    stop(): void;
    tick(): void;
  }


  interface EntityAIJob extends Goal {}
  class EntityAIJob extends Goal {
    constructor(npc: EntityNPCInterface);
    canContinueToUse(): boolean;
    canUse(): boolean;
    get flags(): EnumSet<Flag>;
    start(): void;
    stop(): void;
    tick(): void;
  }


  interface EntityAILook extends Goal {}
  class EntityAILook extends Goal {
    constructor(npc: EntityNPCInterface);
    canUse(): boolean;
    rotate(entity: Entity): void;
    rotate(degrees: number): void;
    start(): void;
    stop(): void;
    tick(): void;
  }


  interface EntityAIMoveIndoors extends Goal {}
  class EntityAIMoveIndoors extends Goal {
    constructor(par1Mob: PathfinderMob);
    canContinueToUse(): boolean;
    canUse(): boolean;
    start(): void;
  }


  interface EntityAIMovingPath extends Goal {}
  class EntityAIMovingPath extends Goal {
    constructor(iNpc: EntityNPCInterface);
    canContinueToUse(): boolean;
    canUse(): boolean;
    start(): void;
  }


  interface EntityAIPanic extends Goal {}
  class EntityAIPanic extends Goal {
    constructor(par1Mob: PathfinderMob, limbSwingAmount: number);
    canContinueToUse(): boolean;
    canUse(): boolean;
    start(): void;
  }


  interface EntityAIPounceTarget extends Goal {}
  class EntityAIPounceTarget extends Goal {
    constructor(leapingEntity: EntityNPCInterface);
    canContinueToUse(): boolean;
    canUse(): boolean;
    getAngleForXYZ(varX: number, varY: number, varZ: number, horiDist: number): number;
    start(): void;
  }


  interface EntityAIRangedAttack extends Goal {}
  class EntityAIRangedAttack extends Goal {
    constructor(par1RangedAttackMob: RangedAttackMob);
    canUse(): boolean;
    hasFired(): boolean;
    requiresUpdateEveryTick(): boolean;
    stop(): void;
    tick(): void;
  }


  interface EntityAIReturn extends Goal {}
  class EntityAIReturn extends Goal {
    static readonly MaxTotalTicks: number;
    constructor(npc: EntityNPCInterface);
    canContinueToUse(): boolean;
    canUse(): boolean;
    start(): void;
    stop(): void;
    tick(): void;
  }


  interface EntityAIRole extends Goal {}
  class EntityAIRole extends Goal {
    constructor(npc: EntityNPCInterface);
    canContinueToUse(): boolean;
    canUse(): boolean;
    start(): void;
    tick(): void;
  }


  interface EntityAISprintToTarget extends Goal {}
  class EntityAISprintToTarget extends Goal {
    constructor(par1EntityLiving: EntityNPCInterface);
    canContinueToUse(): boolean;
    canUse(): boolean;
    start(): void;
    stop(): void;
  }


  interface EntityAITransform extends Goal {}
  class EntityAITransform extends Goal {
    constructor(npc: EntityNPCInterface);
    canUse(): boolean;
    start(): void;
  }


  interface EntityAIWander extends Goal {}
  class EntityAIWander extends Goal {
    readonly selector: NPCInteractSelector;
    constructor(npc: EntityNPCInterface);
    canContinueToUse(): boolean;
    canUse(): boolean;
    start(): void;
    stop(): void;
    tick(): void;
  }


  interface EntityAIWatchClosest extends Goal {}
  class EntityAIWatchClosest extends Goal {
    constructor(par1EntityLiving: EntityNPCInterface, limbSwingAmountClass: Class<LivingEntity>, par3: number);
    canContinueToUse(): boolean;
    canUse(): boolean;
    start(): void;
    stop(): void;
    tick(): void;
  }


  interface EntityAIWaterNav extends Goal {}
  class EntityAIWaterNav extends Goal {
    constructor(npc: EntityNPCInterface);
    canUse(): boolean;
    tick(): void;
  }


  interface EntityAIWorldLines extends Goal {}
  class EntityAIWorldLines extends Goal {
    constructor(npc: EntityNPCInterface);
    canUse(): boolean;
    start(): void;
  }


  interface FlyingMoveHelper extends MoveControl {}
  class FlyingMoveHelper extends MoveControl {
    constructor(entity: EntityNPCInterface);
    tick(): void;
  }


  interface NpcGroundPathNavigator extends GroundPathNavigation {}
  class NpcGroundPathNavigator extends GroundPathNavigation {
    constructor(p_26448_: Mob, p_26449_: Level);
  }


  interface NpcWalkNodeEvaluator extends WalkNodeEvaluator {}
  class NpcWalkNodeEvaluator extends WalkNodeEvaluator {
    done(): void;
    getCachedBlockType(mob: Mob, p_77569_: number, p_77570_: number, p_77571_: number): PathType;
  }

}

declare module 'noppes.npcs.ai.selector' {
  import { Predicate } from 'com.google.common.base';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { EntityNPCInterface } from 'noppes.npcs.entity';

  interface NPCAttackSelector extends Predicate<LivingEntity> {}
  class NPCAttackSelector extends Predicate<LivingEntity> {
    constructor(npc: EntityNPCInterface);
    apply(ob: LivingEntity): boolean;
    isEntityApplicable(entity: LivingEntity): boolean;
  }


  interface NPCInteractSelector extends Predicate {}
  class NPCInteractSelector extends Predicate {
    constructor(npc: EntityNPCInterface);
    apply(ob: any): boolean;
    isEntityApplicable(entity: EntityNPCInterface): boolean;
  }

}

declare module 'noppes.npcs.ai.target' {
  import { Goal } from 'net.minecraft.world.entity.ai.goal';
  import { EntityNPCInterface } from 'noppes.npcs.entity';
  import { TargetGoal, NearestAttackableTargetGoal } from 'net.minecraft.world.entity.ai.goal.target';
  import { Class } from 'java.lang';
  import { Predicate } from 'java.util.function';
  import { LivingEntity } from 'net.minecraft.world.entity';

  interface EntityAIClearTarget extends Goal {}
  class EntityAIClearTarget extends Goal {
    constructor(npc: EntityNPCInterface);
    canUse(): boolean;
    start(): void;
    stop(): void;
  }


  interface EntityAIOwnerHurtByTarget extends TargetGoal {}
  class EntityAIOwnerHurtByTarget extends TargetGoal {
    constructor(npc: EntityNPCInterface);
    canUse(): boolean;
    start(): void;
  }


  interface EntityAIOwnerHurtTarget extends TargetGoal {}
  class EntityAIOwnerHurtTarget extends TargetGoal {
    constructor(npc: EntityNPCInterface);
    canUse(): boolean;
    start(): void;
  }


  interface NpcNearestAttackableTargetGoal<T extends LivingEntity = any> extends NearestAttackableTargetGoal<T> {}
  class NpcNearestAttackableTargetGoal<T extends LivingEntity = any> extends NearestAttackableTargetGoal<T> {
    constructor(npc: EntityNPCInterface, c: Class<T>, range: number, b: boolean, b2: boolean, selector: Predicate<LivingEntity>);
    canContinueToUse(): boolean;
    start(): void;
    stop(): void;
  }

}

declare module 'noppes.npcs.api.block' {
  import { IPos, IContainer, IWorld, INbt, ITimers } from 'noppes.npcs.api';
  import { IData } from 'noppes.npcs.api.entity.data';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { IItemStack } from 'noppes.npcs.api.item';

  class IBlock {
    blockEvent(var1: number, var2: number): void;
    get blockEntityNBT(): INbt;
    get container(): IContainer;
    get displayName(): string;
    get mCBlock(): Block;
    get mCBlockState(): BlockState;
    get mCTileEntity(): BlockEntity;
    get name(): string;
    get pos(): IPos;
    get properties(): string[];
    get storeddata(): IData;
    get tempdata(): IData;
    get world(): IWorld;
    get x(): number;
    get y(): number;
    get z(): number;
    getProperty(var1: string): any;
    hasTileEntity(): boolean;
    interact(var1: number): void;
    isAir(): boolean;
    isContainer(): boolean;
    isRemoved(): boolean;
    remove(): void;
    setBlock(var1: string): IBlock;
    setBlock(var1: IBlock): IBlock;
    setProperty(var1: string, var2: any): void;
    setTileEntityNBT(var1: INbt): void;
  }


  interface IBlockScripted extends IBlock {}
  class IBlockScripted extends IBlock {
    executeCommand(var1: string): string;
    get hardness(): number;
    get isLadder(): boolean;
    get isPassible(): boolean;
    get light(): number;
    get model(): IItemStack;
    get redstonePower(): number;
    get resistance(): number;
    get rotationX(): number;
    get rotationY(): number;
    get rotationZ(): number;
    get scaleX(): number;
    get scaleY(): number;
    get scaleZ(): number;
    get textPlane(): ITextPlane;
    get textPlane2(): ITextPlane;
    get textPlane3(): ITextPlane;
    get textPlane4(): ITextPlane;
    get textPlane5(): ITextPlane;
    get textPlane6(): ITextPlane;
    get timers(): ITimers;
    set hardness(var1: number);
    set isLadder(var1: boolean);
    set isPassible(var1: boolean);
    set light(var1: number);
    set model(var1: IItemStack);
    set redstonePower(var1: number);
    set resistance(var1: number);
    setModel(var1: string): void;
    setRotation(var1: number, var2: number, var3: number): void;
    setScale(var1: number, var2: number, var3: number): void;
    trigger(var1: number, ...var2: any[]): void;
  }


  interface IBlockScriptedDoor extends IBlock {}
  class IBlockScriptedDoor extends IBlock {
    executeCommand(var1: string): string;
    get blockModel(): string;
    get hardness(): number;
    get open(): boolean;
    get resistance(): number;
    get timers(): ITimers;
    set blockModel(var1: string);
    set hardness(var1: number);
    set open(var1: boolean);
    set resistance(var1: number);
  }


  class ITextPlane {
    get offsetX(): number;
    get offsetY(): number;
    get offsetZ(): number;
    get rotationX(): number;
    get rotationY(): number;
    get rotationZ(): number;
    get scale(): number;
    get text(): string;
    set offsetX(var1: number);
    set offsetY(var1: number);
    set offsetZ(var1: number);
    set rotationX(var1: number);
    set rotationY(var1: number);
    set rotationZ(var1: number);
    set scale(var1: number);
    set text(var1: string);
  }

}

declare module 'noppes.npcs.api.constants' {
  import { Map, Optional } from 'java.util';
  import { ParticleOptions } from 'net.minecraft.core.particles';
  import { MobEffect } from 'net.minecraft.world.effect';
  import { Reference } from 'Holder';

  class AnimationType {
    static readonly NONE: number;
    static readonly SIT: number;
    static readonly SLEEP: number;
    static readonly HUG: number;
    static readonly CROUCH: number;
    static readonly DANCE: number;
    static readonly AIM: number;
    static readonly CRAWL: number;
    static readonly POINT: number;
    static readonly CRY: number;
    static readonly WAVE: number;
    static readonly BOW: number;
    static readonly NO: number;
    static readonly YES: number;
    static readonly DEATH: number;
    static readonly WALK: number;
    static readonly IDLE: number;
    static readonly FLY: number;
    static readonly FLY_IDLE: number;
    static readonly STATIC: number;
    static readonly SWIM: number;
    static readonly WAG: number;
    static ALL: Map;
    static nameOf(animation: number): string;
    static valueOf(name: string): number;
  }


  class EntitiesType {
    static readonly ANY: number;
    static readonly UNKNOWN: number;
    static readonly PLAYER: number;
    static readonly NPC: number;
    static readonly MONSTER: number;
    static readonly ANIMAL: number;
    static readonly LIVING: number;
    static readonly ITEM: number;
    static readonly PROJECTILE: number;
    static readonly PIXELMON: number;
    static readonly VILLAGER: number;
    static readonly ARROW: number;
    static readonly THROWABLE: number;
  }


  class GuiComponentType {
    static readonly BUTTON: number;
    static readonly LABEL: number;
    static readonly TEXTURED_RECT: number;
    static readonly TEXT_FIELD: number;
    static readonly SCROLL: number;
    static readonly ITEM_SLOT: number;
    static readonly TEXT_AREA: number;
    static readonly BUTTON_LIST: number;
    static readonly SLIDER: number;
    static readonly ENTITY_DISPLAY: number;
    static readonly ASSETS_SELECTOR: number;
    static readonly COLORED_LINE: number;
    static readonly ITEM_RENDERER: number;
  }


  class ItemType {
    static readonly NORMAL: number;
    static readonly BOOK: number;
    static readonly BLOCK: number;
    static readonly ARMOR: number;
    static readonly SWORD: number;
    static readonly SEEDS: number;
    static readonly SCRIPTED: number;
  }


  class JobType {
    static readonly NONE: number;
    static readonly BARD: number;
    static readonly HEALER: number;
    static readonly GUARD: number;
    static readonly ITEMGIVER: number;
    static readonly FOLLOWER: number;
    static readonly SPAWNER: number;
    static readonly CONVERSATION: number;
    static readonly CHUNKLOADER: number;
    static readonly PUPPET: number;
    static readonly BUILDER: number;
    static readonly FARMER: number;
    static readonly MAXSIZE: number;
  }


  class MarkType {
    static readonly NONE: number;
    static readonly QUESTION: number;
    static readonly EXCLAMATION: number;
    static readonly POINTER: number;
    static readonly SKULL: number;
    static readonly CROSS: number;
    static readonly STAR: number;
  }


  class OptionType {
    static readonly QUIT_OPTION: number;
    static readonly DIALOG_OPTION: number;
    static readonly DISABLED: number;
    static readonly ROLE_OPTION: number;
    static readonly COMMAND_BLOCK: number;
  }


  class ParticleType {
    static readonly NONE: number;
    static readonly SMOKE: number;
    static readonly PORTAL: number;
    static readonly REDSTONE: number;
    static readonly LIGHTNING: number;
    static readonly LARGE_SMOKE: number;
    static readonly MAGIC: number;
    static readonly ENCHANT: number;
    static readonly CRIT: number;
    static getMCType(type: number): ParticleOptions;
  }


  class PotionEffectType {
    static readonly NONE: number;
    static readonly FIRE: number;
    static readonly SPEED: number;
    static readonly SLOWNESS: number;
    static readonly HASTE: number;
    static readonly MINING_FATIGUE: number;
    static readonly STRENGTH: number;
    static readonly INSTANT_HEALTH: number;
    static readonly INSTANT_DAMAGE: number;
    static readonly JUMP_BOOST: number;
    static readonly NAUSEA: number;
    static readonly REGENERATION: number;
    static readonly RESISTANCE: number;
    static readonly FIRE_RESISTANCE: number;
    static readonly WATER_BREATHING: number;
    static readonly INVISIBILITY: number;
    static readonly BLINDNESS: number;
    static readonly NIGHT_VISION: number;
    static readonly HUNGER: number;
    static readonly WEAKNESS: number;
    static readonly POISON: number;
    static readonly WITHER: number;
    static readonly HEALTH_BOOST: number;
    static readonly ABSORPTION: number;
    static readonly SATURATION: number;
    static readonly GLOWING: number;
    static readonly LEVITATION: number;
    static readonly LUCK: number;
    static readonly UNLUCK: number;
    static readonly SLOW_FALLING: number;
    static readonly CONDUIT_POWER: number;
    static readonly DOLPHINS_GRACE: number;
    static readonly BAD_OMEN: number;
    static readonly HERO_OF_THE_VILLAGE: number;
    static getHolder(effect: number): Optional<Reference<MobEffect>>;
    static getMCType(effect: number): MobEffect;
  }


  class QuestType {
    static readonly ITEM: number;
    static readonly DIALOG: number;
    static readonly KILL: number;
    static readonly LOCATION: number;
    static readonly AREA_KILL: number;
    static readonly MANUAL: number;
  }


  class RoleType {
    static readonly NONE: number;
    static readonly TRADER: number;
    static readonly FOLLOWER: number;
    static readonly BANK: number;
    static readonly TRANSPORTER: number;
    static readonly MAILMAN: number;
    static readonly COMPANION: number;
    static readonly DIALOG: number;
    static readonly MAXSIZE: number;
  }


  class SideType {
    static readonly DOWN: number;
    static readonly UP: number;
    static readonly NORTH: number;
    static readonly SOUTH: number;
    static readonly WEST: number;
    static readonly EAST: number;
  }

}

declare module 'noppes.npcs.api.constants.ParticleType' {
  import { DustParticleOptions } from 'net.minecraft.core.particles';

  interface RedstoneParticleType extends DustParticleOptions {}
  class RedstoneParticleType extends DustParticleOptions {
  }

}

declare module 'noppes.npcs.api' {
  import { RuntimeException, Exception, Integer } from 'java.lang';
  import { IItemStack } from 'noppes.npcs.api.item';
  import { Container } from 'net.minecraft.world';
  import { AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { IEntity, IPlayer, ICustomNpc } from 'noppes.npcs.api.entity';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { CompoundTag, Tag } from 'net.minecraft.nbt';
  import { List } from 'java.util';
  import { BlockPos } from 'net.minecraft.core';
  import { IBlock } from 'noppes.npcs.api.block';
  import { IData, IPlayerMail } from 'noppes.npcs.api.entity.data';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { Level } from 'net.minecraft.world.level';
  import { Entity } from 'net.minecraft.world.entity';
  import { ItemStack } from 'net.minecraft.world.item';
  import { DimensionType } from 'net.minecraft.world.level.dimension';
  import { IFactionHandler, IRecipeHandler, IQuestHandler, IDialogHandler, ICloneHandler } from 'noppes.npcs.api.handler';
  import { ICustomGui } from 'noppes.npcs.api.gui';
  import { IOverlay } from 'noppes.npcs.api.overlay';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { File } from 'java.io';

  interface CustomNPCsException extends RuntimeException {}
  class CustomNPCsException extends RuntimeException {
    constructor(message: string, ...obs: any[]);

    constructor(ex: Exception, message: string, ...obs: any[]);
  }


  class IContainer {
    count(var1: IItemStack, var2: boolean, var3: boolean): number;
    get items(): IItemStack[];
    get mCContainer(): AbstractContainerMenu;
    get mCInventory(): Container;
    get size(): number;
    getSlot(var1: number): IItemStack;
    setSlot(var1: number, var2: IItemStack): void;
  }


  class IDamageSource {
    get immediateSource(): IEntity;
    get mCDamageSource(): DamageSource;
    get trueSource(): IEntity;
    get type(): string;
    isProjectile(): boolean;
    isUnblockable(): boolean;
  }


  class IDimension {
    get id(): string;
  }


  class INbt {
    clear(): void;
    get keys(): string[];
    get mCNBT(): CompoundTag;
    getBoolean(var1: string): boolean;
    getByte(var1: string): number;
    getByteArray(var1: string): number[];
    getCompound(var1: string): INbt;
    getDouble(var1: string): number;
    getFloat(var1: string): number;
    getInteger(var1: string): number;
    getIntegerArray(var1: string): number[];
    getList(var1: string, var2: number): any[];
    getListType(var1: string): number;
    getLong(var1: string): number;
    getShort(var1: string): number;
    getString(var1: string): string;
    getType(var1: string): number;
    has(var1: string): boolean;
    isEmpty(): boolean;
    isEqual(var1: INbt): boolean;
    mcGetTag(var1: string): Tag;
    mcSetTag(var1: string, var2: Tag): void;
    merge(var1: INbt): void;
    putString(var1: string, var2: string): void;
    remove(var1: string): void;
    setBoolean(var1: string, var2: boolean): void;
    setByte(var1: string, var2: number): void;
    setByteArray(var1: string, var2: number[]): void;
    setCompound(var1: string, var2: INbt): void;
    setDouble(var1: string, var2: number): void;
    setFloat(var1: string, var2: number): void;
    setInteger(var1: string, var2: number): void;
    setIntegerArray(var1: string, var2: number[]): void;
    setList(var1: string, var2: any[]): void;
    setLong(var1: string, var2: number): void;
    setShort(var1: string, var2: number): void;
    toJsonString(): string;
  }


  class IPlayerSkin {
    get bodyColor(): number;
    get bodyType(): number;
    get eyesColor(): number;
    get faceType(): number;
    get hairColor(): number;
    get hairType(): number;
    get jacketType(): number;
    get pantsType(): number;
    get peculiarities(): number[];
    get shoesType(): number;
    isMale(): boolean;
    set bodyColor(var1: number);
    set bodyType(var1: number);
    set eyesColor(var1: number);
    set faceType(var1: number);
    set hairColor(var1: number);
    set hairType(var1: number);
    set jacketType(var1: number);
    set pantsType(var1: number);
    set peculiarities(var1: number[]);
    set shoesType(var1: number);
    setMale(var1: boolean): IPlayerSkin;
  }


  class IPos {
    add(var1: number, var2: number, var3: number): IPos;
    add(var1: IPos): IPos;
    distanceTo(var1: IPos): number;
    down(): IPos;
    down(var1: number): IPos;
    east(): IPos;
    east(var1: number): IPos;
    get mCBlockPos(): BlockPos;
    get x(): number;
    get y(): number;
    get z(): number;
    normalize(): number[];
    north(): IPos;
    north(var1: number): IPos;
    offset(var1: number): IPos;
    offset(var1: number, var2: number): IPos;
    south(): IPos;
    south(var1: number): IPos;
    subtract(var1: number, var2: number, var3: number): IPos;
    subtract(var1: IPos): IPos;
    up(): IPos;
    up(var1: number): IPos;
    west(): IPos;
    west(var1: number): IPos;
  }


  class IRayTrace {
    get block(): IBlock;
    get pos(): IPos;
    get sideHit(): number;
  }


  class IScoreboard {
    addObjective(var1: string, var2: string): IScoreboardObjective;
    addTeam(var1: string): IScoreboardTeam;
    deletePlayerScore(var1: string, var2: string): void;
    get objectives(): IScoreboardObjective[];
    get playerList(): string[];
    get teams(): IScoreboardTeam[];
    getObjective(var1: string): IScoreboardObjective;
    getPlayerScore(var1: string, var2: string): number;
    getPlayerTeam(var1: string): IScoreboardTeam;
    getTeam(var1: string): IScoreboardTeam;
    hasObjective(var1: string): boolean;
    hasPlayerObjective(var1: string, var2: string): boolean;
    hasTeam(var1: string): boolean;
    removeObjective(var1: string): void;
    removePlayerTeam(var1: string): void;
    removeTeam(var1: string): void;
    setPlayerScore(var1: string, var2: string, var3: number): void;
  }


  class IScoreboardObjective {
    createScore(var1: string): IScoreboardScore;
    get criteria(): string;
    get displayName(): string;
    get name(): string;
    get scores(): IScoreboardScore[];
    getScore(var1: string): IScoreboardScore;
    hasScore(var1: string): boolean;
    isReadyOnly(): boolean;
    removeScore(var1: string): void;
    set displayName(var1: string);
  }


  class IScoreboardScore {
    get playerName(): string;
    get value(): number;
    set value(var1: number);
  }


  class IScoreboardTeam {
    addPlayer(var1: string): void;
    clearPlayers(): void;
    get color(): string;
    get displayName(): string;
    get friendlyFire(): boolean;
    get name(): string;
    get players(): string[];
    get seeInvisibleTeamPlayers(): boolean;
    hasPlayer(var1: string): boolean;
    removePlayer(var1: string): void;
    set color(var1: string);
    set displayName(var1: string);
    set friendlyFire(var1: boolean);
    set seeInvisibleTeamPlayers(var1: boolean);
  }


  class ITimers {
    clear(): void;
    forceStart(var1: number, var2: number, var3: boolean): void;
    has(var1: number): boolean;
    reset(var1: number): void;
    start(var1: number, var2: number, var3: boolean): void;
    stop(var1: number): boolean;
  }


  class IWorld {
    broadcast(var1: string): void;
    createEntity(var1: string): IEntity;
    createEntityFromNBT(var1: INbt): IEntity;
    createItem(var1: string, var2: number): IItemStack;
    createItemFromNbt(var1: INbt): IItemStack;
    explode(var1: number, var3: number, var5: number, var7: number, var8: boolean, var9: boolean): void;
    get allPlayers(): IPlayer[];
    get dimension(): IDimension;
    get mCLevel(): ServerLevel;
    get name(): string;
    get scoreboard(): IScoreboard;
    get spawnPoint(): IBlock;
    get storeddata(): IData;
    get tempdata(): IData;
    get time(): number;
    get totalTime(): number;
    getAllEntities(var1: number): IEntity[];
    getBiomeName(var1: number, var2: number): string;
    getBlock(var1: number, var2: number, var3: number): IBlock;
    getBlock(var1: IPos): IBlock;
    getClone(var1: number, var2: string): IEntity;
    getClosestEntity(var1: number, var2: number, var3: number, var4: number, var5: number): IEntity;
    getClosestEntity(var1: IPos, var2: number, var3: number): IEntity;
    getEntity(var1: string): IEntity;
    getLightValue(var1: number, var2: number, var3: number): number;
    getMCBlockPos(var1: number, var2: number, var3: number): BlockPos;
    getNearbyEntities(var1: number, var2: number, var3: number, var4: number, var5: number): IEntity[];
    getNearbyEntities(var1: IPos, var2: number, var3: number): IEntity[];
    getPlayer(var1: string): IPlayer;
    getRedstonePower(var1: number, var2: number, var3: number): number;
    isDay(): boolean;
    isRaining(): boolean;
    playSoundAt(var1: IPos, var2: string, var3: number, var4: number): void;
    removeBlock(var1: number, var2: number, var3: number): void;
    removeBlock(var1: IPos): void;
    set spawnPoint(var1: IBlock);
    set time(var1: number);
    setBlock(var1: number, var2: number, var3: number, var4: string, var5: number): void;
    setBlock(var1: IPos, var2: string): IBlock;
    setRaining(var1: boolean): void;
    spawnClone(var1: number, var3: number, var5: number, var7: number, var8: string): IEntity;
    spawnEntity(var1: IEntity): void;
    spawnParticle(var1: string, var2: number, var4: number, var6: number, var8: number, var10: number, var12: number, var14: number, var16: number): void;
    thunderStrike(var1: number, var3: number, var5: number): void;
    trigger(var1: number, ...var2: any[]): void;
  }


  class NpcAPI {
    static Instance(): NpcAPI;
    static IsAvailable(): boolean;
    createCustomGui(var1: number, var2: number, var3: number, var4: boolean, var5: IPlayer): ICustomGui;
    createMail(var1: string, var2: string): IPlayerMail;
    createNPC(var1: Level): ICustomNpc;
    createOverlay(var1: number): IOverlay;
    events(): IEventBus;
    executeCommand(var1: IWorld, var2: string): string;
    get clones(): ICloneHandler;
    get dialogs(): IDialogHandler;
    get factions(): IFactionHandler;
    get globalDir(): File;
    get iWorlds(): IWorld[];
    get levelDir(): File;
    get quests(): IQuestHandler;
    get recipes(): IRecipeHandler;
    getIBlock(var1: Level, var2: BlockPos): IBlock;
    getIContainer(var1: Container): IContainer;
    getIContainer(var1: AbstractContainerMenu): IContainer;
    getIDamageSource(var1: DamageSource): IDamageSource;
    getIEntity(var1: Entity): IEntity;
    getIItemStack(var1: ItemStack): IItemStack;
    getINbt(var1: CompoundTag): INbt;
    getIPos(var1: number, var3: number, var5: number): IPos;
    getIWorld(var1: ServerLevel): IWorld;
    getIWorld(var1: string): IWorld;
    getIWorld(var1: DimensionType): IWorld;
    getRandomName(var1: number, var2: number): string;
    getRawPlayerData(var1: string): INbt;
    hasPermissionNode(var1: string): boolean;
    spawnNPC(var1: Level, var2: number, var3: number, var4: number): ICustomNpc;
    stringToNbt(var1: string): INbt;
  }

}

declare module 'noppes.npcs.api.entity.data' {
  import { IAvailability, IQuest } from 'noppes.npcs.api.handler.data';
  import { IPlayer } from 'noppes.npcs.api.entity';
  import { IItemStack } from 'noppes.npcs.api.item';
  import { IContainer } from 'noppes.npcs.api';

  class IData {
    clear(): void;
    get(var1: string): any;
    get keys(): string[];
    has(var1: string): boolean;
    put(var1: string, var2: any): void;
    remove(var1: string): void;
  }


  class ILine {
    get showText(): boolean;
    get sound(): string;
    get text(): string;
    set showText(var1: boolean);
    set sound(var1: string);
    set text(var1: string);
  }


  class IMark {
    get availability(): IAvailability;
    get color(): number;
    get type(): number;
    set color(var1: number);
    set type(var1: number);
    update(): void;
  }


  class INPCAdvanced {
    getLine(var1: number, var2: number): string;
    getLineCount(var1: number): number;
    getSound(var1: number): string;
    setLine(var1: number, var2: number, var3: string, var4: string): void;
    setSound(var1: number, var2: string): void;
  }


  class INPCAi {
    get animation(): number;
    get attackInvisible(): boolean;
    get attackLOS(): boolean;
    get avoidsWater(): boolean;
    get canSwim(): boolean;
    get currentAnimation(): number;
    get doorInteract(): number;
    get interactWithNPCs(): boolean;
    get leapAtTarget(): boolean;
    get movingPathPauses(): boolean;
    get movingPathType(): number;
    get movingType(): number;
    get navigationType(): number;
    get retaliateType(): number;
    get returnsHome(): boolean;
    get sheltersFrom(): number;
    get standingType(): number;
    get stopOnInteract(): boolean;
    get walkingSpeed(): number;
    get wanderingRange(): number;
    set animation(var1: number);
    set attackInvisible(var1: boolean);
    set attackLOS(var1: boolean);
    set avoidsWater(var1: boolean);
    set canSwim(var1: boolean);
    set doorInteract(var1: number);
    set interactWithNPCs(var1: boolean);
    set leapAtTarget(var1: boolean);
    set movingType(var1: number);
    set navigationType(var1: number);
    set retaliateType(var1: number);
    set returnsHome(var1: boolean);
    set sheltersFrom(var1: number);
    set standingType(var1: number);
    set stopOnInteract(var1: boolean);
    set walkingSpeed(var1: number);
    set wanderingRange(var1: number);
    setMountControl(var1: boolean): void;
    setMovingPathType(var1: number, var2: boolean): void;
  }


  class INPCDisplay {
    get bossColor(): number;
    get bossbar(): number;
    get capeTexture(): string;
    get hasLivingAnimation(): boolean;
    get hitboxState(): number;
    get model(): string;
    get name(): string;
    get overlayTexture(): string;
    get showName(): number;
    get size(): number;
    get skinPlayer(): string;
    get skinTexture(): string;
    get skinUrl(): string;
    get tint(): number;
    get title(): string;
    get visible(): number;
    getModelScale(var1: number): number[];
    isVisibleTo(var1: IPlayer): boolean;
    set bossColor(var1: number);
    set bossbar(var1: number);
    set capeTexture(var1: string);
    set hasLivingAnimation(var1: boolean);
    set hitboxState(var1: number);
    set model(var1: string);
    set name(var1: string);
    set overlayTexture(var1: string);
    set showName(var1: number);
    set size(var1: number);
    set skinPlayer(var1: string);
    set skinTexture(var1: string);
    set skinUrl(var1: string);
    set tint(var1: number);
    set title(var1: string);
    set visible(var1: number);
    setModelScale(var1: number, var2: number, var3: number, var4: number): void;
  }


  class INPCInventory {
    get expMax(): number;
    get expMin(): number;
    get expRNG(): number;
    get itemsRNG(): IItemStack[];
    get leftHand(): IItemStack;
    get projectile(): IItemStack;
    get rightHand(): IItemStack;
    getArmor(var1: number): IItemStack;
    getDropItem(var1: number): IItemStack;
    set leftHand(var1: IItemStack);
    set projectile(var1: IItemStack);
    set rightHand(var1: IItemStack);
    setArmor(var1: number, var2: IItemStack): void;
    setDropItem(var1: number, var2: IItemStack, var3: number): void;
    setExp(var1: number, var2: number): void;
  }


  class INPCJob {
    get type(): number;
  }


  class INPCMelee {
    get delay(): number;
    get effectStrength(): number;
    get effectTime(): number;
    get effectType(): number;
    get knockback(): number;
    get range(): number;
    get strength(): number;
    set delay(var1: number);
    set knockback(var1: number);
    set range(var1: number);
    set strength(var1: number);
    setEffect(var1: number, var2: number, var3: number): void;
  }


  class INPCRanged {
    get accelerate(): boolean;
    get accuracy(): number;
    get burst(): number;
    get burstDelay(): number;
    get delayMax(): number;
    get delayMin(): number;
    get delayRNG(): number;
    get effectStrength(): number;
    get effectTime(): number;
    get effectType(): number;
    get explodeSize(): number;
    get fireType(): number;
    get glows(): boolean;
    get hasAimAnimation(): boolean;
    get hasGravity(): boolean;
    get knockback(): number;
    get meleeRange(): number;
    get particle(): number;
    get range(): number;
    get render3D(): boolean;
    get shotCount(): number;
    get size(): number;
    get speed(): number;
    get spins(): boolean;
    get sticks(): boolean;
    get strength(): number;
    getSound(var1: number): string;
    set accelerate(var1: boolean);
    set accuracy(var1: number);
    set burst(var1: number);
    set burstDelay(var1: number);
    set explodeSize(var1: number);
    set fireType(var1: number);
    set glows(var1: boolean);
    set hasAimAnimation(var1: boolean);
    set hasGravity(var1: boolean);
    set knockback(var1: number);
    set meleeRange(var1: number);
    set particle(var1: number);
    set range(var1: number);
    set render3D(var1: boolean);
    set shotCount(var1: number);
    set size(var1: number);
    set speed(var1: number);
    set spins(var1: boolean);
    set sticks(var1: boolean);
    set strength(var1: number);
    setDelay(var1: number, var2: number): void;
    setEffect(var1: number, var2: number, var3: number): void;
    setSound(var1: number, var2: string): void;
  }


  class INPCRole {
    get type(): number;
  }


  class INPCStats {
    get aggroRange(): number;
    get combatRegen(): number;
    get creatureType(): number;
    get healthRegen(): number;
    get hideDeadBody(): boolean;
    get maxHealth(): number;
    get melee(): INPCMelee;
    get ranged(): INPCRanged;
    get respawnTime(): number;
    get respawnType(): number;
    getImmune(var1: number): boolean;
    getResistance(var1: number): number;
    set aggroRange(var1: number);
    set combatRegen(var1: number);
    set creatureType(var1: number);
    set healthRegen(var1: number);
    set hideDeadBody(var1: boolean);
    set maxHealth(var1: number);
    set respawnTime(var1: number);
    set respawnType(var1: number);
    setImmune(var1: number, var2: boolean): void;
    setResistance(var1: number, var2: number): void;
  }


  class IPixelmonPlayerData {
    get pC(): any;
    get party(): any;
  }


  class IPlayerMail {
    get container(): IContainer;
    get quest(): IQuest;
    get sender(): string;
    get subject(): string;
    get text(): string[];
    set quest(var1: number);
    set sender(var1: string);
    set subject(var1: string);
    set text(var1: string[]);
  }

}

declare module 'noppes.npcs.api.entity.data.role' {
  import { INPCJob, INPCRole } from 'noppes.npcs.api.entity.data';
  import { ICustomNpc, IEntityLiving, IPlayer } from 'noppes.npcs.api.entity';
  import { IJobPuppetPart } from 'noppes.npcs.api.entity.data.role.IJobPuppet';
  import { IItemStack } from 'noppes.npcs.api.item';
  import { ITransportLocation } from 'noppes.npcs.api.entity.data.role.IRoleTransporter';

  class IJobBard {
    get song(): string;
    set song(var1: string);
  }


  class IJobBuilder {
    isBuilding(): boolean;
  }


  class IJobFarmer {
    isPlucking(): boolean;
  }


  interface IJobFollower extends INPCJob {}
  class IJobFollower extends INPCJob {
    get following(): string;
    get followingNpc(): ICustomNpc;
    isFollowing(): boolean;
    set following(var1: string);
  }


  interface IJobPuppet extends INPCJob {}
  class IJobPuppet extends INPCJob {
    get animationSpeed(): number;
    get isAnimated(): boolean;
    getPart(var1: number): IJobPuppetPart;
    set animationSpeed(var1: number);
    set isAnimated(var1: boolean);
  }


  class IJobSpawner {
    removeAllSpawned(): void;
    spawnEntity(var1: number): IEntityLiving;
  }


  class IRoleDialog {
    get dialog(): string;
    getOption(var1: number): string;
    getOptionDialog(var1: number): string;
    set dialog(var1: string);
    setOption(var1: number, var2: string): void;
    setOptionDialog(var1: number, var2: string): void;
  }


  interface IRoleFollower extends INPCRole {}
  class IRoleFollower extends INPCRole {
    addDays(var1: number): void;
    get days(): number;
    get following(): IPlayer;
    get guiDisabled(): boolean;
    get infinite(): boolean;
    get refuseSoulstone(): boolean;
    isFollowing(): boolean;
    reset(): void;
    set following(var1: IPlayer);
    set guiDisabled(var1: boolean);
    set infinite(var1: boolean);
    set refuseSoulstone(var1: boolean);
  }


  interface IRoleTrader extends INPCRole {}
  class IRoleTrader extends INPCRole {
    get market(): string;
    getCurrency1(var1: number): IItemStack;
    getCurrency2(var1: number): IItemStack;
    getSold(var1: number): IItemStack;
    remove(var1: number): void;
    set(var1: number, var2: IItemStack, var3: IItemStack, var4: IItemStack): void;
    set market(var1: string);
  }


  interface IRoleTransporter extends INPCRole {}
  class IRoleTransporter extends INPCRole {
    get location(): ITransportLocation;
  }

}

declare module 'noppes.npcs.api.entity.data.role.IJobPuppet' {
  class IJobPuppetPart {
    get rotationX(): number;
    get rotationY(): number;
    get rotationZ(): number;
    setRotation(var1: number, var2: number, var3: number): void;
  }

}

declare module 'noppes.npcs.api.entity.data.role.IRoleTransporter' {
  class ITransportLocation {
    get dimension(): string;
    get id(): number;
    get name(): string;
    get type(): number;
    get x(): number;
    get y(): number;
    get z(): number;
  }

}

declare module 'noppes.npcs.api.entity' {
  import { INPCDisplay, INPCInventory, INPCStats, INPCAi, INPCAdvanced, INPCRole, INPCJob, IData, IMark, IPlayerMail } from 'noppes.npcs.api.entity.data';
  import { IFaction, IDialog, IQuest } from 'noppes.npcs.api.handler.data';
  import { ITimers, IPos, INbt, IWorld, IRayTrace, IContainer, IPlayerSkin } from 'noppes.npcs.api';
  import { IItemStack } from 'noppes.npcs.api.item';
  import { IBlock } from 'noppes.npcs.api.block';
  import { ICustomGui } from 'noppes.npcs.api.gui';
  import { IOverlay } from 'noppes.npcs.api.overlay';

  interface IAnimal<T extends Animal = any> extends IMob<T> {}
  class IAnimal<T extends Animal = any> extends IMob<T> {
  }


  interface IArrow<T extends AbstractArrow = any> extends IEntity<T> {}
  class IArrow<T extends AbstractArrow = any> extends IEntity<T> {
  }


  interface ICustomNpc<T extends Mob = any> extends IMob<T> {}
  class ICustomNpc<T extends Mob = any> extends IMob<T> {
    executeCommand(var1: string): string;
    get advanced(): INPCAdvanced;
    get ai(): INPCAi;
    get display(): INPCDisplay;
    get faction(): IFaction;
    get homeX(): number;
    get homeY(): number;
    get homeZ(): number;
    get inventory(): INPCInventory;
    get job(): INPCJob;
    get owner(): IEntityLiving;
    get role(): INPCRole;
    get stats(): INPCStats;
    get timers(): ITimers;
    getDialog(var1: number): IDialog;
    giveItem(var1: IPlayer, var2: IItemStack): void;
    reset(): void;
    say(var1: string): void;
    sayTo(var1: IPlayer, var2: string): void;
    set faction(var1: number);
    setDialog(var1: number, var2: IDialog): void;
    setHome(var1: number, var2: number, var3: number): void;
    shootItem(var1: IEntityLiving, var2: IItemStack, var3: number): IProjectile;
    shootItem(var1: number, var3: number, var5: number, var7: IItemStack, var8: number): IProjectile;
    trigger(var1: number, ...var2: any[]): void;
    updateClient(): void;
  }


  class IEntity<T extends Entity = any> {
    addRider(var1: IEntity): void;
    addTag(var1: string): void;
    clearRiders(): void;
    damage(var1: number): void;
    damage(var1: number, var2: IEntity): void;
    despawn(): void;
    dropItem(var1: IItemStack): IEntityItem;
    extinguish(): void;
    generateNewUUID(): string;
    get age(): number;
    get allRiders(): IEntity[];
    get blockX(): number;
    get blockY(): number;
    get blockZ(): number;
    get entityName(): string;
    get entityNbt(): INbt;
    get eyeHeight(): number;
    get height(): number;
    get mCEntity(): T;
    get motionX(): number;
    get motionY(): number;
    get motionZ(): number;
    get mount(): IEntity;
    get name(): string;
    get nbt(): INbt;
    get pitch(): number;
    get pos(): IPos;
    get riders(): IEntity[];
    get rotation(): number;
    get storeddata(): IData;
    get tags(): string[];
    get tempdata(): IData;
    get type(): number;
    get typeName(): string;
    get uUID(): string;
    get width(): number;
    get world(): IWorld;
    get x(): number;
    get y(): number;
    get z(): number;
    hasCustomName(): boolean;
    hasTag(var1: string): boolean;
    inFire(): boolean;
    inLava(): boolean;
    inWater(): boolean;
    isAlive(): boolean;
    isBurning(): boolean;
    isSneaking(): boolean;
    isSprinting(): boolean;
    kill(): void;
    knockback(var1: number, var2: number): void;
    playAnimation(var1: number): void;
    rayTraceBlock(var1: number, var3: boolean, var4: boolean): IRayTrace;
    rayTraceEntities(var1: number, var3: boolean, var4: boolean): IEntity[];
    removeTag(var1: string): void;
    set entityNbt(var1: INbt);
    set motionX(var1: number);
    set motionY(var1: number);
    set motionZ(var1: number);
    set mount(var1: IEntity);
    set name(var1: string);
    set pitch(var1: number);
    set pos(var1: IPos);
    set rotation(var1: number);
    set x(var1: number);
    set y(var1: number);
    set z(var1: number);
    setBurning(var1: number): void;
    setPosition(var1: number, var3: number, var5: number): void;
    spawn(): void;
    storeAsClone(var1: number, var2: string): void;
    typeOf(var1: number): boolean;
  }


  interface IEntityItem<T extends ItemEntity = any> extends IEntity<T> {}
  class IEntityItem<T extends ItemEntity = any> extends IEntity<T> {
    get age(): number;
    get item(): IItemStack;
    get owner(): string;
    get pickupDelay(): number;
    set age(var1: number);
    set item(var1: IItemStack);
    set owner(var1: string);
    set pickupDelay(var1: number);
  }


  interface IEntityLiving<T extends LivingEntity = any> extends IEntity<T> {}
  class IEntityLiving<T extends LivingEntity = any> extends IEntity<T> {
    addMark(var1: number): IMark;
    addPotionEffect(var1: number, var2: number, var3: number, var4: boolean): void;
    canSeeEntity(var1: IEntity): boolean;
    clearPotionEffects(): void;
    get attackTarget(): IEntityLiving;
    get health(): number;
    get lastAttacked(): IEntityLiving;
    get lastAttackedTime(): number;
    get mCEntity(): T;
    get mainhandItem(): IItemStack;
    get marks(): IMark[];
    get maxHealth(): number;
    get moveForward(): number;
    get moveStrafing(): number;
    get moveVertical(): number;
    get offhandItem(): IItemStack;
    getArmor(var1: number): IItemStack;
    getPotionEffect(var1: number): number;
    isAttacking(): boolean;
    isChild(): boolean;
    removeMark(var1: IMark): void;
    set attackTarget(var1: IEntityLiving);
    set health(var1: number);
    set mainhandItem(var1: IItemStack);
    set maxHealth(var1: number);
    set moveForward(var1: number);
    set moveStrafing(var1: number);
    set moveVertical(var1: number);
    set offhandItem(var1: IItemStack);
    setArmor(var1: number, var2: IItemStack): void;
    swingMainhand(): void;
    swingOffhand(): void;
  }


  interface IMob<T extends Mob = any> extends IEntityLiving<T> {}
  class IMob<T extends Mob = any> extends IEntityLiving<T> {
    clearNavigation(): void;
    get mCEntity(): T;
    get navigationPath(): IPos;
    isNavigating(): boolean;
    jump(): void;
    navigateTo(var1: number, var3: number, var5: number, var7: number): void;
  }


  interface IMonster<T extends Mob = any> extends IMob<T> {}
  class IMonster<T extends Mob = any> extends IMob<T> {
  }


  interface IPixelmon<T extends TamableAnimal = any> extends IAnimal<T> {}
  class IPixelmon<T extends TamableAnimal = any> extends IAnimal<T> {
    get pokemonData(): any;
  }


  interface IPlayer<T extends ServerPlayer = any> extends IEntityLiving<T> {}
  class IPlayer<T extends ServerPlayer = any> extends IEntityLiving<T> {
    addDialog(var1: number): void;
    addFactionPoints(var1: number, var2: number): void;
    canQuestBeAccepted(var1: number): boolean;
    clearData(): void;
    closeGui(): void;
    factionStatus(var1: number): number;
    finishQuest(var1: number): void;
    get activeQuests(): IQuest[];
    get customGui(): ICustomGui;
    get displayName(): string;
    get expLevel(): number;
    get finishedQuests(): IQuest[];
    get gamemode(): number;
    get hunger(): number;
    get inventory(): IContainer;
    get inventoryHeldItem(): IItemStack;
    get mCEntity(): T;
    get openContainer(): IContainer;
    get pixelmonData(): any;
    get skin(): IPlayerSkin;
    get spawnPoint(): IBlock;
    get timers(): ITimers;
    getFactionPoints(var1: number): number;
    giveItem(var1: IItemStack): boolean;
    giveItem(var1: string, var2: number): boolean;
    hasActiveQuest(var1: number): boolean;
    hasAdvancement(var1: string): boolean;
    hasFinishedQuest(var1: number): boolean;
    hasPermission(var1: string): boolean;
    hasReadDialog(var1: number): boolean;
    hideAllOverlays(): void;
    hideOverlay(var1: number): void;
    inventoryItemCount(var1: IItemStack): number;
    inventoryItemCount(var1: string): number;
    kick(var1: string): void;
    message(var1: string): void;
    playMusic(var1: string, var2: boolean, var3: boolean): void;
    playSound(var1: string, var2: number, var3: number): void;
    removeAllItems(var1: IItemStack): void;
    removeDialog(var1: number): void;
    removeItem(var1: IItemStack, var2: number): boolean;
    removeItem(var1: string, var2: number): boolean;
    removeQuest(var1: number): void;
    resetSpawnpoint(): void;
    sendMail(var1: IPlayerMail): void;
    sendNotification(var1: string, var2: string, var3: number): void;
    set expLevel(var1: number);
    set gamemode(var1: number);
    set hunger(var1: number);
    set spawnPoint(var1: IBlock);
    setSpawnpoint(var1: number, var2: number, var3: number): void;
    showCustomGui(var1: ICustomGui): void;
    showDialog(var1: number, var2: string): void;
    showOverlay(var1: IOverlay): void;
    showSoundSelectionGUI(): void;
    startQuest(var1: number): void;
    stopQuest(var1: number): void;
    trigger(var1: number, ...var2: any[]): void;
    updatePlayerInventory(): void;
  }


  interface IProjectile<T extends ThrowableProjectile = any> extends IThrowable<T> {}
  class IProjectile<T extends ThrowableProjectile = any> extends IThrowable<T> {
    enableEvents(): void;
    get accuracy(): number;
    get hasGravity(): boolean;
    get item(): IItemStack;
    set accuracy(var1: number);
    set hasGravity(var1: boolean);
    set item(var1: IItemStack);
    setHeading(var1: IEntity): void;
    setHeading(var1: number, var3: number, var5: number): void;
    setHeading(var1: number, var2: number): void;
  }


  interface IThrowable<T extends ThrowableProjectile = any> extends IEntity<T> {}
  class IThrowable<T extends ThrowableProjectile = any> extends IEntity<T> {
  }


  interface IVillager<T extends Mob = any> extends IMob<T> {}
  class IVillager<T extends Mob = any> extends IMob<T> {
  }

}

declare module 'noppes.npcs.api.event' {
  import { IBlock } from 'noppes.npcs.api.block';
  import { IPlayer, ICustomNpc, IProjectile } from 'noppes.npcs.api.entity';
  import { ICustomGui } from 'noppes.npcs.api.gui';
  import { Event, ICancellableEvent } from 'net.neoforged.bus.api';
  import { NpcAPI, IWorld } from 'noppes.npcs.api';
  import { IDialog, IQuest } from 'noppes.npcs.api.handler.data';
  import { Player } from 'net.minecraft.world.entity.player';
  import { IItemScripted } from 'noppes.npcs.api.item';

  interface BlockEvent extends CustomNPCsEvent {}
  class BlockEvent extends CustomNPCsEvent {
    block: IBlock;
    constructor(block: IBlock);
  }


  interface CustomGuiEvent extends CustomNPCsEvent {}
  class CustomGuiEvent extends CustomNPCsEvent {
    readonly player: IPlayer;
    readonly gui: ICustomGui;
    constructor(player: IPlayer, gui: ICustomGui);
  }


  interface CustomNPCsEvent extends Event {}
  class CustomNPCsEvent extends Event {
    readonly API: NpcAPI;
  }


  interface DialogEvent extends NpcEvent {}
  class DialogEvent extends NpcEvent {
    readonly dialog: IDialog;
    readonly player: IPlayer;
    constructor(npc: ICustomNpc, player: Player, dialog: IDialog);
  }


  interface ForgeEvent extends ICancellableEvent, CustomNPCsEvent {}
  class ForgeEvent extends ICancellableEvent {
    readonly event: Event;
    constructor(event: Event);
  }


  class HandlerEvent {
  }


  interface ItemEvent extends CustomNPCsEvent {}
  class ItemEvent extends CustomNPCsEvent {
    item: IItemScripted;
    constructor(item: IItemScripted);
  }


  interface NpcEvent extends CustomNPCsEvent {}
  class NpcEvent extends CustomNPCsEvent {
    readonly npc: ICustomNpc;
    constructor(npc: ICustomNpc);
  }


  interface PlayerEvent extends CustomNPCsEvent {}
  class PlayerEvent extends CustomNPCsEvent {
    readonly player: IPlayer;
    constructor(player: IPlayer);
  }


  interface ProjectileEvent extends CustomNPCsEvent {}
  class ProjectileEvent extends CustomNPCsEvent {
    projectile: IProjectile;
    constructor(projectile: IProjectile);
  }


  interface QuestEvent extends CustomNPCsEvent {}
  class QuestEvent extends CustomNPCsEvent {
    readonly quest: IQuest;
    readonly player: IPlayer;
    constructor(player: IPlayer, quest: IQuest);
  }


  interface RoleEvent extends CustomNPCsEvent {}
  class RoleEvent extends CustomNPCsEvent {
    readonly npc: ICustomNpc;
    readonly player: IPlayer;
    constructor(player: Player, npc: ICustomNpc);
  }


  interface WorldEvent extends CustomNPCsEvent {}
  class WorldEvent extends CustomNPCsEvent {
    readonly world: IWorld;
    constructor(world: IWorld);
  }

}

declare module 'noppes.npcs.api.event.BlockEvent' {
  import { BlockEvent } from 'noppes.npcs.api.event';
  import { IBlock } from 'noppes.npcs.api.block';
  import { IEntity, IPlayer } from 'noppes.npcs.api.entity';
  import { Entity } from 'net.minecraft.world.entity';
  import { ICancellableEvent } from 'net.neoforged.bus.api';
  import { Player } from 'net.minecraft.world.entity.player';
  import { IPos } from 'noppes.npcs.api';

  interface TimerEvent extends BlockEvent {}
  class TimerEvent extends BlockEvent {
    readonly id: number;
    constructor(block: IBlock, id: number);
  }


  interface CollidedEvent extends BlockEvent {}
  class CollidedEvent extends BlockEvent {
    readonly entity: IEntity;
    constructor(block: IBlock, entity: Entity);
  }


  interface HarvestedEvent extends ICancellableEvent, BlockEvent {}
  class HarvestedEvent extends ICancellableEvent {
    readonly player: IPlayer;
    constructor(block: IBlock, player: Player);
  }


  interface ClickedEvent extends BlockEvent {}
  class ClickedEvent extends BlockEvent {
    readonly player: IPlayer;
    constructor(block: IBlock, player: Player);
  }


  interface UpdateEvent extends BlockEvent {}
  class UpdateEvent extends BlockEvent {
    constructor(block: IBlock);
  }


  interface InitEvent extends BlockEvent {}
  class InitEvent extends BlockEvent {
    constructor(block: IBlock);
  }


  interface NeighborChangedEvent extends BlockEvent {}
  class NeighborChangedEvent extends BlockEvent {
    readonly changedPos: IPos;
    constructor(block: IBlock, changedPos: IPos);
  }


  interface RainFillEvent extends BlockEvent {}
  class RainFillEvent extends BlockEvent {
    constructor(block: IBlock);
  }


  interface ExplodedEvent extends ICancellableEvent, BlockEvent {}
  class ExplodedEvent extends ICancellableEvent {
    constructor(block: IBlock);
  }


  interface BreakEvent extends BlockEvent {}
  class BreakEvent extends BlockEvent {
    constructor(block: IBlock);
  }


  interface DoorToggleEvent extends ICancellableEvent, BlockEvent {}
  class DoorToggleEvent extends ICancellableEvent {
    constructor(block: IBlock);
  }


  interface RedstoneEvent extends BlockEvent {}
  class RedstoneEvent extends BlockEvent {
    readonly prevPower: number;
    readonly power: number;
    constructor(block: IBlock, prevPower: number, power: number);
  }


  interface InteractEvent extends ICancellableEvent, BlockEvent {}
  class InteractEvent extends ICancellableEvent {
    readonly player: IPlayer;
    readonly hitX: number;
    readonly hitY: number;
    readonly hitZ: number;
    readonly side: number;
    constructor(block: IBlock, player: Player, side: number, hitX: number, hitY: number, hitZ: number);
  }


  interface EntityFallenUponEvent extends ICancellableEvent, BlockEvent {}
  class EntityFallenUponEvent extends ICancellableEvent {
    readonly entity: IEntity;
    distanceFallen: number;
    constructor(block: IBlock, entity: Entity, distance: number);
  }

}

declare module 'noppes.npcs.api.event.CustomGuiEvent' {
  import { CustomGuiEvent } from 'noppes.npcs.api.event';
  import { IScroll, ICustomGui, IItemSlot, IButton } from 'noppes.npcs.api.gui';
  import { IPlayer } from 'noppes.npcs.api.entity';
  import { ICancellableEvent } from 'net.neoforged.bus.api';
  import { IItemStack } from 'noppes.npcs.api.item';

  interface ScrollEvent extends CustomGuiEvent {}
  class ScrollEvent extends CustomGuiEvent {
    readonly scrollId: number;
    readonly selection: string[];
    readonly doubleClick: boolean;
    readonly scrollIndex: number;
    readonly scroll: IScroll;
    constructor(player: IPlayer, gui: ICustomGui, scroll: IScroll, scrollIndex: number, selection: string[], doubleClick: boolean);
  }


  interface SlotClickEvent extends ICancellableEvent, SlotEvent {}
  class SlotClickEvent extends ICancellableEvent {
    readonly dragType: number;
    readonly clickType: string;
    constructor(player: IPlayer, gui: ICustomGui, slot: IItemSlot, dragType: number, clickType: string);
  }


  interface SlotEvent extends CustomGuiEvent {}
  class SlotEvent extends CustomGuiEvent {
    readonly slotId: number;
    readonly stack: IItemStack;
    readonly slot: IItemSlot;
    constructor(player: IPlayer, gui: ICustomGui, slot: IItemSlot);
  }


  interface ButtonEvent extends CustomGuiEvent {}
  class ButtonEvent extends CustomGuiEvent {
    readonly buttonId: number;
    readonly button: IButton;
    constructor(player: IPlayer, gui: ICustomGui, button: IButton);
  }


  interface CloseEvent extends CustomGuiEvent {}
  class CloseEvent extends CustomGuiEvent {
    constructor(player: IPlayer, gui: ICustomGui);
  }

}

declare module 'noppes.npcs.api.event.DialogEvent' {
  import { DialogEvent } from 'noppes.npcs.api.event';
  import { ICancellableEvent } from 'net.neoforged.bus.api';
  import { IDialogOption, IDialog } from 'noppes.npcs.api.handler.data';
  import { ICustomNpc } from 'noppes.npcs.api.entity';
  import { Player } from 'net.minecraft.world.entity.player';

  interface OptionEvent extends ICancellableEvent, DialogEvent {}
  class OptionEvent extends ICancellableEvent {
    readonly option: IDialogOption;
    constructor(npc: ICustomNpc, player: Player, dialog: IDialog, option: IDialogOption);
  }


  interface CloseEvent extends DialogEvent {}
  class CloseEvent extends DialogEvent {
    constructor(npc: ICustomNpc, player: Player, dialog: IDialog);
  }


  interface OpenEvent extends ICancellableEvent, DialogEvent {}
  class OpenEvent extends ICancellableEvent {
    constructor(npc: ICustomNpc, player: Player, dialog: IDialog);
  }

}

declare module 'noppes.npcs.api.event.ForgeEvent' {
  import { ForgeEvent } from 'noppes.npcs.api.event';
  import { ICancellableEvent } from 'net.neoforged.bus.api';
  import { IWorld } from 'noppes.npcs.api';
  import { LevelEvent as net_neoforged_neoforge_event_level_LevelEvent } from 'net.neoforged.neoforge.event.level';
  import { IEntity } from 'noppes.npcs.api.entity';
  import { EntityEvent as net_neoforged_neoforge_event_entity_EntityEvent } from 'net.neoforged.neoforge.event.entity';

  interface LevelEvent extends ICancellableEvent, ForgeEvent {}
  class LevelEvent extends ICancellableEvent {
    readonly world: IWorld;
    constructor(event: net_neoforged_neoforge_event_level_LevelEvent, world: IWorld);
  }


  interface EntityEvent extends ICancellableEvent, ForgeEvent {}
  class EntityEvent extends ICancellableEvent {
    readonly entity: IEntity;
    constructor(event: net_neoforged_neoforge_event_entity_EntityEvent, entity: IEntity);
  }


  interface InitEvent extends ForgeEvent {}
  class InitEvent extends ForgeEvent {
    constructor();
  }

}

declare module 'noppes.npcs.api.event.HandlerEvent' {
  import { CustomNPCsEvent } from 'noppes.npcs.api.event';
  import { IFactionHandler, IRecipeHandler } from 'noppes.npcs.api.handler';

  interface FactionsLoadedEvent extends CustomNPCsEvent {}
  class FactionsLoadedEvent extends CustomNPCsEvent {
    readonly handler: IFactionHandler;
    constructor(handler: IFactionHandler);
  }


  interface RecipesLoadedEvent extends CustomNPCsEvent {}
  class RecipesLoadedEvent extends CustomNPCsEvent {
    readonly handler: IRecipeHandler;
    constructor(handler: IRecipeHandler);
  }

}

declare module 'noppes.npcs.api.event.ItemEvent' {
  import { ItemEvent } from 'noppes.npcs.api.event';
  import { ICancellableEvent } from 'net.neoforged.bus.api';
  import { IPlayer, IEntity, IEntityItem } from 'noppes.npcs.api.entity';
  import { IDamageSource } from 'noppes.npcs.api';
  import { IItemScripted } from 'noppes.npcs.api.item';

  interface AttackEvent extends ICancellableEvent, ItemEvent {}
  class AttackEvent extends ICancellableEvent {
    readonly type: number;
    readonly target: any;
    player: IPlayer;
    readonly damageSource: IDamageSource;
    constructor(item: IItemScripted, player: IPlayer, type: number, target: any);

    constructor(item: IItemScripted, player: IPlayer, target: IEntity, damageSource: IDamageSource);
  }


  interface InteractEvent extends ICancellableEvent, ItemEvent {}
  class InteractEvent extends ICancellableEvent {
    readonly type: number;
    readonly target: any;
    player: IPlayer;
    constructor(item: IItemScripted, player: IPlayer, type: number, target: any);
  }


  interface PickedUpEvent extends ItemEvent {}
  class PickedUpEvent extends ItemEvent {
    entity: IEntityItem;
    player: IPlayer;
    constructor(item: IItemScripted, player: IPlayer, entity: IEntityItem);
  }


  interface TossedEvent extends ICancellableEvent, ItemEvent {}
  class TossedEvent extends ICancellableEvent {
    entity: IEntityItem;
    player: IPlayer;
    constructor(item: IItemScripted, player: IPlayer, entity: IEntityItem);
  }


  interface SpawnEvent extends ICancellableEvent, ItemEvent {}
  class SpawnEvent extends ICancellableEvent {
    entity: IEntityItem;
    constructor(item: IItemScripted, entity: IEntityItem);
  }


  interface UpdateEvent extends ItemEvent {}
  class UpdateEvent extends ItemEvent {
    player: IPlayer;
    constructor(item: IItemScripted, player: IPlayer);
  }


  interface InitEvent extends ItemEvent {}
  class InitEvent extends ItemEvent {
    constructor(item: IItemScripted);
  }

}

declare module 'noppes.npcs.api.event.NpcEvent' {
  import { NpcEvent } from 'noppes.npcs.api.event';
  import { ICustomNpc, IEntity, IEntityLiving, IPlayer } from 'noppes.npcs.api.entity';
  import { Entity, LivingEntity } from 'net.minecraft.world.entity';
  import { ICancellableEvent } from 'net.neoforged.bus.api';
  import { IDamageSource } from 'noppes.npcs.api';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { List } from 'java.util';
  import { IItemStack } from 'noppes.npcs.api.item';
  import { ILine } from 'noppes.npcs.api.entity.data';
  import { Player } from 'net.minecraft.world.entity.player';

  interface TimerEvent extends NpcEvent {}
  class TimerEvent extends NpcEvent {
    readonly id: number;
    constructor(npc: ICustomNpc, id: number);
  }


  interface CollideEvent extends NpcEvent {}
  class CollideEvent extends NpcEvent {
    readonly entity: IEntity;
    constructor(npc: ICustomNpc, entity: Entity);
  }


  interface DamagedEvent extends ICancellableEvent, NpcEvent {}
  class DamagedEvent extends ICancellableEvent {
    readonly damageSource: IDamageSource;
    readonly source: IEntity;
    damage: number;
    clearTarget: boolean;
    constructor(npc: ICustomNpc, source: Entity, damage: number, damagesource: DamageSource);
  }


  interface RangedLaunchedEvent extends NpcEvent {}
  class RangedLaunchedEvent extends NpcEvent {
    readonly target: IEntityLiving;
    damage: number;
    projectiles: List;
    constructor(npc: ICustomNpc, target: LivingEntity, damage: number);
  }


  interface MeleeAttackEvent extends ICancellableEvent, NpcEvent {}
  class MeleeAttackEvent extends ICancellableEvent {
    readonly target: IEntityLiving;
    damage: number;
    constructor(npc: ICustomNpc, target: LivingEntity, damage: number);
  }


  interface KilledEntityEvent extends NpcEvent {}
  class KilledEntityEvent extends NpcEvent {
    readonly entity: IEntityLiving;
    constructor(npc: ICustomNpc, entity: LivingEntity);
  }


  interface DiedEvent extends NpcEvent {}
  class DiedEvent extends NpcEvent {
    readonly damageSource: IDamageSource;
    readonly type: string;
    readonly source: IEntity;
    droppedItems: IItemStack[];
    expDropped: number;
    line: ILine;
    constructor(npc: ICustomNpc, damagesource: DamageSource, entity: Entity);
  }


  interface InteractEvent extends ICancellableEvent, NpcEvent {}
  class InteractEvent extends ICancellableEvent {
    readonly player: IPlayer;
    constructor(npc: ICustomNpc, player: Player);
  }


  interface TargetLostEvent extends ICancellableEvent, NpcEvent {}
  class TargetLostEvent extends ICancellableEvent {
    readonly entity: IEntityLiving;
    constructor(npc: ICustomNpc, entity: LivingEntity);
  }


  interface TargetEvent extends ICancellableEvent, NpcEvent {}
  class TargetEvent extends ICancellableEvent {
    entity: IEntityLiving;
    constructor(npc: ICustomNpc, entity: LivingEntity);
  }


  interface UpdateEvent extends NpcEvent {}
  class UpdateEvent extends NpcEvent {
    constructor(npc: ICustomNpc);
  }


  interface InitEvent extends NpcEvent {}
  class InitEvent extends NpcEvent {
    constructor(npc: ICustomNpc);
  }

}

declare module 'noppes.npcs.api.event.PlayerEvent' {
  import { PlayerEvent } from 'noppes.npcs.api.event';
  import { IPlayer, IEntity, IEntityLiving } from 'noppes.npcs.api.entity';
  import { IFaction } from 'noppes.npcs.api.handler.data';
  import { ICancellableEvent } from 'net.neoforged.bus.api';
  import { IDamageSource, IContainer } from 'noppes.npcs.api';
  import { Entity, LivingEntity } from 'net.minecraft.world.entity';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { IItemStack } from 'noppes.npcs.api.item';
  import { IBlock } from 'noppes.npcs.api.block';

  interface PlaySoundEvent extends PlayerEvent {}
  class PlaySoundEvent extends PlayerEvent {
    readonly sound: string;
    readonly category: string;
    readonly looping: boolean;
    constructor(player: IPlayer, sound: string, category: string, looping: boolean);
  }


  interface FactionUpdateEvent extends PlayerEvent {}
  class FactionUpdateEvent extends PlayerEvent {
    readonly faction: IFaction;
    points: number;
    init: boolean;
    constructor(player: IPlayer, faction: IFaction, points: number, init: boolean);
  }


  interface ChatEvent extends ICancellableEvent, PlayerEvent {}
  class ChatEvent extends ICancellableEvent {
    message: string;
    constructor(player: IPlayer, message: string);
  }


  interface KeyReleasedEvent extends PlayerEvent {}
  class KeyReleasedEvent extends PlayerEvent {
    readonly key: number;
    readonly isCtrlPressed: boolean;
    readonly isAltPressed: boolean;
    readonly isShiftPressed: boolean;
    readonly isMetaPressed: boolean;
    readonly openGui: string;
    constructor(player: IPlayer, key: number, isCtrlPressed: boolean, isAltPressed: boolean, isShiftPressed: boolean, isMetaPressed: boolean, openGui: string);
  }


  interface KeyPressedEvent extends PlayerEvent {}
  class KeyPressedEvent extends PlayerEvent {
    readonly key: number;
    readonly isCtrlPressed: boolean;
    readonly isAltPressed: boolean;
    readonly isShiftPressed: boolean;
    readonly isMetaPressed: boolean;
    readonly openGui: string;
    constructor(player: IPlayer, key: number, isCtrlPressed: boolean, isAltPressed: boolean, isShiftPressed: boolean, isMetaPressed: boolean, openGui: string);
  }


  interface LevelUpEvent extends PlayerEvent {}
  class LevelUpEvent extends PlayerEvent {
    readonly change: number;
    constructor(player: IPlayer, change: number);
  }


  interface LogoutEvent extends PlayerEvent {}
  class LogoutEvent extends PlayerEvent {
    constructor(player: IPlayer);
  }


  interface LoginEvent extends PlayerEvent {}
  class LoginEvent extends PlayerEvent {
    constructor(player: IPlayer);
  }


  interface TimerEvent extends PlayerEvent {}
  class TimerEvent extends PlayerEvent {
    readonly id: number;
    constructor(player: IPlayer, id: number);
  }


  interface DamagedEvent extends ICancellableEvent, PlayerEvent {}
  class DamagedEvent extends ICancellableEvent {
    readonly damageSource: IDamageSource;
    readonly source: IEntity;
    damage: number;
    clearTarget: boolean;
    constructor(player: IPlayer, source: Entity, damage: number, damagesource: DamageSource);
  }


  interface KilledEntityEvent extends PlayerEvent {}
  class KilledEntityEvent extends PlayerEvent {
    readonly entity: IEntityLiving;
    constructor(player: IPlayer, entity: LivingEntity);
  }


  interface DiedEvent extends ICancellableEvent, PlayerEvent {}
  class DiedEvent extends ICancellableEvent {
    readonly damageSource: IDamageSource;
    readonly type: string;
    readonly source: IEntity;
    constructor(player: IPlayer, damagesource: DamageSource, entity: Entity);
  }


  interface RangedLaunchedEvent extends ICancellableEvent, PlayerEvent {}
  class RangedLaunchedEvent extends ICancellableEvent {
    constructor(player: IPlayer);
  }


  interface DamagedEntityEvent extends ICancellableEvent, PlayerEvent {}
  class DamagedEntityEvent extends ICancellableEvent {
    readonly damageSource: IDamageSource;
    readonly target: IEntity;
    damage: number;
    constructor(player: IPlayer, target: Entity, damage: number, damagesource: DamageSource);
  }


  interface ContainerClosed extends PlayerEvent {}
  class ContainerClosed extends PlayerEvent {
    readonly container: IContainer;
    constructor(player: IPlayer, container: IContainer);
  }


  interface ContainerOpen extends PlayerEvent {}
  class ContainerOpen extends PlayerEvent {
    readonly container: IContainer;
    constructor(player: IPlayer, container: IContainer);
  }


  interface PickUpEvent extends ICancellableEvent, PlayerEvent {}
  class PickUpEvent extends ICancellableEvent {
    readonly item: IItemStack;
    constructor(player: IPlayer, item: IItemStack);
  }


  interface TossEvent extends ICancellableEvent, PlayerEvent {}
  class TossEvent extends ICancellableEvent {
    readonly item: IItemStack;
    constructor(player: IPlayer, item: IItemStack);
  }


  interface BreakEvent extends ICancellableEvent, PlayerEvent {}
  class BreakEvent extends ICancellableEvent {
    readonly block: IBlock;
    constructor(player: IPlayer, block: IBlock);
  }


  interface AttackEvent extends ICancellableEvent, PlayerEvent {}
  class AttackEvent extends ICancellableEvent {
    readonly type: number;
    readonly target: any;
    readonly damageSource: IDamageSource;
    constructor(player: IPlayer, type: number, target: any);

    constructor(player: IPlayer, target: IEntity, damageSource: IDamageSource);
  }


  interface InteractEvent extends ICancellableEvent, PlayerEvent {}
  class InteractEvent extends ICancellableEvent {
    readonly type: number;
    readonly target: any;
    constructor(player: IPlayer, type: number, target: any);
  }


  interface UpdateEvent extends PlayerEvent {}
  class UpdateEvent extends PlayerEvent {
    constructor(player: IPlayer);
  }


  interface InitEvent extends PlayerEvent {}
  class InitEvent extends PlayerEvent {
    constructor(player: IPlayer);
  }

}

declare module 'noppes.npcs.api.event.ProjectileEvent' {
  import { ProjectileEvent } from 'noppes.npcs.api.event';
  import { IProjectile } from 'noppes.npcs.api.entity';

  interface ImpactEvent extends ProjectileEvent {}
  class ImpactEvent extends ProjectileEvent {
    readonly type: number;
    readonly target: any;
    constructor(projectile: IProjectile, type: number, target: any);
  }


  interface UpdateEvent extends ProjectileEvent {}
  class UpdateEvent extends ProjectileEvent {
    constructor(projectile: IProjectile);
  }

}

declare module 'noppes.npcs.api.event.QuestEvent' {
  import { QuestEvent } from 'noppes.npcs.api.event';
  import { IItemStack } from 'noppes.npcs.api.item';
  import { IPlayer } from 'noppes.npcs.api.entity';
  import { IQuest } from 'noppes.npcs.api.handler.data';
  import { ICancellableEvent } from 'net.neoforged.bus.api';

  interface QuestTurnedInEvent extends QuestEvent {}
  class QuestTurnedInEvent extends QuestEvent {
    expReward: number;
    itemRewards: IItemStack[];
    constructor(player: IPlayer, quest: IQuest);
  }


  interface QuestCompletedEvent extends QuestEvent {}
  class QuestCompletedEvent extends QuestEvent {
    constructor(player: IPlayer, quest: IQuest);
  }


  interface QuestStartEvent extends ICancellableEvent, QuestEvent {}
  class QuestStartEvent extends ICancellableEvent {
    constructor(player: IPlayer, quest: IQuest);
  }

}

declare module 'noppes.npcs.api.event.RoleEvent' {
  import { RoleEvent } from 'noppes.npcs.api.event';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ICustomNpc } from 'noppes.npcs.api.entity';
  import { IItemStack } from 'noppes.npcs.api.item';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ICancellableEvent } from 'net.neoforged.bus.api';
  import { IPlayerMail } from 'noppes.npcs.api.entity.data';
  import { ITransportLocation } from 'noppes.npcs.api.entity.data.role.IRoleTransporter';

  interface BankUpgradedEvent extends RoleEvent {}
  class BankUpgradedEvent extends RoleEvent {
    readonly slot: number;
    constructor(player: Player, npc: ICustomNpc, slot: number);
  }


  interface BankUnlockedEvent extends RoleEvent {}
  class BankUnlockedEvent extends RoleEvent {
    readonly slot: number;
    constructor(player: Player, npc: ICustomNpc, slot: number);
  }


  interface TradeFailedEvent extends RoleEvent {}
  class TradeFailedEvent extends RoleEvent {
    readonly sold: IItemStack;
    readonly currency1: IItemStack;
    readonly currency2: IItemStack;
    receiving: IItemStack;
    constructor(player: Player, npc: ICustomNpc, sold: ItemStack, currency1: ItemStack, currency2: ItemStack);
  }


  interface TraderEvent extends ICancellableEvent, RoleEvent {}
  class TraderEvent extends ICancellableEvent {
    sold: IItemStack;
    currency1: IItemStack;
    currency2: IItemStack;
    constructor(player: Player, npc: ICustomNpc, sold: ItemStack, currency1: ItemStack, currency2: ItemStack);
  }


  interface FollowerFinishedEvent extends RoleEvent {}
  class FollowerFinishedEvent extends RoleEvent {
    constructor(player: Player, npc: ICustomNpc);
  }


  interface FollowerHireEvent extends ICancellableEvent, RoleEvent {}
  class FollowerHireEvent extends ICancellableEvent {
    days: number;
    constructor(player: Player, npc: ICustomNpc, days: number);
  }


  interface MailmanEvent extends ICancellableEvent, RoleEvent {}
  class MailmanEvent extends ICancellableEvent {
    readonly mail: IPlayerMail;
    constructor(player: Player, npc: ICustomNpc, mail: IPlayerMail);
  }


  interface TransporterUnlockedEvent extends ICancellableEvent, RoleEvent {}
  class TransporterUnlockedEvent extends ICancellableEvent {
    constructor(player: Player, npc: ICustomNpc);
  }


  interface TransporterUseEvent extends ICancellableEvent, RoleEvent {}
  class TransporterUseEvent extends ICancellableEvent {
    readonly location: ITransportLocation;
    constructor(player: Player, npc: ICustomNpc, location: ITransportLocation);
  }

}

declare module 'noppes.npcs.api.event.WorldEvent' {
  import { WorldEvent } from 'noppes.npcs.api.event';
  import { IPos, IWorld } from 'noppes.npcs.api';
  import { IEntity } from 'noppes.npcs.api.entity';

  interface ScriptTriggerEvent extends WorldEvent {}
  class ScriptTriggerEvent extends WorldEvent {
    readonly arguments: any[];
    readonly pos: IPos;
    readonly entity: IEntity;
    readonly id: number;
    constructor(id: number, level: IWorld, pos: IPos, entity: IEntity, arguments: any[]);
  }

}

declare module 'noppes.npcs.api.function.gui' {
  import { ICustomGui, IItemSlot } from 'noppes.npcs.api.gui';

  class GuiComponentClicked<T extends ICustomGuiComponent = any> {
    onClick(var1: ICustomGui, var2: T): void;
  }


  class GuiComponentUpdate<T extends ICustomGuiComponent = any> {
    onChange(var1: ICustomGui, var2: T): void;
  }


  class GuiItemSlotUpdate {
    onUpdate(var1: ICustomGui, var2: IItemSlot): void;
  }

}

declare module 'noppes.npcs.api.gui' {
  import { EntityCustomNpc } from 'noppes.npcs.entity';
  import { IPlayer, IEntity } from 'noppes.npcs.api.entity';
  import { GuiComponentUpdate, GuiComponentClicked, GuiItemSlotUpdate } from 'noppes.npcs.api.function.gui';
  import { IItemStack } from 'noppes.npcs.api.item';
  import { List, UUID } from 'java.util';
  import { Slot } from 'net.minecraft.world.inventory';
  import { Player } from 'net.minecraft.world.entity.player';

  interface DeathMenu extends MainMenuGui {}
  class DeathMenu extends MainMenuGui {
    constructor(npc: EntityCustomNpc, player: IPlayer);
  }


  interface DisplayMenu extends MainMenuGui {}
  class DisplayMenu extends MainMenuGui {
    constructor(npc: EntityCustomNpc, player: IPlayer);
  }


  interface HealthMenu extends MainMenuGui {}
  class HealthMenu extends MainMenuGui {
    constructor(npc: EntityCustomNpc, player: IPlayer);
  }


  interface IAssetsSelector extends ICustomGuiComponent {}
  class IAssetsSelector extends ICustomGuiComponent {
    get fileType(): string;
    get root(): string;
    get selected(): string;
    set fileType(var1: string);
    set root(var1: string);
    set selected(var1: string);
    setOnChange(var1: GuiComponentUpdate<IAssetsSelector>): IAssetsSelector;
    setOnPress(var1: GuiComponentClicked<IAssetsSelector>): IAssetsSelector;
  }


  interface IButton extends ICustomGuiComponent {}
  class IButton extends ICustomGuiComponent {
    get displayItem(): IItemStack;
    get label(): string;
    get texture(): string;
    get textureHoverOffset(): number;
    get textureRect(): ITexturedRect;
    get textureX(): number;
    get textureY(): number;
    hasTexture(): boolean;
    set displayItem(var1: IItemStack);
    set label(var1: string);
    set texture(var1: string);
    set textureHoverOffset(var1: number);
    set textureRect(var1: ITexturedRect);
    setOnPress(var1: GuiComponentClicked<IButton>): IButton;
    setTextureOffset(var1: number, var2: number): IButton;
  }


  interface IButtonList extends IButton {}
  class IButtonList extends IButton {
    get leftTexture(): ITexturedRect;
    get rightTexture(): ITexturedRect;
    get selected(): number;
    get values(): string[];
    set selected(var1: number);
    set values(...var1: string[]);
  }


  interface IColoredLine extends ICustomGuiComponent {}
  class IColoredLine extends ICustomGuiComponent {
    get color(): number;
    get thickness(): number;
    get xEnd(): number;
    get yEnd(): number;
    set color(var1: number);
    set thickness(var1: number);
    setEnd(var1: number, var2: number): IColoredLine;
  }


  interface IComponentsScrollableWrapper extends IComponentsWrapper {}
  class IComponentsScrollableWrapper extends IComponentsWrapper {
    init(var1: number, var2: number, var3: number, var4: number): IComponentsScrollableWrapper;
  }


  class IComponentsWrapper {
    addAssetsSelector(var1: number, var2: number, var3: number, var4: number, var5: number): IAssetsSelector;
    addButton(var1: number, var2: string, var3: number, var4: number): IButton;
    addButton(var1: number, var2: string, var3: number, var4: number, var5: number, var6: number): IButton;
    addButtonList(var1: number, var2: number, var3: number, var4: number, var5: number): IButtonList;
    addColoredLine(var1: number, var2: number, var3: number, var4: number, var5: number, var6: number, var7: number): IColoredLine;
    addComponent(var1: ICustomGuiComponent): void;
    addEntityDisplay(var1: number, var2: number, var3: number, var4: IEntity): IEntityDisplay;
    addItemRenderer(var1: number, var2: number, var3: number, var4: number, var5: number, var6: IItemStack): IItemRenderer;
    addItemSlot(var1: number, var2: number): IItemSlot;
    addItemSlot(var1: number, var2: number, var3: IItemStack): IItemSlot;
    addLabel(var1: number, var2: string, var3: number, var4: number, var5: number, var6: number): ILabel;
    addLabel(var1: number, var2: string, var3: number, var4: number, var5: number, var6: number, var7: number): ILabel;
    addScroll(var1: number, var2: number, var3: number, var4: number, var5: number, var6: string[]): IScroll;
    addSlider(var1: number, var2: number, var3: number, var4: number, var5: number, var6: string): ISlider;
    addTextArea(var1: number, var2: number, var3: number, var4: number, var5: number): ITextArea;
    addTextField(var1: number, var2: number, var3: number, var4: number, var5: number): ITextField;
    addTexturedButton(var1: number, var2: string, var3: number, var4: number, var5: number, var6: number, var7: string): IButton;
    addTexturedButton(var1: number, var2: string, var3: number, var4: number, var5: number, var6: number, var7: string, var8: number, var9: number): IButton;
    addTexturedRect(var1: number, var2: string, var3: number, var4: number, var5: number, var6: number): ITexturedRect;
    addTexturedRect(var1: number, var2: string, var3: number, var4: number, var5: number, var6: number, var7: number, var8: number): ITexturedRect;
    get components(): ICustomGuiComponent[];
    get playerSlots(): IItemSlot[];
    get slots(): IItemSlot[];
    getComponent(var1: number): ICustomGuiComponent;
    removeComponent(var1: number): void;
    removeItemSlot(var1: IItemSlot): void;
    showPlayerInventory(var1: number, var2: number): void;
    showPlayerInventory(var1: number, var2: number, var3: boolean): IItemSlot[];
  }


  interface ICustomGui extends IComponentsWrapper {}
  class ICustomGui extends IComponentsWrapper {
    close(): void;
    closeSubGui(): ICustomGui;
    get activeGui(): ICustomGui;
    get height(): number;
    get iD(): number;
    get parentGui(): ICustomGui;
    get player(): IPlayer;
    get rootGui(): ICustomGui;
    get scrollingPanel(): IComponentsScrollableWrapper;
    get subGui(): ICustomGui;
    get width(): number;
    hasSubGui(): boolean;
    openSubGui(var1: ICustomGui): void;
    setBackgroundTexture(var1: string): void;
    setDoesPauseGame(var1: boolean): void;
    setSize(var1: number, var2: number): void;
    update(): void;
    update(var1: ICustomGuiComponent): void;
  }


  class ICustomGuiComponent {
    get enabled(): boolean;
    get height(): number;
    get hoverText(): string[];
    get iD(): number;
    get posX(): number;
    get posY(): number;
    get type(): number;
    get uniqueID(): UUID;
    get visible(): boolean;
    get width(): number;
    hasHoverText(): boolean;
    set enabled(var1: boolean);
    set hoverText(var1: string);
    set iD(var1: number);
    set visible(var1: boolean);
    setHoverText(var1: string[]): ICustomGuiComponent;
    setPos(var1: number, var2: number): ICustomGuiComponent;
    setSize(var1: number, var2: number): ICustomGuiComponent;
  }


  interface IEntityDisplay extends ICustomGuiComponent {}
  class IEntityDisplay extends ICustomGuiComponent {
    get background(): boolean;
    get entity(): IEntity;
    get rotation(): number;
    get scale(): number;
    isFollowingCursor(): boolean;
    set background(var1: boolean);
    set entity(var1: IEntity);
    set rotation(var1: number);
    set scale(var1: number);
    setFollowingCursor(var1: boolean): IEntityDisplay;
  }


  interface IItemRenderer extends ICustomGuiComponent {}
  class IItemRenderer extends ICustomGuiComponent {
    get height(): number;
    get scale(): number;
    get stack(): IItemStack;
    get width(): number;
    hasStack(): boolean;
    set scale(var1: number);
    set stack(var1: IItemStack);
    setHoverBox(var1: number, var2: number): IItemRenderer;
  }


  interface IItemSlot extends ICustomGuiComponent {}
  class IItemSlot extends ICustomGuiComponent {
    get guiType(): number;
    get mCSlot(): Slot;
    get stack(): IItemStack;
    hasStack(): boolean;
    isPlayerSlot(): boolean;
    set guiType(var1: number);
    set stack(var1: IItemStack);
    setOnUpdate(var1: GuiItemSlotUpdate): IItemSlot;
  }


  interface ILabel extends ICustomGuiComponent {}
  class ILabel extends ICustomGuiComponent {
    get centered(): boolean;
    get color(): number;
    get scale(): number;
    get text(): string;
    set centered(var1: boolean);
    set color(var1: number);
    set scale(var1: number);
    set text(var1: string);
  }


  interface InventoryMenu extends MainMenuGui {}
  class InventoryMenu extends MainMenuGui {
    constructor(npc: EntityCustomNpc, player: IPlayer);
  }


  interface IScroll extends ICustomGuiComponent {}
  class IScroll extends ICustomGuiComponent {
    get defaultSelection(): number;
    get hasSearch(): boolean;
    get list(): string[];
    get selection(): number[];
    get selectionList(): string[];
    isMultiSelect(): boolean;
    set defaultSelection(var1: number);
    set hasSearch(var1: boolean);
    set list(var1: string[]);
    set selection(...var1: number[]);
    set selectionList(...var1: string[]);
    setMultiSelect(var1: boolean): IScroll;
    setOnClick(var1: GuiComponentClicked<IScroll>): IScroll;
    setOnDoubleClick(var1: GuiComponentClicked<IScroll>): IScroll;
  }


  interface ISlider extends ICustomGuiComponent {}
  class ISlider extends ICustomGuiComponent {
    get decimals(): number;
    get format(): string;
    get max(): number;
    get min(): number;
    get value(): number;
    set decimals(var1: number);
    set format(var1: string);
    set max(var1: number);
    set min(var1: number);
    set value(var1: number);
    setOnChange(var1: GuiComponentUpdate<ISlider>): ISlider;
  }


  interface ITextArea extends ITextField {}
  class ITextArea extends ITextField {
    get codeTheme(): boolean;
    set codeTheme(var1: boolean);
  }


  interface ITextField extends ICustomGuiComponent {}
  class ITextField extends ICustomGuiComponent {
    get characterType(): number;
    get color(): number;
    get float(): number;
    get focused(): boolean;
    get integer(): number;
    get text(): string;
    set characterType(var1: number);
    set color(var1: number);
    set float(var1: number);
    set focused(var1: boolean);
    set integer(var1: number);
    set text(var1: string);
    setMinMax(var1: number, var2: number): ITextField;
    setOnChange(var1: GuiComponentUpdate<ITextField>): ITextField;
    setOnFocusLost(var1: GuiComponentUpdate<ITextField>): ITextField;
  }


  interface ITexturedButton extends IButton {}
  class ITexturedButton extends IButton {
    get texture(): string;
    get textureX(): number;
    get textureY(): number;
    set texture(var1: string);
    setTextureOffset(var1: number, var2: number): ITexturedButton;
  }


  interface ITexturedRect extends ICustomGuiComponent {}
  class ITexturedRect extends ICustomGuiComponent {
    get scale(): number;
    get texture(): string;
    get textureX(): number;
    get textureY(): number;
    set scale(var1: number);
    set texture(var1: string);
    setRepeatingTexture(var1: number, var2: number, var3: number): ITexturedRect;
    setTextureOffset(var1: number, var2: number): ITexturedRect;
  }


  interface LogicMenu extends MainMenuGui {}
  class LogicMenu extends MainMenuGui {
    constructor(npc: EntityCustomNpc, player: IPlayer);
  }


  class MainMenuGui {
    constructor(active: number, npc: EntityCustomNpc, player: IPlayer);

    constructor(active: number, npc: EntityCustomNpc, player: IPlayer, renderHeader: boolean);
    static open(player: Player, npc: EntityCustomNpc): void;
  }


  interface MeleeMenu extends MainMenuGui {}
  class MeleeMenu extends MainMenuGui {
    constructor(npc: EntityCustomNpc, player: IPlayer);
  }


  interface ModelMenu extends MainMenuGui {}
  class ModelMenu extends MainMenuGui {
    constructor(npc: EntityCustomNpc, player: IPlayer);
    static open(player: Player, npc: EntityCustomNpc): void;
  }


  interface MovementMenu extends MainMenuGui {}
  class MovementMenu extends MainMenuGui {
    constructor(npc: EntityCustomNpc, player: IPlayer);
  }

}

declare module 'noppes.npcs.api.gui.subgui' {
  import { CustomGuiWrapper } from 'noppes.npcs.api.wrapper.gui';
  import { IPlayer, IEntity } from 'noppes.npcs.api.entity';
  import { SelectionCallback } from 'noppes.npcs.api.gui.subgui.AssetsGui';
  import { Availability } from 'noppes.npcs.controllers.data';
  import { SelectionCallback as noppes_npcs_api_gui_subgui_selectorgui_SelectionCallback } from 'noppes.npcs.api.gui.subgui.SelectorGui';

  class AssetsGui {
    static openCloakTexture(resource: string, player: IPlayer, entity: IEntity, callback: SelectionCallback): CustomGuiWrapper;
    static openTexture(resource: string, player: IPlayer, entity: IEntity, callback: SelectionCallback): CustomGuiWrapper;
  }


  class AvailabilityGui {
    static open(availability: Availability, player: IPlayer): CustomGuiWrapper;
    static openDialog(availability: Availability, player: IPlayer): CustomGuiWrapper;
    static openQuest(availability: Availability, player: IPlayer): CustomGuiWrapper;
    static openScoreboard(availability: Availability, player: IPlayer): CustomGuiWrapper;
  }


  class SelectorGui {
    static openDialog(id: number, player: IPlayer, callback: noppes_npcs_api_gui_subgui_selectorgui_SelectionCallback): CustomGuiWrapper;
    static openFaction(id: number, player: IPlayer, callback: noppes_npcs_api_gui_subgui_selectorgui_SelectionCallback): CustomGuiWrapper;
    static openQuest(id: number, player: IPlayer, callback: noppes_npcs_api_gui_subgui_selectorgui_SelectionCallback): CustomGuiWrapper;
  }

}

declare module 'noppes.npcs.api.gui.subgui.AssetsGui' {
  class SelectionCallback {
    call(var1: string): void;
  }

}

declare module 'noppes.npcs.api.gui.subgui.SelectorGui' {
  import { CustomGuiWrapper } from 'noppes.npcs.api.wrapper.gui';

  class SelectionCallback {
    call(var1: number): void;
  }


  class DialogSelectorGui {
    constructor(gui: CustomGuiWrapper, id: number, callback: SelectionCallback);
  }


  class QuestSelectorGui {
    constructor(gui: CustomGuiWrapper, id: number, callback: SelectionCallback);
  }

}

declare module 'noppes.npcs.api.handler.data' {
  import { IPlayer, ICustomNpc } from 'noppes.npcs.api.entity';
  import { List } from 'java.util';
  import { Provider } from 'HolderLookup';
  import { IContainer } from 'noppes.npcs.api';
  import { Component } from 'net.minecraft.network.chat';
  import { ItemStack } from 'net.minecraft.world.item';

  class IAvailability {
    get daytime(): number;
    get minPlayerLevel(): number;
    getDialog(var1: number): number;
    getQuest(var1: number): number;
    isAvailable(var1: IPlayer): boolean;
    removeDialog(var1: number): void;
    removeFaction(var1: number): void;
    removeQuest(var1: number): void;
    set daytime(var1: number);
    set minPlayerLevel(var1: number);
    setDialog(var1: number, var2: number, var3: number): void;
    setFaction(var1: number, var2: number, var3: number, var4: number): void;
    setQuest(var1: number, var2: number, var3: number): void;
    setScoreboard(var1: number, var2: string, var3: number, var4: number): void;
  }


  class IDialog {
    get availability(): IAvailability;
    get category(): IDialogCategory;
    get command(): string;
    get id(): number;
    get name(): string;
    get options(): IDialogOption[];
    get quest(): IQuest;
    get text(): string;
    getOption(var1: number): IDialogOption;
    save(var1: Provider): void;
    set command(var1: string);
    set name(var1: string);
    set quest(var1: IQuest);
    set text(var1: string);
  }


  class IDialogCategory {
    create(): IDialog;
    dialogs(): IDialog[];
    get name(): string;
  }


  class IDialogOption {
    get name(): string;
    get slot(): number;
    get type(): number;
  }


  class IFaction {
    addHostile(var1: number): void;
    get attackedByMobs(): boolean;
    get color(): number;
    get defaultPoints(): number;
    get hostileList(): number[];
    get id(): number;
    get isHidden(): boolean;
    get name(): string;
    hasHostile(var1: number): boolean;
    hostileToFaction(var1: number): boolean;
    hostileToNpc(var1: ICustomNpc): boolean;
    playerStatus(var1: IPlayer): number;
    removeHostile(var1: number): void;
    save(): void;
    set attackedByMobs(var1: boolean);
    set defaultPoints(var1: number);
    set isHidden(var1: boolean);
  }


  class IQuest {
    get category(): IQuestCategory;
    get completeText(): string;
    get id(): number;
    get isRepeatable(): boolean;
    get logText(): string;
    get name(): string;
    get nextQuest(): IQuest;
    get npcName(): string;
    get rewards(): IContainer;
    get type(): number;
    getObjectives(var1: IPlayer): IQuestObjective[];
    save(var1: Provider): void;
    set completeText(var1: string);
    set logText(var1: string);
    set name(var1: string);
    set nextQuest(var1: IQuest);
    set npcName(var1: string);
    set type(var1: number);
  }


  class IQuestCategory {
    create(): IQuest;
    get name(): string;
    quests(): IQuest[];
  }


  class IQuestObjective {
    get mCText(): Component;
    get maxProgress(): number;
    get progress(): number;
    get text(): string;
    isCompleted(): boolean;
    set progress(var1: number);
  }


  class IRecipe {
    delete(): void;
    get height(): number;
    get ignoreDamage(): boolean;
    get ignoreNBT(): boolean;
    get name(): string;
    get recipe(): ItemStack[];
    get result(): ItemStack;
    get width(): number;
    isGlobal(): boolean;
    save(): void;
    saves(var1: boolean): void;
    saves(): boolean;
    set ignoreDamage(var1: boolean);
    set ignoreNBT(var1: boolean);
    setIsGlobal(var1: boolean): void;
  }

}

declare module 'noppes.npcs.api.handler' {
  import { IEntity } from 'noppes.npcs.api.entity';
  import { IWorld } from 'noppes.npcs.api';
  import { List } from 'java.util';
  import { IDialogCategory, IDialog, IFaction, IQuestCategory, IQuest, IRecipe } from 'noppes.npcs.api.handler.data';
  import { ItemStack } from 'net.minecraft.world.item';

  class ICloneHandler {
    get(var1: number, var2: string, var3: IWorld): IEntity;
    remove(var1: number, var2: string): void;
    set(var1: number, var2: string, var3: IEntity): void;
    spawn(var1: number, var3: number, var5: number, var7: number, var8: string, var9: IWorld): IEntity;
  }


  class IDialogHandler {
    categories(): IDialogCategory[];
    get(var1: number): IDialog;
  }


  class IFactionHandler {
    create(var1: string, var2: number): IFaction;
    delete(var1: number): IFaction;
    get(var1: number): IFaction;
    list(): IFaction[];
  }


  class IQuestHandler {
    categories(): IQuestCategory[];
    get(var1: number): IQuest;
  }


  class IRecipeHandler {
    addRecipe(var1: string, var2: boolean, var3: ItemStack, ...var4: any[]): IRecipe;
    addRecipe(var1: string, var2: boolean, var3: ItemStack, var4: number, var5: number, ...var6: ItemStack[]): IRecipe;
    delete(var1: number): IRecipe;
    get carpentryList(): IRecipe[];
    get globalList(): IRecipe[];
  }

}

declare module 'noppes.npcs.api.item' {
  import { IMob } from 'noppes.npcs.api.entity';
  import { ItemStack } from 'net.minecraft.world.item';
  import { INbt } from 'noppes.npcs.api';
  import { IData } from 'noppes.npcs.api.entity.data';

  interface IItemArmor extends IItemStack {}
  class IItemArmor extends IItemStack {
    get armorMaterial(): string;
    get armorSlot(): number;
  }


  interface IItemBlock extends IItemStack {}
  class IItemBlock extends IItemStack {
    get blockName(): string;
  }


  interface IItemBook extends IItemStack {}
  class IItemBook extends IItemStack {
    get author(): string;
    get text(): string[];
    get title(): string;
    set author(var1: string);
    set text(var1: string[]);
    set title(var1: string);
  }


  interface IItemScripted extends IItemStack {}
  class IItemScripted extends IItemStack {
    get color(): number;
    get durabilityColor(): number;
    get durabilityShow(): boolean;
    get durabilityValue(): number;
    get texture(): string;
    getTexture(var1: number): string;
    hasTexture(var1: number): boolean;
    set color(var1: number);
    set durabilityColor(var1: number);
    set durabilityShow(var1: boolean);
    set durabilityValue(var1: number);
    set texture(var1: string);
    setMaxStackSize(var1: number): void;
    setTexture(var1: number, var2: string): void;
  }


  class IItemStack {
    addEnchantment(var1: string, var2: number): void;
    compare(var1: IItemStack, var2: boolean): boolean;
    copy(): IItemStack;
    damageItem(var1: number, var2: IMob): void;
    get attackDamage(): number;
    get damage(): number;
    get displayName(): string;
    get foodLevel(): number;
    get itemName(): string;
    get itemNbt(): INbt;
    get lore(): string[];
    get mCItemStack(): ItemStack;
    get maxDamage(): number;
    get maxStackSize(): number;
    get name(): string;
    get nbt(): INbt;
    get stackSize(): number;
    get storeddata(): IData;
    get tempdata(): IData;
    get type(): number;
    getAttribute(var1: string): number;
    hasAttribute(var1: string): boolean;
    hasCustomName(): boolean;
    hasEnchant(var1: string): boolean;
    hasNbt(): boolean;
    isBlock(): boolean;
    isBook(): boolean;
    isDamageable(): boolean;
    isEmpty(): boolean;
    isEnchanted(): boolean;
    isWearable(): boolean;
    removeEnchant(var1: string): boolean;
    removeNbt(): void;
    set damage(var1: number);
    set lore(var1: string[]);
    set stackSize(var1: number);
    setAttribute(var1: string, var2: number): void;
    setAttribute(var1: string, var2: number, var4: number): void;
    setCustomName(var1: string): void;
  }

}

declare module 'noppes.npcs.api.overlay' {
  import { IItemStack } from 'noppes.npcs.api.item';
  import { Collection } from 'java.util';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface ILabel extends IOverlayComponent {}
  class ILabel extends IOverlayComponent {
    get scale(): number;
    get text(): string;
    isCentered(): boolean;
    set scale(var1: number);
    set text(var1: string);
    setCentered(var1: boolean): ILabel;
  }


  class IOverlay {
    addLabel(var1: number, var2: string, var3: number, var4: number): ILabel;
    addRenderItem(var1: number, var2: number, var3: number, var4: IItemStack): IRenderItemOverlay;
    addTexturedRect(var1: number, var2: string, var3: number, var4: number, var5: number, var6: number): ITexturedRect;
    addTexturedRectCrop(var1: number, var2: string, var3: number, var4: number, var5: number, var6: number, var7: number, var8: number): ITexturedRect;
    addTexturedRectCrop(var1: number, var2: string, var3: number, var4: number, var5: number, var6: number, var7: number, var8: number, var9: number, var10: number): ITexturedRect;
    clear(): void;
    fromNbt(var1: CompoundTag): void;
    get components(): Collection<IOverlayComponent>;
    get id(): number;
    get linkSide(): number;
    getComponent(var1: number): IOverlayComponent;
    removeComponent(var1: number): void;
    set linkSide(var1: number);
    toNbt(): CompoundTag;
  }


  class IOverlayComponent {
    fromNbt(var1: CompoundTag): void;
    get id(): number;
    get posX(): number;
    get posY(): number;
    get type(): number;
    setPos(var1: number, var2: number): IOverlayComponent;
    toNbt(var1: CompoundTag): void;
  }


  interface IRenderItemOverlay extends IOverlayComponent {}
  class IRenderItemOverlay extends IOverlayComponent {
    get item(): IItemStack;
    set item(var1: IItemStack);
  }


  interface ITexturedRect extends IOverlayComponent {}
  class ITexturedRect extends IOverlayComponent {
    get height(): number;
    get rGB(): number[];
    get texture(): string;
    get textureMaxX(): number;
    get textureMaxY(): number;
    get textureX(): number;
    get textureY(): number;
    get uV(): number[];
    get width(): number;
    set height(var1: number);
    set texture(var1: string);
    set width(var1: number);
    setRGB(var1: number, var2: number, var3: number, var4: number): ITexturedRect;
    setTextureMaxSize(var1: number, var2: number): ITexturedRect;
    setTextureOffset(var1: number, var2: number): ITexturedRect;
    setUV(var1: number, var2: number, var3: number, var4: number): ITexturedRect;
  }

}

declare module 'noppes.npcs.api.wrapper' {
  import { IAnimal, IArrow, IEntity, IEntityItem, IEntityLiving, IMob, IMonster, ICustomNpc, IPlayer, IProjectile, IPixelmon, IThrowable, IVillager } from 'noppes.npcs.api.entity';
  import { IPos, ITimers, IContainer, IWorld, INbt, IDamageSource, IDimension, IRayTrace, IPlayerSkin, IScoreboardObjective, IScoreboardScore, IScoreboardTeam, IScoreboard, NpcAPI } from 'noppes.npcs.api';
  import { BlockPos } from 'net.minecraft.core';
  import { IBlockScriptedDoor, IBlockScripted, ITextPlane, IBlock } from 'noppes.npcs.api.block';
  import { Level } from 'net.minecraft.world.level';
  import { Block } from 'net.minecraft.world.level.block';
  import { IItemStack, IItemArmor, IItemBlock, IItemBook, IItemScripted } from 'noppes.npcs.api.item';
  import { IData, IMark, INPCDisplay, INPCInventory, INPCAi, INPCAdvanced, INPCStats, INPCRole, INPCJob, IPixelmonPlayerData, IPlayerMail } from 'noppes.npcs.api.entity.data';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { Container } from 'net.minecraft.world';
  import { AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { DimensionType } from 'net.minecraft.world.level.dimension';
  import { IScriptHandler, ScriptContainer } from 'noppes.npcs.controllers';
  import { List, Map, Collection } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { CompoundTag, Tag } from 'net.minecraft.nbt';
  import { EnumScriptType } from 'noppes.npcs.constants';
  import { Event, IEventBus } from 'net.neoforged.bus.api';
  import { Long, Class } from 'java.lang';
  import { IFaction, IDialog, IQuest } from 'noppes.npcs.api.handler.data';
  import { IOverlayComponent, ILabel, IRenderItemOverlay, ITexturedRect, IOverlay } from 'noppes.npcs.api.overlay';
  import { ICustomGui } from 'noppes.npcs.api.gui';
  import { ScoreAccess, PlayerScoreEntry } from 'net.minecraft.world.scores';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { Entity } from 'net.minecraft.world.entity';
  import { Predicate } from 'java.util.function';
  import { IFactionHandler, IRecipeHandler, IQuestHandler, IDialogHandler, ICloneHandler } from 'noppes.npcs.api.handler';
  import { File } from 'java.io';

  interface AnimalWrapper<T extends Animal = any> extends IAnimal, EntityLivingWrapper<T> {}
  class AnimalWrapper<T extends Animal = any> extends IAnimal {
    constructor(entity: T);
    get type(): number;
    typeOf(type: number): boolean;
  }


  interface ArrowWrapper<T extends AbstractArrow = any> extends IArrow, EntityWrapper<T> {}
  class ArrowWrapper<T extends AbstractArrow = any> extends IArrow {
    constructor(entity: T);
    get type(): number;
    typeOf(type: number): boolean;
  }


  interface BlockPosWrapper extends IPos {}
  class BlockPosWrapper extends IPos {
    static readonly ZERO: BlockPosWrapper;
    constructor(pos: BlockPos);
    add(x: number, y: number, z: number): IPos;
    add(pos: IPos): IPos;
    distanceTo(pos: IPos): number;
    down(): IPos;
    down(n: number): IPos;
    east(): IPos;
    east(n: number): IPos;
    get mCBlockPos(): BlockPos;
    get x(): number;
    get y(): number;
    get z(): number;
    normalize(): number[];
    north(): IPos;
    north(n: number): IPos;
    offset(direction: number): IPos;
    offset(direction: number, n: number): IPos;
    south(): IPos;
    south(n: number): IPos;
    subtract(x: number, y: number, z: number): IPos;
    subtract(pos: IPos): IPos;
    up(): IPos;
    up(n: number): IPos;
    west(): IPos;
    west(n: number): IPos;
  }


  interface BlockScriptedDoorWrapper extends IBlockScriptedDoor, BlockWrapper {}
  class BlockScriptedDoorWrapper extends IBlockScriptedDoor {
    constructor(level: Level, block: Block, pos: BlockPos);
    executeCommand(command: string): string;
    get blockModel(): string;
    get hardness(): number;
    get open(): boolean;
    get resistance(): number;
    get timers(): ITimers;
    set blockModel(name: string);
    set hardness(hardness: number);
    set open(open: boolean);
    set resistance(resistance: number);
  }


  interface BlockScriptedWrapper extends IBlockScripted, BlockWrapper {}
  class BlockScriptedWrapper extends IBlockScripted {
    constructor(level: Level, block: Block, pos: BlockPos);
    executeCommand(command: string): string;
    get hardness(): number;
    get isLadder(): boolean;
    get isPassible(): boolean;
    get light(): number;
    get model(): IItemStack;
    get redstonePower(): number;
    get resistance(): number;
    get rotationX(): number;
    get rotationY(): number;
    get rotationZ(): number;
    get scaleX(): number;
    get scaleY(): number;
    get scaleZ(): number;
    get textPlane(): ITextPlane;
    get textPlane2(): ITextPlane;
    get textPlane3(): ITextPlane;
    get textPlane4(): ITextPlane;
    get textPlane5(): ITextPlane;
    get textPlane6(): ITextPlane;
    get timers(): ITimers;
    set hardness(hardness: number);
    set isLadder(bo: boolean);
    set isPassible(bo: boolean);
    set light(value: number);
    set model(item: IItemStack);
    set redstonePower(strength: number);
    set resistance(resistance: number);
    setModel(name: string): void;
    setRotation(x: number, y: number, z: number): void;
    setScale(x: number, y: number, z: number): void;
    trigger(id: number, ...arguments: any[]): void;
  }


  interface BlockWrapper extends IBlock {}
  class BlockWrapper extends IBlock {
    blockEvent(type: number, data: number): void;
    static clearCache(): void;
    static createNew(level: Level, pos: BlockPos, state: BlockState): IBlock;
    get blockEntityNBT(): INbt;
    get container(): IContainer;
    get displayName(): string;
    get mCBlock(): Block;
    get mCBlockState(): BlockState;
    get mCTileEntity(): BlockEntity;
    get name(): string;
    get pos(): IPos;
    get properties(): string[];
    get storeddata(): IData;
    get tempdata(): IData;
    get world(): IWorld;
    get x(): number;
    get y(): number;
    get z(): number;
    getProperty(name: string): any;
    hasTileEntity(): boolean;
    interact(side: number): void;
    isAir(): boolean;
    isContainer(): boolean;
    isRemoved(): boolean;
    remove(): void;
    setBlock(name: string): BlockWrapper;
    setBlock(block: IBlock): BlockWrapper;
    setProperty(name: string, val: any): void;
    setTileEntityNBT(nbt: INbt): void;
  }


  interface ContainerWrapper extends IContainer {}
  class ContainerWrapper extends IContainer {
    constructor(inventory: Container);

    constructor(container: AbstractContainerMenu);
    count(item: IItemStack, ignoreDamage: boolean, ignoreNBT: boolean): number;
    get items(): IItemStack[];
    get mCContainer(): AbstractContainerMenu;
    get mCInventory(): Container;
    get size(): number;
    getSlot(slot: number): IItemStack;
    setSlot(slot: number, item: IItemStack): void;
  }


  interface DamageSourceWrapper extends IDamageSource {}
  class DamageSourceWrapper extends IDamageSource {
    constructor(source: DamageSource);
    get immediateSource(): IEntity;
    get mCDamageSource(): DamageSource;
    get trueSource(): IEntity;
    get type(): string;
    isProjectile(): boolean;
    isUnblockable(): boolean;
  }


  interface DimensionWrapper extends IDimension {}
  class DimensionWrapper extends IDimension {
    constructor(id: ResourceLocation, type: DimensionType);
    get id(): string;
  }


  interface EntityItemWrapper<T extends ItemEntity = any> extends IEntityItem, EntityWrapper<T> {}
  class EntityItemWrapper<T extends ItemEntity = any> extends IEntityItem {
    constructor(entity: T);
    get age(): number;
    get item(): IItemStack;
    get owner(): string;
    get pickupDelay(): number;
    get type(): number;
    set age(age: number);
    set item(item: IItemStack);
    set owner(name: string);
    set pickupDelay(delay: number);
  }


  interface EntityLivingBaseWrapper<T extends LivingEntity = any> extends IEntityLiving, EntityWrapper<T> {}
  class EntityLivingBaseWrapper<T extends LivingEntity = any> extends IEntityLiving {
    constructor(entity: T);
    addMark(type: number): IMark;
    addPotionEffect(effect: number, duration: number, strength: number, hideParticles: boolean): void;
    canSeeEntity(entity: IEntity): boolean;
    clearPotionEffects(): void;
    get attackTarget(): IEntityLiving;
    get health(): number;
    get lastAttacked(): IEntityLiving;
    get lastAttackedTime(): number;
    get mainhandItem(): IItemStack;
    get marks(): IMark[];
    get maxHealth(): number;
    get moveForward(): number;
    get moveStrafing(): number;
    get moveVertical(): number;
    get offhandItem(): IItemStack;
    get rotation(): number;
    get type(): number;
    getArmor(slot: number): IItemStack;
    getPotionEffect(effect: number): number;
    isAttacking(): boolean;
    isChild(): boolean;
    removeMark(mark: IMark): void;
    set attackTarget(living: IEntityLiving);
    set health(health: number);
    set mainhandItem(item: IItemStack);
    set maxHealth(health: number);
    set moveForward(move: number);
    set moveStrafing(move: number);
    set moveVertical(move: number);
    set offhandItem(item: IItemStack);
    set rotation(rotation: number);
    setArmor(slot: number, item: IItemStack): void;
    swingMainhand(): void;
    swingOffhand(): void;
    typeOf(type: number): boolean;
  }


  interface EntityLivingWrapper<T extends Mob = any> extends IMob, EntityLivingBaseWrapper<T> {}
  class EntityLivingWrapper<T extends Mob = any> extends IMob {
    constructor(entity: T);
    canSeeEntity(entity: IEntity): boolean;
    clearNavigation(): void;
    get attackTarget(): IEntityLiving;
    get navigationPath(): IPos;
    isAttacking(): boolean;
    isNavigating(): boolean;
    jump(): void;
    navigateTo(x: number, y: number, z: number, speed: number): void;
    set attackTarget(living: IEntityLiving);
  }


  interface EntityWrapper<T extends Entity = any> extends IEntity {}
  class EntityWrapper<T extends Entity = any> extends IEntity {
    constructor(entity: T);
    addRider(entity: IEntity): void;
    addTag(tag: string): void;
    clearRiders(): void;
    damage(amount: number): void;
    damage(damage: number, source: IEntity): void;
    despawn(): void;
    dropItem(item: IItemStack): IEntityItem;
    extinguish(): void;
    generateNewUUID(): string;
    get age(): number;
    get allRiders(): IEntity[];
    get blockX(): number;
    get blockY(): number;
    get blockZ(): number;
    get entityName(): string;
    get entityNbt(): INbt;
    get eyeHeight(): number;
    get height(): number;
    get mCEntity(): T;
    get motionX(): number;
    get motionY(): number;
    get motionZ(): number;
    get mount(): IEntity;
    get name(): string;
    get nbt(): INbt;
    get pitch(): number;
    get pos(): IPos;
    get riders(): IEntity[];
    get rotation(): number;
    get storeddata(): IData;
    get tags(): string[];
    get tempdata(): IData;
    get type(): number;
    get typeName(): string;
    get uUID(): string;
    get width(): number;
    get world(): IWorld;
    get x(): number;
    get y(): number;
    get z(): number;
    hasCustomName(): boolean;
    hasTag(tag: string): boolean;
    inFire(): boolean;
    inLava(): boolean;
    inWater(): boolean;
    isAlive(): boolean;
    isBurning(): boolean;
    isSneaking(): boolean;
    isSprinting(): boolean;
    kill(): void;
    knockback(power: number, direction: number): void;
    playAnimation(type: number): void;
    rayTraceBlock(distance: number, stopOnLiquid: boolean, ignoreBlockWithoutBoundingBox: boolean): IRayTrace;
    rayTraceEntities(distance: number, stopOnLiquid: boolean, ignoreBlockWithoutBoundingBox: boolean): IEntity[];
    removeTag(tag: string): void;
    set entityNbt(nbt: INbt);
    set motionX(motion: number);
    set motionY(motion: number);
    set motionZ(motion: number);
    set mount(entity: IEntity);
    set name(name: string);
    set pitch(rotation: number);
    set pos(pos: IPos);
    set rotation(rotation: number);
    set x(x: number);
    set y(y: number);
    set z(z: number);
    setBurning(ticks: number): void;
    setPosition(x: number, y: number, z: number): void;
    spawn(): void;
    storeAsClone(tab: number, name: string): void;
    typeOf(type: number): boolean;
  }


  interface ItemArmorWrapper extends IItemArmor, ItemStackWrapper {}
  class ItemArmorWrapper extends IItemArmor {
    get armorMaterial(): string;
    get armorSlot(): number;
    get type(): number;
  }


  interface ItemBlockWrapper extends IItemBlock, ItemStackWrapper {}
  class ItemBlockWrapper extends IItemBlock {
    get blockName(): string;
    get type(): number;
  }


  interface ItemBookWrapper extends IItemBook, ItemStackWrapper {}
  class ItemBookWrapper extends IItemBook {
    get author(): string;
    get text(): string[];
    get title(): string;
    get type(): number;
    isBook(): boolean;
    set author(author: string);
    set text(pages: string[]);
    set title(title: string);
  }


  interface ItemScriptedWrapper extends IItemScripted, IScriptHandler, ItemStackWrapper {}
  class ItemScriptedWrapper extends IItemScripted {
    scripts: List;
    scriptLanguage: string;
    enabled: boolean;
    lastInited: number;
    updateClient: boolean;
    durabilityShow: boolean;
    durabilityValue: number;
    durabilityColor: number;
    itemColor: number;
    stackSize: number;
    loaded: boolean;
    texture: ResourceLocation;
    constructor(item: ItemStack);
    clearConsole(): void;
    get color(): number;
    get consoleText(): Map<Long, string>;
    get durabilityColor(): number;
    get durabilityShow(): boolean;
    get durabilityValue(): number;
    get enabled(): boolean;
    get language(): string;
    get mCNbt(): CompoundTag;
    get maxStackSize(): number;
    get scripts(): ScriptContainer[];
    get texture(): string;
    get type(): number;
    getScriptNBT(compound: CompoundTag): CompoundTag;
    getTexture(damage: number): string;
    hasTexture(damage: number): boolean;
    isClient(): boolean;
    loadScriptData(): void;
    noticeString(): string;
    runScript(type: EnumScriptType, event: Event): void;
    saveScriptData(): void;
    set color(color: number);
    set durabilityColor(color: number);
    set durabilityShow(bo: boolean);
    set durabilityValue(value: number);
    set enabled(bo: boolean);
    set language(lang: string);
    set mCNbt(compound: CompoundTag);
    set maxStackSize(size: number);
    set texture(texture: string);
    setScriptNBT(compound: CompoundTag): void;
    setTexture(damage: number, texture: string): void;
  }


  interface ItemStackWrapper extends IItemStack {}
  class ItemStackWrapper extends IItemStack {
    item: ItemStack;
    static AIR: ItemStackWrapper;
    constructor(item: ItemStack);
    static MCItem(item: IItemStack): ItemStack;
    addEnchantment(id: string, strenght: number): void;
    compare(item: IItemStack, ignoreNBT: boolean): boolean;
    copy(): IItemStack;
    damageItem(damage: number, living: IMob): void;
    deserializeNBT(nbt: CompoundTag): void;
    get attackDamage(): number;
    get damage(): number;
    get displayName(): string;
    get foodLevel(): number;
    get itemDamage(): number;
    get itemName(): string;
    get itemNbt(): INbt;
    get lore(): string[];
    get mCItemStack(): ItemStack;
    get mCNbt(): CompoundTag;
    get maxDamage(): number;
    get maxStackSize(): number;
    get name(): string;
    get nbt(): INbt;
    get stackSize(): number;
    get storeddata(): IData;
    get tempdata(): IData;
    get type(): number;
    getAttribute(name: string): number;
    hasAttribute(name: string): boolean;
    hasCustomName(): boolean;
    hasEnchant(id: string): boolean;
    hasNbt(): boolean;
    isBlock(): boolean;
    isBook(): boolean;
    isDamageable(): boolean;
    isEmpty(): boolean;
    isEnchanted(): boolean;
    isWearable(): boolean;
    removeEnchant(id: string): boolean;
    removeNbt(): void;
    serializeNBT(): CompoundTag;
    set damage(value: number);
    set itemDamage(value: number);
    set lore(lore: string[]);
    set mCNbt(compound: CompoundTag);
    set stackSize(size: number);
    setAttribute(name: string, value: number): void;
    setAttribute(name: string, value: number, slot: number): void;
    setCustomName(name: string): void;
  }


  interface MonsterWrapper<T extends Monster = any> extends IMonster, EntityLivingWrapper<T> {}
  class MonsterWrapper<T extends Monster = any> extends IMonster {
    constructor(entity: T);
    get type(): number;
    typeOf(type: number): boolean;
  }


  interface NBTWrapper extends INbt {}
  class NBTWrapper extends INbt {
    constructor(compound: CompoundTag);
    clear(): void;
    get keys(): string[];
    get mCNBT(): CompoundTag;
    getBoolean(key: string): boolean;
    getByte(key: string): number;
    getByteArray(key: string): number[];
    getCompound(key: string): INbt;
    getDouble(key: string): number;
    getFloat(key: string): number;
    getInteger(key: string): number;
    getIntegerArray(key: string): number[];
    getList(key: string, type: number): any[];
    getListType(key: string): number;
    getLong(key: string): number;
    getShort(key: string): number;
    getString(key: string): string;
    getType(key: string): number;
    has(key: string): boolean;
    isEmpty(): boolean;
    isEqual(nbt: INbt): boolean;
    mcGetTag(key: string): Tag;
    mcSetTag(key: string, base: Tag): void;
    merge(nbt: INbt): void;
    putString(key: string, value: string): void;
    remove(key: string): void;
    setBoolean(key: string, value: boolean): void;
    setByte(key: string, value: number): void;
    setByteArray(key: string, value: number[]): void;
    setCompound(key: string, value: INbt): void;
    setDouble(key: string, value: number): void;
    setFloat(key: string, value: number): void;
    setInteger(key: string, value: number): void;
    setIntegerArray(key: string, value: number[]): void;
    setList(key: string, value: any[]): void;
    setLong(key: string, value: number): void;
    setShort(key: string, value: number): void;
    toJsonString(): string;
  }


  interface NPCWrapper<T extends EntityNPCInterface = any> extends ICustomNpc, EntityLivingWrapper<T> {}
  class NPCWrapper<T extends EntityNPCInterface = any> extends ICustomNpc {
    constructor(npc: T);
    executeCommand(command: string): string;
    get advanced(): INPCAdvanced;
    get age(): number;
    get ai(): INPCAi;
    get display(): INPCDisplay;
    get faction(): IFaction;
    get homeX(): number;
    get homeY(): number;
    get homeZ(): number;
    get inventory(): INPCInventory;
    get job(): INPCJob;
    get name(): string;
    get offsetX(): number;
    get offsetY(): number;
    get offsetZ(): number;
    get owner(): IEntityLiving;
    get role(): INPCRole;
    get stats(): INPCStats;
    get timers(): ITimers;
    get type(): number;
    getDialog(slot: number): IDialog;
    giveItem(player: IPlayer, item: IItemStack): void;
    reset(): void;
    say(message: string): void;
    sayTo(player: IPlayer, message: string): void;
    set faction(id: number);
    set name(name: string);
    setDialog(slot: number, dialog: IDialog): void;
    setHome(x: number, y: number, z: number): void;
    setMaxHealth(health: number): void;
    setOffset(x: number, y: number, z: number): void;
    setRotation(rotation: number): void;
    shootItem(target: IEntityLiving, item: IItemStack, accuracy: number): IProjectile;
    shootItem(x: number, y: number, z: number, item: IItemStack, accuracy: number): IProjectile;
    trigger(id: number, ...arguments: any[]): void;
    typeOf(type: number): boolean;
    updateClient(): void;
  }


  interface OverlayComponentWrapper extends IOverlayComponent {}
  class OverlayComponentWrapper extends IOverlayComponent {
    constructor(id: number, x: number, y: number);
    fromNbt(compound: CompoundTag): void;
    get id(): number;
    get posX(): number;
    get posY(): number;
    setPos(x: number, y: number): IOverlayComponent;
    toNbt(compound: CompoundTag): void;
  }


  interface OverlayLabelWrapper extends ILabel, OverlayComponentWrapper {}
  class OverlayLabelWrapper extends ILabel {
    constructor(id: number, x: number, y: number, text: string);
    fromNbt(compound: CompoundTag): void;
    get scale(): number;
    get text(): string;
    get type(): number;
    isCentered(): boolean;
    set scale(scale: number);
    set text(text: string);
    setCentered(centered: boolean): ILabel;
    toNbt(compound: CompoundTag): void;
  }


  interface OverlayRenderItemWrapper extends IRenderItemOverlay, OverlayComponentWrapper {}
  class OverlayRenderItemWrapper extends IRenderItemOverlay {
    constructor(id: number, x: number, y: number, item: IItemStack);
    fromNbt(compound: CompoundTag): void;
    get item(): IItemStack;
    get type(): number;
    set item(item: IItemStack);
    toNbt(compound: CompoundTag): void;
  }


  interface OverlayTexturedRectWrapper extends ITexturedRect, OverlayComponentWrapper {}
  class OverlayTexturedRectWrapper extends ITexturedRect {
    constructor(id: number, x: number, y: number, texture: string, width: number, height: number);

    constructor(id: number, x: number, y: number, texture: string, width: number, height: number, textureX: number, textureY: number);

    constructor(id: number, x: number, y: number, texture: string, width: number, height: number, textureX: number, textureY: number, textureMaxX: number, textureMaxY: number);
    fromNbt(compound: CompoundTag): void;
    get height(): number;
    get rGB(): number[];
    get texture(): string;
    get textureMaxX(): number;
    get textureMaxY(): number;
    get textureX(): number;
    get textureY(): number;
    get type(): number;
    get uV(): number[];
    get width(): number;
    set height(height: number);
    set texture(texture: string);
    set width(width: number);
    setRGB(r: number, g: number, b: number, a: number): ITexturedRect;
    setTextureMaxSize(textureMaxX: number, textureMaxY: number): ITexturedRect;
    setTextureOffset(offsetX: number, offsetY: number): ITexturedRect;
    setUV(x1: number, y1: number, x2: number, y2: number): ITexturedRect;
    toNbt(compound: CompoundTag): void;
  }


  interface OverlayWrapper extends IOverlay {}
  class OverlayWrapper extends IOverlay {
    constructor(id: number);
    addLabel(id: number, text: string, x: number, y: number): ILabel;
    addRenderItem(id: number, x: number, y: number, item: IItemStack): IRenderItemOverlay;
    addTexturedRect(id: number, texture: string, x: number, y: number, width: number, height: number): ITexturedRect;
    addTexturedRectCrop(id: number, texture: string, x: number, y: number, width: number, height: number, textureX: number, textureY: number): ITexturedRect;
    addTexturedRectCrop(id: number, texture: string, x: number, y: number, width: number, height: number, textureX: number, textureY: number, textureMaxX: number, textureMaxY: number): ITexturedRect;
    clear(): void;
    fromNbt(tagCompound: CompoundTag): void;
    get components(): Collection<IOverlayComponent>;
    get id(): number;
    get linkSide(): number;
    getComponent(id: number): IOverlayComponent;
    removeComponent(id: number): void;
    set linkSide(side: number);
    toNbt(): CompoundTag;
  }


  interface PixelmonWrapper<T extends AbstractHorse = any> extends IPixelmon, AnimalWrapper<T> {}
  class PixelmonWrapper<T extends AbstractHorse = any> extends IPixelmon {
    constructor(entity: T);
    get pokemonData(): any;
    get type(): number;
    typeOf(type: number): boolean;
  }


  interface PlayerWrapper<T extends ServerPlayer = any> extends IPlayer, EntityLivingBaseWrapper<T> {}
  class PlayerWrapper<T extends ServerPlayer = any> extends IPlayer {
    constructor(player: T);
    addDialog(id: number): void;
    addFactionPoints(faction: number, points: number): void;
    canQuestBeAccepted(questId: number): boolean;
    clearData(): void;
    closeGui(): void;
    factionStatus(factionId: number): number;
    finishQuest(id: number): void;
    get activeQuests(): IQuest[];
    get customGui(): ICustomGui;
    get displayName(): string;
    get expLevel(): number;
    get finishedQuests(): IQuest[];
    get gamemode(): number;
    get hunger(): number;
    get inventory(): IContainer;
    get inventoryHeldItem(): IItemStack;
    get name(): string;
    get openContainer(): IContainer;
    get pC(): any;
    get party(): any;
    get pixelmonData(): IPixelmonPlayerData;
    get rotation(): number;
    get skin(): IPlayerSkin;
    get spawnPoint(): IBlock;
    get storeddata(): IData;
    get timers(): ITimers;
    get type(): number;
    getFactionPoints(faction: number): number;
    giveItem(item: IItemStack): boolean;
    giveItem(id: string, amount: number): boolean;
    hasActiveQuest(id: number): boolean;
    hasAdvancement(achievement: string): boolean;
    hasFinishedQuest(id: number): boolean;
    hasPermission(permission: string): boolean;
    hasReadDialog(id: number): boolean;
    hideAllOverlays(): void;
    hideOverlay(id: number): void;
    inventoryItemCount(item: IItemStack): number;
    inventoryItemCount(id: string): number;
    kick(message: string): void;
    message(message: string): void;
    playMusic(sound: string, background: boolean, loops: boolean): void;
    playSound(sound: string, volume: number, pitch: number): void;
    removeAllItems(item: IItemStack): void;
    removeDialog(id: number): void;
    removeItem(item: IItemStack, amount: number): boolean;
    removeItem(id: string, amount: number): boolean;
    removeQuest(id: number): void;
    resetSpawnpoint(): void;
    sendMail(mail: IPlayerMail): void;
    sendNotification(title: string, msg: string, type: number): void;
    set expLevel(level: number);
    set gamemode(type: number);
    set hunger(level: number);
    set rotation(rotation: number);
    set spawnPoint(block: IBlock);
    setPos(pos: IPos): void;
    setPosition(x: number, y: number, z: number): void;
    setSpawnpoint(x: number, y: number, z: number): void;
    showCustomGui(gui: ICustomGui): void;
    showDialog(id: number, name: string): void;
    showOverlay(overlay: IOverlay): void;
    showSoundSelectionGUI(): void;
    startQuest(id: number): void;
    stopQuest(id: number): void;
    trigger(id: number, ...arguments: any[]): void;
    typeOf(type: number): boolean;
    updatePlayerInventory(): void;
  }


  interface ProjectileWrapper<T extends EntityProjectile = any> extends IProjectile, ThrowableWrapper<T> {}
  class ProjectileWrapper<T extends EntityProjectile = any> extends IProjectile {
    constructor(entity: T);
    enableEvents(): void;
    get accuracy(): number;
    get hasGravity(): boolean;
    get item(): IItemStack;
    get type(): number;
    set accuracy(accuracy: number);
    set hasGravity(bo: boolean);
    set item(item: IItemStack);
    setHeading(entity: IEntity): void;
    setHeading(x: number, y: number, z: number): void;
    setHeading(yaw: number, pitch: number): void;
    typeOf(type: number): boolean;
  }


  interface RayTraceWrapper extends IRayTrace {}
  class RayTraceWrapper extends IRayTrace {
    constructor(block: IBlock, sideHit: number);
    get block(): IBlock;
    get pos(): IPos;
    get sideHit(): number;
  }


  interface ScoreboardObjectiveWrapper extends IScoreboardObjective {}
  class ScoreboardObjectiveWrapper extends IScoreboardObjective {
    createScore(player: string): IScoreboardScore;
    get criteria(): string;
    get displayName(): string;
    get name(): string;
    get scores(): IScoreboardScore[];
    getScore(player: string): IScoreboardScore;
    hasScore(player: string): boolean;
    isReadyOnly(): boolean;
    removeScore(player: string): void;
    set displayName(name: string);
  }


  interface ScoreboardScoreWrapper extends IScoreboardScore {}
  class ScoreboardScoreWrapper extends IScoreboardScore {
    constructor(score: ScoreAccess);

    constructor(entry: PlayerScoreEntry);
    get playerName(): string;
    get value(): number;
    set value(val: number);
  }


  interface ScoreboardTeamWrapper extends IScoreboardTeam {}
  class ScoreboardTeamWrapper extends IScoreboardTeam {
    addPlayer(player: string): void;
    clearPlayers(): void;
    get color(): string;
    get displayName(): string;
    get friendlyFire(): boolean;
    get name(): string;
    get players(): string[];
    get seeInvisibleTeamPlayers(): boolean;
    hasPlayer(player: string): boolean;
    removePlayer(player: string): void;
    set color(color: string);
    set displayName(name: string);
    set friendlyFire(bo: boolean);
    set seeInvisibleTeamPlayers(bo: boolean);
  }


  interface ScoreboardWrapper extends IScoreboard {}
  class ScoreboardWrapper extends IScoreboard {
    addObjective(objective: string, criteria: string): IScoreboardObjective;
    addTeam(name: string): IScoreboardTeam;
    deletePlayerScore(player: string, objective: string): void;
    get objectives(): IScoreboardObjective[];
    get playerList(): string[];
    get teams(): IScoreboardTeam[];
    getObjective(name: string): IScoreboardObjective;
    getPlayerScore(player: string, objective: string): number;
    getPlayerTeam(player: string): IScoreboardTeam;
    getTeam(name: string): IScoreboardTeam;
    hasObjective(objective: string): boolean;
    hasPlayerObjective(player: string, objective: string): boolean;
    hasTeam(name: string): boolean;
    removeObjective(objective: string): void;
    removePlayerTeam(player: string): void;
    removeTeam(name: string): void;
    setPlayerScore(player: string, objective: string, score: number): void;
  }


  interface ThrowableWrapper<T extends ThrowableProjectile = any> extends IThrowable, EntityWrapper<T> {}
  class ThrowableWrapper<T extends ThrowableProjectile = any> extends IThrowable {
    constructor(entity: T);
    get type(): number;
    typeOf(type: number): boolean;
  }


  interface VillagerWrapper<T extends Villager = any> extends IVillager, EntityLivingWrapper<T> {}
  class VillagerWrapper<T extends Villager = any> extends IVillager {
    constructor(entity: T);
    VillagerType(): string;
    get profession(): string;
    get type(): number;
    typeOf(type: number): boolean;
  }


  interface WorldWrapper extends IWorld {}
  class WorldWrapper extends IWorld {
    static tempData: Map;
    level: ServerLevel;
    dimension: IDimension;
    broadcast(message: string): void;
    createEntity(id: string): IEntity;
    createEntityFromNBT(nbt: INbt): IEntity;
    createItem(name: string, size: number): IItemStack;
    createItemFromNbt(nbt: INbt): IItemStack;
    static createNew(level: ServerLevel): WorldWrapper;
    explode(x: number, y: number, z: number, range: number, fire: boolean, grief: boolean): void;
    get allPlayers(): IPlayer[];
    get dimension(): IDimension;
    get mCLevel(): ServerLevel;
    get name(): string;
    get scoreboard(): IScoreboard;
    get spawnPoint(): IBlock;
    get storeddata(): IData;
    get tempdata(): IData;
    get time(): number;
    get totalTime(): number;
    getAllEntities(type: number): IEntity[];
    getBiomeName(x: number, z: number): string;
    getBlock(x: number, y: number, z: number): IBlock;
    getBlock(pos: IPos): IBlock;
    getClone(tab: number, name: string): IEntity;
    getClosestEntity(x: number, y: number, z: number, range: number, type: number): IEntity;
    getClosestEntity(pos: IPos, range: number, type: number): IEntity;
    getEntities(entityTypeIn: Class<any>, predicateIn: Predicate<Entity>): Entity[];
    getEntity(uuid: string): IEntity;
    getLightValue(x: number, y: number, z: number): number;
    getMCBlockPos(x: number, y: number, z: number): BlockPos;
    getNearbyEntities(x: number, y: number, z: number, range: number, type: number): IEntity[];
    getNearbyEntities(pos: IPos, range: number, type: number): IEntity[];
    getPlayer(name: string): IPlayer;
    getRedstonePower(x: number, y: number, z: number): number;
    isChunkLoaded(x: number, z: number): boolean;
    isDay(): boolean;
    isRaining(): boolean;
    playSoundAt(pos: IPos, sound: string, volume: number, pitch: number): void;
    removeBlock(x: number, y: number, z: number): void;
    removeBlock(pos: IPos): void;
    set spawnPoint(block: IBlock);
    set time(time: number);
    setBlock(x: number, y: number, z: number, name: string, meta: number): void;
    setBlock(pos: IPos, name: string): IBlock;
    setRaining(bo: boolean): void;
    spawnClone(x: number, y: number, z: number, tab: number, name: string): IEntity;
    spawnEntity(entity: IEntity): void;
    spawnParticle(particle: string, x: number, y: number, z: number, dx: number, dy: number, dz: number, speed: number, count: number): void;
    thunderStrike(x: number, y: number, z: number): void;
    trigger(id: number, ...arguments: any[]): void;
  }


  class WrapperEntityData {
    base: IEntity;
    constructor(base: IEntity);
    static get(entity: Entity): IEntity;
  }


  interface WrapperNpcAPI extends NpcAPI {}
  class WrapperNpcAPI extends NpcAPI {
    static readonly EVENT_BUS: IEventBus;
    static Instance(): NpcAPI;
    static clearCache(): void;
    createCustomGui(id: number, width: number, height: number, pauseGame: boolean, player: IPlayer): ICustomGui;
    createMail(sender: string, subject: string): IPlayerMail;
    createNPC(level: Level): ICustomNpc;
    createOverlay(id: number): IOverlay;
    events(): IEventBus;
    executeCommand(level: IWorld, command: string): string;
    get clones(): ICloneHandler;
    get dialogs(): IDialogHandler;
    get factions(): IFactionHandler;
    get globalDir(): File;
    get iWorlds(): IWorld[];
    get levelDir(): File;
    get quests(): IQuestHandler;
    get recipes(): IRecipeHandler;
    getIBlock(level: Level, pos: BlockPos): IBlock;
    getIContainer(inventory: AbstractContainerMenu): IContainer;
    getIContainer(container: Container): IContainer;
    getIDamageSource(damagesource: DamageSource): IDamageSource;
    getIEntity(entity: Entity): IEntity;
    getIItemStack(itemstack: ItemStack): IItemStack;
    getINbt(compound: CompoundTag): INbt;
    getIPos(x: number, y: number, z: number): IPos;
    getIWorld(level: ServerLevel): IWorld;
    getIWorld(dimension: DimensionType): IWorld;
    getIWorld(dimension: string): IWorld;
    getRandomName(dictionary: number, gender: number): string;
    getRawPlayerData(uuid: string): INbt;
    hasPermissionNode(permission: string): boolean;
    registerPermissionNode(permission: string, defaultType: number): void;
    spawnNPC(level: Level, x: number, y: number, z: number): ICustomNpc;
    stringToNbt(str: string): INbt;
  }

}

declare module 'noppes.npcs.api.wrapper.gui' {
  import { IAssetsSelector, ICustomGui, IButtonList, IButton, ITexturedRect, IColoredLine, ICustomGuiComponent, IEntityDisplay, IItemRenderer, IItemSlot, ILabel, IScroll, ISlider, ITextArea, ITextField, IComponentsScrollableWrapper, IComponentsWrapper } from 'noppes.npcs.api.gui';
  import { GuiComponentClicked, GuiComponentUpdate, GuiItemSlotUpdate } from 'noppes.npcs.api.function.gui';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { IItemStack } from 'noppes.npcs.api.item';
  import { UUID, List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { IEntity, IPlayer } from 'noppes.npcs.api.entity';
  import { INbt } from 'noppes.npcs.api';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Slot } from 'net.minecraft.world.inventory';
  import { EntityCustomNpc } from 'noppes.npcs.entity';
  import { ScriptContainer } from 'noppes.npcs.controllers';

  interface CustomGuiAssetsSelectorWrapper extends IAssetsSelector, CustomGuiComponentWrapper {}
  class CustomGuiAssetsSelectorWrapper extends IAssetsSelector {
    constructor();

    constructor(id: number, x: number, y: number, width: number, height: number);
    fromNBT(nbt: CompoundTag): CustomGuiComponentWrapper;
    get fileType(): string;
    get root(): string;
    get selected(): string;
    get type(): number;
    onChange(gui: ICustomGui): void;
    onPress(gui: ICustomGui): void;
    set fileType(type: string);
    set root(root: string);
    set selected(selected: string);
    setOnChange(onChange: GuiComponentUpdate<IAssetsSelector>): CustomGuiAssetsSelectorWrapper;
    setOnPress(onPress: GuiComponentClicked<IAssetsSelector>): CustomGuiAssetsSelectorWrapper;
    toNBT(nbt: CompoundTag): CompoundTag;
  }


  interface CustomGuiButtonListWrapper extends IButtonList, CustomGuiButtonWrapper {}
  class CustomGuiButtonListWrapper extends IButtonList {
    constructor();

    constructor(id: number, x: number, y: number, width: number, height: number);
    fromNBT(nbt: CompoundTag): CustomGuiComponentWrapper;
    get leftTexture(): CustomGuiTexturedRectWrapper;
    get rightTexture(): CustomGuiTexturedRectWrapper;
    get selected(): number;
    get type(): number;
    get values(): string[];
    set selected(selected: number);
    set values(...values: string[]);
    setOnPress(onPress: GuiComponentClicked<IButton>): CustomGuiButtonListWrapper;
    setSize(width: number, height: number): CustomGuiButtonListWrapper;
    toNBT(nbt: CompoundTag): CompoundTag;
  }


  interface CustomGuiButtonWrapper extends IButton, CustomGuiComponentWrapper {}
  class CustomGuiButtonWrapper extends IButton {
    constructor();

    constructor(id: number, label: string, x: number, y: number);

    constructor(id: number, label: string, x: number, y: number, width: number, height: number);

    constructor(id: number, label: string, x: number, y: number, width: number, height: number, texture: string);

    constructor(id: number, label: string, x: number, y: number, width: number, height: number, texture: string, textureX: number, textureY: number);
    fromNBT(nbt: CompoundTag): CustomGuiComponentWrapper;
    get displayItem(): IItemStack;
    get label(): string;
    get texture(): string;
    get textureHoverOffset(): number;
    get textureRect(): CustomGuiTexturedRectWrapper;
    get textureX(): number;
    get textureY(): number;
    get type(): number;
    hasTexture(): boolean;
    onPress(gui: ICustomGui): void;
    set displayItem(item: IItemStack);
    set label(label: string);
    set texture(texture: string);
    set textureHoverOffset(height: number);
    set textureRect(rect: ITexturedRect);
    setOnPress(onPress: GuiComponentClicked<IButton>): CustomGuiButtonWrapper;
    setSize(width: number, height: number): CustomGuiButtonWrapper;
    setTextureOffset(textureX: number, textureY: number): IButton;
    toNBT(nbt: CompoundTag): CompoundTag;
  }


  interface CustomGuiColoredLineWrapper extends IColoredLine, CustomGuiComponentWrapper {}
  class CustomGuiColoredLineWrapper extends IColoredLine {
    constructor();

    constructor(id: number, xStart: number, yStart: number, xEnd: number, yEnd: number, color: number, thickness: number);
    fromNBT(compound: CompoundTag): CustomGuiComponentWrapper;
    get color(): number;
    get thickness(): number;
    get type(): number;
    get xEnd(): number;
    get yEnd(): number;
    set color(color: number);
    set thickness(thickness: number);
    setEnd(x: number, y: number): IColoredLine;
    toNBT(compound: CompoundTag): CompoundTag;
  }


  interface CustomGuiComponentWrapper extends ICustomGuiComponent {}
  class CustomGuiComponentWrapper extends ICustomGuiComponent {
    uniqueId: UUID;
    disablePackets: boolean;
    static createFromNBT(nbt: CompoundTag): CustomGuiComponentWrapper;
    fromNBT(nbt: CompoundTag): CustomGuiComponentWrapper;
    get enabled(): boolean;
    get height(): number;
    get hoverText(): string[];
    get hoverTextList(): Component[];
    get iD(): number;
    get posX(): number;
    get posY(): number;
    get uniqueID(): UUID;
    get visible(): boolean;
    get width(): number;
    hasHoverText(): boolean;
    set enabled(bo: boolean);
    set hoverText(text: string);
    set iD(id: number);
    set visible(bo: boolean);
    setDisablePackets(): CustomGuiComponentWrapper;
    setHoverText(text: string[]): CustomGuiComponentWrapper;
    setPos(x: number, y: number): CustomGuiComponentWrapper;
    setSize(width: number, height: number): CustomGuiComponentWrapper;
    toNBT(nbt: CompoundTag): CompoundTag;
  }


  interface CustomGuiEntityDisplayWrapper extends IEntityDisplay, CustomGuiComponentWrapper {}
  class CustomGuiEntityDisplayWrapper extends IEntityDisplay {
    entityId: number;
    isFollowingCursor: boolean;
    constructor();

    constructor(id: number, entity: IEntity, x: number, y: number);
    fromNBT(compound: CompoundTag): CustomGuiComponentWrapper;
    get background(): boolean;
    get entity(): IEntity;
    get entityData(): INbt;
    get rotation(): number;
    get scale(): number;
    get type(): number;
    isFollowingCursor(): boolean;
    set background(bo: boolean);
    set entity(entity: IEntity);
    set rotation(rotation: number);
    set scale(scale: number);
    setFollowingCursor(state: boolean): IEntityDisplay;
    toNBT(compound: CompoundTag): CompoundTag;
  }


  interface CustomGuiItemRendererWrapper extends IItemRenderer, CustomGuiComponentWrapper {}
  class CustomGuiItemRendererWrapper extends IItemRenderer {
    width: number;
    height: number;
    scale: number;
    constructor();

    constructor(id: number, x: number, y: number, width: number, height: number, stack: IItemStack);
    fromNBT(nbt: CompoundTag): CustomGuiComponentWrapper;
    get height(): number;
    get scale(): number;
    get stack(): IItemStack;
    get type(): number;
    get width(): number;
    hasStack(): boolean;
    set scale(scaleFactor: number);
    set stack(itemStack: IItemStack);
    setHoverBox(width: number, height: number): IItemRenderer;
    toNBT(nbt: CompoundTag): CompoundTag;
  }


  interface CustomGuiItemSlotWrapper extends IItemSlot, CustomGuiComponentWrapper {}
  class CustomGuiItemSlotWrapper extends IItemSlot {
    constructor();

    constructor(x: number, y: number, stack: IItemStack);

    constructor(x: number, y: number, player: Player);
    fromNBT(nbt: CompoundTag): CustomGuiComponentWrapper;
    get guiType(): number;
    get mCSlot(): Slot;
    get stack(): IItemStack;
    get type(): number;
    hasStack(): boolean;
    isPlayerSlot(): boolean;
    onUpdate(gui: ICustomGui): void;
    set guiType(type: number);
    set stack(itemStack: IItemStack);
    setOnUpdate(onPress: GuiItemSlotUpdate): CustomGuiItemSlotWrapper;
    toNBT(nbt: CompoundTag): CompoundTag;
  }


  interface CustomGuiLabelWrapper extends ILabel, CustomGuiComponentWrapper {}
  class CustomGuiLabelWrapper extends ILabel {
    constructor();

    constructor(id: number, label: string, x: number, y: number, width: number, height: number);

    constructor(id: number, label: string, x: number, y: number, width: number, height: number, color: number);
    fromNBT(compound: CompoundTag): CustomGuiComponentWrapper;
    get centered(): boolean;
    get color(): number;
    get scale(): number;
    get text(): string;
    get type(): number;
    set centered(bo: boolean);
    set color(color: number);
    set scale(scale: number);
    set text(label: string);
    toNBT(compound: CompoundTag): CompoundTag;
  }


  interface CustomGuiScrollWrapper extends IScroll, CustomGuiComponentWrapper {}
  class CustomGuiScrollWrapper extends IScroll {
    constructor();

    constructor(id: number, x: number, y: number, width: number, height: number, list: string[]);
    fromNBT(compound: CompoundTag): CustomGuiComponentWrapper;
    get defaultSelection(): number;
    get hasSearch(): boolean;
    get list(): string[];
    get selection(): number[];
    get selectionList(): string[];
    get type(): number;
    isMultiSelect(): boolean;
    onClick(gui: ICustomGui): void;
    onDoubleClick(gui: ICustomGui): void;
    set defaultSelection(selection: number);
    set hasSearch(bo: boolean);
    set list(list: string[]);
    set selection(...selection: number[]);
    set selectionList(...list: string[]);
    setMultiSelect(multiSelect: boolean): CustomGuiScrollWrapper;
    setOnClick(onClick: GuiComponentClicked<IScroll>): CustomGuiScrollWrapper;
    setOnDoubleClick(onDoubleClick: GuiComponentClicked<IScroll>): CustomGuiScrollWrapper;
    toNBT(compound: CompoundTag): CompoundTag;
  }


  interface CustomGuiSliderWrapper extends ISlider, CustomGuiComponentWrapper {}
  class CustomGuiSliderWrapper extends ISlider {
    constructor();

    constructor(id: number, format: string, x: number, y: number, width: number, height: number);
    fromNBT(compound: CompoundTag): CustomGuiComponentWrapper;
    get decimals(): number;
    get format(): string;
    get max(): number;
    get min(): number;
    get type(): number;
    get value(): number;
    onChange(gui: ICustomGui): void;
    set decimals(decimals: number);
    set format(format: string);
    set max(max: number);
    set min(min: number);
    set value(value: number);
    setOnChange(onChange: GuiComponentUpdate<ISlider>): CustomGuiSliderWrapper;
    toNBT(compound: CompoundTag): CompoundTag;
  }


  interface CustomGuiTextAreaWrapper extends ITextArea, CustomGuiTextFieldWrapper {}
  class CustomGuiTextAreaWrapper extends ITextArea {
    constructor();

    constructor(id: number, x: number, y: number, width: number, height: number);
    fromNBT(nbt: CompoundTag): CustomGuiComponentWrapper;
    get codeTheme(): boolean;
    get type(): number;
    set codeTheme(bo: boolean);
    toNBT(nbt: CompoundTag): CompoundTag;
  }


  interface CustomGuiTextFieldWrapper extends ITextField, CustomGuiComponentWrapper {}
  class CustomGuiTextFieldWrapper extends ITextField {
    constructor();

    constructor(id: number, x: number, y: number, width: number, height: number);
    fromNBT(nbt: CompoundTag): CustomGuiComponentWrapper;
    get characterType(): number;
    get color(): number;
    get float(): number;
    get focused(): boolean;
    get integer(): number;
    get text(): string;
    get type(): number;
    onChange(gui: ICustomGui): void;
    onFocusLost(gui: ICustomGui): void;
    set characterType(type: number);
    set color(color: number);
    set float(f: number);
    set focused(bo: boolean);
    set integer(i: number);
    set text(text: string);
    setMinMax(min: number, max: number): CustomGuiTextFieldWrapper;
    setOnChange(onChange: GuiComponentUpdate<ITextField>): CustomGuiTextFieldWrapper;
    setOnFocusLost(onFocusChange: GuiComponentUpdate<ITextField>): CustomGuiTextFieldWrapper;
    toNBT(nbt: CompoundTag): CompoundTag;
  }


  interface CustomGuiTexturedRectWrapper extends ITexturedRect, CustomGuiComponentWrapper {}
  class CustomGuiTexturedRectWrapper extends ITexturedRect {
    hasRepeatingTexture: boolean;
    texRepWidth: number;
    texRepHeight: number;
    texRepBorderSize: number;
    constructor();

    constructor(id: number, texture: string, x: number, y: number, width: number, height: number);

    constructor(id: number, texture: string, x: number, y: number, width: number, height: number, textureX: number, textureY: number);
    fromNBT(compound: CompoundTag): CustomGuiComponentWrapper;
    get scale(): number;
    get texture(): string;
    get textureX(): number;
    get textureY(): number;
    get type(): number;
    set scale(scale: number);
    set texture(texture: string);
    setRepeatingTexture(width: number, height: number, borderSize: number): CustomGuiTexturedRectWrapper;
    setTextureOffset(offsetX: number, offsetY: number): CustomGuiTexturedRectWrapper;
    toNBT(compound: CompoundTag): CompoundTag;
  }


  interface CustomGuiWrapper extends ICustomGui, GuiComponentsWrapper {}
  class CustomGuiWrapper extends ICustomGui {
    npc: EntityCustomNpc;
    constructor(player: IPlayer);

    constructor(player: IPlayer, id: number, width: number, height: number, pauseGame: boolean);
    close(): void;
    closeSubGui(): CustomGuiWrapper;
    fromNBT(tag: CompoundTag): ICustomGui;
    get activeGui(): CustomGuiWrapper;
    get backgroundRect(): ITexturedRect;
    get backgroundTexture(): string;
    get doesPauseGame(): boolean;
    get height(): number;
    get iD(): number;
    get parentGui(): CustomGuiWrapper;
    get player(): IPlayer;
    get rootGui(): CustomGuiWrapper;
    get scriptHandler(): ScriptContainer;
    get scrollingPanel(): GuiComponentsScrollableWrapper;
    get subGui(): CustomGuiWrapper;
    get width(): number;
    getComponentUuid(id: UUID): ICustomGuiComponent;
    hasSubGui(): boolean;
    openSubGui(gui: ICustomGui): void;
    set backgroundTexture(resourceLocation: string);
    set doesPauseGame(pauseGame: boolean);
    setSize(width: number, height: number): void;
    toNBT(): CompoundTag;
    update(): void;
    update(component: ICustomGuiComponent): void;
  }


  interface GuiComponentsScrollableWrapper extends IComponentsScrollableWrapper, GuiComponentsWrapper {}
  class GuiComponentsScrollableWrapper extends IComponentsScrollableWrapper {
    x: number;
    y: number;
    width: number;
    height: number;
    scrollAmount: number;
    parent: GuiComponentsWrapper;
    constructor(parent: GuiComponentsWrapper, player: IPlayer);
    get componentNbt(): CompoundTag;
    init(x: number, y: number, width: number, height: number): GuiComponentsScrollableWrapper;
    isVisible(component: ICustomGuiComponent): boolean;
    set componentNbt(comp: CompoundTag);
  }


  interface GuiComponentsWrapper extends IComponentsWrapper {}
  class GuiComponentsWrapper extends IComponentsWrapper {
    slotId: number;
    constructor(player: IPlayer);
    addAssetsSelector(id: number, x: number, y: number, width: number, height: number): CustomGuiAssetsSelectorWrapper;
    addButton(id: number, label: string, x: number, y: number): CustomGuiButtonWrapper;
    addButton(id: number, label: string, x: number, y: number, width: number, height: number): CustomGuiButtonWrapper;
    addButtonList(id: number, x: number, y: number, width: number, height: number): CustomGuiButtonListWrapper;
    addColoredLine(id: number, xStart: number, yStart: number, xEnd: number, yEnd: number, color: number, thickness: number): IColoredLine;
    addComponent(component: ICustomGuiComponent): void;
    addEntityDisplay(id: number, x: number, y: number, entity: IEntity): CustomGuiEntityDisplayWrapper;
    addItemRenderer(id: number, x: number, y: number, width: number, height: number, stack: IItemStack): IItemRenderer;
    addItemSlot(x: number, y: number): IItemSlot;
    addItemSlot(x: number, y: number, stack: IItemStack): IItemSlot;
    addLabel(id: number, label: string, x: number, y: number, width: number, height: number): CustomGuiLabelWrapper;
    addLabel(id: number, label: string, x: number, y: number, width: number, height: number, color: number): CustomGuiLabelWrapper;
    addScroll(id: number, x: number, y: number, width: number, height: number, ...list: string[]): CustomGuiScrollWrapper;
    addScroll(var1: number, var2: number, var3: number, var4: number, var5: number, var6: string[]): IScroll;
    addSlider(id: number, x: number, y: number, width: number, height: number, format: string): CustomGuiSliderWrapper;
    addTextArea(id: number, x: number, y: number, width: number, height: number): CustomGuiTextAreaWrapper;
    addTextField(id: number, x: number, y: number, width: number, height: number): CustomGuiTextFieldWrapper;
    addTexturedButton(id: number, label: string, x: number, y: number, width: number, height: number, texture: string): CustomGuiButtonWrapper;
    addTexturedButton(id: number, label: string, x: number, y: number, width: number, height: number, texture: string, textureX: number, textureY: number): CustomGuiButtonWrapper;
    addTexturedRect(id: number, texture: string, x: number, y: number, width: number, height: number): CustomGuiTexturedRectWrapper;
    addTexturedRect(id: number, texture: string, x: number, y: number, width: number, height: number, textureX: number, textureY: number): CustomGuiTexturedRectWrapper;
    get componentNbt(): CompoundTag;
    get components(): ICustomGuiComponent[];
    get playerSlots(): IItemSlot[];
    get slots(): IItemSlot[];
    getComponent(componentID: number): ICustomGuiComponent;
    getComponentUuid(id: UUID): ICustomGuiComponent;
    removeComponent(componentID: number): void;
    removeItemSlot(slot: IItemSlot): void;
    set componentNbt(comp: CompoundTag);
    showPlayerInventory(x: number, y: number): void;
    showPlayerInventory(x: number, y: number, full: boolean): IItemSlot[];
  }

}

declare module 'noppes.npcs.blocks' {
  import { MapCodec } from 'com.mojang.serialization';
  import { IntegerProperty, BooleanProperty } from 'net.minecraft.world.level.block.state.properties';
  import { Properties } from 'BlockBehaviour';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { Level, BlockGetter, Explosion, LevelReader } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { LivingEntity, Entity } from 'net.minecraft.world.entity';
  import { ItemStack } from 'net.minecraft.world.item';
  import { RenderShape, BaseEntityBlock, EntityBlock, DoorBlock, Block } from 'net.minecraft.world.level.block';
  import { BlockEntity, BlockEntityTicker, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { List } from 'java.util';
  import { Builder } from 'LootParams';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Precipitation } from 'Biome';

  interface BlockBorder extends BlockInterface {}
  class BlockBorder extends BlockInterface {
    static readonly CODEC: MapCodec;
    static readonly ROTATION: IntegerProperty;
    constructor();

    constructor(p_49696_: Properties);
    getRenderShape(state: BlockState): RenderShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    getTicker<T extends BlockEntity>(level: Level, state: BlockState, type: BlockEntityType<T>): BlockEntityTicker<T>;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    setPlacedBy(level: Level, pos: BlockPos, state: BlockState, entity: LivingEntity, item: ItemStack): void;
  }


  interface BlockBuilder extends BlockInterface {}
  class BlockBuilder extends BlockInterface {
    static readonly CODEC: MapCodec;
    static readonly ROTATION: IntegerProperty;
    constructor();

    constructor(p_49696_: Properties);
    getRenderShape(state: BlockState): RenderShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    getTicker<T extends BlockEntity>(level: Level, state: BlockState, type: BlockEntityType<T>): BlockEntityTicker<T>;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
  }


  interface BlockCarpentryBench extends BlockInterface {}
  class BlockCarpentryBench extends BlockInterface {
    static readonly CODEC: MapCodec;
    static readonly ROTATION: IntegerProperty;
    constructor();

    constructor(p_49696_: Properties);
    getOcclusionShape(p_196247_1_: BlockState, p_196247_2_: BlockGetter, p_196247_3_: BlockPos): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
  }


  interface BlockCopy extends BlockInterface {}
  class BlockCopy extends BlockInterface {
    static readonly CODEC: MapCodec;
    constructor();

    constructor(p_49696_: Properties);
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
  }


  interface BlockInterface extends EntityBlock, BaseEntityBlock {}
  class BlockInterface extends EntityBlock {
  }


  interface BlockMailbox extends BlockInterface {}
  class BlockMailbox extends BlockInterface {
    static readonly ROTATION: IntegerProperty;
    static readonly CODEC: MapCodec;
    readonly type: number;
    constructor(type: number);

    constructor(p_49696_: Properties);
    get descriptionId(): string;
    getOcclusionShape(p_196247_1_: BlockState, p_196247_2_: BlockGetter, p_196247_3_: BlockPos): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
  }


  interface BlockNpcDoorInterface extends EntityBlock, DoorBlock {}
  class BlockNpcDoorInterface extends EntityBlock {
    constructor(properties: Properties);
    getDrops(p_287732_: BlockState, p_287596_: Builder): ItemStack[];
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    playerDestroy(p_180657_1_: Level, p_180657_2_: Player, p_180657_3_: BlockPos, p_180657_4_: BlockState, p_180657_5_: BlockEntity, p_180657_6_: ItemStack): void;
  }


  interface BlockNpcRedstone extends BlockInterface {}
  class BlockNpcRedstone extends BlockInterface {
    static readonly ACTIVE: BooleanProperty;
    static readonly CODEC: MapCodec;
    constructor();

    constructor(p_49696_: Properties);
    getDirectSignal(state: BlockState, level: BlockGetter, pos: BlockPos, side: Direction): number;
    getRenderShape(state: BlockState): RenderShape;
    getSignal(state: BlockState, worldIn: BlockGetter, pos: BlockPos, side: Direction): number;
    getTicker<T extends BlockEntity>(level: Level, state: BlockState, type: BlockEntityType<T>): BlockEntityTicker<T>;
    isActivated(state: BlockState): number;
    isSignalSource(state: BlockState): boolean;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onPlace(state: BlockState, par1Level: Level, pos: BlockPos, stateNew: BlockState, bo: boolean): void;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    setPlacedBy(level: Level, pos: BlockPos, state: BlockState, entity: LivingEntity, item: ItemStack): void;
  }


  interface BlockScripted extends BlockInterface {}
  class BlockScripted extends BlockInterface {
    static readonly AABB: VoxelShape;
    static readonly CODEC: MapCodec;
    constructor();

    constructor(p_49696_: Properties);
    attack(state: BlockState, level: Level, pos: BlockPos, player: Player): void;
    entityInside(state: BlockState, level: Level, pos: BlockPos, entityIn: Entity): void;
    fallOn(level: Level, state: BlockState, pos: BlockPos, entity: Entity, fallDistance: number): void;
    getCollisionShape(blockState: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getDestroyProgress(state: BlockState, player: Player, level: BlockGetter, pos: BlockPos): number;
    getDirectSignal(state: BlockState, level: BlockGetter, pos: BlockPos, side: Direction): number;
    getDrops(p_287732_: BlockState, p_287596_: Builder): ItemStack[];
    getLightBlock(state: BlockState, level: BlockGetter, pos: BlockPos): number;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getSignal(state: BlockState, worldIn: BlockGetter, pos: BlockPos, side: Direction): number;
    getTicker<T extends BlockEntity>(level: Level, state: BlockState, type: BlockEntityType<T>): BlockEntityTicker<T>;
    handlePrecipitation(state: BlockState, level: Level, pos: BlockPos, type: Precipitation): void;
    isSignalSource(state: BlockState): boolean;
    neighborChanged(state: BlockState, level: Level, pos: BlockPos, neighborBlock: Block, pos2: BlockPos, isMoving: boolean): void;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    playerDestroy(level: Level, player: Player, pos: BlockPos, state: BlockState, blockEntity: BlockEntity, tool: ItemStack): void;
    propagatesSkylightDown(state: BlockState, level: BlockGetter, pos: BlockPos): boolean;
    setPlacedBy(level: Level, pos: BlockPos, state: BlockState, entity: LivingEntity, item: ItemStack): void;
    wasExploded(level: Level, pos: BlockPos, explosion: Explosion): void;
  }


  interface BlockScriptedDoor extends BlockNpcDoorInterface {}
  class BlockScriptedDoor extends BlockNpcDoorInterface {
    constructor();
    attack(state: BlockState, level: Level, pos: BlockPos, playerIn: Player): void;
    entityInside(state: BlockState, level: Level, pos: BlockPos, entityIn: Entity): void;
    getCloneItemStack(worldIn: LevelReader, pos: BlockPos, state: BlockState): ItemStack;
    getDestroyProgress(state: BlockState, player: Player, level: BlockGetter, pos: BlockPos): number;
    getRenderShape(state: BlockState): RenderShape;
    getTicker<T extends BlockEntity>(level: Level, state: BlockState, type: BlockEntityType<T>): BlockEntityTicker<T>;
    neighborChanged(state: BlockState, worldIn: Level, pos: BlockPos, neighborBlock: Block, pos2: BlockPos, isMoving: boolean): void;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    playerDestroy(level: Level, player: Player, pos: BlockPos, state: BlockState, blockEntity: BlockEntity, tool: ItemStack): void;
    playerWillDestroy(level: Level, pos: BlockPos, state: BlockState, player: Player): BlockState;
    setOpen(entity: Entity, worldIn: Level, state: BlockState, pos: BlockPos, open: boolean): void;
  }


  interface BlockWaypoint extends BlockInterface {}
  class BlockWaypoint extends BlockInterface {
    static readonly CODEC: MapCodec;
    constructor();

    constructor(p_49696_: Properties);
    getRenderShape(state: BlockState): RenderShape;
    getTicker<T extends BlockEntity>(level: Level, state: BlockState, type: BlockEntityType<T>): BlockEntityTicker<T>;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    setPlacedBy(level: Level, pos: BlockPos, state: BlockState, entity: LivingEntity, item: ItemStack): void;
  }

}

declare module 'noppes.npcs.blocks.tiles' {
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Predicate } from 'com.google.common.base';
  import { Availability, BlockData } from 'noppes.npcs.controllers.data';
  import { AABB } from 'net.minecraft.world.phys';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Level } from 'net.minecraft.world.level';
  import { ClientboundBlockEntityDataPacket } from 'net.minecraft.network.protocol.game';
  import { Provider } from 'HolderLookup';
  import { Entity } from 'net.minecraft.world.entity';
  import { BlockEntity, BlockEntityType, BlockEntityTicker } from 'net.minecraft.world.level.block.entity';
  import { SchematicWrapper } from 'noppes.npcs.schematics';
  import { Stack, Map, List } from 'java.util';
  import { Block } from 'net.minecraft.world.level.block';
  import { IScriptBlockHandler, ScriptContainer } from 'noppes.npcs.controllers';
  import { DataTimers } from 'noppes.npcs.entity.data';
  import { ItemStack } from 'net.minecraft.world.item';
  import { TextPlane } from 'noppes.npcs.blocks.tiles.TileScripted';
  import { IBlock } from 'noppes.npcs.api.block';
  import { EnumScriptType } from 'noppes.npcs.constants';
  import { Event } from 'net.neoforged.bus.api';
  import { Long } from 'java.lang';

  interface TileBlockAnvil extends TileNpcEntity {}
  class TileBlockAnvil extends TileNpcEntity {
    constructor(pos: BlockPos, state: BlockState);
    canUpdate(): boolean;
  }


  interface TileBorder extends Predicate, TileNpcEntity {}
  class TileBorder extends Predicate {
    availability: Availability;
    boundingbox: AABB;
    rotation: number;
    height: number;
    message: string;
    constructor(pos: BlockPos, state: BlockState);
    apply(ob: any): boolean;
    get updatePacket(): ClientboundBlockEntityDataPacket;
    getUpdateTag(registries: Provider): CompoundTag;
    isEntityApplicable(var1: Entity): boolean;
    readExtraNBT(compound: CompoundTag): void;
    static tick(level: Level, pos: BlockPos, state: BlockState, tile: TileBorder): void;
    writeExtraNBT(compound: CompoundTag): void;
  }


  interface TileBuilder extends BlockEntity {}
  class TileBuilder extends BlockEntity {
    rotation: number;
    yOffest: number;
    enabled: boolean;
    started: boolean;
    finished: boolean;
    availability: Availability;
    static DrawPos: BlockPos;
    static Compiled: boolean;
    constructor(pos: BlockPos, state: BlockState);
    static SetDrawPos(pos: BlockPos): void;
    get block(): Stack<BlockData>;
    get schematic(): SchematicWrapper;
    hasSchematic(): boolean;
    readPartNBT(compound: CompoundTag): void;
    set schematic(schematics: SchematicWrapper);
    setDrawSchematic(schematics: SchematicWrapper): void;
    static tick(level: Level, pos: BlockPos, state: BlockState, tile: TileBuilder): void;
    writePartNBT(compound: CompoundTag): CompoundTag;
    xyzToIndex(x: number, y: number, z: number): number;
  }


  interface TileColorable extends TileNpcEntity {}
  class TileColorable extends TileNpcEntity {
    color: number;
    rotation: number;
    constructor(p_i48289_1_: BlockEntityType<any>, pos: BlockPos, state: BlockState);
    canUpdate(): boolean;
    get updatePacket(): ClientboundBlockEntityDataPacket;
    getUpdateTag(registries: Provider): CompoundTag;
    powerProvided(): number;
  }


  interface TileCopy extends BlockEntity {}
  class TileCopy extends BlockEntity {
    length: number;
    width: number;
    height: number;
    name: string;
    constructor(pos: BlockPos, state: BlockState);
    get updatePacket(): ClientboundBlockEntityDataPacket;
    getUpdateTag(registries: Provider): CompoundTag;
  }


  interface TileDoor extends TileNpcEntity {}
  class TileDoor extends TileNpcEntity {
    tickCount: number;
    blockModel: Block;
    needsClientUpdate: boolean;
    constructor(p_i48289_1_: BlockEntityType<any>, pos: BlockPos, state: BlockState);
    get updatePacket(): ClientboundBlockEntityDataPacket;
    getDoorNBT(compound: CompoundTag): CompoundTag;
    getUpdateTag(registries: Provider): CompoundTag;
    setDoorNBT(compound: CompoundTag): void;
    setItemModel(block: Block): void;
    static tick(level: Level, pos: BlockPos, state: BlockState, tile: TileDoor): void;
  }


  interface TileMailbox extends TileNpcEntity {}
  class TileMailbox extends TileNpcEntity {
    constructor(pos: BlockPos, state: BlockState);
    get model(): number;
    set model(type: number);
  }


  interface TileMailbox2 extends TileNpcEntity {}
  class TileMailbox2 extends TileNpcEntity {
    constructor(pos: BlockPos, state: BlockState);
  }


  interface TileMailbox3 extends TileNpcEntity {}
  class TileMailbox3 extends TileNpcEntity {
    constructor(pos: BlockPos, state: BlockState);
  }


  interface TileNpcEntity extends BlockEntity {}
  class TileNpcEntity extends BlockEntity {
    tempData: Map;
    constructor(type: BlockEntityType<any>, pos: BlockPos, state: BlockState);
  }


  interface TileRedstoneBlock extends TileNpcEntity {}
  class TileRedstoneBlock extends TileNpcEntity {
    onRange: number;
    offRange: number;
    onRangeX: number;
    onRangeY: number;
    onRangeZ: number;
    offRangeX: number;
    offRangeY: number;
    offRangeZ: number;
    isDetailed: boolean;
    availability: Availability;
    isActivated: boolean;
    constructor(pos: BlockPos, state: BlockState);
    static tick(level: Level, pos: BlockPos, state: BlockState, tile: TileRedstoneBlock): void;
  }


  interface TileScripted extends IScriptBlockHandler, TileNpcEntity {}
  class TileScripted extends IScriptBlockHandler {
    scripts: List;
    scriptLanguage: string;
    enabled: boolean;
    timers: DataTimers;
    lastInited: number;
    itemModel: ItemStack;
    blockModel: Block;
    needsClientUpdate: boolean;
    powering: number;
    activePowering: number;
    newPower: number;
    prevPower: number;
    isPassible: boolean;
    isLadder: boolean;
    lightValue: number;
    blockHardness: number;
    blockResistance: number;
    rotationX: number;
    rotationY: number;
    rotationZ: number;
    scaleX: number;
    scaleY: number;
    scaleZ: number;
    renderTile: BlockEntity;
    renderState: BlockState;
    renderTileErrored: boolean;
    renderTileUpdate: BlockEntityTicker;
    text1: TextPlane;
    text2: TextPlane;
    text3: TextPlane;
    text4: TextPlane;
    text5: TextPlane;
    text6: TextPlane;
    constructor(pos: BlockPos, state: BlockState);
    clearConsole(): void;
    get block(): IBlock;
    get consoleText(): Map<Long, string>;
    get enabled(): boolean;
    get language(): string;
    get scripts(): ScriptContainer[];
    get updatePacket(): ClientboundBlockEntityDataPacket;
    getDisplayNBT(compound: CompoundTag, registries: Provider): CompoundTag;
    getNBT(compound: CompoundTag): CompoundTag;
    getUpdateTag(registries: Provider): CompoundTag;
    isClient(): boolean;
    noticeString(): string;
    runScript(type: EnumScriptType, event: Event): void;
    set enabled(bo: boolean);
    set language(lang: string);
    setDisplayNBT(compound: CompoundTag, registries: Provider): void;
    setItemModel(item: ItemStack, b: Block): void;
    setLightValue(value: number): void;
    setNBT(compound: CompoundTag): void;
    setRedstonePower(strength: number): void;
    setRotation(x: number, y: number, z: number): void;
    setScale(x: number, y: number, z: number): void;
    static tick(level: Level, pos: BlockPos, state: BlockState, tile: TileScripted): void;
  }


  interface TileScriptedDoor extends IScriptBlockHandler, TileDoor {}
  class TileScriptedDoor extends IScriptBlockHandler {
    scripts: List;
    shouldRefreshData: boolean;
    scriptLanguage: string;
    enabled: boolean;
    timers: DataTimers;
    lastInited: number;
    newPower: number;
    prevPower: number;
    blockHardness: number;
    blockResistance: number;
    constructor(pos: BlockPos, state: BlockState);
    clearConsole(): void;
    get block(): IBlock;
    get consoleText(): Map<Long, string>;
    get enabled(): boolean;
    get language(): string;
    get scripts(): ScriptContainer[];
    getNBT(compound: CompoundTag): CompoundTag;
    isClient(): boolean;
    noticeString(): string;
    runScript(type: EnumScriptType, event: Event): void;
    set enabled(bo: boolean);
    set language(lang: string);
    setNBT(compound: CompoundTag): void;
    static tick(level: Level, pos: BlockPos, state: BlockState, tile: TileScriptedDoor): void;
    static tick(level: Level, pos: BlockPos, state: BlockState, tile: TileDoor): void;
  }


  interface TileWaypoint extends TileNpcEntity {}
  class TileWaypoint extends TileNpcEntity {
    name: string;
    range: number;
    constructor(pos: BlockPos, state: BlockState);
    static tick(level: Level, pos: BlockPos, state: BlockState, tile: TileWaypoint): void;
  }

}

declare module 'noppes.npcs.blocks.tiles.TileScripted' {
  import { ITextPlane } from 'noppes.npcs.api.block';
  import { TextBlock } from 'noppes.npcs';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface TextPlane extends ITextPlane {}
  class TextPlane extends ITextPlane {
    textHasChanged: boolean;
    textBlock: TextBlock;
    text: string;
    rotationX: number;
    rotationY: number;
    rotationZ: number;
    offsetX: number;
    offsetY: number;
    offsetZ: number;
    scale: number;
    get nBT(): CompoundTag;
    get offsetX(): number;
    get offsetY(): number;
    get offsetZ(): number;
    get rotationX(): number;
    get rotationY(): number;
    get rotationZ(): number;
    get scale(): number;
    get text(): string;
    set nBT(compound: CompoundTag);
    set offsetX(x: number);
    set offsetY(y: number);
    set offsetZ(z: number);
    set rotationX(x: number);
    set rotationY(y: number);
    set rotationZ(z: number);
    set scale(scale: number);
    set text(text: string);
  }

}

declare module 'noppes.npcs.client' {
  import { IChatMessages, CommonProxy, ModelData, TextBlock } from 'noppes.npcs';
  import { EntityNPCInterface } from 'noppes.npcs.entity';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource, BlockEntityWithoutLevelRenderer } from 'net.minecraft.client.renderer';
  import { Matrix4f } from 'org.joml';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { LivingEntity, EntityType, Entity } from 'net.minecraft.world.entity';
  import { PlaySoundEvent } from 'net.neoforged.neoforge.client.event.sound';
  import { Post } from 'ScreenEvent.Init';
  import { PlayerData, PlayerSkinData } from 'noppes.npcs.controllers.data';
  import { KeyMapping } from 'net.minecraft.client';
  import { FontContainer } from 'noppes.npcs.client.ClientProxy';
  import { PlayerModel } from 'net.minecraft.client.model';
  import { HumanoidArmorLayer } from 'net.minecraft.client.renderer.entity.layers';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Void, Runnable, Class, Thread } from 'java.lang';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { EnumGuiType } from 'noppes.npcs.constants';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ParticleOptions } from 'net.minecraft.core.particles';
  import { Pre } from 'ClientTickEvent';
  import { Key } from 'InputEvent';
  import { RegisterKeyMappingsEvent } from 'net.neoforged.neoforge.client.event';
  import { ResourceManagerReloadListener, ResourceManager } from 'net.minecraft.server.packs.resources';
  import { RegisterRenderers } from 'EntityRenderersEvent';
  import { IClientItemExtensions } from 'net.neoforged.neoforge.client.extensions.common';
  import { BlockEntityRenderDispatcher } from 'net.minecraft.client.renderer.blockentity';
  import { EntityModelSet } from 'net.minecraft.client.model.geom';
  import { ItemStack, ItemDisplayContext } from 'net.minecraft.world.item';
  import { HashMap, List } from 'java.util';
  import { Level } from 'net.minecraft.world.level';
  import { DataItem } from 'SynchedEntityData';
  import { File } from 'java.io';
  import { BossEventProgress } from 'CustomizeGuiOverlayEvent';
  import { IntBuffer } from 'java.nio';
  import { CommandSourceStack } from 'net.minecraft.commands';

  interface ChatMessages extends IChatMessages {}
  class ChatMessages extends IChatMessages {
    addMessage(message: string, npc: EntityNPCInterface): void;
    drawRect(ivertex: VertexConsumer, matrix: Matrix4f, lightmapUV: number, x: number, y: number, x2: number, y2: number, color: number, z: number): void;
    static getChatMessages(username: string): ChatMessages;
    hasMessage(): boolean;
    render(poseStack: PoseStack, typeBuffer: MultiBufferSource, ivertex: VertexConsumer, textScale: number, depth: boolean, lightmapUV: number): void;
    renderMessages(PoseStack2: PoseStack, typeBuffer: MultiBufferSource, textscale: number, inRange: boolean, lightmapUV: number): void;
  }


  class ClientEventHandler {
    static drawSelectionBox(matrixStack: PoseStack, buffer: MultiBufferSource, pos: BlockPos): void;
    guiPostInit(event: Post): void;
    static onRenderTick(matrixStack: PoseStack, rpos: BlockPos, te: BlockEntity): void;
    playSound(event: PlaySoundEvent): void;
    static post(entity: LivingEntity, entityYaw: number, partialTicks: number, poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number): void;
  }


  interface ClientProxy extends CommonProxy {}
  class ClientProxy extends CommonProxy {
    static playerData: PlayerData;
    static QuestLog: KeyMapping;
    static Scene1: KeyMapping;
    static SceneReset: KeyMapping;
    static Scene2: KeyMapping;
    static Scene3: KeyMapping;
    static Font: FontContainer;
    static data: ModelData;
    static playerModel: PlayerModel;
    static armorLayer: HumanoidArmorLayer;
    static bind(location: ResourceLocation): void;
    static createFolders(): void;
    enqueueWork(runnable: Runnable): CompletableFuture<Void>;
    get player(): Player;
    static getGui(gui: EnumGuiType, npc: EntityNPCInterface, buf: FriendlyByteBuf): Screen;
    getPlayerData(player: Player): PlayerData;
    hasClient(): boolean;
    load(): void;
    openGui(player: Player, gui: EnumGuiType): void;
    openGui(npc: EntityNPCInterface, gui: EnumGuiType): void;
    openGui(player: Player, guiscreen: any): void;
    postload(): void;
    spawnParticle(player: LivingEntity, string: string, ...ob: any[]): void;
    spawnParticle(particle: ParticleOptions, x: number, y: number, z: number, motionX: number, motionY: number, motionZ: number, scale: number): void;
  }


  class ClientTickHandler {
    onClientTick(event: Pre): void;
    onKey(event: Key): void;
  }


  class CustomKeybinds {
    static registerKeys(event: RegisterKeyMappingsEvent): void;
  }


  interface CustomNpcResourceListener extends ResourceManagerReloadListener {}
  class CustomNpcResourceListener extends ResourceManagerReloadListener {
    static DefaultTextColor: number;
    onResourceManagerReload(manager: ResourceManager): void;
  }


  class CustomRenderers {
    static registerEntityRenderer(event: RegisterRenderers): void;
  }


  interface CustomTileEntityItemStackRenderer extends BlockEntityWithoutLevelRenderer {}
  class CustomTileEntityItemStackRenderer extends BlockEntityWithoutLevelRenderer {
    static itemRenderProperties: IClientItemExtensions;
    constructor(dispatcher: BlockEntityRenderDispatcher, model: EntityModelSet);
    static instance(): CustomTileEntityItemStackRenderer;
    renderByItem(stack: ItemStack, p_239207_2_: ItemDisplayContext, matrixStack: PoseStack, buffer: MultiBufferSource, combinedLight: number, combinedOverlay: number): void;
  }


  class EntityUtil {
    static Copy(copied: LivingEntity, entity: LivingEntity): void;
    static getAllEntities(level: Level, withNpcs: boolean): HashMap<string, ResourceLocation>;
    static getAllEntitiesClasses(level: Level): HashMap<EntityType<Entity>, Class>;
    static getAllEntitiesClassesNoNpcs(level: Level): HashMap<EntityType<Entity>, Class>;
    static setRecentlyHit(entity: LivingEntity): void;
  }


  class ISynchedEntityData {
    get all(): DataItem<any>[];
  }


  class NoppesUtil {
    static clickSound(): void;
    static get lastNpc(): EntityNPCInterface;
    static openFolder(dir: File): void;
    static openGUI(player: Player, guiscreen: any): void;
    static requestOpenGUI(gui: EnumGuiType): void;
    static requestOpenGUI(gui: EnumGuiType, pos: BlockPos): void;
    static set lastNpc(npc: EntityNPCInterface);
  }


  class OverlayEventHandler {
    static onRenderOverlay(event: BossEventProgress): void;
  }


  class SkinUtil {
    static createPlayerSkin(skin: PlayerSkinData): ResourceLocation;
    static initTexture(p_225685_0_: IntBuffer, p_225685_1_: number, p_225685_2_: number): void;
  }


  interface TextBlockClient extends TextBlock {}
  class TextBlockClient extends TextBlock {
    color: number;
    constructor(name: string, text: string, lineWidth: number, color: number, ...obs: any[]);

    constructor(sender: CommandSourceStack, text: string, lineWidth: number, color: number, ...obs: any[]);

    constructor(text: string, lineWidth: number, mcFont: boolean, ...obs: any[]);
    get name(): string;
  }


  class TranslateUtil {
    static Translate(text: string): string;
  }


  interface VersionChecker extends Thread {}
  class VersionChecker extends Thread {
    run(): void;
  }

}

declare module 'noppes.npcs.client.ClientProxy' {
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class FontContainer {
    useCustomFont: boolean;
    constructor(fontType: string, fontSize: number);
    clear(): void;
    copy(): FontContainer;
    draw(graphics: GuiGraphics, text: string, x: number, y: number, color: number): void;
    get name(): string;
    height(text: string): number;
    width(text: string): number;
  }

}

declare module 'noppes.npcs.client.controllers' {
  import { ServerCloneController } from 'noppes.npcs.controllers';
  import { File } from 'java.io';
  import { PlayerSkinData } from 'noppes.npcs.controllers.data';
  import { PlayerSkin } from 'net.minecraft.client.resources';
  import { SoundInstance } from 'net.minecraft.client.resources.sounds';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Entity } from 'net.minecraft.world.entity';
  import { SoundSource } from 'net.minecraft.sounds';
  import { BlockPos } from 'net.minecraft.core';
  import { GuiBasic } from 'noppes.npcs.shared.client.gui.components';
  import { IOverlay } from 'noppes.npcs.api.overlay';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ModelData } from 'noppes.npcs';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { HashMap } from 'java.util';

  interface ClientCloneController extends ServerCloneController {}
  class ClientCloneController extends ServerCloneController {
    static Instance: ClientCloneController;
    get dir(): File;
  }


  class ClientSkinController {
    static addSkinForPlayer(playerName: string, skinData: PlayerSkinData): void;
    static getSkinForPlayer(playerName: string, other: PlayerSkin): PlayerSkin;
  }


  class MusicController {
    static Instance: MusicController;
    playing: SoundInstance;
    playingResource: ResourceLocation;
    playingEntity: Entity;
    constructor();
    isPlaying(music: string): boolean;
    playMusic(music: string, entity: Entity, isLooping: boolean): void;
    playSound(cat: SoundSource, music: string, pos: BlockPos, volume: number, pitch: number): void;
    playStreaming(music: string, entity: Entity, isLooping: boolean): void;
    stopMusic(): void;
  }


  interface OverlayController extends GuiBasic {}
  class OverlayController extends GuiBasic {
    addOverlay(overlay: IOverlay): void;
    clear(): void;
    static get instance(): OverlayController;
    removeOverlay(id: number): void;
    renderOverlays(graphics: GuiGraphics): void;
  }


  class Preset {
    data: ModelData;
    name: string;
    static FillDefault(presets: HashMap<string, Preset>): void;
    load(compound: CompoundTag): void;
    save(): CompoundTag;
  }


  class PresetController {
    presets: HashMap;
    static instance: PresetController;
    constructor(dir: File);
    addPreset(preset: Preset): void;
    getPreset(username: string): Preset;
    load(): void;
    removePreset(preset: string): void;
    save(): void;
  }

}

declare module 'noppes.npcs.client.gui.advanced' {
  import { GuiNPCInterface2 } from 'noppes.npcs.client.gui.util';
  import { IScrollData, ICustomScrollListener, GuiSelectionListener, IGuiData, ITextfieldListener } from 'noppes.npcs.shared.client.gui.listeners';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { EntityNPCInterface } from 'noppes.npcs.entity';
  import { GuiButtonNop, GuiCustomScrollNop, GuiTextFieldNop } from 'noppes.npcs.shared.client.gui.components';
  import { Vector, Map } from 'java.util';
  import { Integer } from 'java.lang';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface GuiNPCAdvancedLinkedNpc extends IScrollData, ICustomScrollListener, GuiNPCInterface2 {}
  class GuiNPCAdvancedLinkedNpc extends IScrollData {
    static Instance: Screen;
    constructor(npc: EntityNPCInterface);
    buttonEvent(button: GuiButtonNop): void;
    init(): void;
    save(): void;
    scrollClicked(i: number, j: number, k: number, guiCustomScroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
    setData(list: Vector<string>, data: Map<string, number>): void;
    setSelected(selected: string): void;
  }


  interface GuiNPCDialogNpcOptions extends GuiSelectionListener, IGuiData, GuiNPCInterface2 {}
  class GuiNPCDialogNpcOptions extends GuiSelectionListener {
    constructor(npc: EntityNPCInterface, parent: Screen);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    save(): void;
    selected(id: number, name: string): void;
    setGuiData(compound: CompoundTag): void;
  }


  interface GuiNPCFactionSetup extends IScrollData, ICustomScrollListener, GuiNPCInterface2 {}
  class GuiNPCFactionSetup extends IScrollData {
    constructor(npc: EntityNPCInterface);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    mouseClicked(i: number, j: number, k: number): boolean;
    save(): void;
    scrollClicked(i: number, j: number, k: number, guiCustomScroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
    setData(list: Vector<string>, data: Map<string, number>): void;
    setSelected(selected: string): void;
  }


  interface GuiNPCLinesMenu extends GuiNPCInterface2 {}
  class GuiNPCLinesMenu extends GuiNPCInterface2 {
    constructor(npc: EntityNPCInterface);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
  }


  interface GuiNPCMarks extends GuiNPCInterface2 {}
  class GuiNPCMarks extends GuiNPCInterface2 {
    constructor(npc: EntityNPCInterface);
    buttonEvent(button: GuiButtonNop): void;
    init(): void;
    save(): void;
    subGuiClosed(subgui: Screen): void;
  }


  interface GuiNPCNightSetup extends IGuiData, GuiNPCInterface2 {}
  class GuiNPCNightSetup extends IGuiData {
    constructor(npc: EntityNPCInterface);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
    setGuiData(compound: CompoundTag): void;
  }


  interface GuiNPCScenes extends GuiNPCInterface2 {}
  class GuiNPCScenes extends GuiNPCInterface2 {
    constructor(npc: EntityNPCInterface);
    buttonEvent(button: GuiButtonNop): void;
    init(): void;
    save(): void;
    subGuiClosed(gui: Screen): void;
  }


  interface GuiNPCSoundsMenu extends ITextfieldListener, GuiNPCInterface2 {}
  class GuiNPCSoundsMenu extends ITextfieldListener {
    constructor(npc: EntityNPCInterface);
    buttonEvent(button: GuiButtonNop): void;
    init(): void;
    save(): void;
    subGuiClosed(subgui: Screen): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }

}

declare module 'noppes.npcs.client.gui.custom.components' {
  import { AbstractWidget, Button, EditBox } from 'net.minecraft.client.gui.components';
  import { IGuiComponent } from 'noppes.npcs.client.gui.custom.interfaces';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { GuiCustom } from 'noppes.npcs.client.gui.custom';
  import { CustomGuiAssetsSelectorWrapper, CustomGuiButtonWrapper, CustomGuiButtonListWrapper, CustomGuiColoredLineWrapper, CustomGuiEntityDisplayWrapper, CustomGuiItemRendererWrapper, CustomGuiLabelWrapper, CustomGuiScrollWrapper, CustomGuiSliderWrapper, CustomGuiWrapper, CustomGuiTextAreaWrapper, CustomGuiTextFieldWrapper, CustomGuiTexturedRectWrapper } from 'noppes.npcs.api.wrapper.gui';
  import { GuiCustomScrollNop, GuiTextArea } from 'noppes.npcs.shared.client.gui.components';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { ICustomGuiComponent, IItemSlot } from 'noppes.npcs.api.gui';
  import { OnPress } from 'Button';
  import { Entity } from 'net.minecraft.world.entity';
  import { SoundManager } from 'net.minecraft.client.sounds';
  import { Minecraft } from 'net.minecraft.client';
  import { Slot } from 'net.minecraft.world.inventory';
  import { Container } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';

  interface CustomGuiAssetsSelector extends IGuiComponent, AbstractWidget {}
  class CustomGuiAssetsSelector extends IGuiComponent {
    id: number;
    prevResource: ResourceLocation;
    selectedResource: ResourceLocation;
    constructor(parent: GuiCustom, component: CustomGuiAssetsSelectorWrapper);
    charTyped(p_231042_1_: string, p_231042_2_: number): boolean;
    component(): ICustomGuiComponent;
    get iD(): number;
    init(): void;
    keyPressed(p_231046_1_: number, p_231046_2_: number, p_231046_3_: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, mouseScrolled: number, arg4: number): boolean;
    onRender(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    onRenderPost(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    scrollClicked(x: number, y: number, k: number, scroll: GuiCustomScrollNop): void;
    scrollClicked(i: number, j: number, k: number, scroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
    updateWidgetNarration(p_169152_: NarrationElementOutput): void;
  }


  interface CustomGuiButton extends IGuiComponent, Button {}
  class CustomGuiButton extends IGuiComponent {
    component: CustomGuiButtonWrapper;
    id: number;
    constructor(parent: GuiCustom, component: CustomGuiButtonWrapper);
    component(): ICustomGuiComponent;
    get iD(): number;
    init(): void;
    isHovered(mouseX: number, mouseY: number): boolean;
    keyPressed(p_231046_1_: number, p_231046_2_: number, p_231046_3_: number): boolean;
    onPress(): void;
    onRender(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    renderLabel(graphics: GuiGraphics): void;
    setColour(colour: number): void;
  }


  interface CustomGuiButtonList extends CustomGuiButton {}
  class CustomGuiButtonList extends CustomGuiButton {
    constructor(parent: GuiCustom, component: CustomGuiButtonListWrapper);

    constructor(parent: GuiCustom, component: CustomGuiButtonListWrapper, onPress: OnPress);
    init(): void;
    onRender(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface CustomGuiColoredLine extends IGuiComponent, AbstractWidget {}
  class CustomGuiColoredLine extends IGuiComponent {
    component: CustomGuiColoredLineWrapper;
    id: number;
    constructor(parent: GuiCustom, component: CustomGuiColoredLineWrapper);
    component(): ICustomGuiComponent;
    static fromComponent(parent: GuiCustom, component: CustomGuiColoredLineWrapper): CustomGuiColoredLine;
    get iD(): number;
    init(): void;
    mouseDragged(mouseX: number, mouseY: number, mouseButton: number, dx: number, dy: number): boolean;
    onRender(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    updateWidgetNarration(p_169152_: NarrationElementOutput): void;
  }


  interface CustomGuiEntityDisplay extends IGuiComponent, AbstractWidget {}
  class CustomGuiEntityDisplay extends IGuiComponent {
    component: CustomGuiEntityDisplayWrapper;
    id: number;
    constructor(parent: GuiCustom, component: CustomGuiEntityDisplayWrapper);
    component(): ICustomGuiComponent;
    static drawEntity(graphics: GuiGraphics, entity: Entity, x: number, y: number, zoomed: number, rotation: number, xMouse: number, yMouse: number, guiLeft: number, guiTop: number): void;
    static drawEntity(graphics: GuiGraphics, entity: Entity, x: number, y: number, zoomed: number, rotation: number, xMouse: number, yMouse: number, guiLeft: number, guiTop: number, followCursor: boolean): void;
    static fromComponent(parent: GuiCustom, component: CustomGuiEntityDisplayWrapper): CustomGuiEntityDisplay;
    get iD(): number;
    init(): void;
    mouseDragged(mouseX: number, mouseY: number, mouseButton: number, dx: number, dy: number): boolean;
    onRender(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    setEntity(entity: Entity): void;
    updateWidgetNarration(p_169152_: NarrationElementOutput): void;
  }


  interface CustomGuiItemRenderer extends IGuiComponent, AbstractWidget {}
  class CustomGuiItemRenderer extends IGuiComponent {
    component: CustomGuiItemRendererWrapper;
    id: number;
    constructor(parent: GuiCustom, component: CustomGuiItemRendererWrapper);
    component(): ICustomGuiComponent;
    static fromComponent(parent: GuiCustom, component: CustomGuiEntityDisplayWrapper): CustomGuiEntityDisplay;
    get iD(): number;
    init(): void;
    mouseDragged(mouseX: number, mouseY: number, mouseButton: number, dx: number, dy: number): boolean;
    onRender(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface CustomGuiLabel extends IGuiComponent, AbstractWidget {}
  class CustomGuiLabel extends IGuiComponent {
    constructor(parent: GuiCustom, component: CustomGuiLabelWrapper);
    component(): ICustomGuiComponent;
    get iD(): number;
    init(): void;
    onRender(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    playDownSound(p_93665_: SoundManager): void;
    setHeight(height: number): void;
    setText(s: string): void;
  }


  interface CustomGuiScroll extends IGuiComponent, GuiCustomScrollNop {}
  class CustomGuiScroll extends IGuiComponent {
    component: CustomGuiScrollWrapper;
    constructor(parent: GuiCustom, component: CustomGuiScrollWrapper);
    component(): ICustomGuiComponent;
    get iD(): number;
    init(): void;
    onRender(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    scrollClicked(i: number, j: number, k: number, scroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
  }


  interface CustomGuiSlider extends IGuiComponent, AbstractWidget {}
  class CustomGuiSlider extends IGuiComponent {
    id: number;
    static readonly UNSET_FG_COLOR: number;
    constructor(parent: GuiCustom, component: CustomGuiSliderWrapper);
    charTyped(c: string, i: number): boolean;
    clearFGColor(): void;
    component(): ICustomGuiComponent;
    disablePackets(): CustomGuiSlider;
    get fGColor(): number;
    get iD(): number;
    init(): void;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, mouseButton: number, dx: number, dy: number): boolean;
    onClick(x: number, y: number): void;
    onRelease(x: number, y: number): void;
    onRender(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    renderBg(graphics: GuiGraphics, mc: Minecraft, p_146119_2_: number, p_146119_3_: number): void;
    set fGColor(color: number);
    tick(): void;
  }


  interface CustomGuiSlot extends Slot {}
  class CustomGuiSlot extends Slot {
    readonly slot: IItemSlot;
    constructor(gui: CustomGuiWrapper, inventoryIn: Container, id: number, slot: IItemSlot, player: Player);
    set(is: ItemStack): void;
    update(x: number, y: number): CustomGuiSlot;
  }


  interface CustomGuiTextArea extends IGuiComponent, GuiTextArea {}
  class CustomGuiTextArea extends IGuiComponent {
    constructor(parent: GuiCustom, component: CustomGuiTextAreaWrapper);
    charTyped(c: string, i: number): boolean;
    component(): ICustomGuiComponent;
    get iD(): number;
    init(): void;
    keyPressed(p_keyPressed_1_: number, p_keyPressed_2_: number, p_keyPressed_3_: number): boolean;
    onRender(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface CustomGuiTextField extends IGuiComponent, EditBox {}
  class CustomGuiTextField extends IGuiComponent {
    id: number;
    constructor(parent: GuiCustom, component: CustomGuiTextFieldWrapper);
    charTyped(c: string, i: number): boolean;
    component(): ICustomGuiComponent;
    get iD(): number;
    init(): void;
    keyPressed(p_keyPressed_1_: number, p_keyPressed_2_: number, p_keyPressed_3_: number): boolean;
    mouseClicked(i: number, j: number, k: number): boolean;
    onRender(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    playDownSound(p_93665_: SoundManager): void;
    setFocused(bo: boolean): void;
  }


  interface CustomGuiTexturedRect extends IGuiComponent, AbstractWidget {}
  class CustomGuiTexturedRect extends IGuiComponent {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    textureX: number;
    textureY: number;
    hasRepeatingTexture: boolean;
    texRepWidth: number;
    texRepHeight: number;
    texRepBorderSize: number;
    constructor(parent: GuiCustom, component: CustomGuiTexturedRectWrapper);
    component(): ICustomGuiComponent;
    get iD(): number;
    init(): void;
    onRender(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    playDownSound(p_93665_: SoundManager): void;
    setRep(texRepWidth: number, texRepHeight: number, texRepBorderSize: number): CustomGuiTexturedRect;
    setTexture(texture: ResourceLocation): void;
  }

}

declare module 'noppes.npcs.client.gui.custom' {
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { IGuiComponent } from 'noppes.npcs.client.gui.custom.interfaces';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { EntityCustomNpc } from 'noppes.npcs.entity';
  import { GuiCustomScrollNop } from 'noppes.npcs.shared.client.gui.components';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ICustomGuiComponent, IComponentsWrapper, IItemSlot } from 'noppes.npcs.api.gui';
  import { MpmPartData, MpmPart, MpmPartEyes } from 'noppes.npcs.client.parts';
  import { SelectionCallback } from 'noppes.npcs.api.gui.subgui.AssetsGui';
  import { ModelEyeData } from 'noppes.npcs';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { ContainerCustomGui } from 'noppes.npcs.containers';
  import { IGuiData } from 'noppes.npcs.shared.client.gui.listeners';
  import { CustomGuiWrapper, GuiComponentsScrollableWrapper } from 'noppes.npcs.api.wrapper.gui';
  import { List, UUID, Map } from 'java.util';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { InitCallback } from 'noppes.npcs.client.gui.custom.GuiCustom';
  import { Component } from 'net.minecraft.network.chat';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Minecraft } from 'net.minecraft.client';

  interface GuiCreationNewParts extends IGuiComponent, AbstractWidget {}
  class GuiCreationNewParts extends IGuiComponent {
    static readonly buttonsResource: ResourceLocation;
    constructor(parent: GuiCustom, npc: EntityCustomNpc);
    component(): ICustomGuiComponent;
    get iD(): number;
    init(): void;
    mouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
    onRender(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    openEyesSubgui(parent: GuiCustom, data: ModelEyeData, part: MpmPartEyes): void;
    openSubgui(parent: GuiCustom, subgui: GuiCustom): void;
    openTextureBasic(resource: string, callback: SelectionCallback): GuiCustom;
    openTextureSubgui(parent: GuiCustom, data: MpmPartData, part: MpmPart): void;
    save(): void;
    scrollClicked(i: number, j: number, k: number, scroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
  }


  interface GuiCustom extends IGuiData, AbstractContainerScreen<ContainerCustomGui> {}
  class GuiCustom extends IGuiData {
    guiWrapper: CustomGuiWrapper;
    hoverText: List;
    subgui: GuiCustom;
    parent: GuiCustom;
    inv: Inventory;
    initCallback: InitCallback;
    constructor(container: ContainerCustomGui, inv: Inventory, titleIn: Component);
    add(component: IGuiComponent): void;
    addPanel(component: IGuiComponent): void;
    charTyped(typedChar: string, keyCode: number): boolean;
    containerTick(): void;
    get totalGuiLeft(): number;
    get totalGuiTop(): number;
    getComponent(id: UUID): IGuiComponent;
    init(): void;
    isPauseScreen(): boolean;
    keyPressed(key: number, p_keyPressed_2_: number, p_keyPressed_3_: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, mouseButton: number, dx: number, dy: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, mouseButton: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, mouseScrolled: number, arg4: number): boolean;
    onClose(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    resize(minecraft: Minecraft, width: number, height: number): void;
    setGuiData(compound: CompoundTag): void;
    setGuiWrapper(guiWrapper: CustomGuiWrapper): void;
  }


  class GuiCustomComponents {
    static readonly resource: ResourceLocation;
    components: Map;
    charTyped(typedChar: string, keyCode: number): boolean;
    containerTick(): void;
    keyPressed(key: number, p_keyPressed_2_: number, p_keyPressed_3_: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
    mouseDragged(x: number, y: number, button: number, dx: number, dy: number): boolean;
    mouseReleased(x: number, y: number, button: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    renderSlot(graphics: GuiGraphics, slot: IItemSlot): void;
    setComponents(gui: GuiCustom, comps: IComponentsWrapper): void;
  }


  interface GuiCustomScrollingPanel extends GuiCustomComponents {}
  class GuiCustomScrollingPanel extends GuiCustomComponents {
    comps: GuiComponentsScrollableWrapper;
    canScroll(): boolean;
    mouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, mouseButton: number, dx: number, dy: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, mouseButton: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, mouseScrolled: number): boolean;
    panelHovered(x: number, y: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    setComponents(gui: GuiCustom, comps: GuiComponentsScrollableWrapper): void;
    setComponents(gui: GuiCustom, comps: IComponentsWrapper): void;
    setMaxSize(size: number): void;
  }

}

declare module 'noppes.npcs.client.gui.custom.GuiCreationNewParts' {
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { IGuiComponent } from 'noppes.npcs.client.gui.custom.interfaces';
  import { GuiCustom, GuiCreationNewParts } from 'noppes.npcs.client.gui.custom';
  import { MpmPart, MpmPartData, MpmPartEyes } from 'noppes.npcs.client.parts';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ICustomGuiComponent } from 'noppes.npcs.api.gui';
  import { UUID } from 'java.util';
  import { ModelEyeData } from 'noppes.npcs';

  interface GuiMpmPart extends IGuiComponent, AbstractWidget {}
  class GuiMpmPart extends IGuiComponent {
    static readonly SIZE: number;
    basic: boolean;
    constructor(parent: GuiCustom, id: number, x: number, y: number, part: MpmPart);
    component(): ICustomGuiComponent;
    get iD(): number;
    init(): void;
    mouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
    onRender(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    onRenderPost(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    renderIcons(graphics: GuiGraphics, xMouse: number, yMouse: number, tick: number): void;
    renderModel(graphics: GuiGraphics, xMouse: number, yMouse: number, tick: number): void;
    renderWidget(graphics: GuiGraphics, xMouse: number, yMouse: number, tick: number): void;
  }


  interface PartsWrapper extends ICustomGuiComponent {}
  class PartsWrapper extends ICustomGuiComponent {
    constructor(this$0: GuiCreationNewParts, part: GuiMpmPart);
    get enabled(): boolean;
    get height(): number;
    get hoverText(): string[];
    get iD(): number;
    get posX(): number;
    get posY(): number;
    get type(): number;
    get uniqueID(): UUID;
    get visible(): boolean;
    get width(): number;
    hasHoverText(): boolean;
    set enabled(bo: boolean);
    set hoverText(text: string);
    set iD(id: number);
    set visible(bo: boolean);
    setHoverText(text: string[]): ICustomGuiComponent;
    setPos(x: number, y: number): ICustomGuiComponent;
    setSize(width: number, height: number): ICustomGuiComponent;
  }


  interface TexturePart extends GuiCustom {}
  class TexturePart extends GuiCustom {
    constructor(data: MpmPartData, part: MpmPart);
    init(): void;
    onClose(): void;
  }


  interface EyesPart extends GuiCustom {}
  class EyesPart extends GuiCustom {
    constructor(data: ModelEyeData, part: MpmPartEyes);
    init(): void;
    onClose(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    renderBackground(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }

}

declare module 'noppes.npcs.client.gui.custom.GuiCustom' {
  class InitCallback {
    init(): void;
  }

}

declare module 'noppes.npcs.client.gui.custom.interfaces' {
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ICustomGuiComponent } from 'noppes.npcs.api.gui';

  class IGuiComponent {
    component(): ICustomGuiComponent;
    get iD(): number;
    init(): void;
    onRender(var1: GuiGraphics, var2: number, var3: number, var4: number): void;
    onRenderPost(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }

}

declare module 'noppes.npcs.client.gui.global' {
  import { GuiBasic, GuiButtonNop, GuiTextFieldNop, GuiCustomScrollNop, GuiSliderNop } from 'noppes.npcs.shared.client.gui.components';
  import { ITextfieldListener, IScrollData, ICustomScrollListener, IGuiData, ISliderListener, GuiSelectionListener } from 'noppes.npcs.shared.client.gui.listeners';
  import { Dialog, Quest, DialogOption } from 'noppes.npcs.controllers.data';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiContainerNPCInterface2, GuiNPCInterface2, GuiNPCInterface, GuiContainerNPCInterface } from 'noppes.npcs.client.gui.util';
  import { ContainerManageBanks, ContainerManageRecipes, ContainerNpcQuestReward } from 'noppes.npcs.containers';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Vector, Map } from 'java.util';
  import { Integer } from 'java.lang';
  import { Button } from 'net.minecraft.client.gui.components';
  import { EntityNPCInterface } from 'noppes.npcs.entity';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface GuiDialogEdit extends ITextfieldListener, GuiBasic {}
  class GuiDialogEdit extends ITextfieldListener {
    constructor(dialog: Dialog);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
    subGuiClosed(subgui: Screen): void;
    unFocused(guiNpcTextField: GuiTextFieldNop): void;
  }


  interface GuiNPCManageBanks extends IScrollData, ICustomScrollListener, ITextfieldListener, IGuiData, GuiContainerNPCInterface2<ContainerManageBanks> {}
  class GuiNPCManageBanks extends IScrollData {
    constructor(container: ContainerManageBanks, inv: Inventory, titleIn: Component);
    buttonEvent(guibutton: GuiButtonNop): void;
    buttonEvent(guibutton: Button): void;
    init(): void;
    save(): void;
    scrollClicked(i: number, j: number, k: number, guiCustomScroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
    setData(list: Vector<string>, data: Map<string, number>): void;
    setGuiData(compound: CompoundTag): void;
    setSelected(selected: string): void;
    unFocused(guiNpcTextField: GuiTextFieldNop): void;
  }


  interface GuiNPCManageDialogs extends ICustomScrollListener, GuiNPCInterface2 {}
  class GuiNPCManageDialogs extends ICustomScrollListener {
    static Instance: Screen;
    constructor(npc: EntityNPCInterface);
    buttonEvent(guibutton: GuiButtonNop): void;
    close(): void;
    init(): void;
    save(): void;
    scrollClicked(i: number, j: number, k: number, guiCustomScroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
    subGuiClosed(subgui: Screen): void;
  }


  interface GuiNPCManageFactions extends IScrollData, ICustomScrollListener, ITextfieldListener, IGuiData, GuiNPCInterface2 {}
  class GuiNPCManageFactions extends IScrollData {
    constructor(npc: EntityNPCInterface);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
    scrollClicked(i: number, j: number, k: number, guiCustomScroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
    setData(list: Vector<string>, data: Map<string, number>): void;
    setGuiData(compound: CompoundTag): void;
    setSelected(selected: string): void;
    subGuiClosed(subgui: Screen): void;
    unFocused(guiNpcTextField: GuiTextFieldNop): void;
  }


  interface GuiNPCManageLinkedNpc extends IScrollData, GuiNPCInterface2 {}
  class GuiNPCManageLinkedNpc extends IScrollData {
    static Instance: Screen;
    constructor(npc: EntityNPCInterface);
    buttonEvent(button: GuiButtonNop): void;
    init(): void;
    save(): void;
    setData(list: Vector<string>, data: Map<string, number>): void;
    setSelected(selected: string): void;
    subGuiClosed(subgui: Screen): void;
  }


  interface GuiNpcManagePlayerData extends IScrollData, ICustomScrollListener, GuiNPCInterface2 {}
  class GuiNpcManagePlayerData extends IScrollData {
    constructor(npc: EntityNPCInterface, parent: GuiNPCInterface2);
    buttonEvent(guibutton: GuiButtonNop): void;
    charTyped(c: string, i: number): boolean;
    init(): void;
    initButtons(): void;
    mouseClicked(i: number, j: number, k: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    save(): void;
    scrollClicked(i: number, j: number, k: number, guiCustomScroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
    setData(list: Vector<string>, data: Map<string, number>): void;
    setSelected(selected: string): void;
  }


  interface GuiNPCManageQuest extends ICustomScrollListener, GuiNPCInterface2 {}
  class GuiNPCManageQuest extends ICustomScrollListener {
    static Instance: Screen;
    constructor(npc: EntityNPCInterface);
    buttonEvent(guibutton: GuiButtonNop): void;
    close(): void;
    init(): void;
    save(): void;
    scrollClicked(i: number, j: number, k: number, guiCustomScroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
    subGuiClosed(subgui: Screen): void;
  }


  interface GuiNpcManageRecipes extends IScrollData, IGuiData, ICustomScrollListener, ITextfieldListener, GuiContainerNPCInterface2<ContainerManageRecipes> {}
  class GuiNpcManageRecipes extends IScrollData {
    constructor(container: ContainerManageRecipes, inv: Inventory, titleIn: Component);
    buttonEvent(guibutton: GuiButtonNop): void;
    buttonEvent(guibutton: Button): void;
    init(): void;
    save(): void;
    scrollClicked(i: number, j: number, k: number, guiCustomScroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
    setData(list: Vector<string>, data: Map<string, number>): void;
    setGuiData(compound: CompoundTag): void;
    setSelected(selected: string): void;
    unFocused(guiNpcTextField: GuiTextFieldNop): void;
  }


  interface GuiNPCManageTransporters extends IScrollData, GuiNPCInterface {}
  class GuiNPCManageTransporters extends IScrollData {
    constructor(npc: EntityNPCInterface);
    buttonEvent(guibutton: GuiButtonNop): void;
    doubleClicked(): void;
    init(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    save(): void;
    setData(list: Vector<string>, data: Map<string, number>): void;
    setSelected(selected: string): void;
  }


  interface GuiNpcNaturalSpawns extends IGuiData, IScrollData, ITextfieldListener, ICustomScrollListener, ISliderListener, GuiNPCInterface2 {}
  class GuiNpcNaturalSpawns extends IGuiData {
    constructor(npc: EntityNPCInterface);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    mouseDragged(guiNpcSlider: GuiSliderNop): void;
    mouseDragged(x: number, y: number, button: number, dx: number, dy: number): boolean;
    mousePressed(guiNpcSlider: GuiSliderNop): void;
    mouseReleased(guiNpcSlider: GuiSliderNop): void;
    mouseReleased(x: number, y: number, button: number): boolean;
    save(): void;
    scrollClicked(i: number, j: number, k: number, guiCustomScroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
    setData(list: Vector<string>, data: Map<string, number>): void;
    setGuiData(compound: CompoundTag): void;
    setSelected(selected: string): void;
    subGuiClosed(gui: Screen): void;
    unFocused(guiNpcTextField: GuiTextFieldNop): void;
  }


  interface GuiNpcQuestReward extends ITextfieldListener, GuiContainerNPCInterface<ContainerNpcQuestReward> {}
  class GuiNpcQuestReward extends ITextfieldListener {
    constructor(container: ContainerNpcQuestReward, inv: Inventory, titleIn: Component);
    buttonEvent(guibutton: GuiButtonNop): void;
    buttonEvent(guibutton: Button): void;
    init(): void;
    save(): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }


  interface GuiQuestEdit extends GuiSelectionListener, ITextfieldListener, GuiNPCInterface {}
  class GuiQuestEdit extends GuiSelectionListener {
    constructor(quest: Quest);
    buttonEvent(guibutton: GuiButtonNop): void;
    close(): void;
    init(): void;
    save(): void;
    selected(id: number, name: string): void;
    subGuiClosed(subgui: Screen): void;
    unFocused(guiNpcTextField: GuiTextFieldNop): void;
  }


  interface SubGuiNpcDialogOption extends ITextfieldListener, GuiBasic {}
  class SubGuiNpcDialogOption extends ITextfieldListener {
    static LastColor: number;
    constructor(option: DialogOption);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    subGuiClosed(subgui: Screen): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }


  interface SubGuiNpcDialogOptions extends GuiBasic {}
  class SubGuiNpcDialogOptions extends GuiBasic {
    constructor(dialog: Dialog);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
  }

}

declare module 'noppes.npcs.client.gui' {
  import { Toast, ToastComponent } from 'net.minecraft.client.gui.components.toasts';
  import { Component } from 'net.minecraft.network.chat';
  import { Visibility } from 'Toast';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { GuiNPCInterface, GuiNPCInterface2 } from 'noppes.npcs.client.gui.util';
  import { IGuiData, ICustomScrollListener, IScrollData, ITextfieldListener, IGuiInterface, GuiSelectionListener, ISliderListener } from 'noppes.npcs.shared.client.gui.listeners';
  import { BooleanConsumer } from 'it.unimi.dsi.fastutil.booleans';
  import { BlockPos } from 'net.minecraft.core';
  import { GuiButtonNop, GuiCustomScrollNop, GuiTextFieldNop, GuiWrapper, GuiBasic, GuiSliderNop } from 'noppes.npcs.shared.client.gui.components';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Vector, Map } from 'java.util';
  import { Integer } from 'java.lang';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { ContainerMerchantAdd } from 'noppes.npcs.containers';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { EntityNPCInterface } from 'noppes.npcs.entity';
  import { Lines, PlayerMail, Availability, SpawnData, FactionOptions, Faction } from 'noppes.npcs.controllers.data';
  import { DataMelee, DataAI, DataDisplay, DataRanged, DataStats } from 'noppes.npcs.entity.data';
  import { Resistances } from 'noppes.npcs';

  interface GuiAchievement extends Toast {}
  class GuiAchievement extends Toast {
    constructor(titleComponent: Component, subtitleComponent: Component, type: number);
    render(graphics: GuiGraphics, toastGui: ToastComponent, delta: number): Visibility;
  }


  interface GuiBlockBuilder extends IGuiData, ICustomScrollListener, IScrollData, BooleanConsumer, GuiNPCInterface {}
  class GuiBlockBuilder extends IGuiData {
    constructor(pos: BlockPos);
    accept(flag: boolean): void;
    buttonEvent(guibutton: GuiButtonNop): void;
    get blockEntityDimensions(): number;
    get height(): number;
    get length(): number;
    get nBT(): CompoundTag;
    get name(): string;
    get width(): number;
    getBlockEntity(i: number): CompoundTag;
    getBlockState(i: number): BlockState;
    getBlockState(x: number, y: number, z: number): BlockState;
    init(): void;
    save(): void;
    scrollClicked(i: number, j: number, k: number, scroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
    setData(list: Vector<string>, data: Map<string, number>): void;
    setGuiData(compound: CompoundTag): void;
    setSelected(selected: string): void;
  }


  interface GuiBlockCopy extends IGuiData, ITextfieldListener, GuiNPCInterface {}
  class GuiBlockCopy extends IGuiData {
    constructor(pos: BlockPos);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
    setGuiData(compound: CompoundTag): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }


  interface GuiBorderBlock extends IGuiData, GuiNPCInterface {}
  class GuiBorderBlock extends IGuiData {
    constructor(pos: BlockPos);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
    setGuiData(compound: CompoundTag): void;
  }


  interface GuiMerchantAdd extends IGuiInterface, AbstractContainerScreen<ContainerMerchantAdd> {}
  class GuiMerchantAdd extends IGuiInterface {
    constructor(container: ContainerMerchantAdd, inv: Inventory, titleIn: Component);
    buttonEvent(button: GuiButtonNop): void;
    elementClicked(): void;
    get height(): number;
    get parent(): Screen;
    get subGui(): Screen;
    get width(): number;
    get wrapper(): GuiWrapper;
    hasSubGui(): boolean;
    initGui(): void;
    save(): void;
    subGuiClosed(subgui: Screen): void;
  }


  interface GuiNbtBook extends IGuiData, GuiNPCInterface {}
  class GuiNbtBook extends IGuiData {
    constructor(pos: BlockPos);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    save(): void;
    setGuiData(compound: CompoundTag): void;
    subGuiClosed(gui: Screen): void;
  }


  interface GuiNpcDimension extends IScrollData, GuiNPCInterface {}
  class GuiNpcDimension extends IScrollData {
    constructor();
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    mouseClicked(i: number, j: number, k: number): boolean;
    save(): void;
    setData(list: Vector<string>, data: Map<string, number>): void;
    setSelected(selected: string): void;
  }


  interface GuiNPCFactionSelection extends GuiNPCInterface {}
  class GuiNPCFactionSelection extends GuiNPCInterface {
    listener: GuiSelectionListener;
    constructor(npc: EntityNPCInterface, parent: Screen, dialog: number);
    buttonEvent(guibutton: GuiButtonNop): void;
    doubleClicked(): void;
    init(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    save(): void;
  }


  interface GuiNPCLinesEdit extends IGuiData, GuiNPCInterface2 {}
  class GuiNPCLinesEdit extends IGuiData {
    constructor(npc: EntityNPCInterface, lines: Lines);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
    setGuiData(compound: CompoundTag): void;
    subGuiClosed(subgui: Screen): void;
  }


  interface GuiNpcMobSpawner extends IGuiData, GuiNPCInterface {}
  class GuiNpcMobSpawner extends IGuiData {
    constructor(pos: BlockPos);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
    setGuiData(compound: CompoundTag): void;
  }


  interface GuiNpcMobSpawnerAdd extends IGuiData, GuiNPCInterface {}
  class GuiNpcMobSpawnerAdd extends IGuiData {
    constructor(compound: CompoundTag);
    accept(confirm: boolean): void;
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
    setGuiData(compound: CompoundTag): void;
  }


  interface GuiNpcMobSpawnerMounter extends IGuiData, GuiNPCInterface {}
  class GuiNpcMobSpawnerMounter extends IGuiData {
    constructor();
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
    setGuiData(compound: CompoundTag): void;
  }


  interface GuiNpcMobSpawnerSelector extends IGuiData, GuiBasic {}
  class GuiNpcMobSpawnerSelector extends IGuiData {
    activeTab: number;
    constructor();
    buttonEvent(guibutton: GuiButtonNop): void;
    get selected(): string;
    init(): void;
    save(): void;
    setGuiData(compound: CompoundTag): void;
  }


  interface GuiNpcPather extends IGuiData, GuiNPCInterface {}
  class GuiNpcPather extends IGuiData {
    constructor(npc: EntityNPCInterface);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    mouseClicked(i: number, j: number, k: number): boolean;
    save(): void;
    setGuiData(compound: CompoundTag): void;
  }


  interface GuiNpcRedstoneBlock extends IGuiData, GuiNPCInterface {}
  class GuiNpcRedstoneBlock extends IGuiData {
    constructor(pos: BlockPos);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
    setGuiData(compound: CompoundTag): void;
  }


  interface GuiNpcRemoteEditor extends IScrollData, GuiNPCInterface {}
  class GuiNpcRemoteEditor extends IScrollData {
    constructor();
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    mouseClicked(i: number, j: number, k: number): boolean;
    save(): void;
    setData(list: Vector<string>, data: Map<string, number>): void;
    setSelected(selected: string): void;
  }


  interface GuiNPCTransportCategoryEdit extends GuiNPCInterface {}
  class GuiNPCTransportCategoryEdit extends GuiNPCInterface {
    constructor(npc: EntityNPCInterface, parent: Screen, name: string, id: number);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
  }


  interface GuiNpcWaypoint extends IGuiData, GuiNPCInterface {}
  class GuiNpcWaypoint extends IGuiData {
    constructor(pos: BlockPos);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
    setGuiData(compound: CompoundTag): void;
  }


  interface SubGuiColorSelector extends ITextfieldListener, GuiBasic {}
  class SubGuiColorSelector extends ITextfieldListener {
    color: number;
    constructor(color: number);
    buttonEvent(btn: GuiButtonNop): void;
    charTyped(c: string, i: number): boolean;
    get color(): string;
    init(): void;
    mouseClicked(i: number, j: number, k: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }


  interface SubGuiEditText extends GuiBasic {}
  class SubGuiEditText extends GuiBasic {
    text: string;
    cancelled: boolean;
    id: number;
    constructor(text: string);

    constructor(id: number, text: string);
    buttonEvent(button: GuiButtonNop): void;
    init(): void;
    save(): void;
  }


  interface SubGuiMailmanSendSetup extends ITextfieldListener, GuiSelectionListener, GuiBasic {}
  class SubGuiMailmanSendSetup extends ITextfieldListener {
    constructor(mail: PlayerMail);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
    selected(ob: number, name: string): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }


  interface SubGuiNpcAvailability extends ITextfieldListener, GuiSelectionListener, IGuiData, GuiNPCInterface {}
  class SubGuiNpcAvailability extends ITextfieldListener {
    constructor(availabitily: Availability);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    selected(id: number, name: string): void;
    setGuiData(compound: CompoundTag): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }


  interface SubGuiNpcAvailabilityDialog extends GuiBasic {}
  class SubGuiNpcAvailabilityDialog extends GuiBasic {
    constructor(availabitily: Availability);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    subGuiClosed(subgui: Screen): void;
  }


  interface SubGuiNpcAvailabilityQuest extends GuiSelectionListener, GuiBasic {}
  class SubGuiNpcAvailabilityQuest extends GuiSelectionListener {
    constructor(availabitily: Availability);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    selected(id: number, name: string): void;
  }


  interface SubGuiNpcAvailabilityScoreboard extends ITextfieldListener, GuiBasic {}
  class SubGuiNpcAvailabilityScoreboard extends ITextfieldListener {
    constructor(availabitily: Availability);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }


  interface SubGuiNpcBiomes extends GuiBasic {}
  class SubGuiNpcBiomes extends GuiBasic {
    constructor(data: SpawnData);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
  }


  interface SubGuiNpcCommand extends ITextfieldListener, GuiBasic {}
  class SubGuiNpcCommand extends ITextfieldListener {
    command: string;
    constructor(command: string);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }


  interface SubGuiNpcFactionOptions extends IScrollData, ICustomScrollListener, GuiBasic {}
  class SubGuiNpcFactionOptions extends IScrollData {
    constructor(options: FactionOptions);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    scrollClicked(i: number, j: number, k: number, guiCustomScroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
    setData(list: Vector<string>, data: Map<string, number>): void;
    setSelected(selected: string): void;
  }


  interface SubGuiNpcFactionPoints extends ITextfieldListener, GuiBasic {}
  class SubGuiNpcFactionPoints extends ITextfieldListener {
    constructor(faction: Faction);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }


  interface SubGuiNpcMeleeProperties extends ITextfieldListener, GuiBasic {}
  class SubGuiNpcMeleeProperties extends ITextfieldListener {
    constructor(stats: DataMelee);
    buttonEvent(button: GuiButtonNop): void;
    init(): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }


  interface SubGuiNpcMovement extends ITextfieldListener, GuiBasic {}
  class SubGuiNpcMovement extends ITextfieldListener {
    constructor(ai: DataAI);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }


  interface SubGuiNpcName extends ITextfieldListener, IGuiData, GuiBasic {}
  class SubGuiNpcName extends ITextfieldListener {
    constructor(display: DataDisplay);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    setGuiData(compound: CompoundTag): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }


  interface SubGuiNpcProjectiles extends ITextfieldListener, GuiBasic {}
  class SubGuiNpcProjectiles extends ITextfieldListener {
    constructor(stats: DataRanged);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }


  interface SubGuiNpcRangeProperties extends ITextfieldListener, GuiBasic {}
  class SubGuiNpcRangeProperties extends ITextfieldListener {
    constructor(stats: DataStats);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    subGuiClosed(subgui: Screen): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }


  interface SubGuiNpcResistanceProperties extends ISliderListener, GuiBasic {}
  class SubGuiNpcResistanceProperties extends ISliderListener {
    constructor(resistances: Resistances);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    mouseDragged(slider: GuiSliderNop): void;
    mouseDragged(x: number, y: number, button: number, dx: number, dy: number): boolean;
    mousePressed(slider: GuiSliderNop): void;
    mouseReleased(slider: GuiSliderNop): void;
    mouseReleased(x: number, y: number, button: number): boolean;
  }


  interface SubGuiNpcRespawn extends ITextfieldListener, GuiBasic {}
  class SubGuiNpcRespawn extends ITextfieldListener {
    constructor(stats: DataStats);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }

}

declare module 'noppes.npcs.client.gui.mainmenu' {
  import { GuiNPCInterface2, GuiContainerNPCInterface2 } from 'noppes.npcs.client.gui.util';
  import { IGuiData, ITextfieldListener } from 'noppes.npcs.shared.client.gui.listeners';
  import { EntityNPCInterface } from 'noppes.npcs.entity';
  import { GuiButtonNop, GuiTextFieldNop } from 'noppes.npcs.shared.client.gui.components';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ContainerNPCInv } from 'noppes.npcs.containers';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Button } from 'net.minecraft.client.gui.components';

  interface GuiNpcAdvanced extends IGuiData, GuiNPCInterface2 {}
  class GuiNpcAdvanced extends IGuiData {
    constructor(npc: EntityNPCInterface);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
    setGuiData(compound: CompoundTag): void;
  }


  interface GuiNpcAI extends ITextfieldListener, IGuiData, GuiNPCInterface2 {}
  class GuiNpcAI extends ITextfieldListener {
    constructor(npc: EntityNPCInterface);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
    setGuiData(compound: CompoundTag): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }


  interface GuiNpcDisplay extends ITextfieldListener, IGuiData, GuiNPCInterface2 {}
  class GuiNpcDisplay extends ITextfieldListener {
    constructor(npc: EntityNPCInterface);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
    setGuiData(compound: CompoundTag): void;
    subGuiClosed(subgui: Screen): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }


  interface GuiNPCGlobalMainMenu extends GuiNPCInterface2 {}
  class GuiNPCGlobalMainMenu extends GuiNPCInterface2 {
    constructor(npc: EntityNPCInterface);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
  }


  interface GuiNPCInv extends ITextfieldListener, IGuiData, GuiContainerNPCInterface2<ContainerNPCInv> {}
  class GuiNPCInv extends ITextfieldListener {
    constructor(container: ContainerNPCInv, inv: Inventory, titleIn: Component);
    buttonEvent(guibutton: GuiButtonNop): void;
    buttonEvent(guibutton: Button): void;
    init(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    save(): void;
    setGuiData(compound: CompoundTag): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }


  interface GuiNpcStats extends ITextfieldListener, IGuiData, GuiNPCInterface2 {}
  class GuiNpcStats extends ITextfieldListener {
    constructor(npc: EntityNPCInterface);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
    setGuiData(compound: CompoundTag): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }

}

declare module 'noppes.npcs.client.gui.model' {
  import { ICustomScrollListener, ITextfieldListener, ISliderListener } from 'noppes.npcs.shared.client.gui.listeners';
  import { EntityNPCInterface } from 'noppes.npcs.entity';
  import { GuiCustomScrollNop, GuiButtonNop, GuiTextFieldNop, GuiSliderNop, GuiBasic } from 'noppes.npcs.shared.client.gui.components';
  import { Map } from 'java.util';
  import { GuiType } from 'noppes.npcs.client.gui.model.GuiCreationExtra';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { GuiNPCInterface } from 'noppes.npcs.client.gui.util';
  import { ModelData } from 'noppes.npcs';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiCustom } from 'noppes.npcs.client.gui.custom';
  import { ColorCallback } from 'noppes.npcs.client.gui.model.GuiModelColor';

  interface GuiCreationEntities extends ICustomScrollListener, GuiCreationScreenInterface {}
  class GuiCreationEntities extends ICustomScrollListener {
    constructor(npc: EntityNPCInterface);
    init(): void;
    scrollClicked(i: number, j: number, k: number, scroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
  }


  interface GuiCreationExtra extends ICustomScrollListener, ITextfieldListener, GuiCreationScreenInterface {}
  class GuiCreationExtra extends ICustomScrollListener {
    nextAvailableFieldId: number;
    constructor(npc: EntityNPCInterface);
    buttonEvent(btn: GuiButtonNop): void;
    getData(entity: LivingEntity): Map<string, GuiType>;
    init(): void;
    scrollClicked(i: number, j: number, k: number, scroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }


  interface GuiCreationLoad extends ICustomScrollListener, GuiCreationScreenInterface {}
  class GuiCreationLoad extends ICustomScrollListener {
    constructor(npc: EntityNPCInterface);
    buttonEvent(btn: GuiButtonNop): void;
    init(): void;
    scrollClicked(i: number, j: number, k: number, scroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
  }


  interface GuiCreationScale extends ISliderListener, ICustomScrollListener, GuiCreationScreenInterface {}
  class GuiCreationScale extends ISliderListener {
    constructor(npc: EntityNPCInterface);
    buttonEvent(btn: GuiButtonNop): void;
    init(): void;
    mouseDragged(slider: GuiSliderNop): void;
    mouseDragged(x: number, y: number, button: number, dx: number, dy: number): boolean;
    scrollClicked(i: number, j: number, k: number, scroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
  }


  interface GuiCreationScreenInterface extends ISliderListener, GuiNPCInterface {}
  class GuiCreationScreenInterface extends ISliderListener {
    static Message: string;
    entity: LivingEntity;
    active: number;
    xOffset: number;
    playerdata: ModelData;
    constructor(npc: EntityNPCInterface);
    init(): void;
    mouseClicked(i: number, j: number, k: number): boolean;
    mouseDragged(slider: GuiSliderNop): void;
    mouseDragged(x: number, y: number, button: number, dx: number, dy: number): boolean;
    mousePressed(slider: GuiSliderNop): void;
    mouseReleased(slider: GuiSliderNop): void;
    mouseReleased(x: number, y: number, button: number): boolean;
    onClick(x: number, y: number): void;
    onClick(x: number, y: number): void;
    onClick(x: number, y: number): void;
    onClick(x: number, y: number): void;
    onClick(x: number, y: number): void;
    onClick(x: number, y: number): void;
    onClick(x: number, y: number): void;
    onClose(): void;
    openGui(gui: Screen): void;
    render(graphics: GuiGraphics, x: number, y: number, f: number): void;
    save(): void;
    subGuiClosed(subgui: Screen): void;
  }


  interface GuiModelColor extends ITextfieldListener, GuiCustom {}
  class GuiModelColor extends ITextfieldListener {
    color: number;
    constructor(parent: GuiCustom, c: number, callback: ColorCallback);
    get color(): string;
    init(): void;
    mouseClicked(i: number, j: number, k: number): boolean;
    render(graphics: GuiGraphics, par1: number, limbSwingAmount: number, par3: number): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }


  interface GuiPresetSave extends GuiBasic {}
  class GuiPresetSave extends GuiBasic {
    constructor(parent: Screen, data: ModelData);
    buttonEvent(btn: GuiButtonNop): void;
    init(): void;
  }

}

declare module 'noppes.npcs.client.gui.model.GuiCreationExtra' {
  import { GuiCreationExtra } from 'noppes.npcs.client.gui.model';
  import { GuiButtonNop, GuiCustomScrollNop, GuiTextFieldNop } from 'noppes.npcs.shared.client.gui.components';

  class GuiType {
    name: string;
    constructor(this$0: GuiCreationExtra, name: string);
    buttonEvent(button: GuiButtonNop): void;
    init(): void;
    scrollClicked(i: number, j: number, k: number, scroll: GuiCustomScrollNop): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }


  interface GuiTypeBoolean extends GuiType {}
  class GuiTypeBoolean extends GuiType {
    constructor(name: string, bo: boolean);
    buttonEvent(button: GuiButtonNop): void;
    init(): void;
  }


  interface GuiTypeByte extends GuiType {}
  class GuiTypeByte extends GuiType {
    constructor(name: string, b: number);
    buttonEvent(button: GuiButtonNop): void;
    init(): void;
  }


  interface GuiTypeInt extends GuiType {}
  class GuiTypeInt extends GuiType {
    constructor(name: string, b: number);
    init(): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }


  interface GuiTypePixelmon extends GuiType {}
  class GuiTypePixelmon extends GuiType {
    constructor(name: string);
    init(): void;
    scrollClicked(i: number, j: number, k: number, scroll: GuiCustomScrollNop): void;
  }


  interface GuiTypeCobblemon extends GuiType {}
  class GuiTypeCobblemon extends GuiType {
    constructor(name: string);
    init(): void;
    scrollClicked(i: number, j: number, k: number, scroll: GuiCustomScrollNop): void;
  }


  interface GuiTypeDoggyStyle extends GuiType {}
  class GuiTypeDoggyStyle extends GuiType {
    constructor(name: string);
    buttonEvent(button: GuiButtonNop): void;
    init(): void;
  }

}

declare module 'noppes.npcs.client.gui.model.GuiModelColor' {
  class ColorCallback {
    color(var1: number): void;
  }

}

declare module 'noppes.npcs.client.gui.player.companion' {
  import { GuiContainerNPCInterface, GuiNPCInterface } from 'noppes.npcs.client.gui.util';
  import { ContainerNPCCompanion } from 'noppes.npcs.containers';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiButtonNop } from 'noppes.npcs.shared.client.gui.components';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Button } from 'net.minecraft.client.gui.components';
  import { IGuiData } from 'noppes.npcs.shared.client.gui.listeners';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { EntityNPCInterface } from 'noppes.npcs.entity';
  import { RoleCompanion } from 'noppes.npcs.roles';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface GuiNpcCompanionInv extends GuiContainerNPCInterface<ContainerNPCCompanion> {}
  class GuiNpcCompanionInv extends GuiContainerNPCInterface<ContainerNPCCompanion> {
    constructor(container: ContainerNPCCompanion, inv: Inventory, titleIn: Component);
    buttonEvent(guibutton: GuiButtonNop): void;
    buttonEvent(guibutton: Button): void;
    init(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    save(): void;
  }


  interface GuiNpcCompanionStats extends IGuiData, GuiNPCInterface {}
  class GuiNpcCompanionStats extends IGuiData {
    static readonly GUI_ICONS_LOCATION: ResourceLocation;
    constructor(npc: EntityNPCInterface);
    static addTopMenu(role: RoleCompanion, screen: Screen, active: number): void;
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    save(): void;
    setGuiData(compound: CompoundTag): void;
  }


  interface GuiNpcCompanionTalents extends GuiNPCInterface {}
  class GuiNpcCompanionTalents extends GuiNPCInterface {
    constructor(npc: EntityNPCInterface);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    save(): void;
  }

}

declare module 'noppes.npcs.client.gui.player.companion.GuiNpcCompanionTalents' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { RoleCompanion } from 'noppes.npcs.roles';
  import { EnumCompanionTalent } from 'noppes.npcs.constants';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface GuiTalent extends Screen {}
  class GuiTalent extends Screen {
    constructor(role: RoleCompanion, talent: EnumCompanionTalent, x: number, y: number);
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }

}

declare module 'noppes.npcs.client.gui.player' {
  import { GuiNPCInterface, GuiContainerNPCInterface } from 'noppes.npcs.client.gui.util';
  import { IGuiClose, IGuiData, ICustomScrollListener, ITextfieldListener, IGuiError, ITopButtonListener, IScrollData } from 'noppes.npcs.shared.client.gui.listeners';
  import { EntityNPCInterface } from 'noppes.npcs.entity';
  import { Dialog, PlayerMail, Quest } from 'noppes.npcs.controllers.data';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { GuiButtonNop, GuiCustomScrollNop, GuiTextFieldNop } from 'noppes.npcs.shared.client.gui.components';
  import { ContainerMail, ContainerNPCBankInterface, ContainerCarpentryBench, ContainerNPCFollower, ContainerNPCFollowerHire, ContainerNPCTrader } from 'noppes.npcs.containers';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Inventory, Player } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { Button } from 'net.minecraft.client.gui.components';
  import { IQuest } from 'noppes.npcs.api.handler.data';
  import { HashMap, Vector, Map } from 'java.util';
  import { Integer } from 'java.lang';

  interface GuiDialogInteract extends IGuiClose, GuiNPCInterface {}
  class GuiDialogInteract extends IGuiClose {
    constructor(npc: EntityNPCInterface, dialog: Dialog);
    appendDialog(dialog: Dialog): void;
    grabMouse(grab: boolean): void;
    init(): void;
    keyPressed(key: number, p_keyPressed_2_: number, p_keyPressed_3_: number): boolean;
    mouseClicked(i: number, j: number, k: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    save(): void;
    setClose(data: CompoundTag): void;
  }


  interface GuiFaction extends GuiNPCInterface {}
  class GuiFaction extends GuiNPCInterface {
    constructor();
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    save(): void;
  }


  interface GuiMailbox extends IGuiData, ICustomScrollListener, GuiNPCInterface {}
  class GuiMailbox extends IGuiData {
    constructor();
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    mouseClicked(i: number, j: number, k: number): boolean;
    save(): void;
    scrollClicked(i: number, j: number, k: number, guiCustomScroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
    setGuiData(compound: CompoundTag): void;
  }


  interface GuiMailmanWrite extends ITextfieldListener, IGuiError, IGuiClose, GuiContainerNPCInterface<ContainerMail> {}
  class GuiMailmanWrite extends ITextfieldListener {
    static parent: Screen;
    static mail: PlayerMail;
    constructor(container: ContainerMail, inv: Inventory, titleIn: Component);
    buttonEvent(par1GuiButton: GuiButtonNop): void;
    buttonEvent(guibutton: Button): void;
    charTyped(par1: string, limbSwingAmount: number): boolean;
    close(): void;
    containerTick(): void;
    init(): void;
    keyPressed(p_231046_1_: number, p_231046_2_: number, p_231046_3_: number): boolean;
    onClose(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, par3: number): void;
    save(): void;
    setClose(data: CompoundTag): void;
    setError(i: number, data: CompoundTag): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }


  interface GuiNPCBankChest extends IGuiData, GuiContainerNPCInterface<ContainerNPCBankInterface> {}
  class GuiNPCBankChest extends IGuiData {
    constructor(container: ContainerNPCBankInterface, inv: Inventory, titleIn: Component);
    buttonEvent(guibutton: GuiButtonNop): void;
    buttonEvent(guibutton: Button): void;
    init(): void;
    save(): void;
    setGuiData(compound: CompoundTag): void;
  }


  interface GuiNpcCarpentryBench extends GuiContainerNPCInterface<ContainerCarpentryBench> {}
  class GuiNpcCarpentryBench extends GuiContainerNPCInterface<ContainerCarpentryBench> {
    constructor(container: ContainerCarpentryBench, inv: Inventory, titleIn: Component);
    buttonEvent(guibutton: GuiButtonNop): void;
    buttonEvent(guibutton: Button): void;
    init(): void;
    save(): void;
  }


  interface GuiNpcFollower extends IGuiData, GuiContainerNPCInterface<ContainerNPCFollower> {}
  class GuiNpcFollower extends IGuiData {
    constructor(container: ContainerNPCFollower, inv: Inventory, titleIn: Component);
    buttonEvent(guibutton: GuiButtonNop): void;
    buttonEvent(guibutton: Button): void;
    init(): void;
    save(): void;
    setGuiData(compound: CompoundTag): void;
  }


  interface GuiNpcFollowerHire extends GuiContainerNPCInterface<ContainerNPCFollowerHire> {}
  class GuiNpcFollowerHire extends GuiContainerNPCInterface<ContainerNPCFollowerHire> {
    constructor(container: ContainerNPCFollowerHire, inv: Inventory, titleIn: Component);
    buttonEvent(guibutton: GuiButtonNop): void;
    buttonEvent(guibutton: Button): void;
    init(): void;
    save(): void;
  }


  interface GuiNPCTrader extends GuiContainerNPCInterface<ContainerNPCTrader> {}
  class GuiNPCTrader extends GuiContainerNPCInterface<ContainerNPCTrader> {
    constructor(container: ContainerNPCTrader, inv: Inventory, titleIn: Component);
    buttonEvent(button: GuiButtonNop): void;
    buttonEvent(guibutton: Button): void;
    save(): void;
  }


  interface GuiQuestCompletion extends ITopButtonListener, GuiNPCInterface {}
  class GuiQuestCompletion extends ITopButtonListener {
    constructor(quest: IQuest);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    save(): void;
  }


  interface GuiQuestLog extends ITopButtonListener, ICustomScrollListener, GuiNPCInterface {}
  class GuiQuestLog extends ITopButtonListener {
    activeQuests: HashMap;
    selectedQuest: Quest;
    selectedCategory: Component;
    constructor(player: Player);
    init(): void;
    isPauseScreen(): boolean;
    mouseClicked(i: number, j: number, k: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    save(): void;
    scrollClicked(i: number, j: number, k: number, scroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
  }


  interface GuiRecipes extends GuiNPCInterface {}
  class GuiRecipes extends GuiNPCInterface {
    constructor();
    init(): void;
    render(graphics: GuiGraphics, xMouse: number, yMouse: number, f: number): void;
    save(): void;
  }


  interface GuiTransportSelection extends ITopButtonListener, IScrollData, GuiNPCInterface {}
  class GuiTransportSelection extends ITopButtonListener {
    constructor(npc: EntityNPCInterface);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    mouseClicked(i: number, j: number, k: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    save(): void;
    setData(list: Vector<string>, data: Map<string, number>): void;
    setSelected(selected: string): void;
  }

}

declare module 'noppes.npcs.client.gui.player.tabs' {
  import { AbstractButton } from 'net.minecraft.client.gui.components';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';

  interface AbstractTab extends AbstractButton {}
  class AbstractTab extends AbstractButton {
    id: number;
    constructor(id: number, posX: number, posY: number, renderStack: ItemStack);
    init(s: Screen): AbstractTab;
    onClick(mouseX: number, mouseY: number): void;
    onPress(): void;
    onTabClicked(): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    shouldAddToList(): boolean;
  }


  interface InventoryTabFactions extends AbstractTab {}
  class InventoryTabFactions extends AbstractTab {
    constructor();
    onTabClicked(): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    shouldAddToList(): boolean;
  }


  interface InventoryTabQuests extends AbstractTab {}
  class InventoryTabQuests extends AbstractTab {
    displayString: Component;
    constructor();
    onTabClicked(): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    shouldAddToList(): boolean;
  }


  interface InventoryTabVanilla extends AbstractTab {}
  class InventoryTabVanilla extends AbstractTab {
    constructor();
    onTabClicked(): void;
    shouldAddToList(): boolean;
  }

}

declare module 'noppes.npcs.client.gui.questtypes' {
  import { GuiNPCInterface, GuiContainerNPCInterface } from 'noppes.npcs.client.gui.util';
  import { GuiSelectionListener, IGuiData, ITextfieldListener, ICustomScrollListener } from 'noppes.npcs.shared.client.gui.listeners';
  import { EntityNPCInterface } from 'noppes.npcs.entity';
  import { Quest } from 'noppes.npcs.controllers.data';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiButtonNop, GuiTextFieldNop, GuiCustomScrollNop } from 'noppes.npcs.shared.client.gui.components';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ContainerNpcQuestTypeItem } from 'noppes.npcs.containers';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { Button } from 'net.minecraft.client.gui.components';

  interface GuiNpcQuestTypeDialog extends GuiSelectionListener, IGuiData, GuiNPCInterface {}
  class GuiNpcQuestTypeDialog extends GuiSelectionListener {
    constructor(npc: EntityNPCInterface, q: Quest, parent: Screen);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
    selected(id: number, name: string): void;
    setGuiData(compound: CompoundTag): void;
  }


  interface GuiNpcQuestTypeItem extends ITextfieldListener, GuiContainerNPCInterface<ContainerNpcQuestTypeItem> {}
  class GuiNpcQuestTypeItem extends ITextfieldListener {
    constructor(container: ContainerNpcQuestTypeItem, inv: Inventory, titleIn: Component);
    buttonEvent(guibutton: GuiButtonNop): void;
    buttonEvent(guibutton: Button): void;
    init(): void;
    save(): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }


  interface GuiNpcQuestTypeKill extends ITextfieldListener, ICustomScrollListener, GuiNPCInterface {}
  class GuiNpcQuestTypeKill extends ITextfieldListener {
    constructor(npc: EntityNPCInterface, q: Quest, parent: Screen);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    mouseClicked(i: number, j: number, k: number): boolean;
    save(): void;
    scrollClicked(i: number, j: number, k: number, guiCustomScroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
    unFocused(guiNpcTextField: GuiTextFieldNop): void;
  }


  interface GuiNpcQuestTypeLocation extends ITextfieldListener, GuiNPCInterface {}
  class GuiNpcQuestTypeLocation extends ITextfieldListener {
    constructor(npc: EntityNPCInterface, q: Quest, parent: Screen);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }


  interface GuiNpcQuestTypeManual extends ITextfieldListener, GuiNPCInterface {}
  class GuiNpcQuestTypeManual extends ITextfieldListener {
    constructor(npc: EntityNPCInterface, q: Quest, parent: Screen);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
    unFocused(guiNpcTextField: GuiTextFieldNop): void;
  }

}

declare module 'noppes.npcs.client.gui.roles' {
  import { GuiNPCInterface2, GuiContainerNPCInterface2, GuiNPCInterface } from 'noppes.npcs.client.gui.util';
  import { EntityNPCInterface, EntityCustomNpc } from 'noppes.npcs.entity';
  import { GuiButtonNop, GuiCustomScrollNop, GuiTextFieldNop, GuiSliderNop, GuiBasic } from 'noppes.npcs.shared.client.gui.components';
  import { IScrollData, ICustomScrollListener, ITextfieldListener, ISliderListener, GuiSelectionListener, IGuiData } from 'noppes.npcs.shared.client.gui.listeners';
  import { Vector, Map, HashMap } from 'java.util';
  import { Integer } from 'java.lang';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ContainerNPCFollowerSetup, ContainerNpcItemGiver, ContainerNPCTraderSetup } from 'noppes.npcs.containers';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { Button } from 'net.minecraft.client.gui.components';
  import { TransportLocation } from 'noppes.npcs.controllers.data';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface GuiJobFarmer extends GuiNPCInterface2 {}
  class GuiJobFarmer extends GuiNPCInterface2 {
    constructor(npc: EntityNPCInterface);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
  }


  interface GuiNpcBankSetup extends IScrollData, ICustomScrollListener, GuiNPCInterface2 {}
  class GuiNpcBankSetup extends IScrollData {
    constructor(npc: EntityNPCInterface);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    mouseClicked(i: number, j: number, k: number): boolean;
    save(): void;
    scrollClicked(i: number, j: number, k: number, guiCustomScroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
    setData(list: Vector<string>, data: Map<string, number>): void;
    setSelected(selected: string): void;
  }


  interface GuiNpcBard extends GuiNPCInterface2 {}
  class GuiNpcBard extends GuiNPCInterface2 {
    constructor(npc: EntityNPCInterface);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
    subGuiClosed(subgui: Screen): void;
  }


  interface GuiNpcCompanion extends ITextfieldListener, ISliderListener, GuiNPCInterface2 {}
  class GuiNpcCompanion extends ITextfieldListener {
    constructor(npc: EntityNPCInterface);
    buttonEvent(guibutton: GuiButtonNop): void;
    elementClicked(): void;
    init(): void;
    mouseDragged(slider: GuiSliderNop): void;
    mouseDragged(x: number, y: number, button: number, dx: number, dy: number): boolean;
    mousePressed(slider: GuiSliderNop): void;
    mouseReleased(slider: GuiSliderNop): void;
    mouseReleased(x: number, y: number, button: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    save(): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }


  interface GuiNpcConversation extends ITextfieldListener, GuiSelectionListener, GuiNPCInterface2 {}
  class GuiNpcConversation extends ITextfieldListener {
    constructor(npc: EntityNPCInterface);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
    selected(ob: number, name: string): void;
    subGuiClosed(gui: Screen): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }


  interface GuiNpcFollowerJob extends ICustomScrollListener, GuiNPCInterface2 {}
  class GuiNpcFollowerJob extends ICustomScrollListener {
    constructor(npc: EntityNPCInterface);
    init(): void;
    save(): void;
    scrollClicked(i: number, j: number, k: number, guiCustomScroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
  }


  interface GuiNpcFollowerSetup extends GuiContainerNPCInterface2<ContainerNPCFollowerSetup> {}
  class GuiNpcFollowerSetup extends GuiContainerNPCInterface2<ContainerNPCFollowerSetup> {
    constructor(container: ContainerNPCFollowerSetup, inv: Inventory, titleIn: Component);
    buttonEvent(guibutton: GuiButtonNop): void;
    buttonEvent(guibutton: Button): void;
    init(): void;
    save(): void;
  }


  interface GuiNpcGuard extends GuiNPCInterface2 {}
  class GuiNpcGuard extends GuiNPCInterface2 {
    constructor(npc: EntityNPCInterface);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
  }


  interface GuiNpcHealer extends GuiNPCInterface2 {}
  class GuiNpcHealer extends GuiNPCInterface2 {
    constructor(npc: EntityNPCInterface);
    buttonEvent(guibutton: GuiButtonNop): void;
    elementClicked(): void;
    init(): void;
    save(): void;
  }


  interface GuiNpcItemGiver extends GuiContainerNPCInterface2<ContainerNpcItemGiver> {}
  class GuiNpcItemGiver extends GuiContainerNPCInterface2<ContainerNpcItemGiver> {
    constructor(container: ContainerNpcItemGiver, inv: Inventory, titleIn: Component);
    buttonEvent(guibutton: GuiButtonNop): void;
    buttonEvent(guibutton: Button): void;
    init(): void;
    save(): void;
  }


  interface GuiNpcPuppet extends ISliderListener, ICustomScrollListener, GuiNPCInterface {}
  class GuiNpcPuppet extends ISliderListener {
    data: HashMap;
    constructor(parent: Screen, npc: EntityCustomNpc);
    buttonEvent(btn: GuiButtonNop): void;
    close(): void;
    init(): void;
    mouseDragged(slider: GuiSliderNop): void;
    mouseDragged(x: number, y: number, button: number, dx: number, dy: number): boolean;
    mousePressed(slider: GuiSliderNop): void;
    mouseReleased(slider: GuiSliderNop): void;
    mouseReleased(x: number, y: number, button: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    save(): void;
    scrollClicked(i: number, j: number, k: number, guiCustomScroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
  }


  interface GuiNpcSpawner extends ITextfieldListener, GuiNPCInterface2 {}
  class GuiNpcSpawner extends ITextfieldListener {
    constructor(npc: EntityNPCInterface);
    buttonEvent(guibutton: GuiButtonNop): void;
    elementClicked(): void;
    init(): void;
    save(): void;
    subGuiClosed(gui: Screen): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }


  interface GuiNpcTraderSetup extends ITextfieldListener, GuiContainerNPCInterface2<ContainerNPCTraderSetup> {}
  class GuiNpcTraderSetup extends ITextfieldListener {
    constructor(container: ContainerNPCTraderSetup, inv: Inventory, titleIn: Component);
    buttonEvent(guibutton: GuiButtonNop): void;
    buttonEvent(guibutton: Button): void;
    init(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    save(): void;
    unFocused(guiNpcTextField: GuiTextFieldNop): void;
  }


  interface GuiNpcTransporter extends IScrollData, IGuiData, GuiNPCInterface2 {}
  class GuiNpcTransporter extends IScrollData {
    location: TransportLocation;
    constructor(npc: EntityNPCInterface);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
    setData(list: Vector<string>, data: Map<string, number>): void;
    setGuiData(compound: CompoundTag): void;
    setSelected(selected: string): void;
  }


  interface GuiRoleDialog extends GuiNPCInterface2 {}
  class GuiRoleDialog extends GuiNPCInterface2 {
    constructor(npc: EntityNPCInterface);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
    subGuiClosed(subgui: Screen): void;
  }


  interface SubGuiNpcConversationLine extends ITextfieldListener, GuiBasic {}
  class SubGuiNpcConversationLine extends ITextfieldListener {
    line: string;
    sound: string;
    constructor(line: string, sound: string);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    subGuiClosed(subgui: Screen): void;
    unFocused(textfield: GuiTextFieldNop): void;
  }

}

declare module 'noppes.npcs.client.gui.script' {
  import { EntityNPCInterface } from 'noppes.npcs.entity';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { BlockPos } from 'net.minecraft.core';
  import { GuiNPCInterface } from 'noppes.npcs.client.gui.util';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { GuiButtonNop, GuiCustomScrollNop, GuiBasic } from 'noppes.npcs.shared.client.gui.components';
  import { IGuiData, ITextChangeListener } from 'noppes.npcs.shared.client.gui.listeners';
  import { IScriptHandler, ScriptContainer } from 'noppes.npcs.controllers';
  import { Map, List } from 'java.util';
  import { Player } from 'net.minecraft.world.entity.player';

  interface GuiScript extends GuiScriptInterface {}
  class GuiScript extends GuiScriptInterface {
    constructor(npc: EntityNPCInterface);
    save(): void;
    setGuiData(compound: CompoundTag): void;
  }


  interface GuiScriptBlock extends GuiScriptInterface {}
  class GuiScriptBlock extends GuiScriptInterface {
    constructor(pos: BlockPos);
    save(): void;
    setGuiData(compound: CompoundTag): void;
  }


  interface GuiScriptDoor extends GuiScriptInterface {}
  class GuiScriptDoor extends GuiScriptInterface {
    constructor(pos: BlockPos);
    save(): void;
    setGuiData(compound: CompoundTag): void;
  }


  interface GuiScriptForge extends GuiScriptInterface {}
  class GuiScriptForge extends GuiScriptInterface {
    constructor();
    save(): void;
    setGuiData(compound: CompoundTag): void;
  }


  interface GuiScriptGlobal extends GuiNPCInterface {}
  class GuiScriptGlobal extends GuiNPCInterface {
    constructor();
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    save(): void;
  }


  interface GuiScriptInterface extends IGuiData, ITextChangeListener, GuiNPCInterface {}
  class GuiScriptInterface extends IGuiData {
    handler: IScriptHandler;
    languages: Map;
    methods: List;
    showFunctions: boolean;
    constructor();
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
    scrollClicked(i: number, j: number, k: number, scroll: GuiCustomScrollNop): void;
    scrollClicked(i: number, j: number, k: number, scroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
    setGuiData(compound: CompoundTag): void;
    textUpdate(text: string): void;
  }


  interface GuiScriptItem extends GuiScriptInterface {}
  class GuiScriptItem extends GuiScriptInterface {
    constructor(player: Player);
    save(): void;
    setGuiData(compound: CompoundTag): void;
  }


  interface GuiScriptList extends GuiBasic {}
  class GuiScriptList extends GuiBasic {
    constructor(scripts: string[], container: ScriptContainer);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    save(): void;
  }


  interface GuiScriptPlayers extends GuiScriptInterface {}
  class GuiScriptPlayers extends GuiScriptInterface {
    constructor();
    save(): void;
    setGuiData(compound: CompoundTag): void;
  }

}

declare module 'noppes.npcs.client.gui.select' {
  import { GuiBasic, GuiCustomScrollNop, GuiButtonNop } from 'noppes.npcs.shared.client.gui.components';
  import { ICustomScrollListener } from 'noppes.npcs.shared.client.gui.listeners';
  import { Dialog, Quest } from 'noppes.npcs.controllers.data';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { GuiNPCInterface } from 'noppes.npcs.client.gui.util';
  import { EntityNPCInterface } from 'noppes.npcs.entity';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface GuiDialogSelection extends ICustomScrollListener, GuiBasic {}
  class GuiDialogSelection extends ICustomScrollListener {
    selectedDialog: Dialog;
    constructor(dialog: number);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    scrollClicked(i: number, j: number, k: number, guiCustomScroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
  }


  interface GuiQuestSelection extends ICustomScrollListener, GuiBasic {}
  class GuiQuestSelection extends ICustomScrollListener {
    selectedQuest: Quest;
    constructor(quest: number);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    scrollClicked(i: number, j: number, k: number, guiCustomScroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
  }


  interface GuiSoundSelection extends ICustomScrollListener, GuiBasic {}
  class GuiSoundSelection extends ICustomScrollListener {
    selectedResource: ResourceLocation;
    constructor(sound: string);
    buttonEvent(guibutton: GuiButtonNop): void;
    init(): void;
    scrollClicked(i: number, j: number, k: number, scroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
  }


  interface GuiTextureSelection extends ICustomScrollListener, GuiNPCInterface {}
  class GuiTextureSelection extends ICustomScrollListener {
    selectedResource: ResourceLocation;
    constructor(npc: EntityNPCInterface, texture: string, type: number);
    buttonEvent(guibutton: GuiButtonNop): void;
    static clear(): void;
    init(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    scrollClicked(i: number, j: number, k: number, scroll: GuiCustomScrollNop): void;
    scrollDoubleClicked(selection: string, scroll: GuiCustomScrollNop): void;
  }

}

declare module 'noppes.npcs.client.gui.util' {
  import { GuiBasicContainer, GuiBasic } from 'noppes.npcs.shared.client.gui.components';
  import { EntityNPCInterface } from 'noppes.npcs.entity';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { IGuiInterface } from 'noppes.npcs.shared.client.gui.listeners';
  import { Minecraft } from 'net.minecraft.client';
  import { ItemStack } from 'net.minecraft.world.item';
  import { List, Optional } from 'java.util';
  import { TooltipComponent } from 'net.minecraft.world.inventory.tooltip';
  import { FormattedCharSequence } from 'net.minecraft.util';
  import { ClientTooltipPositioner } from 'net.minecraft.client.gui.screens.inventory.tooltip';

  interface GuiContainerNPCInterface<T extends AbstractContainerMenu = any> extends GuiBasicContainer<T> {}
  class GuiContainerNPCInterface<T extends AbstractContainerMenu = any> extends GuiBasicContainer<T> {
    npc: EntityNPCInterface;
    constructor(npc: EntityNPCInterface, cont: T, inv: Inventory, titleIn: Component);
    drawNpc(graphics: GuiGraphics, x: number, y: number): void;
  }


  interface GuiContainerNPCInterface2<T extends AbstractContainerMenu = any> extends GuiContainerNPCInterface<T> {}
  class GuiContainerNPCInterface2<T extends AbstractContainerMenu = any> extends GuiContainerNPCInterface<T> {
    menuYOffset: number;
    constructor(npc: EntityNPCInterface, cont: T, inv: Inventory, titleIn: Component);

    constructor(npc: EntityNPCInterface, cont: T, inv: Inventory, titleIn: Component, activeMenu: number);
    delete(): void;
    getResource(texture: string): ResourceLocation;
    init(): void;
    mouseClicked(i: number, j: number, k: number): boolean;
    setBackground(texture: string): void;
  }


  interface GuiNPCInterface extends GuiBasic {}
  class GuiNPCInterface extends GuiBasic {
    npc: EntityNPCInterface;
    constructor(npc: EntityNPCInterface);

    constructor();
    drawNpc(graphics: GuiGraphics, x: number, y: number): void;
    drawNpc(graphics: GuiGraphics, entity: LivingEntity, x: number, y: number, zoomed: number, rotation: number): void;
    setSubGui(gui: Screen): void;
  }


  interface GuiNPCInterface2 extends GuiNPCInterface {}
  class GuiNPCInterface2 extends GuiNPCInterface {
    constructor(npc: EntityNPCInterface);

    constructor(npc: EntityNPCInterface, activeMenu: number);
    init(): void;
    mouseClicked(i: number, j: number, k: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    save(): void;
  }


  class GuiNpcMenu {
    constructor(parent: IGuiInterface, activeMenu: number, npc: EntityNPCInterface);
    accept(flag: boolean): void;
    drawElements(graphics: GuiGraphics, font: Font, i: number, j: number, mc: Minecraft, f: number): void;
    initGui(guiLeft: number, guiTop: number, width: number): void;
    mouseClicked(i: number, j: number, k: number): boolean;
    onClick(x: number, y: number): void;
    onClick(x: number, y: number): void;
    onClick(x: number, y: number): void;
    onClick(x: number, y: number): void;
    onClick(x: number, y: number): void;
    onClick(x: number, y: number): void;
    onClick(x: number, y: number): void;
    onClick(x: number, y: number): void;
  }


  class GuiTooltipUtils {
    static renderTooltip(graphics: GuiGraphics, p_282308_: Font, p_282781_: ItemStack, p_282687_: number, p_282292_: number): void;
    static renderTooltip(graphics: GuiGraphics, font: Font, textComponents: Component[], tooltipComponent: Optional<TooltipComponent>, stack: ItemStack, mouseX: number, mouseY: number): void;
    static renderTooltip(graphics: GuiGraphics, p_283128_: Font, tooltipLines: Component[], visualTooltipComponent: Optional<TooltipComponent>, p_283678_: number, p_281696_: number): void;
    static renderTooltip(graphics: GuiGraphics, p_282269_: Font, p_282572_: Component, p_282044_: number, p_282545_: number): void;
    static renderTooltip(graphics: GuiGraphics, p_282192_: Font, p_282297_: FormattedCharSequence[], p_281680_: number, p_283325_: number): void;
    static renderTooltip(graphics: GuiGraphics, p_281627_: Font, p_283313_: FormattedCharSequence[], p_283571_: ClientTooltipPositioner, p_282367_: number, p_282806_: number): void;
  }

}

declare module 'noppes.npcs.client.layer' {
  import { LivingEntityRenderer } from 'net.minecraft.client.renderer.entity';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource, RenderType } from 'net.minecraft.client.renderer';
  import { Entity, LivingEntity } from 'net.minecraft.world.entity';
  import { RenderLayer } from 'net.minecraft.client.renderer.entity.layers';
  import { RenderCustomNpc } from 'noppes.npcs.client.renderer';
  import { EntityCustomNpc } from 'noppes.npcs.entity';
  import { ModelPartData, ModelData } from 'noppes.npcs';
  import { HumanoidModel } from 'net.minecraft.client.model';
  import { NopModelPart } from 'noppes.npcs.shared.client.model';
  import { MpmPartData, MpmPartAbstractClient } from 'noppes.npcs.client.parts';
  import { ModelNpcSlime } from 'noppes.npcs.client.model';

  interface LayerBackItem extends LayerInterface {}
  class LayerBackItem extends LayerInterface {
    constructor(render: LivingEntityRenderer);
    render(mStack: PoseStack, typeBuffer: MultiBufferSource, lightmapUV: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, age: number, netHeadYaw: number, headPitch: number): void;
    render(matrixStackIn: PoseStack, bufferIn: MultiBufferSource, packedLightIn: number, entity: Entity, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
    rotate(matrixStack: PoseStack, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface LayerGlow<T extends EntityNPCInterface = any, M extends EntityModel<T> = any> extends RenderLayer<T, M> {}
  class LayerGlow<T extends EntityNPCInterface = any, M extends EntityModel<T> = any> extends RenderLayer<T, M> {
    constructor(npcRenderer: RenderCustomNpc);
    render(matrixStackIn: PoseStack, typeBuffer: MultiBufferSource, packedLightIn: number, npc: T, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface LayerHeadwear extends LayerPreRender, LayerInterface {}
  class LayerHeadwear extends LayerPreRender {
    constructor(render: LivingEntityRenderer);
    preRender(npc: EntityCustomNpc): void;
    preRender(data: ModelPartData): void;
    render(mStack: PoseStack, typeBuffer: MultiBufferSource, lightmapUV: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, age: number, netHeadYaw: number, headPitch: number): void;
    render(matrixStackIn: PoseStack, bufferIn: MultiBufferSource, packedLightIn: number, entity: Entity, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
    rotate(matrixStack: PoseStack, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface LayerInterface extends RenderLayer {}
  class LayerInterface extends RenderLayer {
    base: HumanoidModel;
    constructor(render: LivingEntityRenderer);
    blend(color1: number, color2: number, ratio: number): number;
    getRenderType(data: ModelPartData): RenderType;
    preRender(data: ModelPartData): void;
    render(matrixStackIn: PoseStack, bufferIn: MultiBufferSource, packedLightIn: number, entity: Entity, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
    render(var1: PoseStack, var2: MultiBufferSource, var3: number, var4: number, var5: number, var6: number, var7: number, var8: number, var9: number): void;
    rotate(var1: PoseStack, var2: number, var3: number, var4: number, var5: number, var6: number, var7: number): void;
    setColor(data: ModelPartData, entity: LivingEntity): void;
    setRotation(model: NopModelPart, x: number, y: number, z: number): void;
  }


  interface LayerNpcCloak extends LayerInterface {}
  class LayerNpcCloak extends LayerInterface {
    constructor(render: LivingEntityRenderer);
    render(mStack: PoseStack, typeBuffer: MultiBufferSource, lightmapUV: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, age: number, netHeadYaw: number, headPitch: number): void;
    render(matrixStackIn: PoseStack, bufferIn: MultiBufferSource, packedLightIn: number, entity: Entity, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
    rotate(matrixStack: PoseStack, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface LayerParts<T extends EntityCustomNpc = any, M extends HumanoidModel<T> = any> extends RenderLayer<T, M> {}
  class LayerParts<T extends EntityCustomNpc = any, M extends HumanoidModel<T> = any> extends RenderLayer<T, M> {
    constructor(render: LivingEntityRenderer<T, M>);
    render(mStack: PoseStack, typeBuffer: MultiBufferSource, lightmapUV: number, player: EntityCustomNpc, limbSwing: number, limbSwingAmount: number, partialTicks: number, age: number, netHeadYaw: number, headPitch: number): void;
    static renderPart(data: MpmPartData, partc: MpmPartAbstractClient, mStack: PoseStack, typeBuffer: MultiBufferSource, lightmapUV: number, player: EntityCustomNpc, model: HumanoidModel, pdata: ModelData): void;
  }


  class LayerPreRender {
    preRender(var1: EntityCustomNpc): void;
  }


  interface LayerSlimeNpc<T extends EntityNpcSlime = any> extends RenderLayer<T, ModelNpcSlime> {}
  class LayerSlimeNpc<T extends EntityNpcSlime = any> extends RenderLayer<T, ModelNpcSlime> {
    constructor(renderer: LivingEntityRenderer);
    render(matrixStackIn: PoseStack, bufferIn: MultiBufferSource, packedLightIn: number, living: T, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }

}

declare module 'noppes.npcs.client.model.animation' {
  import { Entity, LivingEntity } from 'net.minecraft.world.entity';
  import { HumanoidModel } from 'net.minecraft.client.model';
  import { ModelData } from 'noppes.npcs';
  import { HashMap } from 'java.util';
  import { Integer } from 'java.lang';

  interface AniAim extends AnimationBase {}
  class AniAim extends AnimationBase {
    animatePost(limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, entity: Entity, model: HumanoidModel, animationStart: number): void;
    animatePre(limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, entity: Entity, model: HumanoidModel, animationStart: number): void;
  }


  interface AniBlank extends AnimationBase {}
  class AniBlank extends AnimationBase {
    animatePost(limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, entity: Entity, model: HumanoidModel, animationStart: number): void;
    animatePre(limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, entity: Entity, model: HumanoidModel, animationStart: number): void;
  }


  interface AniBow extends AnimationBase {}
  class AniBow extends AnimationBase {
    animatePost(limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, entity: Entity, model: HumanoidModel, animationStart: number): void;
    animatePre(limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, entity: Entity, model: HumanoidModel, animationStart: number): void;
  }


  interface AniCrawling extends AnimationBase {}
  class AniCrawling extends AnimationBase {
    animatePost(limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, entity: Entity, model: HumanoidModel, animationStart: number): void;
    animatePre(limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, entity: Entity, model: HumanoidModel, animationStart: number): void;
  }


  interface AniDancing extends AnimationBase {}
  class AniDancing extends AnimationBase {
    animatePost(limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, entity: Entity, model: HumanoidModel, animationStart: number): void;
    animatePre(limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, entity: Entity, model: HumanoidModel, animationStart: number): void;
  }


  interface AniHug extends AnimationBase {}
  class AniHug extends AnimationBase {
    animatePost(limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, entity: Entity, model: HumanoidModel, animationStart: number): void;
    animatePre(limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, entity: Entity, model: HumanoidModel, animationStart: number): void;
  }


  class AnimationBase {
    animatePost(var1: number, var2: number, var3: number, var4: number, var5: number, var6: Entity, var7: HumanoidModel, var8: number): void;
    animatePre(var1: number, var2: number, var3: number, var4: number, var5: number, var6: Entity, var7: HumanoidModel, var8: number): void;
  }


  class AnimationHandler {
    static addAnimation(enumAnimation: number, animationBase: AnimationBase): void;
    static animateBipedPost(data: ModelData, bipedModel: HumanoidModel, livingEntity: LivingEntity, limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
    static animateBipedPre(data: ModelData, bipedModel: HumanoidModel, livingEntity: LivingEntity, limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
    animatePost(limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, entity: Entity, model: HumanoidModel, animationStart: number): void;
    animatePost(limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, entity: Entity, model: HumanoidModel, animationStart: number): void;
    animatePost(limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, entity: Entity, model: HumanoidModel, animationStart: number): void;
    animatePre(limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, entity: Entity, model: HumanoidModel, animationStart: number): void;
    animatePre(limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, entity: Entity, model: HumanoidModel, animationStart: number): void;
    animatePre(limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, entity: Entity, model: HumanoidModel, animationStart: number): void;
    static get allAnimations(): HashMap<number, AnimationBase>;
    static getAnimationFor(animation: number): AnimationBase;
  }


  interface AniNo extends AnimationBase {}
  class AniNo extends AnimationBase {
    animatePost(limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, entity: Entity, model: HumanoidModel, animationStart: number): void;
    animatePre(limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, entity: Entity, model: HumanoidModel, animationStart: number): void;
  }


  interface AniPoint extends AnimationBase {}
  class AniPoint extends AnimationBase {
    animatePost(limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, entity: Entity, model: HumanoidModel, animationStart: number): void;
    animatePre(limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, entity: Entity, model: HumanoidModel, animationStart: number): void;
  }


  interface AniWaving extends AnimationBase {}
  class AniWaving extends AnimationBase {
    animatePost(limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, entity: Entity, model: HumanoidModel, animationStart: number): void;
    animatePre(limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, entity: Entity, model: HumanoidModel, animationStart: number): void;
  }


  interface AniYes extends AnimationBase {}
  class AniYes extends AnimationBase {
    animatePost(limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, entity: Entity, model: HumanoidModel, animationStart: number): void;
    animatePre(limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, entity: Entity, model: HumanoidModel, animationStart: number): void;
  }

}

declare module 'noppes.npcs.client.model.blocks' {
  import { Model } from 'net.minecraft.client.model';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';

  interface ModelCarpentryBench extends Model {}
  class ModelCarpentryBench extends Model {
    constructor();
    renderToBuffer(mStack: PoseStack, iVertex: VertexConsumer, lightmapUV: number, packedOverlayIn: number, color: number): void;
  }


  interface ModelMailboxUS extends Model {}
  class ModelMailboxUS extends Model {
    constructor();
    renderToBuffer(mStack: PoseStack, iVertex: VertexConsumer, lightmapUV: number, packedOverlayIn: number, color: number): void;
  }


  interface ModelMailboxWow extends Model {}
  class ModelMailboxWow extends Model {
    constructor();
    renderToBuffer(mStack: PoseStack, iVertex: VertexConsumer, lightmapUV: number, packedOverlayIn: number, color: number): void;
  }

}

declare module 'noppes.npcs.client.model' {
  import { PlayerModel, EntityModel, Model } from 'net.minecraft.client.model';
  import { ModelPart } from 'net.minecraft.client.model.geom';
  import { NopModelPart, ModelPlaneRenderer } from 'noppes.npcs.shared.client.model';
  import { NopVector3f } from 'noppes.npcs.shared.common.util';
  import { Entity } from 'net.minecraft.world.entity';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { ModelPartConfig } from 'noppes.npcs';
  import { EnumParts } from 'noppes.npcs.constants';

  interface ModelClassicPlayer<T extends LivingEntity = any> extends PlayerModel<T> {}
  class ModelClassicPlayer<T extends LivingEntity = any> extends PlayerModel<T> {
    constructor(p_170821_: ModelPart, scale: number);
    setupAnim(entity: T, par1: number, limbSwingAmount: number, par3: number, par4: number, par5: number): void;
  }


  interface ModelHeadwear extends ModelScaleRenderer {}
  class ModelHeadwear extends ModelScaleRenderer {
    constructor();
    setRotation(model: NopModelPart, x: number, y: number, z: number): void;
    setRotation(rotate: NopVector3f): NopModelPart;
  }


  interface ModelNpcCrystal extends EntityModel {}
  class ModelNpcCrystal extends EntityModel {
    constructor();
    prepareMobModel(par1EntityLiving: Entity, f6: number, f5: number, par9: number): void;
    renderToBuffer(mStack: PoseStack, ivertex: VertexConsumer, lightmapUV: number, packedOverlayIn: number, color: number): void;
    setupAnim(p_225597_1_: Entity, p_225597_2_: number, p_225597_3_: number, p_225597_4_: number, p_225597_5_: number, p_225597_6_: number): void;
  }


  interface ModelNpcDragon<T extends Entity = any> extends EntityModel<T> {}
  class ModelNpcDragon<T extends Entity = any> extends EntityModel<T> {
    constructor();
    prepareMobModel(entityliving: Entity, animationPos: number, animationSpeed: number, f2: number): void;
    renderToBuffer(mStack: PoseStack, iVertex: VertexConsumer, lightmapUV: number, packedOverlayIn: number, color: number): void;
    setupAnim(p_225597_1_: Entity, p_225597_2_: number, p_225597_3_: number, p_225597_4_: number, p_225597_5_: number, p_225597_6_: number): void;
  }


  interface ModelNPCGolem extends EntityModel {}
  class ModelNPCGolem extends EntityModel {
    head: NopModelPart;
    hat: NopModelPart;
    body: NopModelPart;
    rightArm: NopModelPart;
    leftArm: NopModelPart;
    rightLeg: NopModelPart;
    leftLeg: NopModelPart;
    constructor(scale: number);
    init(f: number, f1: number): void;
    renderToBuffer(mStack: PoseStack, iVertex: VertexConsumer, lightmapUV: number, packedOverlayIn: number, color: number): void;
    setupAnim(entity: Entity, par1: number, limbSwingAmount: number, par3: number, par4: number, par5: number): void;
  }


  interface ModelNpcSlime<T extends EntityNpcSlime = any> extends EntityModel<T> {}
  class ModelNpcSlime<T extends EntityNpcSlime = any> extends EntityModel<T> {
    constructor(par1: number);
    renderToBuffer(mStack: PoseStack, iVertex: VertexConsumer, lightmapUV: number, packedOverlayIn: number, color: number): void;
    setupAnim(entityIn: T, limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface ModelPlayer64x32 extends PlayerModel {}
  class ModelPlayer64x32 extends PlayerModel {
    constructor(part: ModelPart);
  }


  interface ModelPony<T extends EntityNpcPony = any> extends EntityModel<T> {}
  class ModelPony<T extends EntityNpcPony = any> extends EntityModel<T> {
    Head: NopModelPart;
    Headpiece: NopModelPart[];
    Helmet: NopModelPart;
    Body: NopModelPart;
    Bodypiece: ModelPlaneRenderer[];
    RightArm: NopModelPart;
    LeftArm: NopModelPart;
    RightLeg: NopModelPart;
    LeftLeg: NopModelPart;
    unicornarm: NopModelPart;
    Tail: ModelPlaneRenderer[];
    LeftWing: NopModelPart[];
    RightWing: NopModelPart[];
    LeftWingExt: NopModelPart[];
    RightWingExt: NopModelPart[];
    isPegasus: boolean;
    isUnicorn: boolean;
    isFlying: boolean;
    isGlow: boolean;
    isSleeping: boolean;
    isSneak: boolean;
    aimedBow: boolean;
    heldItemRight: number;
    constructor();
    init(strech: number, f: number): void;
    renderToBuffer(mStack: PoseStack, iVertex: VertexConsumer, lightmapUV: number, packedOverlayIn: number, color: number): void;
    setupAnim(npc: T, limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface ModelPonyArmor extends EntityModel {}
  class ModelPonyArmor extends EntityModel {
    head: NopModelPart;
    Body: NopModelPart;
    BodyBack: NopModelPart;
    rightarm: NopModelPart;
    LeftArm: NopModelPart;
    RightLeg: NopModelPart;
    LeftLeg: NopModelPart;
    rightarm2: NopModelPart;
    LeftArm2: NopModelPart;
    RightLeg2: NopModelPart;
    LeftLeg2: NopModelPart;
    isPegasus: boolean;
    isUnicorn: boolean;
    isSleeping: boolean;
    isFlying: boolean;
    isGlow: boolean;
    isSneak: boolean;
    aimedBow: boolean;
    heldItemRight: number;
    constructor(f: number);
    init(strech: number, f: number): void;
    renderToBuffer(mStack: PoseStack, iVertex: VertexConsumer, lightmapUV: number, packedOverlayIn: number, color: number): void;
    setupAnim(entity: Entity, aniPosition: number, aniSpeed: number, age: number, yHead: number, xHead: number): void;
  }


  interface ModelScaleRenderer extends NopModelPart {}
  class ModelScaleRenderer extends NopModelPart {
    isCompiled: boolean;
    displayList: number;
    config: ModelPartConfig;
    part: EnumParts;
    constructor(base: Model, part: EnumParts);

    constructor(par1Model: Model, par2: number, par3: number, part: EnumParts);
    translateAndRotate(mStack: PoseStack): void;
  }

}

declare module 'noppes.npcs.client.overlay' {
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { IOverlay, ILabel, IRenderItemOverlay, ITexturedRect } from 'noppes.npcs.api.overlay';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ResourceLocation } from 'net.minecraft.resources';

  class IOverlayRenderComponent {
    render(var1: GuiGraphics, var2: number): void;
  }


  class Overlay {
    constructor(overlay: IOverlay);
    render(graphics: GuiGraphics): void;
  }


  interface OverlayLabelComponent extends IOverlayRenderComponent {}
  class OverlayLabelComponent extends IOverlayRenderComponent {
    constructor(label: ILabel);
    render(graphics: GuiGraphics, linkSide: number): void;
    renderString(graphics: GuiGraphics, text: string, x: number, y: number, linkSide: number, width: number, height: number): void;
  }


  interface OverlayRenderItemComponent extends IOverlayRenderComponent {}
  class OverlayRenderItemComponent extends IOverlayRenderComponent {
    constructor(item: IRenderItemOverlay);
    render(graphics: GuiGraphics, linkSide: number): void;
    renderItemOverlay(graphics: GuiGraphics, linkSide: number, item: ItemStack, x: number, y: number, width: number, height: number): void;
  }


  interface OverlayTexturedRectComponent extends IOverlayRenderComponent {}
  class OverlayTexturedRectComponent extends IOverlayRenderComponent {
    constructor(component: ITexturedRect);
    render(graphics: GuiGraphics, linkSide: number): void;
    renderGradientRect(graphics: GuiGraphics, x: number, y: number, linkSide: number, widthScaled: number, heightScaled: number, width: number, height: number, i: number, startColor: number, endColor: number): void;
    renderRectTexture(graphics: GuiGraphics, resLoc: ResourceLocation, x: number, y: number, linkSide: number, widthScaled: number, heightScaled: number, width: number, height: number): void;
    renderRectTextureCustomSize(graphics: GuiGraphics, resLoc: ResourceLocation, x: number, y: number, linkSide: number, widthScaled: number, heightScaled: number, width: number, height: number, textureX: number, textureY: number, textureMaxX: number, textureMaxY: number): void;
    renderRectTextureSize(graphics: GuiGraphics, resLoc: ResourceLocation, x: number, y: number, linkSide: number, widthScaled: number, heightScaled: number, width: number, height: number, textureX: number, textureY: number): void;
  }

}

declare module 'noppes.npcs.client.parts' {
  import { NopVector3f, NopVector2i, NopVector3i } from 'noppes.npcs.shared.common.util';
  import { Map, List } from 'java.util';
  import { ModelPart } from 'net.minecraft.client.model.geom';
  import { NopModelPart } from 'noppes.npcs.shared.client.model';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BodyPart } from 'noppes.npcs.constants';
  import { JsonObject, JsonElement } from 'com.google.gson';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Class, Enum } from 'java.lang';
  import { Component } from 'net.minecraft.network.chat';

  class AnimationContainer {
    readonly animation: number;
    readonly part: string;
    readonly length: number;
    readonly actualLength: number;
    readonly speed: number;
    readonly additional: boolean;
    readonly loop: boolean;
    hasRotation: boolean;
    hasTranslate: boolean;
    hasScale: boolean;
    readonly rotations: NopVector3f[];
    readonly translates: NopVector3f[];
    readonly scale: NopVector3f[];
    startupTicks: number;
    constructor(animation: number, part: string, length: number, speed: number, additional: boolean, loop: boolean);
    animation(part: ModelPartWrapper, step: number, partialTick: number): void;
    animation(part: ModelPartWrapper, step: number): void;
    copy(): AnimationContainer;
    start(): void;
    step(part: ModelPartWrapper, step: number, progress: number): void;
  }


  class ModelPartWrapper {
    readonly oriPos: NopVector3f;
    readonly oriRot: NopVector3f;
    readonly oriScale: NopVector3f;
    animations: Map;
    constructor(mcPart: ModelPart, oriPos: NopVector3f, oriRot: NopVector3f);

    constructor(mpmPart: NopModelPart, oriPos: NopVector3f, oriRot: NopVector3f);
    get pos(): NopVector3f;
    get rot(): NopVector3f;
    get scale(): NopVector3f;
    set pos(pos: NopVector3f);
    set rot(rot: NopVector3f);
    set scale(scale: NopVector3f);
    setVisible(b: boolean): void;
  }


  class MpmPart {
    isEnabled: boolean;
    id: ResourceLocation;
    parentId: ResourceLocation;
    name: string;
    texture: ResourceLocation;
    menu: string;
    renderType: PartRenderType;
    animationType: PartBehaviorType;
    bodyPart: BodyPart;
    hiddenParts: List;
    translate: NopVector3f;
    scale: NopVector3f;
    rotatePoint: NopVector3f;
    rotate: NopVector3f;
    previewRotation: number;
    disableCustomTextures: boolean;
    defaultUsePlayerSkins: boolean;
    author: string;
    animationData: MpmPartAnimation;
    getPart(name: string): ModelPartWrapper;
    load(renderData: JsonObject): void;
  }


  interface MpmPartAbstractClient extends MpmPart {}
  class MpmPartAbstractClient extends MpmPart {
    pos: NopVector3f;
    rot: NopVector3f;
    getPart(name: string): ModelPartWrapper;
    render(data: MpmPartData, mStack: PoseStack, typeBuffer: MultiBufferSource, lightmapUV: number, player: LivingEntity): void;
    render(data: MpmPartData, mStack: PoseStack, c: VertexConsumer, lightmapUV: number, player: LivingEntity): void;
  }


  class MpmPartAnimation {
    animation(animation: number, step: number, partialTick: number): boolean;
    animation(animation: number, step: number): boolean;
    load(animationsList: AnimationContainer[], part: MpmPart): void;
    static loadAnimations(json: JsonObject): AnimationContainer[];
    start(animation: number): void;
  }


  interface MpmPartBedrock extends MpmPartAbstractClient {}
  class MpmPartBedrock extends MpmPartAbstractClient {
    readonly playerModels: Map;
    textureSize: NopVector2i;
    load(renderData: JsonObject): void;
    render(data: MpmPartData, mStack: PoseStack, c: VertexConsumer, lightmapUV: number, player: LivingEntity): void;
    render(data: MpmPartData, mStack: PoseStack, typeBuffer: MultiBufferSource, lightmapUV: number, player: LivingEntity): void;
  }


  class MpmPartData {
    static readonly WHITE: NopVector3f;
    partId: ResourceLocation;
    usePlayerSkin: boolean;
    color: NopVector3f;
    texture: ResourceLocation;
    url: string;
    get color(): number;
    get defaultTexture(): ResourceLocation;
    get nbt(): CompoundTag;
    get part(): MpmPart;
    get texture(): ResourceLocation;
    get urlTexture(): ResourceLocation;
    set color(color: number);
    set nbt(compound: CompoundTag);
    set texture(s: string);
    setUrl(url: string): void;
  }


  interface MpmPartEyes extends MpmPartAbstractClient {}
  class MpmPartEyes extends MpmPartAbstractClient {
    type: number;
    constructor(type: number, id: ResourceLocation);
    render(data: MpmPartData, mStack: PoseStack, typeBuffer: MultiBufferSource, lightmapUV: number, player: LivingEntity): void;
    render(data: MpmPartData, mStack: PoseStack, c: VertexConsumer, lightmapUV: number, player: LivingEntity): void;
  }


  class MpmPartReader {
    static PARTS: Map;
    static ANIMATIONS: Map;
    static Notify(message: Component): void;
    static getRequiredString(root: JsonObject, part: string): string;
    static jsonEnumList<T extends Enum>(type: Class<T>, el: JsonElement): T[];
    static jsonVector2i(el: JsonElement): NopVector2i;
    static jsonVector3f(el: JsonElement): NopVector3f;
    static jsonVector3fOrOne(el: JsonElement): NopVector3f;
    static jsonVector3i(el: JsonElement): NopVector3i;
    static reload(): void;
  }


  interface MpmPartSimple extends MpmPartAbstractClient {}
  class MpmPartSimple extends MpmPartAbstractClient {
    textureSize: NopVector2i;
    load(renderData: JsonObject): void;
    render(data: MpmPartData, mStack: PoseStack, c: VertexConsumer, lightmapUV: number, player: LivingEntity): void;
    render(data: MpmPartData, mStack: PoseStack, typeBuffer: MultiBufferSource, lightmapUV: number, player: LivingEntity): void;
    translateAndRotate(pose: PoseStack): void;
  }


  interface PartBehaviorType extends Enum<PartBehaviorType> {}
  class PartBehaviorType extends Enum<PartBehaviorType> {
    static readonly NONE: PartBehaviorType;
    static readonly BEARD: PartBehaviorType;
    static readonly HAIR: PartBehaviorType;
    static readonly WINGS: PartBehaviorType;
    static readonly WINGS2: PartBehaviorType;
    static readonly LEGS: PartBehaviorType;
    static readonly ARMS: PartBehaviorType;
    static valueOf(name: string): PartBehaviorType;
    static values(): PartBehaviorType[];
  }


  interface PartRenderType extends Enum<PartRenderType> {}
  class PartRenderType extends Enum<PartRenderType> {
    static readonly NONE: PartRenderType;
    static readonly SIMPLE: PartRenderType;
    static readonly BEDROCK: PartRenderType;
    static valueOf(name: string): PartRenderType;
    static values(): PartRenderType[];
  }

}

declare module 'noppes.npcs.client.renderer.blocks' {
  import { TileBuilder, TileBlockAnvil, TileCopy, TileDoor, TileMailbox, TileScripted } from 'noppes.npcs.blocks.tiles';
  import { Schematic } from 'noppes.npcs.schematics';
  import { BlockPos } from 'net.minecraft.core';
  import { Context } from 'BlockEntityRendererProvider';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { BlockEntityRenderer } from 'net.minecraft.client.renderer.blockentity';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';

  interface BlockBuilderRenderer extends BlockRendererInterface<TileBuilder> {}
  class BlockBuilderRenderer extends BlockRendererInterface<TileBuilder> {
    static schematic: Schematic;
    static pos: BlockPos;
    constructor(dispatcher: Context);
    drawSelectionBox(matrixStack: PoseStack, buffer: MultiBufferSource, pos: BlockPos): void;
    render(tile: TileBuilder, partialTicks: number, matrixStack: PoseStack, buffer: MultiBufferSource, light: number, overlay: number): void;
  }


  interface BlockCarpentryBenchRenderer extends BlockEntityRenderer<TileBlockAnvil> {}
  class BlockCarpentryBenchRenderer extends BlockEntityRenderer<TileBlockAnvil> {
    constructor(dispatcher: Context);
    render(te: TileBlockAnvil, partialTicks: number, matrixStack: PoseStack, buffer: MultiBufferSource, light: number, overlay: number): void;
  }


  interface BlockCopyRenderer extends BlockRendererInterface<TileCopy> {}
  class BlockCopyRenderer extends BlockRendererInterface<TileCopy> {
    static schematic: Schematic;
    static pos: BlockPos;
    constructor(dispatcher: Context);
    drawSelectionBox(matrixStack: PoseStack, buffer: MultiBufferSource, pos: BlockPos): void;
    render(tile: TileCopy, partialTicks: number, matrixStack: PoseStack, buffer: MultiBufferSource, light: number, overlay: number): void;
  }


  interface BlockDoorRenderer extends BlockRendererInterface<TileDoor> {}
  class BlockDoorRenderer extends BlockRendererInterface<TileDoor> {
    constructor(dispatcher: Context);
    render(tile: TileDoor, partialTicks: number, matrixStack: PoseStack, buffer: MultiBufferSource, light: number, overlay: number): void;
  }


  interface BlockMailboxRenderer<T extends TileMailbox = any> extends BlockEntityRenderer<T> {}
  class BlockMailboxRenderer<T extends TileMailbox = any> extends BlockEntityRenderer<T> {
    constructor(dispatcher: Context);
    render(te: TileMailbox, partialTicks: number, matrixStack: PoseStack, buffer: MultiBufferSource, light: number, overlay: number): void;
  }


  interface BlockRendererInterface<T extends BlockEntity = any> extends BlockEntityRenderer<T> {}
  class BlockRendererInterface<T extends BlockEntity = any> extends BlockEntityRenderer<T> {
    static colorTable: float[][];
    constructor(dispatcher: Context);
    playerTooFar(tile: BlockEntity): boolean;
    specialRenderDistance(): number;
  }


  interface BlockScriptedRenderer extends BlockRendererInterface<TileScripted> {}
  class BlockScriptedRenderer extends BlockRendererInterface<TileScripted> {
    constructor(dispatcher: Context);
    render(tile: TileScripted, partialTicks: number, matrixStack: PoseStack, buffer: MultiBufferSource, light: number, overlay: number): void;
  }

}

declare module 'noppes.npcs.client.renderer' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Model2DRenderer } from 'noppes.npcs.shared.client.model';
  import { LivingEntity, Entity } from 'net.minecraft.world.entity';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { Mark } from 'noppes.npcs.controllers.data.MarkData';
  import { Model } from 'net.minecraft.client.model';
  import { HumanoidArmorLayer } from 'net.minecraft.client.renderer.entity.layers';
  import { List } from 'java.util';
  import { Context } from 'EntityRendererProvider';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ArmPose } from 'HumanoidModel';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ModelNpcCrystal } from 'noppes.npcs.client.model';
  import { LivingEntityRenderer, EntityRenderer } from 'net.minecraft.client.renderer.entity';
  import { EntityNPCInterface } from 'noppes.npcs.entity';
  import { Component } from 'net.minecraft.network.chat';
  import { Pose } from 'PoseStack';
  import { Matrix4f, Matrix3f } from 'org.joml';

  class MarkRenderer {
    static readonly markExclamation: ResourceLocation;
    static readonly markQuestion: ResourceLocation;
    static readonly markPointer: ResourceLocation;
    static readonly markCross: ResourceLocation;
    static readonly markSkull: ResourceLocation;
    static readonly markStar: ResourceLocation;
    static displayList: number;
    static renderer: Model2DRenderer;
    static render(entity: LivingEntity, poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number, mark: Mark): void;
  }


  interface RenderCustomNpc<T extends EntityCustomNpc = any, M extends HumanoidModel<T> = any> extends RenderNPCInterface<T, M> {}
  class RenderCustomNpc<T extends EntityCustomNpc = any, M extends HumanoidModel<T> = any> extends RenderNPCInterface<T, M> {
    npcmodel: M;
    otherModel: Model;
    armorLayer: HumanoidArmorLayer;
    npclayers: List;
    constructor(manager: Context, model: M);
    getPose(npc: T, item: ItemStack): ArmPose;
    getRenderOffset(npc: T, partialTicks: number): Vec3;
    prepareMobModel(npc: Entity, animationPos: number, animationSpeed: number, partialTicks: number): void;
    render(npc: T, entityYaw: number, partialTicks: number, matrixStack: PoseStack, buffer: MultiBufferSource, packedLight: number): void;
    renderToBuffer(mStack: PoseStack, iVertex: VertexConsumer, lightmapUV: number, packedOverlayIn: number, color: number): void;
    setupAnim(entityIn: Entity, limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface RenderNpcCrystal extends RenderNPCInterface {}
  class RenderNpcCrystal extends RenderNPCInterface {
    constructor(manager: Context, model: ModelNpcCrystal);
  }


  interface RenderNpcDragon<T extends EntityNPCInterface = any, M extends EntityModel<T> = any> extends RenderNPCInterface<T, M> {}
  class RenderNpcDragon<T extends EntityNPCInterface = any, M extends EntityModel<T> = any> extends RenderNPCInterface<T, M> {
    constructor(manager: Context, model: M, f: number);
  }


  interface RenderNPCInterface<T extends EntityNPCInterface = any, M extends EntityModel<T> = any> extends LivingEntityRenderer<T, M> {}
  class RenderNPCInterface<T extends EntityNPCInterface = any, M extends EntityModel<T> = any> extends LivingEntityRenderer<T, M> {
    static LastTextureTick: number;
    static currentNpc: EntityNPCInterface;
    constructor(manager: Context, model: M, f: number);
    getTextureLocation(npc: T): ResourceLocation;
    render(npc: T, entityYaw: number, partialTicks: number, matrixStack: PoseStack, buffer: MultiBufferSource, packedLight: number): void;
    renderNameTag(npc: T, text: Component, matrixStack: PoseStack, buffer: MultiBufferSource, light: number, partialTick: number): void;
  }


  interface RenderNPCPony<T extends EntityNpcPony = any, M extends ModelPony<T> = any> extends RenderNPCInterface<T, M> {}
  class RenderNPCPony<T extends EntityNpcPony = any, M extends ModelPony<T> = any> extends RenderNPCInterface<T, M> {
    constructor(manager: Context, model: M);
    getTextureLocation(pony: T): ResourceLocation;
    render(pony: T, entityYaw: number, partialTicks: number, matrixStack: PoseStack, buffer: MultiBufferSource, packedLight: number): void;
  }


  interface RenderNpcSlime<T extends EntityNpcSlime = any, M extends ModelNpcSlime<T> = any> extends RenderNPCInterface<T, M> {}
  class RenderNpcSlime<T extends EntityNpcSlime = any, M extends ModelNpcSlime<T> = any> extends RenderNPCInterface<T, M> {
    constructor(manager: Context, par1Model: M, limbSwingAmountModel: Model, par3: number);
  }


  interface RenderProjectile<T extends EntityProjectile = any> extends EntityRenderer<T> {}
  class RenderProjectile<T extends EntityProjectile = any> extends EntityRenderer<T> {
    renderWithColor: boolean;
    constructor(manager: Context);
    drawVertex(pose: Pose, matrix: Matrix4f, normals: Matrix3f, vertexBuilder: VertexConsumer, offsetX: number, offsetY: number, offsetZ: number, textureX: number, textureY: number, p_229039_9_: number, p_229039_10_: number, p_229039_11_: number, packedLightIn: number): void;
    getTextureLocation(par1Entity: T): ResourceLocation;
    render(projectile: T, entityYaw: number, partialTicks: number, matrixStack: PoseStack, buffer: MultiBufferSource, packedLight: number): void;
  }

}

declare module 'noppes.npcs.command' {
  import { LiteralArgumentBuilder } from 'com.mojang.brigadier.builder';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { List } from 'java.util';
  import { EntityNPCInterface } from 'noppes.npcs.entity';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { EntityType, Entity } from 'net.minecraft.world.entity';
  import { SuggestionProvider } from 'com.mojang.brigadier.suggestion';

  class CmdClone {
    static register(): LiteralArgumentBuilder<CommandSourceStack>;
  }


  class CmdConfig {
    static register(): LiteralArgumentBuilder<CommandSourceStack>;
  }


  class CmdDialog {
    static register(): LiteralArgumentBuilder<CommandSourceStack>;
  }


  class CmdFaction {
    static register(): LiteralArgumentBuilder<CommandSourceStack>;
  }


  class CmdMark {
    static register(): LiteralArgumentBuilder<CommandSourceStack>;
  }


  class CmdNoppes {
    static getEntities<T extends Entity>(type: EntityType<T>, level: ServerLevel, entity: T): T[];
    static getNpcsByName(level: ServerLevel, name: string, npc: T): EntityNPCInterface[];
    static register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }


  class CmdNPC {
    static readonly VISIBLE: SuggestionProvider;
    static register(): LiteralArgumentBuilder<CommandSourceStack>;
  }


  class CmdQuest {
    static register(): LiteralArgumentBuilder<CommandSourceStack>;
  }


  class CmdScene {
    static register(): LiteralArgumentBuilder<CommandSourceStack>;
  }


  class CmdSchematics {
    static readonly names: List;
    static readonly SCHEMAS: SuggestionProvider;
    static readonly ROTATION: SuggestionProvider;
    static register(): LiteralArgumentBuilder<CommandSourceStack>;
  }


  class CmdScript {
    static register(): LiteralArgumentBuilder<CommandSourceStack>;
  }


  class CmdSlay {
    static register(): LiteralArgumentBuilder<CommandSourceStack>;
  }

}

declare module 'noppes.npcs.config' {
  import { Class } from 'java.lang';
  import { File } from 'java.io';

  class ConfigLoader {
    constructor(clss: Class<any>, dir: File, fileName: string);
    loadConfig(): void;
    updateConfig(): void;
  }

}

declare module 'noppes.npcs.constants' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { MpmPartData } from 'noppes.npcs.client.parts';
  import { CompoundTag } from 'net.minecraft.nbt';

  class AiMutex {
    static PASSIVE: number;
    static LOOK: number;
    static PATHING: number;
  }


  interface BodyPart extends Enum<BodyPart> {}
  class BodyPart extends Enum<BodyPart> {
    static readonly NONE: BodyPart;
    static readonly HEAD: BodyPart;
    static readonly BODY: BodyPart;
    static readonly LEGS: BodyPart;
    static readonly ARMS: BodyPart;
    static readonly LEFT_ARM: BodyPart;
    static readonly RIGHT_ARM: BodyPart;
    static readonly LEFT_LEG: BodyPart;
    static readonly RIGHT_LEG: BodyPart;
    static valueOf(name: string): BodyPart;
    static values(): BodyPart[];
  }


  interface EnumAbilityType extends Enum<EnumAbilityType> {}
  class EnumAbilityType extends Enum<EnumAbilityType> {
    static readonly ATTACKED: EnumAbilityType;
    static readonly UPDATE: EnumAbilityType;
    static valueOf(name: string): EnumAbilityType;
    static values(): EnumAbilityType[];
  }


  interface EnumAvailabilityDialog extends Enum<EnumAvailabilityDialog> {}
  class EnumAvailabilityDialog extends Enum<EnumAvailabilityDialog> {
    static readonly Always: EnumAvailabilityDialog;
    static readonly After: EnumAvailabilityDialog;
    static readonly Before: EnumAvailabilityDialog;
    static valueOf(name: string): EnumAvailabilityDialog;
    static values(): EnumAvailabilityDialog[];
  }


  interface EnumAvailabilityFaction extends Enum<EnumAvailabilityFaction> {}
  class EnumAvailabilityFaction extends Enum<EnumAvailabilityFaction> {
    static readonly Friendly: EnumAvailabilityFaction;
    static readonly Neutral: EnumAvailabilityFaction;
    static readonly Hostile: EnumAvailabilityFaction;
    static valueOf(name: string): EnumAvailabilityFaction;
    static values(): EnumAvailabilityFaction[];
  }


  interface EnumAvailabilityFactionType extends Enum<EnumAvailabilityFactionType> {}
  class EnumAvailabilityFactionType extends Enum<EnumAvailabilityFactionType> {
    static readonly Always: EnumAvailabilityFactionType;
    static readonly Is: EnumAvailabilityFactionType;
    static readonly IsNot: EnumAvailabilityFactionType;
    static valueOf(name: string): EnumAvailabilityFactionType;
    static values(): EnumAvailabilityFactionType[];
  }


  interface EnumAvailabilityQuest extends Enum<EnumAvailabilityQuest> {}
  class EnumAvailabilityQuest extends Enum<EnumAvailabilityQuest> {
    static readonly Always: EnumAvailabilityQuest;
    static readonly After: EnumAvailabilityQuest;
    static readonly Before: EnumAvailabilityQuest;
    static readonly Active: EnumAvailabilityQuest;
    static readonly NotActive: EnumAvailabilityQuest;
    static readonly Completed: EnumAvailabilityQuest;
    static readonly CanStart: EnumAvailabilityQuest;
    static valueOf(name: string): EnumAvailabilityQuest;
    static values(): EnumAvailabilityQuest[];
  }


  interface EnumAvailabilityScoreboard extends Enum<EnumAvailabilityScoreboard> {}
  class EnumAvailabilityScoreboard extends Enum<EnumAvailabilityScoreboard> {
    static readonly SMALLER: EnumAvailabilityScoreboard;
    static readonly EQUAL: EnumAvailabilityScoreboard;
    static readonly BIGGER: EnumAvailabilityScoreboard;
    static valueOf(name: string): EnumAvailabilityScoreboard;
    static values(): EnumAvailabilityScoreboard[];
  }


  interface EnumCompanionJobs extends Enum<EnumCompanionJobs> {}
  class EnumCompanionJobs extends Enum<EnumCompanionJobs> {
    static readonly NONE: EnumCompanionJobs;
    static readonly SOLDIER: EnumCompanionJobs;
    static readonly GUARD: EnumCompanionJobs;
    static readonly FARMER: EnumCompanionJobs;
    static readonly MINER: EnumCompanionJobs;
    static readonly SHOP: EnumCompanionJobs;
    static readonly ROBOT: EnumCompanionJobs;
    static valueOf(name: string): EnumCompanionJobs;
    static values(): EnumCompanionJobs[];
  }


  interface EnumCompanionStage extends Enum<EnumCompanionStage> {}
  class EnumCompanionStage extends Enum<EnumCompanionStage> {
    static readonly BABY: EnumCompanionStage;
    static readonly CHILD: EnumCompanionStage;
    static readonly TEEN: EnumCompanionStage;
    static readonly ADULT: EnumCompanionStage;
    static readonly FULLGROWN: EnumCompanionStage;
    static valueOf(name: string): EnumCompanionStage;
    static values(): EnumCompanionStage[];
  }


  interface EnumCompanionTalent extends Enum<EnumCompanionTalent> {}
  class EnumCompanionTalent extends Enum<EnumCompanionTalent> {
    static readonly INVENTORY: EnumCompanionTalent;
    static readonly ARMOR: EnumCompanionTalent;
    static readonly SWORD: EnumCompanionTalent;
    static readonly RANGED: EnumCompanionTalent;
    static readonly ACROBATS: EnumCompanionTalent;
    static readonly INTEL: EnumCompanionTalent;
    static valueOf(name: string): EnumCompanionTalent;
    static values(): EnumCompanionTalent[];
  }


  interface EnumDayTime extends Enum<EnumDayTime> {}
  class EnumDayTime extends Enum<EnumDayTime> {
    static readonly Always: EnumDayTime;
    static readonly Night: EnumDayTime;
    static readonly Day: EnumDayTime;
    static valueOf(name: string): EnumDayTime;
    static values(): EnumDayTime[];
  }


  interface EnumGuiType extends Enum<EnumGuiType> {}
  class EnumGuiType extends Enum<EnumGuiType> {
    static readonly MainMenuDisplay: EnumGuiType;
    static readonly MainMenuInv: EnumGuiType;
    static readonly MainMenuStats: EnumGuiType;
    static readonly ManageFactions: EnumGuiType;
    static readonly MainMenuAdvanced: EnumGuiType;
    static readonly MainMenuGlobal: EnumGuiType;
    static readonly MainMenuAI: EnumGuiType;
    static readonly ManageTransport: EnumGuiType;
    static readonly ManageBanks: EnumGuiType;
    static readonly ManageDialogs: EnumGuiType;
    static readonly ManageQuests: EnumGuiType;
    static readonly ManageRecipes: EnumGuiType;
    static readonly ManageLinked: EnumGuiType;
    static readonly PlayerFollowerHire: EnumGuiType;
    static readonly PlayerFollower: EnumGuiType;
    static readonly PlayerBankSmall: EnumGuiType;
    static readonly PlayerBankUnlock: EnumGuiType;
    static readonly PlayerBankUprade: EnumGuiType;
    static readonly PlayerBankLarge: EnumGuiType;
    static readonly PlayerMailbox: EnumGuiType;
    static readonly PlayerMailman: EnumGuiType;
    static readonly PlayerTrader: EnumGuiType;
    static readonly PlayerAnvil: EnumGuiType;
    static readonly SetupItemGiver: EnumGuiType;
    static readonly SetupTrader: EnumGuiType;
    static readonly SetupFollower: EnumGuiType;
    static readonly PlayerTransporter: EnumGuiType;
    static readonly RedstoneBlock: EnumGuiType;
    static readonly SetupTransporter: EnumGuiType;
    static readonly MobSpawner: EnumGuiType;
    static readonly SetupBank: EnumGuiType;
    static readonly QuestReward: EnumGuiType;
    static readonly QuestItem: EnumGuiType;
    static readonly NpcRemote: EnumGuiType;
    static readonly MovingPath: EnumGuiType;
    static readonly MobSpawnerAdd: EnumGuiType;
    static readonly Waypoint: EnumGuiType;
    static readonly MerchantAdd: EnumGuiType;
    static readonly MobSpawnerMounter: EnumGuiType;
    static readonly NpcDimensions: EnumGuiType;
    static readonly Border: EnumGuiType;
    static readonly Script: EnumGuiType;
    static readonly ScriptBlock: EnumGuiType;
    static readonly ScriptDoor: EnumGuiType;
    static readonly Companion: EnumGuiType;
    static readonly CompanionInv: EnumGuiType;
    static readonly CompanionTalent: EnumGuiType;
    static readonly CompanionTrader: EnumGuiType;
    static readonly BuilderBlock: EnumGuiType;
    static readonly CopyBlock: EnumGuiType;
    static readonly ScriptPlayers: EnumGuiType;
    static readonly ScriptItem: EnumGuiType;
    static readonly NbtBook: EnumGuiType;
    static readonly CustomGui: EnumGuiType;
    static getEnum(location: ResourceLocation): EnumGuiType;
    static valueOf(name: string): EnumGuiType;
    static values(): EnumGuiType[];
  }


  interface EnumMenuType extends Enum<EnumMenuType> {}
  class EnumMenuType extends Enum<EnumMenuType> {
    static readonly DISPLAY: EnumMenuType;
    static readonly STATS: EnumMenuType;
    static readonly INVENTORY: EnumMenuType;
    static readonly AI: EnumMenuType;
    static readonly ADVANCED: EnumMenuType;
    static readonly MODEL: EnumMenuType;
    static readonly TRANSFORM: EnumMenuType;
    static readonly MOVING_PATH: EnumMenuType;
    static readonly MARK: EnumMenuType;
    static valueOf(name: string): EnumMenuType;
    static values(): EnumMenuType[];
  }


  interface EnumParts extends Enum<EnumParts> {}
  class EnumParts extends Enum<EnumParts> {
    static readonly HEAD: EnumParts;
    static readonly BODY: EnumParts;
    static readonly PARTICLES: EnumParts;
    static readonly ARM_LEFT: EnumParts;
    static readonly ARM_RIGHT: EnumParts;
    static readonly LEG_LEFT: EnumParts;
    static readonly LEG_RIGHT: EnumParts;
    static readonly EYES: EnumParts;
    static FromName(name: string): EnumParts;
    static convertOldPart(compound: CompoundTag): MpmPartData;
    static valueOf(name: string): EnumParts;
    static values(): EnumParts[];
  }


  interface EnumPlanePosition extends Enum<EnumPlanePosition> {}
  class EnumPlanePosition extends Enum<EnumPlanePosition> {
    static readonly TOP: EnumPlanePosition;
    static readonly BOTTOM: EnumPlanePosition;
    static readonly RIGHT: EnumPlanePosition;
    static readonly LEFT: EnumPlanePosition;
    static readonly FRONT: EnumPlanePosition;
    static readonly BACK: EnumPlanePosition;
    static valueOf(name: string): EnumPlanePosition;
    static values(): EnumPlanePosition[];
  }


  interface EnumPlayerData extends Enum<EnumPlayerData> {}
  class EnumPlayerData extends Enum<EnumPlayerData> {
    static readonly Players: EnumPlayerData;
    static readonly Quest: EnumPlayerData;
    static readonly Dialog: EnumPlayerData;
    static readonly Transport: EnumPlayerData;
    static readonly Bank: EnumPlayerData;
    static readonly Factions: EnumPlayerData;
    static valueOf(name: string): EnumPlayerData;
    static values(): EnumPlayerData[];
  }


  interface EnumQuestCompletion extends Enum<EnumQuestCompletion> {}
  class EnumQuestCompletion extends Enum<EnumQuestCompletion> {
    static readonly Npc: EnumQuestCompletion;
    static readonly Instant: EnumQuestCompletion;
    static valueOf(name: string): EnumQuestCompletion;
    static values(): EnumQuestCompletion[];
  }


  interface EnumQuestRepeat extends Enum<EnumQuestRepeat> {}
  class EnumQuestRepeat extends Enum<EnumQuestRepeat> {
    static readonly NONE: EnumQuestRepeat;
    static readonly REPEATABLE: EnumQuestRepeat;
    static readonly MCDAILY: EnumQuestRepeat;
    static readonly MCWEEKLY: EnumQuestRepeat;
    static readonly RLDAILY: EnumQuestRepeat;
    static readonly RLWEEKLY: EnumQuestRepeat;
    static valueOf(name: string): EnumQuestRepeat;
    static values(): EnumQuestRepeat[];
  }


  interface EnumScriptType extends Enum<EnumScriptType> {}
  class EnumScriptType extends Enum<EnumScriptType> {
    static readonly INIT: EnumScriptType;
    static readonly TICK: EnumScriptType;
    static readonly INTERACT: EnumScriptType;
    static readonly DIALOG: EnumScriptType;
    static readonly DAMAGED: EnumScriptType;
    static readonly DIED: EnumScriptType;
    static readonly ATTACK_MELEE: EnumScriptType;
    static readonly TARGET: EnumScriptType;
    static readonly COLLIDE: EnumScriptType;
    static readonly KILL: EnumScriptType;
    static readonly DIALOG_OPTION: EnumScriptType;
    static readonly TARGET_LOST: EnumScriptType;
    static readonly ROLE: EnumScriptType;
    static readonly RANGED_LAUNCHED: EnumScriptType;
    static readonly CLICKED: EnumScriptType;
    static readonly FALLEN_UPON: EnumScriptType;
    static readonly RAIN_FILLED: EnumScriptType;
    static readonly BROKEN: EnumScriptType;
    static readonly HARVESTED: EnumScriptType;
    static readonly EXPLODED: EnumScriptType;
    static readonly NEIGHBOR_CHANGED: EnumScriptType;
    static readonly REDSTONE: EnumScriptType;
    static readonly DOOR_TOGGLE: EnumScriptType;
    static readonly TIMER: EnumScriptType;
    static readonly TOSS: EnumScriptType;
    static readonly CONTAINER_OPEN: EnumScriptType;
    static readonly CONTAINER_CLOSED: EnumScriptType;
    static readonly LOGIN: EnumScriptType;
    static readonly LOGOUT: EnumScriptType;
    static readonly CHAT: EnumScriptType;
    static readonly DAMAGED_ENTITY: EnumScriptType;
    static readonly DIALOG_CLOSE: EnumScriptType;
    static readonly SPAWN: EnumScriptType;
    static readonly TOSSED: EnumScriptType;
    static readonly PICKEDUP: EnumScriptType;
    static readonly PICKUP: EnumScriptType;
    static readonly ATTACK: EnumScriptType;
    static readonly PROJECTILE_TICK: EnumScriptType;
    static readonly PROJECTILE_IMPACT: EnumScriptType;
    static readonly FACTION_UPDATE: EnumScriptType;
    static readonly LEVEL_UP: EnumScriptType;
    static readonly QUEST_START: EnumScriptType;
    static readonly QUEST_COMPLETED: EnumScriptType;
    static readonly QUEST_TURNIN: EnumScriptType;
    static readonly KEY_PRESSED: EnumScriptType;
    static readonly KEY_RELEASED: EnumScriptType;
    static readonly SCRIPT_TRIGGER: EnumScriptType;
    static readonly PLAY_SOUND: EnumScriptType;
    static readonly CUSTOM_GUI_CLOSED: EnumScriptType;
    static readonly CUSTOM_GUI_BUTTON: EnumScriptType;
    static readonly CUSTOM_GUI_SLOT: EnumScriptType;
    static readonly CUSTOM_GUI_SCROLL: EnumScriptType;
    static readonly CUSTOM_GUI_SLOT_CLICKED: EnumScriptType;
    static valueOf(name: string): EnumScriptType;
    static values(): EnumScriptType[];
  }


  class SyncType {
    static readonly FACTION: number;
    static readonly QUEST: number;
    static readonly QUEST_CATEGORY: number;
    static readonly DIALOG: number;
    static readonly DIALOG_CATEGORY: number;
    static readonly RECIPE_NORMAL: number;
    static readonly RECIPE_CARPENTRY: number;
    static readonly PLAYER_DATA: number;
  }

}

declare module 'noppes.npcs.containers' {
  import { AbstractContainerMenu, CraftingContainer, Slot, ClickType, MenuType, ResultSlot } from 'net.minecraft.world.inventory';
  import { Container, SimpleContainer } from 'net.minecraft.world';
  import { Inventory, Player } from 'net.minecraft.world.entity.player';
  import { BlockPos, RegistryAccess, NonNullList } from 'net.minecraft.core';
  import { ItemStack } from 'net.minecraft.world.item';
  import { CustomGuiWrapper } from 'noppes.npcs.api.wrapper.gui';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { PlayerMail, Bank, RecipeCarpentry } from 'noppes.npcs.controllers.data';
  import { RoleCompanion, RoleFollower, RoleTrader } from 'noppes.npcs.roles';
  import { IContainer } from 'noppes.npcs.api';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { EquipmentSlot } from 'net.minecraft.world.entity';
  import { Pair } from 'com.mojang.datafixers.util';

  interface ContainerCarpentryBench extends AbstractContainerMenu {}
  class ContainerCarpentryBench extends AbstractContainerMenu {
    craftMatrix: CraftingContainer;
    craftResult: Container;
    constructor(id: number, par1PlayerInventory: Inventory, pos: BlockPos);
    canTakeItemForPickAll(stack: ItemStack, slotIn: Slot): boolean;
    quickMoveStack(par1Player: Player, par1: number): ItemStack;
    removed(par1Player: Player): void;
    slotsChanged(par1Container: Container): void;
    stillValid(par1Player: Player): boolean;
  }


  interface ContainerCustomGui extends AbstractContainerMenu {}
  class ContainerCustomGui extends AbstractContainerMenu {
    customGui: CustomGuiWrapper;
    activeGui: CustomGuiWrapper;
    guiInventory: SimpleContainer;
    data: CompoundTag;
    constructor(containerId: number, data: CompoundTag);
    clicked(slotId: number, dragType: number, clickTypeIn: ClickType, player: Player): void;
    quickMoveStack(playerIn: Player, index: number): ItemStack;
    removed(player: Player): void;
    setGui(gui: CustomGuiWrapper, player: Player): void;
    stillValid(playerIn: Player): boolean;
    update(): void;
  }


  interface ContainerMail extends ContainerNpcInterface {}
  class ContainerMail extends ContainerNpcInterface {
    static staticmail: PlayerMail;
    mail: PlayerMail;
    readonly canEdit: boolean;
    readonly canSend: boolean;
    constructor(containerId: number, playerInventory: Inventory, canEdit: boolean, canSend: boolean);
    quickMoveStack(par1Player: Player, limbSwingAmount: number): ItemStack;
    removed(player: Player): void;
  }


  interface ContainerManageBanks extends AbstractContainerMenu {}
  class ContainerManageBanks extends AbstractContainerMenu {
    bank: Bank;
    constructor(containerId: number, playerInventory: Inventory);
    quickMoveStack(par1Player: Player, i: number): ItemStack;
    setBank(bank2: Bank): void;
    stillValid(entityplayer: Player): boolean;
  }


  interface ContainerManageRecipes extends AbstractContainerMenu {}
  class ContainerManageRecipes extends AbstractContainerMenu {
    recipe: RecipeCarpentry;
    size: number;
    width: number;
    constructor(containerId: number, playerInventory: Inventory, size: number);
    quickMoveStack(par1Player: Player, i: number): ItemStack;
    saveRecipe(): void;
    setRecipe(recipe: RecipeCarpentry, access: RegistryAccess): void;
    stillValid(entityplayer: Player): boolean;
  }


  interface ContainerMerchantAdd extends ContainerNpcInterface {}
  class ContainerMerchantAdd extends ContainerNpcInterface {
    constructor(containerId: number, playerInventory: Inventory);
    quickMoveStack(par1Player: Player, limbSwingAmount: number): ItemStack;
    removed(par1Player: Player): void;
  }


  interface ContainerNPCBankInterface extends ContainerNpcInterface {}
  class ContainerNPCBankInterface extends ContainerNpcInterface {
    currencyMatrix: InventoryNPC;
    currency: SlotNpcBankCurrency;
    slot: number;
    bankid: number;
    constructor(type: MenuType, containerId: number, playerInventory: Inventory, slot: number, bankid: number);
    canBeUpgraded(): boolean;
    get rowNumber(): number;
    isAvailable(): boolean;
    isUpgraded(): boolean;
    quickMoveStack(par1Player: Player, i: number): ItemStack;
    removed(entityplayer: Player): void;
    setCurrency(item: ItemStack): void;
    slotsChanged(inv: Container): void;
    xOffset(): number;
  }


  interface ContainerNPCBankLarge extends ContainerNPCBankInterface {}
  class ContainerNPCBankLarge extends ContainerNPCBankInterface {
    constructor(containerId: number, playerInventory: Inventory, slot: number, bankid: number);
    get rowNumber(): number;
    isAvailable(): boolean;
    isUpgraded(): boolean;
  }


  interface ContainerNPCBankSmall extends ContainerNPCBankInterface {}
  class ContainerNPCBankSmall extends ContainerNPCBankInterface {
    constructor(containerId: number, playerInventory: Inventory, slot: number, bankid: number);
    get rowNumber(): number;
    isAvailable(): boolean;
  }


  interface ContainerNPCBankUnlock extends ContainerNPCBankInterface {}
  class ContainerNPCBankUnlock extends ContainerNPCBankInterface {
    constructor(containerId: number, playerInventory: Inventory, slot: number, bankid: number);
  }


  interface ContainerNPCBankUpgrade extends ContainerNPCBankInterface {}
  class ContainerNPCBankUpgrade extends ContainerNPCBankInterface {
    constructor(containerId: number, playerInventory: Inventory, slot: number, bankid: number);
    canBeUpgraded(): boolean;
    get rowNumber(): number;
    isAvailable(): boolean;
    xOffset(): number;
  }


  interface ContainerNPCCompanion extends ContainerNpcInterface {}
  class ContainerNPCCompanion extends ContainerNpcInterface {
    currencyMatrix: InventoryNPC;
    role: RoleCompanion;
    constructor(containerId: number, playerInventory: Inventory, entityId: number);
    quickMoveStack(par1Player: Player, i: number): ItemStack;
    removed(entityplayer: Player): void;
  }


  interface ContainerNPCFollower extends ContainerNpcInterface {}
  class ContainerNPCFollower extends ContainerNpcInterface {
    currencyMatrix: InventoryNPC;
    role: RoleFollower;
    constructor(containerId: number, playerInventory: Inventory, entityId: number);
    quickMoveStack(par1Player: Player, i: number): ItemStack;
    removed(entityplayer: Player): void;
  }


  interface ContainerNPCFollowerHire extends ContainerNpcInterface {}
  class ContainerNPCFollowerHire extends ContainerNpcInterface {
    currencyMatrix: SimpleContainer;
    role: RoleFollower;
    constructor(containerId: number, playerInventory: Inventory, entityId: number);
    quickMoveStack(par1Player: Player, i: number): ItemStack;
    removed(entityplayer: Player): void;
  }


  interface ContainerNPCFollowerSetup extends AbstractContainerMenu {}
  class ContainerNPCFollowerSetup extends AbstractContainerMenu {
    constructor(containerId: number, playerInventory: Inventory, entityId: number);
    quickMoveStack(par1Player: Player, i: number): ItemStack;
    stillValid(entityplayer: Player): boolean;
  }


  interface ContainerNpcInterface extends AbstractContainerMenu {}
  class ContainerNpcInterface extends AbstractContainerMenu {
    player: Player;
    scriptContainer: IContainer;
    constructor(type: MenuType, containerId: number, playerInventory: Inventory);
    static getOrCreateIContainer(container: ContainerNpcInterface): IContainer;
    quickMoveStack(p_38941_: Player, p_38942_: number): ItemStack;
    stillValid(player: Player): boolean;
  }


  interface ContainerNPCInv extends AbstractContainerMenu {}
  class ContainerNPCInv extends AbstractContainerMenu {
    constructor(containerId: number, playerInventory: Inventory, entityId: number);
    quickMoveStack(par1Player: Player, i: number): ItemStack;
    stillValid(entityplayer: Player): boolean;
  }


  interface ContainerNpcItemGiver extends AbstractContainerMenu {}
  class ContainerNpcItemGiver extends AbstractContainerMenu {
    constructor(containerId: number, playerInventory: Inventory, entityId: number);
    quickMoveStack(par1Player: Player, i: number): ItemStack;
    stillValid(entityplayer: Player): boolean;
  }


  interface ContainerNpcQuestReward extends AbstractContainerMenu {}
  class ContainerNpcQuestReward extends AbstractContainerMenu {
    constructor(containerId: number, playerInventory: Inventory);
    quickMoveStack(par1Player: Player, i: number): ItemStack;
    stillValid(entityplayer: Player): boolean;
  }


  interface ContainerNpcQuestTypeItem extends AbstractContainerMenu {}
  class ContainerNpcQuestTypeItem extends AbstractContainerMenu {
    constructor(containerId: number, playerInventory: Inventory);
    quickMoveStack(par1Player: Player, i: number): ItemStack;
    stillValid(entityplayer: Player): boolean;
  }


  interface ContainerNPCTrader extends ContainerNpcInterface {}
  class ContainerNPCTrader extends ContainerNpcInterface {
    role: RoleTrader;
    constructor(containerId: number, playerInventory: Inventory, entityId: number);
    canBuy(currency: ItemStack, currency2: ItemStack, player: Player): boolean;
    clicked(i: number, j: number, par3: ClickType, entityplayer: Player): void;
    quickMoveStack(par1Player: Player, i: number): ItemStack;
  }


  interface ContainerNPCTraderSetup extends AbstractContainerMenu {}
  class ContainerNPCTraderSetup extends AbstractContainerMenu {
    role: RoleTrader;
    constructor(containerId: number, playerInventory: Inventory, entityId: number);
    quickMoveStack(par1Player: Player, i: number): ItemStack;
    stillValid(entityplayer: Player): boolean;
  }


  interface InventoryNPC extends Container {}
  class InventoryNPC extends Container {
    readonly inventoryContents: NonNullList;
    constructor(s: string, i: number, con: AbstractContainerMenu);
    canPlaceItem(i: number, itemstack: ItemStack): boolean;
    clearContent(): void;
    get containerSize(): number;
    get maxStackSize(): number;
    getItem(i: number): ItemStack;
    isEmpty(): boolean;
    removeItem(index: number, count: number): ItemStack;
    removeItemNoUpdate(i: number): ItemStack;
    setChanged(): void;
    setItem(index: number, stack: ItemStack): void;
    startOpen(player: Player): void;
    stillValid(entityplayer: Player): boolean;
    stopOpen(player: Player): void;
  }


  interface InventoryNpcTrader extends Container {}
  class InventoryNpcTrader extends Container {
    readonly inventoryContents: NonNullList;
    constructor(s: string, i: number, con: ContainerNPCTrader);
    canPlaceItem(i: number, itemstack: ItemStack): boolean;
    clearContent(): void;
    get containerSize(): number;
    get maxStackSize(): number;
    getItem(i: number): ItemStack;
    isEmpty(): boolean;
    removeItem(i: number, j: number): ItemStack;
    removeItemNoUpdate(i: number): ItemStack;
    setChanged(): void;
    setItem(i: number, itemstack: ItemStack): void;
    startOpen(player: Player): void;
    stillValid(entityplayer: Player): boolean;
    stopOpen(player: Player): void;
  }


  interface SlotApi extends Slot {}
  class SlotApi extends Slot {
    constructor(par1iInventory: Container, index: number, xPosition: number, yPosition: number);
  }


  interface SlotCompanionArmor extends Slot {}
  class SlotCompanionArmor extends Slot {
    static readonly ARMOR_SLOT_TEXTURES: ResourceLocation[];
    constructor(role: RoleCompanion, iinventory: Container, id: number, x: number, y: number, type: EquipmentSlot);
    get maxStackSize(): number;
    get noItemIcon(): Pair<ResourceLocation, ResourceLocation>;
    mayPlace(itemstack: ItemStack): boolean;
  }


  interface SlotCompanionWeapon extends Slot {}
  class SlotCompanionWeapon extends Slot {
    constructor(role: RoleCompanion, iinventory: Container, id: number, x: number, y: number);
    get maxStackSize(): number;
    mayPlace(itemstack: ItemStack): boolean;
  }


  interface SlotNPCArmor extends Slot {}
  class SlotNPCArmor extends Slot {
    get maxStackSize(): number;
    get noItemIcon(): Pair<ResourceLocation, ResourceLocation>;
    mayPlace(itemstack: ItemStack): boolean;
  }


  interface SlotNpcBankCurrency extends Slot {}
  class SlotNpcBankCurrency extends Slot {
    item: ItemStack;
    constructor(containerplayer: ContainerNPCBankInterface, iinventory: Container, i: number, j: number, k: number);
    get maxStackSize(): number;
    mayPlace(itemstack: ItemStack): boolean;
  }


  interface SlotNpcCrafting extends ResultSlot {}
  class SlotNpcCrafting extends ResultSlot {
    constructor(player: Player, craftingInventory: CraftingContainer, inventory: Container, slotIndex: number, x: number, y: number);
    onTake(player: Player, itemStack: ItemStack): void;
  }


  interface SlotNpcMercenaryCurrency extends Slot {}
  class SlotNpcMercenaryCurrency extends Slot {
    constructor(role: RoleFollower, inv: Container, i: number, j: number, k: number);
    get maxStackSize(): number;
    mayPlace(itemstack: ItemStack): boolean;
  }


  interface SlotValid extends Slot {}
  class SlotValid extends Slot {
    constructor(par1iInventory: Container, limbSwingAmount: number, par3: number, par4: number);

    constructor(par1iInventory: Container, limbSwingAmount: number, par3: number, par4: number, bo: boolean);
    mayPlace(itemstack: ItemStack): boolean;
  }

}

declare module 'noppes.npcs.controllers' {
  import { LivingEntityRenderer } from 'net.minecraft.client.renderer.entity';
  import { RenderLayer } from 'net.minecraft.client.renderer.entity.layers';
  import { HashMap, UUID, List, Map, Vector, TreeMap, ArrayList } from 'java.util';
  import { Provider } from 'HolderLookup';
  import { CompoundTag, ListTag } from 'net.minecraft.nbt';
  import { Bank, DialogCategory, Dialog, Faction, PlayerBankData, PlayerData, PlayerMail, Quest, QuestCategory, RecipeCarpentry, PlayerScriptData, ForgeScriptData, SpawnData, TransportLocation } from 'noppes.npcs.controllers.data';
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';
  import { Entity } from 'net.minecraft.world.entity';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { EntityModel } from 'net.minecraft.client.model';
  import { ButtonEvent, SlotEvent, ScrollEvent, SlotClickEvent, CloseEvent } from 'noppes.npcs.api.event.CustomGuiEvent';
  import { CustomGuiWrapper } from 'noppes.npcs.api.wrapper.gui';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Event } from 'net.neoforged.bus.api';
  import { IDialogHandler, IFactionHandler, IQuestHandler, IRecipeHandler, ICloneHandler } from 'noppes.npcs.api.handler';
  import { IDialogCategory, IFaction, IQuestCategory, IRecipe } from 'noppes.npcs.api.handler.data';
  import { DataInputStream, File } from 'java.io';
  import { IBlock } from 'noppes.npcs.api.block';
  import { EnumScriptType } from 'noppes.npcs.constants';
  import { Long, Integer } from 'java.lang';
  import { EntityNPCInterface } from 'noppes.npcs.entity';
  import { LinkedData } from 'noppes.npcs.controllers.LinkedNpcController';
  import { IMassBlock } from 'noppes.npcs.controllers.MassBlockController';
  import { Level } from 'net.minecraft.world.level';
  import { MinecraftServer } from 'net.minecraft.server';
  import { CraftingContainer } from 'net.minecraft.world.inventory';
  import { ItemStack } from 'net.minecraft.world.item';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { SchematicWrapper } from 'noppes.npcs.schematics';
  import { BlockPos } from 'net.minecraft.core';
  import { ScriptEngine } from 'javax.script';
  import { Save } from 'LevelEvent';
  import { IEntity } from 'noppes.npcs.api.entity';
  import { IWorld } from 'noppes.npcs.api';
  import { RandomSource } from 'net.minecraft.util';

  class ArmorersWorkshopHelper {
    static Enabled: boolean;
    static onLayerAddEvent(renderer: LivingEntityRenderer<any, any>, layer: RenderLayer<any, any>): void;
    static onLayerRemoveEvent(renderer: LivingEntityRenderer<any, any>, layer: RenderLayer<any, any>): void;
    static register(): void;
  }


  class BankController {
    banks: HashMap;
    constructor(lookupProvider: Provider);
    get unusedId(): number;
    getBank(bankId: number): Bank;
    static getInstance(lookupProvider: Provider): BankController;
    getNBT(lookupProvider: Provider): CompoundTag;
    loadBanks(lookupProvider: Provider, nbttagcompound1: CompoundTag): void;
    removeBank(lookupProvider: Provider, bank: number): void;
    saveBank(lookupProvider: Provider, bank: Bank): void;
    saveBanks(lookupProvider: Provider): void;
  }


  class ChunkController {
    static instance: ChunkController;
    constructor();
    clear(): void;
    load(world: ServerLevel, id: UUID, xChunk: number, zChunk: number): void;
    size(): number;
    unload(world: ServerLevel, id: UUID, xChunk: number, zChunk: number): void;
  }


  class CobblemonHelper {
    static Enabled: boolean;
    static get types(): string[];
    static getPokemonModel(entity: Entity): EntityModel;
    static getType(entity: Entity): ResourceLocation;
    static isPokemon(entity: Entity): boolean;
    static setType(entity: Entity, resourceLocation: ResourceLocation): void;
  }


  class CustomGuiController {
    static getOpenGui(player: Player): CustomGuiWrapper;
    static onButton(event: ButtonEvent): void;
    static onClose(event: CloseEvent): void;
    static onQuickCraft(event: SlotEvent): void;
    static onScrollClick(event: ScrollEvent): void;
    static onSlotClick(event: SlotClickEvent): boolean;
    static returnCancelled(event: Event): boolean;
  }


  interface DialogController extends IDialogHandler {}
  class DialogController extends IDialogHandler {
    categoriesSync: HashMap;
    categories: HashMap;
    dialogs: HashMap;
    static instance: DialogController;
    constructor();
    categories(): IDialogCategory[];
    containsCategoryName(category: DialogCategory): boolean;
    containsDialogName(category: DialogCategory, dialog: Dialog): boolean;
    get(id: number): Dialog;
    hasDialog(dialogId: number): boolean;
    load(lookupProvider: Provider): void;
    removeCategory(category: number): void;
    removeDialog(dialog: Dialog): void;
    saveCategory(lookupProvider: Provider, category: DialogCategory): void;
    saveDialog(lookupProvider: Provider, category: DialogCategory, dialog: Dialog): Dialog;
  }


  interface FactionController extends IFactionHandler {}
  class FactionController extends IFactionHandler {
    factionsSync: HashMap;
    factions: HashMap;
    static instance: FactionController;
    constructor();
    create(name: string, color: number): IFaction;
    delete(id: number): IFaction;
    get(id: number): IFaction;
    get firstFaction(): Faction;
    get firstFactionId(): number;
    get nBT(): CompoundTag;
    get names(): string[];
    get unusedId(): number;
    getFaction(faction: number): Faction;
    getFactionFromName(factioname: string): Faction;
    hasName(newName: string): boolean;
    list(): IFaction[];
    load(): void;
    loadFactions(stream: DataInputStream): void;
    saveFaction(faction: Faction): void;
    saveFactions(): void;
  }


  class GlobalDataController {
    static instance: GlobalDataController;
    constructor();
    incrementItemGiverId(): number;
    saveData(): void;
  }


  interface IScriptBlockHandler extends IScriptHandler {}
  class IScriptBlockHandler extends IScriptHandler {
    get block(): IBlock;
  }


  class IScriptHandler {
    clearConsole(): void;
    get consoleText(): Map<Long, string>;
    get enabled(): boolean;
    get language(): string;
    get scripts(): ScriptContainer[];
    isClient(): boolean;
    noticeString(): string;
    runScript(var1: EnumScriptType, var2: Event): void;
    set enabled(var1: boolean);
    set language(var1: string);
  }


  class LinkedNpcController {
    static Instance: LinkedNpcController;
    list: List;
    constructor();
    addData(name: string): void;
    get dir(): File;
    getData(name: string): LinkedData;
    loadNpcData(npc: EntityNPCInterface): void;
    removeData(name: string): void;
    save(): void;
    saveNpcData(npc: EntityNPCInterface): void;
  }


  class MassBlockController {
    constructor();
    static Queue(imb: IMassBlock): void;
    static Update(): void;
  }


  class PhysicsHelper {
    static Enabled: boolean;
    static resetEntityPhysics(level: Level, id: number): void;
  }


  class PlayerDataController {
    static instance: PlayerDataController;
    nameUUIDs: Map;
    constructor();
    addPlayerMessage(server: MinecraftServer, username: string, mail: PlayerMail): void;
    getBankData(player: Player, bankId: number): PlayerBankData;
    getDataFromUsername(server: MinecraftServer, username: string): PlayerData;
    hasPlayer(username: string): string;
  }


  class PlayerQuestController {
    static addActiveQuest(quest: Quest, player: Player): void;
    static canQuestBeAccepted(player: Player, questId: number): boolean;
    static getActiveQuests(player: Player): Vector<Quest>;
    static hasActiveQuests(player: Player): boolean;
    static isQuestActive(player: Player, quest: number): boolean;
    static isQuestCompleted(player: Player, quest: number): boolean;
    static isQuestFinished(player: Player, questid: number): boolean;
    static setQuestFinished(quest: Quest, player: Player): void;
  }


  interface QuestController extends IQuestHandler {}
  class QuestController extends IQuestHandler {
    categoriesSync: HashMap;
    categories: HashMap;
    quests: HashMap;
    static instance: QuestController;
    constructor();
    categories(): IQuestCategory[];
    containsCategoryName(category: QuestCategory): boolean;
    containsQuestName(category: QuestCategory, quest: Quest): boolean;
    get(id: number): Quest;
    load(lookupProvider: Provider): void;
    removeCategory(category: number): void;
    removeQuest(quest: Quest): void;
    saveCategory(lookupProvider: Provider, category: QuestCategory): void;
    saveQuest(lookupProvider: Provider, category: QuestCategory, quest: Quest): void;
  }


  interface RecipeController extends IRecipeHandler {}
  class RecipeController extends IRecipeHandler {
    globalRecipes: HashMap;
    anvilRecipes: HashMap;
    static instance: RecipeController;
    static readonly version: number;
    nextId: number;
    static syncRecipes: HashMap;
    constructor();
    addRecipe(name: string, global: boolean, result: ItemStack, ...objects: any[]): IRecipe;
    addRecipe(name: string, global: boolean, result: ItemStack, width: number, height: number, ...objects: ItemStack[]): IRecipe;
    delete(id: number): RecipeCarpentry;
    findMatchingRecipe(inventoryCrafting: CraftingContainer): RecipeCarpentry;
    get carpentryList(): IRecipe[];
    get globalList(): IRecipe[];
    getRecipe(id: number): RecipeCarpentry;
    load(provider: Provider): void;
    reloadGlobalRecipes(): void;
    saveRecipe(recipe: RecipeCarpentry): RecipeCarpentry;
  }


  class SchematicController {
    static Instance: SchematicController;
    included: List;
    build(schem: SchematicWrapper, sender: CommandSourceStack): void;
    get dir(): File;
    info(sender: CommandSourceStack): void;
    list(): string[];
    load(name: string): SchematicWrapper;
    save(sender: CommandSourceStack, name: string, pos: BlockPos, height: number, width: number, length: number): void;
    stop(sender: CommandSourceStack): void;
    updateBuilding(server: MinecraftServer): void;
  }


  class ScriptContainer {
    static Current: ScriptContainer;
    static readonly Data: HashMap;
    fullscript: string;
    script: string;
    console: TreeMap;
    errored: boolean;
    scripts: List;
    lastCreated: number;
    constructor(handler: IScriptHandler);
    appandConsole(message: string): void;
    hasCode(): boolean;
    isValid(): boolean;
    load(compound: CompoundTag): void;
    run(type: EnumScriptType, event: Event): void;
    run(type: string, event: any): void;
    save(compound: CompoundTag): CompoundTag;
    setEngine(scriptLanguage: string): void;
  }


  class ScriptController {
    static Instance: ScriptController;
    static HasStart: boolean;
    languages: Map;
    factories: Map;
    scripts: Map;
    playerScripts: PlayerScriptData;
    forgeScripts: ForgeScriptData;
    lastLoaded: number;
    lastPlayerUpdate: number;
    dir: File;
    compound: CompoundTag;
    shouldSave: boolean;
    constructor();
    getEngineByName(language: string): ScriptEngine;
    loadCategories(): void;
    loadForgeScripts(): boolean;
    loadPlayerScripts(): boolean;
    loadStoredData(): boolean;
    nbtLanguages(): ListTag;
    saveLevel(event: Save): void;
    setForgeScripts(compound: CompoundTag): void;
    setPlayerScripts(compound: CompoundTag): void;
  }


  interface ServerCloneController extends ICloneHandler {}
  class ServerCloneController extends ICloneHandler {
    lastLoaded: number;
    static Instance: ServerCloneController;
    constructor();
    addClone(nbttagcompound: CompoundTag, name: string, tab: number): string;
    cleanTags(nbttagcompound: CompoundTag): void;
    get(tab: number, name: string, level: IWorld): IEntity;
    get dir(): File;
    getCloneData(player: CommandSourceStack, name: string, tab: number): CompoundTag;
    getClones(tab: number): string[];
    hasClone(tab: number, name: string): boolean;
    remove(tab: number, name: string): void;
    removeClone(name: string, tab: number): boolean;
    saveClone(tab: number, name: string, compound: CompoundTag): void;
    set(tab: number, name: string, entity: IEntity): void;
    spawn(x: number, y: number, z: number, tab: number, name: string, level: IWorld): IEntity;
  }


  class SpawnController {
    biomes: HashMap;
    data: ArrayList;
    random: RandomSource;
    static instance: SpawnController;
    constructor();
    get nBT(): CompoundTag;
    get scroll(): Map<string, number>;
    get unusedId(): number;
    getRandomSpawnData(biome: ResourceLocation): SpawnData;
    getSpawnData(id: number): SpawnData;
    getSpawnList(biome: ResourceLocation): SpawnData[];
    hasSpawnList(biome: ResourceLocation): boolean;
    loadData(stream: DataInputStream): void;
    removeSpawnData(id: number): void;
    saveData(): void;
    saveSpawnData(spawn: SpawnData): void;
  }


  class SyncController {
    static syncAllDialogs(provider: Provider): void;
    static syncAllQuests(provider: Provider): void;
    static syncPlayer(player: ServerPlayer): void;
  }


  class TransportController {
    categories: HashMap;
    constructor();
    containsLocationName(name: string): boolean;
    static get instance(): TransportController;
    get nBT(): CompoundTag;
    getTransport(transportId: number): TransportLocation;
    getTransport(name: string): TransportLocation;
    loadCategories(file: File): void;
    removeCategory(id: number): void;
    removeLocation(location: number): TransportLocation;
    saveCategories(): void;
    saveCategory(name: string, id: number): void;
    saveLocation(categoryId: number, compound: CompoundTag, player: ServerPlayer, npc: EntityNPCInterface): TransportLocation;
    setLocation(location: TransportLocation): void;
  }


  class VisibilityController {
    static instance: VisibilityController;
    static addValue(map: HashMap<number, ArrayList<EntityNPCInterface>>, id: number, npc: EntityNPCInterface): void;
    static checkIsVisible(npc: EntityNPCInterface, playerMP: ServerPlayer): void;
    onUpdate(player: ServerPlayer): void;
    remove(npc: EntityNPCInterface): void;
    trackNpc(npc: EntityNPCInterface): void;
  }

}

declare module 'noppes.npcs.controllers.data' {
  import { ICompatibilty, NpcMiscInventory } from 'noppes.npcs';
  import { IAvailability, IDialog, IDialogOption, IDialogCategory, IQuest, IFaction, IQuestCategory, IQuestObjective, IRecipe } from 'noppes.npcs.api.handler.data';
  import { HashSet, HashMap, Map, List, UUID, ArrayList, Vector } from 'java.util';
  import { EnumAvailabilityDialog, EnumAvailabilityQuest, EnumDayTime, EnumAvailabilityFactionType, EnumAvailabilityFaction, EnumAvailabilityScoreboard, EnumScriptType, EnumQuestRepeat, EnumQuestCompletion } from 'noppes.npcs.constants';
  import { Provider } from 'HolderLookup';
  import { CompoundTag, ListTag } from 'net.minecraft.nbt';
  import { Player } from 'net.minecraft.world.entity.player';
  import { IPlayer, ICustomNpc } from 'noppes.npcs.api.entity';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { EntityNPCInterface } from 'noppes.npcs.entity';
  import { BlockPos, NonNullList } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Integer, Long } from 'java.lang';
  import { IScriptHandler, ScriptContainer } from 'noppes.npcs.controllers';
  import { Event } from 'net.neoforged.bus.api';
  import { ILine, IMark, IPlayerMail } from 'noppes.npcs.api.entity.data';
  import { LivingEntity, Entity } from 'net.minecraft.world.entity';
  import { DataTimers } from 'noppes.npcs.entity.data';
  import { Level } from 'net.minecraft.world.level';
  import { JobItemGiver } from 'noppes.npcs.roles';
  import { Container } from 'net.minecraft.world';
  import { IContainer, IPlayerSkin } from 'noppes.npcs.api';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';
  import { QuestInterface } from 'noppes.npcs.quests';
  import { ShapedRecipe, Ingredient, CraftingInput } from 'net.minecraft.world.item.crafting';
  import { WeightedEntry, Weight } from 'net.minecraft.util.random';
  import { ITransportLocation } from 'noppes.npcs.api.entity.data.role.IRoleTransporter';

  interface Availability extends ICompatibilty, IAvailability {}
  class Availability extends ICompatibilty {
    static scores: HashSet;
    version: number;
    dialogAvailable: EnumAvailabilityDialog;
    dialog2Available: EnumAvailabilityDialog;
    dialog3Available: EnumAvailabilityDialog;
    dialog4Available: EnumAvailabilityDialog;
    dialogId: number;
    dialog2Id: number;
    dialog3Id: number;
    dialog4Id: number;
    questAvailable: EnumAvailabilityQuest;
    quest2Available: EnumAvailabilityQuest;
    quest3Available: EnumAvailabilityQuest;
    quest4Available: EnumAvailabilityQuest;
    questId: number;
    quest2Id: number;
    quest3Id: number;
    quest4Id: number;
    daytime: EnumDayTime;
    factionId: number;
    faction2Id: number;
    factionAvailable: EnumAvailabilityFactionType;
    faction2Available: EnumAvailabilityFactionType;
    factionStance: EnumAvailabilityFaction;
    faction2Stance: EnumAvailabilityFaction;
    scoreboardType: EnumAvailabilityScoreboard;
    scoreboard2Type: EnumAvailabilityScoreboard;
    scoreboardObjective: string;
    scoreboard2Objective: string;
    scoreboardValue: number;
    scoreboard2Value: number;
    minPlayerLevel: number;
    dialogAvailable(id: number, en: EnumAvailabilityDialog, player: Player): boolean;
    get daytime(): number;
    get minPlayerLevel(): number;
    get version(): number;
    getDialog(i: number): number;
    getQuest(i: number): number;
    hasOptions(): boolean;
    isAvailable(player: Player): boolean;
    isAvailable(player: IPlayer): boolean;
    load(lookupProvider: Provider, compound: CompoundTag): void;
    questAvailable(id: number, en: EnumAvailabilityQuest, player: Player): boolean;
    removeDialog(i: number): void;
    removeFaction(i: number): void;
    removeQuest(i: number): void;
    save(lookupProvider: Provider, compound: CompoundTag): CompoundTag;
    set daytime(type: number);
    set minPlayerLevel(level: number);
    set version(version: number);
    setDialog(i: number, id: number, type: number): void;
    setFaction(i: number, id: number, type: number, stance: number): void;
    setFaction2Availability(value: number): void;
    setFaction2AvailabilityStance(integer: number): void;
    setFactionAvailability(value: number): void;
    setFactionAvailabilityStance(integer: number): void;
    setQuest(i: number, id: number, type: number): void;
    setScoreboard(i: number, objective: string, type: number, value: number): void;
  }


  class Bank {
    id: number;
    name: string;
    slotTypes: HashMap;
    startSlots: number;
    maxSlots: number;
    currencyInventory: NpcMiscInventory;
    upgradeInventory: NpcMiscInventory;
    constructor();
    addAdditionalSaveData(lookupProvider: Provider, nbttagcompound: CompoundTag): void;
    canBeUpgraded(slot: number): boolean;
    get maxSlots(): number;
    isUpgraded(slot: number): boolean;
    readAdditionalSaveData(lookupProvider: Provider, nbttagcompound: CompoundTag): void;
  }


  class BankData {
    itemSlots: HashMap;
    upgradedSlots: HashMap;
    unlockedSlots: number;
    bankId: number;
    constructor();
    isUpgraded(bank: Bank, slot: number): boolean;
    openBankGui(player: ServerPlayer, npc: EntityNPCInterface, bankId: number, slot: number): void;
    readNBT(lookupProvider: Provider, nbttagcompound: CompoundTag): void;
    writeNBT(lookupProvider: Provider, nbttagcompound: CompoundTag): void;
  }


  class BlockData {
    pos: BlockPos;
    state: BlockState;
    tile: CompoundTag;
    constructor(pos: BlockPos, state: BlockState, tile: CompoundTag);
    get nBT(): CompoundTag;
    get stack(): ItemStack;
    static getData(compound: CompoundTag): BlockData;
  }


  class CloneSpawnData {
    tab: number;
    name: string;
    constructor(tab: number, name: string);
    get compound(): CompoundTag;
    static load(list: ListTag): Map<number, CloneSpawnData>;
    static save(data: Map<number, CloneSpawnData>): ListTag;
  }


  class DataTransform {
    display: CompoundTag;
    ai: CompoundTag;
    advanced: CompoundTag;
    inv: CompoundTag;
    stats: CompoundTag;
    role: CompoundTag;
    job: CompoundTag;
    hasDisplay: boolean;
    hasAi: boolean;
    hasAdvanced: boolean;
    hasInv: boolean;
    hasStats: boolean;
    hasRole: boolean;
    hasJob: boolean;
    isActive: boolean;
    editingModus: boolean;
    constructor(npc: EntityNPCInterface);
    get advanced(): CompoundTag;
    get display(): CompoundTag;
    get job(): CompoundTag;
    get role(): CompoundTag;
    isValid(): boolean;
    processAdvanced(compoundAdv: CompoundTag, compoundRole: CompoundTag, compoundJob: CompoundTag): CompoundTag;
    readOptions(compound: CompoundTag): void;
    readToNBT(compound: CompoundTag): void;
    save(compound: CompoundTag): CompoundTag;
    transform(isActive: boolean): void;
    writeOptions(compound: CompoundTag): CompoundTag;
  }


  interface Dialog extends ICompatibilty, IDialog {}
  class Dialog extends ICompatibilty {
    version: number;
    id: number;
    title: string;
    text: string;
    quest: number;
    categoryName: string;
    readonly category: DialogCategory;
    options: HashMap;
    availability: Availability;
    factionOptions: FactionOptions;
    sound: string;
    command: string;
    mail: PlayerMail;
    hideNPC: boolean;
    showWheel: boolean;
    disableEsc: boolean;
    constructor(category: DialogCategory);
    copy(player: Player): Dialog;
    get availability(): IAvailability;
    get category(): IDialogCategory;
    get command(): string;
    get id(): number;
    get name(): string;
    get options(): IDialogOption[];
    get quest(): Quest;
    get text(): string;
    get version(): number;
    getOption(slot: number): IDialogOption;
    hasDialogs(player: Player): boolean;
    hasOtherOptions(): boolean;
    hasQuest(): boolean;
    readNBT(lookupProvider: Provider, compound: CompoundTag): void;
    readNBTPartial(lookupProvider: Provider, compound: CompoundTag): void;
    save(lookupProvider: Provider, compound: CompoundTag): CompoundTag;
    save(lookupProvider: Provider): void;
    set command(command: string);
    set name(name: string);
    set quest(quest: IQuest);
    set text(text: string);
    set version(version: number);
    writeToNBTPartial(lookupProvider: Provider, compound: CompoundTag): CompoundTag;
  }


  interface DialogCategory extends IDialogCategory {}
  class DialogCategory extends IDialogCategory {
    id: number;
    title: string;
    dialogs: HashMap;
    create(): IDialog;
    dialogs(): IDialog[];
    get name(): string;
    readNBT(lookupProvider: Provider, compound: CompoundTag): void;
    writeNBT(lookupProvider: Provider, compound: CompoundTag): CompoundTag;
  }


  interface DialogOption extends IDialogOption {}
  class DialogOption extends IDialogOption {
    id: number;
    dialogId: number;
    option: string;
    title: string;
    optionType: number;
    optionColor: number;
    command: string;
    slot: number;
    canClose(): boolean;
    get dialog(): Dialog;
    get name(): string;
    get slot(): number;
    get type(): number;
    hasDialog(): boolean;
    isAvailable(player: Player): boolean;
    isValid(): boolean;
    readNBT(compound: CompoundTag): void;
    writeNBT(): CompoundTag;
  }


  interface Faction extends IFaction {}
  class Faction extends IFaction {
    name: string;
    color: number;
    attackFactions: HashSet;
    id: number;
    neutralPoints: number;
    friendlyPoints: number;
    defaultPoints: number;
    hideFaction: boolean;
    getsAttacked: boolean;
    constructor();

    constructor(id: number, name: string, color: number, defaultPoints: number);
    addHostile(id: number): void;
    static formatName(name: string): string;
    get attackedByMobs(): boolean;
    get color(): number;
    get defaultPoints(): number;
    get hostileList(): number[];
    get id(): number;
    get isHidden(): boolean;
    get name(): string;
    hasHostile(id: number): boolean;
    hostileToFaction(factionId: number): boolean;
    hostileToNpc(npc: ICustomNpc): boolean;
    isAggressiveToNpc(entity: EntityNPCInterface): boolean;
    isAggressiveToPlayer(player: Player): boolean;
    isFriendlyToPlayer(player: Player): boolean;
    isNeutralToPlayer(player: Player): boolean;
    playerStatus(player: IPlayer): number;
    readNBT(compound: CompoundTag): void;
    removeHostile(id: number): void;
    save(): void;
    set attackedByMobs(bo: boolean);
    set defaultPoints(points: number);
    set isHidden(bo: boolean);
    writeNBT(compound: CompoundTag): CompoundTag;
  }


  class FactionOptions {
    decreaseFactionPoints: boolean;
    decreaseFaction2Points: boolean;
    factionId: number;
    faction2Id: number;
    factionPoints: number;
    faction2Points: number;
    addPoints(player: Player): void;
    hasFaction(id: number): boolean;
    load(compound: CompoundTag): void;
    save(par1CompoundTag: CompoundTag): CompoundTag;
  }


  interface ForgeScriptData extends IScriptHandler {}
  class ForgeScriptData extends IScriptHandler {
    lastInited: number;
    hadInteract: boolean;
    clear(): void;
    clearConsole(): void;
    get consoleText(): Map<Long, string>;
    get enabled(): boolean;
    get language(): string;
    get scripts(): ScriptContainer[];
    isClient(): boolean;
    isEnabled(): boolean;
    load(compound: CompoundTag): void;
    noticeString(): string;
    runScript(type: EnumScriptType, event: Event): void;
    runScript(type: string, event: Event): void;
    save(compound: CompoundTag): CompoundTag;
    set enabled(bo: boolean);
    set language(lang: string);
  }


  interface Line extends ILine {}
  class Line extends ILine {
    constructor();

    constructor(text: string);
    copy(): Line;
    static formatTarget(line: Line, entity: LivingEntity): Line;
    get showText(): boolean;
    get sound(): string;
    get text(): string;
    set showText(show: boolean);
    set sound(sound: string);
    set text(text: string);
  }


  class Lines {
    lines: HashMap;
    getLine(isRandom: boolean): Line;
    isEmpty(): boolean;
    readNBT(compound: CompoundTag): void;
    save(): CompoundTag;
  }


  class MarkData {
    marks: List;
    addMark(type: number): IMark;
    addMark(type: number, color: number): IMark;
    static get(entity: LivingEntity): MarkData;
    get nBT(): CompoundTag;
    save(): void;
    set nBT(compound: CompoundTag);
    syncClients(): void;
  }


  class PlayerBankData {
    banks: HashMap;
    getBank(bankId: number): BankData;
    getBankOrDefault(lookupProvider: Provider, bankId: number): BankData;
    hasBank(bank: number): boolean;
    loadNBTData(lookupProvider: Provider, compound: CompoundTag): void;
    loadNew(bank: number): void;
    saveNBTData(lookupProvider: Provider, playerData: CompoundTag): void;
  }


  class PlayerData {
    scriptBlockPos: BlockPos;
    dialogData: PlayerDialogData;
    bankData: PlayerBankData;
    questData: PlayerQuestData;
    transportData: PlayerTransportData;
    factionData: PlayerFactionData;
    itemgiverData: PlayerItemGiverData;
    mailData: PlayerMailData;
    skinData: PlayerSkinData;
    scriptData: PlayerScriptData;
    scriptStoreddata: CompoundTag;
    timers: DataTimers;
    editingNpc: EntityNPCInterface;
    cloned: CompoundTag;
    player: Player;
    playername: string;
    uuid: string;
    companionID: number;
    playerLevel: number;
    updateClient: boolean;
    dialogId: number;
    prevHeldItem: ItemStack;
    mounted: Entity;
    iAmStealingYourDatas: UUID;
    static get(player: Player): PlayerData;
    get nBT(): CompoundTag;
    get syncNBT(): CompoundTag;
    hasCompanion(): boolean;
    static loadPlayerData(player: string): CompoundTag;
    save(update: boolean): void;
    setCompanion(npc: EntityNPCInterface): void;
    setNBT(provider: Provider, data: CompoundTag): void;
    updateCompanion(level: Level): void;
  }


  class PlayerDialogData {
    dialogsRead: HashSet;
    loadNBTData(compound: CompoundTag): void;
    saveNBTData(compound: CompoundTag): void;
  }


  class PlayerFactionData {
    factionData: HashMap;
    get playerGuiData(): CompoundTag;
    getFactionPoints(player: Player, factionId: number): number;
    increasePoints(player: Player, factionId: number, points: number): void;
    loadNBTData(compound: CompoundTag): void;
    saveNBTData(compound: CompoundTag): void;
  }


  class PlayerItemGiverData {
    getItemIndex(jobItemGiver: JobItemGiver): number;
    getTime(jobItemGiver: JobItemGiver): number;
    hasInteractedBefore(jobItemGiver: JobItemGiver): boolean;
    loadNBTData(compound: CompoundTag): void;
    saveNBTData(compound: CompoundTag): void;
    setItemIndex(jobItemGiver: JobItemGiver, i: number): void;
    setTime(jobItemGiver: JobItemGiver, day: number): void;
  }


  interface PlayerMail extends IPlayerMail, Container {}
  class PlayerMail extends IPlayerMail {
    subject: string;
    sender: string;
    message: CompoundTag;
    time: number;
    beenRead: boolean;
    questId: number;
    items: NonNullList;
    timePast: number;
    canPlaceItem(var1: number, var2: ItemStack): boolean;
    clearContent(): void;
    copy(): PlayerMail;
    get container(): IContainer;
    get containerSize(): number;
    get maxStackSize(): number;
    get quest(): Quest;
    get sender(): string;
    get subject(): string;
    get text(): string[];
    getItem(i: number): ItemStack;
    hasQuest(): boolean;
    isEmpty(): boolean;
    isValid(): boolean;
    readNBT(compound: CompoundTag): void;
    removeItem(index: number, count: number): ItemStack;
    removeItemNoUpdate(var1: number): ItemStack;
    set quest(id: number);
    set sender(sender: string);
    set subject(subject: string);
    set text(pages: string[]);
    setChanged(): void;
    setItem(index: number, stack: ItemStack): void;
    startOpen(player: Player): void;
    stillValid(var1: Player): boolean;
    stopOpen(player: Player): void;
    writeNBT(): CompoundTag;
  }


  class PlayerMailData {
    playermail: ArrayList;
    hasMail(): boolean;
    loadNBTData(compound: CompoundTag): void;
    saveNBTData(compound: CompoundTag): CompoundTag;
  }


  class PlayerQuestData {
    activeQuests: HashMap;
    finishedQuests: HashMap;
    checkQuestCompletion(player: Player, type: number): boolean;
    getQuestCompletion(player: Player, npc: EntityNPCInterface): QuestData;
    loadNBTData(mainCompound: CompoundTag): void;
    saveNBTData(maincompound: CompoundTag): void;
  }


  interface PlayerScriptData extends IScriptHandler {}
  class PlayerScriptData extends IScriptHandler {
    lastInited: number;
    hadInteract: boolean;
    constructor(player: Player);
    clear(): void;
    clearConsole(): void;
    get consoleText(): Map<Long, string>;
    get enabled(): boolean;
    get language(): string;
    get player(): IPlayer;
    get scripts(): ScriptContainer[];
    isClient(): boolean;
    isEnabled(): boolean;
    load(compound: CompoundTag): void;
    noticeString(): string;
    runScript(type: EnumScriptType, event: Event): void;
    save(compound: CompoundTag): CompoundTag;
    set enabled(bo: boolean);
    set language(lang: string);
  }


  interface PlayerSkinData extends IPlayerSkin {}
  class PlayerSkinData extends IPlayerSkin {
    get bodyColor(): number;
    get bodyType(): number;
    get eyesColor(): number;
    get faceType(): number;
    get gender(): string;
    get hairColor(): number;
    get hairType(): number;
    get jacketType(): number;
    get pantsType(): number;
    get peculiarities(): number[];
    get resLoc(): ResourceLocation;
    get shoesType(): number;
    getPartResLocByNumber(textureManager: ResourceManager, name: string, partNum: number): ResourceLocation;
    hasChanged(): boolean;
    isActive(): boolean;
    isMale(): boolean;
    loadNBTData(tag: CompoundTag): void;
    markChanged(): void;
    markSynced(): void;
    static needsAnyResync(): boolean;
    static resyncPerformed(): void;
    saveNBTData(tag: CompoundTag): CompoundTag;
    set bodyColor(bodyColor: number);
    set bodyType(body: number);
    set eyesColor(eyesColor: number);
    set faceType(face: number);
    set hairColor(hairColor: number);
    set hairType(hair: number);
    set jacketType(jacket: number);
    set pantsType(leg: number);
    set peculiarities(peculiarities: number[]);
    set shoesType(shoes: number);
    setMale(male: boolean): PlayerSkinData;
  }


  class PlayerTransportData {
    transports: HashSet;
    loadNBTData(compound: CompoundTag): void;
    saveNBTData(compound: CompoundTag): void;
  }


  interface Quest extends ICompatibilty, IQuest {}
  class Quest extends ICompatibilty {
    version: number;
    id: number;
    title: string;
    type: number;
    repeat: EnumQuestRepeat;
    completion: EnumQuestCompletion;
    categoryName: string;
    category: QuestCategory;
    logText: string;
    completeText: string;
    completerNpc: string;
    nextQuestid: number;
    command: string;
    mailData: CompoundTag;
    mail: PlayerMail;
    questData: CompoundTag;
    questInterface: QuestInterface;
    rewardExp: number;
    rewardItemsData: CompoundTag;
    rewardItems: NpcMiscInventory;
    randomReward: boolean;
    factionOptions: FactionOptions;
    constructor(category: QuestCategory);
    complete(player: Player, data: QuestData): boolean;
    copy(lookupProvider: Provider): Quest;
    get category(): IQuestCategory;
    get completeText(): string;
    get id(): number;
    get isRepeatable(): boolean;
    get logText(): string;
    get name(): string;
    get nextQuest(): Quest;
    get npcName(): string;
    get rewards(): IContainer;
    get type(): number;
    get version(): number;
    getObjectives(player: IPlayer): IQuestObjective[];
    hasNewQuest(): boolean;
    readNBT(lookupProvider: Provider, compound: CompoundTag): void;
    readNBTPartial(lookupProvider: Provider, compound: CompoundTag): void;
    save(lookupProvider: Provider, compound: CompoundTag): CompoundTag;
    save(lookupProvider: Provider): void;
    set completeText(text: string);
    set logText(text: string);
    set name(name: string);
    set nextQuest(quest: IQuest);
    set npcName(name: string);
    set type(questType: number);
    set version(version: number);
    writeToNBTPartial(lookupProvider: Provider, compound: CompoundTag): CompoundTag;
  }


  interface QuestCategory extends IQuestCategory {}
  class QuestCategory extends IQuestCategory {
    quests: HashMap;
    id: number;
    title: string;
    create(): IQuest;
    get name(): string;
    quests(): IQuest[];
    readNBT(lookupProvider: Provider, nbttagcompound: CompoundTag): void;
    writeNBT(lookupProvider: Provider, nbttagcompound: CompoundTag): CompoundTag;
  }


  class QuestData {
    quest: Quest;
    isCompleted: boolean;
    extraData: CompoundTag;
    constructor(quest: Quest);
    addAdditionalSaveData(nbttagcompound: CompoundTag): void;
    readAdditionalSaveData(nbttagcompound: CompoundTag): void;
  }


  interface RecipeCarpentry extends IRecipe, ShapedRecipe {}
  class RecipeCarpentry extends IRecipe {
    availability: Availability;
    isGlobal: boolean;
    ignoreDamage: boolean;
    ignoreNBT: boolean;
    savesRecipe: boolean;
    name: string;
    constructor(width: number, height: number, recipe: NonNullList<Ingredient>, result: ItemStack);

    constructor(name: string);
    copy(recipe: RecipeCarpentry): void;
    static createRecipe(recipe: RecipeCarpentry, par1ItemStack: ItemStack, ...limbSwingAmountArrayOfObj: any[]): RecipeCarpentry;
    delete(): void;
    get height(): number;
    get ignoreDamage(): boolean;
    get ignoreNBT(): boolean;
    get name(): string;
    get recipe(): ItemStack[];
    get result(): ItemStack;
    get width(): number;
    getCraftingItem(i: number): ItemStack;
    getRemainingItems(inventoryCrafting: CraftingInput): NonNullList<ItemStack>;
    getResultItem(registries: Provider): ItemStack;
    isGlobal(): boolean;
    isSpecial(): boolean;
    isValid(): boolean;
    static load(compound: CompoundTag, provider: Provider): RecipeCarpentry;
    matches(inventoryCrafting: CraftingInput, world: Level): boolean;
    save(): void;
    saves(bo: boolean): void;
    saves(): boolean;
    set ignoreDamage(bo: boolean);
    set ignoreNBT(bo: boolean);
    setIsGlobal(bo: boolean): void;
    writeNBT(provider: Provider): CompoundTag;
  }


  class RecipesDefault {
    static addRecipe(name: string, ob: any, isGlobal: boolean, ...recipe: any[]): void;
    static loadDefaultRecipes(i: number): void;
  }


  interface SpawnData extends WeightedEntry {}
  class SpawnData extends WeightedEntry {
    biomes: List;
    id: number;
    name: string;
    data: Map;
    liquid: boolean;
    type: number;
    get weight(): Weight;
    getCompound(slot: number): CompoundTag;
    readNBT(compound: CompoundTag): void;
    set weight(weight: number);
    setClone(slot: number, tab: number, name: string): void;
    writeNBT(compound: CompoundTag): CompoundTag;
  }


  class TransportCategory {
    id: number;
    title: string;
    locations: HashMap;
    get defaultLocations(): Vector<TransportLocation>;
    readNBT(compound: CompoundTag): void;
    writeNBT(compound: CompoundTag): void;
  }


  interface TransportLocation extends ITransportLocation {}
  class TransportLocation extends ITransportLocation {
    id: number;
    name: string;
    pos: BlockPos;
    type: number;
    dimension: ResourceKey;
    category: TransportCategory;
    get dimension(): string;
    get id(): number;
    get name(): string;
    get type(): number;
    get x(): number;
    get y(): number;
    get z(): number;
    isDefault(): boolean;
    readNBT(compound: CompoundTag): void;
    writeNBT(): CompoundTag;
  }

}

declare module 'noppes.npcs.controllers.data.MarkData' {
  import { IMark } from 'noppes.npcs.api.entity.data';
  import { Availability } from 'noppes.npcs.controllers.data';
  import { IAvailability } from 'noppes.npcs.api.handler.data';

  interface Mark extends IMark {}
  class Mark extends IMark {
    type: number;
    availability: Availability;
    color: number;
    get availability(): IAvailability;
    get color(): number;
    get type(): number;
    set color(color: number);
    set type(type: number);
    update(): void;
  }

}

declare module 'noppes.npcs.controllers.LinkedNpcController' {
  import { CompoundTag } from 'net.minecraft.nbt';

  class LinkedData {
    name: string;
    time: number;
    data: CompoundTag;
    constructor();
    get nBT(): CompoundTag;
    set nBT(compound: CompoundTag);
  }

}

declare module 'noppes.npcs.controllers.MassBlockController' {
  import { EntityNPCInterface } from 'noppes.npcs.entity';
  import { List } from 'java.util';
  import { BlockData } from 'noppes.npcs.controllers.data';

  class IMassBlock {
    get npc(): EntityNPCInterface;
    get range(): number;
    processed(var1: BlockData[]): void;
  }

}

declare module 'noppes.npcs.db.DatabaseColumn' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Type extends Enum<Type> {}
  class Type extends Enum<Type> {
    static readonly INT: Type;
    static readonly TEXT: Type;
    static readonly VARCHAR: Type;
    static readonly ENUM: Type;
    static readonly UUID: Type;
    static readonly SMALLINT: Type;
    static readonly JSON: Type;
    static readonly BOOLEAN: Type;
    static valueOf(name: string): Type;
    static values(): Type[];
  }

}

declare module 'noppes.npcs.db' {
  import { Connection } from 'java.sql';

  class DatabaseController {
    static create(): Connection;
    static init(): void;
  }

}

declare module 'noppes.npcs.entity.data' {
  import { List, Map } from 'java.util';
  import { EntityNPCInterface } from 'noppes.npcs.entity';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { AbstractAbility } from 'noppes.npcs.ability';
  import { EnumAbilityType, EnumScriptType } from 'noppes.npcs.constants';
  import { INPCAdvanced, INPCAi, INPCDisplay, INPCInventory, INPCMelee, INPCRanged, INPCStats } from 'noppes.npcs.api.entity.data';
  import { Lines, FactionOptions, Line, Availability } from 'noppes.npcs.controllers.data';
  import { BlockPos } from 'net.minecraft.core';
  import { IPos, ITimers } from 'noppes.npcs.api';
  import { GameProfile } from 'com.mojang.authlib';
  import { IPlayer } from 'noppes.npcs.api.entity';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { SimpleContainer } from 'net.minecraft.world';
  import { IItemStack } from 'noppes.npcs.api.item';
  import { DiedEvent } from 'noppes.npcs.api.event.NpcEvent';
  import { Entity, LivingEntity } from 'net.minecraft.world.entity';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { ItemEntity } from 'net.minecraft.world.entity.item';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Person } from 'noppes.npcs.entity.data.DataPeople';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { MinecraftServer } from 'net.minecraft.server';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { IScriptHandler, ScriptContainer } from 'noppes.npcs.controllers';
  import { Event } from 'net.neoforged.bus.api';
  import { Long } from 'java.lang';
  import { Resistances } from 'noppes.npcs';
  import { TagKey } from 'net.minecraft.tags';

  class DataAbilities {
    abilities: List;
    npc: EntityNPCInterface;
    constructor(npc: EntityNPCInterface);
    getAbility(type: EnumAbilityType): AbstractAbility;
    readToNBT(compound: CompoundTag): void;
    save(compound: CompoundTag): CompoundTag;
  }


  interface DataAdvanced extends INPCAdvanced {}
  class DataAdvanced extends INPCAdvanced {
    interactLines: Lines;
    worldLines: Lines;
    attackLines: Lines;
    killedLines: Lines;
    killLines: Lines;
    npcInteractLines: Lines;
    orderedLines: boolean;
    factions: FactionOptions;
    attackOtherFactions: boolean;
    defendFaction: boolean;
    disablePitch: boolean;
    scenes: DataScenes;
    constructor(npc: EntityNPCInterface);
    get attackLine(): Line;
    get interactLine(): Line;
    get killLine(): Line;
    get killedLine(): Line;
    get levelLine(): Line;
    get nPCInteractLine(): Line;
    getLine(type: number, slot: number): string;
    getLineCount(type: number): number;
    getSound(type: number): string;
    hasLevelLines(): boolean;
    playSound(type: number, volume: number, pitch: number): void;
    readToNBT(compound: CompoundTag): void;
    save(compound: CompoundTag): CompoundTag;
    setJob(job: number): void;
    setLine(type: number, slot: number, text: string, sound: string): void;
    setRole(role: number): void;
    setSound(type: number, sound: string): void;
  }


  interface DataAI extends INPCAi {}
  class DataAI extends INPCAi {
    onAttack: number;
    doorInteract: number;
    findShelter: number;
    canSwim: boolean;
    reactsToFire: boolean;
    avoidsWater: boolean;
    avoidsSun: boolean;
    returnToStart: boolean;
    directLOS: boolean;
    canLeap: boolean;
    canSprint: boolean;
    stopAndInteract: boolean;
    attackInvisible: boolean;
    movementType: number;
    animationType: number;
    npcInteracting: boolean;
    orientation: number;
    bodyOffsetX: number;
    bodyOffsetY: number;
    bodyOffsetZ: number;
    walkingRange: number;
    activeRange: number;
    movingPos: number;
    movingPattern: number;
    movingPause: boolean;
    mountControl: boolean;
    constructor(npc: EntityNPCInterface);
    appendMovingPath(pos: number[]): void;
    clearMovingPath(): void;
    decreaseMovingPath(): void;
    distanceToSqrToPathPoint(): number;
    get animation(): number;
    get attackInvisible(): boolean;
    get attackLOS(): boolean;
    get avoidsWater(): boolean;
    get canSwim(): boolean;
    get currentAnimation(): number;
    get currentMovingPath(): number[];
    get doorInteract(): number;
    get interactWithNPCs(): boolean;
    get leapAtTarget(): boolean;
    get movingPath(): number[][];
    get movingPathPauses(): boolean;
    get movingPathSize(): number;
    get movingPathType(): number;
    get movingPos(): number;
    get movingType(): number;
    get navigationType(): number;
    get retaliateType(): number;
    get returnsHome(): boolean;
    get sheltersFrom(): number;
    get standingType(): number;
    get startArray(): number[];
    get stopOnInteract(): boolean;
    get walkingSpeed(): number;
    get wanderingRange(): number;
    getMovingPathPos(m_pos: number): number[];
    getStartPos(): IPos;
    incrementMovingPath(): void;
    readToNBT(compound: CompoundTag): void;
    save(compound: CompoundTag): CompoundTag;
    set animation(type: number);
    set attackInvisible(attack: boolean);
    set attackLOS(enabled: boolean);
    set avoidsWater(enabled: boolean);
    set canSwim(canSwim: boolean);
    set doorInteract(type: number);
    set interactWithNPCs(interact: boolean);
    set leapAtTarget(leap: boolean);
    set movingPath(list: number[][]);
    set movingPos(pos: number);
    set movingType(type: number);
    set navigationType(type: number);
    set retaliateType(type: number);
    set returnsHome(bo: boolean);
    set sheltersFrom(type: number);
    set standingType(type: number);
    set stopOnInteract(stopOnInteract: boolean);
    set walkingSpeed(speed: number);
    set wanderingRange(range: number);
    setMountControl(enabled: boolean): void;
    setMovingPathPos(m_pos: number, pos: number[]): void;
    setMovingPathType(type: number, pauses: boolean): void;
    setStartPos(pos: BlockPos): void;
    setStartPos(pos: IPos): void;
    setStartPos(x: number, y: number, z: number): void;
    shouldReturnHome(): boolean;
    startPos(): BlockPos;
  }


  interface DataDisplay extends INPCDisplay {}
  class DataDisplay extends INPCDisplay {
    skinType: number;
    playerProfile: GameProfile;
    availability: Availability;
    constructor(npc: EntityNPCInterface);
    get bossColor(): number;
    get bossbar(): number;
    get capeTexture(): string;
    get hasLivingAnimation(): boolean;
    get hitboxState(): number;
    get markovGender(): number;
    get markovGeneratorId(): number;
    get model(): string;
    get name(): string;
    get overlayTexture(): string;
    get randomName(): string;
    get size(): number;
    get skinPlayer(): string;
    get skinTexture(): string;
    get skinUrl(): string;
    get tint(): number;
    get title(): string;
    get visible(): number;
    getModelScale(part: number): number[];
    getShowName(): number;
    isOverlayGlowing(): boolean;
    isShowingLayers(): boolean;
    isVisibleTo(player: IPlayer): boolean;
    isVisibleTo(player: ServerPlayer): boolean;
    loadProfile(): void;
    readToNBT(nbttagcompound: CompoundTag): void;
    save(nbttagcompound: CompoundTag): CompoundTag;
    set bossColor(color: number);
    set bossbar(type: number);
    set capeTexture(texture: string);
    set hasLivingAnimation(enabled: boolean);
    set hitboxState(state: number);
    set markovGender(gender: number);
    set markovGeneratorId(id: number);
    set model(id: string);
    set name(name: string);
    set overlayTexture(texture: string);
    set size(size: number);
    set skinPlayer(name: string);
    set skinTexture(texture: string);
    set skinUrl(url: string);
    set tint(color: number);
    set title(title: string);
    set visible(type: number);
    setModelScale(part: number, x: number, y: number, z: number): void;
    setOverlayGlowing(glowing: boolean): void;
    setShowName(type: number): void;
    setShowingLayers(showLayers: boolean): void;
    showName(): boolean;
  }


  interface DataInventory extends INPCInventory, SimpleContainer {}
  class DataInventory extends INPCInventory {
    drops: Map;
    dropchance: Map;
    weapons: Map;
    armor: Map;
    lootMode: number;
    constructor(npc: EntityNPCInterface);
    canPlaceItem(i: number, itemstack: ItemStack): boolean;
    clearContent(): void;
    dropStuff(event: DiedEvent, entity: Entity, damagesource: DamageSource): void;
    get containerSize(): number;
    get expMax(): number;
    get expMin(): number;
    get expRNG(): number;
    get itemsRNG(): IItemStack[];
    get leftHand(): IItemStack;
    get maxStackSize(): number;
    get projectile(): IItemStack;
    get rightHand(): IItemStack;
    getArmor(slot: number): IItemStack;
    getDropItem(slot: number): IItemStack;
    getItem(i: number): ItemStack;
    getItemEntity(itemstack: ItemStack): ItemEntity;
    isEmpty(): boolean;
    load(nbttagcompound: CompoundTag): void;
    removeItem(par1: number, limbSwingAmount: number): ItemStack;
    removeItemNoUpdate(par1: number): ItemStack;
    save(nbttagcompound: CompoundTag): CompoundTag;
    set leftHand(item: IItemStack);
    set projectile(item: IItemStack);
    set rightHand(item: IItemStack);
    setArmor(slot: number, item: IItemStack): void;
    setChanged(): void;
    setDropItem(slot: number, item: IItemStack, chance: number): void;
    setExp(min: number, max: number): void;
    setItem(par1: number, limbSwingAmountItemStack: ItemStack): void;
    startOpen(player: Player): void;
    stillValid(var1: Player): boolean;
    stopOpen(player: Player): void;
  }


  interface DataMelee extends INPCMelee {}
  class DataMelee extends INPCMelee {
    constructor(npc: EntityNPCInterface);
    get delay(): number;
    get effectStrength(): number;
    get effectTime(): number;
    get effectType(): number;
    get knockback(): number;
    get range(): number;
    get strength(): number;
    load(compound: CompoundTag): void;
    save(compound: CompoundTag): CompoundTag;
    set delay(speed: number);
    set knockback(knockback: number);
    set range(range: number);
    set strength(strength: number);
    setEffect(type: number, strength: number, time: number): void;
  }


  class DataPeople {
    static get (): Person;
  }


  interface DataRanged extends INPCRanged {}
  class DataRanged extends INPCRanged {
    constructor(npc: EntityNPCInterface);
    get accelerate(): boolean;
    get accuracy(): number;
    get burst(): number;
    get burstDelay(): number;
    get delayMax(): number;
    get delayMin(): number;
    get delayRNG(): number;
    get effectStrength(): number;
    get effectTime(): number;
    get effectType(): number;
    get explodeSize(): number;
    get fireType(): number;
    get glows(): boolean;
    get hasAimAnimation(): boolean;
    get hasGravity(): boolean;
    get knockback(): number;
    get meleeRange(): number;
    get particle(): number;
    get range(): number;
    get render3D(): boolean;
    get shotCount(): number;
    get size(): number;
    get speed(): number;
    get spins(): boolean;
    get sticks(): boolean;
    get strength(): number;
    getSound(type: number): string;
    getSoundEvent(type: number): SoundEvent;
    load(compound: CompoundTag): void;
    save(compound: CompoundTag): CompoundTag;
    set accelerate(accelerate: boolean);
    set accuracy(accuracy: number);
    set burst(count: number);
    set burstDelay(delay: number);
    set explodeSize(size: number);
    set fireType(type: number);
    set glows(glows: boolean);
    set hasAimAnimation(aim: boolean);
    set hasGravity(hasGravity: boolean);
    set knockback(punch: number);
    set meleeRange(range: number);
    set particle(type: number);
    set range(range: number);
    set render3D(render3d: boolean);
    set shotCount(count: number);
    set size(size: number);
    set speed(speed: number);
    set spins(spins: boolean);
    set sticks(sticks: boolean);
    set strength(strength: number);
    setDelay(min: number, max: number): void;
    setEffect(type: number, strength: number, time: number): void;
    setSound(type: number, sound: string): void;
  }


  class DataScenes {
    scenes: List;
    static StartedScenes: Map;
    static ScenesToRun: List;
    constructor(npc: EntityNPCInterface);
    static Pause(sender: CommandSourceStack, id: string): void;
    static Reset(sender: CommandSourceStack, id: string): void;
    static Start(server: MinecraftServer, id: string): void;
    static Toggle(server: MinecraftServer, id: string): void;
    addScene(name: string): void;
    get owner(): LivingEntity;
    load(compound: CompoundTag): void;
    save(compound: CompoundTag): CompoundTag;
    update(): void;
  }


  interface DataScript extends IScriptHandler {}
  class DataScript extends IScriptHandler {
    lastInited: number;
    constructor(npc: EntityNPCInterface);
    clearConsole(): void;
    get consoleText(): Map<Long, string>;
    get enabled(): boolean;
    get language(): string;
    get scripts(): ScriptContainer[];
    isClient(): boolean;
    isEnabled(): boolean;
    load(compound: CompoundTag): void;
    noticeString(): string;
    runScript(type: EnumScriptType, event: Event): void;
    save(compound: CompoundTag): CompoundTag;
    set enabled(bo: boolean);
    set language(lang: string);
  }


  interface DataStats extends INPCStats {}
  class DataStats extends INPCStats {
    aggroRange: number;
    maxHealth: number;
    respawnTime: number;
    spawnCycle: number;
    hideKilledBody: boolean;
    resistances: Resistances;
    immuneToFire: boolean;
    potionImmune: boolean;
    canDrown: boolean;
    burnInSun: boolean;
    noFallDamage: boolean;
    ignoreCobweb: boolean;
    healthRegen: number;
    combatRegen: number;
    creatureType: TagKey;
    melee: DataMelee;
    ranged: DataRanged;
    constructor(npc: EntityNPCInterface);
    get aggroRange(): number;
    get combatRegen(): number;
    get creatureType(): number;
    get healthRegen(): number;
    get hideDeadBody(): boolean;
    get maxHealth(): number;
    get melee(): INPCMelee;
    get ranged(): INPCRanged;
    get respawnTime(): number;
    get respawnType(): number;
    getImmune(type: number): boolean;
    getResistance(type: number): number;
    readToNBT(compound: CompoundTag): void;
    save(compound: CompoundTag): CompoundTag;
    set aggroRange(range: number);
    set combatRegen(regen: number);
    set creatureType(type: number);
    set healthRegen(regen: number);
    set hideDeadBody(hide: boolean);
    set maxHealth(maxHealth: number);
    set respawnTime(seconds: number);
    set respawnType(type: number);
    setImmune(type: number, bo: boolean): void;
    setResistance(type: number, value: number): void;
  }


  interface DataTimers extends ITimers {}
  class DataTimers extends ITimers {
    constructor(parent: any);
    clear(): void;
    forceStart(id: number, ticks: number, repeat: boolean): void;
    has(id: number): boolean;
    load(compound: CompoundTag): void;
    reset(id: number): void;
    save(compound: CompoundTag): void;
    start(id: number, ticks: number, repeat: boolean): void;
    stop(id: number): boolean;
    update(): void;
  }


  class IEntityPersistentData {
    get persistentData(): CompoundTag;
  }

}

declare module 'noppes.npcs.entity.data.DataPeople' {
  class Person {
    readonly name: string;
    readonly title: string;
    readonly skin: string;
    constructor(name: string, title: string, skin: string);
  }

}

declare module 'noppes.npcs.entity.data.DataScenes' {
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Enum, Comparable } from 'java.lang';
  import { List } from 'java.util';

  class SceneContainer {
    btn: number;
    name: string;
    lines: string;
    enabled: boolean;
    ticks: number;
    load(compound: CompoundTag): void;
    save(compound: CompoundTag): CompoundTag;
    update(): void;
    validState(): boolean;
  }


  class SceneState {
    paused: boolean;
    ticks: number;
  }


  interface SceneType extends Enum<SceneType> {}
  class SceneType extends Enum<SceneType> {
    static readonly ANIMATE: SceneType;
    static readonly MOVE: SceneType;
    static readonly FACTION: SceneType;
    static readonly COMMAND: SceneType;
    static readonly EQUIP: SceneType;
    static readonly THROW: SceneType;
    static readonly ATTACK: SceneType;
    static readonly FOLLOW: SceneType;
    static readonly SAY: SceneType;
    static readonly ROTATE: SceneType;
    static readonly STATS: SceneType;
    static valueOf(name: string): SceneType;
    static values(): SceneType[];
  }


  interface SceneEvent extends Comparable<SceneEvent> {}
  class SceneEvent extends Comparable<SceneEvent> {
    ticks: number;
    type: SceneType;
    param: string;
    compareTo(o: SceneEvent): number;
    static parse(str: string): SceneEvent;
    toString(): string;
  }

}

declare module 'noppes.npcs.entity.data.DataTimers' {
  class Timer {
    id: number;
    constructor(id: number, ticks: number, repeat: boolean);
    update(): void;
  }

}

declare module 'noppes.npcs.entity' {
  import { Entity, EntityType, EntityDimensions, MoverType, PathfinderMob, Pose, LivingEntity, EquipmentSlot, HumanoidArm } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { Packet } from 'net.minecraft.network.protocol';
  import { ClientGamePacketListener, ClientboundAddEntityPacket } from 'net.minecraft.network.protocol.game';
  import { ServerEntity, ServerBossEvent, ServerPlayer } from 'net.minecraft.server.level';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ModelData, IChatMessages } from 'noppes.npcs';
  import { Player } from 'net.minecraft.world.entity.player';
  import { InteractionResult, InteractionHand } from 'net.minecraft.world';
  import { Iterable } from 'java.lang';
  import { ItemStack } from 'net.minecraft.world.item';
  import { RangedAttackMob } from 'net.minecraft.world.entity.monster';
  import { EntityDataAccessor, SynchedEntityData } from 'net.minecraft.network.syncher';
  import { GameProfileAlt } from 'noppes.npcs.util';
  import { FakePlayer } from 'net.neoforged.neoforge.common.util';
  import { ICustomNpc } from 'noppes.npcs.api.entity';
  import { DataAbilities, DataDisplay, DataStats, DataInventory, DataAI, DataAdvanced, DataScript, DataTimers, DataRanged } from 'noppes.npcs.entity.data';
  import { DataTransform, Faction, Line } from 'noppes.npcs.controllers.data';
  import { CombatHandler, EntityAILook, EntityAIAnimation, EntityAIRangedAttack } from 'noppes.npcs.ai';
  import { LinkedData } from 'noppes.npcs.controllers.LinkedNpcController';
  import { RoleInterface, JobInterface } from 'noppes.npcs.roles';
  import { HashMap, List, HashSet, Set } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Builder } from 'AttributeSupplier';
  import { BlockPos } from 'net.minecraft.core';
  import { TagKey } from 'net.minecraft.tags';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { RemovalReason } from 'Entity';
  import { MobEffectInstance } from 'net.minecraft.world.effect';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { Component } from 'net.minecraft.network.chat';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { PushReaction } from 'net.minecraft.world.level.material';
  import { ThrowableProjectile } from 'net.minecraft.world.entity.projectile';
  import { IProjectileCallback } from 'noppes.npcs.entity.EntityProjectile';

  interface EntityChairMount extends Entity {}
  class EntityChairMount extends Entity {
    constructor(type: EntityType, world: Level);
    baseTick(): void;
    canBeCollidedWith(): boolean;
    causeFallDamage(distance: number, damageMultiplier: number, source: DamageSource): boolean;
    getAddEntityPacket(entity: ServerEntity): Packet<ClientGamePacketListener>;
    getPassengerAttachmentPoint(entity: Entity, dimensions: EntityDimensions, partialTick: number): Vec3;
    isInvisible(): boolean;
    isInvulnerableTo(source: DamageSource): boolean;
    isPushable(): boolean;
    lerpTo(p_70056_1_: number, p_70056_3_: number, p_70056_5_: number, p_70056_7_: number, p_70056_8_: number, p_70056_9_: number): void;
    load(tagCompound: CompoundTag): void;
    move(type: MoverType, vec: Vec3): void;
    saveWithoutId(tagCompound: CompoundTag): CompoundTag;
  }


  interface EntityCustomNpc extends EntityNPCFlying {}
  class EntityCustomNpc extends EntityNPCFlying {
    modelData: ModelData;
    constructor(type: EntityType<PathfinderMob>, world: Level);
    addAdditionalSaveData(compound: CompoundTag): void;
    getDimensions(pos: Pose): EntityDimensions;
    getPassengerAttachmentPoint(e: Entity, dimensions: EntityDimensions, partialTick: number): Vec3;
    readAdditionalSaveData(compound: CompoundTag): void;
    refreshDimensions(): void;
    saveAsPassenger(compound: CompoundTag): boolean;
    startRiding(par1Entity: Entity, force: boolean): boolean;
    tick(): void;
  }


  interface EntityDialogNpc extends EntityNPCInterface {}
  class EntityDialogNpc extends EntityNPCInterface {
    constructor(world: Level);
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    tick(): void;
  }


  interface EntityFakeLiving extends LivingEntity {}
  class EntityFakeLiving extends LivingEntity {
    constructor(par1Level: Level);
    get armorSlots(): Iterable<ItemStack>;
    get mainArm(): HumanoidArm;
    getItemBySlot(slotIn: EquipmentSlot): ItemStack;
    setItemSlot(slotIn: EquipmentSlot, stack: ItemStack): void;
  }


  interface EntityNPC64x32 extends EntityCustomNpc {}
  class EntityNPC64x32 extends EntityCustomNpc {
    constructor(type: EntityType<PathfinderMob>, world: Level);
  }


  interface EntityNpcAlex extends EntityCustomNpc {}
  class EntityNpcAlex extends EntityCustomNpc {
    constructor(type: EntityType<PathfinderMob>, world: Level);
  }


  interface EntityNpcClassicPlayer extends EntityCustomNpc {}
  class EntityNpcClassicPlayer extends EntityCustomNpc {
    constructor(type: EntityType<PathfinderMob>, world: Level);
  }


  interface EntityNpcCrystal extends EntityNPCInterface {}
  class EntityNpcCrystal extends EntityNPCInterface {
    constructor(type: EntityType<EntityNPCInterface>, world: Level);
    tick(): void;
  }


  interface EntityNpcDragon extends EntityNPCInterface {}
  class EntityNpcDragon extends EntityNPCInterface {
    field_40162_d: double[][];
    field_40164_e: number;
    prevAnimTime: number;
    animTime: number;
    field_40178_aA: number;
    isFlying: boolean;
    constructor(type: EntityType<EntityNPCInterface>, world: Level);
    aiStep(): void;
    getDimensions(pos: Pose): EntityDimensions;
    getMovementOffsets(i: number, f: number): number[];
    getPassengerAttachmentPoint(entity: Entity, dimensions: EntityDimensions, partialTick: number): Vec3;
    tick(): void;
  }


  interface EntityNPCFlying extends EntityNPCInterface {}
  class EntityNPCFlying extends EntityNPCInterface {
    constructor(type: EntityType<PathfinderMob>, world: Level);
    canFly(): boolean;
    causeFallDamage(distance: number, damageMultiplier: number, source: DamageSource): boolean;
    onClimbable(): boolean;
    travel(v: Vec3): void;
  }


  interface EntityNPCGolem extends EntityNPCInterface {}
  class EntityNPCGolem extends EntityNPCInterface {
    constructor(type: EntityType<EntityNPCInterface>, world: Level);
    getDimensions(pos: Pose): EntityDimensions;
    tick(): void;
  }


  interface EntityNPCInterface extends RangedAttackMob, PathfinderMob {}
  class EntityNPCInterface extends RangedAttackMob {
    static readonly Attacking: EntityDataAccessor;
    static readonly CommandProfile: GameProfileAlt;
    static readonly ChatEventProfile: GameProfileAlt;
    static readonly GenericProfile: GameProfileAlt;
    static ChatEventPlayer: FakePlayer;
    static CommandPlayer: FakePlayer;
    static GenericPlayer: FakePlayer;
    wrappedNPC: ICustomNpc;
    readonly abilities: DataAbilities;
    display: DataDisplay;
    stats: DataStats;
    inventory: DataInventory;
    readonly ais: DataAI;
    readonly advanced: DataAdvanced;
    readonly script: DataScript;
    readonly transform: DataTransform;
    readonly timers: DataTimers;
    combatHandler: CombatHandler;
    linkedName: string;
    linkedLast: number;
    linkedData: LinkedData;
    baseSize: EntityDimensions;
    scaleX: number;
    scaleY: number;
    scaleZ: number;
    role: RoleInterface;
    job: JobInterface;
    dialogs: HashMap;
    hasDied: boolean;
    killedtime: number;
    totalTicksAlive: number;
    lastInteract: number;
    faction: Faction;
    lookAi: EntityAILook;
    animateAi: EntityAIAnimation;
    interactingEntities: List;
    textureLocation: ResourceLocation;
    textureGlowLocation: ResourceLocation;
    textureCloakLocation: ResourceLocation;
    currentAnimation: number;
    animationStart: number;
    npcVersion: number;
    messages: IChatMessages;
    updateClient: boolean;
    updateAI: boolean;
    readonly bossInfo: ServerBossEvent;
    readonly tracking: HashSet;
    prevChasingPosX: number;
    prevChasingPosY: number;
    prevChasingPosZ: number;
    chasingPosX: number;
    chasingPosY: number;
    chasingPosZ: number;
    constructor(type: EntityType<PathfinderMob>, world: Level);
    addAdditionalSaveData(compound: CompoundTag): void;
    addInteract(entity: LivingEntity): void;
    addRegularEntries(): void;
    aiStep(): void;
    canBeAffected(effect: MobEffectInstance): boolean;
    canBeCollidedWith(): boolean;
    canBeLeashed(): boolean;
    canFly(): boolean;
    canNpcSee(entity: Entity): boolean;
    causeFallDamage(distance: number, modifier: number, source: DamageSource): boolean;
    checkDespawn(): void;
    cloakUpdate(): void;
    createCommandSourceStack(): CommandSourceStack;
    static createMobAttributes(): Builder;
    delete(): void;
    die(damagesource: DamageSource): void;
    doHurtTarget(par1Entity: Entity): boolean;
    doorInteractType(): void;
    fireImmune(): boolean;
    followRange(): number;
    get allSlots(): Iterable<ItemStack>;
    get ambientSoundInterval(): number;
    get armorSlots(): Iterable<ItemStack>;
    get commandSenderWorld(): Level;
    get controllingPassenger(): LivingEntity;
    get deathSound(): SoundEvent;
    get faction(): Faction;
    get fakeChatPlayer(): ServerPlayer;
    get jobData(): string;
    get mainHandItem(): ItemStack;
    get mobType(): TagKey<EntityType<any>>;
    get name(): Component;
    get offhandItem(): ItemStack;
    get owner(): LivingEntity;
    get pistonPushReaction(): PushReaction;
    get rangedTask(): EntityAIRangedAttack;
    get roleData(): string;
    get speed(): number;
    get startXPos(): number;
    get startYPos(): number;
    get startZPos(): number;
    get tags(): Set<string>;
    get voicePitch(): number;
    getDimensions(poseIn: Pose): EntityDimensions;
    getItemBySlot(slot: EquipmentSlot): ItemStack;
    getWalkTargetValue(pos: BlockPos): number;
    givePlayerItem(player: Player, item: ItemStack): void;
    hasOwner(): boolean;
    hurt(damagesource: DamageSource, i: number): boolean;
    isAlive(): boolean;
    isAlliedTo(entity: Entity): boolean;
    isAttacking(): boolean;
    isClientSide(): boolean;
    isCrouching(): boolean;
    isFollower(): boolean;
    isInRange(entity: Entity, range: number): boolean;
    isInRange(posX: number, posY: number, posZ: number, range: number): boolean;
    isInteracting(): boolean;
    isInvisible(): boolean;
    isInvisibleTo(player: Player): boolean;
    isKilled(): boolean;
    isLeashed(): boolean;
    isPushable(): boolean;
    isPushedByFluid(): boolean;
    isSensitiveToWater(): boolean;
    isSleeping(): boolean;
    isStableDestination(p_26439_: BlockPos): boolean;
    isVeryNearAssignedPlace(): boolean;
    isWalking(): boolean;
    knockback(strength: number, ratioX: number, ratioZ: number): void;
    makeStuckInBlock(state: BlockState, motionMultiplierIn: Vec3): void;
    nearPosition(pos: BlockPos): boolean;
    onAttack(entity: LivingEntity): void;
    onCollide(): void;
    onSyncedDataUpdated(para: EntityDataAccessor<any>): void;
    performRangedAttack(entity: LivingEntity, f: number): void;
    playAmbientSound(): void;
    push(d: number, d1: number, d2: number): void;
    readAdditionalSaveData(compound: CompoundTag): void;
    readSpawnData(buf: FriendlyByteBuf): void;
    readSpawnData(compound: CompoundTag): void;
    recreateFromPacket(packet: ClientboundAddEntityPacket): void;
    remove(reason: RemovalReason): void;
    removeWhenFarAway(distanceToPlayer: number): boolean;
    reset(): void;
    say(player: Player, line: Line): void;
    saySurrounding(line: Line): void;
    seekShelter(): void;
    set faction(id: number);
    set jobData(s: string);
    set roleData(s: string);
    setCurrentAnimation(animation: number): void;
    setDataWatcher(entityData: SynchedEntityData): void;
    setImmuneToFire(immuneToFire: boolean): void;
    setInvisible(playerMP: ServerPlayer): void;
    setItemSlot(slot: EquipmentSlot, item: ItemStack): void;
    setMoveType(): void;
    setTarget(entity: LivingEntity): void;
    setVisible(playerMP: ServerPlayer): void;
    shoot(entity: LivingEntity, accuracy: number, proj: ItemStack, indirect: boolean): EntityProjectile;
    shoot(x: number, y: number, z: number, accuracy: number, proj: ItemStack, indirect: boolean): EntityProjectile;
    shouldShowName(): boolean;
    startSeenByPlayer(player: ServerPlayer): void;
    stopSeenByPlayer(player: ServerPlayer): void;
    tick(): void;
    tickDeath(): void;
    tpTo(owner: LivingEntity): void;
    travel(travelVector: Vec3): void;
    updateClient(): void;
    writeSpawnData(buffer: FriendlyByteBuf): void;
    writeSpawnData(): CompoundTag;
  }


  interface EntityNpcPony extends EntityNPCInterface {}
  class EntityNpcPony extends EntityNPCInterface {
    isPegasus: boolean;
    isUnicorn: boolean;
    isFlying: boolean;
    checked: ResourceLocation;
    constructor(type: EntityType<EntityNPCInterface>, world: Level);
    tick(): void;
  }


  interface EntityNpcSlime extends EntityNPCInterface {}
  class EntityNpcSlime extends EntityNPCInterface {
    constructor(type: EntityType<EntityNPCInterface>, world: Level);
    getDimensions(pos: Pose): EntityDimensions;
    tick(): void;
  }


  interface EntityProjectile extends ThrowableProjectile {}
  class EntityProjectile extends ThrowableProjectile {
    throwableShake: number;
    arrowShake: number;
    canBePickedUp: boolean;
    destroyedOnEntityHit: boolean;
    ticksInAir: number;
    damage: number;
    punch: number;
    accelerate: boolean;
    explosiveDamage: boolean;
    explosiveRadius: number;
    effect: number;
    duration: number;
    amplify: number;
    accuracy: number;
    callback: IProjectileCallback;
    scripts: List;
    constructor(type: EntityType, par1Level: Level);

    constructor(level: Level, limbSwingAmountEntityLiving: LivingEntity, item: ItemStack, isNPC: boolean);
    addAdditionalSaveData(par1CompoundTag: CompoundTag): void;
    get displayName(): Component;
    get itemDisplay(): ItemStack;
    get lightLevelDependentMagicValue(): number;
    get owner(): Entity;
    get size(): number;
    get speed(): number;
    getAddEntityPacket(serverEntity: ServerEntity): Packet<ClientGamePacketListener>;
    getAngleForXYZ(varX: number, varY: number, varZ: number, horiDist: number, arc: boolean): number;
    getDimensions(pose: Pose): EntityDimensions;
    getStatProperties(stats: DataRanged): void;
    glows(): boolean;
    hasGravity(): boolean;
    is3D(): boolean;
    isArrow(): boolean;
    isBlock(): boolean;
    isRotating(): boolean;
    lerpTo(par1: number, par3: number, par5: number, par7: number, par8: number, par9: number): void;
    onSyncedDataUpdated(para: EntityDataAccessor<any>): void;
    playerTouch(par1Player: Player): void;
    readAdditionalSaveData(compound: CompoundTag): void;
    set speed(speed: number);
    setHasGravity(bo: boolean): void;
    setIs3D(bo: boolean): void;
    setParticleEffect(type: number): void;
    setRotating(bo: boolean): void;
    setStickInWall(bo: boolean): void;
    setThrownItem(item: ItemStack): void;
    shoot(par1: number, par3: number, par5: number, par7: number, par8: number): void;
    shoot(speed: number): void;
    shouldRenderAtSqrDistance(par1: number): boolean;
    sticksToWalls(): boolean;
    tick(): void;
  }

}

declare module 'noppes.npcs.entity.EntityProjectile' {
  import { EntityProjectile } from 'noppes.npcs.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { Entity } from 'net.minecraft.world.entity';

  class IProjectileCallback {
    onImpact(var1: EntityProjectile, var2: BlockPos, var3: Entity): boolean;
  }

}

declare module 'noppes.npcs.items' {
  import { IItemStack } from 'noppes.npcs.api.item';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { DataComponentType } from 'net.minecraft.core.component';
  import { Item, BlockItem, ItemStack, DoubleHighBlockItem, TooltipFlag } from 'net.minecraft.world.item';
  import { RightClickBlock, EntityInteract } from 'PlayerInteractEvent';
  import { Block } from 'net.minecraft.world.level.block';
  import { Properties, TooltipContext } from 'Item';
  import { Consumer } from 'java.util.function';
  import { IClientItemExtensions } from 'net.neoforged.neoforge.client.extensions.common';
  import { InteractionResult, InteractionResultHolder, InteractionHand } from 'net.minecraft.world';
  import { UseOnContext } from 'net.minecraft.world.item.context';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { LivingEntity, Entity } from 'net.minecraft.world.entity';
  import { ItemScriptedWrapper } from 'noppes.npcs.api.wrapper';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { BlockPos } from 'net.minecraft.core';

  class IMixinItemStack {
    get itemStackWrapper(): IItemStack;
    set itemStackWrapper(var1: IItemStack);
  }


  class ItemDataComponents {
    static readonly CUSTOM_DATA_CODEC: StreamCodec;
    static readonly NPCID: DataComponentType;
    static readonly SOULSTONE_DATA: DataComponentType;
    static readonly SCRIPTED_DATA: DataComponentType;
    static readonly STORED_DATA: DataComponentType;
    static init(): void;
  }


  interface ItemMounter extends Item {}
  class ItemMounter extends Item {
    constructor();
  }


  interface ItemNbtBook extends Item {}
  class ItemNbtBook extends Item {
    constructor();
    blockEvent(event: RightClickBlock): void;
    entityEvent(event: EntityInteract): void;
  }


  interface ItemNpcBlock extends BlockItem {}
  class ItemNpcBlock extends BlockItem {
    readonly block: Block;
    constructor(block: Block, builder: Properties);
    initializeClient(consumer: Consumer<IClientItemExtensions>): void;
  }


  interface ItemNpcCloner extends Item {}
  class ItemNpcCloner extends Item {
    constructor();
    useOn(context: UseOnContext): InteractionResult;
  }


  interface ItemNpcMovingPath extends Item {}
  class ItemNpcMovingPath extends Item {
    constructor();
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
    useOn(context: UseOnContext): InteractionResult;
  }


  interface ItemNpcScripter extends Item {}
  class ItemNpcScripter extends Item {
    constructor();
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface ItemNpcWand extends Item {}
  class ItemNpcWand extends Item {
    constructor();
    finishUsingItem(stack: ItemStack, worldIn: Level, playerIn: LivingEntity): ItemStack;
    getUseDuration(stack: ItemStack, entity: LivingEntity): number;
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
    useOn(context: UseOnContext): InteractionResult;
  }


  interface ItemScripted extends Item {}
  class ItemScripted extends Item {
    constructor(props: Properties);
    static GetWrapper(stack: ItemStack): ItemScriptedWrapper;
    getBarColor(stack: ItemStack): number;
    getBarWidth(stack: ItemStack): number;
    hurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): boolean;
    isBarVisible(stack: ItemStack): boolean;
  }


  interface ItemScriptedDoor extends DoubleHighBlockItem {}
  class ItemScriptedDoor extends DoubleHighBlockItem {
    constructor(block: Block);
    finishUsingItem(stack: ItemStack, worldIn: Level, playerIn: LivingEntity): ItemStack;
    useOn(context: UseOnContext): InteractionResult;
  }


  interface ItemSoulstoneEmpty extends Item {}
  class ItemSoulstoneEmpty extends Item {
    constructor();
    hasPermission(entity: LivingEntity, player: Player): boolean;
    store(entity: LivingEntity, stack: ItemStack, player: Player): boolean;
  }


  interface ItemSoulstoneFilled extends Item {}
  class ItemSoulstoneFilled extends Item {
    constructor();
    static Spawn(player: Player, stack: ItemStack, level: Level, pos: BlockPos): Entity;
    appendHoverText(stack: ItemStack, context: TooltipContext, list: Component[], tooltipFlag: TooltipFlag): void;
    useOn(context: UseOnContext): InteractionResult;
  }


  interface ItemTeleporter extends Item {}
  class ItemTeleporter extends Item {
    constructor();
    onEntitySwing(stack: ItemStack, livingEntity: LivingEntity, hand: InteractionHand): boolean;
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }

}

declare module 'noppes.npcs.mixin' {
  import { Player } from 'net.minecraft.world.entity.player';
  import { Level, SpawnData } from 'net.minecraft.world.level';
  import { BlockPos, NonNullList } from 'net.minecraft.core';
  import { GameProfile } from 'com.mojang.authlib';
  import { CallbackInfoReturnable, CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { PlayerSkin } from 'net.minecraft.client.resources';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { IEntityPersistentData } from 'noppes.npcs.entity.data';
  import { CompoundTag, Tag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { Packet } from 'net.minecraft.network.protocol';
  import { ServerGamePacketListener, ClientboundAddEntityPacket } from 'net.minecraft.network.protocol.game';
  import { Long2ObjectLinkedOpenHashMap } from 'it.unimi.dsi.fastutil.longs';
  import { ChunkHolder, PlayerMap, ServerEntity, ServerPlayer } from 'net.minecraft.server.level';
  import { FormattedCharSequence } from 'net.minecraft.util';
  import { RemovalReason } from 'Entity';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Entity, EntityDimensions } from 'net.minecraft.world.entity';
  import { InteractionHand } from 'net.minecraft.world';
  import { Map, EnumSet, List, Deque, Optional } from 'java.util';
  import { Flag } from 'Goal';
  import { WrappedGoal } from 'net.minecraft.world.entity.ai.goal';
  import { BakedModel } from 'net.minecraft.client.resources.model';
  import { ItemModelShaper, MultiBufferSource } from 'net.minecraft.client.renderer';
  import { RenderLayer } from 'net.minecraft.client.renderer.entity.layers';
  import { RenderLayerParent, EntityRenderer } from 'net.minecraft.client.renderer.entity';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { Pose } from 'PoseStack';
  import { ItemColors } from 'net.minecraft.client.color.item';
  import { Boolean } from 'java.lang';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { IMixinClientboundAddEntityPacket } from 'noppes.npcs.mixinintf';
  import { RegistryFriendlyByteBuf, FriendlyByteBuf } from 'net.minecraft.network';
  import { IMixinItemStack } from 'noppes.npcs.items';
  import { IItemStack } from 'noppes.npcs.api.item';
  import { ModelPart } from 'net.minecraft.client.model.geom';
  import { ModelPartConfig } from 'noppes.npcs';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { EntitySectionStorage, PersistentEntitySectionManager } from 'net.minecraft.world.level.entity';
  import { CompletableFuture } from 'java.util.concurrent';
  import { ISynchedEntityData } from 'noppes.npcs.client';
  import { DataItem } from 'SynchedEntityData';

  interface AbstractClientPlayerEntityMixin extends Player {}
  class AbstractClientPlayerEntityMixin extends Player {
    constructor(p_250508_: Level, p_250289_: BlockPos, p_251702_: number, p_252153_: GameProfile);
    getSkinLocation(cir: CallbackInfoReturnable<PlayerSkin>): void;
  }


  class AbstractContainerMenuMixin {
    lastSlots(): NonNullList<ItemStack>;
    remoteSlots(): NonNullList<ItemStack>;
  }


  class AbstractContainerScreenMixin {
    renderBackgroundProxy(instance: Screen, p_283688_: GuiGraphics, p_299421_: number, p_298679_: number, p_297268_: number): void;
  }


  class AgeableModelMixin<T extends EntityNPCInterface = any> {
  }


  class ArmorLayerMixin<T extends LivingEntity = any, M extends HumanoidModel<T> = any, A extends HumanoidModel<T> = any> {
    get inner(): A;
    get outer(): A;
  }


  class ArmorMaterialsMixin {
  }


  class BaseSpawnerMixin {
    callSetNextSpawnData(var1: Level, var2: BlockPos, var3: SpawnData): void;
  }


  class BipedBodyMixin<T extends LivingEntity = any> {
  }


  interface BlockEntityPersistentData extends IEntityPersistentData {}
  class BlockEntityPersistentData extends IEntityPersistentData {
    get persistentData(): CompoundTag;
    read(compound: CompoundTag, registries: Provider, ci: CallbackInfo): void;
    save(tag: CompoundTag, registries: Provider, ci: CallbackInfo): void;
  }


  interface CCreativeInventoryActionPacketMixin extends Packet<ServerGamePacketListener> {}
  class CCreativeInventoryActionPacketMixin extends Packet<ServerGamePacketListener> {
  }


  class ChunkMapMixin {
    playerMap(): PlayerMap;
    visibleChunkMap(): Long2ObjectLinkedOpenHashMap<ChunkHolder>;
  }


  class ClientPlayNetHandlerMixin {
  }


  class ClientTextTooltipMixin {
    get text(): FormattedCharSequence;
  }


  class EntityIMixin {
    invokeGetPassengerAttachmentPoint(var1: Entity, var2: EntityDimensions, var3: number): Vec3;
    removal(): RemovalReason;
    removal(var1: RemovalReason): void;
    setLevel(var1: Level): void;
  }


  class EntityLivingIMixin {
    animStep(): number;
    animStep(var1: number): void;
    animStepO(): number;
    animStepO(var1: number): void;
    jumping(): boolean;
    lastHurtByPlayerTime(): number;
    lastHurtByPlayerTime(var1: number): void;
    swimAmount(): number;
    swimAmount(var1: number): void;
    swimAmountO(): number;
    swimAmountO(var1: number): void;
    useItemRemaining(var1: number): void;
  }


  class EntityLivingMixin {
    getItemInHand(var1: InteractionHand): ItemStack;
  }


  interface EntityPersistentData extends IEntityPersistentData {}
  class EntityPersistentData extends IEntityPersistentData {
    get persistentData(): CompoundTag;
    read(compound: CompoundTag, ci: CallbackInfo): void;
    save(compound: CompoundTag, cir: CallbackInfoReturnable<CompoundTag>): void;
  }


  class GoalSelectorMixin {
    disabledFlags(): EnumSet<Flag>;
    lockedFlags(): Map<Flag, WrappedGoal>;
  }


  class IceBlockMixin {
  }


  class ItemEntityMixin {
    age(var1: number): void;
    pickupDelay(): number;
  }


  class ItemRendererMixin {
    getModel(thiss: ItemModelShaper, item: ItemStack): BakedModel;
  }


  class LeavesBlockMixin {
  }


  class ListNBTMixin {
    get list(): Tag[];
  }


  class LivingRenderer2Mixin<T extends EntityCustomNpc = any, M extends HumanoidModel<T> = any> {
    layers(): RenderLayer<T, M>[];
  }


  interface LivingRenderer3Mixin<T extends LivingEntity = any, M extends EntityModel<T> = any> extends RenderLayerParent<T, M> {}
  class LivingRenderer3Mixin<T extends LivingEntity = any, M extends EntityModel<T> = any> extends RenderLayerParent<T, M> {
    callGetBob(var1: T, var2: number): number;
    callScale(var1: T, var2: PoseStack, var3: number): void;
  }


  class LivingRendererMixin<T extends EntityCustomNpc = any, M extends HumanoidModel<T> = any> {
  }


  class MatrixStackMixin {
    get stack(): Deque<Pose>;
  }


  class MinecraftAccessor {
    get itemColors(): ItemColors;
  }


  interface MixinAbstractContainerScreen extends Screen {}
  class MixinAbstractContainerScreen extends Screen {
    keyPressed(p_97765_: number, p_97766_: number, p_97767_: number, cir: CallbackInfoReturnable<boolean>): void;
  }


  class MixinBlockBehaviour {
    invokeOnPlace(var1: BlockState, var2: Level, var3: BlockPos, var4: BlockState, var5: boolean): void;
  }


  interface MixinClientboundAddEntityPacket extends IMixinClientboundAddEntityPacket {}
  class MixinClientboundAddEntityPacket extends IMixinClientboundAddEntityPacket {
    get buf(): FriendlyByteBuf;
    get entity(): Entity;
    initFromBuf(buffer: RegistryFriendlyByteBuf, ci: CallbackInfo): void;
    initFromEnt1(entity: Entity, serverEntity: ServerEntity, ci: CallbackInfo): void;
    initFromEnt2(entity: Entity, serverEntity: ServerEntity, data: number, ci: CallbackInfo): void;
    initFromEnt3(entity: Entity, data: number, pos: BlockPos, ci: CallbackInfo): void;
    write(buffer: RegistryFriendlyByteBuf, ci: CallbackInfo): void;
  }


  class MixinClientPacketListener {
    handleAddEntity(packet: ClientboundAddEntityPacket, ci: CallbackInfo): void;
  }


  class MixinEditBox {
    filterTextProxy(p_136191_: string): string;
  }


  class MixinExecutorUtil {
  }


  interface MixinItemStack extends IMixinItemStack {}
  class MixinItemStack extends IMixinItemStack {
    get itemStackWrapper(): IItemStack;
    set itemStackWrapper(wrapper: IItemStack);
  }


  interface MixinLivingRenderer<T extends LivingEntity = any, M extends EntityModel<T> = any> extends RenderLayerParent<T, M>, EntityRenderer<T> {}
  class MixinLivingRenderer<T extends LivingEntity = any, M extends EntityModel<T> = any> extends RenderLayerParent<T, M> {
    render(entity: T, entityYaw: number, partialTicks: number, poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number, ci: CallbackInfo): void;
  }


  class MixinMinecraft {
  }


  class MixinPersistentEntitySectionManager<T extends EntityAccess = any> {
  }


  class MixinPlayerDataStorage {
    save(player: Player, ci: CallbackInfo): void;
  }


  class MixinServerEntity {
    addPairing(player: ServerPlayer, ci: CallbackInfo): void;
    removePairing(player: ServerPlayer, ci: CallbackInfo): void;
  }


  interface MixinServerPlayer extends Player {}
  class MixinServerPlayer extends Player {
    constructor(level: Level, pos: BlockPos, yRot: number, gameProfile: GameProfile);
  }


  class ModelPartMixin {
    get children(): Map<string, ModelPart>;
  }


  class ModelRendererMixin {
    cnpcconfig: ModelPartConfig;
  }


  class MouseHelperMixin {
    get activeButton(): number;
    setGrabbed(var1: boolean): void;
    setX(var1: number): void;
    setY(var1: number): void;
  }


  class MusicManagerMixin {
    nextSongDelay(var1: number): void;
  }


  class NetworkPlayerInfoMixin {
    getSkinLocation(cir: CallbackInfoReturnable<PlayerSkin>): void;
  }


  class NoiseChunkGeneratorMixin {
  }


  class PackRepositoryMixin {
  }


  class ParticleManagerMixin {
    get packs(): Map<ResourceLocation, any>;
  }


  class PersistentEntitySectionManagerMixin<T extends Entity = any> {
    sectionStorage(): EntitySectionStorage<T>;
  }


  class ScreenMixin {
    renderBackgroundProxy(instance: Screen, p_283688_: GuiGraphics, p_299421_: number, p_298679_: number, p_297268_: number): void;
  }


  class ServerLevelMixin {
    entityManager(): PersistentEntitySectionManager<Entity>;
  }


  class SkullBlockEntityMixin {
    static callFetchGameProfile(p_298654_: string): CompletableFuture<Optional<GameProfile>>;
  }


  interface SynchedEntityDataMixin extends ISynchedEntityData {}
  class SynchedEntityDataMixin extends ISynchedEntityData {
    get all(): DataItem<any>[];
  }


  class VineBlockMixin {
  }


  class WalkAnimationStateMixin {
    get speedOld(): number;
    set speedOld(var1: number);
    setPosition(var1: number): void;
  }

}

declare module 'noppes.npcs.mixinintf' {
  import { Entity } from 'net.minecraft.world.entity';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  class IMixinClientboundAddEntityPacket {
    get buf(): FriendlyByteBuf;
    get entity(): Entity;
  }

}

declare module 'noppes.npcs.packets.client' {
  import { PacketBasic } from 'noppes.npcs.shared.common';
  import { Component } from 'net.minecraft.network.chat';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { Dialog, PlayerSkinData } from 'noppes.npcs.controllers.data';
  import { EntityNPCInterface } from 'noppes.npcs.entity';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { UUID, Map, Vector } from 'java.util';
  import { EnumGuiType } from 'noppes.npcs.constants';
  import { BlockPos } from 'net.minecraft.core';
  import { Integer } from 'java.lang';
  import { Entity } from 'net.minecraft.world.entity';
  import { ClientboundAddEntityPacket } from 'net.minecraft.network.protocol.game';

  interface PacketAchievement extends PacketBasic {}
  class PacketAchievement extends PacketBasic {
    constructor(title: Component, message: Component, type: number);
    static decode(buf: FriendlyByteBuf): PacketAchievement;
    static encode(msg: PacketAchievement, buf: FriendlyByteBuf): void;
  }


  interface PacketChat extends PacketBasic {}
  class PacketChat extends PacketBasic {
    constructor(message: Component);
    static decode(buf: FriendlyByteBuf): PacketChat;
    static encode(msg: PacketChat, buf: FriendlyByteBuf): void;
  }


  interface PacketChatBubble extends PacketBasic {}
  class PacketChatBubble extends PacketBasic {
    constructor(id: number, message: Component, showMessage: boolean);
    static decode(buf: FriendlyByteBuf): PacketChatBubble;
    static encode(msg: PacketChatBubble, buf: FriendlyByteBuf): void;
  }


  interface PacketConfigFont extends PacketBasic {}
  class PacketConfigFont extends PacketBasic {
    constructor(font: string, size: number);
    static decode(buf: FriendlyByteBuf): PacketConfigFont;
    static encode(msg: PacketConfigFont, buf: FriendlyByteBuf): void;
  }


  interface PacketDialog extends PacketBasic {}
  class PacketDialog extends PacketBasic {
    constructor(entityId: number, dialogId: number);
    static decode(buf: FriendlyByteBuf): PacketDialog;
    static encode(msg: PacketDialog, buf: FriendlyByteBuf): void;
    static openDialog(dialog: Dialog, npc: EntityNPCInterface, player: Player): void;
  }


  interface PacketDialogDummy extends PacketBasic {}
  class PacketDialogDummy extends PacketBasic {
    constructor(name: string, data: CompoundTag);
    static decode(buf: FriendlyByteBuf): PacketDialogDummy;
    static encode(msg: PacketDialogDummy, buf: FriendlyByteBuf): void;
  }


  interface PacketEyeBlink extends PacketBasic {}
  class PacketEyeBlink extends PacketBasic {
    constructor(id: number);
    static decode(buf: FriendlyByteBuf): PacketEyeBlink;
    static encode(msg: PacketEyeBlink, buf: FriendlyByteBuf): void;
  }


  interface PacketGuiCloneOpen extends PacketBasic {}
  class PacketGuiCloneOpen extends PacketBasic {
    constructor(data: CompoundTag);
    static decode(buf: FriendlyByteBuf): PacketGuiCloneOpen;
    static encode(msg: PacketGuiCloneOpen, buf: FriendlyByteBuf): void;
  }


  interface PacketGuiClose extends PacketBasic {}
  class PacketGuiClose extends PacketBasic {
    constructor(data: CompoundTag);

    constructor();
    static decode(buf: FriendlyByteBuf): PacketGuiClose;
    static encode(msg: PacketGuiClose, buf: FriendlyByteBuf): void;
  }


  interface PacketGuiComponentUpdate extends PacketBasic {}
  class PacketGuiComponentUpdate extends PacketBasic {
    constructor(id: UUID, data: CompoundTag);
    static decode(buf: FriendlyByteBuf): PacketGuiComponentUpdate;
    static encode(msg: PacketGuiComponentUpdate, buf: FriendlyByteBuf): void;
  }


  interface PacketGuiData extends PacketBasic {}
  class PacketGuiData extends PacketBasic {
    constructor(data: CompoundTag);
    static decode(buf: FriendlyByteBuf): PacketGuiData;
    static encode(msg: PacketGuiData, buf: FriendlyByteBuf): void;
  }


  interface PacketGuiError extends PacketBasic {}
  class PacketGuiError extends PacketBasic {
    constructor(error: number, data: CompoundTag);
    static decode(buf: FriendlyByteBuf): PacketGuiError;
    static encode(msg: PacketGuiError, buf: FriendlyByteBuf): void;
  }


  interface PacketGuiOpen extends PacketBasic {}
  class PacketGuiOpen extends PacketBasic {
    constructor(gui: EnumGuiType, pos: BlockPos);
    static decode(buf: FriendlyByteBuf): PacketGuiOpen;
    static encode(msg: PacketGuiOpen, buf: FriendlyByteBuf): void;
  }


  interface PacketGuiParts extends PacketBasic {}
  class PacketGuiParts extends PacketBasic {
    constructor(id: number, data: CompoundTag);
    static decode(buf: FriendlyByteBuf): PacketGuiParts;
    static encode(msg: PacketGuiParts, buf: FriendlyByteBuf): void;
  }


  interface PacketGuiScrollData extends PacketBasic {}
  class PacketGuiScrollData extends PacketBasic {
    constructor(data: Map<string, number>);
    static decode(buf: FriendlyByteBuf): PacketGuiScrollData;
    static encode(msg: PacketGuiScrollData, buf: FriendlyByteBuf): void;
  }


  interface PacketGuiScrollList extends PacketBasic {}
  class PacketGuiScrollList extends PacketBasic {
    constructor(data: Vector<string>);
    static decode(buf: FriendlyByteBuf): PacketGuiScrollList;
    static encode(msg: PacketGuiScrollList, buf: FriendlyByteBuf): void;
  }


  interface PacketGuiScrollSelected extends PacketBasic {}
  class PacketGuiScrollSelected extends PacketBasic {
    constructor(selected: string);
    static decode(buf: FriendlyByteBuf): PacketGuiScrollSelected;
    static encode(msg: PacketGuiScrollSelected, buf: FriendlyByteBuf): void;
  }


  interface PacketGuiUpdate extends PacketBasic {}
  class PacketGuiUpdate extends PacketBasic {
    static decode(buf: FriendlyByteBuf): PacketGuiUpdate;
    static encode(msg: PacketGuiUpdate, buf: FriendlyByteBuf): void;
  }


  interface PacketHideAllOverlays extends PacketBasic {}
  class PacketHideAllOverlays extends PacketBasic {
    constructor(id: boolean);
    static decode(buf: FriendlyByteBuf): PacketHideAllOverlays;
    static encode(msg: PacketHideAllOverlays, buf: FriendlyByteBuf): void;
  }


  interface PacketItemUpdate extends PacketBasic {}
  class PacketItemUpdate extends PacketBasic {
    constructor(id: number, data: CompoundTag);
    static decode(buf: FriendlyByteBuf): PacketItemUpdate;
    static encode(msg: PacketItemUpdate, buf: FriendlyByteBuf): void;
  }


  interface PacketMarkData extends PacketBasic {}
  class PacketMarkData extends PacketBasic {
    constructor(id: number, data: CompoundTag);
    static decode(buf: FriendlyByteBuf): PacketMarkData;
    static encode(msg: PacketMarkData, buf: FriendlyByteBuf): void;
  }


  interface PacketNpcDelete extends PacketBasic {}
  class PacketNpcDelete extends PacketBasic {
    constructor(id: number);
    static decode(buf: FriendlyByteBuf): PacketNpcDelete;
    static encode(msg: PacketNpcDelete, buf: FriendlyByteBuf): void;
  }


  interface PacketNpcEdit extends PacketBasic {}
  class PacketNpcEdit extends PacketBasic {
    constructor(id: number);
    static decode(buf: FriendlyByteBuf): PacketNpcEdit;
    static encode(msg: PacketNpcEdit, buf: FriendlyByteBuf): void;
  }


  interface PacketNpcRole extends PacketBasic {}
  class PacketNpcRole extends PacketBasic {
    constructor(id: number, data: CompoundTag);
    static decode(buf: FriendlyByteBuf): PacketNpcRole;
    static encode(msg: PacketNpcRole, buf: FriendlyByteBuf): void;
  }


  interface PacketNpcRotationUpdate extends PacketBasic {}
  class PacketNpcRotationUpdate extends PacketBasic {
    constructor(id: number, orientation: number);
    static decode(buf: FriendlyByteBuf): PacketNpcRotationUpdate;
    static encode(msg: PacketNpcRotationUpdate, buf: FriendlyByteBuf): void;
  }


  interface PacketNpcUpdate extends PacketBasic {}
  class PacketNpcUpdate extends PacketBasic {
    constructor(id: number, data: CompoundTag);
    static decode(buf: FriendlyByteBuf): PacketNpcUpdate;
    static encode(msg: PacketNpcUpdate, buf: FriendlyByteBuf): void;
  }


  interface PacketNpcVisibleFalse extends PacketBasic {}
  class PacketNpcVisibleFalse extends PacketBasic {
    constructor(id: number);
    static decode(buf: FriendlyByteBuf): PacketNpcVisibleFalse;
    static encode(msg: PacketNpcVisibleFalse, buf: FriendlyByteBuf): void;
  }


  interface PacketNpcVisibleTrue extends PacketBasic {}
  class PacketNpcVisibleTrue extends PacketBasic {
    constructor(entity: Entity);

    constructor(id: number, pkt: ClientboundAddEntityPacket);
    static decode(buf: FriendlyByteBuf): PacketNpcVisibleTrue;
    static encode(msg: PacketNpcVisibleTrue, buf: FriendlyByteBuf): void;
  }


  interface PacketOverlayHide extends PacketBasic {}
  class PacketOverlayHide extends PacketBasic {
    constructor(id: number);
    static decode(buf: FriendlyByteBuf): PacketOverlayHide;
    static encode(msg: PacketOverlayHide, buf: FriendlyByteBuf): void;
  }


  interface PacketOverlayShow extends PacketBasic {}
  class PacketOverlayShow extends PacketBasic {
    constructor(compound: CompoundTag);
    static decode(buf: FriendlyByteBuf): PacketOverlayShow;
    static encode(msg: PacketOverlayShow, buf: FriendlyByteBuf): void;
  }


  interface PacketParticle extends PacketBasic {}
  class PacketParticle extends PacketBasic {
    constructor(posX: number, posY: number, posZ: number, height: number, width: number, name: string);
    static decode(buf: FriendlyByteBuf): PacketParticle;
    static encode(msg: PacketParticle, buf: FriendlyByteBuf): void;
  }


  interface PacketPlayMusic extends PacketBasic {}
  class PacketPlayMusic extends PacketBasic {
    constructor(name: string, streaming: boolean, looping: boolean);
    static decode(buf: FriendlyByteBuf): PacketPlayMusic;
    static encode(msg: PacketPlayMusic, buf: FriendlyByteBuf): void;
  }


  interface PacketPlaySound extends PacketBasic {}
  class PacketPlaySound extends PacketBasic {
    constructor(name: string, pos: BlockPos, volume: number, pitch: number);
    static decode(buf: FriendlyByteBuf): PacketPlaySound;
    static encode(msg: PacketPlaySound, buf: FriendlyByteBuf): void;
  }


  interface PacketQuestCompletion extends PacketBasic {}
  class PacketQuestCompletion extends PacketBasic {
    constructor(id: number);
    static decode(buf: FriendlyByteBuf): PacketQuestCompletion;
    static encode(msg: PacketQuestCompletion, buf: FriendlyByteBuf): void;
  }


  interface PacketSoundGUIOpen extends PacketBasic {}
  class PacketSoundGUIOpen extends PacketBasic {
    static decode(buf: FriendlyByteBuf): PacketSoundGUIOpen;
    static encode(msg: PacketSoundGUIOpen, buf: FriendlyByteBuf): void;
  }


  interface PacketSync extends PacketBasic {}
  class PacketSync extends PacketBasic {
    constructor(type: number, data: CompoundTag, syncEnd: boolean);
    clientSync(syncEnd: boolean): void;
    static decode(buf: FriendlyByteBuf): PacketSync;
    static encode(msg: PacketSync, buf: FriendlyByteBuf): void;
  }


  interface PacketSyncRemove extends PacketBasic {}
  class PacketSyncRemove extends PacketBasic {
    constructor(id: number, type: number);
    clientSync(syncEnd: boolean): void;
    static decode(buf: FriendlyByteBuf): PacketSyncRemove;
    static encode(msg: PacketSyncRemove, buf: FriendlyByteBuf): void;
  }


  interface PacketSyncSkin extends PacketBasic {}
  class PacketSyncSkin extends PacketBasic {
    constructor(name: string, skinData: PlayerSkinData);
    static decode(buf: FriendlyByteBuf): PacketSyncSkin;
    static encode(msg: PacketSyncSkin, buf: FriendlyByteBuf): void;
  }


  interface PacketSyncUpdate extends PacketBasic {}
  class PacketSyncUpdate extends PacketBasic {
    constructor(id: number, type: number, data: CompoundTag);
    clientSync(syncEnd: boolean): void;
    static decode(buf: FriendlyByteBuf): PacketSyncUpdate;
    static encode(msg: PacketSyncUpdate, buf: FriendlyByteBuf): void;
  }


  interface PacketUpdatePhysics extends PacketBasic {}
  class PacketUpdatePhysics extends PacketBasic {
    constructor(entity: Entity);

    constructor(id: number, pkt: ClientboundAddEntityPacket);
    static decode(buf: FriendlyByteBuf): PacketUpdatePhysics;
    static encode(msg: PacketUpdatePhysics, buf: FriendlyByteBuf): void;
  }

}

declare module 'noppes.npcs.packets' {
  import { Packet } from 'net.minecraft.network.protocol';
  import { ServerGamePacketListener } from 'net.minecraft.network.protocol.game';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { EntityNPCInterface } from 'noppes.npcs.entity';
  import { PermissionNode } from 'net.neoforged.neoforge.server.permission.nodes';
  import { Boolean, Void, Runnable, Class } from 'java.lang';
  import { ItemStack } from 'net.minecraft.world.item';
  import { CompletableFuture } from 'java.util.concurrent';
  import { RegisterPayloadHandlersEvent } from 'net.neoforged.neoforge.network.event';
  import { PayloadRegistrar } from 'net.neoforged.neoforge.network.registration';
  import { BiConsumer, Function, Consumer } from 'java.util.function';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { TriConsumer } from 'org.apache.logging.log4j.util';
  import { MinecraftServer } from 'net.minecraft.server';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { Entity } from 'net.minecraft.world.entity';
  import { Type } from 'CustomPacketPayload';

  interface IPacketServer extends Packet<ServerGamePacketListener> {}
  class IPacketServer extends Packet<ServerGamePacketListener> {
    player: ServerPlayer;
    npc: EntityNPCInterface;
    enqueueWork(runnable: Runnable): CompletableFuture<Void>;
    get permission(): PermissionNode<boolean>;
    handle(handler: ServerGamePacketListener): void;
    handle(): void;
    requiresNpc(): boolean;
    toolAllowed(item: ItemStack): boolean;
  }


  class Packets {
    static register(event: RegisterPayloadHandlersEvent): void;
    static registerPacket<MSG extends CustomPacketPayload>(registrar: PayloadRegistrar, messageType: Class<MSG>, encoder: BiConsumer<MSG, FriendlyByteBuf>, decoder: Function<FriendlyByteBuf, MSG>, handle: TriConsumer<MSG, MinecraftServer, ServerPlayer>): void;
    static registerPacket<MSG extends CustomPacketPayload>(registrar: PayloadRegistrar, messageType: Class<MSG>, encoder: BiConsumer<MSG, FriendlyByteBuf>, decoder: Function<FriendlyByteBuf, MSG>, handle: Consumer<MSG>): void;
    static send<MSG extends CustomPacketPayload>(player: ServerPlayer, msg: MSG): void;
    static sendAll<MSG extends CustomPacketPayload>(msg: MSG): void;
    static sendNearby<MSG extends CustomPacketPayload>(level: Level, pos: BlockPos, range: number, msg: MSG): void;
    static sendNearby<MSG extends CustomPacketPayload>(entity: Entity, msg: MSG): void;
    static sendServer<MSG extends CustomPacketPayload>(msg: MSG): void;
  }


  interface PacketServerBasic extends CustomPacketPayload {}
  class PacketServerBasic extends CustomPacketPayload {
    player: ServerPlayer;
    npc: EntityNPCInterface;
    get permission(): PermissionNode<boolean>;
    static handle(msg: PacketServerBasic, server: MinecraftServer, player: ServerPlayer): void;
    requiresNpc(): boolean;
    toolAllowed(item: ItemStack): boolean;
    type(): Type<CustomPacketPayload>;
  }

}

declare module 'noppes.npcs.packets.server' {
  import { PacketServerBasic } from 'noppes.npcs.packets';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Bank, RecipeCarpentry } from 'noppes.npcs.controllers.data';
  import { PermissionNode } from 'net.neoforged.neoforge.server.permission.nodes';
  import { Boolean } from 'java.lang';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ItemStack } from 'net.minecraft.world.item';
  import { EnumCompanionTalent, EnumGuiType, EnumMenuType, EnumCompanionStage, EnumPlayerData } from 'noppes.npcs.constants';
  import { UUID } from 'java.util';
  import { EntityNPCInterface } from 'noppes.npcs.entity';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Level } from 'net.minecraft.world.level';
  import { RoleFollower } from 'noppes.npcs.roles';
  import { Container } from 'net.minecraft.world';
  import { BlockPos } from 'net.minecraft.core';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { Entity } from 'net.minecraft.world.entity';

  interface SPacketBankGet extends PacketServerBasic {}
  class SPacketBankGet extends PacketServerBasic {
    constructor(bank: number);
    static decode(buf: FriendlyByteBuf): SPacketBankGet;
    static encode(msg: SPacketBankGet, buf: FriendlyByteBuf): void;
    static sendBank(player: ServerPlayer, bank: Bank): void;
  }


  interface SPacketBankRemove extends PacketServerBasic {}
  class SPacketBankRemove extends PacketServerBasic {
    constructor(bank: number);
    static decode(buf: FriendlyByteBuf): SPacketBankRemove;
    static encode(msg: SPacketBankRemove, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
  }


  interface SPacketBankSave extends PacketServerBasic {}
  class SPacketBankSave extends PacketServerBasic {
    constructor(data: CompoundTag);
    static decode(buf: FriendlyByteBuf): SPacketBankSave;
    static encode(msg: SPacketBankSave, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
  }


  interface SPacketBanksGet extends PacketServerBasic {}
  class SPacketBanksGet extends PacketServerBasic {
    static decode(buf: FriendlyByteBuf): SPacketBanksGet;
    static encode(msg: SPacketBanksGet, buf: FriendlyByteBuf): void;
    static sendBankDataAll(player: ServerPlayer): void;
  }


  interface SPacketBanksSlotOpen extends PacketServerBasic {}
  class SPacketBanksSlotOpen extends PacketServerBasic {
    constructor(slot: number, bankId: number);
    static decode(buf: FriendlyByteBuf): SPacketBanksSlotOpen;
    static encode(msg: SPacketBanksSlotOpen, buf: FriendlyByteBuf): void;
    requiresNpc(): boolean;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketBankUnlock extends PacketServerBasic {}
  class SPacketBankUnlock extends PacketServerBasic {
    static decode(buf: FriendlyByteBuf): SPacketBankUnlock;
    static encode(msg: SPacketBankUnlock, buf: FriendlyByteBuf): void;
    requiresNpc(): boolean;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketBankUpgrade extends PacketServerBasic {}
  class SPacketBankUpgrade extends PacketServerBasic {
    static decode(buf: FriendlyByteBuf): SPacketBankUpgrade;
    static encode(msg: SPacketBankUpgrade, buf: FriendlyByteBuf): void;
    requiresNpc(): boolean;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketCloneList extends PacketServerBasic {}
  class SPacketCloneList extends PacketServerBasic {
    constructor(tab: number);
    static decode(buf: FriendlyByteBuf): SPacketCloneList;
    static encode(msg: SPacketCloneList, buf: FriendlyByteBuf): void;
    static sendList(player: ServerPlayer, tab: number): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketCloneNameCheck extends PacketServerBasic {}
  class SPacketCloneNameCheck extends PacketServerBasic {
    constructor(name: string, tab: number);
    static decode(buf: FriendlyByteBuf): SPacketCloneNameCheck;
    static encode(msg: SPacketCloneNameCheck, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketCloneRemove extends PacketServerBasic {}
  class SPacketCloneRemove extends PacketServerBasic {
    constructor(name: string, tab: number);
    static decode(buf: FriendlyByteBuf): SPacketCloneRemove;
    static encode(msg: SPacketCloneRemove, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketCloneSave extends PacketServerBasic {}
  class SPacketCloneSave extends PacketServerBasic {
    constructor(name: string, tab: number);
    static decode(buf: FriendlyByteBuf): SPacketCloneSave;
    static encode(msg: SPacketCloneSave, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketCompanionOpenInv extends PacketServerBasic {}
  class SPacketCompanionOpenInv extends PacketServerBasic {
    static decode(buf: FriendlyByteBuf): SPacketCompanionOpenInv;
    static encode(msg: SPacketCompanionOpenInv, buf: FriendlyByteBuf): void;
    requiresNpc(): boolean;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketCompanionTalentExp extends PacketServerBasic {}
  class SPacketCompanionTalentExp extends PacketServerBasic {
    constructor(talent: EnumCompanionTalent, exp: number);
    static decode(buf: FriendlyByteBuf): SPacketCompanionTalentExp;
    static encode(msg: SPacketCompanionTalentExp, buf: FriendlyByteBuf): void;
    requiresNpc(): boolean;
  }


  interface SPacketCustomGuiButton extends PacketServerBasic {}
  class SPacketCustomGuiButton extends PacketServerBasic {
    constructor(id: UUID);
    static decode(buf: FriendlyByteBuf): SPacketCustomGuiButton;
    static encode(msg: SPacketCustomGuiButton, buf: FriendlyByteBuf): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketCustomGuiButtonList extends PacketServerBasic {}
  class SPacketCustomGuiButtonList extends PacketServerBasic {
    constructor(id: UUID, isRightClick: boolean);
    static decode(buf: FriendlyByteBuf): SPacketCustomGuiButtonList;
    static encode(msg: SPacketCustomGuiButtonList, buf: FriendlyByteBuf): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketCustomGuiFocusUpdate extends PacketServerBasic {}
  class SPacketCustomGuiFocusUpdate extends PacketServerBasic {
    constructor(id: UUID, focus: boolean);
    static decode(buf: FriendlyByteBuf): SPacketCustomGuiFocusUpdate;
    static encode(msg: SPacketCustomGuiFocusUpdate, buf: FriendlyByteBuf): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketCustomGuiParts extends PacketServerBasic {}
  class SPacketCustomGuiParts extends PacketServerBasic {
    constructor(data: CompoundTag);
    static decode(buf: FriendlyByteBuf): SPacketCustomGuiParts;
    static encode(msg: SPacketCustomGuiParts, buf: FriendlyByteBuf): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketCustomGuiScrollClick extends PacketServerBasic {}
  class SPacketCustomGuiScrollClick extends PacketServerBasic {
    constructor(id: UUID, slotId: number, doubleClicked: boolean);
    static decode(buf: FriendlyByteBuf): SPacketCustomGuiScrollClick;
    static encode(msg: SPacketCustomGuiScrollClick, buf: FriendlyByteBuf): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketCustomGuiSliderUpdate extends PacketServerBasic {}
  class SPacketCustomGuiSliderUpdate extends PacketServerBasic {
    constructor(id: UUID, value: number);
    static decode(buf: FriendlyByteBuf): SPacketCustomGuiSliderUpdate;
    static encode(msg: SPacketCustomGuiSliderUpdate, buf: FriendlyByteBuf): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketCustomGuiSubGuiClosed extends PacketServerBasic {}
  class SPacketCustomGuiSubGuiClosed extends PacketServerBasic {
    static decode(buf: FriendlyByteBuf): SPacketCustomGuiSubGuiClosed;
    static encode(msg: SPacketCustomGuiSubGuiClosed, buf: FriendlyByteBuf): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketCustomGuiTextUpdate extends PacketServerBasic {}
  class SPacketCustomGuiTextUpdate extends PacketServerBasic {
    constructor(id: UUID, text: string);
    static decode(buf: FriendlyByteBuf): SPacketCustomGuiTextUpdate;
    static encode(msg: SPacketCustomGuiTextUpdate, buf: FriendlyByteBuf): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketDialogCategoryRemove extends PacketServerBasic {}
  class SPacketDialogCategoryRemove extends PacketServerBasic {
    constructor(id: number);
    static decode(buf: FriendlyByteBuf): SPacketDialogCategoryRemove;
    static encode(msg: SPacketDialogCategoryRemove, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
  }


  interface SPacketDialogCategorySave extends PacketServerBasic {}
  class SPacketDialogCategorySave extends PacketServerBasic {
    constructor(data: CompoundTag);

    constructor(buf: FriendlyByteBuf);
    static decode(buf: FriendlyByteBuf): SPacketDialogCategorySave;
    static encode(msg: SPacketDialogCategorySave, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
  }


  interface SPacketDialogRemove extends PacketServerBasic {}
  class SPacketDialogRemove extends PacketServerBasic {
    constructor(id: number);
    static decode(buf: FriendlyByteBuf): SPacketDialogRemove;
    static encode(msg: SPacketDialogRemove, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
  }


  interface SPacketDialogSave extends PacketServerBasic {}
  class SPacketDialogSave extends PacketServerBasic {
    constructor(category: number, data: CompoundTag);

    constructor(buf: FriendlyByteBuf);
    static decode(buf: FriendlyByteBuf): SPacketDialogSave;
    static encode(msg: SPacketDialogSave, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
  }


  interface SPacketDialogSelected extends PacketServerBasic {}
  class SPacketDialogSelected extends PacketServerBasic {
    constructor(dialogId: number, optionId: number);
    closeDialog(player: ServerPlayer, npc: EntityNPCInterface, notifyClient: boolean): void;
    static decode(buf: FriendlyByteBuf): SPacketDialogSelected;
    static encode(msg: SPacketDialogSelected, buf: FriendlyByteBuf): void;
    requiresNpc(): boolean;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketDimensionsGet extends PacketServerBasic {}
  class SPacketDimensionsGet extends PacketServerBasic {
    static decode(buf: FriendlyByteBuf): SPacketDimensionsGet;
    static encode(msg: SPacketDimensionsGet, buf: FriendlyByteBuf): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketDimensionTeleport extends PacketServerBasic {}
  class SPacketDimensionTeleport extends PacketServerBasic {
    constructor(id: ResourceLocation);
    static decode(buf: FriendlyByteBuf): SPacketDimensionTeleport;
    static encode(msg: SPacketDimensionTeleport, buf: FriendlyByteBuf): void;
    static teleportPlayer(player: ServerPlayer, x: number, y: number, z: number, dimension: ResourceKey<Level>): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketFactionGet extends PacketServerBasic {}
  class SPacketFactionGet extends PacketServerBasic {
    constructor(id: number);
    static decode(buf: FriendlyByteBuf): SPacketFactionGet;
    static encode(msg: SPacketFactionGet, buf: FriendlyByteBuf): void;
  }


  interface SPacketFactionRemove extends PacketServerBasic {}
  class SPacketFactionRemove extends PacketServerBasic {
    constructor(id: number);
    static decode(buf: FriendlyByteBuf): SPacketFactionRemove;
    static encode(msg: SPacketFactionRemove, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
  }


  interface SPacketFactionSave extends PacketServerBasic {}
  class SPacketFactionSave extends PacketServerBasic {
    constructor(data: CompoundTag);
    static decode(buf: FriendlyByteBuf): SPacketFactionSave;
    static encode(msg: SPacketFactionSave, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
  }


  interface SPacketFactionsGet extends PacketServerBasic {}
  class SPacketFactionsGet extends PacketServerBasic {
    static decode(buf: FriendlyByteBuf): SPacketFactionsGet;
    static encode(msg: SPacketFactionsGet, buf: FriendlyByteBuf): void;
    static sendFactionDataAll(player: ServerPlayer): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketFollowerExtend extends PacketServerBasic {}
  class SPacketFollowerExtend extends PacketServerBasic {
    static decode(buf: FriendlyByteBuf): SPacketFollowerExtend;
    static encode(msg: SPacketFollowerExtend, buf: FriendlyByteBuf): void;
    requiresNpc(): boolean;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketFollowerHire extends PacketServerBasic {}
  class SPacketFollowerHire extends PacketServerBasic {
    static decode(buf: FriendlyByteBuf): SPacketFollowerHire;
    static encode(msg: SPacketFollowerHire, buf: FriendlyByteBuf): void;
    static followerBuy(role: RoleFollower, currencyInv: Container, player: ServerPlayer, npc: EntityNPCInterface): void;
    requiresNpc(): boolean;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketFollowerState extends PacketServerBasic {}
  class SPacketFollowerState extends PacketServerBasic {
    static decode(buf: FriendlyByteBuf): SPacketFollowerState;
    static encode(msg: SPacketFollowerState, buf: FriendlyByteBuf): void;
    requiresNpc(): boolean;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketGuiOpen extends PacketServerBasic {}
  class SPacketGuiOpen extends PacketServerBasic {
    constructor(type: EnumGuiType, pos: BlockPos);
    static decode(buf: FriendlyByteBuf): SPacketGuiOpen;
    static encode(msg: SPacketGuiOpen, buf: FriendlyByteBuf): void;
    static sendOpenGui(player: Player, gui: EnumGuiType, npc: EntityNPCInterface, pos: BlockPos): void;
  }


  interface SPacketLinkedAdd extends PacketServerBasic {}
  class SPacketLinkedAdd extends PacketServerBasic {
    constructor(name: string);
    static decode(buf: FriendlyByteBuf): SPacketLinkedAdd;
    static encode(msg: SPacketLinkedAdd, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
  }


  interface SPacketLinkedGet extends PacketServerBasic {}
  class SPacketLinkedGet extends PacketServerBasic {
    static decode(buf: FriendlyByteBuf): SPacketLinkedGet;
    static encode(msg: SPacketLinkedGet, buf: FriendlyByteBuf): void;
  }


  interface SPacketLinkedRemove extends PacketServerBasic {}
  class SPacketLinkedRemove extends PacketServerBasic {
    constructor(name: string);
    static decode(buf: FriendlyByteBuf): SPacketLinkedRemove;
    static encode(msg: SPacketLinkedRemove, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
  }


  interface SPacketLinkedSet extends PacketServerBasic {}
  class SPacketLinkedSet extends PacketServerBasic {
    constructor(name: string);
    static decode(buf: FriendlyByteBuf): SPacketLinkedSet;
    static encode(msg: SPacketLinkedSet, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    requiresNpc(): boolean;
  }


  interface SPacketMailSetup extends PacketServerBasic {}
  class SPacketMailSetup extends PacketServerBasic {
    constructor(data: CompoundTag);
    static decode(buf: FriendlyByteBuf): SPacketMailSetup;
    static encode(msg: SPacketMailSetup, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
  }


  interface SPacketMenuClose extends PacketServerBasic {}
  class SPacketMenuClose extends PacketServerBasic {
    static decode(buf: FriendlyByteBuf): SPacketMenuClose;
    static encode(msg: SPacketMenuClose, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    requiresNpc(): boolean;
  }


  interface SPacketMenuGet extends PacketServerBasic {}
  class SPacketMenuGet extends PacketServerBasic {
    constructor(type: EnumMenuType);
    static decode(buf: FriendlyByteBuf): SPacketMenuGet;
    static encode(msg: SPacketMenuGet, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    requiresNpc(): boolean;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketMenuSave extends PacketServerBasic {}
  class SPacketMenuSave extends PacketServerBasic {
    constructor(type: EnumMenuType, data: CompoundTag);
    static decode(buf: FriendlyByteBuf): SPacketMenuSave;
    static encode(msg: SPacketMenuSave, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    requiresNpc(): boolean;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketNaturalSpawnGet extends PacketServerBasic {}
  class SPacketNaturalSpawnGet extends PacketServerBasic {
    constructor(id: number);
    static decode(buf: FriendlyByteBuf): SPacketNaturalSpawnGet;
    static encode(msg: SPacketNaturalSpawnGet, buf: FriendlyByteBuf): void;
  }


  interface SPacketNaturalSpawnGetAll extends PacketServerBasic {}
  class SPacketNaturalSpawnGetAll extends PacketServerBasic {
    static decode(buf: FriendlyByteBuf): SPacketNaturalSpawnGetAll;
    static encode(msg: SPacketNaturalSpawnGetAll, buf: FriendlyByteBuf): void;
  }


  interface SPacketNaturalSpawnRemove extends PacketServerBasic {}
  class SPacketNaturalSpawnRemove extends PacketServerBasic {
    constructor(id: number);
    static decode(buf: FriendlyByteBuf): SPacketNaturalSpawnRemove;
    static encode(msg: SPacketNaturalSpawnRemove, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
  }


  interface SPacketNaturalSpawnSave extends PacketServerBasic {}
  class SPacketNaturalSpawnSave extends PacketServerBasic {
    constructor(data: CompoundTag);
    static decode(buf: FriendlyByteBuf): SPacketNaturalSpawnSave;
    static encode(msg: SPacketNaturalSpawnSave, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
  }


  interface SPacketNbtBookBlockSave extends PacketServerBasic {}
  class SPacketNbtBookBlockSave extends PacketServerBasic {
    constructor(pos: BlockPos, data: CompoundTag);
    static decode(buf: FriendlyByteBuf): SPacketNbtBookBlockSave;
    static encode(msg: SPacketNbtBookBlockSave, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketNbtBookEntitySave extends PacketServerBasic {}
  class SPacketNbtBookEntitySave extends PacketServerBasic {
    constructor(id: number, data: CompoundTag);
    static decode(buf: FriendlyByteBuf): SPacketNbtBookEntitySave;
    static encode(msg: SPacketNbtBookEntitySave, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketNpcDelete extends PacketServerBasic {}
  class SPacketNpcDelete extends PacketServerBasic {
    static decode(buf: FriendlyByteBuf): SPacketNpcDelete;
    static encode(msg: SPacketNpcDelete, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    requiresNpc(): boolean;
  }


  interface SPacketNpcDialogRemove extends PacketServerBasic {}
  class SPacketNpcDialogRemove extends PacketServerBasic {
    constructor(slot: number);
    static decode(buf: FriendlyByteBuf): SPacketNpcDialogRemove;
    static encode(msg: SPacketNpcDialogRemove, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    requiresNpc(): boolean;
  }


  interface SPacketNpcDialogSet extends PacketServerBasic {}
  class SPacketNpcDialogSet extends PacketServerBasic {
    constructor(slot: number, dialog: number);
    static decode(buf: FriendlyByteBuf): SPacketNpcDialogSet;
    static encode(msg: SPacketNpcDialogSet, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    requiresNpc(): boolean;
  }


  interface SPacketNpcDialogsGet extends PacketServerBasic {}
  class SPacketNpcDialogsGet extends PacketServerBasic {
    static decode(buf: FriendlyByteBuf): SPacketNpcDialogsGet;
    static encode(msg: SPacketNpcDialogsGet, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    requiresNpc(): boolean;
  }


  interface SPacketNpcFactionSet extends PacketServerBasic {}
  class SPacketNpcFactionSet extends PacketServerBasic {
    constructor(faction: number);
    static decode(buf: FriendlyByteBuf): SPacketNpcFactionSet;
    static encode(msg: SPacketNpcFactionSet, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    requiresNpc(): boolean;
  }


  interface SPacketNpcJobGet extends PacketServerBasic {}
  class SPacketNpcJobGet extends PacketServerBasic {
    static decode(buf: FriendlyByteBuf): SPacketNpcJobGet;
    static encode(msg: SPacketNpcJobGet, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    requiresNpc(): boolean;
  }


  interface SPacketNpcJobSave extends PacketServerBasic {}
  class SPacketNpcJobSave extends PacketServerBasic {
    constructor(data: CompoundTag);
    static decode(buf: FriendlyByteBuf): SPacketNpcJobSave;
    static encode(msg: SPacketNpcJobSave, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    requiresNpc(): boolean;
  }


  interface SPacketNpcJobSpawnerSet extends PacketServerBasic {}
  class SPacketNpcJobSpawnerSet extends PacketServerBasic {
    constructor(tab: number, name: string, slot: number);
    static decode(buf: FriendlyByteBuf): SPacketNpcJobSpawnerSet;
    static encode(msg: SPacketNpcJobSpawnerSet, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    requiresNpc(): boolean;
  }


  interface SPacketNpcMarketSet extends PacketServerBasic {}
  class SPacketNpcMarketSet extends PacketServerBasic {
    constructor(market: string, save: boolean);
    static decode(buf: FriendlyByteBuf): SPacketNpcMarketSet;
    static encode(msg: SPacketNpcMarketSet, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    requiresNpc(): boolean;
  }


  interface SPacketNpcRoleCompanionUpdate extends PacketServerBasic {}
  class SPacketNpcRoleCompanionUpdate extends PacketServerBasic {
    constructor(stage: EnumCompanionStage);
    static decode(buf: FriendlyByteBuf): SPacketNpcRoleCompanionUpdate;
    static encode(msg: SPacketNpcRoleCompanionUpdate, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    requiresNpc(): boolean;
  }


  interface SPacketNpcRoleGet extends PacketServerBasic {}
  class SPacketNpcRoleGet extends PacketServerBasic {
    static decode(buf: FriendlyByteBuf): SPacketNpcRoleGet;
    static encode(msg: SPacketNpcRoleGet, buf: FriendlyByteBuf): void;
    requiresNpc(): boolean;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketNpcRoleSave extends PacketServerBasic {}
  class SPacketNpcRoleSave extends PacketServerBasic {
    constructor(data: CompoundTag);
    static decode(buf: FriendlyByteBuf): SPacketNpcRoleSave;
    static encode(msg: SPacketNpcRoleSave, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    requiresNpc(): boolean;
  }


  interface SPacketNpcTransform extends PacketServerBasic {}
  class SPacketNpcTransform extends PacketServerBasic {
    constructor(isActive: boolean);
    static decode(buf: FriendlyByteBuf): SPacketNpcTransform;
    static encode(msg: SPacketNpcTransform, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    requiresNpc(): boolean;
  }


  interface SPacketNpcTransportGet extends PacketServerBasic {}
  class SPacketNpcTransportGet extends PacketServerBasic {
    static decode(buf: FriendlyByteBuf): SPacketNpcTransportGet;
    static encode(msg: SPacketNpcTransportGet, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    requiresNpc(): boolean;
  }


  interface SPacketNpRandomNameSet extends PacketServerBasic {}
  class SPacketNpRandomNameSet extends PacketServerBasic {
    constructor(id: number, gender: number);
    static decode(buf: FriendlyByteBuf): SPacketNpRandomNameSet;
    static encode(msg: SPacketNpRandomNameSet, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    requiresNpc(): boolean;
  }


  interface SPacketOpenParts extends PacketServerBasic {}
  class SPacketOpenParts extends PacketServerBasic {
    static decode(buf: FriendlyByteBuf): SPacketOpenParts;
    static encode(msg: SPacketOpenParts, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    requiresNpc(): boolean;
  }


  interface SPacketPlayerCloseContainer extends PacketServerBasic {}
  class SPacketPlayerCloseContainer extends PacketServerBasic {
    static decode(buf: FriendlyByteBuf): SPacketPlayerCloseContainer;
    static encode(msg: SPacketPlayerCloseContainer, buf: FriendlyByteBuf): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketPlayerDataGet extends PacketServerBasic {}
  class SPacketPlayerDataGet extends PacketServerBasic {
    constructor(type: EnumPlayerData, name: string);
    static decode(buf: FriendlyByteBuf): SPacketPlayerDataGet;
    static encode(msg: SPacketPlayerDataGet, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    static sendPlayerData(type: EnumPlayerData, player: ServerPlayer, name: string): void;
  }


  interface SPacketPlayerDataRemove extends PacketServerBasic {}
  class SPacketPlayerDataRemove extends PacketServerBasic {
    constructor(type: EnumPlayerData, name: string, id: number);
    static decode(buf: FriendlyByteBuf): SPacketPlayerDataRemove;
    static encode(msg: SPacketPlayerDataRemove, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
  }


  interface SPacketPlayerKeyPressed extends PacketServerBasic {}
  class SPacketPlayerKeyPressed extends PacketServerBasic {
    constructor(button: number, ctrlDown: boolean, shiftDown: boolean, altDown: boolean, metaDown: boolean, released: boolean, openGui: string);
    static decode(buf: FriendlyByteBuf): SPacketPlayerKeyPressed;
    static encode(msg: SPacketPlayerKeyPressed, buf: FriendlyByteBuf): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketPlayerLeftClicked extends PacketServerBasic {}
  class SPacketPlayerLeftClicked extends PacketServerBasic {
    static decode(buf: FriendlyByteBuf): SPacketPlayerLeftClicked;
    static encode(msg: SPacketPlayerLeftClicked, buf: FriendlyByteBuf): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketPlayerMailDelete extends PacketServerBasic {}
  class SPacketPlayerMailDelete extends PacketServerBasic {
    constructor(time: number, username: string);
    static decode(buf: FriendlyByteBuf): SPacketPlayerMailDelete;
    static encode(msg: SPacketPlayerMailDelete, buf: FriendlyByteBuf): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketPlayerMailGet extends PacketServerBasic {}
  class SPacketPlayerMailGet extends PacketServerBasic {
    static decode(buf: FriendlyByteBuf): SPacketPlayerMailGet;
    static encode(msg: SPacketPlayerMailGet, buf: FriendlyByteBuf): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketPlayerMailOpen extends PacketServerBasic {}
  class SPacketPlayerMailOpen extends PacketServerBasic {
    constructor(time: number, username: string);
    static decode(buf: FriendlyByteBuf): SPacketPlayerMailOpen;
    static encode(msg: SPacketPlayerMailOpen, buf: FriendlyByteBuf): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketPlayerMailRead extends PacketServerBasic {}
  class SPacketPlayerMailRead extends PacketServerBasic {
    constructor(time: number, username: string);
    static decode(buf: FriendlyByteBuf): SPacketPlayerMailRead;
    static encode(msg: SPacketPlayerMailRead, buf: FriendlyByteBuf): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketPlayerMailSend extends PacketServerBasic {}
  class SPacketPlayerMailSend extends PacketServerBasic {
    constructor(username: string, data: CompoundTag);
    static decode(buf: FriendlyByteBuf): SPacketPlayerMailSend;
    static encode(msg: SPacketPlayerMailSend, buf: FriendlyByteBuf): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketPlayerSoundPlays extends PacketServerBasic {}
  class SPacketPlayerSoundPlays extends PacketServerBasic {
    constructor(sound: string, category: string, looping: boolean);
    static decode(buf: FriendlyByteBuf): SPacketPlayerSoundPlays;
    static encode(msg: SPacketPlayerSoundPlays, buf: FriendlyByteBuf): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketPlayerTransport extends PacketServerBasic {}
  class SPacketPlayerTransport extends PacketServerBasic {
    constructor(name: string);
    static decode(buf: FriendlyByteBuf): SPacketPlayerTransport;
    static encode(msg: SPacketPlayerTransport, buf: FriendlyByteBuf): void;
    requiresNpc(): boolean;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketQuestCategoryRemove extends PacketServerBasic {}
  class SPacketQuestCategoryRemove extends PacketServerBasic {
    constructor(id: number);
    static decode(buf: FriendlyByteBuf): SPacketQuestCategoryRemove;
    static encode(msg: SPacketQuestCategoryRemove, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
  }


  interface SPacketQuestCategorySave extends PacketServerBasic {}
  class SPacketQuestCategorySave extends PacketServerBasic {
    constructor(data: CompoundTag);

    constructor(buf: FriendlyByteBuf);
    static decode(buf: FriendlyByteBuf): SPacketQuestCategorySave;
    static encode(msg: SPacketQuestCategorySave, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
  }


  interface SPacketQuestCompletionCheck extends PacketServerBasic {}
  class SPacketQuestCompletionCheck extends PacketServerBasic {
    constructor(questId: number);
    static decode(buf: FriendlyByteBuf): SPacketQuestCompletionCheck;
    static encode(msg: SPacketQuestCompletionCheck, buf: FriendlyByteBuf): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketQuestCompletionCheckAll extends PacketServerBasic {}
  class SPacketQuestCompletionCheckAll extends PacketServerBasic {
    static decode(buf: FriendlyByteBuf): SPacketQuestCompletionCheckAll;
    static encode(msg: SPacketQuestCompletionCheckAll, buf: FriendlyByteBuf): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketQuestDialogTitles extends PacketServerBasic {}
  class SPacketQuestDialogTitles extends PacketServerBasic {
    constructor(dialogId1: number, dialogId2: number, dialogId3: number);
    static decode(buf: FriendlyByteBuf): SPacketQuestDialogTitles;
    static encode(msg: SPacketQuestDialogTitles, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
  }


  interface SPacketQuestOpen extends PacketServerBasic {}
  class SPacketQuestOpen extends PacketServerBasic {
    constructor(gui: EnumGuiType, data: CompoundTag);
    static decode(buf: FriendlyByteBuf): SPacketQuestOpen;
    static encode(msg: SPacketQuestOpen, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketQuestRemove extends PacketServerBasic {}
  class SPacketQuestRemove extends PacketServerBasic {
    constructor(id: number);
    static decode(buf: FriendlyByteBuf): SPacketQuestRemove;
    static encode(msg: SPacketQuestRemove, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
  }


  interface SPacketQuestSave extends PacketServerBasic {}
  class SPacketQuestSave extends PacketServerBasic {
    constructor(categoryId: number, data: CompoundTag);

    constructor(buf: FriendlyByteBuf);
    static decode(buf: FriendlyByteBuf): SPacketQuestSave;
    static encode(msg: SPacketQuestSave, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
  }


  interface SPacketRecipeGet extends PacketServerBasic {}
  class SPacketRecipeGet extends PacketServerBasic {
    constructor(recipe: number);
    static decode(buf: FriendlyByteBuf): SPacketRecipeGet;
    static encode(msg: SPacketRecipeGet, buf: FriendlyByteBuf): void;
    static setRecipeGui(player: ServerPlayer, recipe: RecipeCarpentry): void;
  }


  interface SPacketRecipeRemove extends PacketServerBasic {}
  class SPacketRecipeRemove extends PacketServerBasic {
    constructor(recipe: number);
    static decode(buf: FriendlyByteBuf): SPacketRecipeRemove;
    static encode(msg: SPacketRecipeRemove, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
  }


  interface SPacketRecipeSave extends PacketServerBasic {}
  class SPacketRecipeSave extends PacketServerBasic {
    constructor(data: CompoundTag);
    static decode(buf: FriendlyByteBuf): SPacketRecipeSave;
    static encode(msg: SPacketRecipeSave, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
  }


  interface SPacketRecipesGet extends PacketServerBasic {}
  class SPacketRecipesGet extends PacketServerBasic {
    constructor(width: number);
    static decode(buf: FriendlyByteBuf): SPacketRecipesGet;
    static encode(msg: SPacketRecipesGet, buf: FriendlyByteBuf): void;
    static sendRecipeData(player: ServerPlayer, size: number): void;
  }


  interface SPacketRemoteFreeze extends PacketServerBasic {}
  class SPacketRemoteFreeze extends PacketServerBasic {
    static decode(buf: FriendlyByteBuf): SPacketRemoteFreeze;
    static encode(msg: SPacketRemoteFreeze, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
  }


  interface SPacketRemoteMenuOpen extends PacketServerBasic {}
  class SPacketRemoteMenuOpen extends PacketServerBasic {
    constructor(entityId: number);
    static decode(buf: FriendlyByteBuf): SPacketRemoteMenuOpen;
    static encode(msg: SPacketRemoteMenuOpen, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
  }


  interface SPacketRemoteNpcDelete extends PacketServerBasic {}
  class SPacketRemoteNpcDelete extends PacketServerBasic {
    constructor(entityId: number);
    static decode(buf: FriendlyByteBuf): SPacketRemoteNpcDelete;
    static encode(msg: SPacketRemoteNpcDelete, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
  }


  interface SPacketRemoteNpcReset extends PacketServerBasic {}
  class SPacketRemoteNpcReset extends PacketServerBasic {
    constructor(entityId: number);
    static decode(buf: FriendlyByteBuf): SPacketRemoteNpcReset;
    static encode(msg: SPacketRemoteNpcReset, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
  }


  interface SPacketRemoteNpcsGet extends PacketServerBasic {}
  class SPacketRemoteNpcsGet extends PacketServerBasic {
    static decode(buf: FriendlyByteBuf): SPacketRemoteNpcsGet;
    static encode(msg: SPacketRemoteNpcsGet, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    static sendNearbyNpcs(player: ServerPlayer): void;
  }


  interface SPacketRemoteNpcTp extends PacketServerBasic {}
  class SPacketRemoteNpcTp extends PacketServerBasic {
    constructor(entityId: number);
    static decode(buf: FriendlyByteBuf): SPacketRemoteNpcTp;
    static encode(msg: SPacketRemoteNpcTp, buf: FriendlyByteBuf): void;
  }


  interface SPacketSceneReset extends PacketServerBasic {}
  class SPacketSceneReset extends PacketServerBasic {
    static decode(buf: FriendlyByteBuf): SPacketSceneReset;
    static encode(msg: SPacketSceneReset, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketSceneStart extends PacketServerBasic {}
  class SPacketSceneStart extends PacketServerBasic {
    constructor(scene: number);
    static decode(buf: FriendlyByteBuf): SPacketSceneStart;
    static encode(msg: SPacketSceneStart, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketSchematicsStore extends PacketServerBasic {}
  class SPacketSchematicsStore extends PacketServerBasic {
    constructor(name: string, data: CompoundTag);
    static decode(buf: FriendlyByteBuf): SPacketSchematicsStore;
    static encode(msg: SPacketSchematicsStore, buf: FriendlyByteBuf): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketSchematicsTileBuild extends PacketServerBasic {}
  class SPacketSchematicsTileBuild extends PacketServerBasic {
    constructor(pos: BlockPos);
    static decode(buf: FriendlyByteBuf): SPacketSchematicsTileBuild;
    static encode(msg: SPacketSchematicsTileBuild, buf: FriendlyByteBuf): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketSchematicsTileGet extends PacketServerBasic {}
  class SPacketSchematicsTileGet extends PacketServerBasic {
    constructor(pos: BlockPos);
    static decode(buf: FriendlyByteBuf): SPacketSchematicsTileGet;
    static encode(msg: SPacketSchematicsTileGet, buf: FriendlyByteBuf): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketSchematicsTileSave extends PacketServerBasic {}
  class SPacketSchematicsTileSave extends PacketServerBasic {
    constructor(pos: BlockPos, data: CompoundTag);
    static decode(buf: FriendlyByteBuf): SPacketSchematicsTileSave;
    static encode(msg: SPacketSchematicsTileSave, buf: FriendlyByteBuf): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketSchematicsTileSet extends PacketServerBasic {}
  class SPacketSchematicsTileSet extends PacketServerBasic {
    constructor(pos: BlockPos, name: string);
    static decode(buf: FriendlyByteBuf): SPacketSchematicsTileSet;
    static encode(msg: SPacketSchematicsTileSet, buf: FriendlyByteBuf): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketScriptGet extends PacketServerBasic {}
  class SPacketScriptGet extends PacketServerBasic {
    constructor(type: number);
    static decode(buf: FriendlyByteBuf): SPacketScriptGet;
    static encode(msg: SPacketScriptGet, buf: FriendlyByteBuf): void;
    requiresNpc(): boolean;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketScriptSave extends PacketServerBasic {}
  class SPacketScriptSave extends PacketServerBasic {
    constructor(type: number, data: CompoundTag);

    constructor(buf: FriendlyByteBuf);
    static decode(buf: FriendlyByteBuf): SPacketScriptSave;
    static encode(msg: SPacketScriptSave, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    requiresNpc(): boolean;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketTileEntityGet extends PacketServerBasic {}
  class SPacketTileEntityGet extends PacketServerBasic {
    constructor(pos: BlockPos);
    static decode(buf: FriendlyByteBuf): SPacketTileEntityGet;
    static encode(msg: SPacketTileEntityGet, buf: FriendlyByteBuf): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketTileEntitySave extends PacketServerBasic {}
  class SPacketTileEntitySave extends PacketServerBasic {
    constructor(data: CompoundTag);
    static decode(buf: FriendlyByteBuf): SPacketTileEntitySave;
    static encode(msg: SPacketTileEntitySave, buf: FriendlyByteBuf): void;
    static saveTileEntity(player: ServerPlayer, compound: CompoundTag): BlockEntity;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketToolMobSpawner extends PacketServerBasic {}
  class SPacketToolMobSpawner extends PacketServerBasic {
    constructor(createSpawner: boolean, pos: BlockPos, name: string, tab: number);

    constructor(createSpawner: boolean, pos: BlockPos, clone: CompoundTag);

    constructor(createSpawner: boolean, server: boolean, pos: BlockPos, name: string, tab: number, clone: CompoundTag);

    constructor(buf: FriendlyByteBuf);
    static createMobSpawner(pos: BlockPos, comp: CompoundTag, player: Player): void;
    static decode(buf: FriendlyByteBuf): SPacketToolMobSpawner;
    static encode(msg: SPacketToolMobSpawner, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    static spawnClone(compound: CompoundTag, x: number, y: number, z: number, world: Level): Entity;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketToolMounter extends PacketServerBasic {}
  class SPacketToolMounter extends PacketServerBasic {
    constructor(type: number, name: string, tab: number);

    constructor(type: number, compound: CompoundTag);

    constructor();
    static decode(buf: FriendlyByteBuf): SPacketToolMounter;
    static encode(msg: SPacketToolMounter, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketTransportCategoriesGet extends PacketServerBasic {}
  class SPacketTransportCategoriesGet extends PacketServerBasic {
    static decode(buf: FriendlyByteBuf): SPacketTransportCategoriesGet;
    static encode(msg: SPacketTransportCategoriesGet, buf: FriendlyByteBuf): void;
    static sendTransportCategoryData(player: ServerPlayer): void;
  }


  interface SPacketTransportCategoryRemove extends PacketServerBasic {}
  class SPacketTransportCategoryRemove extends PacketServerBasic {
    constructor(id: number);
    static decode(buf: FriendlyByteBuf): SPacketTransportCategoryRemove;
    static encode(msg: SPacketTransportCategoryRemove, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
  }


  interface SPacketTransportCategorySave extends PacketServerBasic {}
  class SPacketTransportCategorySave extends PacketServerBasic {
    constructor(id: number, name: string);
    static decode(buf: FriendlyByteBuf): SPacketTransportCategorySave;
    static encode(msg: SPacketTransportCategorySave, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
  }


  interface SPacketTransportGet extends PacketServerBasic {}
  class SPacketTransportGet extends PacketServerBasic {
    constructor(id: number);
    static decode(buf: FriendlyByteBuf): SPacketTransportGet;
    static encode(msg: SPacketTransportGet, buf: FriendlyByteBuf): void;
    static sendTransportData(player: ServerPlayer, categoryid: number): void;
    toolAllowed(item: ItemStack): boolean;
  }


  interface SPacketTransportRemove extends PacketServerBasic {}
  class SPacketTransportRemove extends PacketServerBasic {
    constructor(id: number);
    static decode(buf: FriendlyByteBuf): SPacketTransportRemove;
    static encode(msg: SPacketTransportRemove, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
  }


  interface SPacketTransportSave extends PacketServerBasic {}
  class SPacketTransportSave extends PacketServerBasic {
    constructor(category: number, data: CompoundTag);
    static decode(buf: FriendlyByteBuf): SPacketTransportSave;
    static encode(msg: SPacketTransportSave, buf: FriendlyByteBuf): void;
    get permission(): PermissionNode<boolean>;
    requiresNpc(): boolean;
  }

}

declare module 'noppes.npcs.quests' {
  import { HashMap, Map, TreeMap } from 'java.util';
  import { Provider } from 'HolderLookup';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Player } from 'net.minecraft.world.entity.player';
  import { IQuestObjective } from 'noppes.npcs.api.handler.data';
  import { NpcMiscInventory } from 'noppes.npcs';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Integer } from 'java.lang';
  import { QuestData } from 'noppes.npcs.controllers.data';

  interface QuestDialog extends QuestInterface {}
  class QuestDialog extends QuestInterface {
    dialogs: HashMap;
    addAdditionalSaveData(lookupProvider: Provider, compound: CompoundTag): void;
    getObjectives(player: Player): IQuestObjective[];
    handleComplete(player: Player): void;
    isCompleted(player: Player): boolean;
    readAdditionalSaveData(lookupProvider: Provider, compound: CompoundTag): void;
  }


  class QuestInterface {
    questId: number;
    addAdditionalSaveData(var1: Provider, var2: CompoundTag): void;
    getObjectives(var1: Player): IQuestObjective[];
    handleComplete(var1: Player): void;
    isCompleted(var1: Player): boolean;
    readAdditionalSaveData(var1: Provider, var2: CompoundTag): void;
  }


  interface QuestItem extends QuestInterface {}
  class QuestItem extends QuestInterface {
    items: NpcMiscInventory;
    leaveItems: boolean;
    ignoreDamage: boolean;
    ignoreNBT: boolean;
    addAdditionalSaveData(lookupProvider: Provider, compound: CompoundTag): void;
    getObjectives(player: Player): IQuestObjective[];
    getProgressSet(player: Player): Map<ItemStack, number>;
    handleComplete(player: Player): void;
    isCompleted(player: Player): boolean;
    readAdditionalSaveData(lookupProvider: Provider, compound: CompoundTag): void;
  }


  interface QuestKill extends QuestInterface {}
  class QuestKill extends QuestInterface {
    targets: TreeMap;
    addAdditionalSaveData(lookupProvider: Provider, compound: CompoundTag): void;
    getKilled(data: QuestData): HashMap<string, number>;
    getObjectives(player: Player): IQuestObjective[];
    handleComplete(player: Player): void;
    isCompleted(player: Player): boolean;
    readAdditionalSaveData(lookupProvider: Provider, compound: CompoundTag): void;
    setKilled(data: QuestData, killed: HashMap<string, number>): void;
  }


  interface QuestLocation extends QuestInterface {}
  class QuestLocation extends QuestInterface {
    location: string;
    location2: string;
    location3: string;
    addAdditionalSaveData(lookupProvider: Provider, compound: CompoundTag): void;
    getFound(data: QuestData, i: number): boolean;
    getObjectives(player: Player): IQuestObjective[];
    handleComplete(player: Player): void;
    isCompleted(player: Player): boolean;
    readAdditionalSaveData(lookupProvider: Provider, compound: CompoundTag): void;
    setFound(data: QuestData, location: string): boolean;
  }


  interface QuestManual extends QuestInterface {}
  class QuestManual extends QuestInterface {
    manuals: TreeMap;
    addAdditionalSaveData(lookupProvider: Provider, compound: CompoundTag): void;
    getManual(data: QuestData): HashMap<string, number>;
    getObjectives(player: Player): IQuestObjective[];
    handleComplete(player: Player): void;
    isCompleted(player: Player): boolean;
    readAdditionalSaveData(lookupProvider: Provider, compound: CompoundTag): void;
    setManual(data: QuestData, manual: HashMap<string, number>): void;
  }

}

declare module 'noppes.npcs.quests.QuestDialog' {
  import { IQuestObjective } from 'noppes.npcs.api.handler.data';
  import { QuestDialog } from 'noppes.npcs.quests';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Dialog } from 'noppes.npcs.controllers.data';
  import { Component } from 'net.minecraft.network.chat';

  interface QuestDialogObjective extends IQuestObjective {}
  class QuestDialogObjective extends IQuestObjective {
    constructor(this$0: QuestDialog, player: Player, dialog: Dialog);
    get mCText(): Component;
    get maxProgress(): number;
    get progress(): number;
    get text(): string;
    isCompleted(): boolean;
    set progress(progress: number);
  }

}

declare module 'noppes.npcs.quests.QuestItem' {
  import { IQuestObjective } from 'noppes.npcs.api.handler.data';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Component } from 'net.minecraft.network.chat';

  interface QuestItemObjective extends IQuestObjective {}
  class QuestItemObjective extends IQuestObjective {
    constructor(player: Player, item: ItemStack);
    get mCText(): Component;
    get maxProgress(): number;
    get progress(): number;
    get text(): string;
    isCompleted(): boolean;
    set progress(progress: number);
  }

}

declare module 'noppes.npcs.quests.QuestKill' {
  import { IQuestObjective } from 'noppes.npcs.api.handler.data';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';

  interface QuestKillObjective extends IQuestObjective {}
  class QuestKillObjective extends IQuestObjective {
    constructor(player: Player, entity: string, amount: number);
    get mCText(): Component;
    get maxProgress(): number;
    get progress(): number;
    get text(): string;
    isCompleted(): boolean;
    set progress(progress: number);
  }

}

declare module 'noppes.npcs.quests.QuestLocation' {
  import { IQuestObjective } from 'noppes.npcs.api.handler.data';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';

  interface QuestLocationObjective extends IQuestObjective {}
  class QuestLocationObjective extends IQuestObjective {
    constructor(player: Player, location: string, nbtName: string);
    get mCText(): Component;
    get maxProgress(): number;
    get progress(): number;
    get text(): string;
    isCompleted(): boolean;
    set progress(progress: number);
  }

}

declare module 'noppes.npcs.quests.QuestManual' {
  import { IQuestObjective } from 'noppes.npcs.api.handler.data';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';

  interface QuestManualObjective extends IQuestObjective {}
  class QuestManualObjective extends IQuestObjective {
    constructor(player: Player, entity: string, amount: number);
    get mCText(): Component;
    get maxProgress(): number;
    get progress(): number;
    get text(): string;
    isCompleted(): boolean;
    set progress(progress: number);
  }

}

declare module 'noppes.npcs.roles.companion' {
  import { CompoundTag } from 'net.minecraft.nbt';
  import { EnumCompanionJobs } from 'noppes.npcs.constants';
  import { FoodProperties } from 'net.minecraft.world.food';
  import { ItemStack } from 'net.minecraft.world.item';
  import { EntityNPCInterface } from 'noppes.npcs.entity';
  import { Entity } from 'net.minecraft.world.entity';
  import { Player } from 'net.minecraft.world.entity.player';

  interface CompanionFarmer extends CompanionJobInterface {}
  class CompanionFarmer extends CompanionJobInterface {
    isStanding: boolean;
    get nBT(): CompoundTag;
    get type(): EnumCompanionJobs;
    isSelfSufficient(): boolean;
    onUpdate(): void;
    set nBT(compound: CompoundTag);
  }


  class CompanionFoodStats {
    addExhaustion(p_75113_1_: number): void;
    get foodLevel(): number;
    get prevFoodLevel(): number;
    get saturationLevel(): number;
    needFood(): boolean;
    onFoodEaten(food: FoodProperties, itemstack: ItemStack): void;
    onUpdate(npc: EntityNPCInterface): void;
    readNBT(compound: CompoundTag): void;
    set foodLevel(p_75114_1_: number);
    setFoodSaturationLevel(p_75119_1_: number): void;
    writeNBT(compound: CompoundTag): void;
  }


  interface CompanionGuard extends CompanionJobInterface {}
  class CompanionGuard extends CompanionJobInterface {
    isStanding: boolean;
    get nBT(): CompoundTag;
    get type(): EnumCompanionJobs;
    isEntityApplicable(entity: Entity): boolean;
    isSelfSufficient(): boolean;
    set nBT(compound: CompoundTag);
  }


  class CompanionJobInterface {
    npc: EntityNPCInterface;
    get nBT(): CompoundTag;
    get type(): EnumCompanionJobs;
    isSelfSufficient(): boolean;
    onUpdate(): void;
    set nBT(var1: CompoundTag);
  }


  interface CompanionTrader extends CompanionJobInterface {}
  class CompanionTrader extends CompanionJobInterface {
    get nBT(): CompoundTag;
    get type(): EnumCompanionJobs;
    interact(player: Player): void;
    set nBT(compound: CompoundTag);
  }

}

declare module 'noppes.npcs.roles' {
  import { IJobBard, IJobBuilder, IJobFarmer, IJobFollower, IJobPuppet, IJobSpawner, IRoleDialog, IRoleFollower, IRoleTrader, IRoleTransporter } from 'noppes.npcs.api.entity.data.role';
  import { EntityNPCInterface } from 'noppes.npcs.entity';
  import { CompoundTag, ListTag } from 'net.minecraft.nbt';
  import { TileBuilder } from 'noppes.npcs.blocks.tiles';
  import { IItemStack } from 'noppes.npcs.api.item';
  import { Availability, Quest, BlockData, Bank, TransportLocation } from 'noppes.npcs.controllers.data';
  import { HashMap, List, EnumSet, Map } from 'java.util';
  import { ConversationLine } from 'noppes.npcs.roles.JobConversation';
  import { IMassBlock } from 'noppes.npcs.controllers.MassBlockController';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Flag } from 'Goal';
  import { ICustomNpc, IEntityLiving, IPlayer } from 'noppes.npcs.api.entity';
  import { Entity, LivingEntity } from 'net.minecraft.world.entity';
  import { INPCJob, INPCRole } from 'noppes.npcs.api.entity.data';
  import { NpcMiscInventory } from 'noppes.npcs';
  import { Long, Integer } from 'java.lang';
  import { PartConfig } from 'noppes.npcs.roles.JobPuppet';
  import { IJobPuppetPart } from 'noppes.npcs.api.entity.data.role.IJobPuppet';
  import { Player } from 'net.minecraft.world.entity.player';
  import { EnumCompanionStage, EnumCompanionTalent } from 'noppes.npcs.constants';
  import { CompanionJobInterface, CompanionFoodStats } from 'noppes.npcs.roles.companion';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { ServerPlayer } from 'net.minecraft.server.level';

  interface JobBard extends IJobBard, JobInterface {}
  class JobBard extends IJobBard {
    minRange: number;
    maxRange: number;
    isStreamer: boolean;
    isLooping: boolean;
    hasOffRange: boolean;
    song: string;
    constructor(npc: EntityNPCInterface);
    aiStep(): void;
    delete(): void;
    get song(): string;
    get type(): number;
    killed(): void;
    load(nbttagcompound: CompoundTag): void;
    save(nbttagcompound: CompoundTag): CompoundTag;
    set song(song: string);
  }


  interface JobBuilder extends IJobBuilder, JobInterface {}
  class JobBuilder extends IJobBuilder {
    build: TileBuilder;
    constructor(npc: EntityNPCInterface);
    aiShouldExecute(): boolean;
    aiUpdateTask(): void;
    get mainhand(): IItemStack;
    get type(): number;
    isBuilding(): boolean;
    load(compound: CompoundTag): void;
    placeBlock(): void;
    reset(): void;
    save(compound: CompoundTag): CompoundTag;
    stop(): void;
  }


  interface JobChunkLoader extends JobInterface {}
  class JobChunkLoader extends JobInterface {
    constructor(npc: EntityNPCInterface);
    aiContinueExecute(): boolean;
    aiShouldExecute(): boolean;
    delete(): void;
    get type(): number;
    load(compound: CompoundTag): void;
    reset(): void;
    save(compound: CompoundTag): CompoundTag;
  }


  interface JobConversation extends JobInterface {}
  class JobConversation extends JobInterface {
    availability: Availability;
    lines: HashMap;
    quest: number;
    questTitle: string;
    generalDelay: number;
    ticks: number;
    range: number;
    mode: number;
    constructor(npc: EntityNPCInterface);
    aiContinueExecute(): boolean;
    aiShouldExecute(): boolean;
    aiStartExecuting(): void;
    aiUpdateTask(): void;
    get quest(): Quest;
    get type(): number;
    getLine(slot: number): ConversationLine;
    hasQuest(): boolean;
    killed(): void;
    load(compound: CompoundTag): void;
    reset(): void;
    save(compound: CompoundTag): CompoundTag;
    stop(): void;
  }


  interface JobFarmer extends IMassBlock, IJobFarmer, JobInterface {}
  class JobFarmer extends IMassBlock {
    chestMode: number;
    constructor(npc: EntityNPCInterface);
    aiContinueExecute(): boolean;
    aiShouldExecute(): boolean;
    aiUpdateTask(): void;
    get flags(): EnumSet<Flag>;
    get mainhand(): IItemStack;
    get npc(): EntityNPCInterface;
    get range(): number;
    get type(): number;
    isPlucking(): boolean;
    load(compound: CompoundTag): void;
    processed(list: BlockData[]): void;
    save(compound: CompoundTag): CompoundTag;
    setHolding(item: ItemStack): void;
  }


  interface JobFollower extends IJobFollower, JobInterface {}
  class JobFollower extends IJobFollower {
    following: EntityNPCInterface;
    name: string;
    constructor(npc: EntityNPCInterface);
    aiShouldExecute(): boolean;
    get following(): string;
    get followingNpc(): ICustomNpc;
    get type(): number;
    hasOwner(): boolean;
    isFollowing(): boolean;
    load(compound: CompoundTag): void;
    reset(): void;
    save(compound: CompoundTag): CompoundTag;
    set following(name: string);
    stop(): void;
  }


  interface JobGuard extends JobInterface {}
  class JobGuard extends JobInterface {
    targets: List;
    constructor(npc: EntityNPCInterface);
    get type(): number;
    isEntityApplicable(entity: Entity): boolean;
    load(nbttagcompound: CompoundTag): void;
    save(nbttagcompound: CompoundTag): CompoundTag;
  }


  interface JobHealer extends JobInterface {}
  class JobHealer extends JobInterface {
    range: number;
    type: number;
    speed: number;
    effects: HashMap;
    constructor(npc: EntityNPCInterface);
    aiContinueExecute(): boolean;
    aiShouldExecute(): boolean;
    aiStartExecuting(): void;
    get type(): number;
    load(nbttagcompound: CompoundTag): void;
    save(nbttagcompound: CompoundTag): CompoundTag;
  }


  interface JobInterface extends INPCJob {}
  class JobInterface extends INPCJob {
    static readonly NONE: JobInterface;
    npc: EntityNPCInterface;
    overrideMainHand: boolean;
    overrideOffHand: boolean;
    constructor(npc: EntityNPCInterface);
    aiContinueExecute(): boolean;
    aiShouldExecute(): boolean;
    aiStartExecuting(): void;
    aiUpdateTask(): void;
    delete(): void;
    get flags(): EnumSet<Flag>;
    get mainhand(): IItemStack;
    get offhand(): IItemStack;
    isFollowing(): boolean;
    itemToString(item: ItemStack): string;
    killed(): void;
    load(var1: CompoundTag): void;
    reset(): void;
    save(var1: CompoundTag): CompoundTag;
    stop(): void;
    stringToItem(s: string): ItemStack;
  }


  interface JobItemGiver extends JobInterface {}
  class JobItemGiver extends JobInterface {
    cooldownType: number;
    givingMethod: number;
    cooldown: number;
    inventory: NpcMiscInventory;
    itemGiverId: number;
    lines: List;
    availability: Availability;
    constructor(npc: EntityNPCInterface);
    aiContinueExecute(): boolean;
    aiShouldExecute(): boolean;
    aiStartExecuting(): void;
    delete(): void;
    get type(): number;
    getNBTLines(tagList: ListTag): HashMap<string, Long>;
    isOnTimer(): boolean;
    killed(): void;
    load(nbttagcompound: CompoundTag): void;
    newHashMapNBTList(lines: HashMap<string, Long>): ListTag;
    save(nbttagcompound: CompoundTag): CompoundTag;
  }


  interface JobPuppet extends IJobPuppet, JobInterface {}
  class JobPuppet extends IJobPuppet {
    head: PartConfig;
    larm: PartConfig;
    rarm: PartConfig;
    body: PartConfig;
    lleg: PartConfig;
    rleg: PartConfig;
    head2: PartConfig;
    larm2: PartConfig;
    rarm2: PartConfig;
    body2: PartConfig;
    lleg2: PartConfig;
    rleg2: PartConfig;
    whileStanding: boolean;
    whileAttacking: boolean;
    whileMoving: boolean;
    animate: boolean;
    animationSpeed: number;
    constructor(npc: EntityNPCInterface);
    aiShouldExecute(): boolean;
    delete(): void;
    get animationSpeed(): number;
    get isAnimated(): boolean;
    get type(): number;
    getPart(part: number): IJobPuppetPart;
    getRotationX(part1: PartConfig, part2: PartConfig, partialTicks: number): number;
    getRotationY(part1: PartConfig, part2: PartConfig, partialTicks: number): number;
    getRotationZ(part1: PartConfig, part2: PartConfig, partialTicks: number): number;
    isActive(): boolean;
    load(compound: CompoundTag): void;
    reset(): void;
    save(compound: CompoundTag): CompoundTag;
    set animationSpeed(speed: number);
    set isAnimated(bo: boolean);
  }


  interface JobSpawner extends IJobSpawner, JobInterface {}
  class JobSpawner extends IJobSpawner {
    data: Map;
    spawned: List;
    doesntDie: boolean;
    spawnType: number;
    xOffset: number;
    yOffset: number;
    zOffset: number;
    despawnOnTargetLost: boolean;
    constructor(npc: EntityNPCInterface);
    aiContinueExecute(): boolean;
    aiShouldExecute(): boolean;
    aiStartExecuting(): void;
    aiUpdateTask(): void;
    checkSpawns(): void;
    checkTarget(entity: LivingEntity): void;
    get type(): number;
    getTitle(slot: number): string;
    isOnCooldown(name: string): boolean;
    killed(): void;
    load(compound: CompoundTag): void;
    remove(i: number): void;
    removeAllSpawned(): void;
    reset(): void;
    save(compound: CompoundTag): CompoundTag;
    setJobCompound(slot: number, tab: number, name: string): void;
    shouldDelete(entity: LivingEntity): boolean;
    spawnEntity(i: number): IEntityLiving;
    stop(): void;
  }


  interface RoleBank extends RoleInterface {}
  class RoleBank extends RoleInterface {
    bankId: number;
    constructor(npc: EntityNPCInterface);
    get bank(): Bank;
    get type(): number;
    interact(player: Player): void;
    load(nbttagcompound: CompoundTag): void;
    save(nbttagcompound: CompoundTag): CompoundTag;
  }


  interface RoleCompanion extends RoleInterface {}
  class RoleCompanion extends RoleInterface {
    inventory: NpcMiscInventory;
    uuid: string;
    ownerName: string;
    talents: Map;
    canAge: boolean;
    ticksActive: number;
    stage: EnumCompanionStage;
    owner: Player;
    companionID: number;
    companionJobInterface: CompanionJobInterface;
    hasInv: boolean;
    defendOwner: boolean;
    foodstats: CompanionFoodStats;
    currentExp: number;
    constructor(npc: EntityNPCInterface);
    addExp(exp: number): void;
    addMovementStat(x: number, y: number, z: number): void;
    addTalentExp(talent: EnumCompanionTalent, exp: number): void;
    aiShouldExecute(): boolean;
    aiUpdateTask(): void;
    attackedEntity(entity: Entity): void;
    canAddExp(exp: number): boolean;
    canWearArmor(item: ItemStack): boolean;
    canWearSword(item: IItemStack): boolean;
    canWearWeapon(stack: IItemStack): boolean;
    clientUpdate(): void;
    defendOwner(): boolean;
    gainExp(chance: number): void;
    get itemInHand(): IItemStack;
    get maxExp(): number;
    get owner(): Player;
    get totalArmorValue(): number;
    get totalLevel(): number;
    get type(): number;
    getDamageAfterArmorAbsorb(source: DamageSource, damage: number): number;
    getExp(talent: EnumCompanionTalent): number;
    getNextLevel(talent: EnumCompanionTalent): number;
    getTalentLevel(talent: EnumCompanionTalent): number;
    hasInv(): boolean;
    hasOwner(): boolean;
    hasTalent(talent: EnumCompanionTalent): boolean;
    interact(player: Player): void;
    interact(player: Player, openGui: boolean): void;
    isEating(): boolean;
    isFollowing(): boolean;
    isSitting(): boolean;
    levelSword(): void;
    levelTalent(talent: EnumCompanionTalent, exp: number): void;
    load(compound: CompoundTag): void;
    matureTo(stage: EnumCompanionStage): void;
    save(compound: CompoundTag): CompoundTag;
    set owner(player: Player);
    setExp(talent: EnumCompanionTalent, exp: number): void;
    setSelfsuficient(bo: boolean): void;
    setSitting(sit: boolean): void;
    setStats(): void;
  }


  interface RoleDialog extends IRoleDialog, RoleInterface {}
  class RoleDialog extends IRoleDialog {
    dialog: string;
    questId: number;
    options: HashMap;
    optionsTexts: HashMap;
    constructor(npc: EntityNPCInterface);
    get dialog(): string;
    get type(): number;
    getOption(option: number): string;
    getOptionDialog(option: number): string;
    interact(player: Player): void;
    load(compound: CompoundTag): void;
    save(compound: CompoundTag): CompoundTag;
    set dialog(text: string);
    setOption(option: number, text: string): void;
    setOptionDialog(option: number, text: string): void;
  }


  interface RoleFollower extends IRoleFollower, RoleInterface {}
  class RoleFollower extends IRoleFollower {
    isFollowing: boolean;
    rates: HashMap;
    inventory: NpcMiscInventory;
    dialogHire: string;
    dialogFarewell: string;
    daysHired: number;
    hiredTime: number;
    disableGui: boolean;
    infiniteDays: boolean;
    refuseSoulStone: boolean;
    owner: Player;
    constructor(npc: EntityNPCInterface);
    addDays(days: number): void;
    aiShouldExecute(): boolean;
    defendOwner(): boolean;
    delete(): void;
    get days(): number;
    get following(): IPlayer;
    get guiDisabled(): boolean;
    get infinite(): boolean;
    get owner(): Player;
    get refuseSoulstone(): boolean;
    get type(): number;
    hasOwner(): boolean;
    interact(player: Player): void;
    isFollowing(): boolean;
    killed(): void;
    load(nbttagcompound: CompoundTag): void;
    reset(): void;
    save(nbttagcompound: CompoundTag): CompoundTag;
    set following(player: IPlayer);
    set guiDisabled(disabled: boolean);
    set infinite(infinite: boolean);
    set owner(player: Player);
    set refuseSoulstone(refuse: boolean);
  }


  interface RoleInterface extends INPCRole {}
  class RoleInterface extends INPCRole {
    static readonly NONE: RoleInterface;
    npc: EntityNPCInterface;
    dataString: HashMap;
    constructor(npc: EntityNPCInterface);
    aiContinueExecute(): boolean;
    aiShouldExecute(): boolean;
    aiStartExecuting(): void;
    aiUpdateTask(): void;
    clientUpdate(): void;
    defendOwner(): boolean;
    delete(): void;
    interact(var1: Player): void;
    isFollowing(): boolean;
    killed(): void;
    load(var1: CompoundTag): void;
    save(var1: CompoundTag): CompoundTag;
  }


  interface RolePostman extends RoleInterface {}
  class RolePostman extends RoleInterface {
    inventory: NpcMiscInventory;
    constructor(npc: EntityNPCInterface);
    aiContinueExecute(): boolean;
    aiShouldExecute(): boolean;
    get type(): number;
    interact(player: Player): void;
    load(nbttagcompound: CompoundTag): void;
    save(nbttagcompound: CompoundTag): CompoundTag;
  }


  interface RoleTrader extends IRoleTrader, RoleInterface {}
  class RoleTrader extends IRoleTrader {
    marketName: string;
    inventoryCurrency: NpcMiscInventory;
    inventorySold: NpcMiscInventory;
    ignoreDamage: boolean;
    ignoreNBT: boolean;
    toSave: boolean;
    constructor(npc: EntityNPCInterface);
    get market(): string;
    get type(): number;
    getCurrency1(slot: number): IItemStack;
    getCurrency2(slot: number): IItemStack;
    getSold(slot: number): IItemStack;
    hasCurrency(itemstack: ItemStack): boolean;
    interact(player: Player): void;
    load(nbttagcompound: CompoundTag): void;
    static load(role: RoleTrader, name: string): void;
    readNBT(nbttagcompound: CompoundTag): void;
    remove(slot: number): void;
    save(nbttagcompound: CompoundTag): CompoundTag;
    static save(r: RoleTrader, name: string): void;
    set(slot: number, currency: IItemStack, currency2: IItemStack, sold: IItemStack): void;
    set market(name: string);
    static setMarket(npc: EntityNPCInterface, marketName: string): void;
    writeNBT(nbttagcompound: CompoundTag): CompoundTag;
  }


  interface RoleTransporter extends IRoleTransporter, RoleInterface {}
  class RoleTransporter extends IRoleTransporter {
    transportId: number;
    name: string;
    constructor(npc: EntityNPCInterface);
    aiShouldExecute(): boolean;
    get location(): TransportLocation;
    get type(): number;
    hasTransport(): boolean;
    interact(player: Player): void;
    load(nbttagcompound: CompoundTag): void;
    save(nbttagcompound: CompoundTag): CompoundTag;
    setTransport(location: TransportLocation): void;
    transport(player: ServerPlayer, location: string): void;
  }

}

declare module 'noppes.npcs.roles.JobConversation' {
  import { Line } from 'noppes.npcs.controllers.data';
  import { JobConversation } from 'noppes.npcs.roles';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface ConversationLine extends Line {}
  class ConversationLine extends Line {
    npc: string;
    delay: number;
    constructor(this$0: JobConversation);
    addAdditionalSaveData(compound: CompoundTag): void;
    isEmpty(): boolean;
    readAdditionalSaveData(compound: CompoundTag): void;
  }

}

declare module 'noppes.npcs.roles.JobPuppet' {
  import { IJobPuppetPart } from 'noppes.npcs.api.entity.data.role.IJobPuppet';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface PartConfig extends IJobPuppetPart {}
  class PartConfig extends IJobPuppetPart {
    rotationX: number;
    rotationY: number;
    rotationZ: number;
    disabled: boolean;
    get rotationX(): number;
    get rotationY(): number;
    get rotationZ(): number;
    readNBT(compound: CompoundTag): void;
    setRotation(x: number, y: number, z: number): void;
    writeNBT(): CompoundTag;
  }

}

declare module 'noppes.npcs.schematics' {
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { CompoundTag, ListTag } from 'net.minecraft.nbt';
  import { List, HashMap, Map } from 'java.util';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { MinecraftServer } from 'net.minecraft.server';

  interface Blueprint extends ISchematic {}
  class Blueprint extends ISchematic {
    constructor(sizeX: number, sizeY: number, sizeZ: number, palleteSize: number, pallete: BlockState[], structure: short[][][], tileEntities: CompoundTag[], requiredMods: string[]);
    build(level: Level, pos: BlockPos): void;
    get architects(): string[];
    get blockEntityDimensions(): number;
    get height(): number;
    get length(): number;
    get nBT(): CompoundTag;
    get name(): string;
    get pallete(): BlockState[];
    get palleteSize(): number;
    get requiredMods(): string[];
    get sizeX(): number;
    get sizeY(): number;
    get sizeZ(): number;
    get structure(): short[][][];
    get tileEntities(): CompoundTag[];
    get width(): number;
    getBlockEntity(i: number): CompoundTag;
    getBlockState(x: number, y: number, z: number): BlockState;
    getBlockState(i: number): BlockState;
    set architects(architects: string[]);
    set name(name: string);
  }


  class BlueprintUtil {
    static convertSaveDataToBlocks(ints: number[], sizeX: number, sizeY: number, sizeZ: number): short[][][];
    static readBlueprintFromNBT(tag: CompoundTag): Blueprint;
    static writeBlueprintToNBT(schem: Blueprint): CompoundTag;
  }


  class ISchematic {
    get blockEntityDimensions(): number;
    get height(): number;
    get length(): number;
    get nBT(): CompoundTag;
    get name(): string;
    get width(): number;
    getBlockEntity(var1: number): CompoundTag;
    getBlockState(var1: number, var2: number, var3: number): BlockState;
    getBlockState(var1: number): BlockState;
  }


  interface Schematic extends ISchematic {}
  class Schematic extends ISchematic {
    name: string;
    width: number;
    height: number;
    length: number;
    tileList: ListTag;
    blockArray: number[];
    blockDataArray: number[];
    blockIds: HashMap;
    constructor(name: string);
    get blockBytes(): byte[][];
    get blockEntityDimensions(): number;
    get height(): number;
    get length(): number;
    get nBT(): CompoundTag;
    get name(): string;
    get width(): number;
    getBlockEntity(i: number): CompoundTag;
    getBlockState(x: number, y: number, z: number): BlockState;
    getBlockState(i: number): BlockState;
    load(compound: CompoundTag): void;
    setBlockBytes(blockId: number[], addId: number[]): void;
    xyzToIndex(x: number, y: number, z: number): number;
  }


  class SchematicWrapper {
    static readonly buildSize: number;
    schema: ISchematic;
    buildPos: number;
    size: number;
    rotation: number;
    isBuilding: boolean;
    firstLayer: boolean;
    constructor(schematic: ISchematic);
    build(server: MinecraftServer): void;
    get nBTSmall(): CompoundTag;
    get percentage(): number;
    getBlockEntity(x: number, y: number, z: number, pos: BlockPos): CompoundTag;
    init(pos: BlockPos, level: Level, rotation: number): void;
    load(s: Schematic): void;
    offset(x: number, y: number, z: number): void;
    place(server: MinecraftServer, x: number, y: number, z: number, flag: number): void;
    rotatePos(x: number, y: number, z: number, rotation: number): BlockPos;
    rotationState(state: BlockState, rotation: number): BlockState;
  }


  interface SpongeSchem extends ISchematic {}
  class SpongeSchem extends ISchematic {
    static readonly latestDataVersion: number;
    name: string;
    width: number;
    height: number;
    length: number;
    timestamp: number;
    data: number[];
    palette: Map;
    tileData: List;
    constructor(name: string);
    static Create(level: Level, name: string, pos: BlockPos, height: number, width: number, length: number): SpongeSchem;
    get blockEntityDimensions(): number;
    get height(): number;
    get length(): number;
    get nBT(): CompoundTag;
    get name(): string;
    get width(): number;
    getBlockEntity(i: number): CompoundTag;
    getBlockState(x: number, y: number, z: number): BlockState;
    getBlockState(i: number): BlockState;
    load(compound: CompoundTag): void;
    xyzToIndex(x: number, y: number, z: number): number;
  }

}

declare module 'noppes.npcs.shared.client.gui.components' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { IGuiInterface, IGui, ICustomScrollListener, ITextChangeListener, ITextfieldListener } from 'noppes.npcs.shared.client.gui.listeners';
  import { LocalPlayer } from 'net.minecraft.client.player';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { Button, AbstractWidget, ObjectSelectionList, EditBox } from 'net.minecraft.client.gui.components';
  import { OnPress } from 'Button';
  import { CustomGuiButton } from 'noppes.npcs.client.gui.custom.components';
  import { GuiCustom } from 'noppes.npcs.client.gui.custom';
  import { CustomGuiButtonWrapper } from 'noppes.npcs.api.wrapper.gui';
  import { List, Collection, HashSet, Map } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Minecraft } from 'net.minecraft.client';
  import { Integer } from 'java.lang';
  import { Pattern } from 'java.util.regex';
  import { TrueTypeFont } from 'noppes.npcs.shared.client.util';
  import { MarkUp } from 'noppes.npcs.shared.client.gui.components.TextContainer';

  interface GuiBasic extends IGuiInterface, Screen {}
  class GuiBasic extends IGuiInterface {
    player: LocalPlayer;
    drawDefaultBackground: boolean;
    title: string;
    background: ResourceLocation;
    closeOnEsc: boolean;
    guiLeft: number;
    guiTop: number;
    imageWidth: number;
    imageHeight: number;
    bgScale: number;
    wrapper: GuiWrapper;
    constructor();
    add(gui: IGui): void;
    addButton(button: GuiButtonNop): void;
    addLabel(label: GuiLabel): void;
    addScroll(scroll: GuiCustomScrollNop): void;
    addSideButton(button: GuiMenuSideButton): void;
    addSlider(slider: GuiSliderNop): void;
    addTextField(tf: GuiTextFieldNop): void;
    addTopButton(button: GuiMenuTopButton): void;
    buttonEvent(guibutton: GuiButtonNop): void;
    charTyped(c: string, i: number): boolean;
    close(): void;
    doubleClicked(): void;
    drawNpc(graphics: GuiGraphics, entity: LivingEntity, x: number, y: number, zoomed: number, rotation: number): void;
    elementClicked(): void;
    get(id: number): IGui;
    get focused(): GuiEventListener;
    get fontRenderer(): Font;
    get height(): number;
    get parent(): Screen;
    get subGui(): Screen;
    get width(): number;
    get wrapper(): GuiWrapper;
    getButton(i: number): GuiButtonNop;
    getLabel(i: number): GuiLabel;
    getResource(texture: string): ResourceLocation;
    getScroll(id: number): GuiCustomScrollNop;
    getSideButton(i: number): GuiMenuSideButton;
    getSlider(i: number): GuiSliderNop;
    getTextField(i: number): GuiTextFieldNop;
    getTopButton(i: number): GuiMenuTopButton;
    hasSubGui(): boolean;
    init(): void;
    initGui(): void;
    isInventoryKey(i: number): boolean;
    isPauseScreen(): boolean;
    keyPressed(key: number, p_keyPressed_2_: number, p_keyPressed_3_: number): boolean;
    mouseClicked(i: number, j: number, k: number): boolean;
    mouseDragged(x: number, y: number, button: number, dx: number, dy: number): boolean;
    mouseReleased(x: number, y: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrolled: number, p_299502_: number): boolean;
    onClose(): void;
    openLink(link: string): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    save(): void;
    set focused(gui: GuiEventListener);
    set subGui(gui: Screen);
    setBackground(texture: string): void;
    setScreen(gui: Screen): void;
    shouldCloseOnEsc(): boolean;
    subGuiClosed(subgui: Screen): void;
    tick(): void;
  }


  interface GuiBasicContainer<T extends AbstractContainerMenu = any> extends IGuiInterface, AbstractContainerScreen<T> {}
  class GuiBasicContainer<T extends AbstractContainerMenu = any> extends IGuiInterface {
    drawDefaultBackground: boolean;
    guiLeft: number;
    guiTop: number;
    player: LocalPlayer;
    wrapper: GuiWrapper;
    title: string;
    closeOnEsc: boolean;
    mouseX: number;
    mouseY: number;
    constructor(cont: T, inv: Inventory, titleIn: Component);
    add(gui: IGui): void;
    addButton(button: GuiButtonNop): void;
    addLabel(label: GuiLabel): void;
    addScroll(scroll: GuiCustomScrollNop): void;
    addSideButton(button: GuiMenuSideButton): void;
    addSlider(slider: GuiSliderNop): void;
    addTextField(tf: GuiTextFieldNop): void;
    addTopButton(button: GuiMenuTopButton): void;
    buttonEvent(guibutton: Button): void;
    buttonEvent(button: GuiButtonNop): void;
    charTyped(c: string, i: number): boolean;
    close(): void;
    containerTick(): void;
    elementClicked(): void;
    get(id: number): IGui;
    get focused(): GuiEventListener;
    get fontRenderer(): Font;
    get height(): number;
    get parent(): Screen;
    get subGui(): Screen;
    get width(): number;
    get wrapper(): GuiWrapper;
    getButton(i: number): GuiButtonNop;
    getLabel(i: number): GuiLabel;
    getResource(texture: string): ResourceLocation;
    getScroll(id: number): GuiCustomScrollNop;
    getSideButton(i: number): GuiMenuSideButton;
    getSlider(i: number): GuiSliderNop;
    getTextField(i: number): GuiTextFieldNop;
    getTopButton(i: number): GuiMenuTopButton;
    hasSubGui(): boolean;
    init(): void;
    initGui(): void;
    isInventoryKey(i: number): boolean;
    keyPressed(key: number, p_keyPressed_2_: number, p_keyPressed_3_: number): boolean;
    mouseClicked(i: number, j: number, k: number): boolean;
    mouseDragged(x: number, y: number, button: number, dx: number, dy: number): boolean;
    mouseReleased(x: number, y: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrolled: number, arg4: number): boolean;
    onClose(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    renderBackground(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    renderTooltip(p_283594_: GuiGraphics, p_282171_: number, p_281909_: number): void;
    save(): void;
    set focused(gui: GuiEventListener);
    set subGui(gui: Screen);
    setScreen(gui: Screen): void;
    shouldCloseOnEsc(): boolean;
    subGuiClosed(subgui: Screen): void;
    superRenderBackground(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
  }


  interface GuiButtonBiDirectional extends GuiButtonNop {}
  class GuiButtonBiDirectional extends GuiButtonNop {
    static readonly resource: ResourceLocation;
    static readonly UNSET_FG_COLOR: number;
    constructor(gui: IGuiInterface, id: number, x: number, y: number, width: number, height: number, arr: string[], current: number);

    constructor(gui: IGuiInterface, id: number, x: number, y: number, width: number, height: number, current: number, ...arr: string[]);
    clearFGColor(): void;
    get fGColor(): number;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    onClick(x: number, y: number): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    set fGColor(color: number);
  }


  interface GuiButtonNextPage extends GuiButtonNop {}
  class GuiButtonNextPage extends GuiButtonNop {
    constructor(gui: IGuiInterface, id: number, x: number, y: number, par4: boolean, press: OnPress);
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface GuiButtonNop extends Button {}
  class GuiButtonNop extends Button {
    shown: boolean;
    gui: IGuiInterface;
    id: number;
    constructor(gui: IGuiInterface, i: number, j: number, k: number, s: string);

    constructor(gui: IGuiInterface, i: number, j: number, k: number, display: string[], val: number);

    constructor(gui: IGuiInterface, i: number, j: number, k: number, l: number, m: number, string: string);

    constructor(gui: IGuiInterface, i: number, j: number, k: number, l: number, m: number, string: string, clicked: OnPress);

    constructor(gui: IGuiInterface, i: number, j: number, k: number, l: number, m: number, string: string, enabled: boolean);

    constructor(gui: IGuiInterface, i: number, j: number, k: number, l: number, m: number, display: string[], val: number);

    constructor(gui: IGuiInterface, i: number, j: number, k: number, l: number, m: number, val: number, ...display: string[]);

    constructor(gui: IGuiInterface, i: number, j: number, k: number, l: number, m: number, clicked: OnPress, val: number, ...display: string[]);
    clicked(): void;
    get value(): number;
    onClick(x: number, y: number): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    setDisplay(value: number): void;
    setDisplayText(text: string): void;
    setEnabled(bo: boolean): void;
  }


  interface GuiButtonYesNo extends GuiButtonNop {}
  class GuiButtonYesNo extends GuiButtonNop {
    constructor(gui: IGuiInterface, id: number, x: number, y: number, bo: boolean, clicked: OnPress);

    constructor(gui: IGuiInterface, id: number, x: number, y: number, width: number, height: number, bo: boolean, clicked: OnPress);

    constructor(gui: IGuiInterface, id: number, x: number, y: number, bo: boolean);

    constructor(gui: IGuiInterface, id: number, x: number, y: number, width: number, height: number, bo: boolean);
    get boolean(): boolean;
  }


  interface GuiColorButton extends CustomGuiButton {}
  class GuiColorButton extends CustomGuiButton {
    color: number;
    constructor(parent: GuiCustom, component: CustomGuiButtonWrapper, color: number);
    onRender(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface GuiCustomScrollNop extends Screen {}
  class GuiCustomScrollNop extends Screen {
    static readonly resource: ResourceLocation;
    id: number;
    guiLeft: number;
    guiTop: number;
    multipleSelection: boolean;
    listener: ICustomScrollListener;
    visible: boolean;
    constructor(parent: Screen, id: number);

    constructor(parent: Screen, id: number, multipleSelection: boolean);
    charTyped(p_231042_1_: string, p_231042_2_: number): boolean;
    clear(): void;
    clearSelection(): void;
    disabledSearch(): void;
    get height(): number;
    get list(): string[];
    get selected(): string;
    get selectedIndex(): number;
    get selectedList(): string[];
    get width(): number;
    hasSelected(): boolean;
    isMouseOver(x: number, y: number): boolean;
    keyPressed(p_231046_1_: number, p_231046_2_: number, p_231046_3_: number): boolean;
    mouseClicked(i: number, j: number, k: number): boolean;
    mouseInOption(i: number, j: number, k: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, mouseScrolled: number, arg4: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    replace(old: string, name: string): void;
    scrollTo(name: string): void;
    set list(list: string[]);
    set selected(name: string);
    set selectedIndex(i: number);
    set selectedList(selectedList: Collection<string>);
    setSize(x: number, y: number): void;
    setUnselectable(): GuiCustomScrollNop;
    setUnsortedList(list: string[]): void;
  }


  interface GuiLabel extends GuiEventListener, AbstractWidget {}
  class GuiLabel extends GuiEventListener {
    id: number;
    enabled: boolean;
    constructor(id: number, label: Component, color: number, x: number, y: number, width: number, height: number);

    constructor(id: number, s: string, x: number, y: number);

    constructor(id: number, s: string, x: number, y: number, tooltip: string);

    constructor(id: number, s: string, x: number, y: number, color: number);

    constructor(id: number, s: string, x: number, y: number, width: number, height: number);

    constructor(id: number, s: string, x: number, y: number, color: number, width: number, height: number);
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    setCentered(bo: boolean): void;
    setColor(color: number): void;
  }


  interface GuiMenuSideButton extends GuiButtonNop {}
  class GuiMenuSideButton extends GuiButtonNop {
    static readonly resource: ResourceLocation;
    active: boolean;
    constructor(gui: IGuiInterface, i: number, j: number, k: number, s: string);

    constructor(gui: IGuiInterface, i: number, j: number, k: number, l: number, i1: number, s: string);
    mouseClicked(i: number, j: number, button: number): boolean;
    renderWidget(graphics: GuiGraphics, i: number, j: number, partialTicks: number): void;
  }


  interface GuiMenuTopButton extends GuiButtonNop {}
  class GuiMenuTopButton extends GuiButtonNop {
    static readonly resource: ResourceLocation;
    active: boolean;
    hover: boolean;
    rotated: boolean;
    constructor(gui: IGuiInterface, i: number, j: number, k: number, s: string);

    constructor(gui: IGuiInterface, i: number, parent: GuiButtonNop, s: string);
    mouseClicked(i: number, j: number, button: number): boolean;
    mouseDragged(p_mouseDragged_1_: number, p_mouseDragged_3_: number, p_mouseDragged_5_: number, p_mouseDragged_6_: number, p_mouseDragged_8_: number): boolean;
    mouseReleased(i: number, j: number, button: number): boolean;
    onClick(x: number, y: number): void;
    renderWidget(graphics: GuiGraphics, i: number, j: number, partialTicks: number): void;
  }


  interface GuiMenuTopIconButton extends GuiMenuTopButton {}
  class GuiMenuTopIconButton extends GuiMenuTopButton {
    constructor(gui: IGuiInterface, i: number, x: number, y: number, s: string, item: ItemStack);

    constructor(gui: IGuiInterface, i: number, parent: GuiButtonNop, s: string, item: ItemStack);
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface GuiSliderNop extends AbstractWidget {}
  class GuiSliderNop extends AbstractWidget {
    id: number;
    sliderValue: number;
    startValue: number;
    static readonly UNSET_FG_COLOR: number;
    constructor(parent: Screen, id: number, xPos: number, yPos: number, displayString: string, sliderValue: number);

    constructor(parent: Screen, id: number, xPos: number, yPos: number, sliderValue: number);

    constructor(parent: Screen, id: number, xPos: number, yPos: number, width: number, height: number, sliderValue: number);
    clearFGColor(): void;
    get fGColor(): number;
    onClick(x: number, y: number): void;
    onRelease(x: number, y: number): void;
    renderBg(graphics: GuiGraphics, mc: Minecraft, p_146119_2_: number, p_146119_3_: number): void;
    set fGColor(color: number);
    setString(str: string): void;
  }


  interface GuiStringSlotNop<E extends ListEntry = any> extends ObjectSelectionList {}
  class GuiStringSlotNop<E extends ListEntry = any> extends ObjectSelectionList {
    selectedList: HashSet;
    constructor(list: Collection<string>, parent: GuiBasic, multiSelect: boolean);
    clear(): void;
    get selectedString(): string;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    setColoredList(m: Map<string, number>): void;
    setList(l: Collection<string>): void;
    setSelected(s: string): void;
  }


  interface GuiTextArea extends IGui, GuiEventListener, AbstractWidget {}
  class GuiTextArea extends IGui {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    text: string;
    active: boolean;
    enabled: boolean;
    visible: boolean;
    clicked: boolean;
    doubleClicked: boolean;
    clickScrolling: boolean;
    undoList: List;
    redoList: List;
    undoing: boolean;
    constructor(id: number, x: number, y: number, width: number, height: number, text: string);
    addText(s: string): void;
    charTyped(c: string, i: number): boolean;
    enableCodeHighlighting(): void;
    get iD(): number;
    get selectionAfterText(): string;
    get selectionBeforeText(): string;
    get text(): string;
    hasVerticalScrollbar(): boolean;
    isActive(): boolean;
    isEnabled(): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(xMouse: number, yMouse: number, mouseButton: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrolled: number, arg4: number): boolean;
    render(graphics: GuiGraphics, xMouse: number, yMouse: number): void;
    set text(text: string);
    setListener(listener: ITextChangeListener): void;
    tick(): void;
  }


  interface GuiTextFieldNop extends EditBox {}
  class GuiTextFieldNop extends EditBox {
    enabled: boolean;
    inMenu: boolean;
    numbersOnly: boolean;
    floatsOnly: boolean;
    listener: ITextfieldListener;
    id: number;
    min: number;
    max: number;
    def: number;
    minF: number;
    maxF: number;
    defF: number;
    constructor(id: number, parent: Screen, i: number, j: number, k: number, l: number, s: string);

    constructor(id: number, parent: Screen, i: number, j: number, k: number, l: number, s: Component);
    charTyped(c: string, i: number): boolean;
    static get active(): GuiTextFieldNop;
    get float(): number;
    get integer(): number;
    get textColor(): number;
    static isAnyActive(): boolean;
    isEmpty(): boolean;
    isFloat(): boolean;
    isInteger(): boolean;
    mouseClicked(i: number, j: number, k: number): boolean;
    renderWidget(graphics: GuiGraphics, x: number, y: number, f: number): void;
    setFloatsOnly(): GuiTextFieldNop;
    setMinMaxDefault(i: number, j: number, k: number): GuiTextFieldNop;
    setMinMaxDefault(i: number, j: number, k: number): GuiTextFieldNop;
    setNumbersOnly(): GuiTextFieldNop;
    unFocused(): void;
    static unfocus(): void;
  }


  class GuiWrapper {
    npcbuttons: Map;
    topbuttons: Map;
    sidebuttons: Map;
    textfields: Map;
    labels: Map;
    scrolls: Map;
    sliders: Map;
    extra: Map;
    components: List;
    parent: Screen;
    gui: Screen;
    subgui: Screen;
    mouseX: number;
    mouseY: number;
    constructor(gui: Screen);
    changeFocus(old: GuiEventListener, gui: GuiEventListener): void;
    charTyped(c: string, i: number): boolean;
    close(): void;
    drawNpc(graphics: GuiGraphics, entity: LivingEntity, x: number, y: number, zoomed: number, rotation: number, guiLeft: number, guiTop: number): void;
    get parent(): Screen;
    get subGui(): Screen;
    init(mc: Minecraft, width: number, height: number): void;
    keyPressed(key: number, p_keyPressed_2_: number, p_keyPressed_3_: number): boolean;
    mouseClicked(i: number, j: number, k: number): boolean;
    mouseDragged(x: number, y: number, button: number, dx: number, dy: number): boolean;
    mouseReleased(x: number, y: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrolled: number, arg4: number): boolean;
    setSubgui(subgui: Screen): void;
    tick(): void;
  }


  class TextContainer {
    readonly regexString: Pattern;
    readonly regexFunction: Pattern;
    readonly regexWord: Pattern;
    readonly regexNumber: Pattern;
    readonly regexComment: Pattern;
    text: string;
    makeup: List;
    lines: List;
    lineHeight: number;
    totalHeight: number;
    visibleLines: number;
    linesCount: number;
    constructor(text: string);
    addMakeUp(start: number, end: number, c: string, level: number): void;
    compareMarkUps(mu1: MarkUp, mu2: MarkUp): boolean;
    formatCodeText(): void;
    get formattedString(): string;
    init(font: TrueTypeFont, width: number, height: number): void;
  }

}

declare module 'noppes.npcs.shared.client.gui.components.GuiStringSlotNop' {
  import { Entry } from 'ObjectSelectionList';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';

  interface ListEntry extends Entry {}
  class ListEntry extends Entry {
    readonly data: string;
    readonly color: number;
    constructor(data: string);

    constructor(data: string, color: number);
    get narration(): Component;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    render(graphics: GuiGraphics, index: number, rowTop: number, rowBottom: number, width: number, height: number, mouseX: number, mouseY: number, mouseOver: boolean, partialTicks: number): void;
  }

}

declare module 'noppes.npcs.shared.client.gui.components.GuiTextArea' {
  import { GuiTextArea } from 'noppes.npcs.shared.client.gui.components';

  class UndoData {
    text: string;
    cursorPosition: number;
    constructor(this$0: GuiTextArea, text: string, cursorPosition: number);
  }

}

declare module 'noppes.npcs.shared.client.gui.components.TextContainer' {
  import { TextContainer } from 'noppes.npcs.shared.client.gui.components';

  class LineData {
    text: string;
    start: number;
    end: number;
    constructor(text: string, start: number, end: number);
    get formattedString(): string;
  }


  class MarkUp {
    start: number;
    end: number;
    level: number;
    c: string;
    constructor(this$0: TextContainer, start: number, end: number, c: string, level: number);
  }

}

declare module 'noppes.npcs.shared.client.gui' {
  import { GuiBasic, GuiButtonNop } from 'noppes.npcs.shared.client.gui.components';
  import { ITextChangeListener } from 'noppes.npcs.shared.client.gui.listeners';

  interface GuiTextAreaScreen extends ITextChangeListener, GuiBasic {}
  class GuiTextAreaScreen extends ITextChangeListener {
    text: string;
    originalText: string;
    constructor(text: string);

    constructor(originalText: string, text: string);
    buttonEvent(guibutton: GuiButtonNop): void;
    enableHighlighting(): GuiTextAreaScreen;
    init(): void;
    textUpdate(text: string): void;
  }

}

declare module 'noppes.npcs.shared.client.gui.listeners' {
  import { GuiCustomScrollNop, GuiButtonNop, GuiWrapper, GuiSliderNop, GuiTextFieldNop } from 'noppes.npcs.shared.client.gui.components';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Vector, Map } from 'java.util';
  import { Integer } from 'java.lang';

  class GuiSelectionListener {
    selected(var1: number, var2: string): void;
  }


  class ICustomScrollListener {
    scrollClicked(var1: number, var3: number, var5: number, var6: GuiCustomScrollNop): void;
    scrollDoubleClicked(var1: string, var2: GuiCustomScrollNop): void;
  }


  class IGui {
    get iD(): number;
    isActive(): boolean;
    render(var1: GuiGraphics, var2: number, var3: number): void;
    tick(): void;
  }


  class IGuiClose {
    setClose(var1: CompoundTag): void;
  }


  class IGuiData {
    setGuiData(var1: CompoundTag): void;
  }


  class IGuiError {
    setError(var1: number, var2: CompoundTag): void;
  }


  class IGuiInterface {
    buttonEvent(var1: GuiButtonNop): void;
    elementClicked(): void;
    get height(): number;
    get parent(): Screen;
    get subGui(): Screen;
    get width(): number;
    get wrapper(): GuiWrapper;
    hasSubGui(): boolean;
    initGui(): void;
    save(): void;
    subGuiClosed(var1: Screen): void;
  }


  class IScrollData {
    setData(var1: Vector<string>, var2: Map<string, number>): void;
    setSelected(var1: string): void;
  }


  class ISliderListener {
    mouseDragged(var1: GuiSliderNop): void;
    mousePressed(var1: GuiSliderNop): void;
    mouseReleased(var1: GuiSliderNop): void;
  }


  class ITextChangeListener {
    textUpdate(var1: string): void;
  }


  class ITextfieldListener {
    unFocused(var1: GuiTextFieldNop): void;
  }


  class ITopButtonListener {
    mouseClicked(var1: number, var3: number, var5: number): boolean;
  }

}

declare module 'noppes.npcs.shared.client.model' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Polygon } from 'noppes.npcs.shared.client.model.util';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { Matrix3f, Matrix4f } from 'org.joml';
  import { NopVector3f } from 'noppes.npcs.shared.common.util';
  import { Direction } from 'net.minecraft.core';
  import { ObjectList, Object2ObjectArrayMap } from 'it.unimi.dsi.fastutil.objects';
  import { ModelBox } from 'noppes.npcs.shared.client.model.NopModelPart';
  import { Random } from 'java.util';

  interface Model2DRenderer extends NopModelPart {}
  class Model2DRenderer extends NopModelPart {
    static textureOverride: ResourceLocation;
    constructor(texWidth: number, texHeight: number, x: number, y: number, width: number, height: number, location: ResourceLocation);
    init(location: ResourceLocation): Polygon[];
    render(mstack: PoseStack, builder: VertexConsumer, light: number, overlay: number, red: number, green: number, blue: number, alpha: number): void;
    render(location: ResourceLocation, mstack: PoseStack, builder: VertexConsumer, light: number, overlay: number, red: number, green: number, blue: number, alpha: number): void;
    render(p_228308_1_: PoseStack, p_228308_2_: VertexConsumer, p_228308_3_: number, p_228308_4_: number): void;
    renderModel(resource: ResourceLocation, matrix3f: Matrix3f, matrix4f: Matrix4f, builder: VertexConsumer, light: number, overlay: number, red: number, green: number, blue: number, alpha: number): void;
    setRotationOffset(x: number, y: number, z: number): Model2DRenderer;
    setRotationOffset(scale: NopVector3f): Model2DRenderer;
    setScale(scale: number): void;
    setScale(x: number, y: number): void;
    setScale(scale: NopVector3f): Model2DRenderer;
    setThickness(thickness: number): void;
  }


  interface ModelPlaneRenderer extends NopModelPart {}
  class ModelPlaneRenderer extends NopModelPart {
    constructor(i: number, j: number);

    constructor(textX: number, textY: number, i: number, j: number);
    addBackPlane(f: number, f1: number, f2: number, i: number, j: number): void;
    addPlane(x: number, y: number, z: number, sizeX: number, sizeY: number, scale: NopVector3f, d: Direction): ModelPlaneRenderer;
    addSidePlane(f: number, f1: number, f2: number, j: number, k: number): ModelPlaneRenderer;
    addTopPlane(f: number, f1: number, f2: number, i: number, k: number): void;
    mirror(bo: boolean): ModelPlaneRenderer;
  }


  class NopModelPart {
    xTexSize: number;
    yTexSize: number;
    xTexOffs: number;
    yTexOffs: number;
    x: number;
    y: number;
    z: number;
    xRot: number;
    yRot: number;
    zRot: number;
    mirror: boolean;
    visible: boolean;
    readonly cubes: ObjectList;
    readonly children: Object2ObjectArrayMap;
    scale: NopVector3f;
    constructor(p_i225949_1_: number, p_i225949_2_: number, p_i225949_3_: number, p_i225949_4_: number);

    constructor(p_i225949_1_: number, p_i225949_2_: number);
    addBox(p_217178_1_: string, p_217178_2_: number, p_217178_3_: number, p_217178_4_: number, p_217178_5_: number, p_217178_6_: number, p_217178_7_: number, p_217178_8_: number, p_217178_9_: number, p_217178_10_: number): NopModelPart;
    addBox(p_228300_1_: number, p_228300_2_: number, p_228300_3_: number, p_228300_4_: number, p_228300_5_: number, p_228300_6_: number): NopModelPart;
    addBox(p_228304_1_: number, p_228304_2_: number, p_228304_3_: number, p_228304_4_: number, p_228304_5_: number, p_228304_6_: number, p_228304_7_: boolean): NopModelPart;
    addBox(p_228301_1_: number, p_228301_2_: number, p_228301_3_: number, p_228301_4_: number, p_228301_5_: number, p_228301_6_: number, p_228301_7_: number): void;
    addBox(p_228302_1_: number, p_228302_2_: number, p_228302_3_: number, p_228302_4_: number, p_228302_5_: number, p_228302_6_: number, p_228302_7_: number, p_228302_8_: number, p_228302_9_: number): void;
    addBox(p_228303_1_: number, p_228303_2_: number, p_228303_3_: number, p_228303_4_: number, p_228303_5_: number, p_228303_6_: number, p_228303_7_: number, p_228303_8_: boolean): void;
    addChild(name: string, p_78792_1_: NopModelPart): void;
    addChild(p_78792_1_: NopModelPart): void;
    copyFrom(p_217177_1_: NopModelPart): void;
    createShallowCopy(): NopModelPart;
    getRandomCube(p_228310_1_: Random): ModelBox;
    render(p_228308_1_: PoseStack, p_228308_2_: VertexConsumer, p_228308_3_: number, p_228308_4_: number): void;
    render(p_228309_1_: PoseStack, p_228309_2_: VertexConsumer, p_228309_3_: number, p_228309_4_: number, p_228309_5_: number, p_228309_6_: number, p_228309_7_: number, p_228309_8_: number): void;
    setPos(p_78793_1_: number, p_78793_2_: number, p_78793_3_: number): void;
    setPos(pos: NopVector3f): NopModelPart;
    setRotation(model: NopModelPart, x: number, y: number, z: number): void;
    setRotation(rotate: NopVector3f): NopModelPart;
    setTexSize(p_78787_1_: number, p_78787_2_: number): NopModelPart;
    texOffs(p_78784_1_: number, p_78784_2_: number): NopModelPart;
    translateAndRotate(p_228307_1_: PoseStack): void;
  }

}

declare module 'noppes.npcs.shared.client.model.NopModelPart' {
  import { Vector3f } from 'org.joml';
  import { Direction } from 'net.minecraft.core';

  class ModelBox {
    polygons: TexturedQuad[];
    minX: number;
    minY: number;
    minZ: number;
    maxX: number;
    maxY: number;
    maxZ: number;
    constructor(p_i225950_1_: number, p_i225950_2_: number, p_i225950_3_: number, p_i225950_4_: number, p_i225950_5_: number, p_i225950_6_: number, p_i225950_7_: number, p_i225950_8_: number, p_i225950_9_: number, p_i225950_10_: number, p_i225950_11_: number, p_i225950_12_: boolean, p_i225950_13_: number, p_i225950_14_: number);
  }


  class TexturedQuad {
    readonly vertices: PositionTextureVertex[];
    readonly normal: Vector3f;
    constructor(p_i225951_1_: PositionTextureVertex[], p_i225951_2_: number, p_i225951_3_: number, p_i225951_4_: number, p_i225951_5_: number, p_i225951_6_: number, p_i225951_7_: number, p_i225951_8_: boolean, p_i225951_9_: Direction);
  }


  class PositionTextureVertex {
    readonly pos: Vector3f;
    readonly u: number;
    readonly v: number;
    constructor(p_i1158_1_: number, p_i1158_2_: number, p_i1158_3_: number, p_i1158_4_: number, p_i1158_5_: number);

    constructor(p_i225952_1_: Vector3f, p_i225952_2_: number, p_i225952_3_: number);
    remap(p_78240_1_: number, p_78240_2_: number): PositionTextureVertex;
  }

}

declare module 'noppes.npcs.shared.client.model.util' {
  import { RenderType, RenderStateShard } from 'net.minecraft.client.renderer';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { VertexFormat } from 'com.mojang.blaze3d.vertex';
  import { Matrix4f, Vector4f, Vector3f } from 'org.joml';
  import { NopVector2i, NopVector3f, NopVector2f } from 'noppes.npcs.shared.common.util';
  import { Runnable } from 'java.lang';

  class BatchRenderer {
    static lastType: RenderType;
    add(renderType: RenderType, resource: ResourceLocation, id: number, format: VertexFormat, matrix: Matrix4f, vertexCount: number, texPos: NopVector2i, light: number, overlay: number, red: number, green: number, blue: number, alpha: number): void;
    static createTranslateMatrix(p_27654_: number, p_27655_: number, p_27656_: number): Matrix4f;
    draw(): void;
    static get instance(): BatchRenderer;
  }


  interface CustomRenderStates extends RenderStateShard {}
  class CustomRenderStates extends RenderStateShard {
    static readonly WHITE: Vector4f;
    static POS_COL_TEX_LIGHT_FADE_NORMAL: VertexFormat;
    static POS_COL_TEX_NORMAL: VertexFormat;
    static readonly POS_TEX_NORMAL: VertexFormat;
    static readonly OBJ_OUTLINE_RENDER_TYPE: RenderType;
    constructor(p_i225973_1_: string, p_i225973_2_: Runnable, p_i225973_3_: Runnable);
    static getObjVBORenderType(blending: number, glow: boolean): RenderType;
  }


  class Mesh {
    indices: number[];
    vertices: Vertex[];
    normals: NopVector3f[];
    delete(): void;
  }


  class Polygon {
    readonly normal: Vector3f;
    readonly vertexes: Vertex[];
    constructor(normal: Vector3f, ...vertexes: Vertex[]);
  }


  class Vertex {
    readonly pos: Vector3f;
    readonly texCoords: NopVector2f;
    readonly normal: NopVector3f;
    readonly tangent: NopVector3f;
    constructor(pos: Vector3f, texCoords: NopVector2f, normal: NopVector3f, tangent: NopVector3f);

    constructor(pos: Vector3f, texCoords: NopVector2f);

    constructor(x: number, y: number, z: number, u: number, v: number);
  }

}

declare module 'noppes.npcs.shared.client.model.util.BatchRenderer' {
  import { BatchRenderer } from 'noppes.npcs.shared.client.model.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { VertexFormat } from 'com.mojang.blaze3d.vertex';
  import { Matrix4f } from 'org.joml';
  import { NopVector2i } from 'noppes.npcs.shared.common.util';

  class Batch {
    constructor(this$0: BatchRenderer, resource: ResourceLocation, id: number, format: VertexFormat, matrix: Matrix4f, vertexCount: number, texPos: NopVector2i, light: number, overlay: number, red: number, green: number, blue: number, alpha: number);
  }

}

declare module 'noppes.npcs.shared.client.model.util.CustomRenderStates' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface BLEND extends Enum<BLEND> {}
  class BLEND extends Enum<BLEND> {
    static readonly NORMAL: BLEND;
    static readonly ADD: BLEND;
    static readonly SUB: BLEND;
    get value(): number;
    static valueOf(name: string): BLEND;
    static values(): BLEND[];
  }

}

declare module 'noppes.npcs.shared.client.util' {
  import { UUID, List } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BufferedImage } from 'java.awt.image';
  import { SimpleTexture } from 'net.minecraft.client.renderer.texture';
  import { File } from 'java.io';
  import { Runnable } from 'java.lang';
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';
  import { Component } from 'net.minecraft.network.chat';
  import { Font } from 'java.awt';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { Matrix4f } from 'org.joml';

  class AnalyticsTracking {
    static sendData(uuid: UUID, eventName: string, data: string): void;
  }


  class AssetsFinder {
    static find(root: string, type: string): ResourceLocation[];
  }


  class CTextureUtil {
    static allocateTexture(textureId: number, width: number, height: number): void;
    static allocateTextureImpl(glTextureId: number, mipmapLevels: number, width: number, height: number): void;
    static anaglyphColor(p_177054_0_: number): number;
    static deleteTexture(textureId: number): void;
    static updateAnaglyph(p_110985_0_: number[]): number[];
    static uploadTextureImage(textureId: number, texture: BufferedImage): number;
    static uploadTextureImageSub(textureId: number, p_110995_1_: BufferedImage, p_110995_2_: number, p_110995_3_: number): number;
  }


  interface ImageDownloadAlt extends SimpleTexture {}
  class ImageDownloadAlt extends SimpleTexture {
    readonly cacheFile: File;
    readonly location: ResourceLocation;
    uploaded: boolean;
    constructor(file: File, url: string, location: ResourceLocation, defaultLocation: ResourceLocation, fix64: boolean, r: Runnable);
    load(resourceManager: ResourceManager): void;
    loadTextureFromServer(): void;
    parseUserSkin(image: NativeImage): NativeImage;
    setImage(image: NativeImage): void;
  }


  class NoppesStringUtils {
    static areEqual(s1: string, s2: string): boolean;
    static areEqual(s1: ResourceLocation, s2: ResourceLocation): boolean;
    static cleanFileName(badFileName: string): string;
    static cleanResource(s: string): string;
    static formatText(text: Component, ...obs: any[]): string;
    static formatText(text: string, ...obs: any[]): string;
    static get clipboardContents(): string;
    static newLine(): string;
    static parseInt(s: string, i: number): number;
    static removeHidden(text: string): string;
    static set clipboardContents(aString: string);
    static splitLines(s: string): string[];
    static stripSpecialCharacters(inParameter: string): string;
    static translate(...arr: any[]): string;
  }


  class ResourceDownloader {
    static contains(location: ResourceLocation): boolean;
    static getUrlFile(url: string, fixSkin: boolean): File;
    static getUrlResourceLocation(url: string, fixSkin: boolean): ResourceLocation;
    static load(resource: ImageDownloadAlt): void;
  }


  interface TextureCache extends SimpleTexture {}
  class TextureCache extends SimpleTexture {
    constructor(location: ResourceLocation, original: ResourceLocation);
    load(p_195413_1_: ResourceManager): void;
  }


  class TrueTypeFont {
    scale: number;
    constructor(font: Font, scale: number);

    constructor(resource: ResourceLocation, fontSize: number, scale: number);
    dispose(): void;
    draw(posestack: PoseStack, text: string, x: number, y: number, color: number): void;
    fillGradient(m: Matrix4f, x: number, y: number, textureX: number, textureY: number, width: number, height: number, r: number, g: number, b: number): void;
    get fontName(): string;
    height(text: string): number;
    setSpecial(c: string): void;
    width(text: string): number;
  }

}

declare module 'noppes.npcs.shared.client.util.TrueTypeFont' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class GlyphCache {
    width: number;
    height: number;
  }


  class Glyph {
  }


  interface GlyphType extends Enum<GlyphType> {}
  class GlyphType extends Enum<GlyphType> {
    static readonly NORMAL: GlyphType;
    static readonly COLOR: GlyphType;
    static readonly RANDOM: GlyphType;
    static readonly BOLD: GlyphType;
    static readonly STRIKETHROUGH: GlyphType;
    static readonly UNDERLINE: GlyphType;
    static readonly ITALIC: GlyphType;
    static readonly RESET: GlyphType;
    static readonly OTHER: GlyphType;
    static valueOf(name: string): GlyphType;
    static values(): GlyphType[];
  }


  class TextureCache {
  }

}

declare module 'noppes.npcs.shared.common' {
  import { MinecraftServer } from 'net.minecraft.server';
  import { Component } from 'net.minecraft.network.chat';
  import { Player } from 'net.minecraft.world.entity.player';
  import { AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { ItemStack } from 'net.minecraft.world.item';
  import { RuntimeException, Exception } from 'java.lang';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { Type } from 'CustomPacketPayload';

  class CommonUtil {
    static NotifyOPs(server: MinecraftServer, message: string, ...obs: any[]): void;
    static NotifyOPs(server: MinecraftServer, message: Component): void;
    static isOp(player: Player): boolean;
  }


  interface ContainerEmpty extends AbstractContainerMenu {}
  class ContainerEmpty extends AbstractContainerMenu {
    constructor();
    quickMoveStack(p_38941_: Player, p_38942_: number): ItemStack;
    stillValid(var1: Player): boolean;
  }


  interface NoppesException extends RuntimeException {}
  class NoppesException extends RuntimeException {
    constructor(message: string, ...obs: any[]);

    constructor(ex: Exception, message: string, ...obs: any[]);
  }


  interface PacketBasic extends CustomPacketPayload {}
  class PacketBasic extends CustomPacketPayload {
    player: Player;
    static handle(msg: PacketBasic): void;
    type(): Type<CustomPacketPayload>;
  }

}

declare module 'noppes.npcs.shared.common.util' {
  import { Throwable, Comparable } from 'java.lang';
  import { LogRecord } from 'java.util.logging';
  import { LinkedHashMap, Comparator } from 'java.util';

  class ColorUtil {
    static colorToHex(color: number): string;
    static colorToRgb(color: number): NopVector3f;
    static hexToColor(hex: string): number;
    static rgbToColor(color: NopVector3f): number;
  }


  class EasingFunctions {
    static easeInCubic(x: number): number;
    static easeInOutCubic(x: number): number;
    static easeInOutQuad(x: number): number;
    static easeInOutQuart(x: number): number;
    static easeOutCubic(x: number): number;
  }


  class LogWriter {
    static debug(msg: any): void;
    static error(msg: any): void;
    static error(msg: any, e: Throwable): void;
    static except(e: Throwable): void;
    format(record: LogRecord): string;
    static info(msg: any): void;
    static warn(msg: any): void;
  }


  interface LRUHashMap<K = any, V = any> extends LinkedHashMap<K, V> {}
  class LRUHashMap<K = any, V = any> extends LinkedHashMap<K, V> {
    constructor(size: number);
  }


  interface NaturalOrderComparator extends Comparator<string> {}
  class NaturalOrderComparator extends Comparator<string> {
    compare(o1: string, o2: string): number;
  }


  class NopCallback<T = any> {
    sumbit(var1: T): void;
  }


  class NopVector2f {
    static readonly ZERO: NopVector2f;
    static readonly ONE: NopVector2f;
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number);

    constructor(values: number[]);
    add(x: number, y: number, z: number): NopVector2f;
    mul(mul: number): NopVector2f;
    set(x: number, y: number, z: number): NopVector2f;
  }


  class NopVector2i {
    static ZERO: NopVector2i;
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number);

    constructor(arr: number[]);
    mul(mul: number): NopVector2i;
    mul(mulX: number, mulY: number): NopVector2i;
  }


  interface NopVector3f extends Comparable<NopVector3f> {}
  class NopVector3f extends Comparable<NopVector3f> {
    static readonly ZERO: NopVector3f;
    static readonly ONE: NopVector3f;
    static readonly ROTATION: NopVector3f;
    readonly x: number;
    readonly y: number;
    readonly z: number;
    constructor(x: number, y: number, z: number);

    constructor(values: number[]);
    add(x: number, y: number, z: number): NopVector3f;
    add(vec: NopVector3f): NopVector3f;
    compareTo(o: NopVector3f): number;
    equals(ob: any): boolean;
    lerp(vec: NopVector3f, f: number): NopVector3f;
    modulo(vec: NopVector3f): NopVector3f;
    mul(mul: number): NopVector3f;
    normalize(): NopVector3f;
    set(x: number, y: number, z: number): NopVector3f;
    subtract(vec: NopVector3f): NopVector3f;
    toString(): string;
  }


  class NopVector3i {
    static ZERO: NopVector3i;
    readonly x: number;
    readonly y: number;
    readonly z: number;
    constructor(x: number, y: number, z: number);

    constructor(arr: number[]);
    mul(mul: number): NopVector3i;
    mul(mulX: number, mulY: number, mulZ: number): NopVector3i;
  }

}

declare module 'noppes.npcs.shared' {
  import { File } from 'java.io';

  class SharedReferences {
    static AllowFullyInvisibleSkins(): boolean;
    static VerboseDebug(): boolean;
    static dir(): File;
    static modid(): string;
  }

}

declare module 'noppes.npcs.util' {
  import { Runnable } from 'java.lang';
  import { GameProfile } from 'com.mojang.authlib';
  import { EntityNPCInterface } from 'noppes.npcs.entity';
  import { UUID } from 'java.util';
  import { CompoundTag, Tag } from 'net.minecraft.nbt';
  import { JsonFile } from 'noppes.npcs.util.NBTJsonUtil';
  import { File } from 'java.io';

  class CustomNPCsScheduler {
    static runTack(task: Runnable, delay: number): void;
    static runTack(task: Runnable): void;
    static shutDown(): void;
  }


  interface GameProfileAlt extends GameProfile {}
  class GameProfileAlt extends GameProfile {
    npc: EntityNPCInterface;
    constructor();
    get id(): UUID;
    get name(): string;
  }


  class NBTJsonUtil {
    static Convert(compound: CompoundTag): string;
    static Convert(json: string): CompoundTag;
    static FillCompound(compound: CompoundTag, json: JsonFile): void;
    static LoadFile(file: File): CompoundTag;
    static ReadValue(json: JsonFile): Tag;
    static SaveFile(file: File, compound: CompoundTag): void;
    static main(args: string[]): void;
    static quoteAndEscape(p_193588_0_: string): string;
  }


  class ValueUtil {
    static readonly EMPTY_UUID: UUID;
    static CorrectInt(given: number, min: number, max: number): number;
    static correctFloat(given: number, min: number, max: number): number;
    static isValidPath(s: string): boolean;
    static jsonToNbt(json: string): CompoundTag;
    static nbtToJson(nbt: CompoundTag): string;
  }

}

declare module 'noppes.npcs.util.NBTJsonUtil' {
  import { Exception } from 'java.lang';

  class JsonLine {
    constructor(line: string);
    increaseTab(): boolean;
    reduceTab(): boolean;
    removeComma(): void;
    toString(): string;
  }


  class JsonFile {
    constructor(text: string);
    cut(i: number): string;
    cutDirty(i: number): string;
    endsWith(s: string): boolean;
    get currentPos(): string;
    indexOf(s: string): number;
    keyIndex(): number;
    startsWith(...ss: string[]): boolean;
    substring(beginIndex: number, endIndex: number): string;
  }


  interface JsonException extends Exception {}
  class JsonException extends Exception {
    constructor(message: string, json: JsonFile);
  }

}