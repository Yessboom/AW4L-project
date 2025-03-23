import { createSignal, For, Show, createEffect } from "solid-js";
import { createAsyncStore } from "@solidjs/router";
import { getPlayers, getDraftPicks, getTeams } from '~/lib/PlayerApi';
import PlayerCard from '~/components/PlayerCard';
import DraftButton from '~/components/buttons/DraftButton';
import PickCard from '~/components/temp_draftpick';

export default function DraftPage() {
  const players = createAsyncStore(() => getPlayers(), {
    initialValue: [],
  });

  const DraftPicks = createAsyncStore(() => getDraftPicks(), {
    initialValue: [],
  });

  const Teams = createAsyncStore(() => getTeams(), {
    initialValue: [],
  });

  // Track who has and hans't been drafted
  const [draftedPlayers, setDraftedPlayers] = createSignal<{playerId: number, pickId: number}[]>([]);
  
  // Get the next available pick
  const getNextAvailablePick = () => {
    const drafted = draftedPlayers();
    const draftedPickIds = drafted.map(dp => dp.pickId);
    
    return DraftPicks().find(pick => !draftedPickIds.includes(pick.id));
  };


  const handleDraft = (playerId: number) => {
    const nextPick = getNextAvailablePick();
    
    if (nextPick) {
        console.log(`Drafting player ${playerId} for pick ${nextPick.id}`);
      setDraftedPlayers([...draftedPlayers(), {
        playerId,
        pickId: nextPick.id
      }]);
    } else {
      console.log("All picks have been used!");
    }
  };


  const getTeamById = (teamId: number) => {
    return Teams().find(team => team.id === teamId);
  };

  // Filter available players (not yet drafted)
  const availablePlayers = () => {
    const drafted = draftedPlayers();
    const draftedPlayerIds = drafted.map(dp => dp.playerId);
    
    return players().filter(player => !draftedPlayerIds.includes(player.id));
  };

  // Get the player for a specific pick
  const getPlayerForPick = (pickId: number) => {
    const draftedPick = draftedPlayers().find(dp => dp.pickId === pickId);
    if (!draftedPick) return null;
    
    return players().find(player => player.id === draftedPick.playerId);
  };

  return (
    <div class="flex flex-row w-full h-full">
      {/* Left side - Available Players */}
      <div class="w-1/2 p-4 overflow-y-auto" style="max-height: 90vh;">
        <h1 class="text-xl font-bold mb-4">Available Players</h1>
        <div class="player-list space-y-2">
          <For each={availablePlayers()}>
            {(player) => (
              <div class="flex justify-between items-center">
                <PlayerCard player={player} />
                <DraftButton playerId={player.id} onDraft={handleDraft} />
              </div>
            )}
          </For>
        </div>
      </div>

      {/* Right side - Teams with Picks */}
      <div class="w-1/2 p-4 overflow-y-auto" style="max-height: 90vh;">
        <h1 class="text-xl font-bold mb-4">Draft Board</h1>
        <div class="space-y-4">
          <For each={DraftPicks()}>
            {(pick) => {
              const team = getTeamById(pick.teamId);
              const draftedPlayer = getPlayerForPick(pick.id);
              
              return (
                <div class="flex">
                  <PickCard
                    pick={{
                      pickNumber: pick.pick,
                      pickRound: pick.round,
                      pickTeamid: pick.teamId,
                    }}
                    team={{
                      id: team?.id ?? 0,
                      name: team?.name ?? "Unknown",
                      logo: team?.logo ?? ""
                    }}
                    draftedPlayer={draftedPlayer ?? undefined}
                  />
                  
                  {draftedPlayer && (
                    <div class="ml-2">
                      <PlayerCard player={draftedPlayer} />
                    </div>
                  )}
                </div>
              );
            }}
          </For>
        </div>
      </div>
    </div>
  );
}