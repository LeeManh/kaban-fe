"use client";

import { TemplateCard } from "./template-card";
import { TemplateCardSkeleton } from "./template-card-skeleton";
import { TemplatesEmptyState } from "./templates-empty-state";
import { useTemplates } from "../_hooks/use-templates";
import { getTemplateCategoryBySlug } from "../_lib/template-categories";

export function TemplateCategoryContent({ slug }: { slug: string }) {
  const category = getTemplateCategoryBySlug(slug);
  const { data, isLoading, isError } = useTemplates(
    category ? { category: category.value } : undefined,
    { enabled: !!category },
  );
  const templates = data?.items ?? [];

  if (!category) return null;

  return (
    <div className="flex flex-1 flex-col overflow-hidden pt-4">
      <main className="flex-1 overflow-y-auto px-8 py-6.5">
        <div className="mx-auto max-w-4xl">
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
            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
              {templates.map((template) => (
                <TemplateCard
                  key={template.id}
                  name={template.name}
                  background={template.background}
                  description={template.templateDescription}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
