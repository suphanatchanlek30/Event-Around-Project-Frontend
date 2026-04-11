// components/auth-section/auth-form/types.ts

import type { AuthHelperLink, AuthMode, AuthPageConfig } from "@/components/auth-section/types";

export interface AuthFormProps {
  readonly mode: AuthMode;
  readonly config: AuthPageConfig;
}

export interface AuthFormHeaderProps {
  readonly mode: AuthMode;
  readonly title: string;
  readonly subtitle: string;
}

export interface AuthFormSupportRowProps {
  readonly mode: AuthMode;
  readonly helperLink?: AuthHelperLink;
}

export interface AuthFormSubmitButtonProps {
  readonly label: string;
}

export interface AuthFormSwitchRowProps {
  readonly mode: AuthMode;
  readonly switchHref: string;
  readonly switchLabel: string;
}