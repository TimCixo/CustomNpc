declare module 'zume.mixin.archaic' {
  import { MouseFilter } from 'net.minecraft.util';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  class EntityRendererAccessor {
    a(var1: number): void;
    a(var1: MouseFilter): void;
    b(var1: number): void;
    b(var1: MouseFilter): void;
    c(var1: number): void;
    d(var1: number): void;
    e(var1: number): void;
  }


  class EntityRendererMixin {
    a(callbackInfo: CallbackInfo): void;
    a(f2: number): number;
    a(bl: boolean): boolean;
    b(f2: number): number;
    c(f2: number): number;
    d(f2: number): number;
  }

}

declare module 'zume.mixin.legacy' {
  import { class_842, class_987 } from 'net.minecraft';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  class GameRendererAccessor {
    a(var1: class_842): void;
    a(var1: number): void;
    b(var1: class_842): void;
    b(var1: number): void;
    c(var1: number): void;
    d(var1: number): void;
    e(var1: number): void;
  }


  class GameRendererMixin {
    a(callbackInfo: CallbackInfo): void;
    a(f2: number): number;
    a(bl: boolean): boolean;
    a(d2: number): number;
    b(f2: number): number;
  }


  class KeyBindingMixin {
    method_6619(): boolean;
  }


  class MinecraftClientMixin {
    a(class_9872: class_987, n2: number): boolean;
  }

}

declare module 'zume.mixin.lexforge' {
  import { Options, OptionInstance } from 'net.minecraft.client';

  class CameraMixin {
    a(d2: number): number;
  }


  class MouseHandlerMixin {
    a(options: Options): boolean;
    a(optionInstance: OptionInstance): any;
  }

}

declare module 'zume.mixin.lexforge16' {
  import { GameSettings } from 'net.minecraft.client';

  class CameraMixin {
    a(d2: number): number;
  }


  class MouseHandlerMixin {
    a(gameSettings: GameSettings): boolean;
    b(gameSettings: GameSettings): number;
  }

}

declare module 'zume.mixin.lexforge18' {
  import { Options } from 'net.minecraft.client';

  class CameraMixin {
    a(d2: number): number;
  }


  class MouseHandlerMixin {
    a(options: Options): boolean;
    b(options: Options): number;
  }

}

declare module 'zume.mixin.modern' {
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { class_1661 } from 'net.minecraft';
  import { Operation } from 'com.llamalad7.mixinextras.injector.wrapoperation';

  class CameraMixin {
    a(d2: number): number;
    a(f2: number): number;
  }


  class GameRendererMixin {
    a(callbackInfo: CallbackInfo): void;
    a(d2: number): number;
    a(f2: number): number;
  }


  class MouseHandlerMixin {
    a(bl: boolean): boolean;
    a(object: any): any;
    a(d2: number): number;
    a(class_16612: class_1661, d2: number): boolean;
    a(d2: number, n2: number, n3: number, operation: Operation): number;
    b(bl: boolean): boolean;
  }

}

declare module 'zume.mixin.primitive' {
  import { class_12, class_136 } from 'net.minecraft';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Minecraft } from 'net.minecraft.client';

  class GameRendererAccessor {
    a(var1: class_12): void;
    b(var1: class_12): void;
  }


  class GameRendererMixin {
    a(callbackInfo: CallbackInfo): void;
    a(f2: number): number;
    a(bl: boolean): boolean;
    b(f2: number): number;
    c(f2: number): number;
    d(f2: number): number;
  }


  class MinecraftAccessor {
    static a(): Minecraft;
  }


  class MinecraftMixin {
    a(class_1362: class_136, n2: number): boolean;
  }

}

declare module 'zume.mixin.vintage' {
  class EntityRendererMixin {
    a(bl: boolean): boolean;
    a(f2: number): number;
    a(d2: number): number;
  }

}