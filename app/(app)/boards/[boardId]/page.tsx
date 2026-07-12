import { Suspense } from "react";

import { BoardDetailContent } from "./_components/board-detail-content";

export const metadata = {
  title: "Board",
};

export default async function BoardDetailPage(props: PageProps<"/boards/[boardId]">) {
  const { boardId } = await props.params;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Suspense fallback={null}>
        <BoardDetailContent boardId={boardId} />
      </Suspense>
    </div>
  );
}
