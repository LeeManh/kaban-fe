"use client";

import { useState } from "react";

import type { TemplateListPreview } from "@/lib/api/templates";
import { toBackgroundStyle } from "@/lib/utils";

import { TemplateCardDetailDialog } from "./template-card-detail-dialog";
import { TemplateListColumn } from "./template-list-column";
import { TemplatePreviewHeader } from "./template-preview-header";

export function TemplateBoardPreview({
  templateId,
  lists,
  background,
  name,
}: {
  templateId: string;
  lists: TemplateListPreview[];
  background: string;
  name: string;
}) {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  if (lists.length === 0) return null;

  return (
    <div
      style={{ background: toBackgroundStyle(background) }}
      className="relative flex h-160 flex-col overflow-hidden rounded-sm bg-cover bg-center"
    >
      <TemplatePreviewHeader name={name} />
      <div className="flex min-h-0 flex-1 items-start gap-3 overflow-x-auto p-3">
        {lists.map((list) => (
          <TemplateListColumn key={list.id} list={list} onCardClick={setSelectedCardId} />
        ))}
      </div>

      <TemplateCardDetailDialog
        templateId={templateId}
        cardId={selectedCardId}
        onClose={() => setSelectedCardId(null)}
      />
    </div>
  );
}
