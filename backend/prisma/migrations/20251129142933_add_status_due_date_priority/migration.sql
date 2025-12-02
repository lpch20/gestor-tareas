/*
  Warnings:

  - You are about to drop the column `completed` on the `tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tasks` DROP COLUMN `completed`,
    ADD COLUMN `due_date` DATETIME(3) NULL,
    ADD COLUMN `priority` VARCHAR(20) NOT NULL DEFAULT 'medium',
    ADD COLUMN `status` VARCHAR(50) NOT NULL DEFAULT 'todo';
