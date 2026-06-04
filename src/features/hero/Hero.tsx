"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // 패럴랙스: 스크롤 시 배경/콘텐츠가 다른 속도로 이동
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* 배경: 어두운 그라데이션 + 골드 글로우 (실제 매장 사진으로 교체 가능) */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,#1c160e_0%,#100c08_55%,#070605_100%)]" />
        {/* 따뜻한 상단 조명 글로우 */}
        <div className="absolute left-1/2 top-[8%] h-[55vh] w-[85vh] -translate-x-1/2 rounded-full bg-gold/12 blur-[140px]" />
        {/* 은은한 격자 텍스처 */}
        <div className="texture-grid absolute inset-0 opacity-[0.4]" />
        {/* 하단 비네팅 */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />
      </motion.div>

      {/* 떠다니는 골드 입자 */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        {[
          { l: "12%", t: "26%", s: 5, d: 0 },
          { l: "82%", t: "32%", s: 4, d: 1.2 },
          { l: "68%", t: "18%", s: 3, d: 0.6 },
          { l: "24%", t: "62%", s: 4, d: 2 },
          { l: "88%", t: "70%", s: 3, d: 1.6 },
          { l: "40%", t: "78%", s: 5, d: 0.4 },
        ].map((m, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-gold/60 blur-[1px]"
            style={{ left: m.l, top: m.t, width: m.s, height: m.s }}
            animate={{ y: [0, -22, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: m.d,
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="container-x relative z-10 flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.1 }}
        >
          {/* 브랜드 로고 (투명 배경) */}
          <Image
            src="/images/logo.png"
            alt="백선당 白善堂"
            width={300}
            height={300}
            priority
            className="h-auto w-44 drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)] sm:w-60 md:w-72"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.55 }}
          className="mt-10 font-display text-2xl font-bold leading-snug text-cream sm:text-4xl md:text-[2.75rem]"
        >
          {site.tagline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.7 }}
          className="mt-6 max-w-xl font-serif text-base leading-relaxed text-taupe sm:text-lg"
        >
          좋은 재료와 손맛으로 매일 새로 차려내는 집밥 같은 백반.
          <br className="hidden sm:block" />
          전통의 멋과 현대적인 감각이 어우러진 한 상을 만나보세요.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.85 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button asChild size="lg">
            <a href={site.phoneHref}>
              <Phone className="size-4" />
              전화 예약하기
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#location">
              <MapPin className="size-4" />
              오시는 길
            </a>
          </Button>
        </motion.div>
      </motion.div>

      {/* 스크롤 인디케이터 */}
      <motion.a
        href="#about"
        aria-label="아래로 스크롤"
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-gold/70"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="size-7" />
      </motion.a>
    </section>
  );
}
