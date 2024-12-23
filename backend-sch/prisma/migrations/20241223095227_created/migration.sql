/*
  Warnings:

  - You are about to drop the `TeacherOnSujects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `qulifications` on the `Profile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Student_classId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TeacherOnSujects";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "TeacherOnSubjects" (
    "teacherId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,

    PRIMARY KEY ("teacherId", "subjectId"),
    CONSTRAINT "TeacherOnSubjects_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "TeachingStaff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TeacherOnSubjects_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imageUrl" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "qualifications" TEXT
);
INSERT INTO "new_Profile" ("firstName", "id", "imageUrl", "lastName") SELECT "firstName", "id", "imageUrl", "lastName" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
