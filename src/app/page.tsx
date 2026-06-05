import { Hero } from "@/features/hero";
import { About } from "@/features/about";
import { WeeklyMenu } from "@/features/weekly";
import { Menu } from "@/features/menu";
import { Gallery } from "@/features/gallery";
import { VrTour } from "@/features/vr";
import { Location } from "@/features/location";
import { Marquee } from "@/components/common/Marquee";
import { sampleWeeklyMenu } from "@/features/weekly/weekly.data";
import { menuCategories } from "@/features/menu/menu.data";

// 홈페이지는 순수 정적(HTML)으로 서빙한다.
// 시트(주간메뉴/메뉴) 최신값은 WeeklyMenu/Menu가 클라이언트에서
// /api/site-data 로 즉시 받아 갱신하므로 서버 fetch가 필요 없다.
// → ISR 프리렌더 캐시 경로를 피해 일부 인앱브라우저의 원시 텍스트 노출을 방지.
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <WeeklyMenu days={sampleWeeklyMenu} />
      <Menu categories={menuCategories} />
      <Gallery />
      <VrTour />
      <Marquee
        items={["예약 환영", "단체석 구비", "포장 가능", "병점역 2번 출구"]}
      />
      <Location />
    </>
  );
}
