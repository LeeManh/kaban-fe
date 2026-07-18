"use client";

import { AlignLeft, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { PopoverSubHeader } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/components/user-avatar";
import type { BoardDetail } from "@/lib/api/boards";
import { getCurrentUserId } from "@/lib/api/tokens";

import { useBoardMembers } from "../_hooks/use-board-members";
import { useUpdateBoard } from "../_hooks/use-update-board";

export function BoardAboutPopover({
  board,
  onBack,
}: {
  board: BoardDetail;
  onBack: () => void;
}) {
  const { data: members = [] } = useBoardMembers(board.id, { enabled: true });
  const updateBoard = useUpdateBoard(board.id);
  const currentUserId = getCurrentUserId();

  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(board.description ?? "");

  const admins = members.filter((m) => m.role === "OWNER");

  function startEditing() {
    setDescription(board.description ?? "");
    setIsEditing(true);
  }

  function handleSave() {
    updateBoard.mutate(
      { description: description.trim() },
      { onSuccess: () => setIsEditing(false) },
    );
  }

  return (
    <>
      <PopoverSubHeader title="About this board" onBack={onBack} />

      <div className="flex flex-col gap-4 px-1 py-1">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <User className="size-4 text-muted-foreground" />
            <span className="text-[13.5px] font-semibold text-foreground">Board owner</span>
          </div>
          <div className="flex flex-col gap-3">
            {admins.map((member) => (
              <div key={member.user.id} className="flex items-start gap-2.5">
                <UserAvatar user={member.user} className="size-9" />
                <div className="flex flex-col">
                  <span className="text-[13.5px] font-semibold text-foreground">
                    {member.user.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    @{member.user.email.split("@")[0]}
                  </span>
                  {member.user.id === currentUserId && (
                    <Link
                      href="/profile"
                      className="mt-0.5 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
                    >
                      Edit profile info
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlignLeft className="size-4 text-muted-foreground" />
              <span className="text-[13.5px] font-semibold text-foreground">Description</span>
            </div>
            {!isEditing && (
              <Button
                variant="outline"
                size="xs"
                className="cursor-pointer"
                onClick={startEditing}
              >
                Edit
              </Button>
            )}
          </div>

          {isEditing ? (
            <div className="flex flex-col gap-2">
              <Textarea
                autoFocus
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a more detailed description…"
                className="min-h-24 text-[13.5px]"
              />
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="cursor-pointer"
                  disabled={updateBoard.isPending}
                  onClick={handleSave}
                >
                  {updateBoard.isPending ? "Saving…" : "Save"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="whitespace-pre-line text-[13.5px] text-muted-foreground">
              {board.description || "Add a more detailed description…"}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
