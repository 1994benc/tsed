import {expect} from "chai";
import {
  AfterInit,
  AfterListen,
  AfterRoutesInit,
  BeforeInit,
  BeforeListen,
  BeforeRoutesInit,
  Controller,
  InjectorService,
  OnReady
} from "@tsed/common";
import {Type} from "@tsed/core";
import {Configuration} from "@tsed/di";
import {join} from "path";
import * as Sinon from "sinon";
import {Platform} from "../../platform/services/Platform";
import {PlatformBuilder} from "./PlatformBuilder";

const sandbox = Sinon.createSandbox();

describe("PlatformBuilder", () => {
  @Controller("/")
  class RestCtrl {}

  class PlatformTest extends PlatformBuilder {
    static async bootstrap(module: Type<any>, settings: Partial<TsED.Configuration> = {}) {
      return PlatformBuilder.build<PlatformTest>(this).bootstrap(module, settings);
    }

    async loadStatics(): Promise<void> {
      return undefined;
    }
  }

  @Configuration({
    logger: {
      level: "off"
    },
    mount: {
      "/rest": [RestCtrl]
    }
  })
  class ServerModule implements BeforeInit, AfterInit, BeforeRoutesInit, AfterRoutesInit, BeforeListen, AfterListen, OnReady {
    $beforeRoutesInit(): void | Promise<any> {
      return undefined;
    }

    $afterRoutesInit(): void | Promise<any> {
      return undefined;
    }

    $afterInit(): void | Promise<any> {
      return undefined;
    }

    $afterListen(): void | Promise<any> {
      return undefined;
    }

    $beforeInit(): void | Promise<any> {
      return undefined;
    }

    $beforeListen(): void | Promise<any> {
      return undefined;
    }

    $onReady(): void | Promise<any> {
      return undefined;
    }
  }

  beforeEach(() => {
    sandbox.stub(ServerModule.prototype, "$beforeRoutesInit");
    sandbox.stub(ServerModule.prototype, "$afterRoutesInit");
    sandbox.stub(ServerModule.prototype, "$afterInit");
    sandbox.stub(ServerModule.prototype, "$afterListen");
    sandbox.stub(ServerModule.prototype, "$beforeInit");
    sandbox.stub(ServerModule.prototype, "$beforeListen");
    sandbox.stub(ServerModule.prototype, "$onReady");
    sandbox.stub(PlatformTest.prototype, "loadStatics");
    // @ts-ignore
    sandbox.spy(PlatformTest.prototype, "listenServers");
    sandbox.stub(InjectorService.prototype, "emit");
    sandbox.stub(Platform.prototype, "addRoutes");
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe("bootstrap()", () => {
    it("should bootstrap platform", async () => {
      // WHEN
      const server = await PlatformTest.bootstrap(ServerModule, {
        httpPort: false,
        httpsPort: false
      });

      // THEN
      expect(server.rootModule.$beforeRoutesInit).to.have.been.calledWithExactly();
      expect(server.rootModule.$afterRoutesInit).to.have.been.calledWithExactly();
      expect(server.rootModule.$afterInit).to.have.been.calledWithExactly();
      expect(server.rootModule.$beforeInit).to.have.been.calledWithExactly();
      expect(server.injector.emit).to.have.been.calledWithExactly("$beforeRoutesInit");
      expect(server.injector.emit).to.have.been.calledWithExactly("$afterRoutesInit");
      expect(server.injector.emit).to.not.have.been.calledWithExactly("$afterInit");
      expect(server.injector.emit).to.not.have.been.calledWithExactly("$beforeInit");

      await server.listen();
      // THEN
      // @ts-ignore
      expect(server.listenServers).to.have.been.calledWithExactly();
      expect(server.loadStatics).to.have.been.calledWithExactly();
      expect(server.rootModule.$afterListen).to.have.been.calledWithExactly();
      expect(server.rootModule.$beforeListen).to.have.been.calledWithExactly();
      expect(server.rootModule.$onReady).to.have.been.calledWithExactly();
      expect(server.injector.emit).to.have.been.calledWithExactly("$afterListen");
      expect(server.injector.emit).to.have.been.calledWithExactly("$beforeListen");
      expect(server.injector.emit).to.have.been.calledWithExactly("$onServerReady");
      expect(server.injector.emit).to.have.been.calledWithExactly("$onReady");

      // THEN
      expect(server.rootModule).to.be.instanceof(ServerModule);
      expect(server.platform.addRoutes).to.have.been.calledWithExactly([
        {
          route: "/rest",
          token: RestCtrl
        }
      ]);
    });
  });

  describe("addComponents", () => {
    it("should add components", async () => {
      // GIVEN
      const server = await PlatformTest.bootstrap(ServerModule, {});

      class MyClass {}

      // WHEN
      server.addComponents(MyClass);

      // THEN
      expect(server.injector.settings.componentsScan).to.deep.eq([
        join(process.cwd(), "mvc/**/*.ts"),
        join(process.cwd(), "services/**/*.ts"),
        join(process.cwd(), "middlewares/**/*.ts"),
        join(process.cwd(), "converters/**/*.ts"),
        MyClass
      ]);
    });
  });
  describe("addControllers", () => {
    it("should add controllers", async () => {
      // GIVEN
      const server = await PlatformTest.bootstrap(ServerModule, {});

      class MyClass {}

      // WHEN
      server.addControllers("/test", MyClass);

      // THEN
      expect(server.injector.settings.mount["/test"]).to.deep.eq([MyClass]);
    });
  });
});
