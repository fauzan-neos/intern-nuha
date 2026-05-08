"use client";

import { useQuery } from "@tanstack/react-query";
import SpecializationCard from "./specializationCard";
import { fetchSpecializations } from "@/src/lib/api";

export default function SpecializationList() {
  const {data: dataSpecialization } = useQuery({
    queryKey: ["specializations"],
    queryFn: fetchSpecializations
  })

  return (
    <div className="grid grid-cols-2 items-stretch gap-6 text-gray-900 md:grid-cols-4">
      {dataSpecialization?.map((spec) => (
        <SpecializationCard
          key={spec.id}
          name={spec.name}
          description={spec.description}
          href={`/doctor?specialization=${spec.uuid}`}
        />
      ))}
    </div>
  );
}
