import {Controller, Get, PathParams, QueryParams, UseBefore} from "@tsed/common";
import {MergeParams} from "@tsed/platform-express";
import {Operation, Hidden} from "@tsed/swagger";
import {Test2Middleware} from "../../middlewares/middleware";

@Controller("/:eventId/tasks")
@MergeParams()
@UseBefore(Test2Middleware)
export class TaskCtrl {
  @Get("/")
  @Operation({tags: ["api", "task"]})
  async get(@PathParams("test") value: string, @PathParams("eventId") id: string) {
    return {value, id};
  }

  @Get("/hidden")
  @Hidden()
  async getHidden() {
    return {};
  }

  @Get("/hiddenparam")
  async getHiddenParams(
    @Hidden()
    @QueryParams("token")
      t: string,
    @QueryParams("q") q: string
  ) {
    return {};
  }
}
