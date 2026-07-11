"use client";

import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/container";
import { SectionEyebrow } from "@/app/_components/section-eyebrow";

const FAQS = [
  {
    q: "Is Kanvas free to use?",
    a: "Yes — Kanvas is free for individuals and small teams, with unlimited boards and cards. Paid plans add automation, admin controls, and priority support.",
  },
  {
    q: "Can I import boards from another tool?",
    a: "You can import boards and cards from most Trello-style exports (CSV or JSON) in a couple of clicks — labels, checklists, and due dates carry over.",
  },
  {
    q: "Does Kanvas support real-time collaboration?",
    a: "Yes — every board updates live as teammates move cards, comment, or edit checklists, so everyone always sees the same state.",
  },
  {
    q: "Is there a mobile app?",
    a: "Kanvas works great as a responsive web app on any device today. Native iOS and Android apps are on our roadmap.",
  },
  {
    q: "How is my data secured?",
    a: "All data is encrypted in transit and at rest. We run daily backups and never share your boards with third parties.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-17 py-22">
      <Container>
        <div className="mb-12 text-center">
          <SectionEyebrow className="mx-auto">FAQ</SectionEyebrow>
          <h2 className="text-4xl font-extrabold tracking-[-0.03em] text-foreground">
            Frequently asked questions
          </h2>
        </div>

        <Accordion
          value={openIndex !== null ? [openIndex] : []}
          onValueChange={(value) =>
            setOpenIndex(value.length ? (value[value.length - 1] as number) : null)
          }
          className="mx-auto max-w-180 gap-2.5"
        >
          {FAQS.map((faq, index) => (
            <AccordionItem
              key={faq.q}
              value={index}
              className="rounded-md border border-border bg-card px-5"
            >
              <AccordionTrigger className="py-4 text-[14.5px] font-medium text-foreground hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-[1.6] text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
