"use client";

import Image from "next/image";

type Props = {
  doctor: {
    name: string;
    specialization: string;
    image: string;
  };
};

export default function DoctorCard({ doctor }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 space-y-3 hover:shadow-md transition">
      
      {/* IMAGE */}
      <div className="relative w-full h-40 rounded-lg overflow-hidden">
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          className="object-cover"
        />
      </div>

      {/* INFO */}
      <div>
        <h3 className="font-semibold text-lg text-gray-900">{doctor.name}</h3>
        <p className="text-sm text-green-600 font-medium">
          {doctor.specialization}
        </p>
      </div>

      {/* ACTION */}
      <div className="flex gap-2">
        <button className="w-full border rounded-md py-1 text-sm text-gray-900">
          View Profile
        </button>
        <button className="w-full bg-blue-600 text-white rounded-md py-1 text-sm">
          Book Now
        </button>
      </div>
    </div>
  );
}