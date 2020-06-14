import {Module} from "@tsed/di";
import {ConverterModule} from "../converters/ConverterModule";
import {ValidationService} from "./services/ValidationService";

@Module({
  imports: [ConverterModule, ValidationService]
})
export class MvcModule {}
