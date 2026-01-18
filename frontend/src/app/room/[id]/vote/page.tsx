import VotingNavBar from "@/components/VotingNavBar";
import VotingChat from "@/components/VotingChat";
import VotingCenter from "@/components/VotingCenter";
import VotingRightPanel from "@/components/VotingRightPanel";

export default function page() {
  return (
    <div className="min-h-screen bg-[rgb(15,21,23)]">
      <VotingNavBar />

      <div className="flex flex-col-reverse gap-8 lg:flex-row lg:gap-0">
        <VotingChat />
        <VotingCenter />
        <VotingRightPanel />
      </div>
    </div>
  );
}
