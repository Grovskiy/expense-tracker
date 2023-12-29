import { CategoryTypeEnum } from '~/enums/CategoryTypeEnum';

export interface CategoryPayloadInterface {
  name: string;
  type: CategoryTypeEnum;
  parentCategoryId: string | null;
}
