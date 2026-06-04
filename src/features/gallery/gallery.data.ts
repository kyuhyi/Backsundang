export interface GalleryImage {
  src: string;
  alt: string;
  /** 마소니 그리드에서 세로로 길게 표시할지 여부 */
  tall?: boolean;
}

/**
 * 갤러리 이미지 (샘플 — 플레이스홀더 SVG).
 * ▶ 실제 사진으로 교체하는 지점:
 *   /public/images/ 에 사진을 넣고 아래 src/alt 를 바꾸면 된다.
 */
export const galleryImages: GalleryImage[] = [
  { src: "/images/gallery-1.svg", alt: "백선당 정식 한 상", tall: true },
  { src: "/images/gallery-2.svg", alt: "직접 양념한 제육볶음" },
  { src: "/images/gallery-3.svg", alt: "구수한 된장찌개" },
  { src: "/images/gallery-4.svg", alt: "정갈하게 차려낸 반찬" },
  { src: "/images/gallery-5.svg", alt: "백선당 매장 전경", tall: true },
  { src: "/images/gallery-6.svg", alt: "갓 지은 가마솥밥" },
];
