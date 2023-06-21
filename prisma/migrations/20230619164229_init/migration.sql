/*
  Warnings:

  - You are about to alter the column `time` on the `Statement` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `mcc` on the `Statement` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `originalMcc` on the `Statement` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `amount` on the `Statement` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `operationAmount` on the `Statement` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `cashbackAmount` on the `Statement` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `balance` on the `Statement` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `Statement` MODIFY `time` INTEGER NOT NULL,
    MODIFY `mcc` INTEGER NOT NULL,
    MODIFY `originalMcc` INTEGER NOT NULL,
    MODIFY `amount` INTEGER NOT NULL,
    MODIFY `operationAmount` INTEGER NOT NULL,
    MODIFY `cashbackAmount` INTEGER NOT NULL,
    MODIFY `balance` INTEGER NOT NULL;
