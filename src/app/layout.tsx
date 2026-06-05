import type { Metadata } from "next";
import { Nanum_Myeongjo } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// 한글 웹폰트는 서브셋 파일이 수십 개라 초기 로딩이 무겁다.
// → 본문/보조는 시스템 한글 폰트(다운로드 0)를 쓰고,
//   제목/브랜드만 명조 웹폰트 1종을 preload 끄고(즉시 표시 후 교체) 사용한다.
const myeongjo = Nanum_Myeongjo({
  variable: "--font-myeongjo",
  subsets: ["latin"],
  weight: ["400", "800"],
  display: "swap",
  preload: false,
  fallback: ["AppleMyungjo", "Batang", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://baeksundang.vercel.app"),
  title: {
    default: "병점역 백선당 한식뷔페 · 정성을 담아 지은 밥",
    template: "%s | 병점역 백선당 한식뷔페",
  },
  description:
    "병점역 도보 3분, 백선당 한식뷔페. 매일 새로 짓는 정성스러운 밥과 정갈한 반찬, 매일 바뀌는 주간 백반을 합리적인 가격에 즐기세요.",
  keywords: [
    "백선당",
    "병점역 백선당",
    "병점역 한식뷔페",
    "병점 한식뷔페",
    "병점역 맛집",
    "병점 백반",
    "화성 한식뷔페",
    "병점역 점심",
    "한식뷔페",
  ],
  applicationName: "백선당",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://baeksundang.vercel.app",
    siteName: "백선당",
    title: "병점역 백선당 한식뷔페",
    description: "정성을 담아 지은 밥",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "병점역 백선당 한식뷔페 — 마음과 정성을 담은 한식뷔페",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "병점역 백선당 한식뷔페",
    description: "정성을 담아 지은 밥",
    images: ["/images/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    // 구글은 public/googlebec0a8865e04a094.html 파일로 인증.
    // 네이버는 파일 + 메타태그 이중 적용.
    other: {
      "naver-site-verification": "1bb2e5d4b6823760790877b6e3ffc831",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      style={{ backgroundColor: "#0e0d0b" }}
      className={`${myeongjo.variable} h-full antialiased`}
    >
      <body
        style={{ backgroundColor: "#0e0d0b" }}
        className="min-h-full flex flex-col bg-ink text-cream"
      >
        <Navbar />
        <main className="w-full flex-1 overflow-x-clip">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
