import type { CardSummary } from "@/lib/api/boards";

export interface BoardFilterState {
  keyword: string;
  noMembers: boolean;
  assignedToMe: boolean;
  memberIds: string[];
  markedComplete: boolean;
  notMarkedComplete: boolean;
  noDates: boolean;
  overdue: boolean;
  dueNextDay: boolean;
  dueNextWeek: boolean;
  dueNextMonth: boolean;
  noLabels: boolean;
  labelIds: string[];
}

export const EMPTY_BOARD_FILTER: BoardFilterState = {
  keyword: "",
  noMembers: false,
  assignedToMe: false,
  memberIds: [],
  markedComplete: false,
  notMarkedComplete: false,
  noDates: false,
  overdue: false,
  dueNextDay: false,
  dueNextWeek: false,
  dueNextMonth: false,
  noLabels: false,
  labelIds: [],
};

export function isBoardFilterActive(filter: BoardFilterState): boolean {
  return (
    filter.keyword.trim() !== "" ||
    filter.noMembers ||
    filter.assignedToMe ||
    filter.memberIds.length > 0 ||
    filter.markedComplete ||
    filter.notMarkedComplete ||
    filter.noDates ||
    filter.overdue ||
    filter.dueNextDay ||
    filter.dueNextWeek ||
    filter.dueNextMonth ||
    filter.noLabels ||
    filter.labelIds.length > 0
  );
}

const DAY_MS = 24 * 60 * 60 * 1000;

export function matchesBoardFilter(
  card: CardSummary,
  filter: BoardFilterState,
  currentUserId: string | null,
): boolean {
  const keyword = filter.keyword.trim().toLowerCase();
  if (keyword) {
    const haystack = [
      card.title,
      card.description ?? "",
      ...card.assignees.map((assignee) => assignee.name ?? assignee.email),
      ...card.labels.map((label) => label.name),
    ]
      .join(" ")
      .toLowerCase();
    if (!haystack.includes(keyword)) return false;
  }

  if (filter.noMembers || filter.assignedToMe || filter.memberIds.length > 0) {
    const matchesNoMembers = filter.noMembers && card.assignees.length === 0;
    const matchesAssignedToMe =
      filter.assignedToMe &&
      !!currentUserId &&
      card.assignees.some((assignee) => assignee.id === currentUserId);
    const matchesSelected =
      filter.memberIds.length > 0 &&
      card.assignees.some((assignee) => filter.memberIds.includes(assignee.id));
    if (!matchesNoMembers && !matchesAssignedToMe && !matchesSelected) return false;
  }

  if (filter.markedComplete || filter.notMarkedComplete) {
    const matchesComplete = filter.markedComplete && card.isDone;
    const matchesIncomplete = filter.notMarkedComplete && !card.isDone;
    if (!matchesComplete && !matchesIncomplete) return false;
  }

  if (
    filter.noDates ||
    filter.overdue ||
    filter.dueNextDay ||
    filter.dueNextWeek ||
    filter.dueNextMonth
  ) {
    let matches = false;
    if (filter.noDates && !card.dueDate) matches = true;

    if (!matches && card.dueDate) {
      const dueTime = new Date(card.dueDate).getTime();
      const now = Date.now();
      const isOverdue = dueTime < now && !card.isDone;

      if (filter.overdue && isOverdue) matches = true;
      if (!isOverdue) {
        const msUntilDue = dueTime - now;
        if (filter.dueNextDay && msUntilDue <= DAY_MS) matches = true;
        if (filter.dueNextWeek && msUntilDue <= 7 * DAY_MS) matches = true;
        if (filter.dueNextMonth && msUntilDue <= 30 * DAY_MS) matches = true;
      }
    }

    if (!matches) return false;
  }

  if (filter.noLabels || filter.labelIds.length > 0) {
    const matchesNoLabels = filter.noLabels && card.labels.length === 0;
    const matchesSelected =
      filter.labelIds.length > 0 &&
      card.labels.some((label) => filter.labelIds.includes(label.id));
    if (!matchesNoLabels && !matchesSelected) return false;
  }

  return true;
}
