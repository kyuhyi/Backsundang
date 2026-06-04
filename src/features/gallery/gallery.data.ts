export interface GalleryItem {
  /** 사진 캡션 */
  label: string;
  /** 마소니 그리드에서 세로로 길게 표시할지 여부 */
  tall?: boolean;
  /** 사진 경로(없으면 '사진 준비 중' 플레이스홀더 표시) */
  src?: string;
}

/**
 * 갤러리 항목.
 * ▶ 사진 교체: /public/images/ 의 파일을 바꾸거나 아래 src 경로를 수정하면 된다.
 */
export const galleryItems: GalleryItem[] = [
  { label: "백선당 정식 한 상", src: "/images/백선당 정식 한상.png", tall: true },
  { label: "직접 양념한 제육볶음", src: "/images/직접 양념한 제육볶음.png" },
  { label: "구수한 된장찌개", src: "/images/구수한 된장찌개.png" },
  { label: "정갈하게 차려낸 반찬", src: "/images/정갈하게 차려낸 반찬.png" },
  { label: "백선당 매장 전경", src: "/images/백선당 매장 전경.png", tall: true },
  { label: "갓 지은 가마솥밥", src: "/images/갓 지은 가마솥밥.png" },
];
