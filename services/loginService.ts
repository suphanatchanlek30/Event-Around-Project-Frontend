import axiosInstance from "@/services/axiosInstance";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResult = {
  status: "success" | "fail";
  message?: string;
  [key: string]: unknown;
};

export const loginService = async (values: LoginPayload): Promise<LoginResult> => {
  try {
    const response = await axiosInstance.post("/auth/login", values);
    return response.data as LoginResult;
  } catch {
    return {
      status: "fail",
      message: "เข้าสู่ระบบล้มเหลว",
    };
  }
};
