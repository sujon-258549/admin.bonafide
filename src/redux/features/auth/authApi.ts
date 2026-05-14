import { baseApi } from "../../api/baseApi";
import { setCredentials, setTokens, logout, type AuthUser } from "./authSlice";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    user: AuthUser;
    token: string;
    refreshToken?: string;
  };
}

export interface RefreshResponse {
  data: {
    token: string;
    refreshToken?: string;
  };
}

export interface MeResponse {
  data: AuthUser;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              user: data.data.user,
              token: data.data.token,
              refreshToken: data.data.refreshToken ?? null,
            }),
          );
        } catch {
          // Surface error via mutation result
        }
      },
      invalidatesTags: ["Auth"],
    }),

    refreshToken: builder.mutation<RefreshResponse, void>({
      query: () => ({ url: "/auth/refresh-token", method: "POST" }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setTokens({
              token: data.data.token,
              refreshToken: data.data.refreshToken ?? null,
            }),
          );
        } catch {
          dispatch(logout());
        }
      },
    }),

    logout: builder.mutation<{ success: boolean }, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(logout());
        }
      },
      invalidatesTags: ["Auth"],
    }),

    getMe: builder.query<MeResponse, void>({
      query: () => "/auth/me",
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useGetMeQuery,
} = authApi;
