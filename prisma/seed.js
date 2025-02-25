import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const players = [
    {
      firstname: "Travis",
      lastname: "Hunter",
      ranking: 1,
      school: "Jackson State",
      position: "CB",
      schoolLogo: "https://a.espncdn.com/i/teamlogos/ncaa/500/38.png",
      playerImage: "https://www.nfldraftbuzz.com/Content/PlayerHeadShots/Travis-Hunter-CB-JacksonState.png",
      year: "JR.",
    },
    {
      firstname: "Not Travis",
      lastname: "Hunter",
      ranking: 2,
      school: "Jackson State",
      position: "CB",
      schoolLogo: "https://a.espncdn.com/i/teamlogos/ncaa/500/38.png",
      playerImage: "https://www.nfldraftbuzz.com/Content/PlayerHeadShots/Travis-Hunter-CB-JacksonState.png",
      year: "JR.",
    },
  ];

  for (const player of players) {
    await prisma.player.create({
      data: player,
    });
  }

  console.log('Data seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });