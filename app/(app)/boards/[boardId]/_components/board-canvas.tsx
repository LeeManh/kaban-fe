import { Plus } from "lucide-react";

import { BoardList, type MockList } from "./board-list";

const MOCK_LISTS: MockList[] = [
  {
    id: "todo",
    title: "To do",
    cards: [
      { id: "1", title: "Design onboarding flow", hasDescription: true, comments: 2 },
      { id: "2", title: "Set up CI/CD pipeline", checklist: { completed: 1, total: 4 } },
      { id: "3", title: "Write API documentation" },
    ],
  },
  {
    id: "in-progress",
    title: "In progress",
    cards: [
      {
        id: "4",
        title: "Build dashboard widgets",
        hasDescription: true,
        checklist: { completed: 3, total: 7 },
        attachments: 1,
        assignees: ["JD"],
      },
      {
        id: "5",
        title: "Fix checkout crash on iOS",
        comments: 3,
        assignees: ["ML", "SO"],
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    cards: [{ id: "6", title: "QA pass on mobile nav", checklist: { completed: 4, total: 4 } }],
  },
  {
    id: "done",
    title: "Done",
    cards: [
      { id: "7", title: "Ship landing page", done: true },
      { id: "8", title: "Backup production database", done: true },
      { id: "9", title: "Restore data after migration", done: true, assignees: ["PV"] },
    ],
  },
];

export function BoardCanvas() {
  return (
    <div className="flex flex-1 items-start gap-3 overflow-x-auto bg-linear-to-br from-amber-700 to-amber-600 p-3">
      {MOCK_LISTS.map((list) => (
        <BoardList key={list.id} list={list} />
      ))}

      <button
        type="button"
        className="flex w-70 shrink-0 items-center gap-1.5 rounded-md bg-white/15 px-3 py-2 text-[13.5px] font-medium text-white hover:bg-white/25"
      >
        <Plus className="size-4" />
        Add another list
      </button>
    </div>
  );
}
