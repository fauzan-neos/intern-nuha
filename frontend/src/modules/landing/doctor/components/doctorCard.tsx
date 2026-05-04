"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  DoctorWithSpecialization,
  getAppointmentSlots,
  getUpcomingSchedule,
} from "@/src/lib/dummy";
import AvailabilityBadge, { getAvailabilityLabel } from "./AvailabilityBadge";
import BookingModal from "./booking/BookingModal";
import DoctorSchedulePreview from "./DoctorSchedulePreview";
import { useAuthUser } from "@/src/modules/auth/hooks/useAuthUser";

type Props = {
  doctor: DoctorWithSpecialization;
};

export default function DoctorCard({ doctor }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: user } = useAuthUser();
  const router = useRouter();
  const upcomingSchedule = getUpcomingSchedule(doctor);
  const todaySchedule = upcomingSchedule[0];
  const appointmentSlots = getAppointmentSlots(doctor);
  const availableSlots = appointmentSlots.filter((slot) => slot.remaining > 0);
  const availability = getAvailabilityLabel(upcomingSchedule);
  const isAvailableToday = todaySchedule?.status === "available";
  const canBookToday = isAvailableToday && availableSlots.length > 0;

  const buttonLabel = !isAvailableToday
    ? "Unavailable"
    : canBookToday
      ? "Book Appointment"
      : "Fully Booked";

  const handleBookingClick = () => {
    if(!canBookToday) return;

    if(!user) {
      router.push("/login");
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
              src={doctor.image}
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
              {doctor.specialization}
            </p>
            <AvailabilityBadge
              availability={availability}
              isAvailableToday={isAvailableToday}
            />
          </div>
        </div>

        <DoctorSchedulePreview upcomingSchedule={upcomingSchedule} />

        <div className="p-5">
          <button
            type="button"
            onClick={handleBookingClick}
            disabled={!canBookToday}
            className="w-full rounded-md bg-teal-700 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
          >
            {buttonLabel}
          </button>
        </div>
      </article>

      {isModalOpen && (
        <BookingModal
          doctor={doctor}
          appointmentSlots={appointmentSlots}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
