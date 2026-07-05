"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/input-password";
import { Label } from "@/components/ui/label";
import { getApiErrorMessage } from "@/lib/api/client";
import { applyApiFormErrors } from "@/lib/api/form-errors";
import { cn } from "@/lib/utils";

import { useLogin } from "../_hooks/use-login";

const loginSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z
    .string()
    .min(1, "Password is required.")
    .pipe(z.string().min(6, "Password must be at least 6 characters.")),
  remember: z.boolean(),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: true },
  });
  const loginMutation = useLogin();

  async function onSubmit(data: LoginValues) {
    try {
      await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
        rememberMe: data.remember,
      });
    } catch (error) {
      const handled = applyApiFormErrors(form.setError, error, ["email", "password"]);
      if (!handled) {
        form.setError("root", { message: getApiErrorMessage(error) });
      }
    }
  }

  return (
    <div className="w-full max-w-95">
      <h1 className="mb-1.5 text-[25px] font-extrabold tracking-[-0.025em] text-slate-900">
        Welcome back
      </h1>
      <p className="mb-6.5 text-sm text-slate-500">Sign in to continue to your boards.</p>

      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FieldGroup className="gap-4.5">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="login-email"
                  className="text-[13px] font-semibold text-slate-700"
                >
                  Email
                </FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="you@company.com"
                    className={cn("h-10.5 rounded-[10px]", fieldState.invalid && "bg-red-50 pr-10")}
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
                <div className="flex items-center justify-between">
                  <FieldLabel
                    htmlFor="login-password"
                    className="text-[13px] font-semibold text-slate-700"
                  >
                    Password
                  </FieldLabel>
                  <a href="#" className="text-[13px] font-semibold text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <PasswordInput
                  {...field}
                  id="login-password"
                  autoComplete="current-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                  className="h-10.5 rounded-[10px]"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="remember"
            control={form.control}
            render={({ field }) => (
              <Field orientation="horizontal" className="gap-2">
                <Checkbox
                  id="login-remember"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label htmlFor="login-remember" className="text-[13px] font-medium text-slate-600">
                  Remember me
                </Label>
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
            size="xl"
            disabled={form.formState.isSubmitting}
            className="w-full shadow-[0_2px_5px_--theme(--color-primary/30%)]"
          >
            {form.formState.isSubmitting ? "Signing in…" : "Sign in"}
          </Button>
        </FieldGroup>
      </form>

      <p className="mt-5.5 text-center text-[13.5px] text-slate-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-bold text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
