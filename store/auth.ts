import { defineStore } from 'pinia';

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
  },
});
