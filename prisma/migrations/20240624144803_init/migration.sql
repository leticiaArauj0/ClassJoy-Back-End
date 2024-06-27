/*
  Warnings:

  - The `startSleep` column on the `Diary` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `endSleep` column on the `Diary` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `departureTime` to the `Diary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entryTime` to the `Diary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Diary" ADD COLUMN     "departureTime" VARCHAR(8) NOT NULL,
ADD COLUMN     "entryTime" VARCHAR(8) NOT NULL,
ADD COLUMN     "notice" TEXT,
ADD COLUMN     "reminder" TEXT,
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "feeding" SET DEFAULT 'comeu',
ALTER COLUMN "sleep" SET DEFAULT false,
DROP COLUMN "startSleep",
ADD COLUMN     "startSleep" VARCHAR(8),
DROP COLUMN "endSleep",
ADD COLUMN     "endSleep" VARCHAR(8);
