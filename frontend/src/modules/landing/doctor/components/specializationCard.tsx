"use client";

import Link from "next/link";

type Props = {
  name: string;
  description: string;
  href: string;
};

export default function SpecializationCard({ name, description, href }: Props) {
  return (
    <Link
      href={href}
      className="flex h-full flex-col border rounded-xl p-6 transition hover:-translate-y-1 hover:bg-teal-50 hover:shadow-md"
    >
      <div className="">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {description}
        </p>
      </div>
    </Link>
  );
}
