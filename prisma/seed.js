import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  try {
    // Resolve the path to the JSON files
    const prospectfilePath = path.resolve('public/scrappedData/prospects.json');
    const teamfilePath = path.resolve('public/scrappedData/teams.json');
    const draftPickfilePath = path.resolve('public/scrappedData/draftPicks.json');

    // Read the JSON files
    const players = JSON.parse(fs.readFileSync(prospectfilePath, 'utf-8'));
    const teams = JSON.parse(fs.readFileSync(teamfilePath, 'utf-8'));
    const draftPicks = JSON.parse(fs.readFileSync(draftPickfilePath, 'utf-8'));

    const doUpdatePlayer = false;
    const doUpdateTeam = false;
    const doUpdateDraftPick = true;

    // Use a transaction to ensure all data is deleted and inserted correctly
    await prisma.$transaction(async (prisma) => {
      // Delete all existing records in the DraftPick table first
      if (doUpdateDraftPick) {
        await prisma.draftPick.deleteMany();
      }

      // Delete all existing records in the Player table
      if (doUpdatePlayer) {
        await prisma.player.deleteMany();
      }

      // Delete all existing records in the Team table
      if (doUpdateTeam) {
        await prisma.team.deleteMany();
      }

      // Insert new player data
      if (doUpdatePlayer) {
        for (const player of players) {
          await prisma.player.create({
            data: player,
          });
        }
      }

      // Insert new team data
      if (doUpdateTeam) {
        for (const team of teams) {
          await prisma.team.create({
            data: team,
          });
        }
      }


      // Insert new draft pick data
      if (doUpdateDraftPick) {
        for (const pick of draftPicks) {
          await prisma.draftPick.create({
            data: pick,
          });
        }
      }
    });



    console.log('Data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
