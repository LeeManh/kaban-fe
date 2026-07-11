import { Check } from "lucide-react";

import { Logo } from "@/components/logo";

interface AuthBrandPanelProps {
  description: string;
  features?: string[];
}

export function AuthBrandPanel({ description, features }: AuthBrandPanelProps) {
  return (
    <div className="relative hidden flex-1 flex-col justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-12 lg:flex dark:from-blue-950 dark:via-slate-900 dark:to-blue-950">
      <Logo className="mb-6.5 dark:text-slate-100" />
      <h2 className="mb-2.5 max-w-85 text-[30px] leading-[1.18] font-extrabold tracking-[-0.03em] text-slate-800 dark:text-slate-100">
        Organize work the simple way
      </h2>
      <p className="max-w-80 text-[14.5px] leading-[1.6] text-[#475d85] dark:text-blue-200/80">
        {description}
      </p>

      {features ? (
        <ul className="mt-5.5 flex max-w-75 flex-col gap-3.25">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2.75 text-[13.5px] font-semibold text-[#33457a] dark:text-blue-100"
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              {feature}
            </li>
          ))}
        </ul>
      ) : (
        <div className="absolute -right-10 -bottom-7.5 w-105 rotate-[-4deg] opacity-92 drop-shadow-2xl">
          <div className="flex gap-2.5 rounded-md bg-white/85 p-3.5 backdrop-blur-[2px] dark:bg-slate-800/85">
            <MockListPreview
              barWidth="w-3/5"
              cards={[
                { labelColor: "bg-violet-400", lineWidth: "w-4/5" },
                { labelColor: "bg-emerald-400", lineWidth: "w-2/3" },
              ]}
            />
            <MockListPreview
              barWidth="w-1/2"
              cards={[
                { labelColor: "bg-sky-500", lineWidth: "w-3/4" },
                { labelColor: "bg-amber-400", lineWidth: "w-3/5" },
              ]}
            />
            <MockListPreview
              barWidth="w-1/2"
              cards={[{ labelColor: "bg-red-400", lineWidth: "w-3/4" }]}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function MockListPreview({
  barWidth,
  cards,
}: {
  barWidth: string;
  cards: { labelColor: string; lineWidth: string }[];
}) {
  return (
    <div className="flex flex-1 flex-col gap-1.75 rounded-md bg-slate-100/90 p-2.25 dark:bg-slate-700/90">
      <div className={`h-1.75 ${barWidth} rounded bg-slate-300 dark:bg-slate-500`} />
      {cards.map((card, i) => (
        <div key={i} className="rounded-md bg-white p-2 shadow-sm dark:bg-slate-800">
          <div className={`mb-1.5 h-1.25 w-7.5 rounded-md ${card.labelColor}`} />
          <div className={`h-1.25 ${card.lineWidth} rounded-md bg-slate-200 dark:bg-slate-600`} />
        </div>
      ))}
    </div>
  );
}
