/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Statement` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Statement_id_key` ON `Statement`(`id`);
