import { categoriesService } from '~/services/categoriesService';
import { currenciesService } from '~/services/currenciesService';
import { useAuthStore } from '~/store/auth';
import { groupService } from '~/services/groupService';

export async function firstLogin() {
  const { authenticated } = storeToRefs(useAuthStore());
  if (!authenticated.value) return;

  await groupService().getGroup();
  currenciesService().getCurrencies();
  categoriesService().getFamilyCategories();
}
