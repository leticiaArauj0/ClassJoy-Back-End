/*
  Warnings:

  - You are about to drop the column `bathroomAmout` on the `Diary` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Diary" DROP COLUMN "bathroomAmout",
ADD COLUMN     "bathroomAmount" INTEGER NOT NULL DEFAULT 0;
