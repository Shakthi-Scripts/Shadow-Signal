"use client";
import InGameEndTurnEarly from "@/components/InGameEndRound";
import InGameHeaderStatus from "@/components/InGameHeader";
import InGameNavBar from "@/components/InGameNavBar";
import InGamePlayerGrid from "@/components/InGamePlayerGrid";
import InGameSecretCard from "@/components/InGameSecretCard";
import InGameTacticalFeed from "@/components/InGameTacticalFeed";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[rgb(15,21,23)]">
      <InGameNavBar />

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <main className="relative flex min-h-0 flex-1 flex-col">
          <InGameHeaderStatus />

          <div className="min-h-0 flex-1">
            <InGamePlayerGrid />
          </div>

          <div className="mt-8 mb-6 flex flex-col items-center gap-4 px-6 lg:hidden">
            <InGameSecretCard word="BEACH" wordColor="#ffffff" />
            <InGameEndTurnEarly />
          </div>

          <div className="hidden items-end justify-between px-6 pb-6 lg:flex">
            <InGameSecretCard word="BEACH" wordColor="#ffffff" />
            <InGameEndTurnEarly />
          </div>
        </main>

        <InGameTacticalFeed />
      </div>
    </div>
  );
}
