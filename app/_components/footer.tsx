import { Container } from "@/components/container";
import { Logo } from "@/components/logo";

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "#features", label: "Features" },
      { href: "#about", label: "About" },
      { href: "#", label: "Integrations" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#", label: "About" },
      { href: "#", label: "Blog" },
      { href: "#", label: "Careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "#", label: "Privacy" },
      { href: "#", label: "Terms" },
      { href: "#", label: "Security" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <Container className="flex flex-col justify-between gap-10 pt-12 pb-8 sm:flex-row">
        <div className="max-w-65">
          <Logo className="mb-3.5 dark:text-slate-100" />
          <p className="text-[13px] leading-[1.6] text-muted-foreground">
            Organize work the simple way. Boards, lists, and cards for teams
            of any size.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-18 gap-y-8">
          {FOOTER_COLUMNS.map((column) => (
            <FooterColumn key={column.title} {...column} />
          ))}
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="py-5 text-[12.5px] text-muted-foreground">
          © 2026 Kanvas, Inc. All rights reserved.
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <div className="mb-3.5 text-xs font-bold tracking-[0.05em] text-muted-foreground uppercase">
        {title}
      </div>
      <div className="flex flex-col gap-2.5">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-[13.5px] font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
