import { z } from "zod";
import { PlayerDB } from './PlayerDB';


export const playerSchema = z.object({
    id : z.number(),
    firstname: z.string(),
    lastname: z.string().optional(),
    ranking: z.number(),
    school: z.string(),
    position: z.string(),
    schoolLogo: z.string(),
    playerImage: z.string(),
    year: z.string(),
    drafted: z.boolean(),
});

export const savedPlayerSchema = playerSchema.extend({
  id: z.number(),
});

export type Player = z.infer<typeof playerSchema>;
export type SavedPlayer = z.infer<typeof savedPlayerSchema>;


export async function getPlayer() {
    const players = await PlayerDB.player.findMany();
    return players;
}

