-- CreateTable
CREATE TABLE `Currency` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `currencyCodeA` INTEGER NOT NULL,
    `currencyCodeB` INTEGER NOT NULL,
    `date` BIGINT NOT NULL,
    `rateBuy` DOUBLE NOT NULL,
    `rateCross` DOUBLE NOT NULL,
    `rateSell` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `accId` INTEGER NOT NULL AUTO_INCREMENT,
    `id` VARCHAR(255) NOT NULL,
    `sendId` VARCHAR(255) NOT NULL,
    `balance` BIGINT NOT NULL,
    `creditLimit` BIGINT NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `currencyCode` INTEGER NOT NULL,
    `cashbackType` VARCHAR(255) NOT NULL,
    `iban` VARCHAR(255) NOT NULL,
    `clientId` INTEGER NOT NULL,

    PRIMARY KEY (`accId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MaskedPan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accId` INTEGER NOT NULL,
    `maskedPan` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jar` (
    `jarId` INTEGER NOT NULL AUTO_INCREMENT,
    `id` VARCHAR(255) NOT NULL,
    `sendId` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `currencyCode` INTEGER NOT NULL,
    `balance` BIGINT NOT NULL,
    `goal` BIGINT NOT NULL,
    `clientId` INTEGER NOT NULL,

    PRIMARY KEY (`jarId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClientInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clientId` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `webHookUrl` VARCHAR(255) NOT NULL,
    `permissions` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `ClientInfo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaskedPan` ADD CONSTRAINT `MaskedPan_accId_fkey` FOREIGN KEY (`accId`) REFERENCES `Account`(`accId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jar` ADD CONSTRAINT `Jar_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `ClientInfo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
