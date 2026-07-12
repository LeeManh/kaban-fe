"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

import { register } from "@/lib/api/auth";
import { setTokens } from "@/lib/api/tokens";

export function useRegister() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return useMutation({
    mutationFn: register,
    meta: { skipErrorToast: true },
    onSuccess: (tokens) => {
      setTokens(tokens);
      const redirect = searchParams.get("redirect");
      router.replace(redirect && redirect.startsWith("/") && !redirect.startsWith("//") ? redirect : "/boards");
    },
  });
}
