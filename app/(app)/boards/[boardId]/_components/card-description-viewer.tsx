"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

import { getDescriptionEditorExtensions } from "../_lib/tiptap-extensions";

export function CardDescriptionViewer({
  description,
  expanded,
  onOverflowChange,
}: {
  description: string;
  expanded: boolean;
  onOverflowChange?: (overflowing: boolean) => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    editable: false,
    extensions: getDescriptionEditorExtensions(""),
    content: description,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "text-[13.5px] leading-relaxed focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (editor.storage.markdown.getMarkdown() !== description) {
      editor.commands.setContent(description);
    }
  }, [editor, description]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el || !onOverflowChange || expanded) return;

    function checkOverflow() {
      if (el) onOverflowChange?.(el.scrollHeight > el.clientHeight);
    }

    checkOverflow();
    const observer = new ResizeObserver(checkOverflow);
    observer.observe(el);
    return () => observer.disconnect();
  }, [onOverflowChange, expanded, description]);

  return (
    <div ref={contentRef} className={cn(!expanded && "line-clamp-6 overflow-hidden")}>
      <EditorContent editor={editor} />
    </div>
  );
}
