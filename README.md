# 백선당 白善堂 — 병점역 백반 식당 홈페이지

병점역에 새로 오픈한 백반 전문 식당 **백선당**의 브랜드 원페이지 웹사이트입니다.
무드보드(블랙 + 골드, 전통과 모던이 어우러진 한식 감성)를 그대로 반영했습니다.

## 기술 스택

| 영역 | 사용 기술 |
|---|---|
| 프레임워크 | Next.js 16 (App Router) + TypeScript |
| 스타일 | Tailwind CSS v4 + shadcn/ui 스타일 컴포넌트 |
| 애니메이션 | Motion (Framer Motion) — 스크롤 리빌·패럴랙스·스태거 |
| 아이콘 | lucide-react |
| 폰트 | Nanum Myeongjo(제목) · Noto Sans KR(본문) · Gowun Batang(보조) |
| 배포 | Vercel |

## 빠른 시작

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 프로덕션 빌드 (타입체크 포함)
npm run lint     # ESLint
```

## 폴더 구조 (기능별 격리)

각 섹션은 `src/features/<섹션>/` 아래에 **컴포넌트 + 데이터 + 타입**을 자급자족하게 두어,
한 섹션을 수정해도 다른 섹션에 영향을 주지 않고 의존성 충돌을 피합니다.

```
src/
  app/                    # layout, page(섹션 조립), globals(디자인 토큰)
  components/
    ui/                   # shadcn 스타일 프리미티브 (button, card, dialog, sheet, tabs)
    layout/               # Navbar, Footer
    common/               # Reveal(애니메이션), SectionDivider, SectionHeading, Logo
  features/
    hero/                 # 히어로 (패럴랙스)
    about/                # 소개 + 핵심 가치
    weekly/               # 주간 메뉴(월~금)        ← 구글시트 연동 / weekly.data.ts(폴백)
    menu/                 # 메뉴 (탭, 가격)         ← 구글시트 연동 / menu.data.ts(폴백)
    gallery/              # 갤러리 (라이트박스)      ← gallery.data.ts
    vr/                   # 360 / VR 투어 임베드     ← vr.data.ts
    location/             # 오시는 길 + 영업시간      ← location.data.ts
  lib/                    # site.ts(공통 정보), sheets.ts(구글시트 연동), utils.ts
apps-script/              # 구글시트 Apps Script 코드 + 연동 가이드
public/images/            # 플레이스홀더 이미지 (실제 사진으로 교체)
```

## 콘텐츠 교체 가이드

코드 수정 없이 **데이터 파일만 바꾸면** 화면에 반영됩니다.

| 바꿀 내용 | 파일 |
|---|---|
| 상호 · 전화번호 · 주소 · 태그라인 | `src/lib/site.ts` |
| **주간 메뉴(월~금) · 메뉴/가격** | **구글시트** (관리자 직접 수정 · 아래 참고) / 폴백: `weekly.data.ts`·`menu.data.ts` |
| 소개 문구 · 핵심 가치 | `src/features/about/about.data.ts` |
| 갤러리 사진 | `public/images/` 교체 + `src/features/gallery/gallery.data.ts` |
| 영업시간 · 사업자정보 · 지도 | `src/features/location/location.data.ts` |
| **VR / 360 투어 영상** | `src/features/vr/vr.data.ts` |

## 구글시트로 메뉴 관리 (관리자용)

관리자가 **코드를 만지지 않고 구글시트만 수정**하면 주간 메뉴·메뉴판이 자동 반영됩니다.
이미지도 시트에 링크만 넣으면 됩니다. 설정 방법은 **[`apps-script/README.md`](./apps-script/README.md)** 참고.

1. 구글시트에 `주간메뉴` / `메뉴판` 탭을 만든다 (양식은 가이드 참고)
2. `apps-script/Code.gs` 를 Apps Script 웹앱으로 배포한다
3. Vercel 환경변수 `SHEETS_API_URL` 에 웹앱 URL을 넣는다

이후 시트를 수정하면 재배포 없이 **최대 5분 내(ISR 재검증)** 사이트에 반영됩니다.
환경변수 미설정 시에는 샘플 데이터로 안전하게 표시됩니다.

### VR 투어 영상 넣기

직접 촬영·편집한 영상은 `src/features/vr/vr.data.ts` 한 곳만 수정하면 됩니다.

- `embedUrl` : 유튜브/비메오 임베드 URL 또는 자체 호스팅 360 투어 URL
  (예: `https://www.youtube.com/embed/영상ID`)
- `videoUrl` : mp4 파일을 직접 쓸 경우 (`/public` 경로 또는 외부 URL)
- `posterImage` : 재생 전 포스터 이미지

두 값이 모두 비어 있으면 “VR 투어 준비 중” 플레이스홀더가 표시됩니다.
360 파노라마 뷰어(pannellum 등)가 필요하면 해당 라이브러리만 추가 설치 후
`VrTour.tsx`에 렌더 분기를 더하면 됩니다. (기본 구현은 의존성 충돌 방지를 위해 iframe/video만 사용)

### 로고 교체

현재는 타이포그래피 임시 로고(`src/components/common/Logo.tsx`)입니다.
실제 로고 이미지를 받으면 `/public/images/logo.svg`(또는 png)를 추가하고
`Logo.tsx`의 주석 처리된 `<Image>` 블록을 활성화하면 됩니다.

## 디자인 토큰

`src/app/globals.css`의 `@theme`에 정의되어 있습니다.

| 토큰 | 용도 |
|---|---|
| `--color-ink` / `--color-ink-soft` | 메인 다크 배경 |
| `--color-charcoal` | 카드/세컨더리 배경 |
| `--color-gold` / `--color-gold-bright` / `--color-gold-deep` | 골드 포인트 |
| `--color-cream` | 본문 텍스트 |
| `--color-taupe` | 보조 텍스트/구분선 |

## Vercel 배포

이 저장소를 Vercel에 연결하면 Next.js를 자동 감지하여 추가 설정 없이 빌드·배포됩니다.

## Claude Code on the web 하네스

`.claude/hooks/session-start.sh` (SessionStart 훅)가 웹 세션 시작 시 `npm install`을 실행해
`npm run build` / `npm run lint`가 바로 동작하도록 보장합니다. 등록은 `.claude/settings.json`에 있습니다.
