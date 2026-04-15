declare module 'org.thinkingstudio.mafglib.helper' {
  import { PackResources, PackType, PackLocationInfo } from 'net.minecraft.server.packs';
  import { RepositorySource, Pack } from 'net.minecraft.server.packs.repository';
  import { ResourcesSupplier, Position, Metadata } from 'Pack';
  import { CachedOutput, PackOutput, DataProvider } from 'net.minecraft.data';
  import { ModContainer } from 'net.neoforged.fml';
  import { Component } from 'net.minecraft.network.chat';
  import { ExistingFileHelper } from 'net.neoforged.neoforge.common.data';
  import { Consumer } from 'java.util.function';
  import { IoSupplier } from 'net.minecraft.server.packs.resources';
  import { InputStream } from 'java.io';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ResourceOutput } from 'PackResources';
  import { Set } from 'java.util';
  import { MetadataSectionSerializer } from 'net.minecraft.server.packs.metadata';
  import { Path } from 'java.nio.file';
  import { HashCode } from 'com.google.common.hash';

  interface RuntimePackHelper extends PackResources, RepositorySource, ResourcesSupplier, CachedOutput {}
  class RuntimePackHelper extends PackResources {
    addDataProvider(provider: DataProvider): void;
    close(): void;
    static createRuntimePack(name: string, modContainer: ModContainer, type: PackType, position: Position, title: Component, description: Component): RuntimePackHelper;
    get existingFileHelper(): ExistingFileHelper;
    get packOutput(): PackOutput;
    getMetadataSection<T>(deserializer: MetadataSectionSerializer<T>): T;
    getNamespaces(type: PackType): Set<string>;
    getResource(type: PackType, location: ResourceLocation): IoSupplier<InputStream>;
    getRootResource(...pathName: string[]): IoSupplier<InputStream>;
    listResources(type: PackType, namespace: string, directory: string, output: ResourceOutput): void;
    loadPacks(loader: Consumer<Pack>): void;
    location(): PackLocationInfo;
    openFull(info: PackLocationInfo, metadata: Metadata): PackResources;
    openPrimary(info: PackLocationInfo): PackResources;
    static simpleRuntimePack(modId: string, type: PackType): RuntimePackHelper;
    writeIfNeeded(filePath: Path, data: number[], hashCode: HashCode): void;
  }

}

declare module 'org.thinkingstudio.mafglib.loader.entrypoints' {
  import { IExtensionPoint } from 'net.neoforged.fml';
  import { IConfigScreenFactory } from 'net.neoforged.neoforge.client.gui';
  import { IEventBus } from 'net.neoforged.bus.api';

  interface ConfigScreenEntrypoint extends IExtensionPoint {}
  class ConfigScreenEntrypoint extends IExtensionPoint {
    get modConfigScreenFactory(): IConfigScreenFactory;
  }


  class EntrypointHandler {
    static init(modEventBus: IEventBus): void;
  }

}

declare module 'org.thinkingstudio.mafglib.loader' {
  import { IEventBus, Event } from 'net.neoforged.bus.api';
  import { Class } from 'java.lang';
  import { Consumer } from 'java.util.function';
  import { ModContainer, IExtensionPoint } from 'net.neoforged.fml';
  import { Path } from 'java.nio.file';

  class FoxifiedLoader {
    static get configDir(): Path;
    static get modContainers(): ModContainer;
    static getModVersion(modId: string): string;
    static isModLoaded(modId: string): boolean;
    static registerEvent<T extends Event>(eventBus: IEventBus, eventType: Class<T>, consumer: Consumer<T>): void;
    static registerExtensionPoint<T extends IExtensionPoint>(modContainer: ModContainer, point: Class<T>, extension: T): void;
  }

}

declare module 'org.thinkingstudio.mafglib.loader.gui' {
  import { IConfigScreenFactory } from 'net.neoforged.neoforge.client.gui';

  interface ModConfigScreenFactory extends IConfigScreenFactory {}
  class ModConfigScreenFactory extends IConfigScreenFactory {
  }


  class ModConfigScreenInitializer {
    get modConfigScreenFactory(): ModConfigScreenFactory;
  }

}

declare module 'org.thinkingstudio.mafglib.utils' {
  import { ModContainer } from 'net.neoforged.fml';
  import { ConfigScreenProvider } from 'org.thinkingstudio.mafglib.utils.NeoUtils';
  import { Function } from 'java.util.function';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ArtifactVersion } from 'org.apache.maven.artifact.versioning';

  class NeoUtils {
    static get instance(): NeoUtils;
    getModArtifactVersion(modId: string): ArtifactVersion;
    registerConfigScreen(modContainer: ModContainer, screenFunction: Function<Screen, Screen>): void;
    registerModConfigScreen(modContainer: ModContainer, configScreenProvider: ConfigScreenProvider): void;
  }

}

declare module 'org.thinkingstudio.mafglib.utils.NeoUtils' {
  import { Screen } from 'net.minecraft.client.gui.screens';

  class ConfigScreenProvider {
    provide(var1: Screen): Screen;
  }

}