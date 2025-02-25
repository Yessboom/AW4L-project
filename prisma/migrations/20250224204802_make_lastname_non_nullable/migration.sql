/*
  Warnings:

  - Made the column `lastname` on table `Player` required. This step will fail if there are existing NULL values in that column.

*/
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
    "year" TEXT NOT NULL,
    "drafted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Player" ("drafted", "firstname", "id", "lastname", "playerImage", "position", "ranking", "school", "schoolLogo", "year") SELECT "drafted", "firstname", "id", "lastname", "playerImage", "position", "ranking", "school", "schoolLogo", "year" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
