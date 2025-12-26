import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPageWithChrome } from "@/types/next-page";
import Top from "@/components/top-layer";
import Bottom from "@/components/bottom-layer";

type AppPropsWithChrome = AppProps & {
  Component: NextPageWithChrome;
};

export default function App({ Component, pageProps }: AppPropsWithChrome) {
  const hideChrome = Component.hideChrome === true;

  if (hideChrome) return <Component {...pageProps} />;

  return (
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
  );
}
