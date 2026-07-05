import { Lock, SquareCheckBig, Users } from "lucide-react";

import { Container } from "@/components/container";
import { BlurFade } from "@/components/ui/blur-fade";
import { SectionEyebrow } from "@/app/_components/section-eyebrow";

function KanbanIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="18" rx="1.5" />
      <rect x="14" y="3" width="7" height="11" rx="1.5" />
    </svg>
  );
}

const FEATURES = [
  {
    icon: KanbanIcon,
    iconClassName: "bg-blue-50 text-primary",
    title: "Drag & drop Kanban",
    description:
      "Move cards across lists effortlessly — your board updates in real time.",
  },
  {
    icon: Users,
    iconClassName: "bg-emerald-50 text-green-600",
    title: "Real-time collaboration",
    description:
      "See teammates' changes the moment they happen, no refresh needed.",
  },
  {
    icon: Lock,
    iconClassName: "bg-violet-50 text-violet-600",
    title: "Roles & permissions",
    description: "Control who can view or edit each board with granular roles.",
  },
  {
    icon: SquareCheckBig,
    iconClassName: "bg-orange-50 text-orange-600",
    title: "Checklists & attachments",
    description:
      "Keep everything about a task — files, steps, due dates — in one card.",
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-17 py-22">
      <Container>
        <div className="mb-12 text-center">
          <SectionEyebrow className="mx-auto">Features</SectionEyebrow>
          <h2 className="mb-3 text-4xl font-extrabold tracking-[-0.03em] text-slate-900">
            Everything your team needs to ship
          </h2>
          <p className="mx-auto max-w-130 text-base leading-relaxed text-slate-600">
            Powerful enough for complex projects, simple enough to start in
            seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <BlurFade key={feature.title} inView delay={index * 0.1}>
              <FeatureCard {...feature} />
            </BlurFade>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  iconClassName,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  iconClassName: string;
  title: string;
  description: string;
}) {
  return (
    <div className="h-full rounded-xl border border-slate-200 bg-white p-6 shadow-xs transition-all hover:-translate-y-0.75 hover:shadow-lg">
      <div
        className={`mb-4 flex size-11.5 items-center justify-center rounded-[12px] ${iconClassName}`}
      >
        <Icon className="size-5.5" />
      </div>
      <h3 className="mb-1.75 text-base font-bold tracking-[-0.01em] text-slate-900">
        {title}
      </h3>
      <p className="text-[13.5px] leading-[1.55] text-slate-500">
        {description}
      </p>
    </div>
  );
}
