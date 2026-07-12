"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getApiErrorMessage } from "@/lib/api/client";
import { applyApiFormErrors } from "@/lib/api/form-errors";

import { useForgotPassword } from "../_hooks/use-forgot-password";

const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address."),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [sentEmail, setSentEmail] = useState<string | null>(null);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });
  const forgotPassword = useForgotPassword();

  async function onSubmit(data: ForgotPasswordValues) {
    try {
      await forgotPassword.mutateAsync(data);
      setSentEmail(data.email);
    } catch (error) {
      const handled = applyApiFormErrors(form.setError, error, ["email"]);
      if (!handled) toast.error(getApiErrorMessage(error));
    }
  }

  if (sentEmail) {
    return (
      <div className="w-full max-w-95">
        <h1 className="mb-1.5 text-[25px] font-extrabold tracking-[-0.025em] text-foreground">
          Check your email
        </h1>
        <p className="mb-6.5 text-sm text-muted-foreground">
          If an account exists for{" "}
          <span className="font-semibold text-foreground">{sentEmail}</span>, we&apos;ve sent
          instructions to reset your password.
        </p>
        <Link href="/login" className="text-[13.5px] font-bold text-primary hover:underline">
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-95">
      <h1 className="mb-1.5 text-[25px] font-extrabold tracking-[-0.025em] text-foreground">
        Reset your password
      </h1>
      <p className="mb-6.5 text-sm text-muted-foreground">
        Enter the email associated with your account and we&apos;ll send you a link to reset your
        password.
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FieldGroup className="gap-4.5">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="forgot-password-email"
                  required
                  className="text-[13px] font-semibold text-foreground"
                >
                  Email
                </FieldLabel>
                <Input
                  {...field}
                  id="forgot-password-email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="you@company.com"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full shadow-[0_2px_5px_--theme(--color-primary/30%)]"
          >
            {form.formState.isSubmitting ? "Sending…" : "Send reset link"}
          </Button>
        </FieldGroup>
      </form>

      <p className="mt-5.5 text-center text-[13.5px] text-muted-foreground">
        Remembered your password?{" "}
        <Link href="/login" className="font-bold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
