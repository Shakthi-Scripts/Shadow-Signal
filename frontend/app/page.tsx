import React from "react";
import LeftNavBar from "./components/LeftNavBar";
import SubHeading from "./components/SubHeading";
import JoinRoom from "./components/JoinRoom";
import CreateRoom from "./components/CreateRoom";
import BottomBar from "./components/BottomBar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-[rgb(15,35,32)] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-y-2 px-3 py-3 sm:px-4 md:flex-nowrap md:gap-y-0">
        <h2 className="text-xs font-bold whitespace-nowrap text-[rgb(0,209,174)] sm:text-sm md:text-lg lg:text-xl xl:text-2xl">
          SHADOW SIGNAL
        </h2>

        <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4 md:gap-6">
          <LeftNavBar value="PROTOCOL" />
          <LeftNavBar value="NODES" />
          <LeftNavBar value="SUPPORT" />

          <span className="relative inline-flex items-center gap-1.5 rounded-md border border-emerald-500/40 bg-emerald-950/60 px-3 py-1 text-[10px] font-semibold tracking-widest text-emerald-400 sm:text-xs">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            </span>
            ONLINE
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center gap-2 pt-10 sm:flex-row sm:justify-center sm:gap-4">
        <h1 className="text-6xl font-bold text-white italic sm:text-7xl xl:text-8xl">
          SHADOW
        </h1>
        <h1 className="text-6xl font-bold text-[rgb(0,209,174)] italic [text-shadow:0_0_8px_rgba(0,209,174,0.8)] sm:text-7xl xl:text-8xl">
          SIGNAL
        </h1>
      </div>

      <SubHeading />
      <div className="mx-auto mt-16 max-w-6xl px-6">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          <JoinRoom />
          <CreateRoom />
        </div>
      </div>
      <BottomBar />
      <div className="mx-auto max-w-6xl px-6 pb-10">
        <Footer />
      </div>
    </div>
  );
}
