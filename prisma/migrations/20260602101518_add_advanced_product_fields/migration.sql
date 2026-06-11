/*
  Warnings:

  - You are about to drop the column `isActive` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Category` ADD COLUMN `createdBy` VARCHAR(191) NULL,
    ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'Published',
    ADD COLUMN `updatedBy` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `isActive`,
    ADD COLUMN `createdBy` VARCHAR(191) NULL,
    ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `metaDescription` TEXT NULL,
    ADD COLUMN `metaTitle` VARCHAR(191) NULL,
    ADD COLUMN `sku` VARCHAR(191) NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'Published',
    ADD COLUMN `stockQuantity` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `updatedBy` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `ProductEnquiry` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `message` TEXT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'NEW',
    `variantSize` VARCHAR(191) NULL,
    `productId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductEnquiry` ADD CONSTRAINT `ProductEnquiry_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
