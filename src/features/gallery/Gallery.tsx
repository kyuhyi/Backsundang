"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { staggerItem } from "@/components/common/Reveal";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { galleryImages } from "./gallery.data";
import { cn } from "@/lib/utils";

export function Gallery() {
  return (
    <section id="gallery" className="scroll-mt-20 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Gallery"
          title="백선당의 순간들"
          description="정성껏 차린 음식과 따뜻한 공간을 사진으로 만나보세요. 이미지를 누르면 크게 볼 수 있습니다."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="mt-14 grid auto-rows-[200px] grid-cols-2 gap-4 sm:auto-rows-[240px] lg:grid-cols-3"
        >
          {galleryImages.map((img, i) => (
            <Dialog key={i}>
              <DialogTrigger asChild>
                <motion.button
                  variants={staggerItem}
                  className={cn(
                    "group relative overflow-hidden rounded-xl border border-gold/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                    img.tall && "row-span-2"
                  )}
                  aria-label={`${img.alt} 크게 보기`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
                  <span className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full border border-gold/40 bg-ink/50 text-gold opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                    <Plus className="size-4" />
                  </span>
                  <span className="absolute bottom-4 left-4 font-display text-sm text-cream drop-shadow">
                    {img.alt}
                  </span>
                </motion.button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogTitle className="sr-only">{img.alt}</DialogTitle>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                  />
                </div>
                <p className="py-3 text-center font-display text-sm text-taupe">
                  {img.alt}
                </p>
              </DialogContent>
            </Dialog>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
