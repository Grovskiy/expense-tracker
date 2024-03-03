import { useCategoriesStore } from '~/store/categories';
import { storeToRefs } from 'pinia';
import type { CategoryFamilyInterface } from '~/interfaces/CategoryFamilyInterface';

export function categoriesService() {
  const { setFamilyCategories } = useCategoriesStore();
  const { familyLoaded } = storeToRefs(useCategoriesStore());

  async function getFamilyCategories() {
    if (familyLoaded.value) return;

    await request('/api/Categories/get-family-categories', {
      method: 'get',
    }).then(res => {
      const response = res as CategoryFamilyInterface[];
      setFamilyCategories(response);
    });
  }

  return {
    getFamilyCategories,
  };
}
