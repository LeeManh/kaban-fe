"use client";

import { useMutation } from "@tanstack/react-query";

import { resetPassword } from "@/lib/api/auth";

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
    meta: { skipErrorToast: true },
  });
}
