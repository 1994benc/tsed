import {Enumerable, Storable, Type} from "@tsed/core";
import {ParamTypes} from "./ParamTypes";

export interface IParamConstructorOptions {
  target?: Type<any>;
  propertyKey?: string | symbol;
  index: number;
  required?: boolean;
  expression?: string;
  useType?: Type<any>;
  paramType?: string | ParamTypes;
  pipes?: Type<IPipe>[];
}

export interface IPipe<T = any, R = any> {
  transform(value: T, metadata: ParamMetadata): R;
}

export class ParamMetadata extends Storable implements IParamConstructorOptions {
  /**
   *
   */
  @Enumerable()
  public expression: string;
  /**
   *
   */
  @Enumerable()
  public paramType: string | ParamTypes;

  @Enumerable()
  pipes: Type<IPipe>[] = [];

  constructor(options: IParamConstructorOptions) {
    super(options.target as Type<any>, options.propertyKey!, options.index);

    const {expression, paramType, pipes} = options;

    this.expression = expression || this.expression;
    this.paramType = paramType || this.paramType;
    this.pipes = pipes || [];
  }

  get service(): string {
    return this.paramType;
  }

  set service(service: string) {
    this.paramType = service;
  }
}
