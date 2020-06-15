import {PlatformApplication, PlatformTest} from "@tsed/common";
import {PlatformExpress} from "@tsed/platform-express";
import {expect} from "chai";

describe("PlatformExpress", () => {
  beforeEach(() => PlatformTest.create());
  afterEach(() => PlatformTest.reset());

  it("should bootstrap a new Server", async () => {
    // GIVEN
    class Server {}

    const platform = await PlatformExpress.bootstrap(Server, {logger: {level: "error"}});

    expect(platform.app).to.be.instanceof(PlatformApplication);
    expect(platform.rootModule).to.be.instanceof(Server);
  });
});
