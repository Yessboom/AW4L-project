import { z } from "zod";
import { PlayerDB } from './PlayerDB';
import {action, query} from '@solidjs/router'

const playerSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  ranking: z.number(),
  school: z.string(),
  position: z.string(),
  schoolLogo: z.string(),
  playerImage: z.string(),
  year: z.string(),
  drafted: z.boolean()
})



export const getPlayers = query(async()=>{
  "use server";
  return await PlayerDB.player.findMany()
  
}, "getPlayers")

export const getDraftedPlayers = query(async()=>{
  "use server";
  return await PlayerDB.player.findMany({where:{drafted:true}})
}, "getDraftedPlayers")

export const getAvailablePlayers = query(async()=>{
  "use server";
  return await PlayerDB.player.findMany({where:{drafted:false}})
}, "getAvailablePlayers")


export const draftPlayer = action(async (playerId: number) => {
  "use server";
  await PlayerDB.player.update({
    where: { id: playerId },
    data: { drafted: true },
  });
});