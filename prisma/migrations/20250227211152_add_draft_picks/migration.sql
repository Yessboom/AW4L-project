/*
  Warnings:

  - You are about to drop the column `drafted` on the `Player` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "DraftPick" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "round" INTEGER NOT NULL,
    "pick" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "playerId" INTEGER,
    CONSTRAINT "DraftPick_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DraftPick_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "logo" TEXT
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "ranking" INTEGER NOT NULL,
    "school" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "schoolLogo" TEXT NOT NULL,
    "playerImage" TEXT NOT NULL,
    "year" TEXT NOT NULL
);
INSERT INTO "new_Player" ("firstname", "id", "lastname", "playerImage", "position", "ranking", "school", "schoolLogo", "year") SELECT "firstname", "id", "lastname", "playerImage", "position", "ranking", "school", "schoolLogo", "year" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "DraftPick_playerId_key" ON "DraftPick"("playerId");
