/*
  Warnings:

  - You are about to drop the column `academicYear` on the `Fees` table. All the data in the column will be lost.
  - You are about to drop the column `semester` on the `Marks` table. All the data in the column will be lost.
  - Added the required column `semesterId` to the `Fees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Fees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semesterId` to the `Marks` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Semester" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "academicYear" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fees" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" REAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "semesterId" INTEGER NOT NULL,
    CONSTRAINT "Fees_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Fees_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Fees" ("amount", "id") SELECT "amount", "id" FROM "Fees";
DROP TABLE "Fees";
ALTER TABLE "new_Fees" RENAME TO "Fees";
CREATE TABLE "new_Marks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "score" REAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "semesterId" INTEGER NOT NULL,
    "addedDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Marks_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Marks_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Marks_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Marks" ("addedDate", "id", "score", "studentId", "subjectId") SELECT "addedDate", "id", "score", "studentId", "subjectId" FROM "Marks";
DROP TABLE "Marks";
ALTER TABLE "new_Marks" RENAME TO "Marks";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
