import type { PaginatedCollectionResponse } from '~/models/PaginatedCollectionResponse';
import type { RepeatableModel } from '~/models/RepeatableModel';

export function repeatableService() {
  function getRepeatable(
    limit: number,
    offset: number,
  ): Promise<PaginatedCollectionResponse<RepeatableModel>> {
    return $fetch('/api/RepeatableIncomes', {
      method: 'get',
      query: {
        limit,
        offset,
      },
    });
  }

  async function postRepeatable(payload: RepeatableModel) {
    return $fetch('/api/RepeatableIncomes', {
      method: 'post',
      body: payload,
    });
  }

  function changeRepeatable(payload: RepeatableModel) {
    const {
      id,
      name,
      amount,
      taxAmount,
      startDate,
      nextDepositDate,
      frequency,
      status,
      categoryId,
      currencyId,
    } = payload;
    return $fetch(`/api/RepeatableIncomes/${id}`, {
      method: 'put',
      body: {
        name,
        amount,
        taxAmount,
        startDate,
        nextDepositDate,
        frequency,
        status,
        categoryId,
        currencyId,
      },
    });
  }

  function deleteRepeatable(id: RepeatableModel['id']) {
    return $fetch(`/api/RepeatableIncomes/${id}`, {
      method: 'delete',
      body: {},
    });
  }

  return {
    getRepeatable,
    postRepeatable,
    changeRepeatable,
    deleteRepeatable,
  };
}
