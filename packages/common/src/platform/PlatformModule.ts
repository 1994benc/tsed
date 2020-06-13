import {InjectorService, Module} from "@tsed/di";
import {MvcModule} from "../mvc";
import {Platform} from "./services/Platform";

@Module({
  imports: [InjectorService, MvcModule, Platform]
})
export class PlatformModule {
  constructor(platform: Platform) {
    platform.createRoutersFromControllers();
  }
}
