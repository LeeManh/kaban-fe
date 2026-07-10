"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useInviteLinkPreview } from "@/hooks/use-invite-link-preview";
import { useJoinInviteLink } from "@/hooks/use-join-invite-link";
import { getApiErrorMessage } from "@/lib/api/client";
import { getCurrentUserId } from "@/lib/api/tokens";

function authHref(base: "/login" | "/register", token: string) {
  return `${base}?redirect=${encodeURIComponent(`/invite-links/${token}`)}`;
}

export function InviteLinkJoinCard({ token }: { token: string }) {
  const router = useRouter();
  const isLoggedIn = !!getCurrentUserId();
  const [pendingSent, setPendingSent] = useState(false);

  const { data: preview, isLoading, isError } = useInviteLinkPreview(token, { enabled: true });
  const joinInviteLink = useJoinInviteLink();

  function handleJoin() {
    joinInviteLink.mutate(token, {
      onSuccess: ({ status, boardId }) => {
        if (status === "joined") {
          toast.success("You've joined the board.");
          router.replace(`/boards/${boardId}`);
        } else {
          setPendingSent(true);
        }
      },
      onError: (err) => toast.error(getApiErrorMessage(err, "Could not join board.")),
    });
  }

  if (isLoading) {
    return <p className="text-sm text-slate-500">Loading invite…</p>;
  }

  if (isError || !preview) {
    return (
      <div className="w-full max-w-95 text-center">
        <h1 className="mb-1.5 text-[25px] font-extrabold tracking-[-0.025em] text-slate-900">
          Invite link not found
        </h1>
        <p className="text-sm text-slate-500">
          This invite link is invalid or has been revoked by a board admin.
        </p>
      </div>
    );
  }

  if (pendingSent) {
    return (
      <div className="w-full max-w-95 text-center">
        <h1 className="mb-1.5 text-[25px] font-extrabold tracking-[-0.025em] text-slate-900">
          Request sent
        </h1>
        <p className="text-sm text-slate-500">
          Your request to join &quot;{preview.boardName}&quot; has been sent. A board admin will
          review it shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-95 text-center">
      <h1 className="mb-1.5 text-[25px] font-extrabold tracking-[-0.025em] text-slate-900">
        Join &quot;{preview.boardName}&quot;
      </h1>
      <p className="mb-6.5 text-sm text-slate-500">
        {preview.permission === "OPEN"
          ? "You've been invited via a shareable link. You'll join instantly."
          : "You've been invited via a shareable link. Joining requires approval from a board admin."}
      </p>

      {isLoggedIn ? (
        <Button
          className="w-full shadow-[0_2px_5px_--theme(--color-primary/30%)]"
          disabled={joinInviteLink.isPending}
          onClick={handleJoin}
        >
          {joinInviteLink.isPending
            ? "Joining…"
            : preview.permission === "OPEN"
              ? "Join board"
              : "Request to join"}
        </Button>
      ) : (
        <div className="flex flex-col gap-2.5">
          <p className="text-xs text-slate-500">Log in or create an account to continue.</p>
          <Button render={<Link href={authHref("/login", token)} />} className="w-full">
            Log in
          </Button>
          <Button variant="outline" render={<Link href={authHref("/register", token)} />} className="w-full">
            Create an account
          </Button>
        </div>
      )}
    </div>
  );
}
