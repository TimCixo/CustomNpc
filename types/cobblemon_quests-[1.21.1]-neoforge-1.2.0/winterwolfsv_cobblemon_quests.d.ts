declare module 'winterwolfsv.cobblemon_quests' {
  import { CobblemonQuestsLogger } from 'winterwolfsv.cobblemon_quests.logger';
  import { Path } from 'java.nio.file';
  import { CobblemonQuestsEventHandler } from 'winterwolfsv.cobblemon_quests.events';

  class CobblemonQuests {
    static readonly MOD_ID: string;
    static readonly LOGGER: CobblemonQuestsLogger;
    static configPath: Path;
    static eventHandler: CobblemonQuestsEventHandler;
    static init(configPath: Path, useConfig: boolean): void;
  }

}

declare module 'winterwolfsv.cobblemon_quests.commands.arguments.types' {
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { List } from 'java.util';
  import { CommandContext } from 'com.mojang.brigadier.context';
  import { StringReader } from 'com.mojang.brigadier';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Suggestions, SuggestionsBuilder } from 'com.mojang.brigadier.suggestion';

  interface ActionListArgumentType extends ArgumentType<List> {}
  class ActionListArgumentType extends ArgumentType<List> {
    static actionList(): ActionListArgumentType;
    static getActionList(context: CommandContext<any>, name: string): string[];
    listSuggestions<S>(context: CommandContext<S>, builder: SuggestionsBuilder): CompletableFuture<Suggestions>;
    parse(reader: StringReader): string[];
  }

}

declare module 'winterwolfsv.cobblemon_quests.commands' {
  import { CommandNode } from 'com.mojang.brigadier.tree';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { CommandDispatcher } from 'com.mojang.brigadier';

  class BlacklistPokemonCommand {
    static register(): CommandNode<CommandSourceStack>;
  }


  class GivePokemonCommand {
    static register(): CommandNode<CommandSourceStack>;
  }


  class RegisterCommands {
    static register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }


  class SuppressWarningsCommand {
    static register(): CommandNode<CommandSourceStack>;
  }

}

declare module 'winterwolfsv.cobblemon_quests.commands.suggestions' {
  import { SuggestionProvider, Suggestions, SuggestionsBuilder } from 'com.mojang.brigadier.suggestion';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { List } from 'java.util';
  import { CompletableFuture } from 'java.util.concurrent';
  import { CommandContext } from 'com.mojang.brigadier.context';

  interface ListSuggestionProvider extends SuggestionProvider<CommandSourceStack> {}
  class ListSuggestionProvider extends SuggestionProvider<CommandSourceStack> {
    constructor(suggestions: E[]);
    getSuggestions(context: CommandContext<CommandSourceStack>, builder: SuggestionsBuilder): CompletableFuture<Suggestions>;
  }

}

declare module 'winterwolfsv.cobblemon_quests.config' {
  import { Path } from 'java.nio.file';
  import { List } from 'java.util';

  class CobblemonQuestsConfig {
    static configPath: Path;
    static configVersion: number;
    static ignoredPokemon: List;
    static suppressWarnings: boolean;
    static init(): void;
    static save(): void;
  }

}

declare module 'winterwolfsv.cobblemon_quests.events' {
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';
  import { ServerPlayer } from 'net.minecraft.server.level';

  class CobblemonQuestsEventHandler {
    init(): CobblemonQuestsEventHandler;
    pokemonCatch(pokemon: Pokemon, player: ServerPlayer): void;
    processTasksForTeam(pokemon: Pokemon, action: string, amount: number, player: ServerPlayer): void;
    processTasksForTeam(data: string, action: string, amount: number, player: ServerPlayer): void;
  }

}

declare module 'winterwolfsv.cobblemon_quests.logger' {
  import { Level } from 'java.util.logging';

  class CobblemonQuestsLogger {
    info(message: string): void;
    log(level: Level, message: string): void;
    warning(message: string): void;
  }

}

declare module 'winterwolfsv.cobblemon_quests.neoforge' {
  import { IEventBus } from 'net.neoforged.bus.api';

  class Cobblemon_QuestsNeoForge {
    constructor(modEventBus: IEventBus);
  }

}

declare module 'winterwolfsv.cobblemon_quests.neoforge.config' {
  import { RegisterCommandsEvent } from 'net.neoforged.neoforge.event';

  class ConfigCommandsForge {
    static registerCommands(event: RegisterCommandsEvent): void;
  }

}

declare module 'winterwolfsv.cobblemon_quests.tasks' {
  import { Task, TaskType } from 'dev.ftb.mods.ftbquests.quest.task';
  import { Icon } from 'dev.ftb.mods.ftblibrary.icon';
  import { ArrayList, List } from 'java.util';
  import { Quest, TeamData } from 'dev.ftb.mods.ftbquests.quest';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { ConfigGroup } from 'dev.ftb.mods.ftblibrary.config';
  import { Component } from 'net.minecraft.network.chat';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { PokedexManager } from 'com.cobblemon.mod.common.api.pokedex';

  interface CobblemonTask extends Task {}
  class CobblemonTask extends Task {
    pokeBallIcon: Icon;
    amount: number;
    shiny: boolean;
    timeMin: number;
    timeMax: number;
    minLevel: number;
    maxLevel: number;
    dexProgress: string;
    actions: ArrayList;
    biomes: ArrayList;
    dimensions: ArrayList;
    forms: ArrayList;
    genders: ArrayList;
    pokeBallsUsed: ArrayList;
    pokemons: ArrayList;
    pokemonTypes: ArrayList;
    regions: ArrayList;
    natures: ArrayList;
    constructor(id: number, quest: Quest);
    fillConfigGroup(config: ConfigGroup): void;
    get altIcon(): Icon;
    get altTitle(): Component;
    get maxProgress(): number;
    get type(): TaskType;
    getIconFromIdentifier(ResourceLocation2: ResourceLocation): Icon;
    getPokemonIcon(pokemon: ResourceLocation): Icon;
    increase(teamData: TeamData, pokemon: Pokemon, executedAction: string, progress: number, player: ServerPlayer): void;
    increaseHaveRegistered(teamData: TeamData, pokedexManager: PokedexManager): void;
    increaseWoPokemon(teamData: TeamData, data: string, executedAction: string, progress: number): void;
    readData(nbt: CompoundTag, provider: Provider): void;
    readList(s: string): ArrayList<string>;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeList(list: ArrayList<string>): string;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  class PokemonTaskTypes {
    static readonly icon: ResourceLocation;
    static readonly COBBLEMON: TaskType;
    static init(): void;
  }


  class TaskData {
    static readonly formList: List;
    static readonly actionList: List;
    static readonly genderList: List;
    static readonly pokemonTypeList: List;
    static readonly regionList: List;
  }

}