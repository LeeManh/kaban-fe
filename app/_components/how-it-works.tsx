import { ArrowRight } from "lucide-react";

import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar";
import { BlurFade } from "@/components/ui/blur-fade";
import { Container } from "@/components/container";
import { SectionEyebrow } from "@/app/_components/section-eyebrow";

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-17 border-y border-slate-200 bg-slate-50">
      <Container className="py-22">
        <div className="mb-13 text-center">
          <SectionEyebrow className="mx-auto">How it works</SectionEyebrow>
          <h2 className="text-4xl font-extrabold tracking-[-0.03em] text-slate-900">
            Up and running in three steps
          </h2>
        </div>

        <div className="flex flex-col items-stretch gap-6 lg:flex-row">
          <BlurFade inView delay={0 * 0.1} className="flex-1">
            <StepCard number={1} title="Create a board">
              <p className="mb-4.5 text-[13.5px] leading-[1.55] text-slate-500">
                Start from scratch or a template. Name it and pick a color.
              </p>
              <div className="flex h-19.5 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-500">
                <div className="flex h-11.5 w-32.5 items-center gap-2 rounded-lg bg-white/90 px-3">
                  <span className="size-2.5 rounded-sm bg-primary" />
                  <span className="h-1.75 w-15 rounded-sm bg-slate-300" />
                </div>
              </div>
            </StepCard>
          </BlurFade>

          <StepArrow />

          <BlurFade inView delay={1 * 0.1} className="flex-1">
            <StepCard number={2} title="Add lists & cards">
              <p className="mb-4.5 text-[13.5px] leading-[1.55] text-slate-500">
                Break work into lists. Drop in cards with due dates and labels.
              </p>
              <div className="flex h-19.5 items-start gap-1.75 rounded-lg bg-slate-200 p-2.25">
                <div className="flex-1 rounded-md bg-white p-1.75 shadow-sm">
                  <div className="mb-1.25 h-1.25 w-6.5 rounded-sm bg-emerald-400" />
                  <div className="h-1.25 w-4/5 rounded-sm bg-slate-200" />
                </div>
                <div className="flex-1 rounded-md bg-white p-1.75 shadow-sm">
                  <div className="mb-1.25 h-1.25 w-6.5 rounded-sm bg-sky-500" />
                  <div className="h-1.25 w-2/3 rounded-sm bg-slate-200" />
                </div>
              </div>
            </StepCard>
          </BlurFade>

          <StepArrow />

          <BlurFade inView delay={2 * 0.1} className="flex-1">
            <StepCard number={3} title="Invite your team">
              <p className="mb-4.5 text-[13.5px] leading-[1.55] text-slate-500">
                Share the board and collaborate in real time, anywhere.
              </p>
              <div className="flex h-19.5 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
                <AvatarGroup>
                  <Avatar className="size-8.5">
                    <AvatarFallback className="bg-sky-500 text-[11px] font-bold text-white">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <Avatar className="size-8.5">
                    <AvatarFallback className="bg-green-500 text-[11px] font-bold text-white">
                      ML
                    </AvatarFallback>
                  </Avatar>
                  <Avatar className="size-8.5">
                    <AvatarFallback className="bg-orange-500 text-[11px] font-bold text-white">
                      SO
                    </AvatarFallback>
                  </Avatar>
                  <AvatarGroupCount className="size-8.5 bg-slate-100 text-[11px] font-bold text-slate-600">
                    +3
                  </AvatarGroupCount>
                </AvatarGroup>
              </div>
            </StepCard>
          </BlurFade>
        </div>
      </Container>
    </section>
  );
}

function StepCard({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="h-full rounded-[16px] border border-slate-200 bg-white p-7 shadow-xs">
      <div className="mb-4.5 flex items-center gap-3">
        <span className="flex size-9.5 shrink-0 items-center justify-center rounded-[11px] bg-primary text-[17px] font-extrabold text-primary-foreground shadow-[0_3px_8px_--theme(--color-primary/30%)]">
          {number}
        </span>
        <h3 className="text-[17px] font-bold tracking-[-0.01em] text-slate-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function StepArrow() {
  return (
    <div className="hidden items-center text-slate-300 lg:flex">
      <ArrowRight className="size-6.5" strokeWidth={2.2} />
    </div>
  );
}
