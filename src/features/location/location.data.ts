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
  owner: "백승재",
  bizNumber: "000-00-00000", // TODO: 실제 사업자등록번호
  parking: "건물 지하 주차장 이용",
  transport: "수도권 전철 1호선 병점역 2번 출구 도보 3분",
};

/**
 * 지도 임베드 URL.
 * ▶ 구글 지도 또는 카카오/네이버 지도의 '공유 > 지도 퍼가기(iframe)' URL을 넣으면 된다.
 *   값이 비어 있으면 약도 플레이스홀더가 표시된다.
 *   (예: 구글맵 "지도 공유 또는 삽입 > HTML 삽입"의 src 값)
 */
export const mapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3177.77585906111!2d127.03115000000001!3d37.2055529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b43004b2a92f3%3A0xfca7fda991c1a7ad!2z6rOo65Og7Iqk7YCY7Ja0MQ!5e0!3m2!1sko!2skr!4v1780613019079!5m2!1sko!2skr";

/** 외부 지도 앱으로 연결되는 길찾기 링크 (구글 지도 검색) */
export const directionsUrl =
  "https://www.google.com/maps/search/?api=1&query=병점+골든스퀘어+1차+백선당";
