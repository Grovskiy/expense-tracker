import type { FrequencyEnum } from "~/enums/FrequencyEnum";
import type { StatusSubEnum } from "~/enums/StatusSubEnum";

export interface FinancialCommonModel {
  id?: string;
  text: string; // name | notes

  value: number; // amount | cost
  tax?: number;

  frequency?: FrequencyEnum;
  status?: StatusSubEnum;

  date: string; // 2024-01-03T19:01:12.407Z
  anotherDate?: string;

  categoryId: string;
  currencyId: string;
}