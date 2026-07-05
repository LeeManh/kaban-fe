import axios from "axios";
import type { FieldPath, FieldValues, UseFormSetError } from "react-hook-form";

import type { ApiErrorPayload } from "@/lib/api/client";

export function applyApiFormErrors<TFieldValues extends FieldValues>(
  setError: UseFormSetError<TFieldValues>,
  error: unknown,
  fieldNames: FieldPath<TFieldValues>[],
): boolean {
  if (!axios.isAxiosError(error)) return false;

  const errors = (error.response?.data as ApiErrorPayload | undefined)?.errors;
  if (!Array.isArray(errors) || errors.length === 0) return false;

  let matched = false;
  for (const { field, message } of errors) {
    const target = fieldNames.find((name) => String(name) === field);
    if (target) {
      setError(target, { type: "server", message });
      matched = true;
    }
  }
  return matched;
}
