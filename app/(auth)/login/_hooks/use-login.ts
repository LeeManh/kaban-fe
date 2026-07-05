"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { login } from "@/lib/api/auth";
import { setTokens } from "@/lib/api/tokens";

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: (tokens) => {
      setTokens(tokens);
      router.replace("/");
    },
  });
}
