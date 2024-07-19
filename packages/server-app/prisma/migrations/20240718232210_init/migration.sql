-- CreateTable
CREATE TABLE `PlcData` (
    `timestamp` DATETIME(3) NOT NULL,
    `dataName` VARCHAR(191) NOT NULL,
    `value` DOUBLE NOT NULL,

    UNIQUE INDEX `PlcData_timestamp_dataName_key`(`timestamp`, `dataName`),
    PRIMARY KEY (`timestamp`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
