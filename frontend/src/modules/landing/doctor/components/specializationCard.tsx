"use client";

import Link from "next/link";

type Props = {
  name: string;
  description: string;
  href: string;
};

export default function SpecializationCard({ name, description, href }: Props) {
  return (
    <div className="flex h-full flex-col border rounded-xl p-6 transition hover:-translate-y-1 hover:bg-blue-50 hover:shadow-md">
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-sm text-gray-500 mt-1">
        {description}
      </p>
      <Link
        href={href}
        className="mt-auto inline-flex pt-4 text-sm font-semibold text-teal-700 hover:text-teal-900"
      >
        Lihat Dokter
      </Link>
    </div>
  );
}
