import { AuthBrandPanel } from "../../_components/auth-brand-panel";
import { InviteAcceptCard } from "./_components/invite-accept-card";

export const metadata = {
  title: "Accept invite — Kanvas",
};

export default async function InviteAcceptPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <div className="flex flex-1 items-center justify-center bg-background p-4 sm:p-8">
      <div className="flex w-full max-w-260 overflow-hidden rounded-md bg-card shadow-[0_4px_24px_--theme(--color-slate-900/10%)] lg:h-165">
        <AuthBrandPanel description="Boards, lists, and cards that keep your team moving — without the clutter." />

        <div className="flex flex-1 items-center justify-center p-10">
          <InviteAcceptCard token={token} />
        </div>
      </div>
    </div>
  );
}
