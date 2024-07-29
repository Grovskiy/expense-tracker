import type { FrequencyEnum } from '~/enums/FrequencyEnum';
import type { StatusSubEnum } from '~/enums/StatusSubEnum';

export interface SubscriptionsModel {
  id?: string;
  name: string;
  cost: number;
  startDate: string;
  nextBillingDate: string;
  frequency: FrequencyEnum;
  status: StatusSubEnum;
  category: { id: string };
  currency: { id: string };
}
