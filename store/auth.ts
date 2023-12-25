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
    async authSignUp(credentials: UserSignUpInterface) {
      await $fetch('/api/auth/sign-up', {
        method: 'post',
        body: credentials,
      })
        .then(res => this.handleRes(res))
        .catch(err => this.handleError(err));
    },
    async authSignIn(credentials: UserSignInInterface) {
      await $fetch('/api/auth/sign-in', {
        method: 'post',
        body: credentials,
      })
        .then(res => this.handleRes(res))
        .catch(err => this.handleError(err));
    },
    handleRes(res: object | unknown) {
      if (res && typeof res === 'object') {
        const { accessToken, refreshToken } = res as UserTokensInterface;
        if (accessToken && refreshToken)
          this.setAuthenticated({ accessToken, refreshToken });
      }
    },
    handleError(err: FetchError) {
      throw err.data;
    },
  },
});
