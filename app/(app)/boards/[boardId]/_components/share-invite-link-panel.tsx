"use client";

import { Check, ChevronDown, Link2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getApiErrorMessage } from "@/lib/api/client";
import type { InviteLinkPermission } from "@/lib/api/invite-links";

import { useCreateInviteLink } from "../_hooks/use-create-invite-link";
import { useInviteLink } from "../_hooks/use-invite-link";
import { useRevokeInviteLink } from "../_hooks/use-revoke-invite-link";
import { useUpdateInviteLink } from "../_hooks/use-update-invite-link";

export function ShareInviteLinkPanel({ boardId, open }: { boardId: string; open: boolean }) {
  const [linkCopied, setLinkCopied] = useState(false);

  const { data: inviteLink } = useInviteLink(boardId, { enabled: open });
  const createLink = useCreateInviteLink(boardId);
  const updateLink = useUpdateInviteLink(boardId);
  const revokeLink = useRevokeInviteLink(boardId);

  function handleCreateLink() {
    createLink.mutate(
      {},
      {
        onError: (err) => toast.error(getApiErrorMessage(err, "Could not create invite link.")),
      },
    );
  }

  function handleCopyLink() {
    if (!inviteLink) return;
    navigator.clipboard.writeText(inviteLink.joinUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 1500);
  }

  function handleDeleteLink() {
    revokeLink.mutate(undefined, {
      onSuccess: () => toast.success("Invite link deleted."),
      onError: (err) => toast.error(getApiErrorMessage(err, "Could not delete invite link.")),
    });
  }

  function handleChangePermission(permission: InviteLinkPermission) {
    updateLink.mutate(
      { permission },
      {
        onError: (err) => toast.error(getApiErrorMessage(err, "Could not update permissions.")),
      },
    );
  }

  if (!inviteLink) {
    return (
      <div className="flex items-center gap-3">
        <Link2 className="size-4 shrink-0 text-slate-500" />
        <div>
          <div className="text-[13.5px] text-slate-800">Share this board with a link</div>
          <button
            type="button"
            onClick={handleCreateLink}
            disabled={createLink.isPending}
            className="cursor-pointer text-[13.5px] font-medium text-primary hover:underline disabled:opacity-50"
          >
            {createLink.isPending ? "Creating…" : "Create link"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <Link2 className="size-4 shrink-0 text-slate-500" />
        <div>
          <div className="text-[13.5px] text-slate-800">
            {inviteLink.permission === "OPEN"
              ? "Anyone with the link can join as a"
              : "Anyone with the link can request to join as a"}{" "}
            {inviteLink.role.charAt(0) + inviteLink.role.slice(1).toLowerCase()}
          </div>
          <div className="flex items-center gap-1.5 text-[13.5px] font-medium">
            <button
              type="button"
              onClick={handleCopyLink}
              className="cursor-pointer text-primary hover:underline"
            >
              {linkCopied ? "Copied!" : "Copy link"}
            </button>
            <span className="text-slate-400">·</span>
            <button
              type="button"
              onClick={handleDeleteLink}
              disabled={revokeLink.isPending}
              className="cursor-pointer text-primary hover:underline disabled:opacity-50"
            >
              {revokeLink.isPending ? "Deleting…" : "Delete link"}
            </button>
          </div>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="outline"
              size="sm"
              disabled={updateLink.isPending}
              className="shrink-0 cursor-pointer justify-between gap-1"
            />
          }
        >
          Change permissions
          <ChevronDown className="size-3.5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => handleChangePermission("OPEN")}>
            Anyone can join
            {inviteLink.permission === "OPEN" && <Check className="ml-auto size-3.5" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleChangePermission("APPROVAL")}>
            Members must be approved
            {inviteLink.permission === "APPROVAL" && <Check className="ml-auto size-3.5" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
