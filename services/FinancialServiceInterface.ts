import type { FinancialCommonModel } from '~/models/FinancialCommonModel';
import type { PaginatedCollectionResponse } from '~/models/PaginatedCollectionResponse';

export interface FinancialServiceInterface {
  getFinancial(
    limit: number,
    offset: number,
    dateFrom?: string,
    dateTo?: string,
  ): Promise<PaginatedCollectionResponse<FinancialCommonModel>>;
  postFinancial(payload: FinancialCommonModel): void;
  changeFinancial(payload: FinancialCommonModel): void;
  deleteFinancial(id: FinancialCommonModel['id']): void;
}
