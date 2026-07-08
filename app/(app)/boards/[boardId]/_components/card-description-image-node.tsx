/* eslint-disable @next/next/no-img-element */
"use client";

import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { Check, Copy, Trash2 } from "lucide-react";
import { useState } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const COPIED_RESET_DELAY = 1500;

export function CardDescriptionImageNode({ node, deleteNode }: NodeViewProps) {
  const [copied, setCopied] = useState(false);

  function copyImage() {
    const alt = node.attrs.alt ?? "";
    navigator.clipboard.writeText(`![${alt}](${node.attrs.src})`);
    setCopied(true);
    setTimeout(() => setCopied(false), COPIED_RESET_DELAY);
  }

  return (
    <NodeViewWrapper className="group relative inline-block max-w-full">
      <img
        src={node.attrs.src}
        alt={node.attrs.alt ?? ""}
        title={node.attrs.title ?? undefined}
        className="max-h-100 max-w-full rounded-md object-contain"
      />
      <div className="absolute top-2 right-2 hidden items-center gap-1 group-hover:flex">
        <Tooltip>
          <TooltipTrigger
            render={
              <button
                type="button"
                aria-label="Copy image"
                onClick={copyImage}
                className="flex size-7 cursor-pointer items-center justify-center rounded-md bg-white text-slate-700 shadow ring-1 ring-foreground/10 hover:bg-slate-100"
              />
            }
          >
            {copied ? <Check className="size-3.75 text-emerald-600" /> : <Copy className="size-3.75" />}
          </TooltipTrigger>
          <TooltipContent side="bottom" showArrow={false}>
            {copied ? "Copied!" : "Copy"}
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={
              <button
                type="button"
                aria-label="Delete image"
                onClick={deleteNode}
                className="flex size-7 cursor-pointer items-center justify-center rounded-md bg-white text-slate-700 shadow ring-1 ring-foreground/10 hover:bg-slate-100"
              />
            }
          >
            <Trash2 className="size-3.75" />
          </TooltipTrigger>
          <TooltipContent side="bottom" showArrow={false}>
            Delete
          </TooltipContent>
        </Tooltip>
      </div>
    </NodeViewWrapper>
  );
}
