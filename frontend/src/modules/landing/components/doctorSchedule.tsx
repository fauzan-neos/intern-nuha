"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getTopDoctors } from "@/src/lib/types";
import { fetchDoctors } from "@/src/lib/api";
import { getUpcomingSchedule } from "@/src/utils/doctorHelper";

export default function DoctorAvailability() {
  const { data: doctorsData, isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
  });

  const topDoctors = doctorsData ? getTopDoctors(doctorsData) : [];

  // Hitung 5 hari ke depan secara dinamis untuk header
  const upcomingDays = Array.from({ length: 5 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toLocaleDateString("id-ID", { weekday: "long"});
  });

  if (isLoading) return <div className="mt-20 px-10 text-center py-10">Loading schedules...</div>;

  

  return (
    <div className="mt-20 px-10">
      <h2 className="text-2xl font-bold mb-2 text-gray-900">
        Dokter Terbaik Mingguan
      </h2>

      <div className="border rounded-xl overflow-hidden shadow-sm">
        {/* HEADER */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr] bg-slate-50 p-4 text-sm font-semibold text-gray-500 border-b">
          <div>Spesialis</div>
          {upcomingDays.map((day, idx) => (
            <div key={idx} className={idx === 0 ? "text-teal-700" : ""}>
              {idx === 0 ? "Hari Ini" : day}
            </div>
          ))}
          <div className="text-right pr-2">Aksi</div>
        </div>

        {/* ROWS */}
        {topDoctors.map((doc) => {
          const scheduleItems = getUpcomingSchedule(doc.schedules);
          
          return (
            <div
              key={doc.id}
              className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center border-t p-4 hover:bg-slate-50/50 transition-colors"
            >
              {/* DOCTOR */}
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-slate-200">
                  <Image
                    src={doc.image || "/doc_sarah.jpg"}
                    alt={doc.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate">{doc.name}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {doc.specialization?.name}
                  </p>
                </div>
              </div>

              {/* SCHEDULE */}
              {scheduleItems.map((item) => (
                <div key={item.date}>
                  {item.status === "AVAILABLE" ? (
                    <span className="inline-block bg-teal-700 text-white text-[10px] md:text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                      {item.timeLabel}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs">Tidak ada jadwal</span>
                  )}
                </div>
              ))}

              {/* ACTION */}
              <div className="text-right pr-2">
                <Link href={"/login"} className="text-teal-700 font-bold hover:text-teal-800 text-sm">
                  Booking
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
