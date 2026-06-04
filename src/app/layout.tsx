import type { Metadata } from "next";
import {
  Nanum_Myeongjo,
  Noto_Sans_KR,
  Gowun_Batang,
  Song_Myung,
} from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// 브랜드 워드마크용 — 전통 붓끝 감성의 명조 (한국풍 포인트)
const songmyung = Song_Myung({
  variable: "--font-songmyung",
  weight: ["400"],
  display: "swap",
});

// 제목용 — 전통 명조 감성
const myeongjo = Nanum_Myeongjo({
  variable: "--font-myeongjo",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
});

// 본문용 — 가독성 산세리프
const noto = Noto_Sans_KR({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

// 보조 — 부드러운 바탕체
const batang = Gowun_Batang({
  variable: "--font-batang",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "백선당 白善堂 · 병점역 백반 정식",
  description:
    "병점역에 새로 문을 연 백반 전문 식당 백선당. 정성으로 차린 한 상, 전통과 모던이 어우러진 한식을 즐기세요.",
  keywords: ["백선당", "병점역 맛집", "병점 백반", "백반 정식", "한정식", "병점역 식당"],
  openGraph: {
    title: "백선당 白善堂 · 병점역 백반 정식",
    description: "병점역, 정성으로 차린 백반 한 상.",
    type: "website",
    locale: "ko_KR",
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
      className={`${songmyung.variable} ${myeongjo.variable} ${noto.variable} ${batang.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-cream">
        <Navbar />
        <main className="w-full flex-1 overflow-x-clip">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
