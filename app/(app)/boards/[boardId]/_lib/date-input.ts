export function formatDateInput(date: Date) {
  return date.toLocaleDateString(undefined, { month: "numeric", day: "numeric", year: "numeric" });
}

export function formatTimeInput(date: Date) {
  return date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

export function parseDateInput(text: string): Date | null {
  const match = text.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return null;
  const [, month, day, year] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return Number.isNaN(date.getTime()) ? null : date;
}

export function parseTimeInput(text: string): { hours: number; minutes: number } | null {
  const match = text.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hours = parseInt(match[1], 10) % 12;
  if (match[3].toUpperCase() === "PM") hours += 12;
  return { hours, minutes: parseInt(match[2], 10) };
}
