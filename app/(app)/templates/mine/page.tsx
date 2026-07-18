import { Sidebar } from "../../_components/sidebar";
import { MyTemplatesPageContent } from "../_components/my-templates-page-content";

export const metadata = {
  title: "My templates",
};

export default function MyTemplatesPage() {
  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <MyTemplatesPageContent />
      </div>
    </div>
  );
}
