"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { getDescriptionEditorExtensions } from "../_lib/tiptap-extensions";
import { CardDescriptionToolbar } from "./card-description-toolbar";

export function MarkdownEditor({
  boardId,
  cardId,
  initialValue = "",
  placeholder,
  minHeightClassName = "min-h-24",
  autoFocus = false,
  isSaving,
  saveLabel = "Save",
  onSave,
  onCancel,
}: {
  boardId: string;
  cardId: string;
  initialValue?: string;
  placeholder: string;
  minHeightClassName?: string;
  autoFocus?: boolean;
  isSaving?: boolean;
  saveLabel?: string;
  onSave: (markdown: string) => void;
  onCancel?: () => void;
}) {
  const [showSource, setShowSource] = useState(false);
  const [sourceText, setSourceText] = useState(initialValue);

  const editor = useEditor({
    extensions: getDescriptionEditorExtensions(placeholder, { withImageControls: true }),
    content: initialValue,
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    autofocus: autoFocus,
    editorProps: {
      attributes: {
        class: cn(minHeightClassName, "text-[13.5px] leading-relaxed focus:outline-none"),
      },
    },
  });

  function toggleSource() {
    if (!editor) return;
    if (showSource) {
      editor.commands.setContent(sourceText);
    } else {
      setSourceText(editor.storage.markdown.getMarkdown());
    }
    setShowSource((v) => !v);
  }

  function handleSave() {
    if (!editor) return;
    const markdown = showSource ? sourceText : editor.storage.markdown.getMarkdown();
    onSave(markdown);
  }

  if (!editor) return null;

  const isEmpty = showSource ? !sourceText.trim() : editor.isEmpty;

  return (
    <div className="rounded-md border border-slate-300 bg-white p-2">
      <CardDescriptionToolbar
        boardId={boardId}
        cardId={cardId}
        editor={editor}
        showSource={showSource}
        onToggleSource={toggleSource}
      />

      {showSource ? (
        <textarea
          autoFocus
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
          className={cn(
            "mt-2 w-full resize-y font-mono text-[13px] leading-relaxed outline-none",
            minHeightClassName,
          )}
        />
      ) : (
        <div className="mt-2">
          <EditorContent editor={editor} />
        </div>
      )}

      <div className="mt-2 flex items-center gap-2">
        <Button size="sm" className="cursor-pointer" disabled={isSaving || isEmpty} onClick={handleSave}>
          {isSaving ? "Saving…" : saveLabel}
        </Button>
        {onCancel && (
          <Button variant="ghost" size="sm" className="cursor-pointer" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
