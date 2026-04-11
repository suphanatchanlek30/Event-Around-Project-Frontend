// components/auth-section/auth-form/auth-form-switch-row.tsx

import Link from "next/link";

import { AUTH_MODE_ACCOUNT_PROMPT } from "@/components/auth-section/constants/auth-ui";
import type { AuthFormSwitchRowProps } from "@/components/auth-section/auth-form/types";

export default function AuthFormSwitchRow({
  mode,
  switchHref,
  switchLabel,
}: AuthFormSwitchRowProps) {
  return (
    <div className="text-center text-sm text-muted">
      <span className="mr-2">{AUTH_MODE_ACCOUNT_PROMPT[mode]}</span>
      <Link href={switchHref} className="font-semibold text-link hover:text-accent">
        {switchLabel}
      </Link>
    </div>
  );
}