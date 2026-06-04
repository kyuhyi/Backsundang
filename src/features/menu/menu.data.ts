import type { MenuCategory } from "./types";

/**
 * 백선당 메뉴 (샘플 데이터).
 * ▶ 실제 메뉴/가격으로 교체하는 지점 — 이 배열만 수정하면 화면에 반영된다.
 * price 단위: 원
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
    id: "danpum",
    label: "단품 · 식사",
    items: [
      { name: "된장찌개", price: 8000, desc: "두부와 애호박이 푸짐한 구수한 한 뚝배기" },
      { name: "김치찌개", price: 8000, desc: "푹 익은 묵은지와 돼지고기" },
      { name: "비빔밥", price: 9000, desc: "제철 나물과 고추장, 계란프라이" },
      { name: "잔치국수", price: 7000, desc: "멸치 육수에 말아낸 따뜻한 한 그릇" },
      { name: "공기밥 추가", price: 1000 },
    ],
  },
  {
    id: "banchan",
    label: "반찬 · 추가",
    items: [
      { name: "계란말이", price: 6000, desc: "도톰하게 부쳐낸 부드러운 계란말이" },
      { name: "잡채", price: 9000, desc: "당면과 채소를 볶아낸 정성 가득 잡채" },
      { name: "도토리묵무침", price: 8000, desc: "새콤달콤 양념의 쫄깃한 묵무침" },
      { name: "모둠전", price: 12000, desc: "동그랑땡·동태전·호박전 모둠" },
      { name: "반찬 리필", price: 0, desc: "기본 반찬은 무한 리필됩니다" },
    ],
  },
];
