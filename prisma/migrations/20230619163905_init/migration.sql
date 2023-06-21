/*
  Warnings:

  - You are about to alter the column `balance` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `creditLimit` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `date` on the `Currency` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `balance` on the `Jar` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `goal` on the `Jar` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `Account` MODIFY `balance` INTEGER NOT NULL,
    MODIFY `creditLimit` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Currency` MODIFY `date` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Jar` MODIFY `balance` INTEGER NOT NULL,
    MODIFY `goal` INTEGER NOT NULL;
