/*
  Warnings:

  - A unique constraint covering the columns `[rekam_medis_id]` on the table `patients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rekam_medis_id` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "doctors" ADD COLUMN     "department" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "room" TEXT;

-- AlterTable
ALTER TABLE "patients" ADD COLUMN     "rekam_medis_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "patients_rekam_medis_id_key" ON "patients"("rekam_medis_id");
