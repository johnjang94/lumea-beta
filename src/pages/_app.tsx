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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0B0B0C]">
      <Image
        src="/mobile-logo.png"
        alt="Lumea"
        width={600}
        height={600}
        priority
      />
    </div>
  );
}

export default function App({ Component, pageProps }: AppPropsWithChrome) {
  const hideChrome = Component.hideChrome === true;
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setShowSplash(false), 2000);
    return () => window.clearTimeout(t);
  }, []);

  const Page = <Component {...pageProps} />;

  if (hideChrome) {
    return (
      <>
        {showSplash && <BootSplash />}
        {Page}
      </>
    );
  }

  return (
    <>
      {showSplash && <BootSplash />}

      <div className="min-h-screen w-full bg-[#2B1F1A] flex justify-center">
        <div
          className="w-full min-w-90 max-w-200 flex flex-col"
          style={{ backgroundColor: "var(--color-ivory)" }}
        >
          <div className="p-2.5">
            <Top />
            <main className="pb-19">{Page}</main>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full min-w-90 max-w-200 z-50">
        <Bottom />
      </div>
    </>
  );
}
