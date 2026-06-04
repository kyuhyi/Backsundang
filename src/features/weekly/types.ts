/** 하루치 주간 백반 메뉴 (월~금) */
export interface WeeklyDay {
  /** 요일 키: mon | tue | wed | thu | fri */
  day: "mon" | "tue" | "wed" | "thu" | "fri";
  /** 요일 표기 (예: 월요일) */
  label: string;
  /** 날짜 표기 (선택, 예: 6월 9일) */
  date?: string;
  /** 그날의 대표 백반 이름 */
  title: string;
  /** 대표 메뉴 사진 URL (구글시트의 이미지 링크 또는 /images 경로) */
  imageUrl?: string;
  /** 함께 나가는 반찬/구성 목록 */
  items: string[];
  /** 가격(원). 0 또는 미입력 시 가격 미표시 */
  price?: number;
  /** 품절 여부 */
  soldOut?: boolean;
}
