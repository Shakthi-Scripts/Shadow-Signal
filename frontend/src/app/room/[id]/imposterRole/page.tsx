import RoleCurrentAssignment from "@/components/RoleCurrentAssignment";
import RoleFooter from "@/components/RoleFooter";
import RoleMainText from "@/components/RoleMainText";
import RoleNavBar from "@/components/RoleNavBar";
import RoleSecretCode from "@/components/RoleSecretCode";
import StartGameButton from "@/components/StartGameButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-[rgb(15,21,23)]">
      <RoleNavBar />

      <div className="flex pt-16">
        <RoleMainText />
      </div>

      <div className="mx-auto -mt-6 max-w-6xl px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          <RoleSecretCode
            word="WATER"
            wordColor="#dc2626"
            secretWord="IMPOSTER'S SECRET WORD"
          />

          <div className="flex w-full max-w-md flex-col">
            <RoleCurrentAssignment role="IMPOSTER" roleColor="#dc2626" />
            <StartGameButton />
          </div>
        </div>
        <RoleFooter />
      </div>
    </div>
  );
}
