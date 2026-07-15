import { FilePlusCorner } from "lucide-react";

import { Sidebar } from "../_components/sidebar";

export const metadata = {
  title: "Templates",
};

export default function TemplatesPage() {
  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col items-center justify-center gap-3 overflow-y-auto px-8 py-6.5 text-center">
        <FilePlusCorner className="size-10 text-muted-foreground" />
        <p className="text-sm font-medium text-foreground">Templates are coming soon</p>
        <p className="max-w-sm text-[13px] text-muted-foreground">
          Browse ready-made boards by category and start a new board in seconds.
        </p>
      </div>
    </div>
  );
}
