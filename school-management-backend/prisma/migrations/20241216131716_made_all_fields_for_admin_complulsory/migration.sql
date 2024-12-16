/*
  Warnings:

  - Made the column `name` on table `Admin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Admin` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_Admin" ("email", "id", "name", "password", "phone") SELECT "email", "id", "name", "password", "phone" FROM "Admin";
DROP TABLE "Admin";
ALTER TABLE "new_Admin" RENAME TO "Admin";
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
CREATE UNIQUE INDEX "Admin_phone_key" ON "Admin"("phone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
