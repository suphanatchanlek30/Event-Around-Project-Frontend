import { login } from "@/services/authService";

export type LoginServicePayload = {
  email: string;
  password: string;
};

export type LoginServiceResult = {
  success: boolean;
  message: string;
  [key: string]: unknown;
};

export const loginService = async (
  values: LoginServicePayload,
): Promise<LoginServiceResult> => {
  try {
    const response = await login(values);
    return response as LoginServiceResult;
  } catch (error) {
    const fallbackMessage = "เข้าสู่ระบบล้มเหลว";

    if (typeof error === "object" && error !== null && "response" in error) {
      const response = (error as { response?: { data?: { message?: string } } }).response;
      const message = response?.data?.message ?? fallbackMessage;

      return {
        success: false,
        message,
      };
    }

    return {
      success: false,
      message: fallbackMessage,
    };
  }
};
