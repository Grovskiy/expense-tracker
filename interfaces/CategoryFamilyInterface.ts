import { CategoryTypeEnum } from '~/enums/CategoryTypeEnum';

export interface CategoryFamilyInterface {
  id: string;
  name: string;
  type: CategoryTypeEnum;
  subcategories: string[];
}
