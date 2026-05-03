"use client";

import { specializations } from "@/src/lib/dummy";
import SpecializationCard from "./specializationCard";

type Props = {
  onSelect: (spec: string) => void;
};

export default function SpecializationList({ onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-gray-900">
      {specializations.map((spec) => (
        <SpecializationCard
          key={spec.id}
          name={spec.name}
          onClick={() => onSelect(spec.name)}
        />
      ))}
    </div>
  );
}