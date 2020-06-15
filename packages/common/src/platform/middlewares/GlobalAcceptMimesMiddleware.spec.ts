import {catchError} from "@tsed/core";
import {expect} from "chai";
import {FakeRequest} from "../../../../../test/helper";
import {GlobalAcceptMimesMiddleware} from "./GlobalAcceptMimesMiddleware";

describe("GlobalAcceptMimesMiddleware", () => {
  describe("accept", () => {
    it("should return nothing", () => {
      const request = new FakeRequest();
      request.mime = "application/json";

      const middleware = new GlobalAcceptMimesMiddleware();
      middleware.acceptMimes = ["application/json"];

      expect(middleware.use(request as any)).to.eq(undefined);
    });
  });

  describe("not accept", () => {
    it("should throws NotAcceptable", () => {
      const request = new FakeRequest();
      request.mime = "text/html";

      const middleware = new GlobalAcceptMimesMiddleware();
      middleware.acceptMimes = ["application/json"];

      const error: any = catchError(() => middleware.use(request as any));

      expect(error.message).to.eq("You must accept content-type application/json");
    });
  });
});
