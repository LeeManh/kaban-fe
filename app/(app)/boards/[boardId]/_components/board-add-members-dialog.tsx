"use client";

import { ChevronDown, X } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { getApiErrorMessage } from "@/lib/api/client";
import type { BoardRole } from "@/lib/api/boards";
import { getInitials } from "@/lib/utils";

import { useAddBoardMember } from "../_hooks/use-add-board-member";
import { useBoardMembers } from "../_hooks/use-board-members";
import { useRemoveBoardMember } from "../_hooks/use-remove-board-member";
import { useUpdateBoardMemberRole } from "../_hooks/use-update-board-member-role";

const INVITE_ROLES = ["Member", "Admin", "Viewer"] as const;

const ROLE_VALUES: Record<(typeof INVITE_ROLES)[number], BoardRole> = {
  Member: "MEMBER",
  Admin: "ADMIN",
  Viewer: "VIEWER",
};

const ASSIGNABLE_ROLES: { label: string; value: BoardRole }[] = [
  { label: "Admin", value: "ADMIN" },
  { label: "Member", value: "MEMBER" },
  { label: "Viewer", value: "VIEWER" },
];

export function BoardAddMembersDialog({
  open,
  onOpenChange,
  boardId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  boardId: string;
}) {
  const [email, setEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<(typeof INVITE_ROLES)[number]>("Member");
  const [error, setError] = useState<string | null>(null);

  const { data: members = [] } = useBoardMembers(boardId, { enabled: open });
  const addMember = useAddBoardMember(boardId);
  const updateRole = useUpdateBoardMemberRole(boardId);
  const removeMember = useRemoveBoardMember(boardId);

  function handleAdd() {
    const trimmed = email.trim();
    if (!trimmed) return;
    setError(null);
    addMember.mutate(
      { email: trimmed, role: ROLE_VALUES[inviteRole] },
      {
        onSuccess: () => {
          setEmail("");
          setInviteRole("Member");
        },
        onError: (err) => setError(getApiErrorMessage(err, "Could not add member.")),
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="gap-4 sm:max-w-md">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-lg font-semibold">Add members</DialogTitle>
          <DialogClose
            render={<Button variant="ghost" size="icon-sm" className="cursor-pointer" />}
          >
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAdd();
                }
              }}
              placeholder="Email address"
              className="flex-1"
            />
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" className="w-28 cursor-pointer justify-between gap-1" />
                }
              >
                {inviteRole}
                <ChevronDown className="size-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {INVITE_ROLES.map((role) => (
                  <DropdownMenuItem key={role} onClick={() => setInviteRole(role)}>
                    {role}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              className="w-20 cursor-pointer"
              disabled={!email.trim() || addMember.isPending}
              onClick={handleAdd}
            >
              {addMember.isPending ? "Adding…" : "Add"}
            </Button>
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>

        <div>
          <div className="mb-2 text-xs font-semibold text-slate-500">Board members</div>
          <div className="flex flex-col gap-3">
            {members.map((member) => {
              const isOwner = member.role === "OWNER";
              const roleLabel =
                member.role.charAt(0) + member.role.slice(1).toLowerCase();

              return (
                <div key={member.user.id} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar className="size-9">
                      <AvatarFallback className="bg-violet-500 text-[12px] font-bold text-white">
                        {getInitials(member.user)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-[13.5px] font-medium text-slate-900">
                        {member.user.name ?? member.user.email}
                      </div>
                      <div className="text-xs text-slate-500">{member.user.email}</div>
                    </div>
                  </div>

                  {isOwner ? (
                    <span className="w-24 text-center text-xs font-medium text-slate-500">Owner</span>
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
                        {ASSIGNABLE_ROLES.map((role) => (
                          <DropdownMenuItem
                            key={role.value}
                            onClick={() =>
                              updateRole.mutate({ userId: member.user.id, role: role.value })
                            }
                          >
                            {role.label}
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => removeMember.mutate(member.user.id)}
                        >
                          Remove from board
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
