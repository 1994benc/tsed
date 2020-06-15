import {createHttpServer, createHttpsServer, IRoute, PlatformBuilder} from "@tsed/common";
import {Type} from "@tsed/core";
import {GlobalErrorHandlerMiddleware} from "../middlewares";
import {PlatformExpressStatics} from "../services";

export class PlatformExpress extends PlatformBuilder {
  static async bootstrap(module: Type<any>, settings: Partial<TsED.Configuration> = {}): Promise<PlatformExpress> {
    return this.build<PlatformExpress>(PlatformExpress).bootstrap(module, settings);
  }

  async loadStatics() {
    const {injector} = this;
    const staticsService = injector.get<PlatformExpressStatics>(PlatformExpressStatics)!;
    staticsService.statics(injector.settings.statics);
  }

  protected async loadRoutes(routes: IRoute[]): Promise<void> {
    await super.loadRoutes(routes);

    this.app.use(GlobalErrorHandlerMiddleware);
  }

  protected createInjector(module: Type<any>, settings: any) {
    super.createInjector(module, settings);
    createHttpsServer(this.injector);
    createHttpServer(this.injector);
  }
}
