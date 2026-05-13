-- CreateTable
CREATE TABLE "schedule_templates" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "day" "Weekday" NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "max_patient" INTEGER NOT NULL DEFAULT 12,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "doctor_id" INTEGER NOT NULL,

    CONSTRAINT "schedule_templates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "schedule_templates_uuid_key" ON "schedule_templates"("uuid");

-- AddForeignKey
ALTER TABLE "schedule_templates" ADD CONSTRAINT "schedule_templates_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
