"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { AppointmentSlot, DoctorWithSpecialization } from "@/src/lib/dummy";
import {
  BookingFormValues,
  bookingSchema,
} from "@/src/modules/landing/doctor/utils/validation";
import AppointmentSlotPicker from "./AppointmentSlotPicker";

type Props = {
  doctor: DoctorWithSpecialization;
  appointmentSlots: AppointmentSlot[];
  onClose: () => void;
};

export default function BookingModal({
  doctor,
  appointmentSlots,
  onClose,
}: Props) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
  });
  const selectedSlot = useWatch({
    control,
    name: "slotStart",
  });

  const closeModal = () => {
    setIsSubmitted(false);
    reset();
    onClose();
  };

  const onSubmit = (data: BookingFormValues) => {
    console.log("Booking appointment draft:", {
      ...data,
      doctorId: doctor.id,
      appointmentDate: appointmentSlots[0]?.date,
    });
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/50 px-4 py-8">
      <div className="max-h-full w-full max-w-3xl overflow-y-auto rounded-lg bg-white text-gray-900 shadow-xl">
        <div className="flex items-start justify-between border-b border-gray-200 px-6 py-5">
          <div>
            <p className="text-sm font-medium text-teal-700">
              Booking Appointment
            </p>
            <h3 className="mt-1 text-2xl font-semibold">{doctor.name}</h3>
            <p className="text-sm text-gray-500">{doctor.specialization}</p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            aria-label="Close modal"
          >
            <X className="size-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="space-y-4 px-6 py-8">
            <h4 className="text-xl font-semibold text-gray-900">
              Booking berhasil
            </h4>
            <p className="text-sm text-gray-600">Data booking berhasil</p>
            <button
              type="button"
              onClick={closeModal}
              className="rounded-md bg-blue-700 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Tutup
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-6 py-6">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-1">
                <span className="text-sm font-medium">Nama lengkap pasien</span>
                <input
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
                  {...register("patientName")}
                />
                {errors.patientName && (
                  <p className="text-xs text-red-600">
                    {errors.patientName.message}
                  </p>
                )}
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium">NIK / No. identitas</span>
                <input
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
                  {...register("nik")}
                />
                {errors.nik && (
                  <p className="text-xs text-red-600">{errors.nik.message}</p>
                )}
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium">Tanggal lahir</span>
                <input
                  type="date"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
                  {...register("birthDate")}
                />
                {errors.birthDate && (
                  <p className="text-xs text-red-600">
                    {errors.birthDate.message}
                  </p>
                )}
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium">Jenis kelamin</span>
                <select
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
                  {...register("gender")}
                >
                  <option value="">Pilih jenis kelamin</option>
                  <option value="male">Laki-laki</option>
                  <option value="female">Perempuan</option>
                </select>
                {errors.gender && (
                  <p className="text-xs text-red-600">{errors.gender.message}</p>
                )}
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium">Nomor telepon</span>
                <input
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-xs text-red-600">{errors.phone.message}</p>
                )}
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium">Email</span>
                <input
                  type="email"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-600">{errors.email.message}</p>
                )}
              </label>
            </div>

            <label className="block space-y-1">
              <span className="text-sm font-medium">Alamat domisili</span>
              <textarea
                rows={2}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
                {...register("address")}
              />
              {errors.address && (
                <p className="text-xs text-red-600">{errors.address.message}</p>
              )}
            </label>

            <label className="block space-y-1">
              <span className="text-sm font-medium">Asuransi</span>
              <select
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
                {...register("paymentMethod")}
              >
                <option value="insurance">Umum</option>
                <option value="bpjs">BPJS</option>
              </select>
              {errors.paymentMethod && (
                <p className="text-xs text-red-600">
                  {errors.paymentMethod.message}
                </p>
              )}
            </label>

            <label className="block space-y-1">
              <span className="text-sm font-medium">Keluhan utama</span>
              <textarea
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
                {...register("complaint")}
              />
              {errors.complaint && (
                <p className="text-xs text-red-600">{errors.complaint.message}</p>
              )}
            </label>

            <AppointmentSlotPicker
              slots={appointmentSlots}
              selectedSlot={selectedSlot}
              register={register}
              errors={errors}
            />

            <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-md border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="submit"
                className="rounded-md bg-blue-700 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800"
              >
                Kirim Booking
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
