/*
  Warnings:

  - A unique constraint covering the columns `[diaryId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[planningId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "diaryId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "planningId" INTEGER;

-- CreateTable
CREATE TABLE "Diary" (
    "id" SERIAL NOT NULL,
    "createdat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" TIMESTAMP(3) NOT NULL,
    "feeding" TEXT NOT NULL DEFAULT 'comeu bem',
    "ateAlone" BOOLEAN NOT NULL DEFAULT true,
    "obsFeeding" TEXT,
    "sleep" BOOLEAN NOT NULL DEFAULT true,
    "startSleep" TIMESTAMP(3),
    "endSleep" TIMESTAMP(3),
    "obsSleep" TEXT,
    "bathroom" BOOLEAN NOT NULL DEFAULT false,
    "bathroomAmout" INTEGER NOT NULL DEFAULT 0,
    "obsBathroom" TEXT,

    CONSTRAINT "Diary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Planning" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "teacherName" TEXT,
    "ageGroup" TEXT,
    "bnccCod" INTEGER NOT NULL,
    "fieldExperience" TEXT NOT NULL,
    "objectives" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "teachingResources" TEXT NOT NULL,
    "teacherId" INTEGER NOT NULL,

    CONSTRAINT "Planning_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_diaryId_key" ON "Student"("diaryId");

-- CreateIndex
CREATE UNIQUE INDEX "User_planningId_key" ON "User"("planningId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_diaryId_fkey" FOREIGN KEY ("diaryId") REFERENCES "Diary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Planning" ADD CONSTRAINT "Planning_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
