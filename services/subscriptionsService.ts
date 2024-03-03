import type { FinancialCommonModel } from '~/models/FinancialCommonModel';
import type { PaginatedCollectionResponse } from '~/models/PaginatedCollectionResponse';
import type { SubscriptionsModel } from '~/models/SubscriptionModel';
import type { FinancialServiceInterface } from '../models/FinancialServiceInterface';

export function subscriptionsService(): FinancialServiceInterface {
  async function getFinancial(
    limit: number,
    offset: number,
  ): Promise<PaginatedCollectionResponse<FinancialCommonModel>> {
    return request('/api/Subscriptions', {
      method: 'get',
      query: {
        limit,
        offset,
      },
    }).then(response => {
      const res =
        response as unknown as PaginatedCollectionResponse<SubscriptionsModel>;
      const mappedData = res.data.map((item: SubscriptionsModel) =>
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

  async function postFinancial(payload: FinancialCommonModel) {
    return request('/api/Subscriptions', {
      method: 'post',
      body: mapToSubModel(payload),
    });
  }

  function changeFinancial(payload: FinancialCommonModel) {
    return request(`/api/Subscriptions/${payload.id}`, {
      method: 'put',
      body: mapToSubModel(payload),
    });
  }

  function deleteFinancial(id: FinancialCommonModel['id']) {
    return request(`/api/Subscriptions/${id}`, {
      method: 'delete',
      body: {},
    });
  }

  function mapToSubModel(item: FinancialCommonModel): SubscriptionsModel {
    return {
      name: item.text,
      cost: item.value,
      startDate: item.date,
      nextBillingDate: item.anotherDate,
      frequency: item.frequency,
      status: item.status,
      categoryId: item.categoryId,
      currencyId: item.currencyId,
    };
  }
  function mapToCommonModel(item: SubscriptionsModel): FinancialCommonModel {
    return {
      id: item.id,
      text: item.name,
      value: item.cost,
      tax: 0,
      date: item.startDate,
      anotherDate: item.nextBillingDate,
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
