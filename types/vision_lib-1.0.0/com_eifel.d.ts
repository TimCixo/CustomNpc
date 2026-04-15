declare module 'com.eifel.vision.api' {
  class PublicTokenData {
    constructor(token: string, lifetimeSeconds: number);
    get lifetimeSeconds(): number;
    get token(): string;
  }


  class PublicTokenFetcher {
    static readonly INSTANCE: PublicTokenFetcher;
    getPublicUploadToken(masterApiKey: string): PublicTokenData;
  }

}

declare module 'com.eifel.vision.command' {
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack, CommandSource } from 'net.minecraft.commands';
  import { MinecraftServer } from 'net.minecraft.server';

  class VisionCommand {
    static readonly INSTANCE: VisionCommand;
    execute(server: MinecraftServer, sender: CommandSource, args: string[]): void;
    register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }

}

declare module 'com.eifel.vision.config' {
  import { ModConfigSpec } from 'net.neoforged.neoforge.common';
  import { List } from 'java.util';
  import { Runnable } from 'java.lang';
  import { Builder } from 'ModConfigSpec';
  import { Function1 } from 'kotlin.jvm.functions';
  import { Unit } from 'kotlin';

  class Configuration {
    static readonly INSTANCE: Configuration;
    static CONFIG: Configuration;
    static CONFIG_SPEC: ModConfigSpec;
    static secretKey: StringProperty;
    static url: StringProperty;
    endCategory(builder: Builder): Builder;
    get cONFIG(): Configuration;
    get cONFIG_SPEC(): ModConfigSpec;
    get initializers(): Runnable[];
    get mAIN_CONFIG(): string;
    get properties(): IProperty[];
    get secretKey(): StringProperty;
    get url(): StringProperty;
    init(): void;
    initAfter(): void;
    loadConfig(builder: Builder): void;
    markCategory(builder: Builder, superCat: string, cat: string): Builder;
    reloadConfig(): void;
    saveConfig(): void;
    set cONFIG(configuration: Configuration);
    set cONFIG_SPEC(modConfigSpec: ModConfigSpec);
    set properties(list: IProperty[]);
    set secretKey(stringProperty: StringProperty);
    set url(stringProperty: StringProperty);
  }


  class ConfigurationPropertiesKt {
    static initAfter<T>($this$initAfter: T, block: Function1<T, Unit>): void;
  }


  class IProperty {
    get (): any;
    save(): void;
  }

}

declare module 'com.eifel.vision.event' {
  import { Post } from 'ClientTickEvent';
  import { Post as servertickevent_Post } from 'ServerTickEvent';

  class ClientEvents {
    static readonly INSTANCE: ClientEvents;
    static onClientTick(event: Post): void;
  }


  class ServerEvents {
    static readonly INSTANCE: ServerEvents;
    static onTickServer(event: servertickevent_Post): void;
  }

}

declare module 'com.eifel.vision' {
  import { Map, List } from 'java.util';
  import { ExecutorService } from 'java.util.concurrent';
  import { RenderTarget } from 'com.mojang.blaze3d.pipeline';
  import { Player } from 'org.bukkit.entity';
  import { Player as net_minecraft_world_entity_player_Player } from 'net.minecraft.world.entity.player';
  import { CommandSource } from 'net.minecraft.commands';
  import { RegisterCommandsEvent } from 'net.neoforged.neoforge.event';
  import { FMLClientSetupEvent, FMLCommonSetupEvent } from 'net.neoforged.fml.event.lifecycle';

  class Info {
    static readonly INSTANCE: Info;
    static readonly SERVER: boolean;
    static readonly MOD_ID: string;
  }


  class Manager {
    static readonly INSTANCE: Manager;
    doDoable(nickname: string, width: number, height: number, framebuffer: RenderTarget): void;
    get executor(): ExecutorService;
    get publicToken(): string;
    get requests(): Map<string, string[]>;
    get url(): string;
    getDoDoable(): boolean;
    set publicToken(string: string);
    set requests(map: Map<string, string[]>);
    set url(string: string);
    setDoDoable(bl: boolean): void;
  }


  class PexUtilsKt {
    static hasPermission(sender: string, s: string): boolean;
    static hasPermission(sender: CommandSource, s: string): boolean;
    static toBukkitPlayer(player: net_minecraft_world_entity_player_Player): Player;
    static toBukkitPlayer(player: string): Player;
  }


  class Vision {
    static readonly INSTANCE: Vision;
    onClientSetup(e: FMLClientSetupEvent): void;
    onCommonSetup(e: FMLCommonSetupEvent): void;
    serverStarting(e: RegisterCommandsEvent): void;
  }

}

declare module 'com.eifel.vision.network' {
  class NetworkManager {
    static readonly INSTANCE: NetworkManager;
  }

}

declare module 'com.eifel.vision.sub' {
  import { Runnable } from 'java.lang';
  import { BufferedImage } from 'java.awt.image';

  interface VisionObject extends Runnable {}
  class VisionObject extends Runnable {
    constructor(image: BufferedImage, publicToken: string, url: string);
    get publicToken(): string;
    get url(): string;
    run(): void;
    uploadImage(image: BufferedImage, fileName: string, imageFormat: string, publicToken: string): string;
  }

}

declare module 'com.eifel.vision.tasks' {
  import { ListenableFuture } from 'com.google.common.util.concurrent';
  import { Runnable } from 'java.lang';

  class Task {
    constructor();
    addScheduledTask(runnableToSchedule: Runnable): ListenableFuture<any>;
    check(): void;
  }


  class TaskCore {
    static readonly INSTANCE: TaskCore;
    get mAIN_SERVER(): Task;
  }

}