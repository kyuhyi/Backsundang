"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Play, Box, Compass } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { vrTour } from "./vr.data";

export function VrTour() {
  const [playing, setPlaying] = useState(false);
  const hasEmbed = vrTour.embedUrl.length > 0;
  const hasVideo = vrTour.videoUrl.length > 0;
  const hasMedia = hasEmbed || hasVideo;

  return (
    <section id="vr" className="scroll-mt-20 bg-ink-soft py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="VR Tour · 360°"
          title="공간을 미리 거닐다"
          description={vrTour.description}
        />

        <Reveal className="mt-14" direction="up">
          <div className="relative mx-auto aspect-video w-full max-w-4xl overflow-hidden rounded-2xl border border-gold/25 bg-charcoal shadow-[0_30px_80px_-40px_rgba(0,0,0,0.95)]">
            {/* 1) 임베드(iframe) — 직접 촬영·편집한 360/VR 영상 URL이 있을 때 */}
            {hasEmbed && playing ? (
              <iframe
                src={`${vrTour.embedUrl}${vrTour.embedUrl.includes("?") ? "&" : "?"}autoplay=1`}
                title={vrTour.title}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking"
                allowFullScreen
                className="h-full w-full"
              />
            ) : hasVideo && playing ? (
              <video
                src={vrTour.videoUrl}
                controls
                autoPlay
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              /* 2) 포스터 + 재생/준비중 오버레이 */
              <button
                type="button"
                onClick={() => hasMedia && setPlaying(true)}
                disabled={!hasMedia}
                className="group relative block h-full w-full focus:outline-none"
                aria-label={hasMedia ? "VR 투어 재생" : "VR 투어 준비 중"}
              >
                {vrTour.posterImage ? (
                  <Image
                    src={vrTour.posterImage}
                    alt={vrTour.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 896px"
                    className="object-cover opacity-70 transition-opacity duration-500 group-hover:opacity-85"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,#1c160e_0%,#0e0d0b_100%)]" />
                )}
                <div className="absolute inset-0 bg-ink/40" />

                {/* 회전하는 골드 링 + 중앙 아이콘 */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                  <span className="relative inline-flex size-20 items-center justify-center">
                    <motion.span
                      className="absolute inset-0 rounded-full border border-gold/40"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="absolute inset-2 rounded-full border border-gold/20" />
                    <span className="inline-flex size-14 items-center justify-center rounded-full bg-gold text-ink shadow-[0_0_40px_-6px_rgba(201,162,75,0.8)] transition-transform duration-300 group-hover:scale-110">
                      {hasMedia ? (
                        <Play className="size-6 translate-x-0.5 fill-ink" />
                      ) : (
                        <Compass className="size-6" />
                      )}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-ink/60 px-4 py-1.5 text-xs tracking-wide text-gold backdrop-blur">
                    <Box className="size-3.5" />
                    {hasMedia ? "360° 투어 재생" : "VR 투어 준비 중"}
                  </span>
                </div>
              </button>
            )}
          </div>
        </Reveal>

        {!hasMedia && (
          <p className="mt-6 text-center text-xs text-taupe-dim">
            * 직접 촬영·편집한 투어 영상은 곧 이 자리에 공개됩니다.
          </p>
        )}
      </div>
    </section>
  );
}
