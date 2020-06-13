import {Metadata, Type} from "@tsed/core";
import {PARAM_METADATA} from "../constants";
import {ParamMetadata} from "../models/ParamMetadata";

export class ParamRegistry {
  static get(target: Type<any>, propertyKey: string | symbol, index: number): ParamMetadata {
    const params = this.getParams(target, propertyKey);

    if (!this.has(target, propertyKey, index)) {
      params[index] = new ParamMetadata({target, propertyKey, index});
      this.set(target, propertyKey, index, params[index]);
    }

    return params[index];
  }

  static has(target: Type<any>, propertyKey: string | symbol, index: number) {
    return !!this.getParams(target, propertyKey)[index];
  }

  static set(target: Type<any>, propertyKey: string | symbol, index: number, paramMetadata: ParamMetadata): void {
    const params = this.getParams(target, propertyKey);

    params[index] = paramMetadata;

    Metadata.set(PARAM_METADATA, params, target, propertyKey);
  }

  static getParams(target: Type<any>, propertyKey: string | symbol): ParamMetadata[] {
    return Metadata.has(PARAM_METADATA, target, propertyKey) ? Metadata.get(PARAM_METADATA, target, propertyKey) : [];
  }
}
