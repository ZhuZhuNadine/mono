-- CreateTable
CREATE TABLE `Statement` (
    `statementId` INTEGER NOT NULL AUTO_INCREMENT,
    `accountId` INTEGER NOT NULL,
    `id` VARCHAR(255) NOT NULL,
    `time` BIGINT NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `mcc` BIGINT NOT NULL,
    `originalMcc` BIGINT NOT NULL,
    `amount` BIGINT NOT NULL,
    `operationAmount` BIGINT NOT NULL,
    `currencyCode` INTEGER NOT NULL,
    `commissionRate` DOUBLE NOT NULL,
    `cashbackAmount` BIGINT NOT NULL,
    `balance` BIGINT NOT NULL,
    `hold` BOOLEAN NOT NULL,

    PRIMARY KEY (`statementId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Statement` ADD CONSTRAINT `Statement_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`accId`) ON DELETE RESTRICT ON UPDATE CASCADE;
