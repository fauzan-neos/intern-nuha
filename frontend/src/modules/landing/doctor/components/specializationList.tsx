"use client";

import { specializations } from "@/src/lib/dummy";
import SpecializationCard from "./specializationCard";

export default function SpecializationList() {
  return (
    <div className="grid grid-cols-2 items-stretch gap-6 text-gray-900 md:grid-cols-4">
      {specializations.map((spec) => (
        <SpecializationCard
          key={spec.id}
          name={spec.name}
          description={spec.description}
          href={`/doctor?specialization=${encodeURIComponent(spec.name)}`}
        />
      ))}
    </div>
  );
}
