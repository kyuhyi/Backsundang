const DEFAULT_ITEMS = [
  "병점역 도보 5분",
  "매일 새로 짓는 가마솥밥",
  "정성으로 차린 백반 한 상",
  "반찬 무한 리필",
  "제철 신선 재료",
  "전통과 모던이 어우러진 공간",
];

/**
 * 골드 톤의 흐르는 리본(마퀴). 섹션 사이 장식 + 동적 요소.
 */
export function Marquee({ items = DEFAULT_ITEMS }: { items?: string[] }) {
  // 끊김 없는 루프를 위해 두 번 반복
  const loop = [...items, ...items];
  return (
    <div className="relative flex overflow-hidden border-y border-gold/15 bg-gradient-to-r from-charcoal/40 via-ink-soft to-charcoal/40 py-4">
      <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-display text-sm tracking-[0.2em] text-cream/80">
              {item}
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" className="text-gold">
              <path
                d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"
                fill="currentColor"
                opacity="0.85"
              />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
