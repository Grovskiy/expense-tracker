import { defineStore } from 'pinia';
import type { UserSignInInterface } from '~/interfaces/UserSignInInterface';
import type { IFetchError } from 'ofetch';
import type { UserSignUpInterface } from '~/interfaces/UserSignUpInterface';
import { setAuthFetchHeaders } from '~/utils/setAuthFetchHeaders';
import type { UserTokensInterface } from '~/interfaces/UserTokensInterface';

import { useCurrenciesStore } from '~/store/currencies';


export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
    accessToken: useCookie('token').value,
    refreshToken: useCookie('tokenRefresh').value,
  }),
  actions: {
    async authSignUp(credentials: UserSignUpInterface): Promise<void> {
      await $fetch('/api/Authentication/sign-up', {
        method: 'post',
        body: credentials,
      })
        .then(res => this.handleRes(res))
        .catch(err => this.handleError(err));
    },
    async authSignIn(credentials: UserSignInInterface) {
      await $fetch('/api/Authentication/sign-in', {
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
    handleError(err: IFetchError) {
      throw err.data;
    },
    // async goRefreshTokens(
    //   accessToken: UserTokensInterface,
    //   refreshToken: UserTokensInterface,
    // ): Promise<void> {
    //   console.log('goRefreshTokens', accessToken, refreshToken);
    //   await $fetch('/api/auth/refresh-token', {
    //     method: 'post',
    //     body: {
    //       accessToken: accessToken,
    //       refreshToken: refreshToken,
    //     },
    //   })
    logUserOut() {
      this.setAuthenticated({ accessToken: null, refreshToken: null });

      useCurrenciesStore().$reset();
    },
    setAuthenticated({ accessToken, refreshToken }: UserTokensInterface) {
        this.setTokenCookie({ accessToken, refreshToken });
        this.authenticated = !!accessToken;
        setAuthFetchHeaders(accessToken);
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
