import { cn } from "@/lib/utils";

/**
 * 백선당 임시 타이포그래피 로고.
 *
 * ▶ 차후 실제 로고 이미지로 교체하는 방법:
 *   1) /public/images/logo.svg (또는 .png) 파일을 추가하고
 *   2) 아래 주석 처리된 <Image> 블록을 활성화한 뒤 워드마크 부분을 제거하면 된다.
 *   (next/image 사용 시 import Image from "next/image")
 */
export function Logo({
  className,
  showSub = true,
}: {
  className?: string;
  showSub?: boolean;
}) {
  return (
    <span className={cn("inline-flex flex-col items-center leading-none", className)}>
      {/* 실제 로고 교체 지점 — 예시:
      <Image src="/images/logo.svg" alt="백선당" width={120} height={48} priority />
      */}
      <span className="font-[family-name:var(--font-brand)] text-2xl tracking-[0.18em] text-gold-gradient">
        백선당
      </span>
      {showSub && (
        <span className="mt-1 font-[family-name:var(--font-brand)] text-[0.6rem] tracking-[0.55em] text-taupe">
          白 善 堂
        </span>
      )}
    </span>
  );
}
