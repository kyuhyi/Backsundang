import type { WeeklyDay } from "./types";

export const WEEKDAY_ORDER: WeeklyDay["day"][] = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
];

export const WEEKDAY_LABEL: Record<WeeklyDay["day"], string> = {
  mon: "월요일",
  tue: "화요일",
  wed: "수요일",
  thu: "목요일",
  fri: "금요일",
};

/**
 * 주간 메뉴 샘플 데이터 (구글시트 미연동 시 폴백).
 * ▶ 실제 운영은 구글시트 + Apps Script 로 관리자가 직접 수정합니다.
 *   (연동 방법: apps-script/README.md 참고)
 *   구글시트가 연동되면 이 데이터 대신 시트 값이 표시됩니다.
 */
export const sampleWeeklyMenu: WeeklyDay[] = [
  {
    day: "mon",
    label: "월요일",
    title: "제육볶음 백반",
    imageUrl: "/images/gallery-2.svg",
    items: ["제육볶음", "된장찌개", "계란말이", "시금치나물", "김치", "갓 지은 쌀밥"],
    price: 11000,
  },
  {
    day: "tue",
    label: "화요일",
    title: "고등어구이 백반",
    imageUrl: "/images/gallery-3.svg",
    items: ["고등어구이", "강된장", "도라지무침", "콩나물국", "김치", "갓 지은 쌀밥"],
    price: 11000,
  },
  {
    day: "wed",
    label: "수요일",
    title: "청국장 백반",
    imageUrl: "/images/gallery-1.svg",
    items: ["청국장", "제철나물 3종", "두부조림", "메추리알장조림", "김치", "갓 지은 쌀밥"],
    price: 10000,
  },
  {
    day: "thu",
    label: "목요일",
    title: "불고기 백반",
    imageUrl: "/images/gallery-4.svg",
    items: ["소불고기", "잡채", "미역국", "감자조림", "김치", "갓 지은 쌀밥"],
    price: 12000,
  },
  {
    day: "fri",
    label: "금요일",
    title: "생선조림 백반",
    imageUrl: "/images/gallery-6.svg",
    items: ["코다리조림", "호박전", "콩자반", "무생채", "김치", "갓 지은 쌀밥"],
    price: 12000,
  },
];
