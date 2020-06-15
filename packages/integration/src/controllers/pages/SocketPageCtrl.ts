import {ContentType, Controller, Get} from "@tsed/common";
import {Render} from "@tsed/platform-express";
import {Hidden} from "@tsed/swagger";
import * as fs from "fs";

@Controller("/")
@Hidden()
export class SocketPageCtrl {
  @Get("/socket")
  @Render("socket")
  public socket() {
    return {socketScript: "/socket/socket.io.js"};
  }

  @Get("/socket/socket.io.js")
  @ContentType("application/javascript")
  public getScript() {
    return fs.readFileSync(require.resolve("socket.io-client/dist/socket.io.js"), {encoding: "utf8"});
  }
}
