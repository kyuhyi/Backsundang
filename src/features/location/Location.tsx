"use client";

import { MapPin, Phone, Clock, Car, Train, Navigation } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import {
  businessHours,
  businessInfo,
  mapEmbedUrl,
  directionsUrl,
} from "./location.data";

export function Location() {
  return (
    <section id="location" className="scroll-mt-20 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Location"
          title="오시는 길"
          description="병점역에서 가까운 백선당으로 편하게 찾아오세요."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* 지도 */}
          <Reveal direction="right">
            <div className="relative h-full min-h-[320px] overflow-hidden rounded-2xl border border-gold/20 bg-charcoal">
              {mapEmbedUrl ? (
                <iframe
                  src={mapEmbedUrl}
                  title="백선당 위치 지도"
                  className="h-full min-h-[320px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                /* 지도 임베드 URL이 없을 때 약도 플레이스홀더 */
                <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-4 p-8 text-center">
                  <span className="inline-flex size-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                    <MapPin className="size-7" />
                  </span>
                  <p className="font-display text-lg text-cream">{site.name}</p>
                  <p className="max-w-xs font-serif text-sm text-taupe">
                    {site.address}
                  </p>
                  <Button asChild variant="outline" size="sm" className="mt-2">
                    <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                      <Navigation className="size-4" />
                      길찾기
                    </a>
                  </Button>
                  <p className="mt-2 text-xs text-taupe-dim">
                    * 지도 임베드 URL을 추가하면 실제 지도가 표시됩니다.
                  </p>
                </div>
              )}
            </div>
          </Reveal>

          {/* 정보 */}
          <Reveal direction="left">
            <div className="flex h-full flex-col gap-6 rounded-2xl border border-gold/15 bg-charcoal/50 p-8 sm:p-10">
              <InfoRow icon={Clock} title="영업시간">
                <ul className="space-y-1.5">
                  {businessHours.map((h) => (
                    <li
                      key={h.day}
                      className="flex justify-between gap-4 text-sm"
                    >
                      <span className={h.muted ? "text-taupe-dim" : "text-cream/90"}>
                        {h.day}
                      </span>
                      <span
                        className={
                          h.muted ? "text-taupe-dim" : "font-medium text-gold"
                        }
                      >
                        {h.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </InfoRow>

              <Divider />

              <InfoRow icon={MapPin} title="주소">
                <p className="text-sm text-cream/90">{site.address}</p>
              </InfoRow>

              <InfoRow icon={Train} title="대중교통">
                <p className="text-sm text-cream/90">{businessInfo.transport}</p>
              </InfoRow>

              <InfoRow icon={Car} title="주차">
                <p className="text-sm text-cream/90">{businessInfo.parking}</p>
              </InfoRow>

              <Divider />

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="flex-1">
                  <a href={site.phoneHref}>
                    <Phone className="size-4" />
                    {site.phone}
                  </a>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                    <Navigation className="size-4" />
                    길찾기
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-gold">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="mb-1.5 font-display text-base text-cream">{title}</h3>
        {children}
      </div>
    </div>
  );
}

function Divider() {
  return <span className="h-px w-full bg-gold/10" />;
}
