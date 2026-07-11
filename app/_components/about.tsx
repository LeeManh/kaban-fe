import { Container } from "@/components/container";
import { NumberTicker } from "@/components/ui/number-ticker";
import { SectionEyebrow } from "@/app/_components/section-eyebrow";

const STATS = [
  { value: 2026, suffix: "", label: "Founded", static: true },
  { value: 18, suffix: "", label: "Team members" },
  { value: 40, suffix: "k+", label: "Teams using Kanvas" },
  { value: 100, suffix: "%", label: "Remote team" },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-17 border-y border-border bg-muted">
      <Container className="flex flex-col items-center gap-12 py-22 lg:flex-row lg:gap-16">
        <div className="min-w-0 flex-1">
          <SectionEyebrow className="mb-3.5">About Kanvas</SectionEyebrow>
          <h2 className="mb-4.5 text-[34px] leading-[1.12] font-extrabold tracking-[-0.03em] text-foreground">
            Built by a small team who hated messy task lists
          </h2>
          <p className="mb-5 max-w-120 text-base leading-[1.65] text-muted-foreground">
            Kanvas started as an internal tool to keep our own projects from falling apart. Today it
            helps teams of every size plan, track, and ship their work — without the overhead of
            heavier project management software.
          </p>
          <p className="max-w-120 text-base leading-[1.65] text-muted-foreground">
            We&apos;re an independent, product-led team focused on doing one thing well: making
            shared work feel organized.
          </p>
        </div>

        <div className="grid w-full max-w-100 shrink-0 grid-cols-2 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-md border border-border bg-card p-5.5 shadow-xs"
            >
              <div className="mb-1 text-[28px] font-extrabold tracking-[-0.02em] text-primary">
                {stat.static ? (
                  stat.value
                ) : (
                  <NumberTicker
                    value={stat.value}
                    className="text-[28px] font-extrabold tracking-[-0.02em] text-primary"
                  />
                )}
                {stat.suffix}
              </div>
              <div className="text-[13px] font-semibold text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
