-- AlterTable
ALTER TABLE "Admin" ADD COLUMN "fees" REAL;

-- CreateTable
CREATE TABLE "StudentProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fatherName" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "parentContact" TEXT NOT NULL,
    "parentAltContact" TEXT,
    "dateOfBirth" DATETIME NOT NULL,
    "imageUrl" TEXT,
    "studentId" INTEGER NOT NULL,
    CONSTRAINT "StudentProfile_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Marks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "semester" INTEGER NOT NULL,
    "score" REAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "addedDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Marks_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Marks_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Fees" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "academicYear" TEXT NOT NULL,
    "amount" REAL NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "classId" INTEGER NOT NULL,
    "dateJoined" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("classId", "firstName", "id", "lastName") SELECT "classId", "firstName", "id", "lastName" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_classId_key" ON "Student"("classId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_studentId_key" ON "StudentProfile"("studentId");
