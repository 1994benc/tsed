import {ParamRegistry, ParamTypes, Property, Required, UseParam} from "@tsed/common";
import {Description, Example, Title} from "@tsed/swagger";
import {expect} from "chai";

export class MyModel {
  @Title("iD")
  @Description("Description of calendar model id")
  @Example("example1", "Description example")
  @Property()
  public id: string;

  @Property()
  @Required()
  public name: string;
}

describe("@UseParam", () => {
  it("should create useParam", () => {
    class Test {
    }

    class Ctrl {
      test(
        @UseParam(ParamTypes.BODY, {
          expression: "expression",
          useConverter: true,
          useValidation: true,
          paramType: ParamTypes.BODY,
          useType: Test
        })
          body: Test
      ) {
      }
    }

    const param = ParamRegistry.get(Ctrl, "test", 0);
    expect(param.expression).to.eq("expression");
    expect(param.paramType).to.eq(ParamTypes.BODY);
    expect(param.type).to.eq(Test);
  });
});
