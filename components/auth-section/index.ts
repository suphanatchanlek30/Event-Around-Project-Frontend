// components/auth-section/index.ts

export { AUTH_PAGE_CONFIGS } from "@/components/auth-section/constants/auth-config";
export { default as AuthShell } from "@/components/auth-section/auth-shell";
export { default as AuthForm } from "@/components/auth-section/auth-form/auth-form";

export type {
  AuthMode,
  AuthFieldType,
  AuthFieldConfig,
  AuthHelperLink,
  AuthPageConfig,
  AuthPageConfigMap,
} from "@/components/auth-section/types";