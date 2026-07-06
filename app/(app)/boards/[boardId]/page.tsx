import { BoardDetailContent } from "./_components/board-detail-content";

export default async function BoardDetailPage(props: PageProps<"/boards/[boardId]">) {
  const { boardId } = await props.params;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <BoardDetailContent boardId={boardId} />
    </div>
  );
}
