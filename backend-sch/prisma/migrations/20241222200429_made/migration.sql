-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NoneTeachingStaff" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profileId" INTEGER,
    CONSTRAINT "NoneTeachingStaff_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_NoneTeachingStaff" ("email", "firstName", "id", "lastName", "profileId", "role") SELECT "email", "firstName", "id", "lastName", "profileId", "role" FROM "NoneTeachingStaff";
DROP TABLE "NoneTeachingStaff";
ALTER TABLE "new_NoneTeachingStaff" RENAME TO "NoneTeachingStaff";
CREATE UNIQUE INDEX "NoneTeachingStaff_email_key" ON "NoneTeachingStaff"("email");
CREATE UNIQUE INDEX "NoneTeachingStaff_profileId_key" ON "NoneTeachingStaff"("profileId");
CREATE TABLE "new_TeachingStaff" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "profileId" INTEGER,
    CONSTRAINT "TeachingStaff_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TeachingStaff" ("email", "id", "profileId") SELECT "email", "id", "profileId" FROM "TeachingStaff";
DROP TABLE "TeachingStaff";
ALTER TABLE "new_TeachingStaff" RENAME TO "TeachingStaff";
CREATE UNIQUE INDEX "TeachingStaff_email_key" ON "TeachingStaff"("email");
CREATE UNIQUE INDEX "TeachingStaff_profileId_key" ON "TeachingStaff"("profileId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
