declare module 'com.starlotte.cobblemon_move_inspector.client' {
  import { ClientModInitializer } from 'net.fabricmc.api';
  import { Context } from 'com.cobblemon.mod.relocations.graalvm.polyglot';
  import { GraalShowdownUnbundler } from 'com.cobblemon.mod.common.battles.runner.graal';
  import { HashMap, UUID } from 'java.util';
  import { Float } from 'java.lang';
  import { MoveTemplate } from 'com.cobblemon.mod.common.api.moves';
  import { ElementalType } from 'com.cobblemon.mod.common.api.types';

  interface CobblemonMoveInspectorClient extends ClientModInitializer {}
  class CobblemonMoveInspectorClient extends ClientModInitializer {
    onInitializeClient(): void;
  }


  class GraalTypeChartGetter {
    context: Context;
    get context(): Context;
    get unbundler(): GraalShowdownUnbundler;
    getTypeChart(typeMap: HashMap<string, HashMap<string, number>>): void;
    openConnection(): void;
    set context(context: Context);
  }


  class MoveEffectivenessLookup {
    static getModifier(move: MoveTemplate, defenderType1: ElementalType, defenderType2: ElementalType, player: UUID): number;
    static getMult(damage: number): number;
    static getMultFromType(moveName: string, moveType: string, defenderType: string): number;
  }

}

declare module 'com.starlotte.cobblemon_move_inspector' {
  class CobblemonMoveInspector {
    static readonly MOD_ID: string;
    static init(): void;
  }

}

declare module 'com.starlotte.cobblemon_move_inspector.mixin.client' {
  import { MoveTemplate } from 'com.cobblemon.mod.common.api.moves';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  class BattleMoveSelectionGUIMixin {
    moveTemplate: MoveTemplate;
    isHovered(var1: number, var3: number): boolean;
    tooltipRenderMixin(context: GuiGraphics, mouseX: number, mouseY: number, delta: number, ci: CallbackInfo): void;
  }

}

declare module 'com.starlotte.cobblemon_move_inspector.neoforge' {
  import { IEventBus } from 'net.neoforged.bus.api';

  class cobblemon_move_inspector {
    constructor(modBus: IEventBus);
  }

}