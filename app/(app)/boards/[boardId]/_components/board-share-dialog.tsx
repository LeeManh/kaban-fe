"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Link2, X } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { BoardRole } from "@/lib/api/boards";
import { getApiErrorMessage } from "@/lib/api/client";
import { applyApiFormErrors } from "@/lib/api/form-errors";
import { getCurrentUserId } from "@/lib/api/tokens";
import { cn, getInitials } from "@/lib/utils";

import { useBoardInvites } from "../_hooks/use-board-invites";
import { useBoardMembers } from "../_hooks/use-board-members";
import { useCreateBoardInvite } from "../_hooks/use-create-board-invite";
import { useRemoveBoardMember } from "../_hooks/use-remove-board-member";
import { useRevokeBoardInvite } from "../_hooks/use-revoke-board-invite";
import { useUpdateBoardMemberRole } from "../_hooks/use-update-board-member-role";

const INVITE_ROLES = ["Member", "Admin", "Viewer"] as const;

const INVITE_ROLE_VALUES: Record<(typeof INVITE_ROLES)[number], BoardRole> = {
  Member: "MEMBER",
  Admin: "ADMIN",
  Viewer: "VIEWER",
};

const MEMBER_ROLES: { label: string; value: BoardRole }[] = [
  { label: "Admin", value: "ADMIN" },
  { label: "Member", value: "MEMBER" },
  { label: "Viewer", value: "VIEWER" },
];

const shareSchema = z.object({
  email: z.email("Please enter a valid email address."),
});

type ShareValues = z.infer<typeof shareSchema>;

export function BoardShareDialog({
  open,
  onOpenChange,
  boardId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  boardId: string;
}) {
  const [inviteRole, setInviteRole] = useState<(typeof INVITE_ROLES)[number]>("Member");
  const [activeTab, setActiveTab] = useState<"members" | "requests">("members");

  const form = useForm<ShareValues>({
    resolver: zodResolver(shareSchema),
    defaultValues: { email: "" },
  });

  const { data: members = [] } = useBoardMembers(boardId, { enabled: open });
  const { data: invites = [] } = useBoardInvites(boardId, { enabled: open });
  const currentUserId = getCurrentUserId();
  const createInvite = useCreateBoardInvite(boardId);
  const updateRole = useUpdateBoardMemberRole(boardId);
  const removeMember = useRemoveBoardMember(boardId);
  const revokeInvite = useRevokeBoardInvite(boardId);

  async function onSubmit(data: ShareValues) {
    try {
      await createInvite.mutateAsync({ email: data.email, role: INVITE_ROLE_VALUES[inviteRole] });
      form.reset();
      setInviteRole("Member");
      toast.success("Invitation sent.");
    } catch (error) {
      const handled = applyApiFormErrors(form.setError, error, ["email"]);
      if (!handled) {
        toast.error(getApiErrorMessage(error, "Could not send invitation."));
      }
    }
  }

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="gap-4 sm:max-w-lg">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-xl font-semibold">Share board</DialogTitle>
          <DialogClose render={<Button variant="ghost" size="icon-sm" className="cursor-pointer" />}>
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <div className="flex items-start gap-2">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex-1">
                  <Input
                    {...field}
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Email address or name"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
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
            <Button type="submit" className="cursor-pointer" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Sharing…" : "Share"}
            </Button>
          </div>
        </form>

        <div className="flex items-center gap-3">
          <Link2 className="size-4 shrink-0 text-slate-500" />
          <div>
            <div className="text-[13.5px] text-slate-800">Share this board with a link</div>
            <button type="button" className="cursor-pointer text-[13.5px] font-medium text-primary hover:underline">
              Create link
            </button>
          </div>
        </div>

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
                "cursor-pointer border-b-2 pb-2 text-[13.5px] font-medium",
                activeTab === "requests"
                  ? "border-primary text-primary"
                  : "border-transparent text-slate-600 hover:text-slate-800",
              )}
            >
              Join requests
            </button>
          </div>

          {activeTab === "members" ? (
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
                        <div className="text-[13.5px] font-medium text-slate-900">
                          {member.user.name ?? member.user.email}
                          {isYou && " (you)"}
                        </div>
                        <div className="text-xs text-slate-500">@{handle}</div>
                      </div>
                    </div>

                    {member.role === "OWNER" ? (
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
                  <div className="mt-1 text-xs font-semibold text-slate-500">Pending invitations</div>
                  {invites.map((invite) => (
                    <div key={invite.id} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="size-9">
                          <AvatarFallback className="bg-slate-300 text-[12px] font-bold text-slate-600">
                            {invite.email.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-[13.5px] font-medium text-slate-900">{invite.email}</div>
                          <div className="text-xs text-slate-500">Pending invite</div>
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
          ) : (
            <p className="py-6 text-center text-[13.5px] text-slate-500">No join requests</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
