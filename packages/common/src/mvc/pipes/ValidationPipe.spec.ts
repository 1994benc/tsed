import {ParamMetadata, ParamTypes} from "@tsed/common";
import {expect} from "chai";
import {ValidationPipe} from "./ValidationPipe";

describe("ValidationPipe", () => {
  it("should return value", async () => {
    const validator = new ValidationPipe();

    class Test {
    }

    const param = new ParamMetadata({
      index: 0,
      target: Test,
      propertyKey: "test",
      paramType: ParamTypes.REQUEST
    });
    // @ts-ignore
    param._type = String;
    param.collectionType = Array;

    // WHEN
    expect(validator.transform("value", param)).to.deep.eq("value");
  });
});
