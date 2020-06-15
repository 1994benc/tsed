import {Err, IMiddleware, IResponseError, Middleware, Req, Res} from "@tsed/common";
import {Env} from "@tsed/core";
import {Constant} from "@tsed/di";
import {Exception} from "@tsed/exceptions";

const toHTML = (message = "") => message.replace(/\n/gi, "<br />");

@Middleware()
export class GlobalErrorHandlerMiddleware implements IMiddleware {
  @Constant("env")
  env: Env;

  use(@Err() error: any, @Req() request: Req, @Res() response: Res): any {
    if (typeof error === "string") {
      response.status(404).send(toHTML(error));

      return;
    }

    if (error instanceof Exception || error.status) {
      this.mapException(error, request, response);

      return;
    }

    this.mapAllErrors(error, request, response);

    return;
  }

  protected mapAllErrors(error: any, request: Req, response: Res) {
    const logger = request.ctx.logger;
    const err = this.mapError(error);

    logger.error({
      error: err
    });

    response
      .set(this.getHeaders(error))
      .status(err.status)
      .json(this.env === Env.PROD ? "InternalServerError" : err);
  }

  protected mapError(error: any) {
    return {
      name: error.origin?.name || error.name,
      message: error.message,
      status: error.status || 500,
      errors: this.getErrors(error)
    };
  }

  protected getErrors(error: any) {
    return [error, error.origin].filter(Boolean).reduce((errs, {errors}: IResponseError) => {
      return [...errs, ...(errors || [])];
    }, []);
  }

  protected getHeaders(error: any) {
    return [error, error.origin].filter(Boolean).reduce((obj, {headers}: IResponseError) => {
      return {
        ...obj,
        ...(headers || {})
      };
    }, {});
  }

  protected mapException(error: any, request: Req, response: Res) {
    const logger = request.ctx.logger;
    const err = this.mapError(error);

    logger.error({
      error: err
    });

    response
      .set(this.getHeaders(error))
      .status(error.status)
      .json(err);
  }
}
