"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Doctor } from "@/src/lib/types";
import {
  BookingFormValues,
  bookingSchema,
} from "@/src/modules/landing/doctor/utils/validation";
import AppointmentSlotPicker from "./AppointmentSlotPicker";
import { getAvailableDates, groupSlotsIntoSessions } from "@/src/utils/doctorHelper";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchAvailableSlots, createBooking } from "@/src/lib/api";
import toast from "react-hot-toast";

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
      toast.success("Booking berhasil dibuat!");
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
    // 1. Kelompokkan slot ke dalam sesi menggunakan helper
    const sessions = groupSlotsIntoSessions(dynamicSlots);
    // 2. Cari sesi yang dipilih berdasarkan slotStart (startTime)
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

  console.log(slotsError);
  console.log(dynamicSlots); 

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/50 px-4 py-8">
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-xl">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
            <CheckCircle2 className="h-10 w-10 text-teal-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Booking Berhasil!</h3>
          <p className="mt-2 text-gray-600">
            Terima kasih telah melakukan pendaftaran. Silakan cek riwayat booking Anda.
          </p>
          <button
            onClick={closeModal}
            className="mt-6 w-full rounded-md bg-teal-700 py-3 font-semibold text-white hover:bg-teal-800"
          >
            Tutup
          </button>
        </div>
      </div>
    );
  }

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/50 px-4 py-8">
        <div className="max-h-full w-full max-w-2xl overflow-y-auto rounded-lg bg-white text-gray-900 shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
            <button
              type="button"
              onClick={() => setShowConfirmation(false)}
              className="flex items-center gap-2 text-sm font-medium text-teal-700 hover:text-teal-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </button>
            <h3 className="text-xl font-bold">Konfirmasi Booking</h3>
            <div className="w-10"></div>
          </div>

          <div className="rounded-xl bg-slate-50 p-6">
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-900">Detail Kunjungan</h4>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-bold text-gray-800">Nama Dokter</p>
                  <p className="font-bold text-teal-700">{doctor.name}</p>
                  <p className="text-xs font-medium text-gray-700">{doctor.specialization?.name}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-bold text-gray-800">Tanggal Kunjungan</p>
                  <p className="font-bold text-teal-700">{formData.appointmentDate ? new Date(formData.appointmentDate).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : "-"}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800">Waktu Kunjungan</p>
                  <p className="font-bold text-teal-700">{formData.slotStart} WIB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Detail Pasien</h4>
                <div className="mt-3 space-y-1">
                  <p className="text-xs font-bold text-gray-800">Nama Lengkap</p>
                  <p className="font-bold text-teal-700">{formData.patientName}</p>
                </div>
              </div>
              {/* <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 text-right">Kode Booking</h4>
                <div className="mt-3 space-y-1 text-right">
                  <p className="text-xs text-gray-500">Estimasi Kode</p>
                  <p className="text-lg font-black text-teal-700">{doctor.employeeCode}-X</p>
                </div>
              </div> */}
            </div>

            <div className="grid grid-cols-2 gap-8 border-t border-gray-100 pt-6">
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Info Kontak</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-bold text-gray-700">Email</p>
                    <p className="font-semibold text-teal-700">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">No. Telepon</p>
                    <p className="font-semibold text-teal-700">{formData.phone}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800">Alasan Kunjungan</h4>
                <div>
                  <p className="text-xs font-bold text-gray-800">Keluhan</p>
                  <p className="font-semibold text-teal-700">{formData.complaint}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                className="flex-1 rounded-md border border-gray-300 py-3 font-semibold text-gray-700 hover:bg-gray-50"
              >
                Ubah Data
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={handleSubmit(finalSubmit)}
                className="flex-2 rounded-md bg-teal-700 py-3 font-semibold text-white hover:bg-teal-800 disabled:bg-teal-300"
              >
                {isPending ? "Memproses..." : "Konfirmasi & Kirim"}
              </button>
            </div>
          </div>
        </div>
      </div>
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
