import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import type { RootState } from "../store";
import { logout, setTokens } from "../features/auth/authSlice";

const API_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ||
  "http://localhost:5000/api/v1";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

// Single in-flight refresh — prevents N parallel 401s from triggering
// N refresh calls. All waiters share the same promise and resolve together.
let refreshPromise: Promise<string | null> | null = null;

interface RefreshResponse {
  data: { token: string; refreshToken?: string };
}

const performRefresh = async (
  api: Parameters<BaseQueryFn>[1],
): Promise<string | null> => {
  const state = api.getState() as RootState;
  const refreshToken = state.auth.refreshToken;

  // Backend may also rely on an httpOnly cookie — send the body too if we
  // have one stored client-side. Either path works as long as the server
  // accepts it.
  const refreshResult = await rawBaseQuery(
    {
      url: "/auth/refresh-token",
      method: "POST",
      body: refreshToken ? { refreshToken } : undefined,
    },
    api,
    {},
  );

  if (refreshResult.error || !refreshResult.data) {
    api.dispatch(logout());
    return null;
  }

  const { token, refreshToken: newRefresh } = (
    refreshResult.data as RefreshResponse
  ).data;

  api.dispatch(
    setTokens({
      token,
      refreshToken: newRefresh ?? refreshToken ?? null,
    }),
  );

  return token;
};

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status !== 401) return result;

  // Don't try to refresh the refresh call itself
  const isRefreshCall =
    typeof args !== "string" && args.url === "/auth/refresh-token";
  if (isRefreshCall) {
    api.dispatch(logout());
    return result;
  }

  // Coalesce concurrent refreshes through a single shared promise
  if (!refreshPromise) {
    refreshPromise = performRefresh(api).finally(() => {
      refreshPromise = null;
    });
  }

  const newToken = await refreshPromise;
  if (!newToken) return result;

  // Retry original request once with the new token
  result = await rawBaseQuery(args, api, extraOptions);
  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Auth",
    "Employee",
    "Department",
    "Designation",
    "Role",
    "Permission",
    "Category",
    "Brand",
    "Product",
    "Blog",
    "Job",
    "Subscription",
  ],
  endpoints: () => ({}),
});
