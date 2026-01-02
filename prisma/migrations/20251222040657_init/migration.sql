/*
  Warnings:

  - You are about to drop the column `userId` on the `Event` table. All the data in the column will be lost.
  - Added the required column `qrCode` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'UNAPPROVED',
    "eventCode" TEXT NOT NULL,
    "posterImage" TEXT,
    "details" TEXT NOT NULL,
    "startAt" DATETIME NOT NULL,
    "endAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdById" TEXT NOT NULL,
    "eoId" TEXT NOT NULL,
    CONSTRAINT "Event_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Event_eoId_fkey" FOREIGN KEY ("eoId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("createdAt", "createdById", "description", "details", "endAt", "eoId", "eventCode", "id", "posterImage", "startAt", "status", "title", "updatedAt") SELECT "createdAt", "createdById", "description", "details", "endAt", "eoId", "eventCode", "id", "posterImage", "startAt", "status", "title", "updatedAt" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE UNIQUE INDEX "Event_eventCode_key" ON "Event"("eventCode");
CREATE TABLE "new_Participant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "contact" TEXT,
    "status" TEXT NOT NULL DEFAULT 'REGISTERED',
    "qrCode" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventId" TEXT NOT NULL,
    CONSTRAINT "Participant_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Participant" ("contact", "createdAt", "email", "eventId", "id", "name", "status") SELECT "contact", "createdAt", "email", "eventId", "id", "name", "status" FROM "Participant";
DROP TABLE "Participant";
ALTER TABLE "new_Participant" RENAME TO "Participant";
CREATE UNIQUE INDEX "Participant_qrCode_key" ON "Participant"("qrCode");
CREATE UNIQUE INDEX "Participant_email_eventId_key" ON "Participant"("email", "eventId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
