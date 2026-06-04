/**
 * 오시는 길 · 영업 정보 (샘플 데이터).
 * ▶ 실제 정보로 교체하는 지점 — 영업시간, 지도 임베드, 사업자 정보 등.
 */

export const businessHours = [
  { day: "월요일 – 금요일", time: "10:00 – 21:00" },
  { day: "토요일 · 일요일", time: "10:00 – 21:30" },
  { day: "브레이크 타임", time: "15:00 – 17:00", muted: true },
  { day: "라스트 오더", time: "20:30", muted: true },
];

export const businessInfo = {
  owner: "홍길동", // TODO: 실제 대표자명
  bizNumber: "000-00-00000", // TODO: 실제 사업자등록번호
  parking: "건물 뒤편 전용 주차장 10대 (무료)",
  transport: "수도권 전철 1호선 병점역 2번 출구 도보 5분",
};

/**
 * 지도 임베드 URL.
 * ▶ 구글 지도 또는 카카오/네이버 지도의 '공유 > 지도 퍼가기(iframe)' URL을 넣으면 된다.
 *   값이 비어 있으면 약도 플레이스홀더가 표시된다.
 *   (예: 구글맵 "지도 공유 또는 삽입 > HTML 삽입"의 src 값)
 */
export const mapEmbedUrl = "";

/** 외부 지도 앱으로 연결되는 길찾기 링크 (네이버 지도 검색) */
export const directionsUrl = "https://map.naver.com/v5/search/병점역%20백선당";
