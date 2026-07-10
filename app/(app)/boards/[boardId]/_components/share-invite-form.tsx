"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { BoardRole } from "@/lib/api/boards";
import { getApiErrorMessage } from "@/lib/api/client";
import { applyApiFormErrors } from "@/lib/api/form-errors";

import { useCreateBoardInvite } from "../_hooks/use-create-board-invite";

const INVITE_ROLES = ["Member", "Admin", "Viewer"] as const;

const INVITE_ROLE_VALUES: Record<(typeof INVITE_ROLES)[number], BoardRole> = {
  Member: "MEMBER",
  Admin: "ADMIN",
  Viewer: "VIEWER",
};

const shareSchema = z.object({
  email: z.email("Please enter a valid email address."),
});

type ShareValues = z.infer<typeof shareSchema>;

export function ShareInviteForm({ boardId }: { boardId: string }) {
  const [inviteRole, setInviteRole] = useState<(typeof INVITE_ROLES)[number]>("Member");

  const form = useForm<ShareValues>({
    resolver: zodResolver(shareSchema),
    defaultValues: { email: "" },
  });

  const createInvite = useCreateBoardInvite(boardId);

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

  return (
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
            render={<Button variant="outline" className="w-28 cursor-pointer justify-between gap-1" />}
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
  );
}
