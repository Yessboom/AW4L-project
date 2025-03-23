import { Show, createMemo } from "solid-js";
import PlayerCard from './PlayerCard';
import { Player } from '../types';


interface Pick {
  pickNumber: number;
  pickRound: number;
  pickTeamid: number;
}

interface Team {
  id: number;
  name: string;
  logo: string;
}

interface PickCardProps {
  pick: Pick;
  team: Team;
  draftedPlayer?: Player; // If there is a drafted player
}

export default function PickCard(props: PickCardProps) {
  const draftedPlayer = createMemo(() => props.draftedPlayer); // Ensures reactivity

  return (
    <div
      class={`rt-tr rt-tr-highlight ${props.pick.pickNumber} flex flex-col cursor-pointer`}
      role="row"
      style="border: 2px solid #ccc; padding: 10px; border-radius: 8px; width: 100%;"
    >
      {/* Pick header with round, pick number and team */}
      <div class="flex items-center mb-2">
        <div class="rt-td rt-align-left flex items-center justify-center" role="cell" style="flex: 0 0 auto; min-width: 95px; width: 95px;">
          <div class="rt-td-inner">
            <div class="rt-text-content" style="display: inline;">
              <div style="line-height:12px"><span style="font-weight:bold;color:grey;font-size:10px">{`Round: ${props.pick.pickRound}`}</span></div>
              {props.pick.pickRound && (
                <div style="line-height:10px"><span style="font-weight:bold;font-variant:small-caps;font-size:14px">{`Pick: ${props.pick.pickNumber}`}</span></div>
              )}
            </div>
          </div>
        </div>
        <div class="rt-td rt-align-center flex items-center justify-center" role="cell" style="flex: 0 0 auto; min-width: 42px; width: 42px;">
          <div class="rt-td-inner">
            <img src={`/teamLogos/${props.team.logo}`} height="35px" width="35px" alt={props.team.name} loading="lazy" />
          </div>
        </div>
        <div class="flex-grow text-center">
          <span style="font-weight:bold;font-size:14px">{props.team.name}</span>
        </div>
      </div>

      {/* Player section - show PlayerCard or "Pick is incoming" message */}
      <div class="w-full">
        <Show when={draftedPlayer()} fallback={
          <div class="text-center py-4">
            <span style="font-weight:bold;font-size:14px;color:#666;">Pick is incoming</span>
          </div>
        }>
          <PlayerCard player={draftedPlayer()!} />
        </Show>
      </div>
    </div>
  );
}