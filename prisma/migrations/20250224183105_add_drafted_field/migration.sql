-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT,
    "ranking" INTEGER NOT NULL,
    "school" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "schoolLogo" TEXT NOT NULL,
    "playerImage" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "drafted" BOOLEAN NOT NULL DEFAULT false
);
