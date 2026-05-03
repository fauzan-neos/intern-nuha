"use client";

import { useState } from "react";
import { specializations } from "@/src/lib/dummy";
import Link from "next/link";

export default function Service() {
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll
    ? specializations
    : specializations.slice(0, 8);

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

        <Link href={"/doctor"}
          className="text-teal-600 font-medium"
        >
          Show more
        </Link>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-4 gap-6">
        {displayed.map((item) => (
          <div
            key={item.id}
            className="border rounded-xl p-6 hover:shadow-md transition"
          >
            <h3 className="font-semibold mb-2 text-gray-900">
              {item.name}
            </h3>
            <p className="text-sm text-gray-500">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}