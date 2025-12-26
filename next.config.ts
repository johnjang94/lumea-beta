import withPWAInit from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const isPwaTest = process.env.NEXT_PUBLIC_PWA === "1";

const withPWA = withPWAInit({
  dest: "public",
  disable: !isPwaTest,
  register: true,
  workboxOptions: {
    skipWaiting: true,
    clientsClaim: true,
  },
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withPWA(nextConfig);
