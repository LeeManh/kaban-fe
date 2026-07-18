"use client";

import { SquarePen } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { getCurrentUserId } from "@/lib/api/tokens";
import { toBackgroundStyle } from "@/lib/utils";

import { SharePopover } from "./share-popover";
import { TemplateBoardPreview } from "./template-board-preview";
import { TemplateDetailSkeleton } from "./template-detail-skeleton";
import { TemplateSearchInput } from "./template-search-input";
import { UseTemplatePopover } from "./use-template-popover";
import { useTemplate } from "../_hooks/use-template";
import { useUpdateTemplateVisibility } from "../_hooks/use-update-template-visibility";
import { getTemplateCategoryBySlug } from "../_lib/template-categories";

export function TemplateDetailContent({
  categorySlug,
  templateId,
}: {
  categorySlug: string;
  templateId: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const category = getTemplateCategoryBySlug(categorySlug);
  const { data: template, isLoading, isError } = useTemplate(templateId);
  const updateVisibility = useUpdateTemplateVisibility(templateId);
  const isOwner = !!template && template.ownerId === getCurrentUserId();
  const isPublic = template?.templateVisibility === "PUBLIC";

  if (!category) return null;

  return (
    <div className="flex flex-1 flex-col overflow-hidden pt-4">
      <main className="flex-1 overflow-y-auto px-8 py-6.5">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center justify-between gap-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="/templates" />}>
                    Template gallery
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href={`/templates/${category.slug}`} />}>
                    {category.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{template?.name ?? "…"}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <TemplateSearchInput className="relative w-72 shrink-0" />
          </div>

          {isLoading ? (
            <TemplateDetailSkeleton />
          ) : isError || !template ? (
            <p className="text-[13.5px] text-muted-foreground">
              Couldn&apos;t load this template. Please try again.
            </p>
          ) : (
            <>
              <div
                style={{ background: toBackgroundStyle(template.background) }}
                className="mb-5 h-48 rounded-md bg-cover bg-center"
              />

              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-1 flex items-center gap-2 text-[13px] text-muted-foreground">
                    <category.icon className="size-4" />
                    {category.label}
                    {isOwner && (
                      <Badge variant={isPublic ? "default" : "secondary"}>
                        {isPublic ? "Public" : "Private"}
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-2xl font-bold text-foreground">{template.name}</h1>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {isOwner && (
                    <>
                      <Button
                        variant="outline"
                        className="cursor-pointer gap-1.5"
                        onClick={() => router.push(`/boards/${template.id}`)}
                      >
                        <SquarePen className="size-3.75" />
                        Edit content
                      </Button>
                      <Button
                        variant="outline"
                        className="cursor-pointer"
                        disabled={updateVisibility.isPending}
                        onClick={() => updateVisibility.mutate(isPublic ? "PRIVATE" : "PUBLIC")}
                      >
                        {updateVisibility.isPending ? "Saving…" : isPublic ? "Unpublish" : "Publish"}
                      </Button>
                    </>
                  )}
                  <SharePopover path={pathname} />
                  <UseTemplatePopover templateId={template.id} templateName={template.name} />
                </div>
              </div>

              {template.templateDescription && (
                <>
                  <h2 className="mb-2 text-base font-bold text-foreground">
                    About this template
                  </h2>
                  <p className="mb-5 text-[13.5px] leading-relaxed whitespace-pre-line text-muted-foreground">
                    {template.templateDescription}
                  </p>
                </>
              )}

              <TemplateBoardPreview
                templateId={template.id}
                lists={template.lists}
                background={template.background}
                name={template.name}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
