export interface MenuItem {
  name: string;
  price: number;
  desc?: string;
  /** 대표/추천 메뉴 표시 */
  signature?: boolean;
}

export interface MenuCategory {
  id: string;
  label: string;
  items: MenuItem[];
}
