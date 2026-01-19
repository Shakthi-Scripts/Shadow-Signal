"use client";

import { useEffect, useState } from "react";
import api from "@/libs/api";

export default function BottomBar() {
  const [activeRoomsCount, setActiveRoomsCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchActiveRoomCount = async () => {
      const result = await api.getActiveRoomCount();
      if (result.success && result.count !== undefined) {
        setActiveRoomsCount(result.count);
      }
    };

    fetchActiveRoomCount();
  }, []);

  const displayCount = activeRoomsCount !== null 
    ? activeRoomsCount.toLocaleString() 
    : "---";

  return (
    <div className="mx-auto mt-10 max-w-6xl px-6">
      <div className="rounded-lg border border-emerald-400/20 bg-emerald-950/40 px-6 py-3 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs tracking-widest text-white/60">
          <div className="flex gap-6">
            <span>
              LAT: <span className="text-[rgb(0,209,174)]">35.6895° N</span>
            </span>
            <span>
              LONG: <span className="text-[rgb(0,209,174)]">139.6917° E</span>
            </span>
            <span>
              ACTIVE SIGNALS:{" "}
              <span className="text-[rgb(0,209,174)]">{displayCount}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-white/50 uppercase">Transmission Stable</span>
            <div className="h-2 w-28 overflow-hidden rounded-full bg-black/40">
              <div className="h-full w-4/5 bg-[rgb(0,209,174)] shadow-[0_0_10px_rgba(0,209,174,0.8)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
