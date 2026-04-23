import axiosInstance from "@/services/axiosInstance";

const AUTH_API_PREFIX = "/api/v1/auth";
const ACCESS_TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refreshToken";
const AUTH_USER_KEY = "authUser";

export type UserRole = "STUDENT" | "ORGANIZER" | "ADMIN";

export type AuthUser = {
  userId: number;
  fullName: string;
  email: string;
  role: UserRole;
  isActive?: boolean;
  profileImageUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterResponseData = {
  userId: number;
  fullName: string;
  email: string;
  role: UserRole;
};

export type LoginResponseData = {
  userId: number;
  fullName: string;
  email: string;
  role: UserRole;
  accessToken: string;
  refreshToken: string;
  tokenType?: string;
  expiresIn?: number;
};

type LoginResponseDataWithNestedUser = {
  accessToken: string;
  refreshToken: string;
  tokenType?: string;
  expiresIn?: number;
  user?: {
    userId?: number;
    fullName?: string;
    email?: string;
    role?: string;
  };
};

export type RefreshTokenResponseData = {
  accessToken: string;
  refreshToken?: string;
  tokenType?: string;
  expiresIn?: number;
};

export type LogoutPayload = {
  refreshToken: string;
};

const persistAuth = (payload: LoginResponseData) => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, payload.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, payload.refreshToken);

  const user: AuthUser = {
    userId: payload.userId,
    fullName: payload.fullName,
    email: payload.email,
    role: payload.role,
  };
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
};

const normalizeUserRole = (role?: string): UserRole => {
  const normalized = role?.trim().toUpperCase();

  if (normalized === "ADMIN") {
    return "ADMIN";
  }

  if (normalized === "ORGANIZER") {
    return "ORGANIZER";
  }

  return "STUDENT";
};

const normalizeLoginResponseData = (raw: unknown): LoginResponseData => {
  const payload = raw as LoginResponseData & LoginResponseDataWithNestedUser;

  if (payload?.user) {
    return {
      userId: payload.user.userId ?? 0,
      fullName: payload.user.fullName ?? "",
      email: payload.user.email ?? "",
      role: normalizeUserRole(payload.user.role),
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
      tokenType: payload.tokenType,
      expiresIn: payload.expiresIn,
    };
  }

  return {
    userId: payload.userId,
    fullName: payload.fullName,
    email: payload.email,
    role: normalizeUserRole(payload.role),
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken,
    tokenType: payload.tokenType,
    expiresIn: payload.expiresIn,
  };
};

export const clearAuthStorage = () => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
};

export const getStoredRefreshToken = () => {
  if (typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem(REFRESH_TOKEN_KEY) ?? "";
};

export const getStoredUser = (): AuthUser | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = localStorage.getItem(AUTH_USER_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
};

export const registerStudent = async (payload: RegisterPayload) => {
  const response = await axiosInstance.post<ApiEnvelope<RegisterResponseData>>(
    `${AUTH_API_PREFIX}/register/student`,
    payload,
  );

  return response.data;
};

export const registerOrganizer = async (payload: RegisterPayload) => {
  const response = await axiosInstance.post<ApiEnvelope<RegisterResponseData>>(
    `${AUTH_API_PREFIX}/register/organizer`,
    payload,
  );

  return response.data;
};

export const login = async (payload: LoginPayload) => {
  const response = await axiosInstance.post<ApiEnvelope<unknown>>(
    `${AUTH_API_PREFIX}/login`,
    payload,
  );

  const normalizedData = normalizeLoginResponseData(response.data.data);

  if (response.data?.success) {
    persistAuth(normalizedData);
  }

  return {
    ...response.data,
    data: normalizedData,
  } as ApiEnvelope<LoginResponseData>;
};

export const refreshAccessToken = async (refreshToken?: string) => {
  const resolvedRefreshToken = refreshToken || getStoredRefreshToken();

  const response = await axiosInstance.post<ApiEnvelope<RefreshTokenResponseData>>(
    `${AUTH_API_PREFIX}/refresh`,
    { refreshToken: resolvedRefreshToken },
  );

  if (response.data?.success && typeof window !== "undefined") {
    const nextAccessToken = response.data.data.accessToken;
    localStorage.setItem(ACCESS_TOKEN_KEY, nextAccessToken);

    if (response.data.data.refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, response.data.data.refreshToken);
    }
  }

  return response.data;
};

export const logout = async (refreshToken?: string) => {
  const resolvedRefreshToken = refreshToken || getStoredRefreshToken();

  const response = await axiosInstance.post<ApiEnvelope<null>>(`${AUTH_API_PREFIX}/logout`, {
    refreshToken: resolvedRefreshToken,
  });

  clearAuthStorage();
  return response.data;
};

export type UpdateMePayload = {
  fullName?: string;
  profileImageUrl?: string;
};

export type ChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export const getMe = async () => {
  const response = await axiosInstance.get<ApiEnvelope<AuthUser>>(`${AUTH_API_PREFIX}/me`);

  if (response.data?.success && typeof window !== "undefined") {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.data.data));
  }

  return response.data;
};

export const updateMe = async (payload: UpdateMePayload) => {
  const response = await axiosInstance.patch<ApiEnvelope<AuthUser>>(
    `${AUTH_API_PREFIX}/me`,
    payload,
  );

  if (response.data?.success && typeof window !== "undefined") {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.data.data));
  }

  return response.data;
};

export const changePassword = async (payload: ChangePasswordPayload) => {
  const response = await axiosInstance.post<ApiEnvelope<null>>(
    `${AUTH_API_PREFIX}/change-password`,
    payload,
  );

  return response.data;
};
