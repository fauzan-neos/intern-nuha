/*
  Warnings:

  - A unique constraint covering the columns `[booking_code,appointment_date]` on the table `bookings` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "bookings_booking_code_key";

-- CreateIndex
CREATE UNIQUE INDEX "bookings_booking_code_appointment_date_key" ON "bookings"("booking_code", "appointment_date");
