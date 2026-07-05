import { ArrowRight } from "lucide-react";

import { Container } from "@/components/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Cta() {
  return (
    <section id="cta" className="bg-gradient-to-br from-blue-50 to-blue-100">
      <Container className="py-18 text-center">
        <h2 className="mb-3.5 text-[40px] font-extrabold tracking-[-0.03em] text-slate-900">
          Ready to get organized?
        </h2>
        <p className="mx-auto mb-7 max-w-120 text-[17px] leading-[1.6] text-[#475d85]">
          Join thousands of teams planning their best work on Kanvas. Free to
          start.
        </p>
        <a
          href="#"
          className={cn(
            buttonVariants({ size: "xl" }),
            "shadow-[0_6px_16px_--theme(--color-primary/35%)]"
          )}
        >
          Sign up free
          <ArrowRight className="size-4" />
        </a>
      </Container>
    </section>
  );
}
