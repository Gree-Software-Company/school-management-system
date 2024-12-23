/*
  Warnings:

  - You are about to drop the column `firstName` on the `NoneTeachingStaff` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `NoneTeachingStaff` table. All the data in the column will be lost.
  - You are about to drop the column `degree` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `Student` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NoneTeachingStaff" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profileId" INTEGER,
    CONSTRAINT "NoneTeachingStaff_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_NoneTeachingStaff" ("email", "id", "profileId", "role") SELECT "email", "id", "profileId", "role" FROM "NoneTeachingStaff";
DROP TABLE "NoneTeachingStaff";
ALTER TABLE "new_NoneTeachingStaff" RENAME TO "NoneTeachingStaff";
CREATE UNIQUE INDEX "NoneTeachingStaff_email_key" ON "NoneTeachingStaff"("email");
CREATE UNIQUE INDEX "NoneTeachingStaff_profileId_key" ON "NoneTeachingStaff"("profileId");
CREATE TABLE "new_Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imageUrl" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "qulifications" TEXT
);
INSERT INTO "new_Profile" ("id", "imageUrl") SELECT "id", "imageUrl" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE TABLE "new_Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "classId" INTEGER NOT NULL,
    CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("classId", "firstName", "id", "lastName") SELECT "classId", "firstName", "id", "lastName" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_classId_key" ON "Student"("classId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
