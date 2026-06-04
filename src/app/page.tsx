import { Hero } from "@/features/hero";
import { About } from "@/features/about";
import { WeeklyMenu } from "@/features/weekly";
import { Menu } from "@/features/menu";
import { Gallery } from "@/features/gallery";
import { VrTour } from "@/features/vr";
import { Location } from "@/features/location";
import { Marquee } from "@/components/common/Marquee";
import { getSiteData } from "@/lib/sheets";

export default async function Home() {
  // 구글시트(Apps Script) 연동 데이터 — 미설정 시 샘플로 폴백
  const { weekly, menu } = await getSiteData();

  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <WeeklyMenu days={weekly} />
      <Menu categories={menu} />
      <Gallery />
      <VrTour />
      <Marquee
        items={["예약 환영", "단체석 구비", "포장 가능", "병점역 2번 출구"]}
      />
      <Location />
    </>
  );
}
