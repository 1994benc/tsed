import {createHttpServer, createHttpsServer, PlatformTest} from "@tsed/common";

import {PlatformExpress} from "./components/PlatformExpress";

PlatformTest.platformBuilder = PlatformExpress;

// INTERFACES
export * from "./interfaces";

// DECORATORS
export * from "./decorators/responseView";
export * from "./decorators/mergeParams";
export * from "./decorators/strict";
export * from "./decorators/caseSensitive";

// MIDDLEWARES
export * from "./middlewares";

// SERVICES
export * from "./services";

// PLATFORM
export * from "./components/PlatformExpress";

export {createHttpServer, createHttpsServer};
