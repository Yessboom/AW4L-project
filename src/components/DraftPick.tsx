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
    <div class="mds-pick-list-tile" style={{ '--mds-pick-tile-fade-delay': `${props.pick.pickNumber * 33}ms` }}>
      <div class="mds-pick-list-tile__number">
        <span class="mds-pick-list-tile__number-title">Pick</span>
        <span class="mds-pick-list-tile__number-digit">{props.pick.pickNumber}</span>
      </div>
      <div class="mds-pick-list-tile__team">
        <img
          src={`/teamLogos/${props.team.logo}`}
          alt={props.team.name}
          class="mds-pick-list-tile__icon"
          style={{ width: '35px', height: '35px' }}
        />
      </div>
      <span class="mds-team_name">{props.team.name}</span>

      <Show when={props.draftedPlayer} fallback={<div>No player drafted yet</div>}>
        <PlayerCard player={props.draftedPlayer as Player} />
      </Show>
    </div>
    
  );

}


return (
    <div
      class={`rt-tr rt-tr-highlight ${active(props.pick.pickNumber)} flex items-center cursor-pointer`}
      role="row"
      style="flex: 1 0 auto; min-width: 15px;"
    >
      <div class="rt-td rt-align-left flex items-center justify-center" role="cell" style="flex: 0 0 auto; min-width: 95px; width: 95px;">
        <div class="rt-td-inner">
          <div class="rt-text-content" style="display: inline;">
            <div style="line-height:12px"><span style="font-weight:bold;color:grey;font-size:10px">{props.pick.pickNumber}</span></div>
            {props.pick.pickRound && (
              <div style="line-height:10px"><span style="font-weight:bold;font-variant:small-caps;font-size:14px">{props.player.pickNumber}</span></div>
            )}
          </div>
        </div>
      </div>
      <div class="rt-td rt-align-center flex items-center justify-center" role="cell" style="flex: 0 0 auto; min-width: 42px; width: 42px;">
        <div class="rt-td-inner">
          <img src={props.player.schoolLogo} height="35px" width="35px" alt={props.player.school} />
        </div>
      </div>
      <div class="rt-td rt-align-center flex items-center justify-center" role="cell" style="flex: 0 0 auto; min-width: 52px; width: 52px;">
        <div class="rt-td-inner">
          <img src={props.player.playerImage} height="35px" alt={props.player.firstname} />
        </div>
      </div>
      <div class="rt-td rt-align-center flex items-center justify-center" role="cell" style="flex: 0 0 auto; min-width: 48px; width: 48px;">
        <div class="rt-td-inner">
          <div class="rt-text-content" style="display: inline;">
            <div style="line-height:12px"><span style="font-weight:bold;font-size:14px">{props.player.position}</span></div>
            <div style="line-height:10px"><span style="font-weight:bold;color:grey;font-variant:small-caps;font-size:10px">{props.player.year}</span></div>
          </div>
        </div>
      </div>
      <div class="rt-td rt-align-left flex items-center justify-center" role="cell" style="flex: 0 0 auto; min-width: 95px; width: 95px;">
        <div class="rt-td-inner">
          <div class="rt-text-content" style="display: inline;">
            <div style="line-height:12px"><span style="font-weight:bold;color:grey;font-size:10px">{props.player.firstname}</span></div>
            {props.player.lastname && (
              <div style="line-height:10px"><span style="font-weight:bold;font-variant:small-caps;font-size:14px">{props.player.lastname}</span></div>
            )}
          </div>
        </div>
      </div>

    </div>
  );