"use client";

import Image from "next/image";
import Link from "next/link";
import { doctors, getTopDoctors } from "@/src/lib/dummy";

const days = ["mon", "tue", "wed", "thu", "fri"];

export default function DoctorAvailability() {
  const topDoctors = getTopDoctors(doctors)

  return (
    <div className="mt-20 px-10">
      <h2 className="text-2xl font-bold mb-2 text-gray-900">
        Dokter Terbaik Mingguan
      </h2>
      {/* <p className="text-gray-500 mb-6">
        View real-time availability for our lead specialists this week.
      </p> */}

      <div className="border rounded-xl overflow-hidden">
        {/* HEADER */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr] bg-gray-100 p-4 text-sm font-semibold text-gray-500">
          <div>Specialist</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div className="text-right pr-2">Action</div>
        </div>

        {/* ROWS */}
        {topDoctors.map((doc) => (
          <div
            key={doc.id}
            className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center border-t p-4"
          >
            {/* DOCTOR */}
            <div className="flex items-center gap-3">
              <Image
                src={doc.image}
                alt={doc.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900">{doc.name}</p>
                <p className="text-xs text-gray-500">
                  {doc.specialization}
                </p>
              </div>
            </div>

            {/* SCHEDULE */}
            {days.map((day) => {
              const sched = doc.schedules.find(s => s.day === day);

              if (!sched || !sched.start) {
                return (
                  <div key={day} className="text-gray-400 text-sm">
                    Unavailable
                  </div>
                );
              }

              return (
                <div key={day}>
                  <span className="bg-teal-700 text-white text-xs px-3 py-1 rounded-full">
                    {sched.start} - {sched.end}
                  </span>
                </div>
              );
            })}

            {/* ACTION */}
            <div className="text-right pr-2">
              <Link href={"/login"} className="text-teal-600 font-bold ">
                Book
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}