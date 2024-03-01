import type { ExpenseModel } from '~/models/expense/ExpenseModel';
import type { PaginatedCollectionResponse } from '~/models/PaginatedCollectionResponse';
import type { FinancialServiceInterface } from './FinancialServiceInterface';
import type { FinancialCommonModel } from '~/models/FinancialCommonModel';
import { FrequencyEnum } from '~/enums/FrequencyEnum';
import { StatusSubEnum } from '~/enums/StatusSubEnum';

export function expensesService(): FinancialServiceInterface {
  async function getFinancial(
    limit: number,
    offset: number,
    dateFrom: string,
    dateTo: string,
  ): Promise<PaginatedCollectionResponse<FinancialCommonModel>> {
    return $fetch('/api/Expenses', {
      method: 'get',
      query: {
        limit,
        offset,
        dateFrom,
        dateTo,
      },
    }).then((response) => {
      const res = response as unknown as PaginatedCollectionResponse<ExpenseModel>
      const mappedData = res.data.map((item: ExpenseModel) => mapToCommonModel(item));

      return {
        data: mappedData,
        limit: res.limit,
        offset: res.offset,
        total: res.total,
      };
    });
  }

  function postFinancial(payload: FinancialCommonModel) {
    return $fetch('/api/Expenses', {
      method: 'post',
      body: mapToSubModel(payload),
    });
  }

  function changeFinancial(payload: FinancialCommonModel) {
    return $fetch(`/api/Expenses/${payload.id}`, {
      method: 'put',
      body: mapToSubModel(payload),
    });
  }

  function deleteFinancial(id: FinancialCommonModel['id']) {
    return $fetch(`/api/Expenses/${id}`, {
      method: 'delete',
      body: {},
    });
  }

  function mapToSubModel(item: FinancialCommonModel): ExpenseModel {
    return {
      notes: item.text,
      cost: item.value,
      date: item.date,
      categoryId: item.categoryId,
      currencyId: item.currencyId
    }
  }
  function mapToCommonModel(item: ExpenseModel): FinancialCommonModel {
    return {
      id: item.id,
      text: item.notes,
      value: item.cost,
      tax: 0,
      date: item.date,
      anotherDate: '', // not used
      frequency: FrequencyEnum.Weekly, // not used
      status: StatusSubEnum.Active, // not used
      categoryId: item.categoryId,
      currencyId: item.currencyId
    }
  }

  return {
    getFinancial,
    postFinancial,
    changeFinancial,
    deleteFinancial,
  };
}
