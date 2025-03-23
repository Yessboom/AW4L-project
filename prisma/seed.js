import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  try {
    // Resolve the path to the JSON file
    const filePath = path.resolve('public/scrappedData/prospects.json');

    // Read the JSON file
    const players = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Use a transaction to ensure all data is inserted correctly
    await prisma.$transaction(async (prisma) => {
      for (const player of players) {
        await prisma.player.create({
          data: player,
        });
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
