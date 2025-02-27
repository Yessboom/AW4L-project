import { createSignal } from "solid-js";

interface DraftButtonProps {
  playerId: number;
  onDraft: (playerId: number) => void;
}

export default function DraftButton(props: DraftButtonProps) {
  const [isDrafted, setIsDrafted] = createSignal(false);

  const handleDraft = () => {
    setIsDrafted(true);
    props.onDraft(props.playerId);
  };

  return (
    <button
      onClick={handleDraft}
      disabled={isDrafted()}
      class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
    >
      {isDrafted() ? "Drafted" : "Draft"}
    </button>
  );
}