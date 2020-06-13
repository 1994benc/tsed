import {AdditionalProperties, IgnoreProperty, Property, Required} from "@tsed/common";

class Product {
  @Property()
  name: string;

  @Property()
  categoryId: number;

  @Property()
  description: string;
}

@AdditionalProperties(true)
export class UserProductPostModel extends Product {
  @Required()
  name: string;

  @IgnoreProperty()
  categoryId: number;

  @Property()
  description: string;
}

@AdditionalProperties(true)
export class AdminProductPostModel extends Product {
  @Required()
  name: string;

  @Required()
  categoryId: number;

  @Property()
  description: string;
}
