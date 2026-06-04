/**
 * 사이트 전역 공통 정보 (상호/연락처/네비게이션).
 * ▶ 실제 정보로 교체하는 지점 — 여기 값만 바꾸면 헤더·푸터·오시는길에 일괄 반영된다.
 * (영업시간·지도 등 상세 정보는 features/location/location.data.ts 참고)
 */
export const site = {
  name: "백선당",
  nameHanja: "白善堂",
  tagline: "병점역, 정성으로 차린 백반 한 상",
  phone: "031-000-0000", // TODO: 실제 번호로 교체
  phoneHref: "tel:031-000-0000",
  address: "경기도 화성시 병점동 OO-OO (병점역 도보 5분)", // TODO: 실제 주소
} as const;

export const navLinks = [
  { href: "#about", label: "소개" },
  { href: "#weekly", label: "주간메뉴" },
  { href: "#menu", label: "메뉴" },
  { href: "#gallery", label: "갤러리" },
  { href: "#vr", label: "VR 투어" },
  { href: "#location", label: "오시는 길" },
] as const;
