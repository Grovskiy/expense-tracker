import { ofetch } from 'ofetch';
import type { UserTokensInterface } from '~/interfaces/UserTokensInterface';

export const setAuthFetchHeaders = (
  accessToken: UserTokensInterface['accessToken'],
) => {
  const headers = { 'Content-Type': 'application/json' };
  const runtimeConfig = useRuntimeConfig();

  globalThis.$fetch = ofetch.create({
    baseURL: runtimeConfig.public.baseUrl,
    onRequest(context) {
      context.options.headers = accessToken
        ? { Authorization: `Bearer ${accessToken}`, ...headers }
        : { ...headers };
    },
  });
};
