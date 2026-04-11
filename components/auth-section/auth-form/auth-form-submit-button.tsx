import type { AuthFormSubmitButtonProps } from "@/components/auth-section/auth-form/types";

export default function AuthFormSubmitButton({ label }: AuthFormSubmitButtonProps) {
  return (
    <button
      type="submit"
      className="inline-flex w-full items-center justify-center rounded-2xl bg-primary px-5 py-3.5 text-base font-semibold text-primary-foreground shadow-[0_16px_36px_rgba(67,56,202,0.24)] transition hover:bg-accent focus:outline-none focus:ring-4 focus:ring-primary/20"
    >
      {label}
    </button>
  );
}