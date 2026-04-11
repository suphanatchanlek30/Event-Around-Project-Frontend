// app/(auth)/layout.tsx

import { AuthShell } from "@/components/auth-section";
import type { AuthLayoutProps } from "@/app/(auth)/types";

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <AuthShell>{children}</AuthShell>;
}