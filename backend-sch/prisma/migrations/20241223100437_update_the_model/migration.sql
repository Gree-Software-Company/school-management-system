-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Subject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "dateAdded" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "teacherId" INTEGER,
    CONSTRAINT "Subject_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "TeachingStaff" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Subject" ("dateAdded", "id", "name", "teacherId") SELECT "dateAdded", "id", "name", "teacherId" FROM "Subject";
DROP TABLE "Subject";
ALTER TABLE "new_Subject" RENAME TO "Subject";
CREATE UNIQUE INDEX "Subject_name_key" ON "Subject"("name");
CREATE UNIQUE INDEX "Subject_teacherId_key" ON "Subject"("teacherId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
