import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPageWithChrome } from "@/types/next-page";
import Top from "@/components/top-layer";
import Bottom from "@/components/bottom-layer";
import Image from "next/image";
import { useEffect, useState } from "react";

type AppPropsWithChrome = AppProps & {
  Component: NextPageWithChrome;
};

function BootSplash() {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#0B0B0C] text-white">
      <Image
        src="/mobile-logo.png"
        alt="Lumea"
        width={80}
        height={80}
        priority
      />
    </div>
  );
}

export default function App({ Component, pageProps }: AppPropsWithChrome) {
  const hideChrome = Component.hideChrome === true;
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("booted")) return;

    sessionStorage.setItem("booted", "1");

    let hideTimer: number | undefined;

    const showTimer = window.setTimeout(() => {
      setShowSplash(true);
      hideTimer = window.setTimeout(() => setShowSplash(false), 2000);
    }, 0);

    return () => {
      window.clearTimeout(showTimer);
      if (hideTimer) window.clearTimeout(hideTimer);
    };
  }, []);

  if (hideChrome) {
    return (
      <>
        {showSplash && <BootSplash />}
        <Component {...pageProps} />
      </>
    );
  }

  return (
    <>
      {showSplash && <BootSplash />}

      <div className="min-h-screen w-full bg-[#2B1F1A] flex justify-center">
        <div
          className="w-full min-w-90 max-w-200 flex flex-col p-2.5"
          style={{ backgroundColor: "var(--color-ivory)" }}
        >
          <Top />
          <main className="flex-1">
            <Component {...pageProps} />
          </main>
          <Bottom />
        </div>
      </div>
    </>
  );
}
