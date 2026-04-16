declare module 'fr.harmex.cobblebadges.common.client' {
  class CobbleBadgesClient {
    static readonly INSTANCE: CobbleBadgesClient;
    init(implementation: CobbleBadgesClientImplementation): void;
  }


  class CobbleBadgesClientImplementation {
  }

}

declare module 'fr.harmex.cobblebadges.common.client.gui.widget' {
  import { AbstractWidget, Button } from 'net.minecraft.client.gui.components';
  import { Companion } from 'fr.harmex.cobblebadges.common.client.gui.widget.BadgeWidget';
  import { PlayerBadge } from 'fr.harmex.cobblebadges.common.world.badge';
  import { SoundManager } from 'net.minecraft.client.sounds';
  import { Companion as fr_harmex_cobblebadges_common_client_gui_widget_toggleallbutton_Companion } from 'fr.harmex.cobblebadges.common.client.gui.widget.ToggleAllButton';
  import { OnPress } from 'Button';

  interface BadgeWidget extends AbstractWidget {}
  class BadgeWidget extends AbstractWidget {
    static readonly Companion: Companion;
    static readonly WIDTH: number;
    static readonly HEIGHT: number;
    constructor(x: number, y: number, badge: PlayerBadge);
    get badge(): PlayerBadge;
    isMouseOverBadge(mouseX: number, mouseY: number): boolean;
    isMouseOverButton(mouseX: number, mouseY: number): boolean;
    onClick(mouseX: number, mouseY: number): void;
    playDownSound(handler: SoundManager): void;
  }


  interface ToggleAllButton extends Button {}
  class ToggleAllButton extends Button {
    static readonly Companion: fr_harmex_cobblebadges_common_client_gui_widget_toggleallbutton_Companion;
    static readonly BUTTON_WIDTH: number;
    static readonly BUTTON_HEIGHT: number;
    static readonly TEXTURE_WIDTH: number;
    static readonly TEXTURE_HEIGHT: number;
    constructor(x: number, y: number, state: boolean, onPress: OnPress);
    get state(): boolean;
    playDownSound(handler: SoundManager): void;
  }

}

declare module 'fr.harmex.cobblebadges.common.client.gui.widget.BadgeWidget' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
  }

}

declare module 'fr.harmex.cobblebadges.common.client.gui.widget.ToggleAllButton' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get lOCATION(): ResourceLocation;
  }

}

declare module 'fr.harmex.cobblebadges.common.client.keybind' {
  import { KeyMapping } from 'net.minecraft.client';
  import { Type } from 'InputConstants';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Function1 } from 'kotlin.jvm.functions';
  import { Unit } from 'kotlin';

  interface CobbleBadgesKeyBinding extends KeyMapping {}
  class CobbleBadgesKeyBinding extends KeyMapping {
    constructor(name: string, type: Type, key: number, category: string);

    constructor(string: string, type: Type, n: number, string2: string, n2: number, defaultConstructorMarker: DefaultConstructorMarker);
    onPress(): void;
    onTick(): void;
  }


  class CobbleBadgesKeyBinds {
    static readonly INSTANCE: CobbleBadgesKeyBinds;
    get bADGE_CASE(): KeyMapping;
    register(registrar: Function1<KeyMapping, Unit>): void;
  }

}

declare module 'fr.harmex.cobblebadges.common.client.keybind.keybinds' {
  import { CobbleBadgesKeyBinding } from 'fr.harmex.cobblebadges.common.client.keybind';

  interface BadgeCaseBinding extends CobbleBadgesKeyBinding {}
  class BadgeCaseBinding extends CobbleBadgesKeyBinding {
    static readonly INSTANCE: BadgeCaseBinding;
    onPress(): void;
  }

}

declare module 'fr.harmex.cobblebadges.common.client.utils' {
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { PlayerBadge } from 'fr.harmex.cobblebadges.common.world.badge';

  class GuiUtilsKt {
    static renderBadge($this$renderBadge: GuiGraphics, x: number, y: number, badge: PlayerBadge): void;
  }

}

declare module 'fr.harmex.cobblebadges.common' {
  import { NetworkManager } from 'com.cobblemon.mod.common';
  import { Registry } from 'net.minecraft.core';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { KClass } from 'kotlin.reflect';
  import { ArgumentTypeInfo } from 'net.minecraft.commands.synchronization';
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { Template } from 'ArgumentTypeInfo';
  import { Key, Category, Type, Value } from 'GameRules';

  class CobbleBadgesImplementation {
    createRegistry<T>(var1: ResourceKey<Registry<T>>): Registry<T>;
    get networkManager(): NetworkManager;
    registerBadges(): void;
    registerCommandArgument<A extends ArgumentType<any>, T extends Template<A>>(var1: ResourceLocation, var2: KClass<A>, var3: ArgumentTypeInfo<A, T>): void;
    registerEntityDataSerializer(): void;
    registerGameRule<T extends Value<T>>(var1: string, var2: Category, var3: Type<T>): Key<T>;
    registerItems(): void;
    registerMobEffects(): void;
  }

}

declare module 'fr.harmex.cobblebadges.common.command' {
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack, CommandBuildContext } from 'net.minecraft.commands';
  import { CommandSelection } from 'Commands';

  class CobbleBadgesCommand {
    static readonly INSTANCE: CobbleBadgesCommand;
    register(dispatcher: CommandDispatcher<CommandSourceStack>, buildContext: CommandBuildContext): void;
  }


  class CobbleBadgesCommands {
    static readonly INSTANCE: CobbleBadgesCommands;
    register(dispatcher: CommandDispatcher<CommandSourceStack>, buildContext: CommandBuildContext, commandSelection: CommandSelection): void;
  }

}

declare module 'fr.harmex.cobblebadges.common.config' {
  import { Companion } from 'fr.harmex.cobblebadges.common.config.CommonConfig';

  class CommonConfig {
    static readonly Companion: Companion;
    static readonly PATH: string;
    get amountOfPointsForEachTier(): number;
    get enablePointsEarning(): boolean;
    set amountOfPointsForEachTier(n: number);
    set enablePointsEarning(bl: boolean);
  }

}

declare module 'fr.harmex.cobblebadges.common.config.CommonConfig' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Gson } from 'com.google.gson';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get gSON(): Gson;
    load(): void;
    save(): void;
  }

}

declare module 'fr.harmex.cobblebadges.common.core.registries' {
  import { Registry } from 'net.minecraft.core';
  import { Badge } from 'fr.harmex.cobblebadges.common.world.badge';

  class CobbleBadgesRegistries {
    static readonly INSTANCE: CobbleBadgesRegistries;
    static BADGE: Registry;
    get bADGE(): Registry<Badge>;
    set bADGE(registry: Registry<Badge>);
  }

}

declare module 'fr.harmex.cobblebadges.common.core.registries.CobbleBadgesRegistries' {
  import { ResourceKey } from 'net.minecraft.resources';
  import { Registry } from 'net.minecraft.core';
  import { Badge } from 'fr.harmex.cobblebadges.common.world.badge';

  class Keys {
    static readonly INSTANCE: Keys;
    get bADGE(): ResourceKey<Registry<Badge>>;
  }

}

declare module 'fr.harmex.cobblebadges.common.network' {
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { NetworkPacket } from 'com.cobblemon.mod.common.api.net';
  import { Iterable } from 'java.lang';
  import { List } from 'java.util';
  import { PacketRegisterInfo } from 'com.cobblemon.mod.common.net';
  import { ToggleBadgePacket } from 'fr.harmex.cobblebadges.common.network.packet.c2s';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class CobbleBadgesNetwork {
    static readonly INSTANCE: CobbleBadgesNetwork;
    get c2sPayloads(): PacketRegisterInfo<any>[];
    get s2cPayloads(): PacketRegisterInfo<any>[];
    invoke(p0: RegistryFriendlyByteBuf): ToggleBadgePacket;
    sendPacket($this$sendPacket: ServerPlayer, packet: NetworkPacket<any>): void;
    sendPacketToPlayer(player: ServerPlayer, packet: NetworkPacket<any>): void;
    sendPacketToPlayers(players: Iterable<ServerPlayer>, packet: NetworkPacket<any>): void;
    sendToAllPlayers(packet: NetworkPacket<any>): void;
    sendToServer(packet: NetworkPacket<any>): void;
  }

}

declare module 'fr.harmex.cobblebadges.common.network.handlers' {
  import { ServerNetworkPacketHandler } from 'com.cobblemon.mod.common.api.net';
  import { ToggleBadgePacket } from 'fr.harmex.cobblebadges.common.network.packet.c2s';
  import { MinecraftServer } from 'net.minecraft.server';
  import { ServerPlayer } from 'net.minecraft.server.level';

  interface ToggleBadgeHandler extends ServerNetworkPacketHandler<ToggleBadgePacket> {}
  class ToggleBadgeHandler extends ServerNetworkPacketHandler<ToggleBadgePacket> {
    static readonly INSTANCE: ToggleBadgeHandler;
    handle(packet: ToggleBadgePacket, server: MinecraftServer, player: ServerPlayer): void;
  }

}

declare module 'fr.harmex.cobblebadges.common.network.packet.c2s' {
  import { NetworkPacket } from 'com.cobblemon.mod.common.api.net';
  import { Companion } from 'fr.harmex.cobblebadges.common.network.packet.c2s.ToggleBadgePacket';
  import { PlayerBadge } from 'fr.harmex.cobblebadges.common.world.badge';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Iterable, Boolean } from 'java.lang';
  import { Level } from 'net.minecraft.world.level';
  import { Function1 } from 'kotlin.jvm.functions';
  import { Type } from 'CustomPacketPayload';

  interface ToggleBadgePacket extends NetworkPacket<ToggleBadgePacket> {}
  class ToggleBadgePacket extends NetworkPacket<ToggleBadgePacket> {
    static readonly Companion: Companion;
    constructor(badge: PlayerBadge, state: boolean);
    encode(buffer: RegistryFriendlyByteBuf): void;
    get badge(): PlayerBadge;
    get id(): ResourceLocation;
    get state(): boolean;
    sendToAllPlayers(): void;
    sendToPlayer(player: ServerPlayer): void;
    sendToPlayers(players: Iterable<ServerPlayer>): void;
    sendToPlayersAround(x: number, y: number, z: number, distance: number, worldKey: ResourceKey<Level>, exclusionCondition: Function1<ServerPlayer, boolean>): void;
    sendToServer(): void;
    type(): Type<ToggleBadgePacket>;
  }

}

declare module 'fr.harmex.cobblebadges.common.network.packet.c2s.ToggleBadgePacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ToggleBadgePacket } from 'fr.harmex.cobblebadges.common.network.packet.c2s';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): ToggleBadgePacket;
    get iD(): ResourceLocation;
  }

}

declare module 'fr.harmex.cobblebadges.common.network.serializer' {
  import { EntityDataSerializer } from 'net.minecraft.network.syncher';
  import { BadgeManager } from 'fr.harmex.cobblebadges.common.world.entity.player';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { FriendlyByteBuf, RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { StreamCodec } from 'net.minecraft.network.codec';

  interface BadgeManagerEntityDataSerializer extends EntityDataSerializer<BadgeManager> {}
  class BadgeManagerEntityDataSerializer extends EntityDataSerializer<BadgeManager> {
    static readonly INSTANCE: BadgeManagerEntityDataSerializer;
    codec(): StreamCodec<RegistryFriendlyByteBuf, BadgeManager>;
    copy(value: BadgeManager): BadgeManager;
    get iD(): ResourceLocation;
    read(buf: FriendlyByteBuf): BadgeManager;
    write(buf: FriendlyByteBuf, badgeManager: BadgeManager): FriendlyByteBuf;
  }

}

declare module 'fr.harmex.cobblebadges.common.utils' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { Badge, ElementalTypePoint } from 'fr.harmex.cobblebadges.common.world.badge';
  import { ElementalType } from 'com.cobblemon.mod.common.api.types';
  import { Holder } from 'net.minecraft.core';
  import { MobEffect } from 'net.minecraft.world.effect';

  class CobbleBadgesData {
    static readonly INSTANCE: CobbleBadgesData;
  }


  class MiscUtilsKt {
    static asHolder($this$asHolder: MobEffect): Holder<MobEffect>;
    static cobbleBadgesBadge(...objects: any[]): MutableComponent;
    static cobbleBadgesChat(name: string, ...objects: any[]): MutableComponent;
    static cobbleBadgesCommand(name: string, ...objects: any[]): MutableComponent;
    static cobbleBadgesLang(key: string, name: string, ...objects: any[]): MutableComponent;
    static cobbleBadgesPoint(name: string, ...objects: any[]): MutableComponent;
    static cobbleBadgesResource(path: string): ResourceLocation;
    static cobbleBadgesTier(tier: number): MutableComponent;
    static getBadge($this$badge: ElementalType): Badge;
    static getBadgePoint($this$badgePoint: ElementalType): ElementalTypePoint;
    static lineStart(): MutableComponent;
  }

}

declare module 'fr.harmex.cobblebadges.common.utils.extensions' {
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { BadgeManager } from 'fr.harmex.cobblebadges.common.world.entity.player';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Badge, Point } from 'fr.harmex.cobblebadges.common.world.badge';

  class ComponentExtensionKt {
    static prepend($this$prepend: MutableComponent, component: MutableComponent): MutableComponent;
    static withColor($this$withColor: string, color: number): MutableComponent;
  }


  class PlayerExtensionKt {
    static activateBadge($this$activateBadge: Player, badge: Badge, state: boolean): void;
    static addBadgeTier($this$addBadgeTier: Player, badge: Badge): void;
    static addPoints($this$addPoints: Player, point: Point, amount: number): void;
    static addPoints$default(player: Player, point: Point, n: number, n2: number, object: any): void;
    static broadcastBadgeEarning($this$broadcastBadgeEarning: Player, badge: Badge): void;
    static checkBadgeTier($this$checkBadgeTier: Player, badge: Badge): void;
    static earnPoint($this$earnPoint: Player, point: Point, badge: Badge, amount: number): void;
    static earnPoint$default(player: Player, point: Point, badge: Badge, n: number, n2: number, object: any): void;
    static getBadgeManager($this$badgeManager: Player): BadgeManager;
    static getBadgeTier($this$getBadgeTier: Player, badge: Badge): number;
    static getPoints($this$getPoints: Player, point: Point): number;
    static getTotalPoints($this$getTotalPoints: Player): number;
    static sendPointEarnMessage($this$sendPointEarnMessage: Player, point: Point, amount: number): void;
    static sendPointEarnMessage$default(player: Player, point: Point, n: number, n2: number, object: any): void;
    static setBadgeManager($this$badgeManager: Player, value: BadgeManager): void;
    static setBadgeTier($this$setBadgeTier: Player, badge: Badge, tier: number): void;
    static setPoints($this$setPoints: Player, point: Point, amount: number): void;
    static subBadgeTier($this$subBadgeTier: Player, badge: Badge): void;
    static updateBadgeEffects($this$updateBadgeEffects: Player): void;
  }

}

declare module 'fr.harmex.cobblebadges.common.world.badge' {
  import { List, Map, Set } from 'java.util';
  import { BadgeAttributeInfo } from 'fr.harmex.cobblebadges.common.world.badge.AttributeBadge';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { LivingEntity, EntityType } from 'net.minecraft.world.entity';
  import { PlatformRegistry } from 'com.cobblemon.mod.common.platform';
  import { Registry, Holder } from 'net.minecraft.core';
  import { ResourceKey } from 'net.minecraft.resources';
  import { NormalBadge, FireBadge, WaterBadge, GrassBadge, ElectricBadge, IceBadge, FightingBadge, PoisonBadge, GroundBadge, FlyingBadge, PsychicBadge, BugBadge, RockBadge, GhostBadge, DragonBadge, DarkBadge, SteelBadge, FairyBadge, CaptureBadge } from 'fr.harmex.cobblebadges.common.world.badge.badges';
  import { ElementalType } from 'com.cobblemon.mod.common.api.types';
  import { Integer } from 'java.lang';
  import { MobEffectInstance, MobEffect } from 'net.minecraft.world.effect';

  interface AttributeBadge extends Badge {}
  class AttributeBadge extends Badge {
    get attributeInfos(): BadgeAttributeInfo[];
    getAttributesTooltip(var1: number): Component[];
    updateAttributes(var1: Player, var2: number, var3: boolean): void;
  }


  class Badge {
    canTierDown(var1: Player): boolean;
    canTierUp(var1: Player): boolean;
    get color(): number;
    get descriptionId(): string;
    get displayName(): MutableComponent;
    get hoverName(): MutableComponent;
    get maxTier(): number;
    get name(): MutableComponent;
    get pointsToTierUp(): Point[];
    getCustomEffectTooltip(var1: number): Component[];
    onPlayerAttackLivingEntity(var1: Player, var2: LivingEntity, var3: number, var4: boolean): void;
    tick(var1: Player): void;
  }


  interface Badges extends PlatformRegistry<Registry, ResourceKey, Badge> {}
  class Badges extends PlatformRegistry<Registry, ResourceKey, Badge> {
    static readonly INSTANCE: Badges;
    static readonly NORMAL: NormalBadge;
    static readonly FIRE: FireBadge;
    static readonly WATER: WaterBadge;
    static readonly GRASS: GrassBadge;
    static readonly ELECTRIC: ElectricBadge;
    static readonly ICE: IceBadge;
    static readonly FIGHTING: FightingBadge;
    static readonly POISON: PoisonBadge;
    static readonly GROUND: GroundBadge;
    static readonly FLYING: FlyingBadge;
    static readonly PSYCHIC: PsychicBadge;
    static readonly BUG: BugBadge;
    static readonly ROCK: RockBadge;
    static readonly GHOST: GhostBadge;
    static readonly DRAGON: DragonBadge;
    static readonly DARK: DarkBadge;
    static readonly STEEL: SteelBadge;
    static readonly FAIRY: FairyBadge;
    static readonly CAPTURE: CaptureBadge;
    get badgeFromElementalType(): Map<ElementalType, ElementalTypeBadge>;
    get elementalTypesWithBadge(): Set<ElementalType>;
    get entityTypesWithBadge(): Set<EntityType<any>>;
    get registry(): Registry<Badge>;
    get resourceKey(): ResourceKey<Registry<Badge>>;
    getByElementalType(elementalType: ElementalType): ElementalTypeBadge;
    getByPoint(point: Point): Badge;
  }


  interface ElementalTypeBadge extends Badge {}
  class ElementalTypeBadge extends Badge {
    get elementalType(): ElementalType;
    get name(): MutableComponent;
    get pointsToTierUp(): Point[];
  }


  interface ElementalTypePoint extends Point {}
  class ElementalTypePoint extends Point {
    constructor(elementalType: ElementalType);
    get elementalType(): ElementalType;
    get hoverName(): MutableComponent;
  }


  interface MobEffectBadge extends Badge {}
  class MobEffectBadge extends Badge {
    applyEffects(var1: Player, var2: number, var3: boolean): void;
    get mobEffects(): Map<number, MobEffectInstance[]>;
    getMobEffectsTooltip(var1: number): Component[];
  }


  interface MobEffectImmuneBadge extends Badge {}
  class MobEffectImmuneBadge extends Badge {
    get mobEffectImmunities(): Map<number, Holder<MobEffect>[]>;
    getMobEffectsImmunityTooltip(var1: number): Component[];
    tick(var1: Player, var2: number, var3: boolean): void;
    tick(var1: Player): void;
  }


  class Point {
    constructor(name: string, color: number);
    get color(): number;
    get hoverName(): MutableComponent;
    get name(): string;
  }


  class Points {
    static readonly INSTANCE: Points;
    get(name: string): Point;
    get allPoints(): Point[];
    get bUG(): Point;
    get cAPTURE(): Point;
    get dARK(): Point;
    get dRAGON(): Point;
    get eLECTRIC(): Point;
    get elementalTypePoints(): ElementalTypePoint[];
    get fAIRY(): Point;
    get fIGHTING(): Point;
    get fIRE(): Point;
    get fLYING(): Point;
    get gHOST(): Point;
    get gRASS(): Point;
    get gROUND(): Point;
    get iCE(): Point;
    get nORMAL(): Point;
    get pOISON(): Point;
    get pSYCHIC(): Point;
    get rOCK(): Point;
    get sHINY(): Point;
    get sTEEL(): Point;
    get wATER(): Point;
    getOrNull(name: string): Point;
    register(point: Point): Point;
  }

}

declare module 'fr.harmex.cobblebadges.common.world.badge.AttributeBadge' {
  import { Holder } from 'net.minecraft.core';
  import { Attribute, AttributeModifier } from 'net.minecraft.world.entity.ai.attributes';
  import { Operation } from 'AttributeModifier';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Badge, AttributeBadge } from 'fr.harmex.cobblebadges.common.world.badge';
  import { Player } from 'net.minecraft.world.entity.player';
  import { List } from 'java.util';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { LivingEntity } from 'net.minecraft.world.entity';

  class BadgeAttributeInfo {
    constructor(attribute: Holder<Attribute>, operation: Operation, normalValue: number, greatValue: number, ultraValue: number, masterValue: number);
    component1(): Holder<Attribute>;
    component2(): Operation;
    component3(): number;
    component4(): number;
    component5(): number;
    component6(): number;
    copy(attribute: Holder<Attribute>, operation: Operation, normalValue: number, greatValue: number, ultraValue: number, masterValue: number): BadgeAttributeInfo;
    static copy$default(badgeAttributeInfo: BadgeAttributeInfo, holder: Holder, operation: Operation, d: number, d2: number, d3: number, d4: number, n: number, object: any): BadgeAttributeInfo;
    equals(other: any): boolean;
    get attribute(): Holder<Attribute>;
    get greatValue(): number;
    get masterValue(): number;
    get normalValue(): number;
    get operation(): Operation;
    get ultraValue(): number;
    getGreatModifier(badge: Badge): AttributeModifier;
    getMasterModifier(badge: Badge): AttributeModifier;
    getModifierByTier(badge: Badge, tier: number): AttributeModifier;
    getModifierId(badge: Badge): ResourceLocation;
    getNormalModifier(badge: Badge): AttributeModifier;
    getUltraModifier(badge: Badge): AttributeModifier;
    hashCode(): number;
    toString(): string;
  }


  class DefaultImpls {
    static canTierDown($this: AttributeBadge, player: Player): boolean;
    static canTierUp($this: AttributeBadge, player: Player): boolean;
    static getAttributesTooltip($this: AttributeBadge, tier: number): Component[];
    static getCustomEffectTooltip($this: AttributeBadge, tier: number): Component[];
    static getDescriptionId($this: AttributeBadge): string;
    static getDisplayName($this: AttributeBadge): MutableComponent;
    static getHoverName($this: AttributeBadge): MutableComponent;
    static getMaxTier($this: AttributeBadge): number;
    static getName($this: AttributeBadge): MutableComponent;
    static onPlayerAttackLivingEntity($this: AttributeBadge, player: Player, livingEntity: LivingEntity, tier: number, isBadgeActive: boolean): void;
    static tick($this: AttributeBadge, player: Player): void;
    static updateAttributes($this: AttributeBadge, player: Player, tier: number, isActive: boolean): void;
    static updateAttributes$default(attributeBadge: AttributeBadge, player: Player, n: number, bl: boolean, n2: number, object: any): void;
  }

}

declare module 'fr.harmex.cobblebadges.common.world.badge.Badge' {
  import { Badge } from 'fr.harmex.cobblebadges.common.world.badge';
  import { MutableComponent, Component } from 'net.minecraft.network.chat';
  import { Player } from 'net.minecraft.world.entity.player';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { List } from 'java.util';

  class DefaultImpls {
    static canTierDown($this: Badge, player: Player): boolean;
    static canTierUp($this: Badge, player: Player): boolean;
    static getCustomEffectTooltip($this: Badge, tier: number): Component[];
    static getDescriptionId($this: Badge): string;
    static getDisplayName($this: Badge): MutableComponent;
    static getHoverName($this: Badge): MutableComponent;
    static getMaxTier($this: Badge): number;
    static getName($this: Badge): MutableComponent;
    static onPlayerAttackLivingEntity($this: Badge, player: Player, livingEntity: LivingEntity, tier: number, isBadgeActive: boolean): void;
    static tick($this: Badge, player: Player): void;
  }

}

declare module 'fr.harmex.cobblebadges.common.world.badge.badges' {
  import { ElementalTypeBadge, AttributeBadge, MobEffectImmuneBadge, Point, Badge, MobEffectBadge } from 'fr.harmex.cobblebadges.common.world.badge';
  import { ElementalType } from 'com.cobblemon.mod.common.api.types';
  import { List, Map } from 'java.util';
  import { BadgeAttributeInfo } from 'fr.harmex.cobblebadges.common.world.badge.AttributeBadge';
  import { Integer } from 'java.lang';
  import { Holder } from 'net.minecraft.core';
  import { MobEffect, MobEffectInstance } from 'net.minecraft.world.effect';
  import { Player } from 'net.minecraft.world.entity.player';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';

  interface BugBadge extends ElementalTypeBadge, AttributeBadge, MobEffectImmuneBadge {}
  class BugBadge extends ElementalTypeBadge {
    canTierDown(player: Player): boolean;
    canTierUp(player: Player): boolean;
    get attributeInfos(): BadgeAttributeInfo[];
    get color(): number;
    get descriptionId(): string;
    get displayName(): MutableComponent;
    get elementalType(): ElementalType;
    get hoverName(): MutableComponent;
    get maxTier(): number;
    get mobEffectImmunities(): Map<number, Holder<MobEffect>[]>;
    get name(): MutableComponent;
    get pointsToTierUp(): Point[];
    getAttributesTooltip(tier: number): Component[];
    getCustomEffectTooltip(tier: number): Component[];
    getMobEffectsImmunityTooltip(badgeTier: number): Component[];
    onPlayerAttackLivingEntity(player: Player, livingEntity: LivingEntity, tier: number, isBadgeActive: boolean): void;
    tick(player: Player): void;
    tick(player: Player, tier: number, isBadgeActive: boolean): void;
    updateAttributes(player: Player, tier: number, isActive: boolean): void;
  }


  interface CaptureBadge extends Badge {}
  class CaptureBadge extends Badge {
    constructor();
    canTierDown(player: Player): boolean;
    canTierUp(player: Player): boolean;
    get color(): number;
    get descriptionId(): string;
    get displayName(): MutableComponent;
    get hoverName(): MutableComponent;
    get maxTier(): number;
    get name(): MutableComponent;
    get pointsToTierUp(): Point[];
    getCustomEffectTooltip(tier: number): Component[];
    onPlayerAttackLivingEntity(player: Player, livingEntity: LivingEntity, tier: number, isBadgeActive: boolean): void;
    tick(player: Player): void;
  }


  interface DarkBadge extends ElementalTypeBadge, AttributeBadge, MobEffectBadge, MobEffectImmuneBadge {}
  class DarkBadge extends ElementalTypeBadge {
    applyEffects(player: Player, tier: number, isBadgeActive: boolean): void;
    canTierDown(player: Player): boolean;
    canTierUp(player: Player): boolean;
    get attributeInfos(): BadgeAttributeInfo[];
    get color(): number;
    get descriptionId(): string;
    get displayName(): MutableComponent;
    get elementalType(): ElementalType;
    get hoverName(): MutableComponent;
    get maxTier(): number;
    get mobEffectImmunities(): Map<number, Holder<MobEffect>[]>;
    get mobEffects(): Map<number, MobEffectInstance[]>;
    get name(): MutableComponent;
    get pointsToTierUp(): Point[];
    getAttributesTooltip(tier: number): Component[];
    getCustomEffectTooltip(tier: number): Component[];
    getMobEffectsImmunityTooltip(badgeTier: number): Component[];
    getMobEffectsTooltip(tier: number): Component[];
    onPlayerAttackLivingEntity(player: Player, livingEntity: LivingEntity, tier: number, isBadgeActive: boolean): void;
    tick(player: Player): void;
    tick(player: Player, tier: number, isBadgeActive: boolean): void;
    updateAttributes(player: Player, tier: number, isActive: boolean): void;
  }


  interface DragonBadge extends ElementalTypeBadge, AttributeBadge {}
  class DragonBadge extends ElementalTypeBadge {
    canTierDown(player: Player): boolean;
    canTierUp(player: Player): boolean;
    get attributeInfos(): BadgeAttributeInfo[];
    get color(): number;
    get descriptionId(): string;
    get displayName(): MutableComponent;
    get elementalType(): ElementalType;
    get hoverName(): MutableComponent;
    get maxTier(): number;
    get name(): MutableComponent;
    get pointsToTierUp(): Point[];
    getAttributesTooltip(tier: number): Component[];
    getCustomEffectTooltip(tier: number): Component[];
    onPlayerAttackLivingEntity(player: Player, livingEntity: LivingEntity, tier: number, isBadgeActive: boolean): void;
    tick(player: Player): void;
    updateAttributes(player: Player, tier: number, isActive: boolean): void;
  }


  interface ElectricBadge extends ElementalTypeBadge, AttributeBadge {}
  class ElectricBadge extends ElementalTypeBadge {
    canTierDown(player: Player): boolean;
    canTierUp(player: Player): boolean;
    get attributeInfos(): BadgeAttributeInfo[];
    get color(): number;
    get descriptionId(): string;
    get displayName(): MutableComponent;
    get elementalType(): ElementalType;
    get hoverName(): MutableComponent;
    get maxTier(): number;
    get name(): MutableComponent;
    get pointsToTierUp(): Point[];
    getAttributesTooltip(tier: number): Component[];
    getCustomEffectTooltip(tier: number): Component[];
    onPlayerAttackLivingEntity(player: Player, livingEntity: LivingEntity, tier: number, isBadgeActive: boolean): void;
    tick(player: Player): void;
    updateAttributes(player: Player, tier: number, isActive: boolean): void;
  }


  interface FairyBadge extends ElementalTypeBadge, AttributeBadge {}
  class FairyBadge extends ElementalTypeBadge {
    canTierDown(player: Player): boolean;
    canTierUp(player: Player): boolean;
    get attributeInfos(): BadgeAttributeInfo[];
    get color(): number;
    get descriptionId(): string;
    get displayName(): MutableComponent;
    get elementalType(): ElementalType;
    get hoverName(): MutableComponent;
    get maxTier(): number;
    get name(): MutableComponent;
    get pointsToTierUp(): Point[];
    getAttributesTooltip(tier: number): Component[];
    getCustomEffectTooltip(tier: number): Component[];
    onPlayerAttackLivingEntity(player: Player, livingEntity: LivingEntity, tier: number, isBadgeActive: boolean): void;
    tick(player: Player): void;
    updateAttributes(player: Player, tier: number, isActive: boolean): void;
  }


  interface FightingBadge extends ElementalTypeBadge, AttributeBadge {}
  class FightingBadge extends ElementalTypeBadge {
    canTierDown(player: Player): boolean;
    canTierUp(player: Player): boolean;
    get attributeInfos(): BadgeAttributeInfo[];
    get color(): number;
    get descriptionId(): string;
    get displayName(): MutableComponent;
    get elementalType(): ElementalType;
    get hoverName(): MutableComponent;
    get maxTier(): number;
    get name(): MutableComponent;
    get pointsToTierUp(): Point[];
    getAttributesTooltip(tier: number): Component[];
    getCustomEffectTooltip(tier: number): Component[];
    onPlayerAttackLivingEntity(player: Player, livingEntity: LivingEntity, tier: number, isBadgeActive: boolean): void;
    tick(player: Player): void;
    updateAttributes(player: Player, tier: number, isActive: boolean): void;
  }


  interface FireBadge extends ElementalTypeBadge, AttributeBadge, MobEffectBadge {}
  class FireBadge extends ElementalTypeBadge {
    applyEffects(player: Player, tier: number, isBadgeActive: boolean): void;
    canTierDown(player: Player): boolean;
    canTierUp(player: Player): boolean;
    get attributeInfos(): BadgeAttributeInfo[];
    get color(): number;
    get descriptionId(): string;
    get displayName(): MutableComponent;
    get elementalType(): ElementalType;
    get hoverName(): MutableComponent;
    get maxTier(): number;
    get mobEffects(): Map<number, MobEffectInstance[]>;
    get name(): MutableComponent;
    get pointsToTierUp(): Point[];
    getAttributesTooltip(tier: number): Component[];
    getCustomEffectTooltip(tier: number): Component[];
    getMobEffectsTooltip(tier: number): Component[];
    onPlayerAttackLivingEntity(player: Player, livingEntity: LivingEntity, tier: number, isBadgeActive: boolean): void;
    tick(player: Player): void;
    updateAttributes(player: Player, tier: number, isActive: boolean): void;
  }


  interface FlyingBadge extends ElementalTypeBadge, AttributeBadge {}
  class FlyingBadge extends ElementalTypeBadge {
    canTierDown(player: Player): boolean;
    canTierUp(player: Player): boolean;
    get attributeInfos(): BadgeAttributeInfo[];
    get color(): number;
    get descriptionId(): string;
    get displayName(): MutableComponent;
    get elementalType(): ElementalType;
    get hoverName(): MutableComponent;
    get maxTier(): number;
    get name(): MutableComponent;
    get pointsToTierUp(): Point[];
    getAttributesTooltip(tier: number): Component[];
    getCustomEffectTooltip(tier: number): Component[];
    onPlayerAttackLivingEntity(player: Player, livingEntity: LivingEntity, tier: number, isBadgeActive: boolean): void;
    tick(player: Player): void;
    updateAttributes(player: Player, tier: number, isActive: boolean): void;
  }


  interface GhostBadge extends ElementalTypeBadge, AttributeBadge {}
  class GhostBadge extends ElementalTypeBadge {
    canTierDown(player: Player): boolean;
    canTierUp(player: Player): boolean;
    get attributeInfos(): BadgeAttributeInfo[];
    get color(): number;
    get descriptionId(): string;
    get displayName(): MutableComponent;
    get elementalType(): ElementalType;
    get hoverName(): MutableComponent;
    get maxTier(): number;
    get name(): MutableComponent;
    get pointsToTierUp(): Point[];
    getAttributesTooltip(tier: number): Component[];
    getCustomEffectTooltip(tier: number): Component[];
    onPlayerAttackLivingEntity(player: Player, livingEntity: LivingEntity, tier: number, isBadgeActive: boolean): void;
    tick(player: Player): void;
    updateAttributes(player: Player, tier: number, isActive: boolean): void;
  }


  interface GrassBadge extends ElementalTypeBadge, AttributeBadge {}
  class GrassBadge extends ElementalTypeBadge {
    canTierDown(player: Player): boolean;
    canTierUp(player: Player): boolean;
    get attributeInfos(): BadgeAttributeInfo[];
    get color(): number;
    get descriptionId(): string;
    get displayName(): MutableComponent;
    get elementalType(): ElementalType;
    get hoverName(): MutableComponent;
    get maxTier(): number;
    get name(): MutableComponent;
    get pointsToTierUp(): Point[];
    getAttributesTooltip(tier: number): Component[];
    getCustomEffectTooltip(tier: number): Component[];
    onPlayerAttackLivingEntity(player: Player, livingEntity: LivingEntity, tier: number, isBadgeActive: boolean): void;
    tick(player: Player): void;
    updateAttributes(player: Player, tier: number, isActive: boolean): void;
  }


  interface GroundBadge extends ElementalTypeBadge, AttributeBadge {}
  class GroundBadge extends ElementalTypeBadge {
    canTierDown(player: Player): boolean;
    canTierUp(player: Player): boolean;
    get attributeInfos(): BadgeAttributeInfo[];
    get color(): number;
    get descriptionId(): string;
    get displayName(): MutableComponent;
    get elementalType(): ElementalType;
    get hoverName(): MutableComponent;
    get maxTier(): number;
    get name(): MutableComponent;
    get pointsToTierUp(): Point[];
    getAttributesTooltip(tier: number): Component[];
    getCustomEffectTooltip(tier: number): Component[];
    onPlayerAttackLivingEntity(player: Player, livingEntity: LivingEntity, tier: number, isBadgeActive: boolean): void;
    tick(player: Player): void;
    updateAttributes(player: Player, tier: number, isActive: boolean): void;
  }


  interface IceBadge extends ElementalTypeBadge {}
  class IceBadge extends ElementalTypeBadge {
    canTierDown(player: Player): boolean;
    canTierUp(player: Player): boolean;
    get color(): number;
    get descriptionId(): string;
    get displayName(): MutableComponent;
    get elementalType(): ElementalType;
    get hoverName(): MutableComponent;
    get maxTier(): number;
    get name(): MutableComponent;
    get pointsToTierUp(): Point[];
    getCustomEffectTooltip(tier: number): Component[];
    onPlayerAttackLivingEntity(player: Player, livingEntity: LivingEntity, tier: number, isBadgeActive: boolean): void;
    tick(player: Player): void;
  }


  interface NormalBadge extends ElementalTypeBadge {}
  class NormalBadge extends ElementalTypeBadge {
    canTierDown(player: Player): boolean;
    canTierUp(player: Player): boolean;
    get color(): number;
    get descriptionId(): string;
    get displayName(): MutableComponent;
    get elementalType(): ElementalType;
    get hoverName(): MutableComponent;
    get maxTier(): number;
    get name(): MutableComponent;
    get pointsToTierUp(): Point[];
    getCustomEffectTooltip(tier: number): Component[];
    onPlayerAttackLivingEntity(player: Player, livingEntity: LivingEntity, tier: number, isBadgeActive: boolean): void;
    tick(player: Player): void;
  }


  interface PoisonBadge extends ElementalTypeBadge, MobEffectImmuneBadge {}
  class PoisonBadge extends ElementalTypeBadge {
    canTierDown(player: Player): boolean;
    canTierUp(player: Player): boolean;
    get color(): number;
    get descriptionId(): string;
    get displayName(): MutableComponent;
    get elementalType(): ElementalType;
    get hoverName(): MutableComponent;
    get maxTier(): number;
    get mobEffectImmunities(): Map<number, Holder<MobEffect>[]>;
    get name(): MutableComponent;
    get pointsToTierUp(): Point[];
    getCustomEffectTooltip(tier: number): Component[];
    getMobEffectsImmunityTooltip(badgeTier: number): Component[];
    onPlayerAttackLivingEntity(player: Player, livingEntity: LivingEntity, tier: number, isBadgeActive: boolean): void;
    tick(player: Player): void;
    tick(player: Player, tier: number, isBadgeActive: boolean): void;
  }


  interface PsychicBadge extends ElementalTypeBadge, AttributeBadge {}
  class PsychicBadge extends ElementalTypeBadge {
    canTierDown(player: Player): boolean;
    canTierUp(player: Player): boolean;
    get attributeInfos(): BadgeAttributeInfo[];
    get color(): number;
    get descriptionId(): string;
    get displayName(): MutableComponent;
    get elementalType(): ElementalType;
    get hoverName(): MutableComponent;
    get maxTier(): number;
    get name(): MutableComponent;
    get pointsToTierUp(): Point[];
    getAttributesTooltip(tier: number): Component[];
    getCustomEffectTooltip(tier: number): Component[];
    onPlayerAttackLivingEntity(player: Player, livingEntity: LivingEntity, tier: number, isBadgeActive: boolean): void;
    tick(player: Player): void;
    updateAttributes(player: Player, tier: number, isActive: boolean): void;
  }


  interface RockBadge extends ElementalTypeBadge, AttributeBadge {}
  class RockBadge extends ElementalTypeBadge {
    canTierDown(player: Player): boolean;
    canTierUp(player: Player): boolean;
    get attributeInfos(): BadgeAttributeInfo[];
    get color(): number;
    get descriptionId(): string;
    get displayName(): MutableComponent;
    get elementalType(): ElementalType;
    get hoverName(): MutableComponent;
    get maxTier(): number;
    get name(): MutableComponent;
    get pointsToTierUp(): Point[];
    getAttributesTooltip(tier: number): Component[];
    getCustomEffectTooltip(tier: number): Component[];
    onPlayerAttackLivingEntity(player: Player, livingEntity: LivingEntity, tier: number, isBadgeActive: boolean): void;
    tick(player: Player): void;
    updateAttributes(player: Player, tier: number, isActive: boolean): void;
  }


  interface SteelBadge extends ElementalTypeBadge, AttributeBadge {}
  class SteelBadge extends ElementalTypeBadge {
    canTierDown(player: Player): boolean;
    canTierUp(player: Player): boolean;
    get attributeInfos(): BadgeAttributeInfo[];
    get color(): number;
    get descriptionId(): string;
    get displayName(): MutableComponent;
    get elementalType(): ElementalType;
    get hoverName(): MutableComponent;
    get maxTier(): number;
    get name(): MutableComponent;
    get pointsToTierUp(): Point[];
    getAttributesTooltip(tier: number): Component[];
    getCustomEffectTooltip(tier: number): Component[];
    onPlayerAttackLivingEntity(player: Player, livingEntity: LivingEntity, tier: number, isBadgeActive: boolean): void;
    tick(player: Player): void;
    updateAttributes(player: Player, tier: number, isActive: boolean): void;
  }


  interface WaterBadge extends ElementalTypeBadge, AttributeBadge {}
  class WaterBadge extends ElementalTypeBadge {
    canTierDown(player: Player): boolean;
    canTierUp(player: Player): boolean;
    get attributeInfos(): BadgeAttributeInfo[];
    get color(): number;
    get descriptionId(): string;
    get displayName(): MutableComponent;
    get elementalType(): ElementalType;
    get hoverName(): MutableComponent;
    get maxTier(): number;
    get name(): MutableComponent;
    get pointsToTierUp(): Point[];
    getAttributesTooltip(tier: number): Component[];
    getCustomEffectTooltip(tier: number): Component[];
    onPlayerAttackLivingEntity(player: Player, livingEntity: LivingEntity, tier: number, isBadgeActive: boolean): void;
    tick(player: Player): void;
    updateAttributes(player: Player, tier: number, isActive: boolean): void;
  }

}

declare module 'fr.harmex.cobblebadges.common.world.badge.ElementalTypeBadge' {
  import { MutableComponent, Component } from 'net.minecraft.network.chat';
  import { ElementalTypeBadge, Point } from 'fr.harmex.cobblebadges.common.world.badge';
  import { List } from 'java.util';
  import { Player } from 'net.minecraft.world.entity.player';
  import { LivingEntity } from 'net.minecraft.world.entity';

  class DefaultImpls {
    static canTierDown($this: ElementalTypeBadge, player: Player): boolean;
    static canTierUp($this: ElementalTypeBadge, player: Player): boolean;
    static getCustomEffectTooltip($this: ElementalTypeBadge, tier: number): Component[];
    static getDescriptionId($this: ElementalTypeBadge): string;
    static getDisplayName($this: ElementalTypeBadge): MutableComponent;
    static getHoverName($this: ElementalTypeBadge): MutableComponent;
    static getMaxTier($this: ElementalTypeBadge): number;
    static getName($this: ElementalTypeBadge): MutableComponent;
    static getPointsToTierUp($this: ElementalTypeBadge): Point[];
    static onPlayerAttackLivingEntity($this: ElementalTypeBadge, player: Player, livingEntity: LivingEntity, tier: number, isBadgeActive: boolean): void;
    static tick($this: ElementalTypeBadge, player: Player): void;
  }

}

declare module 'fr.harmex.cobblebadges.common.world.badge.MobEffectBadge' {
  import { MobEffectBadge } from 'fr.harmex.cobblebadges.common.world.badge';
  import { Player } from 'net.minecraft.world.entity.player';
  import { List } from 'java.util';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { LivingEntity } from 'net.minecraft.world.entity';

  class DefaultImpls {
    static applyEffects($this: MobEffectBadge, player: Player, tier: number, isBadgeActive: boolean): void;
    static applyEffects$default(mobEffectBadge: MobEffectBadge, player: Player, n: number, bl: boolean, n2: number, object: any): void;
    static canTierDown($this: MobEffectBadge, player: Player): boolean;
    static canTierUp($this: MobEffectBadge, player: Player): boolean;
    static getCustomEffectTooltip($this: MobEffectBadge, tier: number): Component[];
    static getDescriptionId($this: MobEffectBadge): string;
    static getDisplayName($this: MobEffectBadge): MutableComponent;
    static getHoverName($this: MobEffectBadge): MutableComponent;
    static getMaxTier($this: MobEffectBadge): number;
    static getMobEffectsTooltip($this: MobEffectBadge, tier: number): Component[];
    static getName($this: MobEffectBadge): MutableComponent;
    static onPlayerAttackLivingEntity($this: MobEffectBadge, player: Player, livingEntity: LivingEntity, tier: number, isBadgeActive: boolean): void;
    static tick($this: MobEffectBadge, player: Player): void;
  }

}

declare module 'fr.harmex.cobblebadges.common.world.badge.MobEffectImmuneBadge' {
  import { MobEffectImmuneBadge } from 'fr.harmex.cobblebadges.common.world.badge';
  import { Player } from 'net.minecraft.world.entity.player';
  import { List } from 'java.util';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { LivingEntity } from 'net.minecraft.world.entity';

  class DefaultImpls {
    static canTierDown($this: MobEffectImmuneBadge, player: Player): boolean;
    static canTierUp($this: MobEffectImmuneBadge, player: Player): boolean;
    static getCustomEffectTooltip($this: MobEffectImmuneBadge, tier: number): Component[];
    static getDescriptionId($this: MobEffectImmuneBadge): string;
    static getDisplayName($this: MobEffectImmuneBadge): MutableComponent;
    static getHoverName($this: MobEffectImmuneBadge): MutableComponent;
    static getMaxTier($this: MobEffectImmuneBadge): number;
    static getMobEffectsImmunityTooltip($this: MobEffectImmuneBadge, badgeTier: number): Component[];
    static getName($this: MobEffectImmuneBadge): MutableComponent;
    static onPlayerAttackLivingEntity($this: MobEffectImmuneBadge, player: Player, livingEntity: LivingEntity, tier: number, isBadgeActive: boolean): void;
    static tick($this: MobEffectImmuneBadge, player: Player, tier: number, isBadgeActive: boolean): void;
    static tick($this: MobEffectImmuneBadge, player: Player): void;
  }

}

declare module 'fr.harmex.cobblebadges.common.world' {
  import { PlatformRegistry } from 'com.cobblemon.mod.common.platform';
  import { Registry } from 'net.minecraft.core';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Item } from 'net.minecraft.world.item';

  interface CobbleBadgesItems extends PlatformRegistry<Registry, ResourceKey, Item> {}
  class CobbleBadgesItems extends PlatformRegistry<Registry, ResourceKey, Item> {
    static readonly INSTANCE: CobbleBadgesItems;
    get registry(): Registry<Item>;
    get resourceKey(): ResourceKey<Registry<Item>>;
  }

}

declare module 'fr.harmex.cobblebadges.common.world.effect' {
  import { PlatformRegistry } from 'com.cobblemon.mod.common.platform';
  import { Registry } from 'net.minecraft.core';
  import { ResourceKey } from 'net.minecraft.resources';
  import { MobEffect } from 'net.minecraft.world.effect';
  import { LivingEntity } from 'net.minecraft.world.entity';

  interface CobbleBadgesMobEffects extends PlatformRegistry<Registry, ResourceKey, MobEffect> {}
  class CobbleBadgesMobEffects extends PlatformRegistry<Registry, ResourceKey, MobEffect> {
    static readonly INSTANCE: CobbleBadgesMobEffects;
    static readonly DECAY: DecayMobEffect;
    get registry(): Registry<MobEffect>;
    get resourceKey(): ResourceKey<Registry<MobEffect>>;
  }


  interface DecayMobEffect extends MobEffect {}
  class DecayMobEffect extends MobEffect {
    constructor();
    applyEffectTick(livingEntity: LivingEntity, amplifier: number): boolean;
    shouldApplyEffectTickThisTick(duration: number, amplifier: number): boolean;
  }

}

declare module 'fr.harmex.cobblebadges.common.world.entity.player' {
  class CobbleBadgesPlayer {
    cobbleBadges$getBadgeManager(): BadgeManager;
    cobbleBadges$setBadgeManager(var1: BadgeManager): void;
  }

}

declare module 'fr.harmex.cobblebadges.common.world.level' {
  import { Key } from 'GameRules';

  class CobbleBadgesGameRules {
    static readonly INSTANCE: CobbleBadgesGameRules;
    static readonly DO_BADGE_EARN_BROADCAST: Key;
  }

}

declare module 'fr.harmex.cobblebadges.mixin' {
  import { CobbleBadgesPlayer, BadgeManager } from 'fr.harmex.cobblebadges.common.world.entity.player';

  class LivingEntityMixin {
  }


  interface PlayerMixin extends CobbleBadgesPlayer {}
  class PlayerMixin extends CobbleBadgesPlayer {
    cobbleBadges$getBadgeManager(): BadgeManager;
    cobbleBadges$setBadgeManager(badgeManager: BadgeManager): void;
  }


  class PowderSnowBlockMixin {
  }


  class ServerPlayerMixin {
  }

}

declare module 'fr.harmex.cobblebadges.neoforge.client' {
  import { CobbleBadgesClientImplementation } from 'fr.harmex.cobblebadges.common.client';
  import { KeyMapping } from 'net.minecraft.client';

  interface CobbleBadgesNeoForgeClient extends CobbleBadgesClientImplementation {}
  class CobbleBadgesNeoForgeClient extends CobbleBadgesClientImplementation {
    static readonly INSTANCE: CobbleBadgesNeoForgeClient;
    init(): void;
    invoke(p0: KeyMapping): void;
  }

}

declare module 'fr.harmex.cobblebadges.neoforge' {
  import { CobbleBadgesImplementation } from 'fr.harmex.cobblebadges.common';
  import { Registry } from 'net.minecraft.core';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { KClass } from 'kotlin.reflect';
  import { ArgumentTypeInfo } from 'net.minecraft.commands.synchronization';
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { Template } from 'ArgumentTypeInfo';
  import { Key, Category, Type, Value } from 'GameRules';

  interface CobbleBadgesNeoForge extends CobbleBadgesImplementation {}
  class CobbleBadgesNeoForge extends CobbleBadgesImplementation {
    static readonly INSTANCE: CobbleBadgesNeoForge;
    createRegistry<T>(resourceKey: ResourceKey<Registry<T>>): Registry<T>;
    get networkManager(): CobbleBadgesNeoForgeNetworkManager;
    registerBadges(): void;
    registerCommandArgument<A extends ArgumentType<any>, T extends Template<A>>(location: ResourceLocation, argumentClass: KClass<A>, serializer: ArgumentTypeInfo<A, T>): void;
    registerEntityDataSerializer(): void;
    registerGameRule<T extends Value<T>>(name: string, category: Category, type: Type<T>): Key<T>;
    registerItems(): void;
    registerMobEffects(): void;
  }

}