import { Hero } from "@/features/hero";
import { About } from "@/features/about";
import { Menu } from "@/features/menu";
import { Gallery } from "@/features/gallery";
import { VrTour } from "@/features/vr";
import { Location } from "@/features/location";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <VrTour />
      <Location />
    </>
  );
}
