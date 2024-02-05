import { CreditsLeaderboard } from "./credits-leaderboard";

interface GamificationOutletProps {
  groupId: number;
}

export function GamificationOutlet({ groupId }: GamificationOutletProps) {
  return (
    <div className="grid grid-cols-3">
      <CreditsLeaderboard groupId={groupId} />
    </div>
  );
}
