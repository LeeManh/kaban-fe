import { Sidebar } from "../_components/sidebar";
import { TemplatesPageContent } from "./_components/templates-page-content";

export const metadata = {
  title: "Templates",
};

export default function TemplatesPage() {
  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <TemplatesPageContent />
      </div>
    </div>
  );
}
