import type { PaginatedCollectionResponse } from '~/models/PaginatedCollectionResponse';
import type { SubscriptionsModel } from '~/models/SubscriptionModel';

export function subscriptionsService() {
  function getSubscriptions(
    limit: number,
    offset: number,
  ): Promise<PaginatedCollectionResponse<SubscriptionsModel>> {
    return $fetch('/api/Subscriptions', {
      method: 'get',
      query: {
        limit,
        offset,
      },
    });
  }

  async function postSubscriptions(payload: SubscriptionsModel) {
    return $fetch('/api/Subscriptions', {
      method: 'post',
      body: payload,
    });
  }

  function changeSubscriptions(payload: SubscriptionsModel) {
    const {
      id,
      name,
      cost,
      nextBillingDate,
      frequency,
      status,
      categoryId,
      currencyId,
    } = payload;
    return $fetch(`/api/Subscriptions/${id}`, {
      method: 'put',
      body: {
        name,
        cost,
        nextBillingDate,
        frequency,
        status,
        categoryId,
        currencyId,
      },
    });
  }

  function deleteSubscriptions(id: SubscriptionsModel['id']) {
    return $fetch(`/api/Subscriptions/${id}`, {
      method: 'delete',
      body: {},
    });
  }

  return {
    getSubscriptions,
    postSubscriptions,
    changeSubscriptions,
    deleteSubscriptions,
  };
}
