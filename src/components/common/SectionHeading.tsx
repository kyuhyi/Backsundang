import { Reveal } from "./Reveal";
import { SectionDivider } from "./SectionDivider";
import { cn } from "@/lib/utils";

/**
 * 섹션 상단 공통 헤딩: 영문 부제 + 골드 디바이더 + 한글 제목.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      {eyebrow && (
        <Reveal direction="none" duration={0.6}>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-gold/80">
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal direction="up" delay={0.05}>
        <h2 className="font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl md:text-[2.75rem]">
          {title}
        </h2>
      </Reveal>
      <Reveal direction="none" delay={0.15}>
        <SectionDivider className="mt-6" />
      </Reveal>
      {description && (
        <Reveal direction="up" delay={0.2}>
          <p className="mt-6 max-w-2xl font-serif text-base leading-relaxed text-taupe sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
