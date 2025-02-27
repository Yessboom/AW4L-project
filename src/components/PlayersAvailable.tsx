// src/components/PlayerCard.jsx
import { createSignal } from "solid-js";
import { draftPlayer } from '~/lib/PlayerApi';


interface Player {
  ranking: number;
  schoolLogo: string;
  school: string;
  playerImage: string;
  firstname: string;
  lastname: string;
  position: string;
  year: string;
  drafted: boolean;
  id: number;
}

interface PlayerCardProps {
  player: Player;
  onDraft: (playerId: number) => void;
}

export default function PlayerCard(props: PlayerCardProps) {
  const [isDrafted, setIsDrafted] = createSignal(false);

  const active = (name: string): string => {
    return isDrafted() ? "drafted" : "";
  };

  const handleDraft = (): void => {
    setIsDrafted(true);
    props.onDraft(props.player.id);
    console.log(`Drafted player: ${props.player.firstname} ${props.player.lastname}`);
  };
  return (
    <div
      class={`rt-tr rt-tr-highlight ${active(props.player.firstname)} flex items-center cursor-pointer`}
      role="row"
      style="flex: 1 0 auto; min-width: 915px;"
    >
      <div class="rt-td rt-align-center flex items-center justify-center" role="cell" style="flex: 0 0 auto; min-width: 38px; width: 38px;">
        <div class="rt-td-inner">{props.player.ranking}</div>
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
      <div class="rt-td rt-align-center flex items-center justify-center" role="cell" style="flex: 0 0 auto; min-width: 100px; width: 100px;">
        <button
          onClick={handleDraft}
          disabled={isDrafted()}
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          {isDrafted() ? "Drafted" : "Draft"}
        </button>
      </div>
    </div>
  );
}