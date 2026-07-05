"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { register } from "@/lib/api/auth";
import { setTokens } from "@/lib/api/tokens";

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: register,
    onSuccess: (tokens) => {
      setTokens(tokens);
      router.replace("/boards");
    },
  });
}
