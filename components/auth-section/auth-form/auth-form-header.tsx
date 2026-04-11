// components/auth-section/auth-form/auth-form-header.tsx

import { AUTH_MODE_BADGE_LABEL } from "@/components/auth-section/constants/auth-ui";
import type { AuthFormHeaderProps } from "@/components/auth-section/auth-form/types";

export default function AuthFormHeader({ mode, title, subtitle }: AuthFormHeaderProps) {
  return (
    <header className="space-y-4 sm:space-y-5">
      <div className="flex justify-center">
        <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {AUTH_MODE_BADGE_LABEL[mode]}
        </span>
      </div>

      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto max-w-md text-sm leading-6 text-muted sm:text-base">{subtitle}</p>
      </div>
    </header>
  );
}