import { Menu } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how", label: "How it works" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <Container className="flex h-17 items-center gap-8">
        <Logo />
        <nav className="hidden flex-1 items-center justify-center gap-7.5 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-slate-600 transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-2.5 lg:flex">
          <Link href="/login" className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}>
            Log in
          </Link>
          <Link
            href="/register"
            className={cn(
              buttonVariants({ size: "lg" }),
              "shadow-[0_2px_5px_--theme(--color-primary/30%)]",
            )}
          >
            Sign up free
          </Link>
        </div>

        <Sheet>
          <SheetTrigger
            render={<Button variant="ghost" size="icon" className="ml-auto lg:hidden" />}
          >
            <Menu />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="p-6">
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <SheetClose
                  key={link.href}
                  nativeButton={false}
                  render={
                    <a
                      href={link.href}
                      className="rounded-md px-2.5 py-2.5 text-[15px] font-semibold text-slate-600 hover:bg-slate-50 hover:text-primary"
                    />
                  }
                >
                  {link.label}
                </SheetClose>
              ))}
            </nav>
            <div className="mt-2 flex flex-col gap-2.5">
              <SheetClose
                nativeButton={false}
                render={
                  <Link
                    href="/login"
                    className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
                  />
                }
              >
                Log in
              </SheetClose>
              <SheetClose
                nativeButton={false}
                render={
                  <Link
                    href="/register"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "shadow-[0_2px_5px_--theme(--color-primary/30%)]",
                    )}
                  />
                }
              >
                Sign up free
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}
