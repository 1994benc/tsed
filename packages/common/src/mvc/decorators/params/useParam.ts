import {applyDecorators} from "@tsed/core";
import {IParamOptions} from "../../interfaces/IParamOptions";
import {ParamTypes} from "../../models/ParamTypes";
import {UseDeserialization} from "./useDeserialization";
import {UseParamExpression} from "./useParamExpression";
import {UseParamType} from "./useParamType";
import {UseType} from "./useType";
import {UseValidation} from "./useValidation";

function mapPipes(options: IParamOptions<any> = {}) {
  return [
    options.useType && UseType(options.useType),
    options.expression && UseParamExpression(options.expression),
    options.useValidation && UseValidation(),
    options.useConverter && UseDeserialization()
  ];
}

/**
 * Register a new param. It use the paramType to extract value and give it to the next pipe.
 *
 * Given options allow to enable or disable following pipes:
 *
 * - useType: Add extra type for the json mapper,
 * - expression: Get property from the returned value by the previous pipe.
 * - useValidation: Apply validation from the returned value by the previous pipe.
 * - useConverter: Apply json mapper from the returned value by the previous pipe.
 *
 * @param paramType
 * @param options
 * @decorator
 */
export function UseParam(paramType: ParamTypes | string, options: IParamOptions<any> = {}): ParameterDecorator {
  return applyDecorators(UseParamType(paramType), ...mapPipes(options)) as ParameterDecorator;
}
