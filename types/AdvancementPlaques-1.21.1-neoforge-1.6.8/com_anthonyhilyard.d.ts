declare module 'com.anthonyhilyard.advancementplaques' {
  import { Logger } from 'org.apache.logging.log4j';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { SoundEvent } from 'net.minecraft.sounds';

  class AdvancementPlaques {
    static readonly MODID: string;
    static readonly LOGGER: Logger;
    static readonly TEXTURE_PLAQUES: ResourceLocation;
    static readonly TEXTURE_PLAQUE_EFFECTS: ResourceLocation;
    static readonly TASK_COMPLETE_ID: ResourceLocation;
    static readonly GOAL_COMPLETE_ID: ResourceLocation;
    static readonly TASK_COMPLETE: SoundEvent;
    static readonly GOAL_COMPLETE: SoundEvent;
    static init(): void;
  }

}

declare module 'com.anthonyhilyard.advancementplaques.client' {
  import { Minecraft } from 'net.minecraft.client';

  class AdvancementPlaquesClient {
    static wrapToasts(minecraft: Minecraft): void;
  }

}

declare module 'com.anthonyhilyard.advancementplaques.compat' {
  import { SoundEvent } from 'net.minecraft.sounds';
  import { AdvancementHolder } from 'net.minecraft.advancements';
  import { TextColor } from 'net.minecraft.network.chat';

  class AdvancementScreenshotHandler {
    static takeScreenshot(): void;
  }


  class AetherHandler {
    static getSoundOverride(advancement: AdvancementHolder): SoundEvent;
  }


  class JadeHandler {
    static disableJade(): void;
    static enableJade(): void;
  }


  class PrismHandler {
    static getColor(value: any): TextColor;
  }


  class WailaHandler {
    static disableWaila(): void;
    static enableWaila(): void;
  }

}

declare module 'com.anthonyhilyard.advancementplaques.config' {
  import { IcebergConfig } from 'com.anthonyhilyard.iceberg.config';
  import { Supplier } from 'java.util.function';
  import { AdvancementHolder } from 'net.minecraft.advancements';
  import { TextColor } from 'net.minecraft.network.chat';

  interface AdvancementPlaquesConfig extends IcebergConfig<AdvancementPlaquesConfig> {}
  class AdvancementPlaquesConfig extends IcebergConfig<AdvancementPlaquesConfig> {
    readonly onTop: Supplier;
    readonly distance: Supplier;
    readonly horizontalOffset: Supplier;
    readonly hideWaila: Supplier;
    readonly tasks: Supplier;
    readonly goals: Supplier;
    readonly challenges: Supplier;
    readonly taskEffectFadeInTime: Supplier;
    readonly taskEffectFadeOutTime: Supplier;
    readonly taskDuration: Supplier;
    readonly goalEffectFadeInTime: Supplier;
    readonly goalEffectFadeOutTime: Supplier;
    readonly goalDuration: Supplier;
    readonly challengeEffectFadeInTime: Supplier;
    readonly challengeEffectFadeOutTime: Supplier;
    readonly challengeDuration: Supplier;
    readonly whitelist: Supplier;
    readonly blacklist: Supplier;
    readonly taskVolume: Supplier;
    readonly goalVolume: Supplier;
    readonly challengeVolume: Supplier;
    static get instance(): AdvancementPlaquesConfig;
    getNameColor(alpha: number): TextColor;
    getTitleColor(alpha: number): TextColor;
    static showPlaqueForAdvancement(advancementHolder: AdvancementHolder): boolean;
  }

}

declare module 'com.anthonyhilyard.advancementplaques.neoforge.client' {
  import { IEventBus } from 'net.neoforged.bus.api';
  import { FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';

  class AdvancementPlaquesNeoForgeClient {
    constructor(modBus: IEventBus);
    static onClientSetup(event: FMLClientSetupEvent): void;
    run(): void;
  }

}

declare module 'com.anthonyhilyard.advancementplaques.ui.render' {
  import { AdvancementToast } from 'net.minecraft.client.gui.components.toasts';
  import { Minecraft } from 'net.minecraft.client';
  import { CustomItemRenderer } from 'com.anthonyhilyard.iceberg.renderer';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class AdvancementPlaque {
    constructor(toastIn: AdvancementToast, mcIn: Minecraft, itemRendererIn: CustomItemRenderer);
    get toast(): AdvancementToast;
    height(): number;
    render(screenWidth: number, index: number, graphics: GuiGraphics): boolean;
    width(): number;
  }

}

declare module 'com.anthonyhilyard.advancementplaques.ui' {
  import { ToastComponent, Toast } from 'net.minecraft.client.gui.components.toasts';
  import { Minecraft } from 'net.minecraft.client';
  import { Class } from 'java.lang';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface ToastComponentWrapper extends ToastComponent {}
  class ToastComponentWrapper extends ToastComponent {
    constructor(mcIn: Minecraft, wrapped: ToastComponent);
    addToast(toastIn: Toast): void;
    clear(): void;
    getToast<T extends Toast>(class_: Class<T>, object: any): T;
    render(graphics: GuiGraphics): void;
  }

}