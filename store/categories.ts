import { defineStore } from 'pinia';
import type { CategoryDefaultInterface } from '~/interfaces/CategoryDefaultInterface';
import type { CategoryFamilyInterface } from '~/interfaces/CategoryFamilyInterface';
import type { CategoryPayloadInterface } from '~/interfaces/CategoryPayloadInterface';

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
      });
    },
    async putCategories(
      id: CategoryFamilyInterface['id'],
      name: CategoryFamilyInterface['name'],
    ) {
      // update name category
      await $fetch('/api/Categories/', {
        query: { id },
        body: {
          name,
        },
      });
    },
  },
});
