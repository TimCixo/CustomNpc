declare module 'team.creative.ambientsounds' {
  import { ClientLoader } from 'team.creative.creativecore.client';
  import { Logger } from 'org.apache.logging.log4j';
  import { AmbientTickHandler } from 'team.creative.ambientsounds.engine';
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { ICreativeConfig } from 'team.creative.creativecore.common.config.api';
  import { SelectableConfig } from 'team.creative.creativecore.common.config.premade';
  import { Side } from 'team.creative.creativecore';

  interface AmbientSounds extends ClientLoader {}
  class AmbientSounds extends ClientLoader {
    static readonly LOGGER: Logger;
    static readonly MODID: string;
    static readonly CONFIG: AmbientSoundsConfig;
    static TICK_HANDLER: AmbientTickHandler;
    constructor();
    onInitializeClient(): void;
    registerClientCommands<T>(dispatcher: CommandDispatcher<T>): void;
    static reloadAsync(): void;
    static scheduleReload(): void;
  }


  interface AmbientSoundsConfig extends ICreativeConfig {}
  class AmbientSoundsConfig extends ICreativeConfig {
    engines: SelectableConfig;
    volume: number;
    useSoundMasterSource: boolean;
    scanStepAmount: number;
    playSoundWithOffset: boolean;
    configured(side: Side): void;
  }

}

declare module 'team.creative.ambientsounds.block' {
  import { BlockState } from 'net.minecraft.world.level.block.state';

  class AmbientBlock {
    is(var1: BlockState): boolean;
    static parse(data: string): AmbientBlock;
  }


  class AmbientBlockGroup {
    add(data: string[]): void;
    is(state: BlockState): boolean;
    isEmpty(): boolean;
    onClientLoad(): void;
  }

}

declare module 'team.creative.ambientsounds.block.AmbientBlock' {
  import { AmbientBlock } from 'team.creative.ambientsounds.block';
  import { TupleList } from 'team.creative.creativecore.common.util.type.list';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { TagKey } from 'net.minecraft.tags';
  import { Block } from 'net.minecraft.world.level.block';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface AmbientBlockProperty extends AmbientBlock {}
  class AmbientBlockProperty extends AmbientBlock {
    readonly block: AmbientBlock;
    readonly properties: TupleList;
    constructor(block: AmbientBlock, properties: TupleList<string, string>);
    is(state: BlockState): boolean;
  }


  interface AmbientBlockTag extends AmbientBlock {}
  class AmbientBlockTag extends AmbientBlock {
    readonly tag: TagKey;
    constructor(tag: TagKey<Block>);
    is(state: BlockState): boolean;
  }


  interface AmbientBlockBlock extends AmbientBlock {}
  class AmbientBlockBlock extends AmbientBlock {
    readonly block: ResourceLocation;
    constructor(block: ResourceLocation);
    is(state: BlockState): boolean;
  }

}

declare module 'team.creative.ambientsounds.condition' {
  import { AmbientSoundProperties } from 'team.creative.ambientsounds.sound';
  import { Boolean } from 'java.lang';
  import { AmbientMinMaxFadeCondition, AmbientMinMaxFadeSpecialCondition } from 'team.creative.ambientsounds.condition.AmbientCondition';
  import { AmbientEntityCondition } from 'team.creative.ambientsounds.entity';
  import { AmbientEngine } from 'team.creative.ambientsounds.engine';
  import { AmbientEnvironment } from 'team.creative.ambientsounds.environment';
  import { List, HashMap } from 'java.util';
  import { AmbientTimePremade } from 'team.creative.ambientsounds.condition.AmbientTime';
  import { JsonElement } from 'com.google.gson';

  interface AmbientCondition extends AmbientSoundProperties {}
  class AmbientCondition extends AmbientSoundProperties {
    always: boolean;
    volume: number;
    nightVolume: number;
    dayVolume: number;
    time: AmbientTime;
    biomeType: string;
    biomes: string[];
    badBiomes: string[];
    raining: boolean;
    overallRaining: boolean;
    snowing: boolean;
    storming: boolean;
    underwater: AmbientMinMaxFadeCondition;
    relativeHeight: AmbientMinMaxFadeSpecialCondition;
    absoluteHeight: AmbientMinMaxFadeCondition;
    minHeightRelative: AmbientMinMaxFadeCondition;
    maxHeightRelative: AmbientMinMaxFadeCondition;
    light: AmbientMinMaxFadeCondition;
    blockLight: AmbientMinMaxFadeCondition;
    skyLight: AmbientMinMaxFadeCondition;
    air: AmbientMinMaxFadeCondition;
    temperature: AmbientMinMaxFadeCondition;
    sky: AmbientMinMaxFadeCondition;
    features: string[];
    badFeatures: string[];
    variants: AmbientCondition[];
    regions: string[];
    badRegions: string[];
    entity: AmbientEntityCondition;
    init(engine: AmbientEngine): void;
    regionName(): string;
    value(env: AmbientEnvironment): AmbientSelection;
  }


  interface AmbientSelection extends AmbientVolume {}
  class AmbientSelection extends AmbientVolume {
    readonly condition: AmbientCondition;
    subSelection: AmbientSelection;
    constructor(condition: AmbientCondition);
    conditionVolume(): number;
    get properties(): AmbientSoundProperties;
    last(): AmbientSelection;
    settingVolume(): number;
    volume(): number;
  }


  interface AmbientSelectionMulti extends AmbientSelection {}
  class AmbientSelectionMulti extends AmbientSelection {
    constructor(selection: AmbientSelection, selections: AmbientSelection[]);
    conditionVolume(): number;
    settingVolume(): number;
    volume(): number;
  }


  class AmbientTime {
    static readonly PREMADE: HashMap;
    static readonly ANGLE_TO_TIME: number;
    static readonly TIME_TO_ANGLE: number;
    static readonly FADE: number;
    static readonly NONE: AmbientTime;
    static readonly DAY: AmbientTimePremade;
    static readonly NIGHT: AmbientTimePremade;
    static readonly SUNRISE: AmbientTimePremade;
    static readonly SUNSET: AmbientTimePremade;
    static readonly NOON: AmbientTimePremade;
    static readonly MIDNIGHT: AmbientTimePremade;
    toJson(): JsonElement;
    value(var1: AmbientEnvironment): number;
  }


  class AmbientVolume {
    static readonly SILENT: AmbientVolume;
    static readonly MAX: AmbientVolume;
    constructor(conditionVolume: number, settingVolume: number);

    constructor();
    conditionVolume(): number;
    copy(): AmbientVolume;
    mulCondition(volume: number): void;
    mulSetting(volume: number): void;
    mulVolume(selection: AmbientVolume): void;
    setConditionVolumeDirect(volume: number): void;
    settingVolume(): number;
    toString(): string;
    volume(): number;
  }

}

declare module 'team.creative.ambientsounds.condition.AmbientCondition' {
  import { Double } from 'java.lang';

  interface AmbientMinMaxFadeCondition extends AmbientMinMaxCondition {}
  class AmbientMinMaxFadeCondition extends AmbientMinMaxCondition {
    fade: number;
    volume(value: number): number;
  }


  interface AmbientMinMaxFadeSpecialCondition extends AmbientMinMaxFadeCondition {}
  class AmbientMinMaxFadeSpecialCondition extends AmbientMinMaxFadeCondition {
    volume(min: number, value: number, max: number): number;
    volume(value: number): number;
  }


  class AmbientMinMaxCondition {
    min: number;
    max: number;
    is(value: number): boolean;
    randomValue(): number;
  }

}

declare module 'team.creative.ambientsounds.condition.AmbientTime' {
  import { JsonElement, JsonDeserializer, JsonSerializer, JsonSerializationContext, JsonDeserializationContext } from 'com.google.gson';
  import { AmbientTime } from 'team.creative.ambientsounds.condition';
  import { Type } from 'java.lang.reflect';
  import { AmbientEnvironment } from 'team.creative.ambientsounds.environment';

  interface AmbientTimePremade extends AmbientTimeHour {}
  class AmbientTimePremade extends AmbientTimeHour {
    readonly name: string;
    constructor(name: string, fade: number, begin: number, end: number);

    constructor(name: string, ...times: number[]);
    toJson(): JsonElement;
  }


  interface Serializer extends JsonDeserializer<AmbientTime>, JsonSerializer<AmbientTime> {}
  class Serializer extends JsonDeserializer<AmbientTime> {
    deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): AmbientTime;
    serialize(src: AmbientTime, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  interface AmbientTimeMulti extends AmbientTime {}
  class AmbientTimeMulti extends AmbientTime {
    readonly times: AmbientTimePremade[];
    constructor(...times: AmbientTimePremade[]);
    toJson(): JsonElement;
    value(env: AmbientEnvironment): number;
  }


  interface AmbientTimeHour extends AmbientTime {}
  class AmbientTimeHour extends AmbientTime {
    constructor(...times: number[]);
    toJson(): JsonElement;
    value(env: AmbientEnvironment): number;
  }


  interface AmbientTimeSunAngle extends AmbientTime {}
  class AmbientTimeSunAngle extends AmbientTime {
    constructor(...times: number[]);
    toJson(): JsonElement;
    value(env: AmbientEnvironment): number;
  }

}

declare module 'team.creative.ambientsounds.dimension' {
  import { HashMap } from 'java.util';
  import { AmbientCondition } from 'team.creative.ambientsounds.condition';
  import { Boolean, Integer } from 'java.lang';
  import { AmbientRegion } from 'team.creative.ambientsounds.region';
  import { AmbientStackType, AmbientEngine } from 'team.creative.ambientsounds.engine';
  import { Gson, JsonElement } from 'com.google.gson';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';
  import { Level } from 'net.minecraft.world.level';
  import { AmbientEnvironment } from 'team.creative.ambientsounds.environment';

  class AmbientDimension {
    volumeSetting: number;
    loadedRegions: HashMap;
    biomeTypeSelectors: HashMap;
    name: string;
    mute: boolean;
    biomeSelector: AmbientCondition;
    night: boolean;
    rain: boolean;
    storm: boolean;
    dimensionNames: string[];
    badDimensionNames: string[];
    averageHeight: number;
    regions: AmbientRegion[];
    stack: AmbientStackType;
    init(engine: AmbientEngine): void;
    is(level: Level): boolean;
    load(engine: AmbientEngine, gson: Gson, manager: ResourceManager, element: JsonElement): void;
    manipulateEnviroment(env: AmbientEnvironment): void;
    toString(): string;
  }

}

declare module 'team.creative.ambientsounds.engine' {
  import { Exception, Enum } from 'java.lang';
  import { JsonElement } from 'com.google.gson';
  import { Field } from 'java.lang.reflect';
  import { List } from 'java.util';
  import { AmbientSoundEngine } from 'team.creative.ambientsounds.sound';
  import { AmbientEnvironment } from 'team.creative.ambientsounds.environment';
  import { LevelAccessor } from 'net.minecraft.world.level';

  class AmbientEngineConfig {
    defaultEngine: string;
    engines: string[];
  }


  interface AmbientEngineLoadException extends Exception {}
  class AmbientEngineLoadException extends Exception {
    constructor(message: string);
  }


  class AmbientLoader<T = any> {
    setNameAndLoad(var1: T, var2: string, var3: JsonElement): void;
  }


  interface AmbientStackType extends Enum<AmbientStackType> {}
  class AmbientStackType extends Enum<AmbientStackType> {
    static readonly overwrite: AmbientStackType;
    static readonly add: AmbientStackType;
    static readonly set: AmbientStackType;
    apply(var1: any, var2: Field, var3: any): void;
    static valueOf(name: string): AmbientStackType;
    static values(): AmbientStackType[];
  }


  class AmbientTickHandler {
    soundEngine: AmbientSoundEngine;
    environment: AmbientEnvironment;
    engine: AmbientEngine;
    timer: number;
    showDebugInfo: boolean;
    initConfiguration(): void;
    loadLevel(level: LevelAccessor): void;
    onRender(object: any): void;
    onTick(): void;
    scheduleReload(): void;
    setEngine(engine: AmbientEngine): void;
  }

}

declare module 'team.creative.ambientsounds.entity' {
  import { AmbientMinMaxFadeCondition } from 'team.creative.ambientsounds.condition.AmbientCondition';
  import { Map } from 'java.util';
  import { AmbientEngine } from 'team.creative.ambientsounds.engine';
  import { AmbientEnvironment } from 'team.creative.ambientsounds.environment';

  class AmbientEntityCondition {
    distance: AmbientMinMaxFadeCondition;
    distanceX: AmbientMinMaxFadeCondition;
    distanceY: AmbientMinMaxFadeCondition;
    distanceZ: AmbientMinMaxFadeCondition;
    count: AmbientMinMaxFadeCondition;
    name: string[];
    badName: string[];
    type: string[];
    badType: string[];
    scores: Map;
    tag: string[];
    badTag: string[];
    team: string[];
    badTeam: string[];
    nbt: string[];
    badNbt: string[];
    level: AmbientMinMaxFadeCondition;
    x_rotation: AmbientMinMaxFadeCondition;
    y_rotation: AmbientMinMaxFadeCondition;
    init(engine: AmbientEngine): void;
    value(env: AmbientEnvironment): number;
  }

}

declare module 'team.creative.ambientsounds.entity.AmbientEntityCondition' {
  import { TypeAdapter } from 'com.google.gson';
  import { JsonWriter, JsonReader } from 'com.google.gson.stream';

  interface StringJson extends TypeAdapter<string[]> {}
  class StringJson extends TypeAdapter<string[]> {
    read(inParameter: JsonReader): string[];
    write(out: JsonWriter, value: string[]): void;
  }

}

declare module 'team.creative.ambientsounds.environment' {
  import { AmbientDimension } from 'team.creative.ambientsounds.dimension';
  import { AmbientVolume } from 'team.creative.ambientsounds.condition';
  import { HashMap, Iterator } from 'java.util';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Level } from 'net.minecraft.world.level';
  import { AmbientEngine } from 'team.creative.ambientsounds.engine';
  import { DebugTextRenderer } from 'team.creative.creativecore.client.render.text';
  import { Iterable } from 'java.lang';
  import { Pair } from 'team.creative.creativecore.common.util.type.list';
  import { BiomeArea } from 'team.creative.ambientsounds.environment.BiomeEnvironment';
  import { Entity } from 'net.minecraft.world.entity';
  import { AirPocket, AirPocketScanner } from 'team.creative.ambientsounds.environment.pocket';
  import { MutableBlockPos } from 'BlockPos';

  class AmbientEnvironment {
    dimension: AmbientDimension;
    muted: boolean;
    night: boolean;
    sunAngle: number;
    dayTimeHour: number;
    rainSurfaceVolume: number;
    raining: boolean;
    snowing: boolean;
    thundering: boolean;
    biome: BiomeEnvironment;
    terrain: TerrainEnvironment;
    entity: EntityEnvironment;
    biomeVolume: AmbientVolume;
    biomeTypeVolumes: HashMap;
    absoluteHeight: number;
    relativeHeight: number;
    relativeMinHeight: number;
    relativeMaxHeight: number;
    underwater: number;
    temperature: number;
    analyzeFast(dimension: AmbientDimension, player: Player, level: Level, deltaTime: number): void;
    analyzeSlow(dimension: AmbientDimension, engine: AmbientEngine, player: Player, level: Level, deltaTime: number): void;
    analyzeTime(level: Level, deltaTime: number): void;
    analyzeUnderwater(player: Player, level: Level): void;
    collectBiomeDetails(text: DebugTextRenderer): void;
    collectLevelDetails(text: DebugTextRenderer): void;
    collectPlayerDetails(text: DebugTextRenderer, player: Player): void;
    collectTerrainDetails(text: DebugTextRenderer): void;
    isRainAudibleAtSurface(): boolean;
    reload(): void;
  }


  interface BiomeEnvironment extends Iterable<Pair> {}
  class BiomeEnvironment extends Iterable<Pair> {
    constructor();

    constructor(engine: AmbientEngine, player: Player, level: Level, volume: AmbientVolume);
    collectDetails(text: DebugTextRenderer): void;
    iterator(): Iterator<Pair<BiomeArea, AmbientVolume>>;
    rainVolume(): number;
  }


  class EntityEnvironment {
    all(): Iterable<Entity>;
    analyzeFast(dimension: AmbientDimension, player: Player, level: Level, deltaTime: number): void;
    squaredDistance(entity: Entity): number;
    x(): number;
    y(): number;
    z(): number;
  }


  class TerrainEnvironment {
    averageHeight: number;
    minHeight: number;
    maxHeight: number;
    airPocket: AirPocket;
    scanner: AirPocketScanner;
    analyze(engine: AmbientEngine, dimension: AmbientDimension, player: Player, level: Level): void;
    analyzeAirPocket(engine: AmbientEngine, player: Player, level: Level): void;
    analyzeHeight(engine: AmbientEngine, dimension: AmbientDimension, player: Player, level: Level): void;
    collectDetails(text: DebugTextRenderer): void;
    static getHeightBlock(level: Level, pos: MutableBlockPos): number;
  }

}

declare module 'team.creative.ambientsounds.environment.BiomeEnvironment' {
  import { Holder, BlockPos } from 'net.minecraft.core';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { BiomeCondition } from 'team.creative.ambientsounds.condition';

  class BiomeArea {
    readonly biome: Holder;
    readonly location: ResourceLocation;
    readonly pos: BlockPos;
    constructor(biome: Holder<Biome>, pos: BlockPos);
    checkBiome(conditions: BiomeCondition[]): boolean;
    equals(object: any): boolean;
    hashCode(): number;
  }

}

declare module 'team.creative.ambientsounds.environment.feature' {
  import { AmbientStackType } from 'team.creative.ambientsounds.engine';
  import { List, HashSet, HashMap } from 'java.util';
  import { Double } from 'java.lang';
  import { BlockDistribution } from 'team.creative.ambientsounds.environment.pocket';

  interface AmbientFeature extends AmbientFeatureSelection {}
  class AmbientFeature extends AmbientFeatureSelection {
    stack: AmbientStackType;
    name: string;
  }


  class AmbientFeatureSelection {
    group: List;
    groups: string[];
    and: AmbientFeatureSelection[];
    or: AmbientFeatureSelection[];
    not: AmbientFeatureSelection[];
    lowWeight: number;
    highWeight: number;
    lowCount: number;
    highCount: number;
    collectGroups(groups: HashSet<string>): void;
    volume(distribution: HashMap<string, BlockDistribution>): number;
  }

}

declare module 'team.creative.ambientsounds.environment.pocket' {
  import { HashMapDouble } from 'team.creative.creativecore.common.util.type.map';
  import { AmbientEngine } from 'team.creative.ambientsounds.engine';
  import { HashMap } from 'java.util';
  import { Thread } from 'java.lang';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { Consumer } from 'java.util.function';

  class AirPocket {
    readonly features: HashMapDouble;
    readonly averageLight: number;
    readonly averageBlockLight: number;
    readonly averageSkyLight: number;
    readonly air: number;
    readonly sky: number;
    constructor();

    constructor(engine: AmbientEngine, distribution: HashMap<string, BlockDistribution>, averageLight: number, averageBlockLight: number, averageSkyLight: number, air: number, sky: number);
    volume(features: string[]): number;
  }


  class AirPocketGroup {
    distance: number;
    weight: number;
  }


  interface AirPocketScanner extends Thread {}
  class AirPocketScanner extends Thread {
    readonly engine: AmbientEngine;
    readonly level: Level;
    readonly origin: BlockPos;
    constructor(engine: AmbientEngine, level: Level, origin: BlockPos, consumer: Consumer<AirPocket>);
    run(): void;
  }


  class BlockDistribution {
    percentage: number;
    count: number;
    add(count: number): void;
    add(dist: BlockDistribution): void;
    calculatePercentage(total: number): void;
    toString(): string;
  }

}

declare module 'team.creative.ambientsounds.environment.pocket.AirPocketScanner' {
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { Iterable } from 'java.lang';
  import { Iterator } from 'java.util';

  interface BlockPosInspection extends Iterable<Direction>, BlockPos {}
  class BlockPosInspection extends Iterable<Direction> {
    constructor(pos: BlockPos);

    constructor(pos: BlockPos, direction: Direction);
    add(direction: Direction): void;
    hasNext(): boolean;
    is(direction: Direction): boolean;
    isUp(): boolean;
    iterator(): Iterator<Direction>;
    next(): Direction;
  }

}

declare module 'team.creative.ambientsounds.mixin' {
  import { OggAudioStreamExtended } from 'team.creative.ambientsounds.sound';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ResourceProvider } from 'net.minecraft.server.packs.resources';

  interface OggAudioStreamMixin extends OggAudioStreamExtended {}
  class OggAudioStreamMixin extends OggAudioStreamExtended {
    setPositionRandomly(length: number, id: ResourceLocation): boolean;
  }


  class SoundBufferLibraryAccessor {
    get resourceManager(): ResourceProvider;
  }

}

declare module 'team.creative.ambientsounds.mod' {
  import { Player } from 'net.minecraft.world.entity.player';

  class SereneSeasonsCompat {
    static getTemperature(player: Player): number;
  }

}

declare module 'team.creative.ambientsounds.region' {
  import { AmbientCondition, AmbientSelection } from 'team.creative.ambientsounds.condition';
  import { AmbientStackType, AmbientEngine } from 'team.creative.ambientsounds.engine';
  import { AmbientSound } from 'team.creative.ambientsounds.sound';
  import { LinkedHashMap, List } from 'java.util';
  import { AmbientDimension } from 'team.creative.ambientsounds.dimension';
  import { Gson } from 'com.google.gson';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';
  import { AmbientEnvironment } from 'team.creative.ambientsounds.environment';

  interface AmbientRegion extends AmbientCondition {}
  class AmbientRegion extends AmbientCondition {
    name: string;
    stack: AmbientStackType;
    sounds: AmbientSound[];
    soundCollections: string[];
    volumeSetting: number;
    loadedSounds: LinkedHashMap;
    playing: List;
    dimension: AmbientDimension;
    activate(): void;
    deactivate(): void;
    fastTick(env: AmbientEnvironment): boolean;
    init(engine: AmbientEngine): void;
    isActive(): boolean;
    load(engine: AmbientEngine, gson: Gson, manager: ResourceManager): void;
    regionName(): string;
    tick(env: AmbientEnvironment): boolean;
    toString(): string;
    value(env: AmbientEnvironment): AmbientSelection;
  }

}

declare module 'team.creative.ambientsounds.sound' {
  import { AmbientCondition, AmbientSelection } from 'team.creative.ambientsounds.condition';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { SoundStream } from 'team.creative.ambientsounds.sound.AmbientSound';
  import { SoundSource } from 'net.minecraft.sounds';
  import { AmbientEngine, AmbientStackType } from 'team.creative.ambientsounds.engine';
  import { AmbientEnvironment } from 'team.creative.ambientsounds.environment';
  import { List, HashSet } from 'java.util';
  import { DebugTextRenderer } from 'team.creative.creativecore.client.render.text';
  import { SoundManager } from 'net.minecraft.client.sounds';
  import { Integer, Double } from 'java.lang';
  import { AmbientMinMaxCondition } from 'team.creative.ambientsounds.condition.AmbientCondition';
  import { AmbientMinMaxClimbingProperty } from 'team.creative.ambientsounds.sound.AmbientSoundProperties';

  interface AmbientSound extends AmbientCondition {}
  class AmbientSound extends AmbientCondition {
    volumeSetting: number;
    name: string;
    fullName: string;
    files: ResourceLocation[];
    chances: number[];
    category: string[];
    stream1: SoundStream;
    stream2: SoundStream;
    constructor();
    activate(): void;
    copy(): AmbientSound;
    deactivate(): void;
    fastTick(env: AmbientEnvironment): boolean;
    static getSoundSource(name: string): SoundSource;
    inTransition(): boolean;
    init(engine: AmbientEngine): void;
    isActive(): boolean;
    isAudible(): boolean;
    isPlaying(): boolean;
    loop(): boolean;
    onSoundFinished(): void;
    tick(env: AmbientEnvironment, selection: AmbientSelection): boolean;
    toString(): string;
    value(env: AmbientEnvironment): AmbientSelection;
  }


  interface AmbientSoundCategory extends AmbientCondition {}
  class AmbientSoundCategory extends AmbientCondition {
    parent: string;
    stack: AmbientStackType;
    name: string;
    volumeSetting: number;
    parentCategory: AmbientSoundCategory;
    children: List;
    selection: AmbientSelection;
    collectDetails(text: DebugTextRenderer): void;
    hashCode(): number;
    init(engine: AmbientEngine): void;
    postInit(remaining: HashSet<string>): void;
    tick(env: AmbientEnvironment, parentSelection: AmbientSelection): void;
  }


  class AmbientSoundCollection {
    stack: AmbientStackType;
    sounds: AmbientSound[];
  }


  class AmbientSoundEngine {
    get manager(): SoundManager;
    play(stream: SoundStream): void;
    playingCount(): number;
    stop(sound: SoundStream): void;
    stopAll(): void;
    tick(env: AmbientEnvironment): void;
  }


  class AmbientSoundProperties {
    transition: number;
    pitch: number;
    fadeVolume: number;
    fadeInVolume: number;
    fadeOutVolume: number;
    fadePitch: number;
    fadeInPitch: number;
    fadeOutPitch: number;
    mute: number;
    mutePriority: number;
    randomOffset: boolean;
    pause: AmbientMinMaxCondition;
    length: AmbientMinMaxCondition;
    underwaterPitch: AmbientMinMaxClimbingProperty;
    channel: string;
    getFadeInPitch(engine: AmbientEngine): number;
    getFadeInVolume(engine: AmbientEngine): number;
    getFadeOutPitch(engine: AmbientEngine): number;
    getFadeOutVolume(engine: AmbientEngine): number;
    getPitch(env: AmbientEnvironment): number;
    init(engine: AmbientEngine): void;
  }


  class OggAudioStreamExtended {
    setPositionRandomly(var1: number, var3: ResourceLocation): boolean;
  }

}

declare module 'team.creative.ambientsounds.sound.AmbientSound' {
  import { TickableSoundInstance, Sound } from 'net.minecraft.client.resources.sounds';
  import { SpecialSoundInstance } from 'team.creative.creativecore.client.sound';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { WeighedSoundEvents, SoundManager, AudioStream, SoundBufferLibrary } from 'net.minecraft.client.sounds';
  import { SoundSource } from 'net.minecraft.sounds';
  import { Attenuation } from 'SoundInstance';
  import { CompletableFuture } from 'java.util.concurrent';
  import { InputStream } from 'java.io';
  import { DebugTextRenderer } from 'team.creative.creativecore.client.render.text';

  interface SoundStream extends TickableSoundInstance, SpecialSoundInstance {}
  class SoundStream extends TickableSoundInstance {
    readonly index: number;
    readonly location: ResourceLocation;
    effectiveVolume: number;
    transitionVolume: number;
    soundeventaccessor: WeighedSoundEvents;
    pitch: number;
    duration: number;
    ticksPlayed: number;
    readonly category: SoundSource;
    constructor(index: number);
    canStartSilent(): boolean;
    collectDetails(text: DebugTextRenderer): void;
    combinedVolume(): number;
    conditionVolume(): number;
    create(inputstream: InputStream): AudioStream;
    get attenuation(): Attenuation;
    get delay(): number;
    get location(): ResourceLocation;
    get pitch(): number;
    get sound(): Sound;
    get source(): SoundSource;
    get volume(): number;
    get x(): number;
    get y(): number;
    get z(): number;
    getAudioStream(loader: SoundBufferLibrary, id: ResourceLocation, looping: boolean): CompletableFuture<AudioStream>;
    hasFinished(): boolean;
    hasPlayedOnce(): boolean;
    isLooping(): boolean;
    isRelative(): boolean;
    isStopped(): boolean;
    loop(): boolean;
    mute(): number;
    mutePriority(): number;
    onFinished(): void;
    onStart(): void;
    remaining(): number;
    resolve(sndHandler: SoundManager): WeighedSoundEvents;
    setPlayedOnce(): void;
    tick(): void;
    toString(): string;
  }

}

declare module 'team.creative.ambientsounds.sound.AmbientSoundProperties' {
  class AmbientMinMaxClimbingProperty {
    min: number;
    max: number;
    distanceFactor: number;
    getValue(value: number): number;
  }

}