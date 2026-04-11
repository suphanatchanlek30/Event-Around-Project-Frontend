import type { AuthMode } from "@/components/auth-section/types";

export const AUTH_MODE_BADGE_LABEL: Record<AuthMode, string> = {
  login: "เข้าสู่ระบบ",
  register: "สมัครสมาชิก",
};

export const AUTH_MODE_ACCOUNT_PROMPT: Record<AuthMode, string> = {
  login: "ยังไม่มีบัญชีใช่ไหม?",
  register: "มีบัญชีอยู่แล้วใช่ไหม?",
};

export const AUTH_REMEMBER_ME_LABEL = "จดจำฉัน";

export const AUTH_REGISTER_SUPPORT_TEXT = "ใช้อีเมลมหาวิทยาลัยสำหรับการเข้าใช้งาน";