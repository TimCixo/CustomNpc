declare module 'terrablender.core' {
  import { Logger } from 'org.apache.logging.log4j';
  import { TerraBlenderConfig } from 'terrablender.config';

  class TerraBlender {
    static readonly MOD_ID: string;
    static readonly LOGGER: Logger;
    static CONFIG: TerraBlenderConfig;
    static setConfig(config: TerraBlenderConfig): void;
  }


  class TerraBlenderNeoForge {
    constructor();
  }

}