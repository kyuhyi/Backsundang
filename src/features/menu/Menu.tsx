"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { staggerItem } from "@/components/common/Reveal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { menuCategories } from "./menu.data";
import type { MenuItem } from "./types";

function formatPrice(price: number) {
  if (price === 0) return "무료";
  return `${price.toLocaleString("ko-KR")}원`;
}

function MenuRow({ item }: { item: MenuItem }) {
  return (
    <motion.li
      variants={staggerItem}
      className="group flex items-start justify-between gap-4 border-b border-gold/10 py-5 transition-colors last:border-0 hover:bg-gold/[0.03]"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-lg text-cream transition-colors group-hover:text-gold">
            {item.name}
          </h3>
          {item.signature && (
            <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 text-[0.65rem] font-medium tracking-wide text-gold">
              <Star className="size-3 fill-gold" />
              추천
            </span>
          )}
        </div>
        {item.desc && (
          <p className="mt-1.5 font-serif text-sm leading-relaxed text-taupe">
            {item.desc}
          </p>
        )}
      </div>
      <span className="shrink-0 whitespace-nowrap font-display text-base font-bold text-gold-gradient">
        {formatPrice(item.price)}
      </span>
    </motion.li>
  );
}

export function Menu() {
  return (
    <section
      id="menu"
      className="scroll-mt-20 bg-ink-soft py-24 sm:py-32"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow="Menu"
          title="백선당의 한 상"
          description="매일 신선한 재료로 정성껏 차려내는 백반과 단품 메뉴입니다. 기본 반찬은 무한 리필됩니다."
        />

        <div className="mt-14 flex flex-col items-center">
          <Tabs defaultValue={menuCategories[0].id} className="w-full">
            <div className="flex justify-center">
              <TabsList>
                {menuCategories.map((cat) => (
                  <TabsTrigger key={cat.id} value={cat.id}>
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {menuCategories.map((cat) => (
              <TabsContent key={cat.id} value={cat.id}>
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                  className="mx-auto max-w-3xl rounded-xl border border-gold/15 bg-charcoal/40 px-6 sm:px-10"
                >
                  {cat.items.map((item) => (
                    <MenuRow key={item.name} item={item} />
                  ))}
                </motion.ul>
              </TabsContent>
            ))}
          </Tabs>

          <p className="mt-8 text-center text-xs text-taupe-dim">
            * 가격은 샘플이며 실제 운영 시 변동될 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
