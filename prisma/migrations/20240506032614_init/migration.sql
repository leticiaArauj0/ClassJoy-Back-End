-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_parentsId_fkey";

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "parentsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_parentsId_fkey" FOREIGN KEY ("parentsId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
