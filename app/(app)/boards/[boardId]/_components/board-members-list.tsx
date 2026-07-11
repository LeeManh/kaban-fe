"use client";

import { ChevronDown, X } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { BoardRole } from "@/lib/api/boards";
import { getApiErrorMessage } from "@/lib/api/client";
import { getCurrentUserId } from "@/lib/api/tokens";
import { getInitials } from "@/lib/utils";

import { useBoardInvites } from "../_hooks/use-board-invites";
import { useBoardMembers } from "../_hooks/use-board-members";
import { useRemoveBoardMember } from "../_hooks/use-remove-board-member";
import { useRevokeBoardInvite } from "../_hooks/use-revoke-board-invite";
import { useUpdateBoardMemberRole } from "../_hooks/use-update-board-member-role";

const MEMBER_ROLES: { label: string; value: BoardRole }[] = [
  { label: "Admin", value: "ADMIN" },
  { label: "Member", value: "MEMBER" },
  { label: "Viewer", value: "VIEWER" },
];

export function BoardMembersList({ boardId, open }: { boardId: string; open: boolean }) {
  const { data: members = [] } = useBoardMembers(boardId, { enabled: open });
  const { data: invites = [] } = useBoardInvites(boardId, { enabled: open });
  const currentUserId = getCurrentUserId();
  const updateRole = useUpdateBoardMemberRole(boardId);
  const removeMember = useRemoveBoardMember(boardId);
  const revokeInvite = useRevokeBoardInvite(boardId);

  function handleUpdateRole(userId: string, role: BoardRole) {
    updateRole.mutate(
      { userId, role },
      { onError: (err) => toast.error(getApiErrorMessage(err, "Could not update role.")) },
    );
  }

  function handleRemoveMember(userId: string) {
    removeMember.mutate(userId, {
      onError: (err) => toast.error(getApiErrorMessage(err, "Could not remove member.")),
    });
  }

  function handleRevokeInvite(inviteId: string) {
    revokeInvite.mutate(inviteId, {
      onError: (err) => toast.error(getApiErrorMessage(err, "Could not revoke invitation.")),
    });
  }

  return (
    <div className="flex flex-col gap-3 pt-3">
      {members.map((member) => {
        const isYou = member.user.id === currentUserId;
        const handle = member.user.email.split("@")[0];
        const roleLabel = member.role.charAt(0) + member.role.slice(1).toLowerCase();

        return (
          <div key={member.user.id} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Avatar className="size-9">
                <AvatarFallback className="bg-violet-500 text-[12px] font-bold text-white">
                  {getInitials(member.user)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-[13.5px] font-medium text-foreground">
                  {member.user.name ?? member.user.email}
                  {isYou && " (you)"}
                </div>
                <div className="text-xs text-muted-foreground">@{handle}</div>
              </div>
            </div>

            {member.role === "OWNER" ? (
              <span className="w-24 text-center text-xs font-medium text-muted-foreground">Owner</span>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-24 cursor-pointer justify-between gap-1"
                    />
                  }
                >
                  {roleLabel}
                  <ChevronDown className="size-3.5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  {MEMBER_ROLES.map((role) => (
                    <DropdownMenuItem
                      key={role.value}
                      onClick={() => handleUpdateRole(member.user.id, role.value)}
                    >
                      {role.label}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => handleRemoveMember(member.user.id)}
                  >
                    Remove from board
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        );
      })}

      {invites.length > 0 && (
        <>
          <div className="mt-1 text-xs font-semibold text-muted-foreground">Pending invitations</div>
          {invites.map((invite) => (
            <div key={invite.id} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Avatar className="size-9">
                  <AvatarFallback className="bg-muted text-[12px] font-bold text-muted-foreground">
                    {invite.email.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-[13.5px] font-medium text-foreground">{invite.email}</div>
                  <div className="text-xs text-muted-foreground">Pending invite</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Revoke invitation"
                className="cursor-pointer"
                disabled={revokeInvite.isPending}
                onClick={() => handleRevokeInvite(invite.id)}
              >
                <X className="size-3.5" />
              </Button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
