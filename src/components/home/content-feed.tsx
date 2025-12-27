import Link from "next/link";
import { useMemo, useState } from "react";

export type VideoItem = {
  id: string;
  title: string;
  channel: string;
  category: string;
  thumb: string;
  src: string;
};

const CATEGORIES = [
  "ALL",
  "ACCOUNTING",
  "ADMINISTRATION",
  "DESIGN",
  "MARKETING",
  "SALES",
  "SOFTWARE",
] as const;

function CategoryPills({
  active,
  onChange,
}: {
  active: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="sticky top-14 z-40 bg-(--color-ivory)">
      <div className="flex gap-2 overflow-x-auto py-2 no-scrollbar">
        {CATEGORIES.map((c) => {
          const isOn = active === c;
          return (
            <button
              key={c}
              onClick={() => onChange(c)}
              className={[
                "shrink-0 rounded-full px-3 py-1 text-[11px] border",
                isOn ? "bg-black text-white border-black" : "bg-white/70",
              ].join(" ")}
            >
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TrendingHeader() {
  return (
    <div className="flex items-center gap-2 pt-2 pb-3">
      <span className="text-lg">📈</span>
      <h2 className="text-2xl font-semibold leading-none">Trending</h2>
    </div>
  );
}

function VideoCard({ v }: { v: VideoItem }) {
  return (
    <Link href={`/watch/${v.id}`} className="block">
      <div className="rounded-2xl bg-white">
        <div className="p-3">
          <div className="aspect-video w-full rounded-2xl bg-black/10 overflow-hidden" />
          <div className="mt-3 text-sm font-medium">{v.title}</div>
          <div className="mt-2 flex items-center justify-between text-xs opacity-80">
            <div className="flex items-center gap-2 min-w-0">
              <div className="h-6 w-6 rounded-full bg-black/10 shrink-0" />
              <div className="truncate">{v.channel}</div>
            </div>
            <div className="shrink-0">{v.category}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ContentFeed({ items }: { items: VideoItem[] }) {
  const [active, setActive] = useState("ALL");

  const filtered = useMemo(() => {
    if (active === "ALL") return items;
    return items.filter((v) => v.category === active);
  }, [active, items]);

  return (
    <div className="w-full">
      <CategoryPills active={active} onChange={setActive} />
      <TrendingHeader />

      <div className="space-y-4 pb-24">
        {filtered.map((v) => (
          <VideoCard key={v.id} v={v} />
        ))}
      </div>
    </div>
  );
}
