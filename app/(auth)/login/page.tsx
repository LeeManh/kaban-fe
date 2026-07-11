import { Suspense } from "react";

import { GuestGuard } from "@/components/auth-guard";

import { AuthBackLink } from "../_components/auth-back-link";
import { AuthBrandPanel } from "../_components/auth-brand-panel";
import { LoginForm } from "./_components/login-form";

export const metadata = {
  title: "Sign in — Kanvas",
};

export default function LoginPage() {
  return (
    <GuestGuard>
      <div className="flex flex-1 flex-col bg-background">
        <div className="p-4 sm:p-6">
          <AuthBackLink />
        </div>
        <div className="flex flex-1 items-center justify-center p-4 pt-0 sm:p-8 sm:pt-0">
          <div className="flex w-full max-w-260 overflow-hidden rounded-md bg-card shadow-[0_4px_24px_--theme(--color-slate-900/10%)] lg:h-165">
            <AuthBrandPanel description="Boards, lists, and cards that keep your team moving — without the clutter." />

            <div className="flex flex-1 items-center justify-center p-10">
              <Suspense fallback={null}>
                <LoginForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </GuestGuard>
  );
}
