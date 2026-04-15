declare module 'zume' {
  import { ClientModInitializer } from 'net.fabricmc.api';
  import { PreLaunchEntrypoint } from 'net.fabricmc.loader.api.entrypoint';
  import { ForgeGuiFactory } from 'net.minecraftforge.client.gui';
  import { GuiScreen } from 'net.minecraft.client.gui';
  import { RenderTickEvent } from 'TickEvent';
  import { FOVModifier } from 'EntityViewRenderEvent';
  import { MouseEvent } from 'net.minecraftforge.client.event';
  import { GuiConfig } from 'net.minecraftforge.fml.client.config';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { Set, List } from 'java.util';
  import { ClassNode } from 'org.objectweb.asm.tree';
  import { IZumeImplementation } from 'dev.nolij.zume.api.platform.v1';
  import { Handler } from 'EventHandlerRegistrar';
  import { EmbeddiumEvent } from 'org.embeddedt.embeddium.api.eventbus';
  import { Class, Runnable } from 'java.lang';
  import { FMLPreInitializationEvent } from 'cpw.mods.fml.common.event';
  import { GuiConfig as cpw_mods_fml_client_config_GuiConfig } from 'cpw.mods.fml.client.config';
  import { Screen as net_minecraft_client_gui_screen_Screen } from 'net.minecraft.client.gui.screen';
  import { Logger } from 'org.apache.logging.log4j';
  import { Path } from 'java.nio.file';
  import { class_437, class_2561, class_327 } from 'net.minecraft';
  import { ModMenuApi } from 'io.github.prospector.modmenu.api';
  import { Function, Consumer } from 'java.util.function';
  import { ConfigScreenFactory } from 'com.terraformersmc.modmenu.api';
  import { File } from 'java.io';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';
  import { IConfigScreenFactory } from 'net.neoforged.neoforge.client.gui';
  import { Minecraft } from 'net.minecraft.client';
  import { OptionStorage } from 'me.jellysquid.mods.sodium.client.gui.options.storage';
  import { OptionIdentifier } from 'org.embeddedt.embeddium.client.gui.options';
  import { OptionStorage as org_embeddedt_embeddium_api_options_structure_OptionStorage } from 'org.embeddedt.embeddium.api.options.structure';
  import { OptionIdentifier as org_embeddedt_embeddium_api_options_OptionIdentifier } from 'org.embeddedt.embeddium.api.options';
  import { KeyBindingRegisterEvent } from 'net.modificationstation.stationapi.api.client.event.option';

  interface a extends ClientModInitializer, PreLaunchEntrypoint {}
  class a extends ClientModInitializer {
    onInitializeClient(): void;
    onPreLaunch(): void;
  }


  interface aa extends ForgeGuiFactory {}
  class aa extends ForgeGuiFactory {
    createConfigGui(guiScreen: GuiScreen): GuiScreen;
  }


  interface ab extends l {}
  class ab extends l {
    constructor();
    a(): boolean;
    a(renderTickEvent: RenderTickEvent): void;
    a(fOVModifier: FOVModifier): void;
    a(mouseEvent: MouseEvent): void;
    b(): boolean;
    c(): boolean;
    d(): i;
  }


  interface ac extends GuiConfig {}
  class ac extends GuiConfig {
    constructor(guiScreen: GuiScreen);
    func_73866_w_(): void;
  }


  class ag {
    a: string;
    b: any;
    constructor(string: string, object: any);

    constructor(object: any);
    equals(object: any): boolean;
    hashCode(): number;
    toString(): string;
  }


  class a_0 {
  }


  class b {
    constructor();
  }


  interface b_0 extends Screen {}
  class b_0 extends Screen {
    m_86600_(): void;
  }


  interface c extends IMixinConfigPlugin {}
  class c extends IMixinConfigPlugin {
    acceptTargets(set: Set, set2: Set): void;
    get mixins(): List;
    get refMapperConfig(): string;
    onLoad(string: string): void;
    postApply(string: string, classNode: ClassNode, string2: string, iMixinInfo: IMixinInfo): void;
    preApply(string: string, classNode: ClassNode, string2: string, iMixinInfo: IMixinInfo): void;
    shouldApplyMixin(string: string, string2: string): boolean;
  }


  interface d extends l {}
  class d extends l {
    constructor(iZumeImplementation: IZumeImplementation);
    a(): boolean;
    b(): boolean;
    c(): boolean;
    d(): i;
    e(): void;
  }


  interface d_0 extends Handler {}
  class d_0 extends Handler {
    constructor();
    acceptEvent(object: EmbeddiumEvent): void;
  }


  interface e extends ForgeGuiFactory {}
  class e extends ForgeGuiFactory {
    mainConfigGuiClass(): Class;
  }


  interface e_0 extends l {}
  class e_0 extends l {
    constructor();
    a(): boolean;
    b(): boolean;
    c(): boolean;
    d(): i;
  }


  interface f extends l {}
  class f extends l {
    a(hArray: FMLPreInitializationEvent): void;
    a(): boolean;
    a(mouseEvent: MouseEvent): void;
    b(): boolean;
    c(): boolean;
    d(): i;
    e(): void;
  }


  class f_0 {
  }


  interface g extends cpw_mods_fml_client_config_GuiConfig {}
  class g extends cpw_mods_fml_client_config_GuiConfig {
    constructor(guiScreen: GuiScreen);
    func_73866_w_(): void;
  }


  class g_0 {
  }


  interface h_0 extends net_minecraft_client_gui_screen_Screen {}
  class h_0 extends net_minecraft_client_gui_screen_Screen {
    render(n2: number, n3: number, f2: number): void;
  }


  class j {
    constructor(d2: number);
    a(): number;
    a(d2: number, d3: number): void;
    b(): boolean;
  }


  interface j_0 extends l {}
  class j_0 extends l {
    constructor();
    a(): boolean;
    b(): boolean;
    c(): boolean;
    d(): i;
  }


  class k_0 {
  }


  class l {
    a(): boolean;
    b(): boolean;
    c(): boolean;
    d(): i;
    e(): void;
  }


  interface l_0 extends Screen {}
  class l_0 extends Screen {
    m_96624_(): void;
  }


  class m {
    static readonly a: Logger;
    static readonly b: k;
    static c: s;
    static d: boolean;
    static a(l2: l, path: Path): void;
    static a(): void;
    static a(d2: number): number;
    static a(bl: boolean): boolean;
    static a(n2: number): boolean;
    static b(d2: number): number;
    static b(): boolean;
    static c(d2: number): number;
    static c(): boolean;
    static d(): boolean;
    static e(): void;
  }


  class n {
  }


  interface n_0 extends ClientModInitializer, l {}
  class n_0 extends ClientModInitializer {
    a(): boolean;
    b(): boolean;
    c(): boolean;
    d(): i;
    onInitializeClient(): void;
  }


  class o {
  }


  interface p extends q {}
  class p extends q {
    static a(object: Path, object2: Runnable): p;
    a(): void;
    b(): boolean;
    c(): void;
  }


  interface p_0 extends Handler {}
  class p_0 extends Handler {
    constructor();
    acceptEvent(object: EmbeddiumEvent): void;
  }


  class q {
    a(): void;
    c(): void;
  }


  interface q_0 extends class_437 {}
  class q_0 extends class_437 {
    constructor(class_25612: class_2561, class_4372: class_437);
    method_25426(): void;
    render(n2: number, n3: number, f2: number): void;
  }


  interface r extends q {}
  class r extends q {
    a(): void;
    c(): void;
  }


  interface r_0 extends ModMenuApi {}
  class r_0 extends ModMenuApi {
    get configScreenFactory(): Function;
    get modConfigScreenFactory(): ConfigScreenFactory;
    get modId(): string;
  }


  class s {
    enableCinematicZoom: boolean;
    mouseSensitivityFloor: number;
    zoomSpeed: number;
    enableZoomScrolling: boolean;
    zoomSmoothnessMs: number;
    animationEasingExponent: number;
    zoomEasingExponent: number;
    defaultZoom: number;
    toggleMode: boolean;
    thirdPersonToggleMode: boolean;
    minFOV: number;
    maxThirdPersonZoomDistance: number;
    minThirdPersonZoomDistance: number;
    disable: boolean;
    configVersion: number;
    static a(s2: s): void;
    static a(): File;
    static a(object: Path, object2: string, consumer: Consumer): void;
    static b(): void;
  }


  interface s_0 extends l {}
  class s_0 extends l {
    constructor(iEventBus: IEventBus, modContainer: ModContainer);
    a(): boolean;
    b(): boolean;
    c(): boolean;
    d(): i;
  }


  class t {
  }


  interface t_0 extends Screen {}
  class t_0 extends Screen {
    constructor(screen: Screen);
    init(): void;
  }


  class u {
  }


  interface u_0 extends IConfigScreenFactory {}
  class u_0 extends IConfigScreenFactory {
    createScreen(minecraft: Minecraft, screen: Screen): Screen;
    createScreen(modContainer: ModContainer, screen: Screen): Screen;
  }


  class v {
  }


  interface w extends OptionStorage {}
  class w extends OptionStorage {
    static readonly a: OptionIdentifier;
    static readonly b: OptionIdentifier;
    static readonly c: OptionIdentifier;
    static readonly d: OptionIdentifier;
    static readonly e: OptionIdentifier;
    static readonly f: OptionIdentifier;
    static readonly g: OptionIdentifier;
    static readonly h: OptionIdentifier;
    static readonly i: OptionIdentifier;
    static readonly j: OptionIdentifier;
    static readonly k: OptionIdentifier;
    static readonly l: OptionIdentifier;
    static readonly m: OptionIdentifier;
    static readonly n: OptionIdentifier;
    static readonly o: OptionIdentifier;
    static readonly p: OptionIdentifier;
    static readonly q: OptionIdentifier;
    static readonly r: OptionIdentifier;
    static readonly s: OptionIdentifier;
    static readonly t: OptionIdentifier;
    static readonly u: OptionIdentifier;
    save(): void;
  }


  interface w_0 extends Handler {}
  class w_0 extends Handler {
    constructor();
    acceptEvent(object: EmbeddiumEvent): void;
  }


  interface x extends ClientModInitializer, l {}
  class x extends ClientModInitializer {
    a(): boolean;
    static a(string: string, n2: number, string2: string): class_327;
    b(): boolean;
    c(): boolean;
    d(): i;
    e(): void;
    onInitializeClient(): void;
  }


  interface x_0 extends org_embeddedt_embeddium_api_options_structure_OptionStorage {}
  class x_0 extends org_embeddedt_embeddium_api_options_structure_OptionStorage {
    static readonly a: org_embeddedt_embeddium_api_options_OptionIdentifier;
    static readonly b: org_embeddedt_embeddium_api_options_OptionIdentifier;
    static readonly c: org_embeddedt_embeddium_api_options_OptionIdentifier;
    static readonly d: org_embeddedt_embeddium_api_options_OptionIdentifier;
    static readonly e: org_embeddedt_embeddium_api_options_OptionIdentifier;
    static readonly f: org_embeddedt_embeddium_api_options_OptionIdentifier;
    static readonly g: org_embeddedt_embeddium_api_options_OptionIdentifier;
    static readonly h: org_embeddedt_embeddium_api_options_OptionIdentifier;
    static readonly i: org_embeddedt_embeddium_api_options_OptionIdentifier;
    static readonly j: org_embeddedt_embeddium_api_options_OptionIdentifier;
    static readonly k: org_embeddedt_embeddium_api_options_OptionIdentifier;
    static readonly l: org_embeddedt_embeddium_api_options_OptionIdentifier;
    static readonly m: org_embeddedt_embeddium_api_options_OptionIdentifier;
    static readonly n: org_embeddedt_embeddium_api_options_OptionIdentifier;
    static readonly o: org_embeddedt_embeddium_api_options_OptionIdentifier;
    static readonly p: org_embeddedt_embeddium_api_options_OptionIdentifier;
    static readonly q: org_embeddedt_embeddium_api_options_OptionIdentifier;
    static readonly r: org_embeddedt_embeddium_api_options_OptionIdentifier;
    static readonly s: org_embeddedt_embeddium_api_options_OptionIdentifier;
    static readonly t: org_embeddedt_embeddium_api_options_OptionIdentifier;
    static readonly u: org_embeddedt_embeddium_api_options_OptionIdentifier;
    save(): void;
  }


  interface y_0 extends ClientModInitializer, l {}
  class y_0 extends ClientModInitializer {
    a(): boolean;
    static a(object: KeyBindingRegisterEvent): void;
    b(): boolean;
    c(): boolean;
    d(): i;
    e(): void;
    onInitializeClient(): void;
  }


  interface z_0 extends l {}
  class z_0 extends l {
    constructor();
    a(): boolean;
    b(): boolean;
    c(): boolean;
    d(): i;
  }

}