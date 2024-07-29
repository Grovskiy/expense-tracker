import { defineStore } from 'pinia';
import type { CategoryDefaultInterface } from '~/interfaces/CategoryDefaultInterface';
import type { CategoryFamilyInterface } from '~/interfaces/CategoryFamilyInterface';
import { CategoryTypeEnum } from '~/enums/CategoryTypeEnum';
import type { IFetchError } from 'ofetch';

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    defaultCategories: [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'string',
      },
    ] as CategoryDefaultInterface[],
    familyCategories: [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'string',
        type: 'Expense',
        subcategories: ['string'],
      },
    ] as CategoryFamilyInterface[],
    defaultLoaded: false,
    familyLoaded: false,
  }),
  getters: {
    familyCategoriesIncome: state =>
      state.familyCategories.filter(
        item => item.type === CategoryTypeEnum.Income,
      ) as CategoryFamilyInterface[],
    familyCategoriesExpense: state =>
      state.familyCategories.filter(
        item => item.type === CategoryTypeEnum.Expense,
      ) as CategoryFamilyInterface[],
  },
  actions: {
    setDefaultsCategories(res: object | unknown) {
      if (res && typeof res === 'object') {
        this.defaultCategories = res as CategoryDefaultInterface[];
        this.defaultLoaded = true;
      }
    },
    setFamilyCategories(array: CategoryFamilyInterface[]) {
      this.familyCategories = array;
      this.familyLoaded = true;
    },
    handlerErr(err: IFetchError) {
      useToast().add({
        title: `Error ${err.status}`,
        description: err.message,
        timeout: 6000,
        color: 'rose',
      });
    },
  },
});
