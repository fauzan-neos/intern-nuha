"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Doctor } from "@/src/lib/types";
import {
  BookingFormValues,
  bookingSchema,
} from "@/src/modules/doctor/utils/validation";
import AppointmentSlotPicker from "@/src/modules/doctor/components/booking/AppointmentSlotPicker";
import { groupSlotsIntoSessions } from "@/src/modules/doctor/utils/appointmentHelper";
import { getAvailableDates } from "@/src/utils/scheduleHelper";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchAvailableSlots, createBooking } from "@/src/lib/api";
import toast from "react-hot-toast";
import BookingSuccessModal from "@/src/modules/doctor/components/booking/BookingSuccessModal";
import ConfirmationModal from "./ConfirmationModal";

type Props = {
  doctor: Doctor;
  onClose: () => void;
};

export default function BookingModal({
  doctor,
  onClose,
}: Props) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      patientName: "",
      nik: "",
      birthDate: "",
      gender: "male",
      phone: "",
      email: "",
      address: "",
      paymentMethod: "umum",
      complaint: "",
      appointmentDate: "",
      scheduleId: 0,
      slotStart: "",
    }
  });

  const selectedSlot = useWatch({
    control,
    name: "slotStart",
  });

  const selectedDate = useWatch({ control, name: "appointmentDate" });
  const selectedScheduleId = useWatch({ control, name: "scheduleId" });

  const { data: dynamicSlots = [], isLoading: isLoadingSlots, error: slotsError } = useQuery({
    queryKey: ["slots", doctor.id, selectedDate, selectedScheduleId],
    queryFn: () => fetchAvailableSlots(doctor.id, selectedDate, selectedScheduleId),
    enabled: !!selectedDate && !!selectedScheduleId && selectedScheduleId !== 0,
  });

  const mutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      // toast.success("Booking berhasil dibuat!");
      setIsSubmitted(true);
      setShowConfirmation(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal membuat booking");
    }
  });

  const closeModal = () => {
    setIsSubmitted(false);
    setShowConfirmation(false);
    reset();
    onClose();
  };

  const handleInitialSubmit = () => {
    setShowConfirmation(true);
  };

  const finalSubmit = (data: BookingFormValues) => {
    // Kelompokkan slot ke dalam sesi menggunakan helper
    const sessions = groupSlotsIntoSessions(dynamicSlots);
    // Cari sesi yang dipilih berdasarkan slotStart (startTime)
    const selectedSession = sessions.find(s => s.startTime === data.slotStart);
    
    mutation.mutate({
      doctorId: doctor.id,
      patientName: data.patientName,
      nik: data.nik,
      birthDate: data.birthDate,
      gender: data.gender,
      phone: data.phone,
      email: data.email,
      address: data.address,
      paymentMethod: data.paymentMethod,
      complaint: data.complaint,
      appointmentDate: data.appointmentDate,
      appointmentStartTime: data.slotStart,
      appointmentEndTime: selectedSession?.endTime || "",
      scheduleId: data.scheduleId,
    });
  };

  const availableDates = getAvailableDates(doctor.schedules || []);
  const formData = getValues();

  // Loading State
  const isPending = mutation.isPending;

  if (isSubmitted) {
    return (
      <BookingSuccessModal closeModal={closeModal} />
    );
  }

  if (showConfirmation) {
    return (
      <ConfirmationModal
        doctor={doctor}
        formData={formData}
        isPending={isPending}
        onClose={() => setShowConfirmation(false)}
        onSubmit={handleSubmit(finalSubmit)}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/50 px-4 py-8">
      <div className="max-h-full w-full max-w-3xl overflow-y-auto rounded-lg bg-white text-gray-900 shadow-xl">
        <div className="flex items-start justify-between border-b border-gray-200 px-6 py-5">
          <div>
            <p className="text-sm font-medium text-teal-700">Buat Booking</p>
            <h3 className="mt-1 text-2xl font-semibold">{doctor.name}</h3>
            <p className="text-sm text-gray-500">{doctor.specialization?.name}</p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleInitialSubmit)} className="space-y-6 px-6 py-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1">
              <span className="text-sm font-medium">Nama lengkap pasien</span>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
                {...register("patientName")}
              />
              {errors.patientName && <p className="text-xs text-red-600">{errors.patientName.message}</p>}
            </label>

            <label className="space-y-1">
              <span className="text-sm font-medium">NIK / No. identitas</span>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
                {...register("nik")}
              />
              {errors.nik && <p className="text-xs text-red-600">{errors.nik.message}</p>}
            </label>

            <label className="space-y-1">
              <span className="text-sm font-medium">Tanggal lahir</span>
              <input
                type="date"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
                {...register("birthDate")}
              />
              {errors.birthDate && <p className="text-xs text-red-600">{errors.birthDate.message}</p>}
            </label>

            <div className="space-y-1">
              <span className="text-sm font-medium">Jenis kelamin</span>
              <div className="flex gap-2">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    value="male"
                    className="sr-only peer"
                    {...register("gender")}
                  />
                  <div className="flex justify-center rounded-md border border-gray-300 py-2 text-sm peer-checked:border-teal-600 peer-checked:bg-teal-50 peer-checked:text-teal-900">
                    Laki-laki
                  </div>
                </label>
                <label className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    value="female"
                    className="sr-only peer"
                    {...register("gender")}
                  />
                  <div className="flex justify-center rounded-md border border-gray-300 py-2 text-sm peer-checked:border-teal-600 peer-checked:bg-teal-50 peer-checked:text-teal-900">
                    Perempuan
                  </div>
                </label>
              </div>
              {errors.gender && <p className="text-xs text-red-600">{errors.gender.message}</p>}
            </div>

            <label className="space-y-1">
              <span className="text-sm font-medium">Nomor telepon</span>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
                {...register("phone")}
              />
              {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
            </label>

            <label className="space-y-1">
              <span className="text-sm font-medium">Email</span>
              <input
                type="email"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
                {...register("email")}
              />
              {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
            </label>
          </div>

          <label className="block space-y-1">
            <span className="text-sm font-medium">Alamat domisili</span>
            <textarea
              rows={2}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
              {...register("address")}
            />
            {errors.address && <p className="text-xs text-red-600">{errors.address.message}</p>}
          </label>

          <div className="space-y-1">
            <span className="text-sm font-medium">Jenis Asuransi</span>
            <div className="flex gap-2">
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  value="umum"
                  className="sr-only peer"
                  {...register("paymentMethod")}
                />
                <div className="flex justify-center rounded-md border border-gray-300 py-2 text-sm peer-checked:border-teal-600 peer-checked:bg-teal-50 peer-checked:text-teal-900">
                  Umum
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  value="bpjs"
                  className="sr-only peer"
                  {...register("paymentMethod")}
                />
                <div className="flex justify-center rounded-md border border-gray-300 py-2 text-sm peer-checked:border-teal-600 peer-checked:bg-teal-50 peer-checked:text-teal-900">
                  BPJS
                </div>
              </label>
            </div>
            {errors.paymentMethod && <p className="text-xs text-red-600">{errors.paymentMethod.message}</p>}
          </div>

          <label className="block space-y-1">
            <span className="text-sm font-medium">Keluhan utama</span>
            <textarea
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
              {...register("complaint")}
            />
            {errors.complaint && <p className="text-xs text-red-600">{errors.complaint.message}</p>}
          </label>

          <div className="space-y-3">
            <span className="text-sm font-medium">Pilih Tanggal Kunjungan</span>
            <div className="flex flex-wrap gap-2">
              {availableDates.map((item) => (
                <label key={item.dateString} className="cursor-pointer">
                  <input
                    type="radio"
                    value={item.dateString}
                    className="sr-only peer"
                    {...register("appointmentDate", {
                      onChange: (e) => {
                        const dateValue = e.target.value;
                        const dateItem = availableDates.find(d => d.dateString === dateValue);
                        if (dateItem) {
                          setValue("scheduleId", dateItem.scheduleId, { shouldValidate: true });
                          setValue("slotStart", ""); 
                        }
                      }
                    })}
                  />
                  <div className="rounded-md border border-gray-200 px-4 py-2 text-sm peer-checked:border-teal-600 peer-checked:bg-teal-50 peer-checked:text-teal-900">
                    {item.label}
                  </div>
                </label>
              ))}
            </div>
            {errors.appointmentDate && <p className="text-xs text-red-600">{errors.appointmentDate.message}</p>}
          </div>

          <div className="min-h-25">
            {isLoadingSlots ? (
              <div className="flex h-20 items-center justify-center space-x-2 text-teal-600">
                <div className="h-2 w-2 animate-bounce rounded-full bg-teal-600 [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-teal-600 [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-teal-600"></div>
                <span className="ml-2 text-sm font-medium">Mencari jadwal tersedia...</span>
              </div>
            ) : slotsError ? (
              <div className="flex h-20 items-center justify-center rounded-md border border-red-100 bg-red-50 text-sm text-red-600">
                Gagal memuat jadwal. Silakan coba lagi.
              </div>
            ) : selectedDate && dynamicSlots && dynamicSlots.length > 0 ? (
              <AppointmentSlotPicker
                slots={dynamicSlots}
                selectedSlot={selectedSlot}
                register={register}
                errors={errors}
              />
            ) : selectedDate ? (
              <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-400">
                Tidak ada slot tersedia untuk tanggal ini.
              </div>
            ) : (
              <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-400">
                Silakan pilih tanggal terlebih dahulu
              </div>
            )}
          </div>

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
              className="rounded-md bg-teal-700 px-5 py-2 text-sm font-semibold text-white hover:bg-teal-800"
            >
              Booking Sekarang
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
