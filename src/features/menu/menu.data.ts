import type { MenuCategory } from "./types";

/**
 * 백선당 메뉴 (샘플 데이터 / 구글시트 폴백).
 * ▶ 실제 메뉴는 구글시트 "메뉴판" 탭에서 관리합니다(분류 = 탭).
 *   시트가 연결되면 이 데이터 대신 시트 값이 표시됩니다.
 * price 단위: 원 (0 또는 미입력 시 가격 미표시)
 */
export const menuCategories: MenuCategory[] = [
  {
    id: "jeongsik",
    label: "백반 정식",
    items: [
      {
        name: "백선당 정식",
        price: 12000,
        desc: "오늘의 국과 7가지 정갈한 반찬, 갓 지은 가마솥밥",
        signature: true,
      },
      {
        name: "제육 백반",
        price: 11000,
        desc: "직접 양념한 제육볶음과 반찬, 된장찌개 한 상",
        signature: true,
      },
      {
        name: "고등어구이 백반",
        price: 11000,
        desc: "노릇하게 구운 통통한 고등어와 집반찬",
      },
      {
        name: "청국장 정식",
        price: 10000,
        desc: "구수하게 끓여낸 청국장과 제철 나물 한 상",
      },
      {
        name: "불고기 정식",
        price: 13000,
        desc: "달큰한 양념 소불고기와 계절 반찬",
      },
    ],
  },
  {
    id: "dessert",
    label: "후식",
    items: [
      { name: "식혜", price: 2000, desc: "직접 띄운 시원하고 달큰한 전통 식혜" },
      { name: "수정과", price: 2000, desc: "곶감과 계피향 가득한 전통 음료" },
      { name: "제철 과일", price: 4000, desc: "그날그날 신선한 제철 과일 한 접시" },
      { name: "아이스 아메리카노", price: 2500 },
    ],
  },
  {
    id: "event",
    label: "이벤트",
    items: [
      {
        name: "오픈 기념 음료 1잔 무료",
        price: 0,
        desc: "방문 고객 전원 · 오픈 기념 한정",
        signature: true,
      },
      {
        name: "평일 점심 특선",
        price: 9000,
        desc: "평일 11:00–14:00 한정 백반 한 상",
      },
      {
        name: "단체 10인 이상 10% 할인",
        price: 0,
        desc: "예약 시 적용 · 단체석 구비",
      },
    ],
  },
];
