import { getGroupById } from "@/lib/data/groups";
import { CreditsLeaderboard } from "./credits-leaderboard";

interface GamificationOutletProps {
  groupId: number;
}

export async function GamificationOutlet({ groupId }: GamificationOutletProps) {
  const group = await getGroupById(groupId);
  return (
    <div className="grid grid-cols-3">
      {group?.enableCreditGamification && (
        <CreditsLeaderboard groupId={groupId} />
      )}
    </div>
  );
}
