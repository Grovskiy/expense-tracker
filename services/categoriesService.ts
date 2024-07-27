import { useCategoriesStore } from '~/store/categories';
import { storeToRefs } from 'pinia';
import type { CategoryFamilyInterface } from '~/interfaces/CategoryFamilyInterface';

export function categoriesService() {
  const { setFamilyCategories } = useCategoriesStore();
  const { familyLoaded } = storeToRefs(useCategoriesStore());

  async function getFamilyCategories() {
    if (familyLoaded.value) return;

    await request('/api/Categories/get-group-categories', {
      method: 'get',
    }).then(res => {
      const response = res as CategoryFamilyInterface[];
      setFamilyCategories(response);
    });
  }

  function handlerThenCategory(text: string) {
    familyLoaded.value = false;
    getFamilyCategories();
    useToast().add({
      title: text,
      timeout: 2000,
    });
  }

  return {
    getFamilyCategories,
    handlerThenCategory,
  };
}
