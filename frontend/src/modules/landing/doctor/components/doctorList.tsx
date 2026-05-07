"use client";

import DoctorCard from "@/src/modules/landing/doctor/components/doctorCard";
import { useQuery } from "@tanstack/react-query";
import { fetchDoctors } from "@/src/lib/api";

type Props = {
  specialization: string | null;
  search: string;
};

export default function DoctorList({ specialization, search }: Props) {
  const { data: doctorsData } = useQuery({
    queryKey: ["doctors"],
    queryFn: fetchDoctors
  })

  let filtered = doctorsData;

  // Filter by Specialization
  if (specialization) {
    filtered = filtered?.filter((d) => d.specialization?.name === specialization);
  }

  // Filter by Search (Name)
  if (search) {
    filtered = filtered?.filter((d) => 
      d.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {filtered?.length === 0 ? (
        <div className="md:col-span-3 py-10 text-center text-gray-500">
          Tidak ada dokter yang ditemukan.
        </div>
      ) : (
        filtered?.map((doc) => (
          <DoctorCard key={doc.id} doctor={doc} />
        ))
      )}
    </div>
  );
}