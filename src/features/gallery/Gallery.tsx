"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Camera } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SectionGlow } from "@/components/common/SectionGlow";
import { staggerItem } from "@/components/common/Reveal";
import { galleryItems } from "./gallery.data";
import { cn } from "@/lib/utils";

export function Gallery() {
  return (
    <section id="gallery" className="relative scroll-mt-20 py-24 sm:py-32">
      <SectionGlow position="center" texture="hanji" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Gallery"
          title="백선당의 순간들"
          description="정성껏 차린 음식과 따뜻한 공간을 사진으로 만나보세요."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="mt-14 grid auto-rows-[200px] grid-cols-2 gap-4 sm:auto-rows-[240px] lg:grid-cols-3"
        >
          {galleryItems.map((item, i) => (
            <motion.figure
              key={i}
              variants={staggerItem}
              className={cn(
                "gold-glow group relative overflow-hidden rounded-xl border border-gold/15 bg-charcoal/50 transition-shadow duration-300",
                item.tall && "row-span-2"
              )}
            >
              {item.src ? (
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                /* 사진 준비 중 — 깔끔한 플레이스홀더 */
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(120%_120%_at_50%_0%,#211f1b_0%,#15130f_100%)]">
                  <span className="inline-flex size-12 items-center justify-center rounded-full border border-gold/25 bg-gold/5 text-gold/70 transition-transform duration-300 group-hover:scale-110">
                    <Camera className="size-5" />
                  </span>
                  <span className="text-[0.7rem] tracking-[0.3em] text-taupe-dim">
                    PHOTO COMING SOON
                  </span>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <figcaption className="absolute bottom-4 left-4 right-4 font-display text-sm text-cream/90 drop-shadow">
                {item.label}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
