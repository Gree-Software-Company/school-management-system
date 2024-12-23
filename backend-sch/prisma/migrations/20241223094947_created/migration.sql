/*
  Warnings:

  - You are about to drop the `TeachersOnSujects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TeachersOnSujects";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "TeacherOnSujects" (
    "teacherId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,

    PRIMARY KEY ("teacherId", "subjectId"),
    CONSTRAINT "TeacherOnSujects_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "TeachingStaff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TeacherOnSujects_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
