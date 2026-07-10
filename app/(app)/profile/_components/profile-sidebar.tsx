import { Activity, CreditCard, FlaskConical, Settings, User } from "lucide-react";

import { cn } from "@/lib/utils";

const PERSONAL_SETTINGS = [
  { label: "Profile and Visibility", icon: User, active: true },
  { label: "Activity", icon: Activity, active: false },
  { label: "Cards", icon: CreditCard, active: false },
  { label: "Settings", icon: Settings, active: false },
  { label: "Labs", icon: FlaskConical, active: false },
];

export function ProfileSidebar() {
  return (
    <div className="w-64 shrink-0 border-r border-slate-200 px-4 py-6">
      <div className="mb-2 px-3 text-xs font-semibold tracking-wide text-slate-500 uppercase">
        Personal Settings
      </div>
      <nav className="flex flex-col gap-0.5">
        {PERSONAL_SETTINGS.map((item) => (
          <div
            key={item.label}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-[13.5px]",
              item.active
                ? "bg-blue-50 font-semibold text-primary"
                : "cursor-default font-medium text-slate-500",
            )}
          >
            <item.icon className="size-4.5 shrink-0" />
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}
