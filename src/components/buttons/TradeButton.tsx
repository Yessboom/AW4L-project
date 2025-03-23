// src/components/buttons/TradeButton.tsx
import { createSignal } from "solid-js";

interface TradeButtonProps {
  pickId: number;
  onTrade: (pickId: number) => void;
  disabled?: boolean;
}

export default function TradeButton(props: TradeButtonProps) {
  const handleTrade = () => {
    props.onTrade(props.pickId);
  };

  return (
    <button
      onClick={handleTrade}
      class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      disabled={props.disabled}
    >
      Trade Pick
    </button>
  );
}