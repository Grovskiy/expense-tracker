import type { PaginatedCollectionResponse } from '~/models/PaginatedCollectionResponse';
import type { RepeatableModel } from '~/models/RepeatableModel';
import type { FinancialServiceInterface } from '../models/FinancialServiceInterface';
import type { FinancialCommonModel } from '~/models/FinancialCommonModel';

export function repeatableService(): FinancialServiceInterface {
  async function getFinancial(
    limit: number,
    offset: number,
  ): Promise<PaginatedCollectionResponse<FinancialCommonModel>> {
    return request('/api/RepeatableIncomes', {
      method: 'get',
      query: {
        limit,
        offset,
      },
    }).then(response => {
      const res =
        response as unknown as PaginatedCollectionResponse<RepeatableModel>;
      const mappedData = res.data.map((item: RepeatableModel) =>
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
    return request('/api/RepeatableIncomes', {
      method: 'post',
      body: mapToSubModel(payload),
    });
  }

  function changeFinancial(payload: FinancialCommonModel) {
    return request(`/api/RepeatableIncomes/${payload.id}`, {
      method: 'put',
      body: mapToSubModel(payload),
    });
  }

  function deleteFinancial(id: RepeatableModel['id']) {
    return request(`/api/RepeatableIncomes/${id}`, {
      method: 'delete',
      body: {},
    });
  }

  function mapToSubModel(item: FinancialCommonModel): RepeatableModel {
    return {
      name: item.text,
      amount: item.value,
      taxAmount: item.tax,
      startDate: item.date,
      nextDepositDate: item.anotherDate,
      frequency: item.frequency,
      status: item.status,
      categoryId: item.categoryId,
      currencyId: item.currencyId,
    };
  }

  function mapToCommonModel(item: RepeatableModel): FinancialCommonModel {
    return {
      id: item.id,
      text: item.name,
      value: item.amount,
      tax: item.taxAmount,
      date: item.startDate,
      anotherDate: item.nextDepositDate,
      frequency: item.frequency,
      status: item.status,
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
