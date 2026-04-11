import AuthField from "@/components/auth-section/auth-field";
import AuthFormHeader from "@/components/auth-section/auth-form/auth-form-header";
import AuthFormSubmitButton from "@/components/auth-section/auth-form/auth-form-submit-button";
import AuthFormSupportRow from "@/components/auth-section/auth-form/auth-form-support-row";
import AuthFormSwitchRow from "@/components/auth-section/auth-form/auth-form-switch-row";
import type { AuthFormProps } from "@/components/auth-section/auth-form/types";

export default function AuthForm({ mode, config }: AuthFormProps) {
  return (
    <article className="w-full rounded-[28px] border border-border bg-surface p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:rounded-4xl sm:p-6 lg:p-8">
      <AuthFormHeader mode={mode} title={config.title} subtitle={config.subtitle} />

      <form className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
        {config.fields.map((field) => (
          <AuthField key={field.name} id={`${mode}-${field.name}`} field={field} />
        ))}

        <AuthFormSupportRow mode={mode} helperLink={config.helperLink} />

        <AuthFormSubmitButton label={config.submitLabel} />

        {config.footerNote ? (
          <p className="text-center text-xs leading-5 text-muted">
            {config.footerNote}
          </p>
        ) : null}

        <AuthFormSwitchRow
          mode={mode}
          switchHref={config.switchHref}
          switchLabel={config.switchLabel}
        />
      </form>
    </article>
  );
}