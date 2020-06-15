import {Constant} from "@tsed/di";
import {NotAcceptable} from "@tsed/exceptions";
import {Middleware} from "../../mvc/decorators/class/middleware";
import {Req} from "../../mvc/decorators/params/request";
import {IMiddleware} from "../../mvc/interfaces/IMiddleware";

@Middleware()
export class GlobalAcceptMimesMiddleware implements IMiddleware {
  @Constant("acceptMimes", ["application/json"])
  acceptMimes: string[];

  use(@Req() request: Req) {
    const find = this.acceptMimes.find((mime: any) => !!request.accepts(mime));

    if (!find) {
      throw new NotAcceptable(this.acceptMimes.join(", "));
    }
  }
}
