import { defineStore } from 'pinia';
import type { CategoryDefaultInterface } from '~/interfaces/CategoryDefaultInterface';
import type { CategoryFamilyInterface } from '~/interfaces/CategoryFamilyInterface';
import type { CategoryPayloadInterface } from '~/interfaces/CategoryPayloadInterface';
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
        type: 0,
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
    async postCategories(payload: CategoryPayloadInterface) {
      // create category or subcategory
      await $fetch('/api/Categories', {
        method: 'post',
        body: payload,
      })
        .then(() => this.handlerThen('Створено категорію'))
        .catch(err => this.handlerErr(err));
    },
    async putCategories(
      id: CategoryFamilyInterface['id'],
      name: CategoryFamilyInterface['name'],
    ) {
      // update name category
      await $fetch(`/api/Categories/${id}`, {
        method: 'put',
        body: {
          name,
        },
      })
        .then(() => this.handlerThen('Назву змінено'))
        .catch(err => this.handlerErr(err));
    },
    async deleteCategories(id: CategoryFamilyInterface['id']) {
      // delete category
      await $fetch(`/api/Categories/${id}`, {
        method: 'delete',
        body: {},
      })
        .then(() => this.handlerThen('Категорію видалено'))
        .catch(err => this.handlerErr(err));
    },
    handlerThen(text: string) {
      this.familyLoaded = false;
      this.getFamilyCategories();
      useToast().add({
        title: text,
        timeout: 2000,
      });
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
