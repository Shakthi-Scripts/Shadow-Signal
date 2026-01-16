import React from "react";
import LeftNavBar from "./components/LeftNavBar";
import SubHeading from "./components/SubHeading";
import JoinRoom from "./components/JoinRoom";
import CreateRoom from "./components/CreateRoom";
import BottomBar from "./components/BottomBar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen bg-[rgb(15,35,32)]">
      <div className="sticky top-0 z-50 flex h-18 justify-between border-b border-white/10 bg-emerald-950/40 p-5 backdrop-blur-md">
        <div>
          <h2 className="font-roboto text-xl font-bold text-[rgb(0,209,174)]">
            SHADOW SIGNAL
          </h2>
        </div>
        <div className="flex gap-5">
          <LeftNavBar value="PROTOCOL" />
          <LeftNavBar value="NODES" />
          <LeftNavBar value="SUPPORT" />

          <span className="relative inline-flex items-center gap-2 rounded-md border border-emerald-500/40 bg-emerald-950/60 px-4 py-2 text-sm font-semibold tracking-widest text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
            </span>
            ONLINE
          </span>
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-4 pt-10">
        <h1 className="shadow-black-200 text-8xl font-bold text-white italic">
          SHADOW
        </h1>
        <h1 className="text-8xl font-bold text-[rgb(0,209,174)] italic [text-shadow:0_0_8px_rgba(0,209,174,0.8)]">
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
