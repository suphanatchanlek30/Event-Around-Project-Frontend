// components/auth-section/auth-form/auth-form.tsx

'use client';

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import AuthField from "@/components/auth-section/auth-field";
import AuthFormHeader from "@/components/auth-section/auth-form/auth-form-header";
import AuthFormSubmitButton from "@/components/auth-section/auth-form/auth-form-submit-button";
import AuthFormSupportRow from "@/components/auth-section/auth-form/auth-form-support-row";
import AuthFormSwitchRow from "@/components/auth-section/auth-form/auth-form-switch-row";
import type { AuthFormProps } from "@/components/auth-section/auth-form/types";
import { login, registerOrganizer, registerStudent } from "@/services";

type RegisterRole = "STUDENT" | "ORGANIZER";

const INITIAL_FORM_VALUES: Record<string, string> = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const getRedirectPathByRole = (role?: string) => {
  const normalizedRole = role?.trim().toUpperCase();

  if (normalizedRole === "ADMIN") {
    return "/admin";
  }

  if (normalizedRole === "ORGANIZER") {
    return "/organizer";
  }

  return "/";
};

export default function AuthForm({ mode, config }: AuthFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>(INITIAL_FORM_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [registerRole, setRegisterRole] = useState<RegisterRole>("STUDENT");

  const fieldErrors = useMemo(() => {
    if (!errorMessage) {
      return {} as Record<string, string>;
    }

    return {
      email: errorMessage.toLowerCase().includes("email") ? errorMessage : "",
      password: errorMessage.toLowerCase().includes("password") ? errorMessage : "",
      confirmPassword: errorMessage.toLowerCase().includes("confirm")
        ? errorMessage
        : "",
    };
  }, [errorMessage]);

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const requiredFields = config.fields.map((field) => field.name);

    for (const fieldName of requiredFields) {
      if (!values[fieldName]?.trim()) {
        return "กรุณากรอกข้อมูลให้ครบทุกช่อง";
      }
    }

    if (mode === "register" && values.password !== values.confirmPassword) {
      return "รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน";
    }

    return "";
  };

  const handleLogin = async () => {
    const response = await login({
      email: values.email,
      password: values.password,
    });

    if (!response.success) {
      throw new Error(response.message || "เข้าสู่ระบบไม่สำเร็จ");
    }

    const redirectPath = getRedirectPathByRole(response.data?.role);
    router.replace(redirectPath);
    router.refresh();
  };

  const handleRegister = async () => {
    const payload = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    if (registerRole === "ORGANIZER") {
      await registerOrganizer(payload);
      setSuccessMessage("สมัครสมาชิกผู้จัดกิจกรรมสำเร็จ สามารถเข้าสู่ระบบได้ทันที");
    } else {
      await registerStudent(payload);
      setSuccessMessage("สมัครสมาชิกนักศึกษาสำเร็จ สามารถเข้าสู่ระบบได้ทันที");
    }

    setTimeout(() => {
      router.push("/login");
    }, 900);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const validationMessage = validate();
    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    try {
      setIsSubmitting(true);

      if (mode === "login") {
        await handleLogin();
      } else {
        await handleRegister();
      }
    } catch (error) {
      const fallbackMessage = mode === "login" ? "เข้าสู่ระบบล้มเหลว" : "สมัครสมาชิกล้มเหลว";

      if (typeof error === "object" && error !== null && "response" in error) {
        const response = (error as { response?: { data?: { message?: string } } }).response;
        setErrorMessage(response?.data?.message ?? fallbackMessage);
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(fallbackMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article className="w-full rounded-[28px] border border-border bg-surface p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:rounded-4xl sm:p-6 lg:p-8">
      <AuthFormHeader mode={mode} title={config.title} subtitle={config.subtitle} />

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
        {mode === "register" ? (
          <div className="rounded-xl border border-border bg-surface-muted/55 p-1.5">
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setRegisterRole("STUDENT")}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  registerRole === "STUDENT"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted hover:bg-surface"
                }`}
              >
                สมัครเป็นนักศึกษา
              </button>
              <button
                type="button"
                onClick={() => setRegisterRole("ORGANIZER")}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  registerRole === "ORGANIZER"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted hover:bg-surface"
                }`}
              >
                สมัครเป็นผู้จัดกิจกรรม
              </button>
            </div>
          </div>
        ) : null}

        {config.fields.map((field) => (
          <AuthField
            key={field.name}
            id={`${mode}-${field.name}`}
            field={field}
            value={values[field.name] ?? ""}
            onChange={(event) => handleChange(field.name, event.target.value)}
            error={fieldErrors[field.name]}
          />
        ))}

        <AuthFormSupportRow mode={mode} helperLink={config.helperLink} />

        {errorMessage ? (
          <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {errorMessage}
          </p>
        ) : null}

        {successMessage ? (
          <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {successMessage}
          </p>
        ) : null}

        <div className={isSubmitting ? "pointer-events-none opacity-80" : undefined}>
          <AuthFormSubmitButton
            label={isSubmitting ? "กำลังดำเนินการ..." : config.submitLabel}
          />
        </div>

        {config.footerNote ? (
          <p className="text-center text-xs leading-5 text-muted">{config.footerNote}</p>
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