import { AuthForm, AUTH_PAGE_CONFIGS } from "@/components/auth-section";
import { LOGIN_PAGE_METADATA } from "@/app/(auth)/login/page.config";

export const metadata = LOGIN_PAGE_METADATA;

export default function LoginPage() {
  return <AuthForm mode="login" config={AUTH_PAGE_CONFIGS.login} />;
}