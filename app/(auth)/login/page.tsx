import { AuthBrandPanel } from "./_components/auth-brand-panel";
import { LoginForm } from "./_components/login-form";

export const metadata = {
  title: "Sign in — Kanvas",
};

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-slate-50 p-4 sm:p-8">
      <div className="flex w-full max-w-260 overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_--theme(--color-slate-900/10%)] lg:h-165">
        <AuthBrandPanel />

        <div className="flex flex-1 items-center justify-center p-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
