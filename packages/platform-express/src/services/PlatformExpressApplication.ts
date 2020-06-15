import {PlatformApplication, PlatformHandler} from "@tsed/common";
import {OverrideProvider} from "@tsed/di";
import * as Express from "express";

declare global {
  namespace TsED {
    export interface Application extends Express.Application {}
  }
}

@OverrideProvider(PlatformApplication)
export class PlatformExpressApplication extends PlatformApplication {
  constructor(platformHandler: PlatformHandler) {
    super(platformHandler);
    this.raw = Express();
  }
}
