import { ArrowRight } from "lucide-react";

import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar";
import { BlurFade } from "@/components/ui/blur-fade";
import { Container } from "@/components/container";
import { SectionEyebrow } from "@/app/_components/section-eyebrow";

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-17 border-y border-border bg-muted">
      <Container className="py-22">
        <div className="mb-13 text-center">
          <SectionEyebrow className="mx-auto">How it works</SectionEyebrow>
          <h2 className="text-4xl font-extrabold tracking-[-0.03em] text-foreground">
            Up and running in three steps
          </h2>
        </div>

        <div className="flex flex-col items-stretch gap-6 lg:flex-row">
          <BlurFade inView delay={0 * 0.1} className="flex-1">
            <StepCard number={1} title="Create a board">
              <p className="mb-4.5 text-[13.5px] leading-[1.55] text-muted-foreground">
                Start from scratch or a template. Name it and pick a color.
              </p>
              <div className="flex h-19.5 items-center justify-center rounded-md bg-gradient-to-br from-primary to-blue-500">
                <div className="flex h-11.5 w-32.5 items-center gap-2 rounded-md bg-card/90 px-3">
                  <span className="size-2.5 rounded-md bg-primary" />
                  <span className="h-1.75 w-15 rounded-md bg-muted-foreground/40" />
                </div>
              </div>
            </StepCard>
          </BlurFade>

          <StepArrow />

          <BlurFade inView delay={1 * 0.1} className="flex-1">
            <StepCard number={2} title="Add lists & cards">
              <p className="mb-4.5 text-[13.5px] leading-[1.55] text-muted-foreground">
                Break work into lists. Drop in cards with due dates and labels.
              </p>
              <div className="flex h-19.5 items-start gap-1.75 rounded-md bg-muted p-2.25">
                <div className="flex-1 rounded-md bg-card p-1.75 shadow-sm">
                  <div className="mb-1.25 h-1.25 w-6.5 rounded-md bg-emerald-400" />
                  <div className="h-1.25 w-4/5 rounded-md bg-muted-foreground/25" />
                </div>
                <div className="flex-1 rounded-md bg-card p-1.75 shadow-sm">
                  <div className="mb-1.25 h-1.25 w-6.5 rounded-md bg-sky-500" />
                  <div className="h-1.25 w-2/3 rounded-md bg-muted-foreground/25" />
                </div>
              </div>
            </StepCard>
          </BlurFade>

          <StepArrow />

          <BlurFade inView delay={2 * 0.1} className="flex-1">
            <StepCard number={3} title="Invite your team">
              <p className="mb-4.5 text-[13.5px] leading-[1.55] text-muted-foreground">
                Share the board and collaborate in real time, anywhere.
              </p>
              <div className="flex h-19.5 items-center justify-center rounded-md bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
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
                  <AvatarGroupCount className="size-8.5 bg-muted text-[11px] font-bold text-muted-foreground">
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
    <div className="h-full rounded-md border border-border bg-card p-7 shadow-xs">
      <div className="mb-4.5 flex items-center gap-3">
        <span className="flex size-9.5 shrink-0 items-center justify-center rounded-md bg-primary text-[17px] font-extrabold text-primary-foreground shadow-[0_3px_8px_--theme(--color-primary/30%)]">
          {number}
        </span>
        <h3 className="text-[17px] font-bold tracking-[-0.01em] text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function StepArrow() {
  return (
    <div className="hidden items-center text-muted-foreground/50 lg:flex">
      <ArrowRight className="size-6.5" strokeWidth={2.2} />
    </div>
  );
}
