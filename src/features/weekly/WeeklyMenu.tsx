"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarDays, UtensilsCrossed, MoveHorizontal } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SectionGlow } from "@/components/common/SectionGlow";
import { Reveal } from "@/components/common/Reveal";
import type { WeeklyDay } from "./types";
import { cn } from "@/lib/utils";

const JS_DAY_TO_KEY: Record<number, WeeklyDay["day"] | undefined> = {
  1: "mon",
  2: "tue",
  3: "wed",
  4: "thu",
  5: "fri",
};

function formatPrice(price?: number) {
  if (!price) return null;
  return `${price.toLocaleString("ko-KR")}원`;
}


export function WeeklyMenu({ days }: { days: WeeklyDay[] }) {
  const todayKey = JS_DAY_TO_KEY[new Date().getDay()];

  // 서버 초기값(days)로 시작하되, 로드 시 최신 시트값을 다시 받아 즉시 반영
  const [allDays, setAllDays] = useState<WeeklyDay[]>(days);
  useEffect(() => {
    let on = true;
    fetch("/api/site-data")
      .then((r) => r.json())
      .then((d) => {
        if (on && Array.isArray(d?.weekly) && d.weekly.length) setAllDays(d.weekly);
      })
      .catch(() => {});
    return () => {
      on = false;
    };
  }, []);

  const initial = useMemo(() => {
    if (todayKey && allDays.some((d) => d.day === todayKey)) return todayKey;
    return allDays[0]?.day;
  }, [allDays, todayKey]);

  const [active, setActive] = useState<WeeklyDay["day"] | undefined>(initial);
  // 데이터가 갱신됐는데 선택 요일이 없으면 보정
  const current =
    allDays.find((d) => d.day === active) ?? allDays.find((d) => d.day === initial) ?? allDays[0];

  if (!allDays.length) return null;

  return (
    <section id="weekly" className="relative scroll-mt-20 py-24 sm:py-32">
      <SectionGlow position="left" texture="grid" />
      {/* 빛이 도는 반짝이는 테두리 */}
      <div
        aria-hidden="true"
        className="shine-frame pointer-events-none absolute inset-3 z-0 sm:inset-6"
      />
      <div className="container-x">
        <SectionHeading
          eyebrow="Weekly Special · 주간 백반"
          title="이번 주 백반 한 상"
          description="월요일부터 금요일까지, 매일 바뀌는 정성 가득한 오늘의 백반을 만나보세요."
        />

        {/* 요일 선택 — 모바일에서 가로 스크롤(컨테이너 폭 내부에서만 스크롤) */}
        <Reveal className="mt-12" direction="none">
          <div className="w-full max-w-full overflow-x-auto pb-2 pt-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max min-w-full justify-start gap-2 sm:justify-center">
              {allDays.map((d) => {
                const isActive = d.day === active;
                const isToday = d.day === todayKey;
                return (
                  <button
                    key={d.day}
                    onClick={() => setActive(d.day)}
                    className={cn(
                      "relative flex min-w-[60px] shrink-0 flex-col items-center rounded-2xl border px-4 py-3 transition-all duration-300 sm:min-w-[64px] sm:px-5",
                      isActive
                        ? "border-gold/60 bg-gold/15"
                        : "border-gold/15 bg-charcoal/40 hover:border-gold/35"
                    )}
                  >
                    {isToday && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-2 py-0.5 text-[0.6rem] font-bold text-ink shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                        오늘
                      </span>
                    )}
                    <span
                      className={cn(
                        "font-display text-lg",
                        isActive ? "text-gold" : "text-cream/80"
                      )}
                    >
                      {d.label.replace("요일", "")}
                    </span>
                    {d.date && (
                      <span className="mt-0.5 text-[0.65rem] text-taupe-dim">
                        {d.date}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          {/* 모바일 좌우 스크롤 안내 */}
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[0.7rem] tracking-wide text-taupe-dim sm:hidden">
            <MoveHorizontal className="size-3.5 text-gold/70" />
            좌우로 넘겨 요일을 확인하세요
          </div>
        </Reveal>

        {/* 선택된 요일 카드 */}
        <div className="mx-auto mt-10 max-w-4xl">
          <AnimatePresence mode="wait">
            {current && (
              <motion.article
                key={current.day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid overflow-hidden rounded-2xl border border-gold/20 bg-charcoal/50 md:grid-cols-2"
              >
                {/* 이미지 */}
                <div className="relative aspect-[4/3] w-full bg-ink md:aspect-auto md:min-h-[340px]">
                  {current.imageUrl ? (
                    // 구글 이미지 CDN(lh3) URL — 빠르고 핫링크 가능. no-referrer로 안정 로드.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={current.imageUrl}
                      alt={current.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-3 bg-[radial-gradient(120%_120%_at_50%_0%,#211f1b_0%,#15130f_100%)]">
                      <span className="inline-flex size-14 items-center justify-center rounded-full border border-gold/25 bg-gold/5 text-gold/70">
                        <UtensilsCrossed className="size-6" />
                      </span>
                      <span className="text-[0.7rem] tracking-[0.3em] text-taupe-dim">
                        PHOTO COMING SOON
                      </span>
                    </div>
                  )}
                  {current.soldOut && (
                    <div className="absolute inset-0 flex items-center justify-center bg-ink/70">
                      <span className="rounded-full border border-gold/50 px-5 py-2 font-display text-lg text-gold">
                        오늘 준비 완료 · 품절
                      </span>
                    </div>
                  )}
                </div>

                {/* 구성 */}
                <div className="flex flex-col p-7 sm:p-9">
                  <div className="flex items-center gap-2 text-xs tracking-[0.25em] text-gold/80">
                    <CalendarDays className="size-4" />
                    {current.label}
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-bold text-cream sm:text-[1.7rem]">
                    {current.title}
                  </h3>

                  <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5">
                    {current.items.map((item, i) => (
                      <motion.li
                        key={`${current.day}-${i}`}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                        className="flex items-center gap-2 font-serif text-sm text-cream/85"
                      >
                        <span className="size-1.5 shrink-0 rounded-full bg-gold/70" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-end justify-between pt-7">
                    {formatPrice(current.price) ? (
                      <span className="font-display text-xl font-bold text-gold-gradient">
                        {formatPrice(current.price)}
                      </span>
                    ) : (
                      <span />
                    )}
                    <span className="text-xs text-taupe-dim">
                      반찬은 무한 리필됩니다
                    </span>
                  </div>
                </div>
              </motion.article>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
