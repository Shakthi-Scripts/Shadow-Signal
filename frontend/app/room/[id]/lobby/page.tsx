import React from "react";
import LobbyNavBar from "../../../components/LobbyNavBar";
import LobbyLeftPanel from "@/app/components/LobbyLeftPanel";
import SelectMissionPanel from "@/app/components/SelectMissionPanel";
import LobbySystemLog from "@/app/components/LobbySystemLog";
import LobbyBroadcast from "@/app/components/LobbyBroadcast";
import LobbyFooter from "@/app/components/LobbyFooter";


export default function Home() {
  return (
    <div className="h-screen bg-[rgb(15,21,23)]">
      <LobbyNavBar />
      <div className="flex">
        <LobbyLeftPanel />
        <SelectMissionPanel />
        <LobbySystemLog />
      </div>
      <LobbyBroadcast />
      <LobbyFooter/>
    </div>

  );
}
