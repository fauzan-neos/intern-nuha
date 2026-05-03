"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-100 flex items-center">
      
      {/* IMAGE (Next optimized) */}
      <Image
        src="/hospital-building.jpg"
        alt="Hospital"
        fill
        priority
        className="object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">

        <h1 className="text-5xl font-bold text-white mb-6 text-center">
          Temui Spesialis Kami
        </h1>

        <p className="text-gray-200 max-w-xl mb-8 text-center">
          Dapatkan akses ke keahlian kelas dunia di berbagai disiplin ilmu medis. Para profesional kami yang berdedikasi menggabungkan ketelitian klinis dengan perawatan yang penuh empati.
        </p>

      </div>
    </section>
  );
}