import { Check, Paperclip, SquareCheckBig } from "lucide-react";

import { Container } from "@/components/container";
import { SectionEyebrow } from "@/app/_components/section-eyebrow";

const HIGHLIGHTS = [
  "Track progress with nested checklists",
  "Attach files, mockups, and links",
  "Discuss inline with @mentions",
];

export function Showcase() {
  return (
    <section className="py-22">
      <Container className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
        <div className="w-full max-w-120 shrink-0">
          <div className="-rotate-[1.5deg] overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[0_30px_60px_--theme(--color-slate-900/16%)]">
            <div className="border-b border-slate-100 px-4.5 pt-4.5 pb-3.5">
              <div className="mb-2.5 flex gap-1.25">
                <span className="h-2 w-9.5 rounded bg-violet-400" />
                <span className="h-2 w-9.5 rounded bg-sky-500" />
                <span className="h-2 w-9.5 rounded bg-amber-400" />
              </div>
              <div className="text-[17px] font-extrabold tracking-[-0.02em] text-slate-900">
                Design the onboarding flow
              </div>
            </div>

            <div className="px-4.5 py-4">
              <div className="mb-2.75 flex items-center gap-2.25">
                <SquareCheckBig className="size-3.75 text-slate-600" strokeWidth={2} />
                <span className="text-[13px] font-bold text-slate-900">
                  Acceptance criteria
                </span>
                <span className="ml-auto text-xs font-bold text-slate-500">
                  3/5
                </span>
              </div>
              <div className="mb-3.5 h-1.75 overflow-hidden rounded bg-slate-100">
                <div className="h-full w-3/5 rounded bg-primary" />
              </div>

              <div className="mb-4.5 flex flex-col gap-2.25">
                <div className="flex items-center gap-2.25">
                  <span className="flex size-4 items-center justify-center rounded-[5px] bg-primary">
                    <Check className="size-2.5 text-white" strokeWidth={3.5} />
                  </span>
                  <span className="text-[12.5px] text-slate-400 line-through">
                    Map all sign-up entry points
                  </span>
                </div>
                <div className="flex items-center gap-2.25">
                  <span className="size-4 rounded-[5px] border-2 border-slate-300" />
                  <span className="text-[12.5px] text-slate-700">
                    Design skippable product tour
                  </span>
                </div>
              </div>

              <div className="mb-2.75 flex items-center gap-2.25">
                <Paperclip className="size-3.75 text-slate-600" strokeWidth={2} />
                <span className="text-[13px] font-bold text-slate-900">
                  Attachments
                </span>
              </div>
              <div className="flex items-center gap-2.5 rounded-[9px] border border-slate-100 p-2">
                <div className="h-8.5 w-11.5 shrink-0 rounded-md bg-gradient-to-br from-indigo-300 via-sky-400 to-fuchsia-300" />
                <div className="flex-1">
                  <div className="mb-1.25 h-1.5 w-4/5 rounded bg-slate-200" />
                  <div className="h-1.25 w-1/2 rounded bg-slate-100" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <SectionEyebrow className="mb-3.5">One card, full context</SectionEyebrow>
          <h2 className="mb-4.5 text-[34px] leading-[1.12] font-extrabold tracking-[-0.03em] text-slate-900">
            Keep every detail on the card
          </h2>
          <p className="mb-6 max-w-110 text-base leading-[1.65] text-slate-600">
            Checklists, attachments, due dates, and discussion live together —
            so nothing gets lost in scattered docs and chat threads.
          </p>
          <div className="flex flex-col gap-3.5">
            {HIGHLIGHTS.map((highlight) => (
              <div key={highlight} className="flex items-center gap-3">
                <span className="flex size-6.5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-green-600">
                  <Check className="size-3.75" strokeWidth={3} />
                </span>
                <span className="text-[14.5px] font-semibold text-slate-700">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
