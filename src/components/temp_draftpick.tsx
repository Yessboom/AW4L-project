import { Show } from "solid-js";
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
  return (
    <div
      class={`rt-tr rt-tr-highlight ${props.pick.pickNumber} flex items-center cursor-pointer`}
      role="row"
      style="flex: 1 0 auto; min-width: 15px; border: 2px solid #ccc; padding: 10px; border-radius: 8px;"
    >
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
    </div>
  );
}
