import type { FetchRequest, FetchOptions } from 'ofetch';
import { ofetch, FetchError } from 'ofetch';
import { useAuthStore } from '~/store/auth';

const runtimeConfig = useRuntimeConfig();

const fetcher = ofetch.create({
  baseURL: runtimeConfig.public.baseUrl,
  async onRequest({ options }) {
    const accessToken = useCookie('token').value;
    const groupCurrentId = useCookie('groupCurrentId').value;

    if (accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    if (groupCurrentId) {
      options.headers = {
        ...options.headers,
        GroupId: groupCurrentId,
      };
    }
  },
  async onResponse({ response }) {
    const { setAuthenticated } = useAuthStore();
    if (response.status === 401 && useCookie('tokenRefresh').value) {
      const { accessToken, refreshToken } = await ofetch(
        '/api/Authentication/refresh-token',
        {
          baseURL: runtimeConfig.public.baseUrl,
          method: 'POST',
          body: {
            accessToken: useCookie('token').value,
            refreshToken: useCookie('tokenRefresh').value,
          },
        },
      );
      setAuthenticated({ accessToken, refreshToken });
    }
  },
});

export const request = async <T>(
  request: FetchRequest,
  options?: FetchOptions,
) => {
  try {
    const response = await fetcher.raw(request, options);
    return response._data as T;
  } catch (err) {
    const error = err as unknown as FetchError;
    if (error.response?.status === 401 && useCookie('tokenRefresh').value) {
      const response = await fetcher.raw(request, options);
      return response._data as T;
    }

    return error.response?._data as T;
  }
};
