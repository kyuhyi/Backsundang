export interface GalleryItem {
  /** 사진 자리 설명(실제 사진으로 교체 시 alt/캡션으로 사용) */
  label: string;
  /** 마소니 그리드에서 세로로 길게 표시할지 여부 */
  tall?: boolean;
  /** 실제 사진 경로(없으면 '사진 준비 중' 플레이스홀더 표시) */
  src?: string;
}

/**
 * 갤러리 항목.
 * ▶ 실제 사진으로 교체하는 지점:
 *   /public/images/ 에 사진을 넣고 각 항목에 src 를 추가하면
 *   플레이스홀더 대신 사진이 표시된다. (예: src: "/images/food-1.jpg")
 */
export const galleryItems: GalleryItem[] = [
  { label: "백선당 정식 한 상", tall: true },
  { label: "직접 양념한 제육볶음" },
  { label: "구수한 된장찌개" },
  { label: "정갈하게 차려낸 반찬" },
  { label: "백선당 매장 전경", tall: true },
  { label: "갓 지은 가마솥밥" },
];
