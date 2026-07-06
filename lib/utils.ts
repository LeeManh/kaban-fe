import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toBackgroundStyle(value: string): string {
  return value.startsWith("http") ? `url(${value}) center/cover no-repeat` : value
}

export function getInitials(member: { name?: string | null; email: string }): string {
  const source = member.name?.trim() || member.email
  const parts = source.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return source.slice(0, 2).toUpperCase()
}
