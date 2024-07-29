import { defineStore } from 'pinia';
import type { UserTokensInterface } from '~/interfaces/UserTokensInterface';

import { useCurrenciesStore } from '~/store/currencies';
import { useCategoriesStore } from '~/store/categories';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
    accessToken: useCookie('token').value,
    refreshToken: useCookie('tokenRefresh').value,
  }),
  actions: {
    handleRes(res: object | unknown) {
      if (res && typeof res === 'object') {
        if (res?.status === 400 || res?.status === 422) {
          this.handleError(res)
        } else {
          const { accessToken, refreshToken } = res as UserTokensInterface;
          if (accessToken && refreshToken) {
            this.setAuthenticated({ accessToken, refreshToken });
          }
        }
      }
    },
    handleError(err: object) {
      throw err;
    },
    logUserOut() {
      this.setAuthenticated({ accessToken: null, refreshToken: null });

      useCurrenciesStore().$reset();
      useCategoriesStore().$reset();
    },
    setAuthenticated({ accessToken, refreshToken }: UserTokensInterface) {
      this.setTokenCookie({ accessToken, refreshToken });
      this.authenticated = !!accessToken;
    },
    setTokenCookie({ accessToken, refreshToken }: UserTokensInterface) {
      const tokenCookie = useCookie('token');
      const tokenRefreshCookie = useCookie('tokenRefresh');
      tokenCookie.value = accessToken;
      tokenRefreshCookie.value = refreshToken;
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
    },
  },
});
