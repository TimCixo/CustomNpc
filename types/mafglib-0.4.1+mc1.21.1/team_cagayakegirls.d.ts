declare module 'team.cagayakegirls.mafglib' {
  import { ModContainer } from 'net.neoforged.fml';
  import { IEventBus } from 'net.neoforged.bus.api';

  class MaFgLib {
    static readonly MOD_ID: string;
    constructor(modContainer: ModContainer, modEventBus: IEventBus);
  }

}

declare module 'team.cagayakegirls.mafglib.utils' {
  import { Path } from 'java.nio.file';
  import { List } from 'java.util';
  import { IModInfo } from 'net.neoforged.neoforgespi.language';

  class DataGenProvider {
  }


  class ModPlatform {
    static get allMods(): IModInfo[];
    static get configDir(): Path;
    static isModLoaded(modId: string): boolean;
  }

}

declare module 'team.cagayakegirls.mafglib.utils.DataGenProvider' {
  import { ItemTagsProvider } from 'net.minecraft.data.tags';
  import { PackOutput } from 'net.minecraft.data';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';
  import { TagLookup } from 'TagsProvider';
  import { Block } from 'net.minecraft.world.level.block';
  import { ExistingFileHelper, BlockTagsProvider } from 'net.neoforged.neoforge.common.data';

  interface ItemTags extends ItemTagsProvider {}
  class ItemTags extends ItemTagsProvider {
    constructor(output: PackOutput, lookupProvider: CompletableFuture<Provider>, blockTagProvider: CompletableFuture<TagLookup<Block>>, existingFileHelper: ExistingFileHelper);
  }


  interface BlockTags extends BlockTagsProvider {}
  class BlockTags extends BlockTagsProvider {
    constructor(output: PackOutput, lookupProvider: CompletableFuture<Provider>, existingFileHelper: ExistingFileHelper);
  }

}