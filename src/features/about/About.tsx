"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SectionGlow } from "@/components/common/SectionGlow";
import { Reveal, Stagger, staggerItem } from "@/components/common/Reveal";
import { aboutStory, aboutValues } from "./about.data";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 py-24 sm:py-32">
      <SectionGlow position="right" texture="hanji" />
      <div className="container-x">
        <SectionHeading eyebrow={aboutStory.eyebrow} title={aboutStory.title} />

        <div className="mx-auto mt-14 max-w-2xl space-y-6 text-center">
          {aboutStory.paragraphs.map((p, i) => (
            <Reveal key={i} as="p" direction="up" delay={i * 0.1}>
              <span className="font-serif text-base leading-loose text-cream/85 sm:text-lg">
                {p}
              </span>
            </Reveal>
          ))}
        </div>

        <Stagger className="mt-20 grid gap-6 sm:grid-cols-3">
          {aboutValues.map((v) => (
            <motion.div key={v.title} variants={staggerItem} className="h-full">
              <div className="value-card relative isolate flex h-full flex-col items-center overflow-hidden rounded-xl border border-gold/15 bg-charcoal/40 p-8 text-center">
                {/* 메탈릭 표면 + 광택 */}
                <span aria-hidden="true" className="vc-metal pointer-events-none absolute inset-0 z-0" />
                <span aria-hidden="true" className="vc-glare pointer-events-none absolute inset-0 z-0" />

                <div className="relative z-10 flex flex-col items-center">
                  <span className="vc-icon mb-5 inline-flex size-14 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                    <v.icon className="size-6" />
                  </span>
                  <h3 className="vc-title font-display text-lg text-cream">
                    {v.title}
                  </h3>
                  <p className="vc-desc mt-3 font-serif text-sm leading-relaxed text-taupe">
                    {v.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
