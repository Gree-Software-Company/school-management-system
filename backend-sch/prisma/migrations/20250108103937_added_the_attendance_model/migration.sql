-- CreateTable
CREATE TABLE "Attendace" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "signed_on" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studentId" INTEGER NOT NULL,
    "staffId" INTEGER NOT NULL,
    CONSTRAINT "Attendace_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Attendace_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "TeachingStaff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
