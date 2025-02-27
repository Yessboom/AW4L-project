import { createSignal, onMount } from 'solid-js';

type Player = {
  id: number;
  firstname: string;
  lastname?: string;
  ranking: number;
  school: string;
  position: string;
  schoolLogo: string;
  playerImage: string;
  year: string;
  drafted: boolean;
};

function PlayersList() {
  const [players, setPlayers] = createSignal<Player[]>([]);

  const fetchPlayers = async () => {
    try {
      console.log('Fetching players...');
      const response = await fetch('/api/players');
      if (!response.ok) {
        throw new Error('Failed to fetch players');
      }
      const playersData = await response.json();
      setPlayers(playersData);
      console.log('Players fetched:', playersData);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  onMount(() => {
    fetchPlayers();
  });

  const handleDraft = (player: Player) => {
    console.log('Drafted player:', player);
    // Add your draft logic here
  };

  return (
    <div>
      {players().map((player) => (
        <PlayersAvailable player={player} onDraft={handleDraft} />
      ))}
    </div>
  );
}

export default PlayersList;