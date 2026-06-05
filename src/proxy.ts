import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * 일부 인앱 브라우저(카카오톡 등)가 Next.js App Router의
 * `Vary: RSC, Next-Router-State-Tree, ...` 응답 헤더를 잘못 처리해
 * 페이지를 렌더링하지 않고 헤더/원시 텍스트를 보여주는 문제가 있다.
 *
 * 이 사이트는 페이지 간 RSC 내비게이션(<Link>)을 쓰지 않고 앵커 링크만
 * 사용하므로, 문서 응답의 Vary 헤더를 안전하게 정규화한다.
 */
export function proxy(request: NextRequest) {
  const res = NextResponse.next();

  // RSC 프리패치 요청은 건드리지 않는다(혹시 모를 정상 동작 보존).
  const isRsc =
    request.headers.has("rsc") ||
    request.headers.has("next-router-prefetch") ||
    request.headers.has("next-router-state-tree");

  if (!isRsc) {
    res.headers.set("Vary", "Accept-Encoding");
  }
  return res;
}

export const config = {
  // 정적 자산/이미지/API/파일 확장자는 제외하고 문서 요청에만 적용
  matcher: [
    "/((?!_next/static|_next/image|api/|favicon.ico|.*\\.(?:png|jpe?g|gif|svg|webp|ico|css|js|woff2?|xml|txt|mp4)).*)",
  ],
};
