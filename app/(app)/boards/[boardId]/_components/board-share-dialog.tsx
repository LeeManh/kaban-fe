"use client";

import { X } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { useBoardMembers } from "../_hooks/use-board-members";
import { useJoinRequests } from "../_hooks/use-join-requests";
import { BoardMembersList } from "./board-members-list";
import { JoinRequestsList } from "./join-requests-list";
import { ShareInviteForm } from "./share-invite-form";
import { ShareInviteLinkPanel } from "./share-invite-link-panel";

export function BoardShareDialog({
  open,
  onOpenChange,
  boardId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  boardId: string;
}) {
  const [activeTab, setActiveTab] = useState<"members" | "requests">("members");

  const { data: members = [] } = useBoardMembers(boardId, { enabled: open });
  const { data: joinRequests = [] } = useJoinRequests(boardId, { enabled: open });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="gap-4 sm:max-w-lg">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-xl font-semibold">Share board</DialogTitle>
          <DialogClose render={<Button variant="ghost" size="icon-sm" className="cursor-pointer" />}>
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        <ShareInviteForm boardId={boardId} />

        <ShareInviteLinkPanel boardId={boardId} open={open} />

        <div>
          <div className="flex items-center gap-4 border-b border-slate-200">
            <button
              type="button"
              onClick={() => setActiveTab("members")}
              className={cn(
                "flex cursor-pointer items-center gap-1.5 border-b-2 pb-2 text-[13.5px] font-medium",
                activeTab === "members"
                  ? "border-primary text-primary"
                  : "border-transparent text-slate-600 hover:text-slate-800",
              )}
            >
              Board members
              <Badge variant="secondary">{members.length}</Badge>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("requests")}
              className={cn(
                "flex cursor-pointer items-center gap-1.5 border-b-2 pb-2 text-[13.5px] font-medium",
                activeTab === "requests"
                  ? "border-primary text-primary"
                  : "border-transparent text-slate-600 hover:text-slate-800",
              )}
            >
              Join requests
              {joinRequests.length > 0 && <Badge variant="secondary">{joinRequests.length}</Badge>}
            </button>
          </div>

          {activeTab === "members" ? (
            <BoardMembersList boardId={boardId} open={open} />
          ) : (
            <JoinRequestsList boardId={boardId} open={open} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
