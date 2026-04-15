declare module 'io.github.prospector.modmenu.api' {
  import { ModMenuApi as com_terraformersmc_modmenu_api_ModMenuApi } from 'com.terraformersmc.modmenu.api';
  import { Function } from 'java.util.function';

  interface ModMenuApi extends com_terraformersmc_modmenu_api_ModMenuApi {}
  class ModMenuApi extends com_terraformersmc_modmenu_api_ModMenuApi {
    get configScreenFactory(): Function;
    get modId(): string;
  }

}