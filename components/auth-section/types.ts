// components/auth-section/types.ts

import type { ReactNode } from "react";
import type { ChangeEventHandler } from "react";

export type AuthMode = "login" | "register";

export type AuthFieldType = "text" | "email" | "password";

export interface AuthFieldConfig {
  readonly name: string;
  readonly label: string;
  readonly type: AuthFieldType;
  readonly placeholder: string;
  readonly autoComplete: string;
}

export interface AuthHelperLink {
  readonly label: string;
  readonly href: string;
}

export interface AuthPageConfig {
  readonly title: string;
  readonly subtitle: string;
  readonly submitLabel: string;
  readonly switchLabel: string;
  readonly switchHref: string;
  readonly fields: readonly AuthFieldConfig[];
  readonly helperLink?: AuthHelperLink;
  readonly footerNote?: string;
}

export type AuthPageConfigMap = Record<AuthMode, AuthPageConfig>;

export interface AuthShellProps {
  readonly children: ReactNode;
}

export interface AuthFieldProps {
  readonly field: AuthFieldConfig;
  readonly id: string;
  readonly value?: string;
  readonly onChange?: ChangeEventHandler<HTMLInputElement>;
  readonly error?: string;
}