declare module 'com.corosus.coroutil.command' {
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { ArgumentBuilder } from 'com.mojang.brigadier.builder';
  import { Iterable } from 'java.lang';

  class CommandCoroConfig {
    static argumentGet(): ArgumentBuilder<CommandSourceStack, any>;
    static argumentReload(side: string): ArgumentBuilder<CommandSourceStack, any>;
    static argumentSave(): ArgumentBuilder<CommandSourceStack, any>;
    static argumentSet(): ArgumentBuilder<CommandSourceStack, any>;
    static fileToConfig(str: string): string;
    static get commandName(): string;
    static get configs(): Iterable<string>;
    static getConfigSettings(config_name: string): Iterable<string>;
    static register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }


  class CommandCoroConfigClient {
    static get commandName(): string;
    static register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }

}

declare module 'com.corosus.coroutil.config' {
  import { IConfigCategory } from 'com.corosus.modconfig';

  interface ConfigCoroUtil extends IConfigCategory {}
  class ConfigCoroUtil extends IConfigCategory {
    static useLoggingLog: boolean;
    static useLoggingDebug: boolean;
    static useLoggingError: boolean;
    get category(): string;
    get configFileName(): string;
    get name(): string;
    get registryName(): string;
    hookUpdatedValues(): void;
  }

}

declare module 'com.corosus.coroutil.loader.neoforge' {
  import { Post } from 'ClientTickEvent';
  import { RegisterClientCommandsEvent } from 'net.neoforged.neoforge.client.event';
  import { ConfigMod, ModConfigData, IConfigCategory } from 'com.corosus.modconfig';
  import { ModContainer } from 'net.neoforged.fml';
  import { RegisterCommandsEvent } from 'net.neoforged.neoforge.event';
  import { Path } from 'java.nio.file';
  import { HashMap } from 'java.util';
  import { Class, Integer, Double, Boolean } from 'java.lang';

  class ClientEvents {
    onGameTick(event: Post): void;
    onRegisterCommandsClient(event: RegisterClientCommandsEvent): void;
  }


  interface ConfigModNeoForge extends ConfigMod {}
  class ConfigModNeoForge extends ConfigMod {
    static container: ModContainer;
    constructor(container: ModContainer);
    get configPath(): Path;
    registerCommands(event: RegisterCommandsEvent): void;
    reloadConfigs(side: string): void;
    test(container: ModContainer): void;
  }


  interface ModConfigDataNeoForge extends ModConfigData {}
  class ModConfigDataNeoForge extends ModConfigData {
    valsStringConfig: HashMap;
    valsIntegerConfig: HashMap;
    valsDoubleConfig: HashMap;
    valsBooleanConfig: HashMap;
    constructor(savePath: string, parStr: string, parClass: Class, parConfig: IConfigCategory);
    getConfigBoolean(fieldName: string): boolean;
    getConfigDouble(fieldName: string): number;
    getConfigInteger(fieldName: string): number;
    getConfigString(fieldName: string): string;
    setConfig<T>(fieldName: string, obj: T): void;
    writeConfigFile(resetConfig: boolean): void;
  }

}

declare module 'com.corosus.coroutil.repack.de.androidpit.colorthief' {
  import { BufferedImage } from 'java.awt.image';
  import { CMap } from 'com.corosus.coroutil.repack.de.androidpit.colorthief.MMCQ';

  class ColorThief {
    static getColor(sourceImage: BufferedImage): number[];
    static getColor(sourceImage: BufferedImage, quality: number, ignoreWhite: boolean): number[];
    static getColorMap(sourceImage: BufferedImage, colorCount: number): CMap;
    static getColorMap(sourceImage: BufferedImage, colorCount: number, quality: number, ignoreWhite: boolean): CMap;
    static getPalette(sourceImage: BufferedImage, colorCount: number): int[][];
    static getPalette(sourceImage: BufferedImage, colorCount: number, quality: number, ignoreWhite: boolean): int[][];
  }


  class MMCQ {
    static quantize(pixels: int[][], maxcolors: number): CMap;
  }


  class RGBUtil {
    static packRGB(rgb: number[]): number;
    static packRGBArray(rgbArray: int[][]): number[];
    static unpackRGB(packedRgb: number): number[];
    static unpackRGBArray(packedRgbArray: number[]): int[][];
  }

}

declare module 'com.corosus.coroutil.repack.de.androidpit.colorthief.MMCQ' {
  import { ArrayList } from 'java.util';
  import { int[] } from 'com.corosus.coroutil.repack.de.androidpit.colorthief';

  class VBox {
    constructor(r1: number, r2: number, g1: number, g2: number, b1: number, b2: number, histo: number[]);
    avg(force: boolean): number[];
    clone(): VBox;
    contains(pixel: number[]): boolean;
    count(force: boolean): number;
    toString(): string;
    volume(force: boolean): number;
  }


  class CMap {
    readonly vboxes: ArrayList;
    map(color: number[]): number[];
    nearest(color: number[]): number[];
    palette(): int[][];
    push(box: VBox): void;
    size(): number;
  }

}

declare module 'com.corosus.coroutil.util' {
  import { BlockPos } from 'net.minecraft.core';
  import { Block } from 'net.minecraft.world.level.block';
  import { UUID, Random, List } from 'java.util';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Mob, Entity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { ModConfigData, IConfigCategory } from 'com.corosus.modconfig';
  import { Class } from 'java.lang';
  import { Method, Constructor, Field } from 'java.lang.reflect';

  interface ChunkCoordinatesBlock extends BlockPos {}
  class ChunkCoordinatesBlock extends BlockPos {
    block: Block;
    constructor(par1: number, par2: number, par3: number, parBlockID: Block);

    constructor(par1BlockCoord: BlockPos, parBlockID: Block);
  }


  class CoroUtilAttributes {
    static readonly SPEED_BOOST_UUID: UUID;
  }


  class CoroUtilBlock {
    static blockPos(x: number, y: number, z: number): BlockPos;
    static blockPos(vec: Vec3): BlockPos;
    static isAir(parBlock: Block): boolean;
  }


  class CoroUtilColor {
  }


  class CoroUtilCompatibility {
    static coldEnoughToSnow(biome: Biome, pos: BlockPos, levelReader: Level): boolean;
    static getAdjustedTemperature(world: Level, biome: Biome, pos: BlockPos): number;
    static isSereneSeasonsInstalled(): boolean;
    static tryPathToXYZModCompat(ent: Mob, x: number, y: number, z: number, speed: number): boolean;
    static tryPathToXYZVanilla(ent: Mob, x: number, y: number, z: number, speed: number): boolean;
    static warmEnoughToRain(biome: Biome, pos: BlockPos, levelReader: Level): boolean;
  }


  class CoroUtilEntity {
    static canSee(p_70685_1_: Entity, pos: BlockPos): boolean;
    static getName(ent: Entity): string;
  }


  class CoroUtilEntOrParticle {
    static getDistance(obj: any, x: number, y: number, z: number): number;
    static getMotionX(obj: any): number;
    static getMotionY(obj: any): number;
    static getMotionZ(obj: any): number;
    static getPosX(obj: any): number;
    static getPosY(obj: any): number;
    static getPosZ(obj: any): number;
    static getWorld(obj: any): Level;
    static setMotionX(obj: any, val: number): void;
    static setMotionY(obj: any, val: number): void;
    static setMotionZ(obj: any, val: number): void;
    static setPosX(obj: any, val: number): void;
    static setPosY(obj: any, val: number): void;
    static setPosZ(obj: any, val: number): void;
  }


  class CoroUtilMisc {
    static random: Random;
    static adjVal(source: number, target: number, adj: number): number;
    static random(): Random;
  }


  class CoroUtilParticle {
    static rainPositions: Vec3[];
    static maxRainDrops: number;
    static rand: Random;
    static getWorldParticle(obj: any): Level;
  }


  class CoroUtilPath {
    static tryMoveToEntityLivingLongDist(entSource: Mob, entityTo: Entity, moveSpeedAmp: number): boolean;
    static tryMoveToXYZLongDist(ent: Mob, x: number, y: number, z: number, moveSpeedAmp: number): boolean;
  }


  class CoroUtilPhysics {
    static distBetween(x: number, y: number, x1: number, y1: number): number;
    static distBetweenPointAndLine(x: number, y: number, x1: number, y1: number, x2: number, y2: number): number;
    static getDistanceToShape(point: Vec3, nodes: Vec3[]): number;
    static isInConvexShape(test: Vec3, nodes: Vec3[]): boolean;
  }


  class CoroUtilWorldTime {
    static get dayFirstTick(): number;
    static get dayLength(): number;
    static get nightFirstTick(): number;
    static isNight(world: Level): boolean;
    static isNightPadded(world: Level): boolean;
    static isNightPadded(world: Level, padding: number): boolean;
  }


  class CU {
    static random: Random;
    static rand(): Random;
  }


  class CULog {
    static dbg(string: string): void;
    static err(string: string): void;
    static log(string: string): void;
  }


  class MultiLoaderUtil {
    static instance(): MultiLoaderUtil;
    isFabric(): boolean;
    isForge(): boolean;
    isNeoForge(): boolean;
    makeLoaderSpecificConfigData(savePath: string, parStr: string, parClass: Class, parConfig: IConfigCategory): ModConfigData;
  }


  class OldUtil {
    static getPrivateValue(var0: Class, var1: any, var2: string): any;
    static setPrivateValue<T, E>(classToAccess: Class<T>, instance: T, fieldName: string, value: E): void;
  }


  class ReflectionHelper {
    static findConstructor<T>(clazz: Class<T>, ...parameterTypes: Class<any>[]): Constructor<T>;
    static findField<T>(clazz: Class<T>, fieldName: string): Field;
    static findMethod(clazz: Class<any>, methodName: string, ...parameterTypes: Class<any>[]): Method;
    static getPrivateValue<T, E>(classToAccess: Class<E>, instance: E, fieldName: string): T;
    static setPrivateValue<T, E>(classToAccess: Class<T>, instance: T, value: E, fieldName: string): void;
  }

}

declare module 'com.corosus.coroutil.util.ReflectionHelper' {
  import { RuntimeException, Throwable } from 'java.lang';

  interface UnableToFindFieldException extends RuntimeException {}
  class UnableToFindFieldException extends RuntimeException {
  }


  interface UnableToAccessFieldException extends RuntimeException {}
  class UnableToAccessFieldException extends RuntimeException {
  }


  interface UnableToFindMethodException extends RuntimeException {}
  class UnableToFindMethodException extends RuntimeException {
    constructor(failed: Throwable);
  }


  interface UnknownConstructorException extends RuntimeException {}
  class UnknownConstructorException extends RuntimeException {
    constructor(message: string);
  }

}

declare module 'com.corosus.modconfig' {
  import { Comparator, List, Map, HashMap } from 'java.util';
  import { Path } from 'java.nio.file';
  import { ConcurrentHashMap } from 'java.util.concurrent';
  import { Class, Integer, Double, Boolean } from 'java.lang';

  class ConfigAddQueue {
    modID: string;
    config: IConfigCategory;
    constructor(modID: string, config: IConfigCategory);
  }


  interface ConfigComparatorName extends Comparator<ConfigEntryInfo> {}
  class ConfigComparatorName extends Comparator<ConfigEntryInfo> {
    compare(arg0: ConfigEntryInfo, arg1: ConfigEntryInfo): number;
  }


  class ConfigEntryInfo {
    index: number;
    name: string;
    value: any;
    comment: string;
    markForUpdate: boolean;
    constructor(parIndex: number, parName: string, parVal: any, parComment: string);
  }


  class ConfigMod {
    static readonly MODID: string;
    configFolder: Path;
    constructor();
    static addConfigFile(modID: string, configCat: IConfigCategory): void;
    static forceSaveAllFilesFromRuntimeSettings(): void;
    get configPath(): Path;
    init(): void;
    static instance(): ConfigMod;
    reloadConfigs(var1: string): void;
  }


  class CoroConfigRegistry {
    configs: List;
    liveEditConfigs: List;
    lookupRegistryNameToConfig: ConcurrentHashMap;
    lookupFilePathToConfig: ConcurrentHashMap;
    needsInitialConfigRegistration: boolean;
    addConfigFile(modID: string, configCat: IConfigCategory): void;
    allModsConfigsLoadedAndRegisteredHook(): void;
    static dbg(obj: any): void;
    forceLoadRuntimeSettingsFromFile(): void;
    forceSaveAllFilesFromRuntimeSettings(): void;
    getComment(configID: string, name: string): string;
    getField(configID: string, name: string): any;
    static instance(): CoroConfigRegistry;
    onLoadOrReload(filename: string): void;
    processHashMap(modid: string, map: Map): void;
    updateAllConfigsFromForge(): void;
    updateField(configID: string, name: string, obj: any): boolean;
  }


  class IConfigCategory {
    get category(): string;
    get configFileName(): string;
    get name(): string;
    get registryName(): string;
    hookUpdatedValues(): void;
  }


  class IConfigInstance {
    readData(): void;
    writeData(): void;
  }


  class ModConfigData {
    configID: string;
    configClass: Class;
    configInstance: IConfigCategory;
    valsString: HashMap;
    valsInteger: HashMap;
    valsDouble: HashMap;
    valsBoolean: HashMap;
    configData: List;
    saveFilePath: string;
    constructor(savePath: string, parStr: string, parClass: Class, parConfig: IConfigCategory);
    getConfigBoolean(var1: string): boolean;
    getConfigDouble(var1: string): number;
    getConfigInteger(var1: string): number;
    getConfigString(var1: string): string;
    initData(): void;
    setConfig<T>(var1: string, var2: T): void;
    setFieldBasedOnType(name: string, obj: any): boolean;
    updateConfigFieldValues(): void;
    updateConfigFileWithRuntimeValues(): void;
    updateField(name: string, obj: any): boolean;
    updateHashMaps(): void;
    writeConfigFile(var1: boolean): void;
  }

}