"use client";

import DoctorCard from "@/src/modules/landing/doctor/components/doctorCard";
import { doctors } from "@/src/lib/dummy";

type Props = {
  specialization: string | null;
};

export default function DoctorList({ specialization }: Props) {
  const filtered = specialization
    ? doctors.filter((d) => d.specialization === specialization)
    : doctors;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {filtered.map((doc) => (
        <DoctorCard key={doc.id} doctor={doc} />
      ))}
    </div>
  );
}