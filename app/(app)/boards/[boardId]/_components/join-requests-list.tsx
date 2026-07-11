"use client";

import { Check, X } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/lib/api/client";
import { getInitials } from "@/lib/utils";

import { useDecideJoinRequest } from "../_hooks/use-decide-join-request";
import { useJoinRequests } from "../_hooks/use-join-requests";

export function JoinRequestsList({ boardId, open }: { boardId: string; open: boolean }) {
  const { data: joinRequests = [] } = useJoinRequests(boardId, { enabled: open });
  const decideJoinRequest = useDecideJoinRequest(boardId);

  function handleDecideJoinRequest(requestId: string, status: "APPROVED" | "REJECTED") {
    decideJoinRequest.mutate(
      { requestId, status },
      {
        onError: (err) =>
          toast.error(getApiErrorMessage(err, "Could not process the join request.")),
      },
    );
  }

  if (joinRequests.length === 0) {
    return <p className="py-6 text-center text-[13.5px] text-muted-foreground">No join requests</p>;
  }

  return (
    <div className="flex flex-col gap-3 pt-3">
      {joinRequests.map((request) => (
        <div key={request.id} className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Avatar className="size-9">
              <AvatarFallback className="bg-violet-500 text-[12px] font-bold text-white">
                {getInitials(request.user)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-[13.5px] font-medium text-foreground">
                {request.user.name ?? request.user.email}
              </div>
              <div className="text-xs text-muted-foreground">{request.user.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Reject"
              className="cursor-pointer text-destructive"
              disabled={decideJoinRequest.isPending}
              onClick={() => handleDecideJoinRequest(request.id, "REJECTED")}
            >
              <X className="size-3.5" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Approve"
              className="cursor-pointer text-emerald-600"
              disabled={decideJoinRequest.isPending}
              onClick={() => handleDecideJoinRequest(request.id, "APPROVED")}
            >
              <Check className="size-3.5" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
