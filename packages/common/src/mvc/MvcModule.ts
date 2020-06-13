import {Module} from "@tsed/di";
import {ConverterModule} from "../converters/ConverterModule";

@Module({
  imports: [ConverterModule]
})
export class MvcModule {}
