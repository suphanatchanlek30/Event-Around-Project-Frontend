import { AuthForm, AUTH_PAGE_CONFIGS } from "@/components/auth-section";
import { REGISTER_PAGE_METADATA } from "@/app/(auth)/register/page.config";

export const metadata = REGISTER_PAGE_METADATA;

export default function RegisterPage() {
  return <AuthForm mode="register" config={AUTH_PAGE_CONFIGS.register} />;
}