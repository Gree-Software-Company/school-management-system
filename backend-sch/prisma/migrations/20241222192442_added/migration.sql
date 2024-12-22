-- CreateTable
CREATE TABLE "TeachingStaff" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,
    CONSTRAINT "TeachingStaff_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "dateAdded" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "teacherId" INTEGER NOT NULL,
    CONSTRAINT "Subject_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "TeachingStaff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NoneTeachingStaff" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,
    CONSTRAINT "NoneTeachingStaff_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Class" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "teacherId" INTEGER,
    CONSTRAINT "Class_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "TeachingStaff" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,
    CONSTRAINT "Student_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imageUrl" TEXT,
    "degree" TEXT,
    "profileImage" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TeachingStaff_email_key" ON "TeachingStaff"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TeachingStaff_profileId_key" ON "TeachingStaff"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_name_key" ON "Subject"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_teacherId_key" ON "Subject"("teacherId");

-- CreateIndex
CREATE UNIQUE INDEX "NoneTeachingStaff_email_key" ON "NoneTeachingStaff"("email");

-- CreateIndex
CREATE UNIQUE INDEX "NoneTeachingStaff_profileId_key" ON "NoneTeachingStaff"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_profileId_key" ON "Student"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_classId_key" ON "Student"("classId");
