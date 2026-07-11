"use client";

import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type CollisionDetection,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { Ellipsis, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { CardSummary, ListWithCards } from "@/lib/api/boards";

import { useMoveCard } from "../_hooks/use-move-card";
import { useMoveList } from "../_hooks/use-move-list";
import { AddListForm } from "./add-list-form";
import { BoardCardPreview } from "./board-card-item";
import { BoardList } from "./board-list";

function neighborsOf<T extends { id: string }>(items: T[], id: string) {
  const index = items.findIndex((item) => item.id === id);
  return {
    beforeId: index > 0 ? items[index - 1].id : undefined,
    afterId: index !== -1 && index < items.length - 1 ? items[index + 1].id : undefined,
  };
}

// When dragging a list, restrict collision candidates to other lists — otherwise
// closestCenter can resolve `over` to a card nested inside another list's body.
const collisionDetection: CollisionDetection = (args) => {
  if (args.active.data.current?.type === "list") {
    const listContainers = args.droppableContainers.filter(
      (container) => container.data.current?.type === "list",
    );
    return closestCenter({ ...args, droppableContainers: listContainers });
  }

  return closestCenter(args);
};

export function BoardCanvas({ boardId, lists }: { boardId: string; lists: ListWithCards[] }) {
  const [orderedLists, setOrderedLists] = useState(lists);
  const isDragging = useRef(false);
  const [activeCard, setActiveCard] = useState<CardSummary | null>(null);
  const [activeList, setActiveList] = useState<ListWithCards | null>(null);

  const moveList = useMoveList(boardId);
  const moveCard = useMoveCard(boardId);

  useEffect(() => {
    if (!isDragging.current) setOrderedLists(lists);
  }, [lists]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  function findListByCardId(cardId: string) {
    return orderedLists.find((list) => list.cards.some((card) => card.id === cardId));
  }

  function handleDragStart(event: DragStartEvent) {
    isDragging.current = true;
    const { active } = event;

    if (active.data.current?.type === "list") {
      setActiveList(orderedLists.find((list) => list.id === active.id) ?? null);
      return;
    }

    const list = findListByCardId(active.id as string);
    setActiveCard(list?.cards.find((card) => card.id === active.id) ?? null);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over || active.data.current?.type === "list") return;

    const activeId = active.id as string;
    const overId = over.id as string;
    if (activeId === overId) return;

    const sourceList = findListByCardId(activeId);
    const destList = orderedLists.find((list) => list.id === overId) ?? findListByCardId(overId);
    if (!sourceList || !destList || sourceList.id === destList.id) return;

    setOrderedLists((current) =>
      current.map((list) => {
        if (list.id === sourceList.id) {
          return { ...list, cards: list.cards.filter((card) => card.id !== activeId) };
        }
        if (list.id === destList.id) {
          const movingCard = sourceList.cards.find((card) => card.id === activeId);
          if (!movingCard) return list;

          const overIndex = list.cards.findIndex((card) => card.id === overId);
          const insertIndex = overIndex === -1 ? list.cards.length : overIndex;
          const cards = [...list.cards];
          cards.splice(insertIndex, 0, { ...movingCard, listId: destList.id });
          return { ...list, cards };
        }
        return list;
      }),
    );
  }

  function handleDragEnd(event: DragEndEvent) {
    isDragging.current = false;
    const draggedCard = activeCard;
    setActiveCard(null);
    setActiveList(null);

    const { active, over } = event;
    if (!over) return;

    if (active.data.current?.type === "list") {
      const activeId = active.id as string;
      const overId = over.id as string;
      if (activeId === overId) return;

      const oldIndex = orderedLists.findIndex((list) => list.id === activeId);
      const newIndex = orderedLists.findIndex((list) => list.id === overId);
      if (oldIndex === -1 || newIndex === -1) return;

      const reordered = arrayMove(orderedLists, oldIndex, newIndex);
      setOrderedLists(reordered);

      const { beforeId, afterId } = neighborsOf(reordered, activeId);
      moveList.mutate({ listId: activeId, beforeId, afterId });
      return;
    }

    if (!draggedCard) return;
    const activeId = active.id as string;
    const sourceListId = draggedCard.listId;

    const destList = orderedLists.find((list) => list.cards.some((card) => card.id === activeId));
    if (!destList) return;

    const overId = over.id as string;
    let cards = destList.cards;

    if (overId !== activeId && cards.some((card) => card.id === overId)) {
      const oldIndex = cards.findIndex((card) => card.id === activeId);
      const newIndex = cards.findIndex((card) => card.id === overId);
      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        cards = arrayMove(cards, oldIndex, newIndex);
        setOrderedLists((current) =>
          current.map((list) => (list.id === destList.id ? { ...list, cards } : list)),
        );
      }
    }

    const { beforeId, afterId } = neighborsOf(cards, activeId);
    moveCard.mutate({
      cardId: activeId,
      sourceListId,
      listId: destList.id === sourceListId ? undefined : destList.id,
      beforeId,
      afterId,
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-1 items-start gap-3 overflow-x-auto p-3">
        <SortableContext
          items={orderedLists.map((list) => list.id)}
          strategy={horizontalListSortingStrategy}
        >
          {orderedLists.map((list) => (
            <BoardList key={list.id} list={list} />
          ))}
        </SortableContext>

        <AddListForm boardId={boardId} />
      </div>

      <DragOverlay>
        {activeList && (
          <div className="flex w-70 shrink-0 rotate-3 flex-col rounded-md bg-muted p-2 shadow-lg">
            <div className="mb-1 flex items-center gap-1.5 px-1.5 py-1">
              <span className="flex-1 truncate text-[13.5px] font-semibold text-foreground">
                {activeList.title}
              </span>
              {activeList.cards.length > 0 && (
                <span className="text-xs font-medium text-muted-foreground">
                  {activeList.cards.length}
                </span>
              )}
              <span className="flex size-6 items-center justify-center rounded-md text-muted-foreground">
                <Ellipsis className="size-3.75" />
              </span>
            </div>

            <div className="flex flex-col gap-1.5 overflow-y-auto">
              {activeList.cards.map((card) => (
                <BoardCardPreview key={card.id} card={card} />
              ))}
            </div>

            <div className="mt-1.5 flex items-center gap-1.5 rounded-md px-1.5 py-1.5 text-left text-[13px] font-medium text-muted-foreground">
              <Plus className="size-3.75" />
              Add a card
            </div>
          </div>
        )}
        {activeCard && (
          <div className="w-70 rotate-3">
            <BoardCardPreview card={activeCard} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
