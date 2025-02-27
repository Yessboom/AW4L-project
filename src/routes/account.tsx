import { A } from "@solidjs/router";
import Counter from "~/components/Counter";
import PlayersList from "~/components/PlayersAvailable";
import PlyrAv from "~/components/PlayerMove";
import PlayersAvailable from "~/components/PlayersAvailable";

export default function About() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">Wesh Page</h1>
      <PlayersList/>
      <PlayersAvailable/>
      <p class="mt-8">
        Visit{" "}
        <a href="https://solidjs.com" target="_blank" class="text-sky-600 hover:underline">
          solidjs.com
        </a>{" "}
        to learn how to build Solid apps.
      </p>
      <p class="my-4">
        <A href="/" class="text-sky-600 hover:underline">
          Home
        </A>
        {" - "}
        <span>About Page</span>
      </p>
    </main>
  );
}
