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
import { cn } from "@/lib/utils";

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

  function onSubmit(data: RegisterValues) {
    console.log(data);
  }

  return (
    <div className="w-full max-w-95">
      <h1 className="mb-1.5 text-[25px] font-extrabold tracking-[-0.025em] text-slate-900">
        Create your account
      </h1>
      <p className="mb-6.5 text-sm text-slate-500">
        Start organizing your work in minutes.
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FieldGroup className="gap-4.5">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="register-name"
                  className="text-[13px] font-semibold text-slate-700"
                >
                  Full name
                </FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id="register-name"
                    autoComplete="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Avery Reyes"
                    className={cn(
                      "h-10.5 rounded-[10px]",
                      fieldState.invalid && "bg-red-50 pr-10"
                    )}
                  />
                  {fieldState.invalid && (
                    <CircleAlert className="absolute top-1/2 right-3 size-4.25 -translate-y-1/2 text-destructive" />
                  )}
                </div>
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
                  className="text-[13px] font-semibold text-slate-700"
                >
                  Email
                </FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id="register-email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="you@company.com"
                    className={cn(
                      "h-10.5 rounded-[10px]",
                      fieldState.invalid && "bg-red-50 pr-10"
                    )}
                  />
                  {fieldState.invalid && (
                    <CircleAlert className="absolute top-1/2 right-3 size-4.25 -translate-y-1/2 text-destructive" />
                  )}
                </div>
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
                  className="h-10.5 rounded-[10px]"
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
                  className="h-10.5 rounded-[10px]"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Button
            type="submit"
            size="xl"
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
