-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_classroomId_fkey";

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
