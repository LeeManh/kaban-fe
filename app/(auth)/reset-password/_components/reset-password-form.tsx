"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/input-password";
import { getApiErrorMessage } from "@/lib/api/client";

import { useResetPassword } from "../_hooks/use-reset-password";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required.")
      .pipe(z.string().min(6, "Password must be at least 6 characters.")),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });
  const resetPassword = useResetPassword();

  async function onSubmit(data: ResetPasswordValues) {
    if (!token) return;
    try {
      await resetPassword.mutateAsync({ token, newPassword: data.password });
      toast.success("Password reset. Please sign in with your new password.");
      router.replace("/login");
    } catch (error) {
      toast.error(
        getApiErrorMessage(error, "Could not reset password. The link may have expired."),
      );
    }
  }

  if (!token) {
    return (
      <div className="w-full max-w-95">
        <h1 className="mb-1.5 text-[25px] font-extrabold tracking-[-0.025em] text-foreground">
          Invalid reset link
        </h1>
        <p className="mb-6.5 text-sm text-muted-foreground">
          This password reset link is missing or invalid. Please request a new one.
        </p>
        <Link
          href="/forgot-password"
          className="text-[13.5px] font-bold text-primary hover:underline"
        >
          Request a new link
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-95">
      <h1 className="mb-1.5 text-[25px] font-extrabold tracking-[-0.025em] text-foreground">
        Set a new password
      </h1>
      <p className="mb-6.5 text-sm text-muted-foreground">
        Choose a new password for your account.
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FieldGroup className="gap-4.5">
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="reset-password-password"
                  required
                  className="text-[13px] font-semibold text-foreground"
                >
                  New password
                </FieldLabel>
                <PasswordInput
                  {...field}
                  id="reset-password-password"
                  autoComplete="new-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Create a new password"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="reset-password-confirm"
                  required
                  className="text-[13px] font-semibold text-foreground"
                >
                  Confirm password
                </FieldLabel>
                <PasswordInput
                  {...field}
                  id="reset-password-confirm"
                  autoComplete="new-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Re-enter new password"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full shadow-[0_2px_5px_--theme(--color-primary/30%)] h-9"
          >
            {form.formState.isSubmitting ? "Resetting…" : "Reset password"}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
