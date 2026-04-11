import Link from "next/link";

import { AUTH_REGISTER_SUPPORT_TEXT, AUTH_REMEMBER_ME_LABEL } from "@/components/auth-section/constants/auth-ui";
import type { AuthFormSupportRowProps } from "@/components/auth-section/auth-form/types";

export default function AuthFormSupportRow({ mode, helperLink }: AuthFormSupportRowProps) {
  const isLogin = mode === "login";

  return (
    <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
      {isLogin ? (
        <label className="inline-flex items-center gap-2 text-muted">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          {AUTH_REMEMBER_ME_LABEL}
        </label>
      ) : (
        <p className="text-muted">{AUTH_REGISTER_SUPPORT_TEXT}</p>
      )}

      {helperLink ? (
        <Link href={helperLink.href} className="font-semibold text-link hover:text-accent">
          {helperLink.label}
        </Link>
      ) : null}
    </div>
  );
}