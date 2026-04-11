// components/auth-section/constants/auth-config.ts

import type { AuthPageConfigMap } from "@/components/auth-section/types";

export const AUTH_PAGE_CONFIGS = {
  login: {
    title: "ยินดีต้อนรับกลับ",
    subtitle: "เข้าสู่ระบบเพื่อใช้งาน Event Around ต่อได้ทันที",
    submitLabel: "เข้าสู่ระบบ",
    switchLabel: "สร้างบัญชี",
    switchHref: "/register",
    helperLink: {
      label: "ลืมรหัสผ่าน?",
      href: "/forgot-password",
    },
    fields: [
      {
        name: "email",
        label: "อีเมลมหาวิทยาลัย",
        type: "email",
        placeholder: "name@university.ac.th",
        autoComplete: "email",
      },
      {
        name: "password",
        label: "รหัสผ่าน",
        type: "password",
        placeholder: "กรอกรหัสผ่าน",
        autoComplete: "current-password",
      },
    ],
    footerNote: "การดำเนินการต่อถือว่าคุณยอมรับเงื่อนไขและนโยบายความเป็นส่วนตัวของระบบ",
  },
  register: {
    title: "สร้างบัญชีใหม่",
    subtitle: "ลงทะเบียนใช้งานได้ในไม่กี่ขั้นตอน",
    submitLabel: "สร้างบัญชี",
    switchLabel: "กลับไปเข้าสู่ระบบ",
    switchHref: "/login",
    fields: [
      {
        name: "fullName",
        label: "ชื่อ-นามสกุล",
        type: "text",
        placeholder: "กรอกชื่อ-นามสกุล",
        autoComplete: "name",
      },
      {
        name: "email",
        label: "อีเมลมหาวิทยาลัย",
        type: "email",
        placeholder: "name@university.ac.th",
        autoComplete: "email",
      },
      {
        name: "password",
        label: "รหัสผ่าน",
        type: "password",
        placeholder: "ตั้งรหัสผ่านที่ปลอดภัย",
        autoComplete: "new-password",
      },
      {
        name: "confirmPassword",
        label: "ยืนยันรหัสผ่าน",
        type: "password",
        placeholder: "กรอกรหัสผ่านอีกครั้ง",
        autoComplete: "new-password",
      },
    ],
    footerNote: "",
  },
} as const satisfies AuthPageConfigMap;