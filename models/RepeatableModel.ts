import type { FrequencyEnum } from '~/enums/FrequencyEnum';
import type { StatusSubEnum } from '~/enums/StatusSubEnum';

export interface RepeatableModel {
  id?: string;
  name: string;
  amount: number;
  taxAmount: number;
  startDate: string;
  nextDepositDate: string;
  frequency: FrequencyEnum;
  status: StatusSubEnum;
  categoryId: string;
  currencyId: string;
}
