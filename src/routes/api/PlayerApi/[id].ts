import type { APIEvent } from '@solidjs/start/server';
import { PlayerDB } from '~/lib/PlayerDB';

// Handle GET /api/PlayerApi/:id
export async function GET({ params }: APIEvent) {
  const id = Number(params.id);
  console.log("Fetching player with ID:", id);

  const player = await PlayerDB.player.findUnique({
    where: { id },
  });

  if (!player) {
    return new Response(JSON.stringify({ error: "Player not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return { body: player };
}

// Handle PATCH /api/PlayerApi/:id
export async function PATCH({ params, request }: APIEvent) {
  const id = Number(params.id);
  console.log("Updating player with ID:", id);

  const { drafted } = await request.json();
  console.log("Drafted status:", drafted);

  const updatedPlayer = await PlayerDB.player.update({
    where: { id },
    data: { drafted },
  });

  console.log("Updated player:", updatedPlayer);
  return { body: updatedPlayer };
}