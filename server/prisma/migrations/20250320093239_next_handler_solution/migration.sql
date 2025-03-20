/*
  Warnings:

  - You are about to drop the column `imageName` on the `Plugin` table. All the data in the column will be lost.
  - You are about to drop the column `server` on the `Plugin` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Plugin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "url" TEXT,
    "author" TEXT NOT NULL,
    "description" TEXT,
    "version" TEXT NOT NULL,
    "default" BOOLEAN NOT NULL,
    "enabled" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Plugin" ("author", "createdAt", "default", "description", "enabled", "id", "name", "updatedAt", "version") SELECT "author", "createdAt", "default", "description", "enabled", "id", "name", "updatedAt", "version" FROM "Plugin";
DROP TABLE "Plugin";
ALTER TABLE "new_Plugin" RENAME TO "Plugin";
CREATE UNIQUE INDEX "Plugin_name_key" ON "Plugin"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
