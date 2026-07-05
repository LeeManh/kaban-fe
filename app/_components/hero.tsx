import { ArrowRight, Check, Play } from "lucide-react";

import { Container } from "@/components/container";
import { BorderBeam } from "@/components/ui/border-beam";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-white">
      <div className="pointer-events-none absolute -top-30 -right-20 size-130 rounded-full bg-[radial-gradient(circle,--theme(--color-blue-500/18%),--theme(--color-blue-500/0%)_70%)]" />
      <div className="pointer-events-none absolute top-30 -left-35 size-105 rounded-full bg-[radial-gradient(circle,--theme(--color-purple-500/12%),--theme(--color-purple-500/0%)_70%)]" />

      <Container className="relative flex flex-col items-center gap-12 py-18 lg:flex-row lg:py-22">
        <div className="w-full max-w-120 shrink-0">
          <div className="mb-5.5 inline-flex items-center gap-1.75 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.25 text-xs font-bold text-primary">
            <span className="size-1.5 rounded-full bg-green-500" />
            Now with real-time collaboration
          </div>
          <h1 className="mb-4.5 text-4xl leading-[1.05] font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Organize work the simple way
          </h1>
          <p className="mb-7.5 max-w-108 text-[17px] leading-relaxed text-slate-600">
            Boards, lists, and cards that keep your whole team moving together — with real-time
            collaboration and zero clutter.
          </p>
          <div className="mb-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a
              href="#"
              className={cn(
                buttonVariants({ size: "xl" }),
                "shadow-[0_4px_12px_--theme(--color-primary/32%)]"
              )}
            >
              Get started free
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#"
              className={cn(buttonVariants({ variant: "outline", size: "xl" }))}
            >
              <Play className="size-4 fill-current" />
              Live demo
            </a>
          </div>
          <div className="flex items-center gap-1.75 text-[13px] font-medium text-slate-400">
            <Check className="size-3.75 text-green-500" />
            No credit card required
          </div>
        </div>

        <div
          className="hidden min-w-0 flex-1 lg:block"
          style={{ perspective: "1600px" }}
        >
          <div
            className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-[0_40px_80px_-20px_--theme(--color-blue-900/22%),0_8px_20px_--theme(--color-slate-900/10%)]"
            style={{ transform: "rotateY(-14deg) rotateX(5deg) rotate(1deg)" }}
          >
            <BorderBeam size={120} duration={8} colorFrom="#3b82f6" colorTo="#8b5cf6" />
            <div className="flex h-9.5 items-center gap-1.75 border-b border-slate-200 bg-white px-3.5">
              <span className="size-2.75 rounded-full bg-[#ff5f57]" />
              <span className="size-2.75 rounded-full bg-[#febc2e]" />
              <span className="size-2.75 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs font-bold text-slate-700">Product Roadmap</span>
            </div>
            <div className="flex items-start gap-2.75 p-4">
              <MockColumn title="In Progress" count={3} countClassName="bg-blue-100 text-primary">
                <MockCard labelColors={["bg-emerald-400"]} title="Build dashboard widgets">
                  <div className="mt-2 flex items-center justify-between">
                    <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">
                      Jun 28
                    </span>
                    <span className="flex size-4.5 items-center justify-center rounded-full bg-sky-500 text-[8px] font-bold text-white">
                      JD
                    </span>
                  </div>
                </MockCard>
                <MockCard labelColors={["bg-red-400", "bg-sky-500"]} title="Fix checkout crash" />
              </MockColumn>
              <MockColumn title="Review" count={1} countClassName="bg-slate-200 text-slate-600">
                <MockCard labelColors={["bg-violet-400"]} title="QA pass on mobile nav">
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-green-600">4/4</span>
                    <span className="flex size-4.5 items-center justify-center rounded-full bg-green-500 text-[8px] font-bold text-white">
                      ML
                    </span>
                  </div>
                </MockCard>
              </MockColumn>
              <MockColumn title="Done" count={2} countClassName="bg-green-100 text-green-600">
                <MockCard labelColors={["bg-emerald-400"]} title="Ship landing page" done />
              </MockColumn>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function MockColumn({
  title,
  count,
  countClassName,
  children,
}: {
  title: string;
  count: number;
  countClassName: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-42.5 shrink-0 rounded-xl bg-slate-200 p-2.25">
      <div className="flex items-center gap-1.75 px-1.25 pt-0.75 pb-2.25">
        <span className="text-xs font-bold text-slate-700">{title}</span>
        <span
          className={`flex size-4.5 min-w-4.5 items-center justify-center rounded-full text-[10px] font-bold ${countClassName}`}
        >
          {count}
        </span>
      </div>
      <div className="flex flex-col gap-1.75">{children}</div>
    </div>
  );
}

function MockCard({
  labelColors,
  title,
  done,
  children,
}: {
  labelColors: string[];
  title: string;
  done?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-lg bg-white p-2.25 shadow-sm">
      <div className="mb-1.75 flex gap-1">
        {labelColors.map((color, i) => (
          <span key={i} className={`h-1.5 w-7 rounded-sm ${color}`} />
        ))}
      </div>
      <div
        className={
          done
            ? "text-[11px] leading-snug font-medium text-slate-500 line-through decoration-slate-300"
            : "text-[11px] leading-snug font-medium text-slate-900"
        }
      >
        {title}
      </div>
      {children}
    </div>
  );
}
