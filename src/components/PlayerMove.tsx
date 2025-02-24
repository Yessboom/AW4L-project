import { createSignal } from "solid-js";
import PlayersAvailable from "./PlayersAvailable";
import PlayersDrafted from "./PlayersDrafted";

const initialPlayerDatabase = [
  {
    firstname: "Travis",
    lastname: "Hunter",
    ranking: 1,
    school: "Jackson State",
    position: "CB",
    schoolLogo: "https://a.espncdn.com/i/teamlogos/ncaa/500/38.png",
    playerImage: "https://www.nfldraftbuzz.com/Content/PlayerHeadShots/Travis-Hunter-CB-JacksonState.png",
    year: "JR.",
  },
  {
    firstname: "Not Travis",
    lastname: "Hunter",
    ranking: 1,
    school: "Jackson State",
    position: "CB",
    schoolLogo: "https://a.espncdn.com/i/teamlogos/ncaa/500/38.png",
    playerImage: "https://www.nfldraftbuzz.com/Content/PlayerHeadShots/Travis-Hunter-CB-JacksonState.png",
    year: "JR.",
  },
];

export default function PlyrAv() {
  const [availablePlayers, setAvailablePlayers] = createSignal(initialPlayerDatabase);
  const [draftedPlayers, setDraftedPlayers] = createSignal<Player[]>([]);

  interface Player {
    firstname: string;
    lastname?: string;
    ranking: number;
    school: string;
    position: string;
    schoolLogo: string;
    playerImage: string;
    year: string;
  }

  const handleDraft = (player: Player) => {
    setAvailablePlayers((prev) => prev.filter((p) => p.firstname !== player.firstname || p.lastname !== player.lastname));
    setDraftedPlayers((prev) => [...prev, player]);
  };

  return (
    <nav class="bg-sky-800">
      <div class="container flex flex-col items-center p-3 text-gray-200">
        <h2>Available Players</h2>
        <ul class="flex flex-col items-center w-full">
          {availablePlayers().map((player: Player) => (
            <PlayersAvailable
              key={`${player.firstname}-${player.lastname}`}
              {...player}
              onDraft={handleDraft}
            />
          ))}
        </ul>
        <h2>Drafted Players</h2>
        <ul class="flex flex-col items-center w-full">
          {draftedPlayers().map((player: Player) => (
            <PlayersDrafted
              key={`${player.firstname}-${player.lastname}`}
              {...player}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
}