"use client";

import { useEffect, useState } from "react";
import { Menu, Phone } from "lucide-react";
import { motion } from "motion/react";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-gold/15 bg-ink/45 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.85)] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-ink/35"
          : "border-b border-transparent bg-gradient-to-b from-ink/70 to-transparent"
      )}
    >
      <nav
        className={cn(
          "container-x flex items-center justify-between transition-all duration-500",
          scrolled ? "h-16" : "h-20"
        )}
      >
        <a href="#top" aria-label="백선당 홈" className="shrink-0">
          <Logo showSub={false} className="scale-90" />
        </a>

        {/* 데스크탑 네비 */}
        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative font-sans text-sm tracking-wide text-cream/85 transition-colors hover:text-gold"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href={site.phoneHref}>
              <Phone className="size-4" />
              전화 예약
            </a>
          </Button>

          {/* 모바일 메뉴 */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="메뉴 열기"
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle>백선당 메뉴</SheetTitle>
              <ul className="mt-10 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <SheetClose asChild>
                      <a
                        href={link.href}
                        className="block border-b border-gold/10 py-4 font-display text-lg text-cream transition-colors hover:text-gold"
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  </li>
                ))}
              </ul>
              <SheetClose asChild>
                <Button asChild className="mt-8 w-full">
                  <a href={site.phoneHref}>
                    <Phone className="size-4" />
                    {site.phone}
                  </a>
                </Button>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
