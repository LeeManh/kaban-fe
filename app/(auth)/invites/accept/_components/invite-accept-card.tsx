"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useAcceptInvite } from "@/hooks/use-accept-invite";
import { useInvitePreview } from "@/hooks/use-invite-preview";
import { getApiErrorMessage } from "@/lib/api/client";
import { getCurrentUserId } from "@/lib/api/tokens";

function authHref(base: "/login" | "/register", token: string, email: string) {
  const params = new URLSearchParams({
    redirect: `/invites/accept?token=${token}`,
    email,
  });
  return `${base}?${params.toString()}`;
}

export function InviteAcceptCard({ token }: { token?: string }) {
  const router = useRouter();
  const isLoggedIn = !!getCurrentUserId();

  const {
    data: preview,
    isLoading,
    isError,
  } = useInvitePreview(token ?? "", { enabled: !!token });
  const acceptInvite = useAcceptInvite();

  function handleAccept() {
    if (!token) return;
    acceptInvite.mutate(token, {
      onSuccess: ({ boardId }) => {
        toast.success("You've joined the board.");
        router.replace(`/boards/${boardId}`);
      },
      onError: (err) => toast.error(getApiErrorMessage(err, "Could not accept invite.")),
    });
  }

  if (!token) {
    return (
      <div className="w-full max-w-95 text-center">
        <h1 className="mb-1.5 text-[25px] font-extrabold tracking-[-0.025em] text-foreground">
          Invalid invite link
        </h1>
        <p className="text-sm text-muted-foreground">This invite link is missing a token.</p>
      </div>
    );
  }

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading invite…</p>;
  }

  if (isError || !preview) {
    return (
      <div className="w-full max-w-95 text-center">
        <h1 className="mb-1.5 text-[25px] font-extrabold tracking-[-0.025em] text-foreground">
          Invite not found
        </h1>
        <p className="text-sm text-muted-foreground">
          This invite is invalid, expired, or has already been used.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-95 text-center">
      <h1 className="mb-1.5 text-[25px] font-extrabold tracking-[-0.025em] text-foreground">
        Join &quot;{preview.boardName}&quot;
      </h1>
      <p className="mb-6.5 text-sm text-muted-foreground">
        {preview.invitedByName} invited you ({preview.email}) to collaborate on this board.
      </p>

      {isLoggedIn ? (
        <Button
          className="w-full shadow-[0_2px_5px_--theme(--color-primary/30%)]"
          disabled={acceptInvite.isPending}
          onClick={handleAccept}
        >
          {acceptInvite.isPending ? "Joining…" : "Join board"}
        </Button>
      ) : (
        <div className="flex flex-col gap-2.5">
          <p className="text-xs text-muted-foreground">
            Log in or create an account with {preview.email} to accept this invite.
          </p>
          <Button render={<Link href={authHref("/login", token, preview.email)} />} className="w-full">
            Log in
          </Button>
          <Button
            variant="outline"
            render={<Link href={authHref("/register", token, preview.email)} />}
            className="w-full"
          >
            Create an account
          </Button>
        </div>
      )}
    </div>
  );
}
