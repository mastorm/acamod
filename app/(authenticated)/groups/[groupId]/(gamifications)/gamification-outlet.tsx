import { getGroupById } from "@/lib/data/groups";
import { CreditsLeaderboard } from "./credits-leaderboard";
import { GradesLeaderboard } from "./grades-leaderboard";
import { TimeLeaderboard } from "./time-leaderboard";

interface GamificationOutletProps {
  groupId: number;
}

export async function GamificationOutlet({ groupId }: GamificationOutletProps) {
  const group = await getGroupById(groupId);
  return (
    <div className="grid grid-cols-3 gap-3">
      {group?.enableCreditGamification && (
        <CreditsLeaderboard groupId={groupId} />
      )}
      {group?.enableBestGradesGamification && (
        <GradesLeaderboard groupId={groupId} />
      )}
      {group?.enableTimeSpentGamification && (
        <TimeLeaderboard groupId={groupId} />
      )}
    </div>
  );
}
