import { NextResponse } from "next/server";
import { getSiteData } from "@/lib/sheets";

// 항상 최신 시트 데이터를 반환 (클라이언트가 로드 시 호출 → 즉시 반영)
export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getSiteData(true);
  return NextResponse.json(data, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
