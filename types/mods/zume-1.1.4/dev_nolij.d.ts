declare module 'dev.nolij.zume.api.config.v1' {
  class ZumeConfig {
    isCinematicZoomEnabled: boolean;
    mouseSensitivityFloor: number;
    zoomSpeed: number;
    isZoomScrollingEnabled: boolean;
    zoomSmoothnessMilliseconds: number;
    animationEasingExponent: number;
    zoomEasingExponent: number;
    defaultZoom: number;
    isFirstPersonToggleModeEnabled: boolean;
    isThirdPersonToggleModeEnabled: boolean;
    minimumFOV: number;
    maximumThirdPersonZoomBlocks: number;
    minimumThirdPersonZoomBlocks: number;
    isDisabled: boolean;
  }


  class ZumeConfigAPI {
    static get animationEasingExponent(): number;
    static get defaultZoom(): number;
    static get maximumThirdPersonZoomBlocks(): number;
    static get minimumFOV(): number;
    static get minimumThirdPersonZoomBlocks(): number;
    static get mouseSensitivityFloor(): number;
    static get snapshot(): ZumeConfig;
    static get zoomEasingExponent(): number;
    static get zoomSmoothnessMilliseconds(): number;
    static get zoomSpeed(): number;
    static isCinematicZoomEnabled(): boolean;
    static isDisabled(): boolean;
    static isFirstPersonToggleModeEnabled(): boolean;
    static isThirdPersonToggleModeEnabled(): boolean;
    static isZoomScrollingEnabled(): boolean;
    static replaceConfig(zumeConfig: ZumeConfig): void;
  }

}

declare module 'dev.nolij.zume.api.platform.v1' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { Logger } from 'org.apache.logging.log4j';
  import { Path } from 'java.nio.file';

  interface CameraPerspective extends Enum<CameraPerspective> {}
  class CameraPerspective extends Enum<CameraPerspective> {
    static readonly FIRST_PERSON: CameraPerspective;
    static readonly THIRD_PERSON: CameraPerspective;
    static readonly THIRD_PERSON_FLIPPED: CameraPerspective;
    static valueOf(name: string): CameraPerspective;
    static values(): CameraPerspective[];
  }


  class IZumeImplementation {
    get cameraPerspective(): CameraPerspective;
    isZoomInPressed(): boolean;
    isZoomOutPressed(): boolean;
    isZoomPressed(): boolean;
    onZoomActivate(): void;
  }


  class ZumeAPI {
    static cinematicCameraEnabledHook(bl: boolean): boolean;
    static fovHook(d2: number): number;
    static get logger(): Logger;
    static isActive(): boolean;
    static isFOVHookActive(): boolean;
    static isMouseScrollHookActive(): boolean;
    static mouseScrollHook(n2: number): boolean;
    static mouseSensitivityHook(d2: number): number;
    static openConfigFile(): void;
    static registerImplementation(iZumeImplementation: IZumeImplementation, path: Path): void;
    static renderHook(): void;
    static thirdPersonCameraHook(d2: number): number;
  }

}

declare module 'dev.nolij.zume.api.util.v1' {
  import { ClassLoader, Class } from 'java.lang';
  import { Lookup } from 'MethodHandles';
  import { MethodHandle, MethodType } from 'java.lang.invoke';

  class EasingHelper {
    static in(d2: number, d3: number): number;
    static in(d2: number, d3: number, d4: number, d5: number): number;
    static inOut(d2: number, d3: number): number;
    static inOut(d2: number, d3: number, d4: number, d5: number): number;
    static inverseIn(d2: number, d3: number): number;
    static inverseIn(d2: number, d3: number, d4: number, d5: number): number;
    static inverseInOut(d2: number, d3: number): number;
    static inverseInOut(d2: number, d3: number, d4: number, d5: number): number;
    static inverseLinear(d2: number, d3: number, d4: number): number;
    static inverseOut(d2: number, d3: number): number;
    static inverseOut(d2: number, d3: number, d4: number, d5: number): number;
    static linear(d2: number, d3: number, d4: number): number;
    static out(d2: number, d3: number): number;
    static out(d2: number, d3: number, d4: number, d5: number): number;
  }


  class MathHelper {
    static clamp(d2: number, d3: number, d4: number): number;
    static sign(n2: number): number;
  }


  class MethodHandleHelper {
    static readonly PUBLIC: MethodHandleHelper;
    constructor(classLoader: ClassLoader, lookup: Lookup);
    static firstNonNull(...objectArray: any[]): any;
    getClassOrNull(string: string): Class;
    getClassOrNull(...stringArray: string[]): Class;
    getConstructorOrNull(clazz: Class, methodType: MethodType, ...classArray: Class[]): MethodHandle;
    getGetterOrNull(clazz: Class, string: string, clazz2: Class): MethodHandle;
    getGetterOrNull(clazz: Class, string: string, clazz2: Class, methodType: MethodType): MethodHandle;
    getMethodOrNull(clazz: Class, string: string, ...classArray: Class[]): MethodHandle;
    getMethodOrNull(clazz: Class, string: string, methodType: MethodType, ...classArray: Class[]): MethodHandle;
    getSetterOrNull(clazz: Class, string: string, clazz2: Class): MethodHandle;
    getSetterOrNull(clazz: Class, string: string, clazz2: Class, methodType: MethodType): MethodHandle;
  }

}