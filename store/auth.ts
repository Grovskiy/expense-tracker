import { defineStore } from 'pinia';
import type { UserSignInInterface } from '~/interfaces/UserSignInInterface';
import { FetchError } from 'ofetch';
import type { UserSignUpInterface } from '~/interfaces/UserSignUpInterface';

export interface UserTokensInterface {
  accessToken: string;
  refreshToken: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    setAuthenticated({ accessToken, refreshToken }: UserTokensInterface) {
      if (accessToken) {
        this.setTokenCookie(accessToken, refreshToken);
        this.authenticated = true;
      }
    },
    logUserOut() {
      this.setTokenCookie(null, null);
      this.authenticated = false;
    },
    setTokenCookie(accessToken: string | null, refreshToken: string | null) {
      const tokenCookie = useCookie('token');
      const tokenRefreshCookie = useCookie('tokenRefresh');
      tokenCookie.value = accessToken;
      tokenRefreshCookie.value = refreshToken;
    },
    async authSign(
      credentials: UserSignInInterface | UserSignUpInterface,
      url: '/api/auth/sign-in' | '/api/auth/sign-up',
    ) {
      await $fetch(url, {
        method: 'post',
        body: credentials,
      })
        .then(res => {
          if (res && typeof res === 'object') {
            const { accessToken, refreshToken } = res as UserTokensInterface;
            if (accessToken && refreshToken)
              this.setAuthenticated({ accessToken, refreshToken });
          }
        })
        .catch((err: FetchError) => {
          throw err.data;
        });

      // if (this.authenticated) await router.push('/');
    },
  },
});
