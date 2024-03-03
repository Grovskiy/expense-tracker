import type { PaginatedCollectionResponse } from '~/models/PaginatedCollectionResponse';
import type { IncomeModel } from '~/models/income/IncomeModel';
import type { FinancialCommonModel } from '~/models/FinancialCommonModel';
import type { FinancialServiceInterface } from '../models/FinancialServiceInterface';
import { FrequencyEnum } from '~/enums/FrequencyEnum';
import { StatusSubEnum } from '~/enums/StatusSubEnum';

export function incomesService(): FinancialServiceInterface {
  async function getFinancial(
    limit: number,
    offset: number,
    dateFrom: string,
    dateTo: string,
  ): Promise<PaginatedCollectionResponse<FinancialCommonModel>> {
    return request('/api/Incomes', {
      method: 'get',
      query: {
        limit,
        offset,
        dateFrom,
        dateTo,
      },
    }).then(response => {
      const res =
        response as unknown as PaginatedCollectionResponse<IncomeModel>;
      const mappedData = res.data.map((item: IncomeModel) =>
        mapToCommonModel(item),
      );

      return {
        data: mappedData,
        limit: res.limit,
        offset: res.offset,
        total: res.total,
      };
    });
  }
  function postFinancial(payload: FinancialCommonModel) {
    return request('/api/Incomes', {
      method: 'post',
      body: mapToSubModel(payload),
    });
  }

  function changeFinancial(payload: FinancialCommonModel) {
    return request(`/api/Incomes/${payload.id}`, {
      method: 'put',
      body: mapToSubModel(payload),
    });
  }

  function deleteFinancial(id: FinancialCommonModel['id']) {
    return request(`/api/Incomes/${id}`, {
      method: 'delete',
      body: {},
    });
  }

  function mapToSubModel(item: FinancialCommonModel): IncomeModel {
    return {
      notes: item.text,
      amount: item.value,
      taxAmount: item.tax,
      date: item.date,
      categoryId: item.categoryId,
      currencyId: item.currencyId,
    };
  }
  function mapToCommonModel(item: IncomeModel): FinancialCommonModel {
    return {
      id: item.id,
      text: item.notes,
      value: item.amount,
      tax: item.taxAmount,
      date: item.date,
      anotherDate: '', // not used
      frequency: FrequencyEnum.Weekly, // not used
      status: StatusSubEnum.Active, // not used
      categoryId: item.categoryId,
      currencyId: item.currencyId,
    };
  }

  return {
    getFinancial,
    postFinancial,
    changeFinancial,
    deleteFinancial,
  };
}
