import { cn } from "@/lib/utils";

/**
 * 무드보드의 ❖ 장식 모티프를 본뜬 얇은 골드 디바이더.
 * 섹션 사이 또는 제목 아래 장식으로 사용한다.
 */
export function SectionDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center justify-center gap-3", className)}
      aria-hidden="true"
    >
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60 sm:w-20" />
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        className="text-gold"
      >
        <path
          d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"
          fill="currentColor"
          opacity="0.9"
        />
        <circle cx="12" cy="12" r="1.6" fill="var(--color-ink)" />
      </svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60 sm:w-20" />
    </div>
  );
}
