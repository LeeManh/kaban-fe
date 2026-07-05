import { AuthBrandPanel } from "../_components/auth-brand-panel";
import { RegisterForm } from "./_components/register-form";

export const metadata = {
  title: "Create your account — Kanvas",
};

export default function RegisterPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-slate-50 p-4 sm:p-8">
      <div className="flex w-full max-w-260 overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_--theme(--color-slate-900/10%)] lg:h-165">
        <AuthBrandPanel
          description="Join thousands of teams planning their work on Kanvas."
          features={[
            "Unlimited boards & cards",
            "Real-time collaboration",
            "Free to get started",
          ]}
        />

        <div className="flex flex-1 items-center justify-center overflow-y-auto p-10">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
