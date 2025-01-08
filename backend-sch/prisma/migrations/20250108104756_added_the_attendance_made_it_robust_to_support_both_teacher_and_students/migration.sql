-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Attendace" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "signed_on" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studentId" INTEGER,
    "staffId" INTEGER,
    CONSTRAINT "Attendace_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Attendace_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "TeachingStaff" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Attendace" ("id", "signed_on", "staffId", "studentId") SELECT "id", "signed_on", "staffId", "studentId" FROM "Attendace";
DROP TABLE "Attendace";
ALTER TABLE "new_Attendace" RENAME TO "Attendace";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
