import { ProductLine } from './product-line';
import { User } from './user';

export enum ProductType {
  normal,
  multiBranch,
  multiPlatform
}

// export enum ProductStatus {
//   open,
//   close
// }

export enum ProductAccessControl {
  default,
  private,
  whiteList
}

export class Product {
  id: number;
  name: string;
  code: string;
  productLine: ProductLine;
  leader: User;
  testLeader: User;
  releaseLeader: User;
  type: ProductType;
  closed: boolean;
  description: string;
  accessControl: ProductAccessControl;
}
