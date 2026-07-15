"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { toBackgroundStyle } from "@/lib/utils";

import { SharePopover } from "./share-popover";
import { TemplateDetailSkeleton } from "./template-detail-skeleton";
import { TemplateSearchInput } from "./template-search-input";
import { UseTemplatePopover } from "./use-template-popover";
import { useTemplate } from "../_hooks/use-template";
import { getTemplateCategoryBySlug } from "../_lib/template-categories";

export function TemplateDetailContent({
  categorySlug,
  templateId,
}: {
  categorySlug: string;
  templateId: string;
}) {
  const pathname = usePathname();
  const category = getTemplateCategoryBySlug(categorySlug);
  const { data: template, isLoading, isError } = useTemplate(templateId);

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
                  </div>
                  <h1 className="text-2xl font-bold text-foreground">{template.name}</h1>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <SharePopover path={pathname} />
                  <UseTemplatePopover templateId={template.id} templateName={template.name} />
                </div>
              </div>

              {template.templateDescription && (
                <>
                  <h2 className="mb-2 text-base font-bold text-foreground">
                    About this template
                  </h2>
                  <p className="text-[13.5px] leading-relaxed whitespace-pre-line text-muted-foreground">
                    {template.templateDescription}
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
