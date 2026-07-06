"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/input-password";
import { getApiErrorMessage } from "@/lib/api/client";
import { applyApiFormErrors } from "@/lib/api/form-errors";
import { cn } from "@/lib/utils";

import { useRegister } from "../_hooks/use-register";

const registerSchema = z
  .object({
    name: z.string().min(1, "Full name is required."),
    email: z.email("Please enter a valid email address."),
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

type RegisterValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });
  const registerMutation = useRegister();

  async function onSubmit(data: RegisterValues) {
    try {
      await registerMutation.mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      const handled = applyApiFormErrors(form.setError, error, ["name", "email", "password"]);
      if (!handled) {
        form.setError("root", { message: getApiErrorMessage(error) });
      }
    }
  }

  return (
    <div className="w-full max-w-95">
      <h1 className="mb-1.5 text-[25px] font-extrabold tracking-[-0.025em] text-slate-900">
        Create your account
      </h1>
      <p className="mb-6.5 text-sm text-slate-500">Start organizing your work in minutes.</p>

      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FieldGroup className="gap-4.5">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="register-name"
                  required
                  className="text-[13px] font-semibold text-slate-700"
                >
                  Full name
                </FieldLabel>
                <Input
                  {...field}
                  id="register-name"
                  autoComplete="name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Avery Reyes"
                  className={cn(fieldState.invalid && "bg-red-50")}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="register-email"
                  required
                  className="text-[13px] font-semibold text-slate-700"
                >
                  Email
                </FieldLabel>
                <Input
                  {...field}
                  id="register-email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="you@company.com"
                  className={cn(fieldState.invalid && "bg-red-50")}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="register-password"
                  required
                  className="text-[13px] font-semibold text-slate-700"
                >
                  Password
                </FieldLabel>
                <PasswordInput
                  {...field}
                  id="register-password"
                  autoComplete="new-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Create a password"
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
                  htmlFor="register-confirm"
                  required
                  className="text-[13px] font-semibold text-slate-700"
                >
                  Confirm password
                </FieldLabel>
                <PasswordInput
                  {...field}
                  id="register-confirm"
                  autoComplete="new-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Re-enter password"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {form.formState.errors.root && (
            <div className="flex items-center gap-1.5 text-sm text-destructive">
              <CircleAlert className="size-3.5 shrink-0" />
              {form.formState.errors.root.message}
            </div>
          )}

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full shadow-[0_2px_5px_--theme(--color-primary/30%)]"
          >
            {form.formState.isSubmitting ? "Creating account…" : "Create account"}
          </Button>
        </FieldGroup>
      </form>

      <p className="mt-5.5 text-center text-[13.5px] text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
