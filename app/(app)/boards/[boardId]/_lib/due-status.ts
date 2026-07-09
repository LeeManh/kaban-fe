export type DueStatus = "complete" | "overdue" | "due-soon" | "upcoming";

const DUE_SOON_WINDOW_MS = 24 * 60 * 60 * 1000;

export function getDueStatus(dueDate: string, isDone: boolean): DueStatus {
  if (isDone) return "complete";
  const msUntilDue = new Date(dueDate).getTime() - new Date().getTime();
  if (msUntilDue < 0) return "overdue";
  if (msUntilDue <= DUE_SOON_WINDOW_MS) return "due-soon";
  return "upcoming";
}

export const DUE_STATUS_BADGE_CLASSNAME: Record<DueStatus, string> = {
  complete: "bg-emerald-700 text-white",
  overdue: "bg-red-100 text-red-700",
  "due-soon": "bg-amber-200 text-amber-900",
  upcoming: "bg-slate-100 text-slate-700",
};

export const DUE_STATUS_LABEL: Record<DueStatus, string> = {
  complete: "Complete",
  overdue: "Overdue",
  "due-soon": "Due soon",
  upcoming: "",
};
