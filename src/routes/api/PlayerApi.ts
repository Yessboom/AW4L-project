import type {APIEvent} from '@solidjs/start/server'
import { PlayerDB } from '~/lib/PlayerDB'
import {getPlayers} from '~/lib/PlayerApi'




/*
export async function GET({ params }: APIEvent) {
  try {
    const players = await PlayerDB.player.findMany();
    return new Response(JSON.stringify(players), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching players:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch players' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
*/

export async function GET(event:APIEvent){
  return await getPlayers()
}




