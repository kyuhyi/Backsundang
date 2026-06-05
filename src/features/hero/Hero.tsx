"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { ChevronDown, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

// 스크롤 스크럽 프레임 시퀀스 (ffmpeg 추출 150프레임)
const FRAME_COUNT = 150;
const framePath = (i: number) =>
  `/images/hero-frames/frame-${String(i + 1).padStart(3, "0")}.jpg`;

// 스크롤 진행도 0~SCRUB_END 구간에서 프레임 재생, 이후 ~끝까지는 마지막 장면 홀드
const SCRUB_END = 0.82;

export function Hero() {
  const outerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastIndexRef = useRef(-1);
  const [loaded, setLoaded] = useState(0);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  const progressToIndex = (p: number) =>
    Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.round((p / SCRUB_END) * (FRAME_COUNT - 1)))
    );

  const draw = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = imagesRef.current[index];
    const ctx = canvas.getContext("2d");
    if (!ctx || !img || !img.complete || !img.naturalWidth) return;
    const cw = canvas.width;
    const ch = canvas.height;
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;
    let dw: number, dh: number, dx: number, dy: number;
    if (ir > cr) {
      dh = ch;
      dw = ch * ir;
      dx = (cw - dw) / 2;
      dy = 0;
    } else {
      dw = cw;
      dh = cw / ir;
      dx = 0;
      dy = (ch - dh) / 2;
    }
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  // 프레임 프리로드 — 초기 로드/페인트를 막지 않도록 idle 시점으로 미룬다.
  // (히어로 배경은 CSS로 첫 프레임을 즉시 보여주므로 지연돼도 빈 화면이 없다.)
  useEffect(() => {
    let cancelled = false;
    let count = 0;
    const imgs: HTMLImageElement[] = [];

    const startPreload = () => {
      if (cancelled) return;
      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new window.Image();
        img.src = framePath(i);
        const done = () => {
          if (cancelled) return;
          count += 1;
          setLoaded(count);
          if (i === 0) draw(progressToIndex(scrollYProgress.get()));
        };
        img.onload = done;
        img.onerror = done;
        imgs.push(img);
      }
      imagesRef.current = imgs;
    };

    // 페이지가 한가해진 뒤(또는 load 직후) 프레임을 받기 시작
    type RIC = (cb: () => void, opts?: { timeout: number }) => number;
    const ric: RIC =
      (window as unknown as { requestIdleCallback?: RIC }).requestIdleCallback ??
      ((cb) => window.setTimeout(cb, 400) as unknown as number);
    const start = () => ric(startPreload, { timeout: 1500 });
    let kicked = false;
    const kick = () => {
      if (kicked) return;
      kicked = true;
      start();
    };
    if (document.readyState === "complete") kick();
    else window.addEventListener("load", kick, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", kick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 캔버스 크기(뷰포트 + DPR) 및 리사이즈
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      lastIndexRef.current = -1;
      draw(progressToIndex(scrollYProgress.get()));
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 스크롤에 따라 프레임 갱신
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = progressToIndex(p);
    if (idx !== lastIndexRef.current) {
      lastIndexRef.current = idx;
      draw(idx);
    }
  });

  return (
    // 높이를 길게 잡아 고정(sticky) 상태에서 스크롤로 장면을 스크럽한다.
    // 420vh: 약 320vh 스크럽 + 100vh 뷰포트. SCRUB_END 이후 구간은 마지막 장면 홀드.
    <section ref={outerRef} id="top" className="relative h-[420vh]">
      <div
        className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden bg-ink bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-frames/frame-001.jpg')" }}
      >
        {/* 스크롤 스크럽 영상(캔버스) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 h-full w-full"
          aria-hidden="true"
        />

        {/* 가독성 스크림 (살짝 밝게) */}
        <div className="absolute inset-0 z-0 bg-ink/30" aria-hidden="true" />
        <div
          className="absolute inset-0 z-0 bg-[radial-gradient(100%_70%_at_50%_45%,rgba(10,9,8,0.28)_0%,rgba(10,9,8,0.05)_58%,rgba(10,9,8,0.6)_100%)]"
          aria-hidden="true"
        />

        {/* 콘텐츠 */}
        <div className="container-x relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.1 }}
          >
            <Image
              src="/images/logo.png"
              alt="백선당 白善堂"
              width={300}
              height={300}
              priority
              className="h-auto w-40 drop-shadow-[0_8px_30px_rgba(0,0,0,0.85)] sm:w-56 md:w-64"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.4 }}
            className="mt-8 font-display text-2xl font-bold leading-snug text-cream drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] sm:text-4xl md:text-[2.75rem]"
          >
            {site.tagline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.55 }}
            className="mt-6 max-w-xl font-serif text-base leading-relaxed text-cream/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] sm:text-lg"
          >
            좋은 재료와 손맛으로 매일 새로 차려내는 집밥 같은 백반.
            <br className="hidden sm:block" />
            전통의 멋과 현대적인 감각이 어우러진 한 상을 만나보세요.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.7 }}
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
        </div>

        {/* 로딩 인디케이터 */}
        {loaded < FRAME_COUNT && (
          <div className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2 text-[0.7rem] tracking-[0.2em] text-cream/50">
            장면 불러오는 중 {Math.round((loaded / FRAME_COUNT) * 100)}%
          </div>
        )}

        {/* 스크롤 인디케이터 */}
        <motion.div
          aria-hidden="true"
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-gold/70"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-7" />
        </motion.div>
      </div>
    </section>
  );
}
