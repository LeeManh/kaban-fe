"use client";

import { Camera, Loader2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import type { CurrentUser } from "@/lib/api/users";
import { cn, getInitials } from "@/lib/utils";

import { useUpdateProfile } from "../../../_hooks/use-update-profile";
import { useUploadAvatar } from "../../../_hooks/use-upload-avatar";

export function ProfileAvatarUpload({ user }: { user?: CurrentUser }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const uploadAvatar = useUploadAvatar();
  const updateProfile = useUpdateProfile();

  const localPreviewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    return () => {
      if (localPreviewUrl) URL.revokeObjectURL(localPreviewUrl);
    };
  }, [localPreviewUrl]);

  const previewUrl = localPreviewUrl ?? user?.avatar ?? null;
  const isUploading = uploadAvatar.isPending;

  function handleFileChange(nextFile: File | null) {
    if (!nextFile) return;
    setFile(nextFile);
    uploadAvatar.mutate(nextFile, {
      onSettled: () => setFile(null),
    });
  }

  function handleRemove() {
    updateProfile.mutate({ avatar: "" });
  }

  return (
    <div className="flex items-center gap-5">
      <button
        type="button"
        aria-label="Change photo"
        disabled={isUploading}
        onClick={() => inputRef.current?.click()}
        className="group relative flex size-20 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-violet-500 text-xl font-bold text-white disabled:cursor-not-allowed"
      >
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="Avatar preview" className="size-full object-cover" />
        ) : (
          <span>{user ? getInitials(user) : ""}</span>
        )}
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity",
            isUploading ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          )}
        >
          {isUploading ? (
            <Loader2 className="size-5 animate-spin text-white" />
          ) : (
            <Camera className="size-5 text-white" />
          )}
        </span>
      </button>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isUploading}
            className="cursor-pointer"
            onClick={() => inputRef.current?.click()}
          >
            {isUploading ? "Uploading…" : "Upload photo"}
          </Button>
          {user?.avatar && !isUploading && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={updateProfile.isPending}
              className="cursor-pointer text-slate-500"
              onClick={handleRemove}
            >
              Remove
            </Button>
          )}
        </div>
        <p className="text-xs text-slate-500">Image files up to 5MB.</p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}
