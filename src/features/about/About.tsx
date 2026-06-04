"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal, Stagger, staggerItem } from "@/components/common/Reveal";
import { aboutStory, aboutValues } from "./about.data";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-24 sm:py-32">
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
            <motion.div
              key={v.title}
              variants={staggerItem}
              className="group flex flex-col items-center rounded-xl border border-gold/15 bg-charcoal/40 p-8 text-center transition-colors duration-300 hover:border-gold/40"
            >
              <span className="mb-5 inline-flex size-14 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold transition-transform duration-300 group-hover:scale-110">
                <v.icon className="size-6" />
              </span>
              <h3 className="font-display text-lg text-cream">{v.title}</h3>
              <p className="mt-3 font-serif text-sm leading-relaxed text-taupe">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
