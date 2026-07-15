"use client";

import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

import { TemplateCard } from "./template-card";
import { TemplateCardSkeleton } from "./template-card-skeleton";
import { TemplateSearchInput } from "./template-search-input";
import { TemplatesEmptyState } from "./templates-empty-state";
import { useCategoryTemplates } from "../_hooks/use-category-templates";
import { getTemplateCategoryBySlug } from "../_lib/template-categories";

const PAGE_SIZE = 20;

export function TemplateCategoryContent({ slug }: { slug: string }) {
  const category = getTemplateCategoryBySlug(slug);
  const { data, isLoading, isError, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useCategoryTemplates(category?.value, PAGE_SIZE);
  const templates = data?.pages.flatMap((page) => page.items) ?? [];

  if (!category) return null;

  return (
    <div className="flex flex-1 flex-col overflow-hidden pt-4">
      <main className="flex-1 overflow-y-auto px-8 py-6.5">
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
                    description={template.templateDescription}
                  />
                ))}
              </div>
              {hasNextPage && (
                <Button
                  variant="outline"
                  className="mt-4 cursor-pointer"
                  disabled={isFetchingNextPage}
                  onClick={() => fetchNextPage()}
                >
                  {isFetchingNextPage ? "Loading…" : "Load more"}
                </Button>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
