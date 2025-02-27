import { createSignal, For, Show } from "solid-js";
import { createAsyncStore } from "@solidjs/router";
import { getAvailablePlayers } from '~/lib/PlayerApi';
import PlayerCard from '~/components/PlayersAvailable';

export default function PlayersBigBoard() {
  const players = createAsyncStore(() => getAvailablePlayers(), {
    initialValue: [],
  });

  const [draftedPlayers, setDraftedPlayers] = createSignal<number[]>([]);

  const handleDraft = (playerId: number) => {
    setDraftedPlayers([...draftedPlayers(), playerId]);
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
            <PlayerCard player={player} onDraft={handleDraft} />
          )}
        </For>
      </div>
      </h1>
      <h2>Drafted Players
      <div class="drafted-list">
        <For each={draftedPlayers()}>
          {(playerId) => (
              <PlayerCard
                player={players().find((player) => player.id === playerId)!}
                onDraft={handleDraft}
              />
          )}

        </For>
      </div>
      </h2>
    </div>
    </>

  );
}