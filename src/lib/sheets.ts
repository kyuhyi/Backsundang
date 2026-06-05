import type { WeeklyDay } from "@/features/weekly/types";
import {
  sampleWeeklyMenu,
  WEEKDAY_LABEL,
  WEEKDAY_ORDER,
} from "@/features/weekly/weekly.data";
import type { MenuCategory } from "@/features/menu/types";
import { menuCategories as sampleMenu } from "@/features/menu/menu.data";

export interface SiteData {
  weekly: WeeklyDay[];
  menu: MenuCategory[];
  /** true 면 구글시트에서 받아온 실데이터, false 면 샘플 폴백 */
  fromSheet: boolean;
}

/**
 * 백선당 메뉴 관리 구글시트(Apps Script 웹앱) 기본 URL.
 * 공개 읽기 전용 엔드포인트라 코드에 포함해도 안전하다.
 * 운영 중 URL을 바꾸려면 Vercel 환경변수 `SHEETS_API_URL` 로 덮어쓰면 된다.
 */
const DEFAULT_SHEETS_API_URL =
  "https://script.google.com/macros/s/AKfycbxibbCKpo7eJXbTLszjV8uNSG8aVbTVIR-V5CNjlTkrgj_FPUFUf7H47CTEMvnDEUyHvA/exec";

/**
 * 구글시트(Apps Script 웹앱)에서 주간 메뉴와 메뉴판을 가져온다.
 *
 * - 기본적으로 위 DEFAULT_SHEETS_API_URL 에서 가져오며,
 *   환경변수 `SHEETS_API_URL` 가 있으면 그 값이 우선한다.
 * - fresh=false: 60초 ISR 캐시(서버 렌더 초기값용).
 *   fresh=true: 캐시 없이 항상 최신(클라이언트 /api/site-data 용).
 * - 4초 타임아웃 + URL 미설정/오류 시 샘플 데이터로 안전하게 폴백한다.
 */
export async function getSiteData(fresh = false): Promise<SiteData> {
  const url = process.env.SHEETS_API_URL || DEFAULT_SHEETS_API_URL;
  const fallback: SiteData = {
    weekly: sampleWeeklyMenu,
    menu: sampleMenu,
    fromSheet: false,
  };

  if (!url) return fallback;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(url, {
      signal: controller.signal,
      ...(fresh ? { cache: "no-store" } : { next: { revalidate: 60 } }),
    });
    clearTimeout(timer);
    if (!res.ok) return fallback;
    const raw = (await res.json()) as unknown;

    const weekly = normalizeWeekly(raw);
    const menu = normalizeMenu(raw);

    return {
      weekly: weekly.length ? weekly : sampleWeeklyMenu,
      menu: menu.length ? menu : sampleMenu,
      fromSheet: weekly.length > 0 || menu.length > 0,
    };
  } catch {
    return fallback;
  }
}

/* ─────────────────────────────────────────────
   Apps Script 응답 정규화
   기대 형식:
   {
     "weekly": [
       { "day": "mon", "title": "제육볶음 백반", "imageUrl": "...",
         "items": ["제육볶음", "된장찌개", ...], "price": 11000, "soldOut": false }
     ],
     "menu": [
       { "category": "백반 정식", "name": "백선당 정식", "price": 12000,
         "desc": "...", "signature": true }
     ]
   }
   items 는 배열 또는 줄바꿈/콤마로 구분된 문자열 모두 허용.
   ───────────────────────────────────────────── */

type Row = Record<string, unknown>;

function asRecord(v: unknown): Row {
  return v && typeof v === "object" ? (v as Row) : {};
}

function toItems(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean);
  if (typeof v === "string")
    return v
      .split(/[\n,·]/)
      .map((s) => s.trim())
      .filter(Boolean);
  return [];
}

function toNumber(v: unknown): number | undefined {
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const n = Number(v.replace(/[^\d.-]/g, ""));
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
}

function toBool(v: unknown): boolean {
  if (typeof v === "boolean") return v;
  if (typeof v === "string")
    return ["true", "y", "예", "품절", "1", "o"].includes(v.trim().toLowerCase());
  return false;
}

const DAY_ALIAS: Record<string, WeeklyDay["day"]> = {
  mon: "mon", 월: "mon", 월요일: "mon",
  tue: "tue", 화: "tue", 화요일: "tue",
  wed: "wed", 수: "wed", 수요일: "wed",
  thu: "thu", 목: "thu", 목요일: "thu",
  fri: "fri", 금: "fri", 금요일: "fri",
};

function normalizeWeekly(raw: unknown): WeeklyDay[] {
  const root = asRecord(raw);
  const list = Array.isArray(root.weekly) ? root.weekly : [];
  const byDay = new Map<WeeklyDay["day"], WeeklyDay>();

  for (const entry of list) {
    const r = asRecord(entry);
    const dayKey = String(r.day ?? r["요일"] ?? "").trim().toLowerCase();
    const day = DAY_ALIAS[dayKey] ?? DAY_ALIAS[String(r.day ?? r["요일"] ?? "")];
    if (!day) continue;

    byDay.set(day, {
      day,
      label: WEEKDAY_LABEL[day],
      date: (r.date ?? r["날짜"]) ? String(r.date ?? r["날짜"]).trim() : undefined,
      title: String(r.title ?? r["대표메뉴"] ?? r["메뉴"] ?? "").trim(),
      imageUrl: (r.imageUrl ?? r["이미지"] ?? r["이미지URL"])
        ? String(r.imageUrl ?? r["이미지"] ?? r["이미지URL"]).trim()
        : undefined,
      items: toItems(r.items ?? r["반찬"] ?? r["구성"]),
      price: toNumber(r.price ?? r["가격"]),
      soldOut: toBool(r.soldOut ?? r["품절"]),
    });
  }

  // 월~금 순서로 정렬, 시트에 없는 요일은 제외
  return WEEKDAY_ORDER.map((d) => byDay.get(d)).filter(
    (x): x is WeeklyDay => Boolean(x && x.title)
  );
}

function normalizeMenu(raw: unknown): MenuCategory[] {
  const root = asRecord(raw);
  const list = Array.isArray(root.menu) ? root.menu : [];
  const order: string[] = [];
  const byCat = new Map<string, MenuCategory>();

  for (const entry of list) {
    const r = asRecord(entry);
    const catLabel = String(r.category ?? r["분류"] ?? "기타").trim() || "기타";
    const name = String(r.name ?? r["메뉴명"] ?? r["메뉴"] ?? "").trim();
    if (!name) continue;

    if (!byCat.has(catLabel)) {
      order.push(catLabel);
      byCat.set(catLabel, {
        id: `cat-${order.length}`,
        label: catLabel,
        items: [],
      });
    }
    byCat.get(catLabel)!.items.push({
      name,
      price: toNumber(r.price ?? r["가격"]) ?? 0,
      desc: (r.desc ?? r["설명"]) ? String(r.desc ?? r["설명"]).trim() : undefined,
      signature: toBool(r.signature ?? r["추천"]),
    });
  }

  return order.map((c) => byCat.get(c)!);
}
