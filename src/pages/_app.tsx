import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPageWithChrome } from "@/types/next-page";
import Top from "@/components/top-layer";
import Bottom from "@/components/bottom-layer";
import { useEffect, useState } from "react";

type AppPropsWithChrome = AppProps & {
  Component: NextPageWithChrome;
};

function BootSplash() {
  return (
    <div
      className="fixed inset-0 z-[9999] bg-cover bg-center"
      style={{ backgroundImage: "url(/mobile-logo.png)" }}
    />
  );
}

export default function App({ Component, pageProps }: AppPropsWithChrome) {
  const hideChrome = Component.hideChrome === true;
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const alreadyBooted = sessionStorage.getItem("booted") === "1";
    if (!alreadyBooted) sessionStorage.setItem("booted", "1");

    const t = window.setTimeout(
      () => setShowSplash(false),
      alreadyBooted ? 0 : 2000
    );

    return () => window.clearTimeout(t);
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
