import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { MarkdownSerializerState } from "prosemirror-markdown";
import type { Node as ProseMirrorNode } from "prosemirror-model";
import { Markdown } from "tiptap-markdown";

import { CardDescriptionImageNode } from "../_components/card-description-image-node";

const ImageBase = Image.extend({
  addStorage() {
    return {
      ...this.parent?.(),
      markdown: {
        serialize(state: MarkdownSerializerState, node: ProseMirrorNode) {
          state.write(
            `![${state.esc(node.attrs.alt || "")}](${(node.attrs.src as string).replace(/[()]/g, "\\$&")}${
              node.attrs.title ? ` "${(node.attrs.title as string).replace(/"/g, '\\"')}"` : ""
            })`,
          );
          state.closeBlock(node);
        },
      },
    };
  },
});

const ImageWithControls = ImageBase.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CardDescriptionImageNode);
  },
});

const ImageViewOnly = ImageBase.configure({
  HTMLAttributes: { class: "max-h-100 max-w-full rounded-md object-contain" },
});

export function getDescriptionEditorExtensions(
  placeholder: string,
  options?: { withImageControls?: boolean },
) {
  return [
    StarterKit.configure({
      link: {
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      },
    }),
    options?.withImageControls ? ImageWithControls : ImageViewOnly,
    Placeholder.configure({ placeholder }),
    Markdown.configure({
      html: false,
      transformPastedText: true,
      transformCopiedText: true,
    }),
  ];
}
