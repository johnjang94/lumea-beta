import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiBellAlert } from "react-icons/hi2";

export default function Top() {
  const [q, setQ] = useState("");
  return (
    <div className="flex items-center justify-between pt-[env(safe-area-inset-top)]">
      <div>
        <Link href="/">
          <Image
            src="/logo-bright.png"
            alt="Lumea Education logo"
            width={100}
            height={100}
          />
        </Link>
      </div>
      <div className="flex items-center w-5/6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search..."
          className="w-full border rounded px-3 py-2"
        />
        <button className="cursor-pointer p-3 text-black">
          <HiBellAlert size={24} aria-label="Notifications" />
        </button>
      </div>
    </div>
  );
}
