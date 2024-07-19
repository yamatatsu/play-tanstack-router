/*
  Warnings:

  - The primary key for the `PlcData` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX `PlcData_timestamp_dataName_key` ON `PlcData`;

-- AlterTable
ALTER TABLE `PlcData` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`timestamp`, `dataName`);
