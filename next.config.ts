import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 갤러리/VR 포스터에 신뢰된 자체 SVG 플레이스홀더를 사용하므로 허용.
    // 실제 사진(jpg/webp 등)으로 교체하면 이 옵션 없이도 정상 동작한다.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
