import {RequestContext} from "@tsed/common";
import * as Express from "express";
import "./Express";
import {IRouterSettings} from "./IRouterSettings";

export * from "./IRouterSettings";

declare global {
  namespace TsED {
    export interface Configuration {
      /**
       * Global configuration for the Express.Router. See express [documentation](http://expressjs.com/en/api.html#express.router).
       */
      routers: IRouterSettings;
    }

    export interface NextFunction extends Express.NextFunction {}

    export interface Request extends Express.Request {
      id: string;
      ctx: RequestContext;
    }

    export interface Response extends Express.Response {}
  }
}
