import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
  [key: string]: unknown;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  refreshToken: string | null;
}

const STORAGE_KEY = "bonafide.auth";

const loadFromStorage = (): AuthState => {
  if (typeof window === "undefined")
    return { user: null, token: null, refreshToken: null };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { user: null, token: null, refreshToken: null };
    const parsed = JSON.parse(raw) as AuthState;
    return {
      user: parsed.user ?? null,
      token: parsed.token ?? null,
      refreshToken: parsed.refreshToken ?? null,
    };
  } catch {
    return { user: null, token: null, refreshToken: null };
  }
};

const persist = (state: AuthState) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore quota / privacy mode errors
  }
};

const clearStorage = () => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
};

const initialState: AuthState = loadFromStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload,
      }: PayloadAction<{
        user: AuthUser;
        token: string;
        refreshToken?: string | null;
      }>,
    ) => {
      state.user = payload.user;
      state.token = payload.token;
      if (payload.refreshToken !== undefined) {
        state.refreshToken = payload.refreshToken;
      }
      persist(state);
    },
    setTokens: (
      state,
      {
        payload,
      }: PayloadAction<{ token: string; refreshToken?: string | null }>,
    ) => {
      state.token = payload.token;
      if (payload.refreshToken !== undefined) {
        state.refreshToken = payload.refreshToken;
      }
      persist(state);
    },
    updateUser: (state, { payload }: PayloadAction<Partial<AuthUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...payload };
        persist(state);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      clearStorage();
    },
  },
});

export const { setCredentials, setTokens, updateUser, logout } =
  authSlice.actions;
export default authSlice.reducer;
