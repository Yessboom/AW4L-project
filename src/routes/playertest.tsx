import { createSignal, For, Show } from "solid-js";
import { createAsyncStore } from "@solidjs/router";
import { getAvailablePlayers } from '~/lib/PlayerApi';
import PlayerCard from '~/components/PlayersAvailable';
import DraftButton from '~/components/buttons/DraftButton';

export default function PlayersBigBoard() {
  const players = createAsyncStore(() => getAvailablePlayers(), {
    initialValue: [],
  });

  const [draftedPlayers, setDraftedPlayers] = createSignal<number[]>([]);

  const handleDraft = (playerId: number) => {
    setDraftedPlayers([...draftedPlayers(), playerId]);
  };

 

  const logPlayer = (playerId: number) => {
    console.log(`Player ${playerId} button clicked`);
  };

  const filtered = () =>
    players().filter((player) => !draftedPlayers().includes(player.id));

  return (
    <>
    <div class="flex flex-row items-center">
      <h1>Players
      <div class="player-list">
      <For each={filtered()}>
          {(player) => (
            <div class="flex">
              <PlayerCard player={player} />
              <DraftButton playerId={player.id} onDraft={handleDraft} />
            </div>
          )}
        </For>
      </div>
      </h1>
      <h2>Drafted Players
      <div class="drafted-list">
        <For each={draftedPlayers()}>
          {(playerId) => (
            <div class="flex">
              <PlayerCard
                player={players().find((player) => player.id === playerId)!}
              />
              <button onClick={() => logPlayer(playerId)}>Log Player</button>
            </div>
          )}

        </For>
      </div>
      </h2>
    </div>
    </>

  );
}