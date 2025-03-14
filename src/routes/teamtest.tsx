import { createSignal, For, Show } from "solid-js";
import { createAsyncStore } from "@solidjs/router";
import { getPlayers, getDraftPicks, getTeams } from '~/lib/PlayerApi';
import PlayerCard from '~/components/PlayerCard';
import DraftButton from '~/components/buttons/DraftButton';
import { JSXElement } from "solid-js";
import TeamCard from "~/components/TeamCard";
import PickCard from "~/components/temp_draftpick";

export default function PlayersBigBoard() {
  const DraftPicks = createAsyncStore(() => getDraftPicks(), {
    initialValue: [],
  });

  const Teams = createAsyncStore(() => getTeams(), {
    initialValue: [],
  });

  const getTeamById = (teamId: number) => {
    return Teams().find(team => team.id === teamId);
  };

  return (
    <>        
    <h1>Picks</h1>

      <div class="flex flex-row items-center">
        <div class="player-picks">
          <For each={DraftPicks()}>
            {(pick) => {
            const teamname = getTeamById(pick.teamId);
              return (
                <div class="flex">
                  <PickCard
                    pick={{
                      pickNumber: pick.pick,
                      pickRound: pick.round,
                      pickTeamid: pick.teamId,
                    }}
                    team = {{
                        id: teamname?.id ?? 0,
                        name: teamname?.name ?? "Unknown",
                        logo: teamname?.logo ?? ""
                    }}

                  />
                </div>
              );
            }}
          </For>
        </div>
      </div>
    </>
  );
}
