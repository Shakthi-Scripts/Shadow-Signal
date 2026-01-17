"use client";
import InGameHeaderStatus from "@/app/components/InGameHeader";
import InGameNavBar from "@/app/components/InGameNavBar";
import InGameTacticalFeed from "@/app/components/InGameTacticalFeed";

export default function Home() {
  return (
    <div className="flex h-screen flex-col bg-[rgb(15,21,23)]">
      <InGameNavBar />

      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        <main className="flex flex-1 flex-col overflow-hidden">
          <InGameHeaderStatus />

          <div className="flex-1 overflow-y-auto px-4 sm:px-6">
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-4">
              <div className="lg:col-span-3"></div>
            </div>
          </div>
        </main>

        <InGameTacticalFeed />
      </div>
    </div>
  );
}
