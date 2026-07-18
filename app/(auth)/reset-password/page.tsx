import { Suspense } from "react";

import { AuthBackLink } from "../_components/auth-back-link";
import { AuthBrandPanel } from "../_components/auth-brand-panel";
import { ResetPasswordForm } from "./_components/reset-password-form";

export const metadata = {
  title: "Set a new password",
  description: "Choose a new password for your Kanvas account.",
};

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <div className="p-4 sm:p-6">
        <AuthBackLink />
      </div>
      <div className="flex flex-1 items-center justify-center p-4 pt-0 sm:p-8 sm:pt-0">
        <div className="flex w-full max-w-260 overflow-hidden rounded-md bg-card shadow-[0_4px_24px_--theme(--color-slate-900/10%)] lg:h-165">
          <AuthBrandPanel description="Boards, lists, and cards that keep your team moving — without the clutter." />

          <div className="flex flex-1 items-center justify-center p-6 sm:p-10">
            <Suspense fallback={null}>
              <ResetPasswordForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
