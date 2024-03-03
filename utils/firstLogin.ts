import { categoriesService } from '~/services/categoriesService';
import { currenciesService } from '~/services/currenciesService';
import { useAuthStore } from '~/store/auth';

export function firstLogin() {
  const { authenticated } = storeToRefs(useAuthStore());
  if (!authenticated.value) return;

  currenciesService().getCurrencies();
  categoriesService().getFamilyCategories();
}
