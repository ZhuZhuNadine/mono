/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Statement` DROP FOREIGN KEY `Statement_accountId_fkey`;

-- AlterTable
ALTER TABLE `Statement` MODIFY `accountId` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Account_id_key` ON `Account`(`id`);

-- AddForeignKey
ALTER TABLE `Statement` ADD CONSTRAINT `Statement_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
