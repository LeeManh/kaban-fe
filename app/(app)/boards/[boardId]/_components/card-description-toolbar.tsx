"use client";

import type { Editor } from "@tiptap/react";
import {
  Bold,
  ChevronDown,
  Code,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Minus,
  Quote,
  Strikethrough,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { CardDescriptionImagePopover } from "./card-description-image-popover";

const HEADING_OPTIONS: { label: string; level: 0 | 1 | 2 | 3 }[] = [
  { label: "Normal text", level: 0 },
  { label: "Heading 1", level: 1 },
  { label: "Heading 2", level: 2 },
  { label: "Heading 3", level: 3 },
];

function ToolbarButton({
  active,
  onClick,
  children,
  ariaLabel,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  ariaLabel: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label={ariaLabel}
            aria-pressed={active}
            onClick={onClick}
            className={cn("cursor-pointer", active && "bg-muted text-foreground")}
          >
            {children}
          </Button>
        }
      />
      <TooltipContent side="bottom" showArrow={false}>
        {ariaLabel}
      </TooltipContent>
    </Tooltip>
  );
}

export function CardDescriptionToolbar({
  boardId,
  cardId,
  editor,
  showSource,
  onToggleSource,
}: {
  boardId: string;
  cardId: string;
  editor: Editor;
  showSource: boolean;
  onToggleSource: () => void;
}) {
  const currentHeading =
    HEADING_OPTIONS.find((option) => option.level > 0 && editor.isActive("heading", { level: option.level }))
      ?.label ?? "Normal text";
  const isHeadingActive = currentHeading !== "Normal text";
  const isListActive = editor.isActive("bulletList") || editor.isActive("orderedList");

  function setHeading(level: 0 | 1 | 2 | 3) {
    if (level === 0) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().toggleHeading({ level }).run();
    }
  }

  function setLink() {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter URL", previousUrl ?? "");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url }).run();
  }

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-border pb-1.5">
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger
            render={
              <DropdownMenuTrigger
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    aria-pressed={isHeadingActive}
                    disabled={showSource}
                    className={cn(
                      "cursor-pointer gap-0.5 disabled:opacity-40",
                      isHeadingActive && "bg-muted text-foreground",
                    )}
                  />
                }
              >
                {currentHeading === "Normal text" ? "Tt" : currentHeading}
                <ChevronDown className="size-3" />
              </DropdownMenuTrigger>
            }
          />
          <TooltipContent side="bottom" showArrow={false}>
            Text style
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="start">
          {HEADING_OPTIONS.map((option) => (
            <DropdownMenuItem key={option.label} onClick={() => setHeading(option.level)}>
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="mx-1 h-4 w-px bg-muted" />

      <ToolbarButton
        ariaLabel="Bold"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="size-3.5" />
      </ToolbarButton>
      <ToolbarButton
        ariaLabel="Italic"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="size-3.5" />
      </ToolbarButton>
      <ToolbarButton
        ariaLabel="Strikethrough"
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="size-3.5" />
      </ToolbarButton>
      <ToolbarButton
        ariaLabel="Code"
        active={editor.isActive("code")}
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        <Code className="size-3.5" />
      </ToolbarButton>

      <div className="mx-1 h-4 w-px bg-muted" />

      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger
            render={
              <DropdownMenuTrigger
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    aria-pressed={isListActive}
                    disabled={showSource}
                    className={cn(
                      "cursor-pointer disabled:opacity-40",
                      isListActive && "bg-muted text-foreground",
                    )}
                  />
                }
              >
                <List className="size-3.5" />
              </DropdownMenuTrigger>
            }
          />
          <TooltipContent side="bottom" showArrow={false}>
            List
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="start" className="w-36">
          <DropdownMenuItem onClick={() => editor.chain().focus().toggleBulletList().run()}>
            <List className="size-3.5" />
            Bullet list
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().toggleOrderedList().run()}>
            <ListOrdered className="size-3.5" />
            Numbered list
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ToolbarButton
        ariaLabel="Quote"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="size-3.5" />
      </ToolbarButton>

      <ToolbarButton ariaLabel="Horizontal rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus className="size-3.5" />
      </ToolbarButton>

      <div className="mx-1 h-4 w-px bg-muted" />

      <ToolbarButton ariaLabel="Link" active={editor.isActive("link")} onClick={setLink}>
        <LinkIcon className="size-3.5" />
      </ToolbarButton>
      <CardDescriptionImagePopover boardId={boardId} cardId={cardId} editor={editor} />

      <div className="ml-auto">
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="xs"
                aria-label="Toggle markdown source"
                aria-pressed={showSource}
                onClick={onToggleSource}
                className={cn("cursor-pointer font-mono", showSource && "bg-muted text-foreground")}
              >
                M↓
              </Button>
            }
          />
          <TooltipContent side="bottom" showArrow={false}>
            Markdown source
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
