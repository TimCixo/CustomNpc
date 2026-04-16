declare module 'com.cupboard.config' {
  import { JsonObject } from 'com.google.gson';

  interface CommonConfiguration extends ICommonConfig {}
  class CommonConfiguration extends ICommonConfig {
    showCommandExecutionErrors: boolean;
    debugChunkloadAttempts: boolean;
    logOffthreadEntityAdd: boolean;
    skipErrorOnEntityLoad: boolean;
    forceHeapDumpOnOOM: boolean;
    deserialize(data: JsonObject): void;
    serialize(): JsonObject;
  }


  class CupboardConfig<C extends ICommonConfig = any> {
    constructor(filename: string, commonConfig: C);
    equals(o: any): boolean;
    get commonConfig(): C;
    hashCode(): number;
    static initloadAll(): void;
    load(): void;
    load(manualReload: boolean): void;
    static pollConfigs(): void;
    save(): void;
  }


  class ICommonConfig {
    deserialize(var1: JsonObject): void;
    serialize(): JsonObject;
  }

}

declare module 'com.cupboard' {
  import { Logger } from 'org.apache.logging.log4j';
  import { CupboardConfig } from 'com.cupboard.config';
  import { Random } from 'java.util';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';
  import { FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';

  class Cupboard {
    static readonly MOD_ID: string;
    static readonly LOGGER: Logger;
    static config: CupboardConfig;
    static rand: Random;
    constructor(modEventBus: IEventBus, modContainer: ModContainer);
    clientSetup(event: FMLClientSetupEvent): void;
  }


  class CupboardClient {
    static onInitializeClient(event: FMLClientSetupEvent): void;
  }

}

declare module 'com.cupboard.event' {
  import { Post } from 'ClientTickEvent';
  import { Opening } from 'ScreenEvent';
  import { Post as servertickevent_Post } from 'ServerTickEvent';
  import { ServerStartedEvent } from 'net.neoforged.neoforge.event.server';

  class ClientEventHandler {
    static onClientTick(event: Post): void;
    static onClientTick(event: Opening): void;
  }


  class EventHandler {
    static onServerTick(event: servertickevent_Post): void;
    static serverstart(event: ServerStartedEvent): void;
  }


  class ModEventHandler {
  }

}

declare module 'com.cupboard.mixin' {
  import { Entity } from 'net.minecraft.world.entity';

  class ChunkLoadDebug {
  }


  class CommandExceptionLoggingMixin {
  }


  class EntityLoadMixin {
    get x(): number;
    get xRot(): number;
    get y(): number;
    get yRot(): number;
    get z(): number;
    set xRot(var1: number);
    set yRot(var1: number);
    setPosRaw(var1: number, var3: number, var5: number): void;
  }


  class ServerAddEntityMixin {
    addEntity(var1: Entity): boolean;
  }


  class ThreadingDetectorMixin {
  }

}

declare module 'com.cupboard.util' {
  import { BlockPos } from 'net.minecraft.core';
  import { BlockGetter } from 'net.minecraft.world.level';
  import { BiPredicate } from 'java.util.function';
  import { Vec3 } from 'net.minecraft.world.phys';

  class BlockSearch {
    static findAround(world: BlockGetter, start: BlockPos, verticalRange: number, horizontalRange: number, yStep: number, predicate: BiPredicate<BlockGetter, BlockPos>): BlockPos;
  }


  class MathUtil {
    static limitToMax(value: number, max: number): number;
    static limitToMax(value: number, max: number): number;
    static limitToMin(value: number, min: number): number;
    static limitToMin(value: number, min: number): number;
    static limitToMinMax(value: number, min: number, max: number): number;
    static minMax(value: number, min: number, max: number): number;
  }


  class VectorUtil {
    static rotateLeft(vec: Vec3): Vec3;
    static rotateRight(vec: Vec3): Vec3;
  }

}