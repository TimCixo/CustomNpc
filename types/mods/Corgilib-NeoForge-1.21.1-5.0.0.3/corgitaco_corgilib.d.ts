declare module 'corgitaco.corgilib.client' {
  import { Player } from 'net.minecraft.world.entity.player';
  import { Matrix4f } from 'org.joml';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { VertexConsumer, PoseStack } from 'com.mojang.blaze3d.vertex';
  import { SphereDrawHandler, RingDrawHandler } from 'corgitaco.corgilib.client.RenderUtils';
  import { AABB } from 'net.minecraft.world.phys';
  import { BlockPos } from 'net.minecraft.core';
  import { StructureBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { Minecraft } from 'net.minecraft.client';

  class AnnouncementInfoClientTicker {
    static announcementTicker(player: Player): void;
    static canRunDismissCommand(): boolean;
    static checkedAnnouncementTicker(eventPlayer: Player): void;
  }


  class RenderUtils {
    static drawFlatColoredSphere(pose: Matrix4f, bufferSource: MultiBufferSource, radius: number, originX: number, originY: number, originZ: number, r: number, g: number, b: number, a: number): void;
    static drawRing(pose: Matrix4f, bufferSource: MultiBufferSource, distance: number, originX: number, originY: number, originZ: number, r: number, g: number, b: number, a: number): void;
    static drawRing(pose: Matrix4f, vertexConsumer: VertexConsumer, distance: number, originX: number, originY: number, originZ: number, segments: number, ringHeight: number, ringDrawHandler: RingDrawHandler): void;
    static drawSphere(pose: Matrix4f, consumer: VertexConsumer, radius: number, originX: number, originY: number, originZ: number, rings: number, segments: number, sphereDrawHandler: SphereDrawHandler): void;
  }


  class StructureBoxEditor {
    static structureBox: AABB;
    static structureBlockPos: BlockPos;
    static structureOffset: BlockPos;
    static getStructureWorldBox(pBlockEntity: StructureBlockEntity): AABB;
    static isKeyDown(minecraft: Minecraft, keyValue: number): boolean;
    static onScroll(scrollValue: number): boolean;
    static render(stack: PoseStack, consumer: VertexConsumer, camX: number, camY: number, camZ: number, b: boolean): void;
  }

}

declare module 'corgitaco.corgilib.client.commands' {
  import { CommandDispatcher } from 'com.mojang.brigadier';

  class CorgiLibClientCommands {
    static registerClientCommands(dispatcher: CommandDispatcher<any>): void;
  }

}

declare module 'corgitaco.corgilib.client.RenderUtils' {
  import { Matrix4f } from 'org.joml';
  import { VertexConsumer } from 'com.mojang.blaze3d.vertex';

  class SphereDrawHandler {
    draw(var1: Matrix4f, var2: VertexConsumer, var3: number, var4: number, var5: number, var6: number, var7: number, var8: number, var9: number, var10: number, var11: number, var12: number, var13: number, var14: number): void;
  }


  class RingDrawHandler {
    draw(var1: Matrix4f, var2: VertexConsumer, var3: number, var4: number, var5: number, var6: number, var7: number, var8: number): void;
  }

}

declare module 'corgitaco.corgilib.client.screen.widget' {
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { Component } from 'net.minecraft.network.chat';
  import { SoundManager } from 'net.minecraft.client.sounds';

  interface AnnouncementWidget extends AbstractWidget {}
  class AnnouncementWidget extends AbstractWidget {
    constructor(guiWidth: number, guiHeight: number, width: number, height: number, message: Component);
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    onClick(mouseX: number, mouseY: number): void;
    playDownSound(handler: SoundManager): void;
  }

}

declare module 'corgitaco.corgilib.comparator' {
  import { Enum, Double } from 'java.lang';
  import { List } from 'java.util';
  import { Codec } from 'com.mojang.serialization';

  interface DoubleCheckType extends Enum<DoubleCheckType> {}
  class DoubleCheckType extends Enum<DoubleCheckType> {
    static readonly GREATER_THAN: DoubleCheckType;
    static readonly GREATER_THAN_OR_EQUAL: DoubleCheckType;
    static readonly LESSER_THAN: DoubleCheckType;
    static readonly LESSER_THAN_OR_EQUAL: DoubleCheckType;
    static readonly EQUAL: DoubleCheckType;
    test(first: number, two: number): boolean;
    static valueOf(name: string): DoubleCheckType;
    static values(): DoubleCheckType[];
  }


  class DoubleComparator {
    static readonly CODEC: Codec;
    constructor(s: string);
    check(number: number): boolean;
  }

}

declare module 'corgitaco.corgilib.config.AnnouncementConfig' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface AnnouncementDelivery extends Enum<AnnouncementDelivery> {}
  class AnnouncementDelivery extends Enum<AnnouncementDelivery> {
    static readonly CHAT: AnnouncementDelivery;
    static readonly WIDGET: AnnouncementDelivery;
    static valueOf(name: string): AnnouncementDelivery;
    static values(): AnnouncementDelivery[];
  }

}

declare module 'corgitaco.corgilib.core' {
  import { ResourceKey } from 'net.minecraft.resources';
  import { Supplier } from 'java.util.function';

  class CorgiLibRegistry {
    static readonly BLENDING_FUNCTION_RESOURCE_KEY: ResourceKey;
    static readonly BLENDING_FUNCTION: Supplier;
    static readonly CONDITION_KEY: ResourceKey;
    static readonly CONDITION: Supplier;
    static init(): void;
  }

}

declare module 'corgitaco.corgilib' {
  import { Logger } from 'org.apache.logging.log4j';
  import { ResourceLocation } from 'net.minecraft.resources';

  class CorgiLib {
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly LOGGER: Logger;
    static createLocation(path: string): ResourceLocation;
    static init(): void;
  }

}

declare module 'corgitaco.corgilib.entity.condition' {
  import { Codec } from 'com.mojang.serialization';
  import { Map, Collection, List } from 'java.util';
  import { Attribute } from 'net.minecraft.world.entity.ai.attributes';
  import { DoubleComparator } from 'corgitaco.corgilib.comparator';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { TagKey } from 'net.minecraft.tags';
  import { BlockIs } from 'corgitaco.corgilib.entity.condition.BlocksAreCondition';
  import { BlockStateIs } from 'corgitaco.corgilib.entity.condition.BlockStatesAreCondition';
  import { Difficulty } from 'net.minecraft.world';
  import { Boolean, Integer } from 'java.lang';
  import { MobEffect } from 'net.minecraft.world.effect';
  import { EquipmentSlot, EntityType } from 'net.minecraft.world.entity';
  import { ItemStackCheck } from 'corgitaco.corgilib.entity';
  import { Level } from 'net.minecraft.world.level';
  import { Structure } from 'net.minecraft.world.level.levelgen.structure';
  import { BlockPos } from 'net.minecraft.core';
  import { LongPair } from 'corgitaco.corgilib.math';
  import { YRange } from 'corgitaco.corgilib.entity.condition.YRangeCondition';

  interface AnyCondition extends Condition {}
  class AnyCondition extends Condition {
    static readonly INSTANCE: AnyCondition;
    static readonly CODEC: Codec;
    codec(): Codec<Condition>;
    passes(conditionContext: ConditionContext): boolean;
  }


  interface AttributeCondition extends Condition {}
  class AttributeCondition extends Condition {
    static readonly CODEC: Codec;
    constructor(attributeComparator: Map<Attribute, DoubleComparator>);
    codec(): Codec<Condition>;
    passes(conditionContext: ConditionContext): boolean;
  }


  interface BiomeCondition extends Condition {}
  class BiomeCondition extends Condition {
    static readonly CODEC: Codec;
    constructor(biomes: Collection<ResourceKey<Biome>>);
    codec(): Codec<Condition>;
    passes(conditionContext: ConditionContext): boolean;
  }


  interface BiomeTagCondition extends Condition {}
  class BiomeTagCondition extends Condition {
    static readonly CODEC: Codec;
    constructor(biomeTags: Collection<TagKey<Biome>>);
    codec(): Codec<Condition>;
    passes(conditionContext: ConditionContext): boolean;
  }


  interface BlocksAreCondition extends Condition {}
  class BlocksAreCondition extends Condition {
    static readonly CODEC: Codec;
    constructor(blockStatesAre: BlockIs[]);
    codec(): Codec<Condition>;
    passes(conditionContext: ConditionContext): boolean;
  }


  interface BlockStatesAreCondition extends Condition {}
  class BlockStatesAreCondition extends Condition {
    static readonly CODEC: Codec;
    constructor(blockStatesAre: BlockStateIs[]);
    codec(): Codec<Condition>;
    passes(conditionContext: ConditionContext): boolean;
  }


  interface ChanceCondition extends Condition {}
  class ChanceCondition extends Condition {
    static readonly CODEC: Codec;
    constructor(chance: number);
    codec(): Codec<Condition>;
    passes(conditionContext: ConditionContext): boolean;
  }


  class Condition {
    static readonly CODEC: Codec;
    codec(): Codec<Condition>;
    passes(var1: ConditionContext): boolean;
    static register(): void;
    static register(id: string, codec: Codec<Condition>): void;
  }


  interface DifficultyCondition extends Condition {}
  class DifficultyCondition extends Condition {
    static readonly CODEC: Codec;
    constructor(isDifficulty: Map<Difficulty, boolean>);
    codec(): Codec<Condition>;
    passes(conditionContext: ConditionContext): boolean;
  }


  interface EveryAmountOfDaysCondition extends Condition {}
  class EveryAmountOfDaysCondition extends Condition {
    static readonly CODEC: Codec;
    constructor(amountOfDays: Collection<number>, dayLength: number, offset: number);
    codec(): Codec<Condition>;
    passes(conditionContext: ConditionContext): boolean;
  }


  interface FlipCondition extends Condition {}
  class FlipCondition extends Condition {
    static readonly CODEC: Codec;
    constructor(condition: Condition);
    codec(): Codec<Condition>;
    passes(conditionContext: ConditionContext): boolean;
  }


  interface HasEffectCondition extends Condition {}
  class HasEffectCondition extends Condition {
    static readonly CODEC: Codec;
    constructor(effects: MobEffect[], hasAny: boolean);
    codec(): Codec<Condition>;
    passes(conditionContext: ConditionContext): boolean;
  }


  interface HasEquippedCondition extends Condition {}
  class HasEquippedCondition extends Condition {
    static readonly CODEC: Codec;
    constructor(stackChecksBySlot: Map<EquipmentSlot, ItemStackCheck[]>);
    codec(): Codec<Condition>;
    passes(conditionContext: ConditionContext): boolean;
  }


  interface InDimensionCondition extends Condition {}
  class InDimensionCondition extends Condition {
    static CODEC: Codec;
    constructor(validWorlds: Collection<ResourceKey<Level>>);
    codec(): Codec<Condition>;
    passes(conditionContext: ConditionContext): boolean;
  }


  interface InsideStructureTagCondition extends Condition {}
  class InsideStructureTagCondition extends Condition {
    static readonly CODEC: Codec;
    constructor(structureTags: TagKey<Structure>[], mustIntersectPiece: boolean);
    codec(): Codec<Condition>;
    passes(conditionContext: ConditionContext): boolean;
  }


  interface IsBabyCondition extends Condition {}
  class IsBabyCondition extends Condition {
    static readonly CODEC: Codec;
    codec(): Codec<Condition>;
    passes(conditionContext: ConditionContext): boolean;
  }


  interface IsDeadOrDyingCondition extends Condition {}
  class IsDeadOrDyingCondition extends Condition {
    static readonly INSTANCE: IsDeadOrDyingCondition;
    static readonly CODEC: Codec;
    codec(): Codec<Condition>;
    passes(conditionContext: ConditionContext): boolean;
  }


  interface IsSwimmingCondition extends Condition {}
  class IsSwimmingCondition extends Condition {
    static readonly CODEC: Codec;
    codec(): Codec<Condition>;
    passes(conditionContext: ConditionContext): boolean;
  }


  interface LastInjurerByTypeHasCondition extends Condition {}
  class LastInjurerByTypeHasCondition extends Condition {
    static CODEC: Codec;
    constructor(injurerConditions: Map<EntityType<any>, Condition[]>);
    codec(): Codec<Condition>;
    passes(conditionContext: ConditionContext): boolean;
  }


  interface LastInjurerHasCondition extends Condition {}
  class LastInjurerHasCondition extends Condition {
    static CODEC: Codec;
    constructor(injurerConditions: Condition[]);
    codec(): Codec<Condition>;
    passes(conditionContext: ConditionContext): boolean;
  }


  interface LunarPhaseCondition extends Condition {}
  class LunarPhaseCondition extends Condition {
    static readonly CODEC: Codec;
    constructor(validMoonPhases: Collection<number>);
    codec(): Codec<Condition>;
    passes(conditionContext: ConditionContext): boolean;
  }


  interface MobifiersPassed extends Condition {}
  class MobifiersPassed extends Condition {
    static readonly CODEC: Codec;
    constructor(doubleComparator: DoubleComparator);
    codec(): Codec<Condition>;
    passes(conditionContext: ConditionContext): boolean;
  }


  interface PlayerInventoryCondition extends Condition {}
  class PlayerInventoryCondition extends Condition {
    static readonly CODEC: Codec;
    constructor(stackChecks: ItemStackCheck[]);
    codec(): Codec<Condition>;
    passes(conditionContext: ConditionContext): boolean;
  }


  interface PrecipitationAtCondition extends Condition {}
  class PrecipitationAtCondition extends Condition {
    static CODEC: Codec;
    constructor(offset: BlockPos, snow: boolean);
    codec(): Codec<Condition>;
    passes(conditionContext: ConditionContext): boolean;
  }


  interface SeeSkyAtCondition extends Condition {}
  class SeeSkyAtCondition extends Condition {
    static CODEC: Codec;
    constructor(offset: BlockPos);
    codec(): Codec<Condition>;
    passes(conditionContext: ConditionContext): boolean;
  }


  interface TimeOfDayCondition extends Condition {}
  class TimeOfDayCondition extends Condition {
    static readonly CODEC: Codec;
    constructor(timesOfDay: LongPair[], dayLength: number);
    codec(): Codec<Condition>;
    passes(conditionContext: ConditionContext): boolean;
  }


  interface YRangeCondition extends Condition {}
  class YRangeCondition extends Condition {
    static readonly CODEC: Codec;
    constructor(yRanges: YRange[], offset: BlockPos);
    codec(): Codec<Condition>;
    passes(conditionContext: ConditionContext): boolean;
  }

}

declare module 'corgitaco.corgilib.entity.condition.BlocksAreCondition' {
  import { Codec } from 'com.mojang.serialization';
  import { BlockPos } from 'net.minecraft.core';
  import { Collection } from 'java.util';
  import { Block } from 'net.minecraft.world.level.block';

  class BlockIs {
    static readonly CODEC: Codec;
    constructor(offset: BlockPos, is: Collection<Block>);
  }

}

declare module 'corgitaco.corgilib.entity.condition.BlockStatesAreCondition' {
  import { Codec } from 'com.mojang.serialization';
  import { BlockPos } from 'net.minecraft.core';
  import { Collection } from 'java.util';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  class BlockStateIs {
    static readonly CODEC: Codec;
    constructor(offset: BlockPos, is: Collection<BlockState>);
  }

}

declare module 'corgitaco.corgilib.entity.condition.YRangeCondition' {
  import { Codec } from 'com.mojang.serialization';

  class YRange {
    static CODEC: Codec;
    constructor(minY: number, maxY: number);
    isInBetween(y: number): boolean;
  }

}

declare module 'corgitaco.corgilib.entity' {
  import { Level } from 'net.minecraft.world.level';
  import { Entity } from 'net.minecraft.world.entity';
  import { IsInside } from 'corgitaco.corgilib.entity.IsInsideStructureTracker';
  import { Codec } from 'com.mojang.serialization';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { Optional, Map } from 'java.util';
  import { DoubleComparator } from 'corgitaco.corgilib.comparator';

  class IsInsideStructureTracker {
    get tracker(): IsInside;
    setInside(world: Level, entity: Entity, isInside: IsInside): void;
  }


  class ItemStackCheck {
    static readonly CODEC: Codec;
    constructor(item: Item, durabilityComparator: Optional<DoubleComparator>, stackSizeComparator: Optional<DoubleComparator>, enchantmentLevelComparator: Optional<Map<Holder<Enchantment>, DoubleComparator>>);
    get item(): Item;
    test(itemStack: ItemStack): boolean;
  }

}

declare module 'corgitaco.corgilib.entity.IsInsideStructureTracker' {
  import { Codec } from 'com.mojang.serialization';
  import { IsInsideStructureTracker } from 'corgitaco.corgilib.entity';

  class IsInside {
    static readonly CODEC: Codec;
    constructor(insideStructure: boolean, insideStructurePiece: boolean);
    isInsideStructure(): boolean;
    isInsideStructurePiece(): boolean;
    setInsideStructure(insideStructure: boolean): IsInside;
    setInsideStructurePiece(insideStructurePiece: boolean): IsInside;
  }


  class Access {
    get isInsideStructureTracker(): IsInsideStructureTracker;
  }

}

declare module 'corgitaco.corgilib.math.blendingfunction' {
  import { Codec } from 'com.mojang.serialization';

  class BlendingFunction {
    static readonly CODEC: Codec;
    apply(var1: number): number;
    apply(factor: number, min: number, max: number): number;
    codec(): Codec<BlendingFunction>;
    static register(): void;
  }


  class BlendingFunctions {
    static easeInCirc(x: number, exponent: number): number;
    static easeInOutCirc(x: number): number;
    static easeOutBounce(x: number): number;
    static easeOutCubic(x: number): number;
    static easeOutElastic(x: number, intensity: number): number;
    static easeOutQuint(x: number): number;
  }

}

declare module 'corgitaco.corgilib.math' {
  import { Codec } from 'com.mojang.serialization';

  class LongPair {
    constructor(val1: number, val2: number);
    static createLongPairCodec(val1Name: string, val2Name: string): Codec<LongPair>;
    get val1(): number;
    get val2(): number;
    isInBetween(l: number): boolean;
    toString(): string;
  }

}

declare module 'corgitaco.corgilib.mixin.chunk' {
  import { RandomTickScheduler } from 'corgitaco.corgilib.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { List } from 'java.util';

  interface MixinChunkAccess extends RandomTickScheduler {}
  class MixinChunkAccess extends RandomTickScheduler {
    get scheduledRandomTicks(): BlockPos[];
    scheduleRandomTick(pos: BlockPos): void;
  }


  class MixinChunkSerializer {
  }


  interface MixinLevelChunk extends RandomTickScheduler {}
  class MixinLevelChunk extends RandomTickScheduler {
  }

}

declare module 'corgitaco.corgilib.mixin.client' {
  class MixinMouseHandler {
  }

}

declare module 'corgitaco.corgilib.mixin' {
  import { DynamicOps, ListBuilder, RecordBuilder } from 'com.mojang.serialization';
  import { Access } from 'corgitaco.corgilib.entity.IsInsideStructureTracker';
  import { IsInsideStructureTracker } from 'corgitaco.corgilib.entity';
  import { Level } from 'net.minecraft.world.level';

  class DelegatingOpsMixin<T = any> {
    delegate: DynamicOps;
    listBuilder(): ListBuilder<T>;
    mapBuilder(): RecordBuilder<T>;
  }


  interface MixinEntity extends Access {}
  class MixinEntity extends Access {
    get isInsideStructureTracker(): IsInsideStructureTracker;
  }


  interface MixinServerLevel extends Level {}
  class MixinServerLevel extends Level {
  }


  class MixinStructureBlock {
  }

}

declare module 'corgitaco.corgilib.network' {
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { List } from 'java.util';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';

  interface Packet extends CustomPacketPayload {}
  class Packet extends CustomPacketPayload {
    static readonly PACKETS: List;
    handle(var1: Level, var2: Player): void;
  }

}

declare module 'corgitaco.corgilib.network.Packet' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';

  interface PacketDirection extends Enum<PacketDirection> {}
  class PacketDirection extends Enum<PacketDirection> {
    static readonly SERVER_TO_CLIENT: PacketDirection;
    static readonly CLIENT_TO_SERVER: PacketDirection;
    static readonly BI_DIRECTIONAL: PacketDirection;
    static valueOf(name: string): PacketDirection;
    static values(): PacketDirection[];
  }


  class Handle<T extends Packet = any> {
    handle(var1: T, var2: Level, var3: Player): void;
  }

}

declare module 'corgitaco.corgilib.platform' {
  import { Collection, List } from 'java.util';
  import { Path } from 'java.nio.file';
  import { Class } from 'java.lang';
  import { Supplier } from 'java.util.function';
  import { Registry } from 'net.minecraft.core';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Codec } from 'com.mojang.serialization';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Packet } from 'corgitaco.corgilib.network';

  class ModPlatform {
    static readonly PLATFORM: ModPlatform;
    configDir(): Path;
    createSimpleBuiltin<T>(var1: ResourceKey<Registry<T>>): Supplier<Registry<T>>;
    get modIDS(): Collection<string>;
    get platformName(): string;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(var1: string): boolean;
    static load<T>(clazz: Class<T>): T;
    modConfigDir(): Path;
    register<T>(var1: Registry<T>, var2: string, var3: Supplier<T>): Supplier<T>;
    registerDatapackRegistry<T>(var1: ResourceKey<Registry<T>>, var2: Supplier<Codec<T>>): void;
  }


  class PlatformNetwork {
    static readonly NETWORK: PlatformNetwork;
    sendToAllClients<P extends Packet>(players: ServerPlayer[], packet: P): void;
    sendToClient<P extends Packet>(var1: ServerPlayer, var2: P): void;
    sendToServer<P extends Packet>(var1: P): void;
  }

}

declare module 'corgitaco.corgilib.serialization.codec' {
  import { Codec, DataResult, MapCodec, DynamicOps, MapLike, RecordBuilder, ListBuilder } from 'com.mojang.serialization';
  import { Function, BiFunction } from 'java.util.function';
  import { Integer } from 'java.lang';
  import { Registry } from 'net.minecraft.core';
  import { WrapForSerialization } from 'corgitaco.corgilib.serialization.codec.CodecUtil';
  import { Stream } from 'java.util.stream';
  import { DelegatingOps } from 'net.minecraft.resources';
  import { Access } from 'corgitaco.corgilib.serialization.codec.FromFileOps';
  import { Map } from 'java.util';

  class CodecUtil {
    static readonly BLOCK_CODEC: Codec;
    static readonly MOB_EFFECT: Codec;
    static readonly ENTITY_TYPE: Codec;
    static readonly ENTITY_TYPE_CODEC: Codec;
    static readonly ATTRIBUTE_CODEC: Codec;
    static readonly ITEM_CODEC: Codec;
    static readonly EFFECT_CODEC: Codec;
    static readonly BIOME_CODEC: Codec;
    static readonly EQUIPMENT_SLOT_CODEC: Codec;
    static readonly DIFFICULTY_CODEC: Codec;
    static readonly CLICK_EVENT_ACTION_CODEC: Codec;
    static readonly CLICK_EVENT_CODEC: Codec;
    static COLOR_FROM_HEX: Codec;
    static readonly INTEGER_KEY_CODEC: Codec;
    static createLoggedExceptionRegistryCodec<T>(registry: Registry<T>): Codec<T>;
    static intKeyRangeCodec(min: number, max: number): Codec<number>;
    static validateColorHex(): Function<string, DataResult<number>>;
    static wrap<T>(toWrap: T): WrapForSerialization<T>;
    static wrapCodecForCollectionSerializing<T>(codec: Codec<T>): Codec<WrapForSerialization<T>>;
  }


  interface CommentedCodec<A = any> extends MapCodec<A> {}
  class CommentedCodec<A = any> extends MapCodec<A> {
    constructor(codec: Codec<A>, name: string, comment: string, codecBiFunction: BiFunction<Codec<A>, string, MapCodec<A>>);
    decode<T>(ops: DynamicOps<T>, input: MapLike<T>): DataResult<A>;
    encode<T>(input: A, ops: DynamicOps<T>, prefix: RecordBuilder<T>): RecordBuilder<T>;
    keys<T>(ops: DynamicOps<T>): Stream<T>;
    static of<B>(codec: Codec<B>, name: string, comment: string): CommentedCodec<B>;
    static optionalOf<B>(codec: Codec<B>, name: string, comment: string): CommentedCodec<B>;
    static optionalOf<B>(codec: Codec<B>, name: string, comment: string, defaultVal: B): CommentedCodec<B>;
  }


  class CommentsTracker {
    addComment(var1: string, var2: string): void;
    getComment(var1: string): string;
  }


  interface CommentsTrackerMapLike<A = any> extends MapLike<A>, CommentsTracker {}
  class CommentsTrackerMapLike<A = any> extends MapLike<A> {
  }


  interface FromFileOps<T = any> extends DelegatingOps<T> {}
  class FromFileOps<T = any> extends DelegatingOps<T> {
    constructor(dynamicOps: DynamicOps<T>, access: Access);
    getAccess<E>(s: string): Map<string, E>;
    listBuilder(): ListBuilder<T>;
    mapBuilder(): RecordBuilder<T>;
  }

}

declare module 'corgitaco.corgilib.serialization.codec.FromFileOps' {
  import { Map } from 'java.util';

  class Access {
    equals(obj: any): boolean;
    get<T>(s: string): Map<string, T>;
    hashCode(): number;
    registry(): Map<string, Map<string, any>>;
    toString(): string;
  }

}

declare module 'corgitaco.corgilib.serialization.jankson' {
  import { RuntimeException } from 'java.lang';
  import { Jankson, JsonGrammar, JsonElement, JsonArray } from 'corgitaco.corgilib.shadow.blue.endless.jankson';
  import { Supplier } from 'java.util.function';
  import { Map } from 'java.util';
  import { Path } from 'java.nio.file';
  import { Codec, DynamicOps } from 'com.mojang.serialization';
  import { Writer } from 'java.io';

  class JanksonUtil {
    static thrown: RuntimeException;
    static readonly HEADER_OPEN: string;
    static readonly HEADER_CLOSED: string;
    static readonly JANKSON: Jankson;
    static readonly JSON_GRAMMAR_BUILDER: Supplier;
    static readonly JSON_GRAMMAR: JsonGrammar;
    static addCommentsAndAlphabeticallySortRecursively(comments: Map<string, string>, element: JsonElement, parentKey: string, alphabeticallySorted: boolean): JsonElement;
    static createConfig<T>(path: Path, codec: Codec<T>, header: string, comments: Map<string, string>, ops: DynamicOps<JsonElement>, from: T): void;
    static readConfig<T>(path: Path, codec: Codec<T>, ops: DynamicOps<JsonElement>): T;
  }


  interface JsonArrayOfArrays extends JsonArray {}
  class JsonArrayOfArrays extends JsonArray {
    toJson(writer: Writer, grammar: JsonGrammar, depth: number): void;
    toJson(comments: boolean, newlines: boolean, depth: number): string;
    toJson(): string;
    toJson(comments: boolean, newlines: boolean): string;
    toJson(grammar: JsonGrammar, depth: number): string;
    toJson(grammar: JsonGrammar): string;
  }

}

declare module 'corgitaco.corgilib.server.commands' {
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack, CommandBuildContext } from 'net.minecraft.commands';
  import { LiteralArgumentBuilder } from 'com.mojang.brigadier.builder';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BiConsumer } from 'java.util.function';
  import { Integer } from 'java.lang';
  import { BlockPos } from 'net.minecraft.core';

  class CorgiLibCommands {
    static registerCommands(dispatcher: CommandDispatcher<CommandSourceStack>, commandBuildContext: CommandBuildContext): void;
  }


  class PlaceAllCommand {
    static dumpConfiguredFeatures(position: Vec3, serverLevel: ServerLevel, modId: string, state: BlockState, floorDepth: number): void;
    static dumpStructures(position: Vec3, serverLevel: ServerLevel, modId: string, state: BlockState, floorDepth: number): void;
    static generateObject(position: Vec3, serverLevel: ServerLevel, rowsAndCols: number, size: number, floorBlock: BlockState, floorDepth: number, consumer: BiConsumer<number, BlockPos>): void;
    static register(dispatcher: LiteralArgumentBuilder<CommandSourceStack>, commandBuildContext: CommandBuildContext): void;
  }

}

declare module 'corgitaco.corgilib.shadow.blue.endless.jankson.api' {
  import { Exception, Throwable, Class } from 'java.lang';
  import { InternalDeserializerFunction } from 'corgitaco.corgilib.shadow.blue.endless.jankson.impl.serializer';
  import { Set } from 'java.util';
  import { UnicodeBlock } from 'Character';
  import { JsonElement } from 'corgitaco.corgilib.shadow.blue.endless.jankson';
  import { Type } from 'java.lang.reflect';

  interface DeserializationException extends Exception {}
  class DeserializationException extends Exception {
    constructor();

    constructor(message: string);

    constructor(message: string, cause: Throwable);

    constructor(cause: Throwable);
  }


  interface DeserializerFunction<A = any, B = any> extends InternalDeserializerFunction<B> {}
  class DeserializerFunction<A = any, B = any> extends InternalDeserializerFunction<B> {
    apply(var1: A, var2: Marshaller): B;
    deserialize(a: any, m: Marshaller): B;
  }


  class Escaper {
    static escapeString(s: string): string;
    static escapeString(s: string, quoteChar: string, unquotedBlocks: Set<UnicodeBlock>): string;
  }


  class Marshaller {
    marshall<E>(var1: Class<E>, var2: JsonElement): E;
    marshall<E>(var1: Type, var2: JsonElement): E;
    marshallCarefully<E>(var1: Class<E>, var2: JsonElement): E;
    serialize(var1: any): JsonElement;
  }


  interface SyntaxError extends Exception {}
  class SyntaxError extends Exception {
    constructor(message: string);
    get completeMessage(): string;
    get lineMessage(): string;
    setEndParsing(line: number, column: number): void;
    setStartParsing(line: number, column: number): void;
  }

}

declare module 'corgitaco.corgilib.shadow.blue.endless.jankson.impl' {
  import { JsonElement, JsonArray, Jankson, JsonPrimitive, JsonObject } from 'corgitaco.corgilib.shadow.blue.endless.jankson';
  import { Field, Type } from 'java.lang.reflect';
  import { Marshaller } from 'corgitaco.corgilib.shadow.blue.endless.jankson.api';
  import { Map, Collection } from 'java.util';

  class AnnotatedElement {
    constructor(elem: JsonElement, comment: string);
    get comment(): string;
    get element(): JsonElement;
  }


  interface ArrayParserContext extends ParserContext<JsonArray> {}
  class ArrayParserContext extends ParserContext<JsonArray> {
    consume(codePoint: number, loader: Jankson): boolean;
    eof(): void;
    get result(): JsonArray;
    isComplete(): boolean;
  }


  interface CommentParserContext extends ParserContext<string> {}
  class CommentParserContext extends ParserContext<string> {
    constructor(codePoint: number);
    consume(codePoint: number, loader: Jankson): boolean;
    eof(): void;
    get result(): string;
    isComplete(): boolean;
  }


  interface ElementParserContext extends ParserContext<AnnotatedElement> {}
  class ElementParserContext extends ParserContext<AnnotatedElement> {
    consume(codePoint: number, loader: Jankson): boolean;
    eof(): void;
    get result(): AnnotatedElement;
    isComplete(): boolean;
    set result(elem: JsonElement);
  }


  interface NumberParserContext extends ParserContext<JsonPrimitive> {}
  class NumberParserContext extends ParserContext<JsonPrimitive> {
    constructor(firstCodePoint: number);
    consume(codePoint: number, loader: Jankson): boolean;
    eof(): void;
    get result(): JsonPrimitive;
    isComplete(): boolean;
  }


  interface ObjectParserContext extends ParserContext<JsonObject> {}
  class ObjectParserContext extends ParserContext<JsonObject> {
    constructor(assumeOpen: boolean);
    consume(codePoint: number, loader: Jankson): boolean;
    eof(): void;
    get result(): JsonObject;
    isComplete(): boolean;
  }


  class ParserContext<T = any> {
    consume(var1: number, var2: Jankson): boolean;
    eof(): void;
    get result(): T;
    isComplete(): boolean;
  }


  class POJODeserializer {
    static unpack(t: Type, elem: JsonElement, marshaller: Marshaller): any;
    static unpackCollection(collection: Collection<any>, elementType: Type, elem: JsonElement, marshaller: Marshaller): void;
    static unpackField(parent: any, f: Field, source: JsonObject, failFast: boolean): void;
    static unpackFieldData(parent: any, field: Field, elem: JsonElement, marshaller: Marshaller): boolean;
    static unpackMap(map: Map<any, any>, keyType: Type, valueType: Type, elem: JsonElement, marshaller: Marshaller): void;
    static unpackObject(target: any, source: JsonObject): void;
    static unpackObject(target: any, source: JsonObject, failFast: boolean): void;
  }


  interface StringParserContext extends ParserContext<JsonPrimitive> {}
  class StringParserContext extends ParserContext<JsonPrimitive> {
    constructor(quote: number);
    consume(codePoint: number, loader: Jankson): boolean;
    eof(): void;
    get result(): JsonPrimitive;
    isComplete(): boolean;
  }


  interface TokenParserContext extends ParserContext<JsonPrimitive> {}
  class TokenParserContext extends ParserContext<JsonPrimitive> {
    constructor(firstCodePoint: number);
    consume(codePoint: number, loader: Jankson): boolean;
    eof(): void;
    get result(): JsonPrimitive;
    isComplete(): boolean;
  }

}

declare module 'corgitaco.corgilib.shadow.blue.endless.jankson.impl.serializer' {
  import { Writer } from 'java.io';
  import { JsonGrammar, JsonElement } from 'corgitaco.corgilib.shadow.blue.endless.jankson';
  import { StringBuilder, Class } from 'java.lang';
  import { Marshaller } from 'corgitaco.corgilib.shadow.blue.endless.jankson.api';

  class CommentSerializer {
    static print(writer: Writer, comment: string, indent: number, grammar: JsonGrammar): void;
    static print(builder: StringBuilder, comment: string, indent: number, grammar: JsonGrammar): void;
    static print(builder: StringBuilder, comment: string, indent: number, comments: boolean, whitespace: boolean): void;
  }


  class DeserializerFunctionPool<B = any> {
    constructor(targetClass: Class<B>);
    apply(elem: JsonElement, marshaller: Marshaller): B;
    getFunction(sourceClass: Class<any>): InternalDeserializerFunction<B>;
    registerUnsafe(sourceClass: Class<any>, functionParameter: InternalDeserializerFunction<B>): void;
  }


  class InternalDeserializerFunction<B = any> {
    deserialize(var1: any, var2: Marshaller): B;
  }

}

declare module 'corgitaco.corgilib.shadow.blue.endless.jankson.impl.serializer.DeserializerFunctionPool' {
  import { Exception } from 'java.lang';

  interface FunctionMatchFailedException extends Exception {}
  class FunctionMatchFailedException extends Exception {
    constructor(message: string);
  }

}

declare module 'corgitaco.corgilib.shadow.blue.endless.jankson' {
  import { File, InputStream, Writer } from 'java.io';
  import { Class, Iterable, Cloneable, Double, Long, Boolean } from 'java.lang';
  import { Marshaller, SyntaxError } from 'corgitaco.corgilib.shadow.blue.endless.jankson.api';
  import { ParserContext } from 'corgitaco.corgilib.shadow.blue.endless.jankson.impl';
  import { Consumer } from 'java.util.function';
  import { Builder } from 'corgitaco.corgilib.shadow.blue.endless.jankson.Jankson';
  import { List, Collection, Iterator, ListIterator, Map, Set } from 'java.util';
  import { Builder as corgitaco_corgilib_shadow_blue_endless_jankson_jsongrammar_Builder } from 'corgitaco.corgilib.shadow.blue.endless.jankson.JsonGrammar';
  import { Entry } from 'Map';
  import { BigInteger, BigDecimal } from 'java.math';

  class Jankson {
    static builder(): Builder;
    fromJson<T>(obj: JsonObject, clazz: Class<T>): T;
    fromJson<T>(json: string, clazz: Class<T>): T;
    fromJsonCarefully<T>(json: string, clazz: Class<T>): T;
    fromJsonCarefully<T>(obj: JsonObject, clazz: Class<T>): T;
    get marshaller(): Marshaller;
    load(s: string): JsonObject;
    load(f: File): JsonObject;
    load(inParameter: InputStream): JsonObject;
    loadElement(s: string): JsonElement;
    loadElement(f: File): JsonElement;
    loadElement(inParameter: InputStream): JsonElement;
    push<T>(t: ParserContext<T>, consumer: Consumer<T>): void;
    throwDelayed(syntaxError: SyntaxError): void;
    toJson<T>(t: T): JsonElement;
    toJson<T>(t: T, alternateMarshaller: Marshaller): JsonElement;
  }


  interface JsonArray extends List<JsonElement>, Iterable<JsonElement>, JsonElement {}
  class JsonArray extends List<JsonElement> {
    constructor();

    constructor(ts: T[], marshaller: Marshaller);

    constructor(ts: Collection<any>, marshaller: Marshaller);
    add(e: JsonElement, comment: string): boolean;
    add(e: JsonElement): boolean;
    add(index: number, element: JsonElement): void;
    addAll(c: Collection<JsonElement>): boolean;
    addAll(index: number, elements: Collection<JsonElement>): boolean;
    clear(): void;
    clone(): JsonArray;
    contains(o: any): boolean;
    containsAll(c: Collection<any>): boolean;
    equals(other: any): boolean;
    get(i: number): JsonElement;
    get<E>(clazz: Class<E>, index: number): E;
    get marshaller(): Marshaller;
    getBoolean(index: number, defaultValue: boolean): boolean;
    getByte(index: number, defaultValue: number): number;
    getChar(index: number, defaultValue: string): string;
    getComment(i: number): string;
    getDouble(index: number, defaultValue: number): number;
    getFloat(index: number, defaultValue: number): number;
    getInt(index: number, defaultValue: number): number;
    getLong(index: number, defaultValue: number): number;
    getShort(index: number, defaultValue: number): number;
    getString(index: number, defaultValue: string): string;
    hashCode(): number;
    indexOf(obj: any): number;
    isEmpty(): boolean;
    iterator(): Iterator<JsonElement>;
    lastIndexOf(obj: any): number;
    listIterator(): ListIterator<JsonElement>;
    listIterator(index: number): ListIterator<JsonElement>;
    remove(o: any): boolean;
    remove(index: number): JsonElement;
    removeAll(c: Collection<any>): boolean;
    retainAll(c: Collection<any>): boolean;
    set(index: number, element: JsonElement): JsonElement;
    set marshaller(marshaller: Marshaller);
    setComment(i: number, comment: string): void;
    size(): number;
    subList(arg0: number, arg1: number): JsonElement[];
    toArray(): JsonElement[];
    toArray<T>(a: T[]): T[];
    toJson(comments: boolean, newlines: boolean, depth: number): string;
    toJson(writer: Writer, grammar: JsonGrammar, depth: number): void;
    toJson(): string;
    toJson(comments: boolean, newlines: boolean): string;
    toJson(grammar: JsonGrammar, depth: number): string;
    toJson(grammar: JsonGrammar): string;
    toString(): string;
  }


  interface JsonElement extends Cloneable {}
  class JsonElement extends Cloneable {
    clone(): JsonElement;
    toJson(): string;
    toJson(comments: boolean, newlines: boolean): string;
    toJson(var1: boolean, var2: boolean, var3: number): string;
    toJson(grammar: JsonGrammar, depth: number): string;
    toJson(grammar: JsonGrammar): string;
    toJson(var1: Writer, var2: JsonGrammar, var3: number): void;
  }


  class JsonGrammar {
    static readonly JANKSON: JsonGrammar;
    static readonly JSON5: JsonGrammar;
    static readonly STRICT: JsonGrammar;
    static readonly COMPACT: JsonGrammar;
    static builder(): corgitaco_corgilib_shadow_blue_endless_jankson_jsongrammar_Builder;
    hasComments(): boolean;
    shouldOutputWhitespace(): boolean;
  }


  interface JsonNull extends JsonElement {}
  class JsonNull extends JsonElement {
    static readonly INSTANCE: JsonNull;
    clone(): JsonNull;
    equals(other: any): boolean;
    hashCode(): number;
    toJson(comments: boolean, newlines: boolean, depth: number): string;
    toJson(writer: Writer, grammar: JsonGrammar, depth: number): void;
    toJson(): string;
    toJson(comments: boolean, newlines: boolean): string;
    toJson(grammar: JsonGrammar, depth: number): string;
    toJson(grammar: JsonGrammar): string;
    toString(): string;
  }


  interface JsonObject extends Map<string, JsonElement>, JsonElement {}
  class JsonObject extends Map<string, JsonElement> {
    clear(): void;
    clone(): JsonObject;
    containsKey(key: any): boolean;
    containsValue(val: any): boolean;
    entrySet(): Set<Entry<string, JsonElement>>;
    equals(other: any): boolean;
    get<E>(clazz: Class<E>, key: string): E;
    get(key: any): JsonElement;
    get key(): string;
    get marshaller(): Marshaller;
    get value(): JsonElement;
    getBoolean(key: string, defaultValue: boolean): boolean;
    getByte(key: string, defaultValue: number): number;
    getChar(key: string, defaultValue: string): string;
    getComment(name: string): string;
    getDelta(defaults: JsonObject): JsonObject;
    getDouble(key: string, defaultValue: number): number;
    getFloat(key: string, defaultValue: number): number;
    getInt(key: string, defaultValue: number): number;
    getLong(key: string, defaultValue: number): number;
    getObject(name: string): JsonObject;
    getShort(key: string, defaultValue: number): number;
    hashCode(): number;
    isEmpty(): boolean;
    keySet(): Set<string>;
    put(key: string, elem: JsonElement, comment: string): JsonElement;
    put(key: string, elem: JsonElement): JsonElement;
    putAll(map: Map<string, JsonElement>): void;
    putDefault(key: string, elem: JsonElement, comment: string): JsonElement;
    putDefault<T>(key: string, elem: T, comment: string): T;
    putDefault<T>(key: string, elem: T, clazz: Class<T>, comment: string): T;
    recursiveGet<E>(clazz: Class<E>, key: string): E;
    recursiveGetOrCreate<E extends JsonElement>(clazz: Class<E>, key: string, fallback: E, comment: string): E;
    remove(key: any): JsonElement;
    set marshaller(marshaller: Marshaller);
    set value(value: JsonElement);
    setComment(name: string, comment: string): void;
    size(): number;
    toJson(comments: boolean, newlines: boolean, depth: number): string;
    toJson(w: Writer, grammar: JsonGrammar, depth: number): void;
    toJson(): string;
    toJson(comments: boolean, newlines: boolean): string;
    toJson(grammar: JsonGrammar, depth: number): string;
    toJson(grammar: JsonGrammar): string;
    toString(): string;
    values(): Collection<JsonElement>;
  }


  interface JsonPrimitive extends JsonElement {}
  class JsonPrimitive extends JsonElement {
    static TRUE: JsonPrimitive;
    static FALSE: JsonPrimitive;
    constructor(value: any);
    asBigDecimal(defaultValue: BigDecimal): BigDecimal;
    asBigInteger(defaultValue: BigInteger): BigInteger;
    asBoolean(defaultValue: boolean): boolean;
    asByte(defaultValue: number): number;
    asChar(defaultValue: string): string;
    asDouble(defaultValue: number): number;
    asFloat(defaultValue: number): number;
    asInt(defaultValue: number): number;
    asLong(defaultValue: number): number;
    asShort(defaultValue: number): number;
    asString(): string;
    clone(): JsonPrimitive;
    equals(other: any): boolean;
    get value(): any;
    hashCode(): number;
    static of(s: string): JsonPrimitive;
    static of(n: BigInteger): JsonPrimitive;
    static of(n: BigDecimal): JsonPrimitive;
    static of(d: number): JsonPrimitive;
    static of(l: Long): JsonPrimitive;
    static of(b: boolean): JsonPrimitive;
    toJson(comments: boolean, newlines: boolean, depth: number): string;
    toJson(writer: Writer, grammar: JsonGrammar, depth: number): void;
    toJson(): string;
    toJson(comments: boolean, newlines: boolean): string;
    toJson(grammar: JsonGrammar, depth: number): string;
    toJson(grammar: JsonGrammar): string;
    toString(): string;
  }

}

declare module 'corgitaco.corgilib.shadow.blue.endless.jankson.Jankson' {
  import { Class } from 'java.lang';
  import { Function, BiFunction, Supplier } from 'java.util.function';
  import { JsonObject, JsonElement, Jankson } from 'corgitaco.corgilib.shadow.blue.endless.jankson';
  import { Marshaller, DeserializerFunction } from 'corgitaco.corgilib.shadow.blue.endless.jankson.api';

  class Builder {
    allowBareRootObject(): Builder;
    build(): Jankson;
    registerDeserializer<A, B>(sourceClass: Class<A>, targetClass: Class<B>, functionParameter: DeserializerFunction<A, B>): Builder;
    registerPrimitiveTypeAdapter<T>(clazz: Class<T>, adapter: Function<any, T>): Builder;
    registerSerializer<T>(clazz: Class<T>, serializer: BiFunction<T, Marshaller, JsonElement>): Builder;
    registerTypeAdapter<T>(clazz: Class<T>, adapter: Function<JsonObject, T>): Builder;
    registerTypeFactory<T>(clazz: Class<T>, factory: Supplier<T>): Builder;
  }

}

declare module 'corgitaco.corgilib.shadow.blue.endless.jankson.JsonGrammar' {
  import { JsonGrammar } from 'corgitaco.corgilib.shadow.blue.endless.jankson';

  class Builder {
    bareRootObject(bare: boolean): Builder;
    bareSpecialNumerics(bare: boolean): Builder;
    build(): JsonGrammar;
    printCommas(commas: boolean): Builder;
    printTrailingCommas(trailing: boolean): Builder;
    printUnquotedKeys(unquoted: boolean): Builder;
    printWhitespace(whitespace: boolean): Builder;
    withComments(comments: boolean): Builder;
  }

}

declare module 'corgitaco.corgilib.shadow.blue.endless.jankson.magic' {
  import { Class } from 'java.lang';
  import { Type } from 'java.lang.reflect';

  class TypeMagic {
    static classForType(t: Type): Class<any>;
    static createAndCast<U>(t: Type): U;
    static createAndCast<U>(t: Class<U>, failFast: boolean): U;
    static createAndCastCarefully<U>(t: Type): U;
    static shoehorn<T>(o: any): T;
  }

}

declare module 'corgitaco.corgilib.world.level' {
  import { BlockPos } from 'net.minecraft.core';
  import { List } from 'java.util';

  class RandomTickScheduler {
    get scheduledRandomTicks(): BlockPos[];
    scheduleRandomTick(var1: BlockPos): void;
  }

}