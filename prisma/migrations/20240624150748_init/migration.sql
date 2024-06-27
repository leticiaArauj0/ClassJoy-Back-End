/*
  Warnings:

  - You are about to drop the column `diaryId` on the `Student` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_diaryId_fkey";

-- DropIndex
DROP INDEX "Student_diaryId_key";

-- AlterTable
ALTER TABLE "Diary" ADD COLUMN     "studentId" INTEGER;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "diaryId";

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
