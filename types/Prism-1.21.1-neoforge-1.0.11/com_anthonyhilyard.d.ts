declare module 'com.anthonyhilyard.prism.events.client' {
  import { Event } from 'com.anthonyhilyard.prism.events';

  class RenderTickEvent {
    static readonly START: Event;
  }

}

declare module 'com.anthonyhilyard.prism.events.client.RenderTickEvent' {
  import { DeltaTracker } from 'net.minecraft.client';

  class Start {
    onStart(var1: DeltaTracker): void;
  }

}

declare module 'com.anthonyhilyard.prism.events' {
  import { Class } from 'java.lang';
  import { Function } from 'java.util.function';

  class Event<T = any> {
    constructor(type: Class<T>, invokerFactory: Function<T[], T>);
    invoker(): T;
    listenerCount(): number;
    register(listener: T): void;
  }


  class EventFactory {
    static create<T>(type: Class<T>, invokerFactory: Function<T[], T>): Event<T>;
    static invalidate(): void;
  }


  class ToggleableEvent<T = any> {
    static create<T>(type: Class<T>, invokerFactory: Function<T[], T>): ToggleableEvent<T>;
    disable(): boolean;
    enable(): boolean;
    invoker(): T;
    register(listener: T): void;
  }

}

declare module 'com.anthonyhilyard.prism.item' {
  import { TextColor } from 'net.minecraft.network.chat';
  import { ItemStack } from 'net.minecraft.world.item';

  class ItemColors {
    static getColorForItem(item: ItemStack, defaultColor: TextColor): TextColor;
  }

}

declare module 'com.anthonyhilyard.prism.mixin' {
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { IColor } from 'com.anthonyhilyard.prism.util';

  class MinecraftMixin {
    runTick(tickWorld: boolean, callbackInfo: CallbackInfo): void;
  }


  interface TextColorMixin extends IColor {}
  class TextColorMixin extends IColor {
    get intValue(): number;
    get name(): string;
    get value(): number;
    isAnimated(): boolean;
  }

}

declare module 'com.anthonyhilyard.prism.neoforge' {
  class PrismNeoForge {
  }

}

declare module 'com.anthonyhilyard.prism' {
  import { Logger } from 'org.apache.logging.log4j';

  class Prism {
    static readonly MODID: string;
    static readonly LOGGER: Logger;
  }

}

declare module 'com.anthonyhilyard.prism.text' {
  import { TextColor, Component } from 'net.minecraft.network.chat';
  import { IColor } from 'com.anthonyhilyard.prism.util';
  import { List } from 'java.util';
  import { DeltaTracker } from 'net.minecraft.client';

  interface DynamicColor extends IColor, TextColor {}
  class DynamicColor extends IColor {
    constructor(color: IColor);

    constructor(color: IColor, name: string);

    constructor(values: IColor[], duration: number);

    constructor(values: IColor[], duration: number, name: string);
    addColor(color: IColor): void;
    alpha(): number;
    blue(): number;
    clearColors(): void;
    static fromAHSV(alpha: number, hue: number, saturation: number, value: number): DynamicColor;
    static fromAHSV(alpha: number, hue: number, saturation: number, value: number): DynamicColor;
    static fromARGB(alpha: number, red: number, green: number, blue: number): DynamicColor;
    static fromARGB(alpha: number, red: number, green: number, blue: number): DynamicColor;
    static fromColor(color: IColor): DynamicColor;
    static fromHSV(hue: number, saturation: number, value: number): DynamicColor;
    static fromHSV(hue: number, saturation: number, value: number): DynamicColor;
    static fromRGB(red: number, green: number, blue: number): DynamicColor;
    static fromRGB(red: number, green: number, blue: number): DynamicColor;
    static fromRgb(value: number): DynamicColor;
    get intValue(): number;
    get intValue(): number;
    get intValue(): number;
    get name(): string;
    get name(): string;
    get name(): string;
    getValue(): number;
    green(): number;
    hue(): number;
    isAnimated(): boolean;
    isAnimated(): boolean;
    isAnimated(): boolean;
    onRenderTick(tracker: DeltaTracker): void;
    red(): number;
    saturation(): number;
    setDuration(duration: number): void;
    toString(): string;
    value(): number;
  }


  class TextColors {
    static findFirstColorCode(textComponent: Component): TextColor;
  }

}

declare module 'com.anthonyhilyard.prism.util' {
  import { List } from 'java.util';
  import { ColorFormatDocumentation } from 'com.anthonyhilyard.prism.util.ConfigHelper';
  import { TextColor } from 'net.minecraft.network.chat';
  import { DynamicColor } from 'com.anthonyhilyard.prism.text';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Rect2i } from 'net.minecraft.client.renderer';
  import { BufferedImage } from 'java.awt.image';

  class ColorUtil {
    static AHSVtoARGB(alpha: number, hue: number, saturation: number, value: number): number;
    static AHSVtoARGB(alpha: number, hue: number, saturation: number, value: number): number;
    static ARGBtoAHSV(a: number, r: number, g: number, b: number): number[];
    static ARGBtoAHSV(a: number, r: number, g: number, b: number): number[];
    static HSVtoRGB(hue: number, saturation: number, value: number): number;
    static HSVtoRGB(hue: number, saturation: number, value: number): number;
    static RGBtoHSV(r: number, g: number, b: number): number[];
    static RGBtoHSV(r: number, g: number, b: number): number[];
    static combineARGB(a: number, r: number, g: number, b: number): number;
    static combineRGB(r: number, g: number, b: number): number;
  }


  class ConfigHelper {
    static applyModifiers(modifiers: string[], color: number): TextColor;
    static applyModifiers(modifiers: string[], color: TextColor): TextColor;
    static applyModifiers(modifiers: string[], color: DynamicColor): DynamicColor;
    static colorFormatDocumentation(): ColorFormatDocumentation[];
    static colorFormatDocumentation(forKey: boolean): ColorFormatDocumentation[];
    static parseColor(value: any, allowAlpha: boolean): IColor;
    static parseColor(value: any): IColor;
    static validateColor(value: any): boolean;
  }


  class IColor {
    get intValue(): number;
    get name(): string;
    isAnimated(): boolean;
  }


  class ImageAnalysis {
    static getDominantColor(imageLocation: ResourceLocation, region: Rect2i): TextColor;
    static getDominantColor(image: BufferedImage): TextColor;
  }


  class MinecraftColors {
    static getColor(colorName: string): TextColor;
  }


  class WebColors {
    get intValue(): number;
    get name(): string;
    static getColor(colorName: string): IColor;
    isAnimated(): boolean;
  }

}