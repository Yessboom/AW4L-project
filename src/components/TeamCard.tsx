import { Show } from "solid-js";
import PlayerCard from './PlayerCard';
import { Player } from '../types';

interface Team {
  pickNumber: number;
  teamLogo: string;
  teamName: string;
}

interface TeamCardProps {
  team: Team;
  draftedPlayer?: Player; // If there is a drafted player
}

export default function TeamCard(props: TeamCardProps) {
  return (
    <div class="team-card flex items-center">
      <div class="pick-number">{props.team.pickNumber}</div>
      <img src={props.team.teamLogo} alt={props.team.teamName} class="team-logo" />
      <div class="team-name">{props.team.teamName}</div>
      <Show when={props.draftedPlayer} fallback={<div>No player drafted yet</div>}>
        <PlayerCard player={props.draftedPlayer as Player} />
      </Show>
    </div>
  );
}