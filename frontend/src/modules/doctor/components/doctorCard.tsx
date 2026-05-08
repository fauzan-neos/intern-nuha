"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Doctor
} from "@/src/lib/types";
import AvailabilityBadge, { getAvailabilityLabel } from "./AvailabilityBadge";
import BookingModal from "./booking/BookingModal";
import DoctorSchedulePreview from "./DoctorSchedulePreview";
import { useAuthUser } from "@/src/modules/auth/hooks/useAuthUser";
import { getAppointmentSlots } from "@/src/utils/appointmentHelper";
import { getUpcomingSchedule } from "@/src/utils/scheduleHelper";
import { ScheduleStatus } from "@/src/lib/types";
import { LOGIN_PAGE_URL } from "@/src/constants/constants";

type Props = {
  doctor: Doctor;
};

export default function DoctorCard({ doctor }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: user } = useAuthUser();
  const router = useRouter();
  const upcomingSchedule = getUpcomingSchedule(doctor.schedules);
  const todaySchedule = upcomingSchedule[0];
  
  // Cek ketersediaan di seluruh jadwal yang tampil (5 hari kedepan)
  const hasAnyAvailableSlot = upcomingSchedule.some(day => {
    if (day.status !== ("AVAILABLE" as ScheduleStatus)) return false;
    // getAppointmentSlots butuh objek Date
    const [year, month, dayNum] = day.date.split("-").map(Number);
    const dateObj = new Date(year, month - 1, dayNum);
    const slots = getAppointmentSlots(doctor, dateObj);
    return slots.some(slot => slot.remaining > 0);
  });

  const isAvailableToday = todaySchedule?.status === ("AVAILABLE" as ScheduleStatus);

  const buttonLabel = !hasAnyAvailableSlot 
    ? "Full Booking" 
    : "Booking Sekarang";

  const handleBookingClick = () => {
    if(!hasAnyAvailableSlot) return;

    if(!user) {
      router.push(LOGIN_PAGE_URL);
      return;
    }

    setIsModalOpen(true)
  }

  return (
    <>
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        <div className="flex items-start gap-5 p-6">
          <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-teal-50 ring-2 ring-teal-100">
            <Image
              src={doctor.image ?? "/doc_eko.jpg"}
              alt={doctor.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>

          <div className="min-w-0">
            <h3 className="text-xl font-semibold leading-tight text-gray-900">
              {doctor.name}
            </h3>
            <p className="mt-1 text-base font-medium text-gray-500">
              {doctor.specialization?.name}
            </p>
            <AvailabilityBadge
              availability={getAvailabilityLabel(upcomingSchedule)}
              isAvailableToday={isAvailableToday}
            />
          </div>
        </div>

        <DoctorSchedulePreview upcomingSchedule={upcomingSchedule} />

        <div className="p-5">
          <button
            type="button"
            onClick={handleBookingClick}
            disabled={!hasAnyAvailableSlot}
            className="w-full rounded-md bg-teal-700 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
          >
            {buttonLabel}
          </button>
        </div>
      </article>

      {isModalOpen && (
        <BookingModal
          doctor={doctor}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
