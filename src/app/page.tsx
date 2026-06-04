import { Hero } from "@/features/hero";
import { About } from "@/features/about";
import { WeeklyMenu } from "@/features/weekly";
import { Menu } from "@/features/menu";
import { Gallery } from "@/features/gallery";
import { VrTour } from "@/features/vr";
import { Location } from "@/features/location";
import { getSiteData } from "@/lib/sheets";

export default async function Home() {
  // 구글시트(Apps Script) 연동 데이터 — 미설정 시 샘플로 폴백
  const { weekly, menu } = await getSiteData();

  return (
    <>
      <Hero />
      <About />
      <WeeklyMenu days={weekly} />
      <Menu categories={menu} />
      <Gallery />
      <VrTour />
      <Location />
    </>
  );
}
