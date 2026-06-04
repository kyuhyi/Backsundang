import { cn } from "@/lib/utils";

/**
 * 섹션 배경 장식 — 은은한 골드 글로우 오브 + 한지 텍스처.
 * 섹션을 relative 로 두고 그 안에 깔아 화면이 심심하지 않게 만든다.
 */
export function SectionGlow({
  className,
  texture = "hanji",
  position = "right",
}: {
  className?: string;
  texture?: "hanji" | "grid" | "none";
  position?: "left" | "right" | "center";
}) {
  const orbPos =
    position === "left"
      ? "left-[-10%] top-1/4"
      : position === "center"
        ? "left-1/2 top-0 -translate-x-1/2"
        : "right-[-10%] top-1/3";

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      {texture !== "none" && (
        <div
          className={cn(
            "absolute inset-0 opacity-60",
            texture === "hanji" ? "texture-hanji" : "texture-grid"
          )}
        />
      )}
      <div
        className={cn(
          "absolute h-[40vh] w-[40vh] rounded-full bg-gold/[0.07] blur-[110px]",
          orbPos
        )}
      />
    </div>
  );
}
