/*
  Warnings:

  - You are about to drop the column `appointment_time` on the `bookings` table. All the data in the column will be lost.
  - Added the required column `appointment_end_time` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appointment_start_time` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "appointment_time",
ADD COLUMN     "appointment_end_time" TEXT NOT NULL,
ADD COLUMN     "appointment_start_time" TEXT NOT NULL;
