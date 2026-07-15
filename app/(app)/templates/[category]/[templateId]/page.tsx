import { notFound } from "next/navigation";

import { Sidebar } from "../../../_components/sidebar";
import { TemplateDetailContent } from "../../_components/template-detail-content";
import { getTemplateCategoryBySlug } from "../../_lib/template-categories";

export const metadata = {
  title: "Templates",
};

export default async function TemplateDetailPage(
  props: PageProps<"/templates/[category]/[templateId]">,
) {
  const { category: slug, templateId } = await props.params;
  if (!getTemplateCategoryBySlug(slug)) notFound();

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <TemplateDetailContent categorySlug={slug} templateId={templateId} />
      </div>
    </div>
  );
}
