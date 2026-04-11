// components/auth-section/auth-field.tsx

import type { AuthFieldProps } from "@/components/auth-section/types";

export default function AuthField({ field, id }: AuthFieldProps) {
  return (
    <label className="block space-y-2.5" htmlFor={id}>
      <span className="text-sm font-semibold text-foreground">{field.label}</span>
      <input
        id={id}
        name={field.name}
        type={field.type}
        autoComplete={field.autoComplete}
        placeholder={field.placeholder}
        className="w-full rounded-xl border border-border bg-surface-muted px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:bg-surface focus:ring-4 focus:ring-primary/15"
      />
    </label>
  );
}