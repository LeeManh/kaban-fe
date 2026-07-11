import { AuthBrandPanel } from "../../_components/auth-brand-panel";
import { InviteLinkJoinCard } from "./_components/invite-link-join-card";

export const metadata = {
  title: "Join board — Kanvas",
};

export default async function InviteLinkJoinPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return (
    <div className="flex flex-1 items-center justify-center bg-background p-4 sm:p-8">
      <div className="flex w-full max-w-260 overflow-hidden rounded-md bg-card shadow-[0_4px_24px_--theme(--color-slate-900/10%)] lg:h-165">
        <AuthBrandPanel description="Boards, lists, and cards that keep your team moving — without the clutter." />

        <div className="flex flex-1 items-center justify-center p-10">
          <InviteLinkJoinCard token={token} />
        </div>
      </div>
    </div>
  );
}
