declare module 'jeresources.proxy' {
  interface ClientProxy extends CommonProxy {}
  class ClientProxy extends CommonProxy {
  }


  class CommonProxy {
    initCompatibility(): void;
  }

}