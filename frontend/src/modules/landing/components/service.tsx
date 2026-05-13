"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSpecializations } from "@/src/lib/api";
import Link from "next/link";
import { DOCTORS_PAGE_URL } from "@/src/constants/constants";

export default function Service() {
  const { data: specializations, isLoading } = useQuery({
    queryKey: ["specializations"],
    queryFn: fetchSpecializations,
  });

  const displayed = specializations?.slice(0, 8) || [];

  if (isLoading) return <div className="mt-20 px-10 text-center py-10 text-gray-500">Loading services...</div>;

  return (
    <div className="mt-20 px-10">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Layanan Kami</h2>
          <p className="text-gray-500">
            Keahlian medis yang komprehensif
          </p>
        </div>

        <Link href={DOCTORS_PAGE_URL}
          className="text-teal-600 font-medium hover:text-teal-700 transition-colors"
        >
          Lihat Semua
        </Link>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-4 gap-6">
        {displayed.map((item) => (
          <div
            key={item.id}
            className="border rounded-xl p-6 hover:shadow-md transition hover:border-teal-100 bg-white"
          >
            <h3 className="font-semibold mb-2 text-gray-900">
              {item.name}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-3">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
