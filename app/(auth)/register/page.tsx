import { Suspense } from "react";

import { GuestGuard } from "@/components/auth-guard";

import { AuthBackLink } from "../_components/auth-back-link";
import { AuthBrandPanel } from "../_components/auth-brand-panel";
import { RegisterForm } from "./_components/register-form";

export const metadata = {
  title: "Create your account — Kanvas",
};

export default function RegisterPage() {
  return (
    <GuestGuard>
      <div className="flex flex-1 flex-col bg-background">
        <div className="p-4 sm:p-6">
          <AuthBackLink />
        </div>
        <div className="flex flex-1 items-center justify-center overflow-y-auto p-4 pt-0 sm:p-8 sm:pt-0">
          <div className="flex w-full max-w-260 overflow-hidden rounded-md bg-card shadow-[0_4px_24px_--theme(--color-slate-900/10%)] lg:h-165">
            <AuthBrandPanel
              description="Join thousands of teams planning their work on Kanvas."
              features={[
                "Unlimited boards & cards",
                "Real-time collaboration",
                "Free to get started",
              ]}
            />

            <div className="flex flex-1 items-center justify-center overflow-y-auto p-10">
              <Suspense fallback={null}>
                <RegisterForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </GuestGuard>
  );
}
