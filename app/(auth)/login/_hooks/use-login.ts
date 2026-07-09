"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

import { login } from "@/lib/api/auth";
import { setTokens } from "@/lib/api/tokens";

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return useMutation({
    mutationFn: login,
    onSuccess: (tokens) => {
      setTokens(tokens);
      const redirect = searchParams.get("redirect");
      router.replace(redirect && redirect.startsWith("/") && !redirect.startsWith("//") ? redirect : "/boards");
    },
  });
}
