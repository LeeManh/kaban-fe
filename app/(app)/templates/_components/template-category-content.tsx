"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

import { TemplateCard } from "./template-card";
import { TemplateCardSkeleton } from "./template-card-skeleton";
import { TemplatePagination } from "./template-pagination";
import { TemplateSearchInput } from "./template-search-input";
import { TemplatesEmptyState } from "./templates-empty-state";
import { useCategoryTemplates } from "../_hooks/use-category-templates";
import { getTemplateCategoryBySlug } from "../_lib/template-categories";

const PAGE_SIZE = 20;

export function TemplateCategoryContent({ slug }: { slug: string }) {
  const category = getTemplateCategoryBySlug(slug);
  const [page, setPage] = useState(1);
  const [prevSlug, setPrevSlug] = useState(slug);
  if (slug !== prevSlug) {
    setPrevSlug(slug);
    setPage(1);
  }

  const { data, isLoading, isError } = useCategoryTemplates(category?.value, page, PAGE_SIZE);
  const templates = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;

  const mainRef = useRef<HTMLElement>(null);
  useScrollToTop(mainRef, page);

  if (!category) return null;

  return (
    <div className="flex flex-1 flex-col overflow-hidden pt-4">
      <main ref={mainRef} className="flex-1 overflow-y-auto px-8 py-6.5">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 flex items-center justify-between gap-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="/templates" />}>
                    Template gallery
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{category.label}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <TemplateSearchInput className="relative w-72 shrink-0" />
          </div>

          <h1 className="mb-4 text-[17px] font-bold text-foreground">{category.label}</h1>

          {isLoading ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <TemplateCardSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <p className="text-[13.5px] text-muted-foreground">
              Couldn&apos;t load templates. Please try again.
            </p>
          ) : templates.length === 0 ? (
            <TemplatesEmptyState message={`No templates found in ${category.label}.`} />
          ) : (
            <>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
                {templates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    id={template.id}
                    categorySlug={category.slug}
                    name={template.name}
                    background={template.background}
                    description={template.description}
                    owner={template.owner}
                  />
                ))}
              </div>
              <TemplatePagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
