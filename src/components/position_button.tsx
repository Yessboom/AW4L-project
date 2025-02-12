import { JSXElement } from "solid-js";

type PositionButtonProps = {
  name: string;
  children: JSXElement;
};

function PositionButton(props: PositionButtonProps) {
  return (
    <li class="mx-1.5 sm:mx-3">
      <button 
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        {props.children}
      </button>
    </li>
  );
}

export default function Position() {
  return (
    <nav class="bg-sky-800 p-3">
      <ul class="flex flex-wrap w-full gap-2 justify-start">
        {/* First Row - Main Groups */}
        <div class="flex w-full justify-between">
          <PositionButton name="All">All</PositionButton>
          <PositionButton name="Off">Offense</PositionButton>
          <PositionButton name="Def">Defense</PositionButton>
          <PositionButton name="ST">Special Teams</PositionButton>
        </div>

        {/* Remaining Positions - 5 per row */}
        <div class="flex flex-wrap w-full gap-2 justify-start">
          <PositionButton name="QB">QB</PositionButton>
          <PositionButton name="RB">RB</PositionButton>
          <PositionButton name="WR">WR</PositionButton>
          <PositionButton name="TE">TE</PositionButton>
          <PositionButton name="OL">OL</PositionButton>
        </div>
        <div class="flex flex-wrap w-full gap-2 justify-start">

          <PositionButton name="DL">DL</PositionButton>
          <PositionButton name="LB">LB</PositionButton>
          <PositionButton name="DB">DB</PositionButton>
          <PositionButton name="K">K</PositionButton>
          <PositionButton name="P">P</PositionButton>
        </div>
      </ul>
    </nav>
  );
}
