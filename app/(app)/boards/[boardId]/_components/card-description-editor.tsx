"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { getDescriptionEditorExtensions } from "../_lib/tiptap-extensions";
import { CardDescriptionToolbar } from "./card-description-toolbar";

export function CardDescriptionEditor({
  boardId,
  cardId,
  initialValue,
  isSaving,
  onSave,
  onCancel,
}: {
  boardId: string;
  cardId: string;
  initialValue: string;
  isSaving?: boolean;
  onSave: (markdown: string) => void;
  onCancel: () => void;
}) {
  const [showSource, setShowSource] = useState(false);
  const [sourceText, setSourceText] = useState(initialValue);

  const editor = useEditor({
    extensions: getDescriptionEditorExtensions("Add a more detailed description…", {
      withImageControls: true,
    }),
    content: initialValue,
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    editorProps: {
      attributes: {
        class: "min-h-24 text-[13.5px] leading-relaxed focus:outline-none",
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
          className="mt-2 min-h-24 w-full resize-y font-mono text-[13px] leading-relaxed outline-none"
        />
      ) : (
        <div className="mt-2">
          <EditorContent editor={editor} />
        </div>
      )}

      <div className="mt-2 flex items-center gap-2">
        <Button size="sm" className="cursor-pointer" disabled={isSaving} onClick={handleSave}>
          {isSaving ? "Saving…" : "Save"}
        </Button>
        <Button variant="ghost" size="sm" className="cursor-pointer" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
