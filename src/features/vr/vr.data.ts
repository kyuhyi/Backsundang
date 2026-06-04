/**
 * VR / 360 매장 투어 설정.
 *
 * ▶ 직접 촬영·편집한 영상을 넣는 지점:
 *   - embedUrl  : 유튜브/비메오 임베드 URL 또는 자체 호스팅 360 투어 URL.
 *                 (예: "https://www.youtube.com/embed/VIDEO_ID")
 *                 값이 있으면 iframe 으로 자동 노출된다.
 *   - videoUrl  : embedUrl 대신 mp4 파일을 직접 넣을 경우 사용 (/public 경로 또는 외부 URL).
 *   - posterImage : 재생 전 보여줄 포스터 이미지.
 *
 *   embedUrl 과 videoUrl 둘 다 비어 있으면 "준비 중" 플레이스홀더가 표시된다.
 *
 *   ※ 360 파노라마 뷰어(예: pannellum, react-photo-sphere-viewer)가 필요하면
 *     해당 라이브러리를 별도 설치 후 VrTour.tsx 의 렌더 분기만 추가하면 된다.
 *     (의존성 충돌 방지를 위해 기본 구현은 iframe/video 만 사용한다.)
 */
export const vrTour = {
  embedUrl: "", // 예: "https://www.youtube.com/embed/XXXXXXXXXXX"
  videoUrl: "", // 예: "/videos/store-tour.mp4"
  posterImage: "/images/vr-interior.svg",
  title: "백선당 매장 VR 투어",
  description:
    "전통과 모던이 어우러진 백선당의 공간을 360°로 둘러보세요. 매장에서 직접 촬영한 투어 영상이 곧 공개됩니다.",
} as const;
