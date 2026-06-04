import { Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { SectionDivider } from "@/components/common/SectionDivider";
import { site } from "@/lib/site";
import { businessInfo } from "@/features/location/location.data";

export function Footer() {
  return (
    <footer className="border-t border-gold/15 bg-ink-soft">
      <div className="container-x flex flex-col items-center py-14 text-center">
        <Logo />
        <p className="mt-5 max-w-md font-serif text-sm leading-relaxed text-taupe">
          {site.tagline}
        </p>

        <SectionDivider className="my-8" />

        <div className="flex flex-col items-center gap-2 text-sm text-taupe">
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 transition-colors hover:text-gold"
          >
            <Phone className="size-4 text-gold" />
            {site.phone}
          </a>
          <span className="inline-flex items-center gap-2">
            <MapPin className="size-4 text-gold" />
            {site.address}
          </span>
        </div>

        <p className="mt-8 text-xs text-taupe-dim">
          상호 {site.name}({site.nameHanja}) · 사업자등록번호{" "}
          {businessInfo.bizNumber} · 대표 {businessInfo.owner}
        </p>
        <p className="mt-2 text-xs text-taupe-dim">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
