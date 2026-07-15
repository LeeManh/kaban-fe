import { notFound } from "next/navigation";

import { Sidebar } from "../../_components/sidebar";
import { TemplateCategoryContent } from "../_components/template-category-content";
import { getTemplateCategoryBySlug } from "../_lib/template-categories";

export const metadata = {
  title: "Templates",
};

export default async function TemplateCategoryPage(props: PageProps<"/templates/[category]">) {
  const { category: slug } = await props.params;
  if (!getTemplateCategoryBySlug(slug)) notFound();

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <TemplateCategoryContent slug={slug} />
      </div>
    </div>
  );
}
