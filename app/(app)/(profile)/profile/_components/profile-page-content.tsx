"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getApiErrorMessage } from "@/lib/api/client";
import { applyApiFormErrors } from "@/lib/api/form-errors";
import type { CurrentUser } from "@/lib/api/users";

import { useCurrentUser } from "../../../_hooks/use-current-user";
import { useUpdateProfile } from "../../../_hooks/use-update-profile";
import { ProfileAvatarUpload } from "./profile-avatar-upload";

const profileAboutSchema = z.object({
  name: z.string().trim().min(1, "Full name is required").max(100, "Full name is too long"),
  bio: z.string().trim().max(2000, "Bio is too long"),
});

type ProfileAboutValues = z.infer<typeof profileAboutSchema>;

function ProfileAboutFields({ user }: { user: CurrentUser }) {
  const updateProfile = useUpdateProfile();
  const form = useForm<ProfileAboutValues>({
    resolver: zodResolver(profileAboutSchema),
    defaultValues: { name: user.name ?? "", bio: user.bio ?? "" },
  });

  function onSubmit(data: ProfileAboutValues) {
    updateProfile.mutate(data, {
      onSuccess: () => toast.success("Profile updated"),
      onError: (error) => {
        const matched = applyApiFormErrors(form.setError, error, ["name", "bio"]);
        if (!matched) toast.error(getApiErrorMessage(error));
      },
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="contents">
      <div className="mt-5 flex flex-col gap-5">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="profile-name"
                required
                className="mb-1.5 text-xs font-semibold text-foreground"
              >
                Full name
              </FieldLabel>
              <Input
                {...field}
                id="profile-name"
                aria-invalid={fieldState.invalid}
                className="max-w-sm"
              />
              {fieldState.invalid && (
                <FieldError className="text-[12.5px]" errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="bio"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="profile-bio"
                className="mb-1.5 text-xs font-semibold text-foreground"
              >
                Bio
              </FieldLabel>
              <Textarea
                {...field}
                id="profile-bio"
                aria-invalid={fieldState.invalid}
                placeholder="Tell us about yourself"
                className="max-w-sm"
              />
              {fieldState.invalid && (
                <FieldError className="text-[12.5px]" errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Field>
          <FieldLabel
            htmlFor="profile-email"
            className="mb-1.5 text-xs font-semibold text-foreground"
          >
            Email
          </FieldLabel>
          <Input id="profile-email" value={user.email} disabled className="max-w-sm" />
        </Field>
      </div>

      <Button
        type="submit"
        size="sm"
        disabled={updateProfile.isPending}
        className="mt-6 cursor-pointer"
      >
        {updateProfile.isPending ? "Saving…" : "Save"}
      </Button>
    </form>
  );
}

export function ProfilePageContent() {
  const { data: user } = useCurrentUser();

  return (
    <>
      <h1 className="text-2xl font-semibold text-foreground">Profile and Visibility</h1>

      <div className="mt-8">
        <div className="mb-2 text-sm font-semibold text-foreground">Photo</div>
        <ProfileAvatarUpload user={user} />
      </div>

      <div className="mt-8 border-t border-border pt-8">
        <h2 className="text-lg font-semibold text-foreground">About</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Required fields are marked with an asterisk <span className="text-destructive">*</span>
        </p>

        {user && <ProfileAboutFields key={user.id} user={user} />}
      </div>
    </>
  );
}
