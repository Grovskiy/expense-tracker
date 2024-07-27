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
    async getDefaultCategories() {
      if (this.defaultLoaded) return;
      await $fetch('/api/Categories/default-expense-categories', {
        method: 'get',
      }).then(res => {
        this.defaultCategories = res as CategoryDefaultInterface[];
        this.defaultLoaded = true;
      });
    },
    async getFamilyCategories() {
      if (this.familyLoaded) return;
      await $fetch('/api/Categories/get-family-categories', {
        method: 'get',
      }).then(res => {
        this.familyCategories = res as CategoryFamilyInterface[];
        this.familyLoaded = true;
      });
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
