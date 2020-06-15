import {PlatformTest, ValidationError} from "@tsed/common";
import {BadRequest} from "@tsed/exceptions";
import {expect} from "chai";
import {FakeRequest, FakeResponse} from "../../../../test/helper";
import {GlobalErrorHandlerMiddleware} from "./GlobalErrorHandlerMiddleware";

describe("GlobalErrorHandlerMiddleware", () => {
  beforeEach(() => PlatformTest.create());
  afterEach(() => PlatformTest.reset());

  it("should map string error", () => {
    const middleware = PlatformTest.get<GlobalErrorHandlerMiddleware>(GlobalErrorHandlerMiddleware);
    const error = "MyError";
    const request: any = new FakeRequest();
    const response: any = new FakeResponse();

    middleware.use(error, request, response);

    expect(response._body).to.equal("MyError");
  });

  it("should map exception", () => {
    const middleware = PlatformTest.get<GlobalErrorHandlerMiddleware>(GlobalErrorHandlerMiddleware);
    const origin = new ValidationError("wrong ID", [
      {
        path: "id",
        error: "format"
      }
    ]);

    const error = new BadRequest("Bad request on ID", origin);
    error.headers = {
      "x-path": "id"
    };

    const request: any = new FakeRequest();
    const response: any = new FakeResponse();

    middleware.use(error, request, response);

    expect(response._headers).to.deep.equal("x-path:id\n");
    expect(JSON.parse(response._body)).to.deep.equal({
      errors: [
        {
          error: "format",
          path: "id"
        }
      ],
      message: "Bad request on ID, innerException: wrong ID",
      name: "VALIDATION_ERROR",
      status: 400
    });
  });
});
