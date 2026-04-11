// components/auth-section/auth-shell.tsx

import type { AuthShellProps } from "@/components/auth-section/types";

export default function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="relative flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.08),transparent_42%)]" />
        <div className="relative w-full max-w-sm sm:max-w-lg lg:max-w-xl">
          {children}
        </div>
      </div>
    </main>
  );
}