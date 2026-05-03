"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-151 flex items-center">
      
      {/* IMAGE (Next optimized) */}
      <Image
        src="/hospital.jpg"
        alt="Hospital"
        fill
        priority
        className="object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <p className="text-teal-400 mb-3">Medical Care</p>

        <h1 className="text-5xl font-bold text-white mb-6">
          Perawatan Ahli untuk Keluarga Anda
        </h1>

        <p className="text-gray-200 max-w-xl mb-8">
          Rasakan pengalaman perawatan kesehatan yang didefinisikan ulang melalui pengobatan presisi dan perawatan penuh kasih sayang.
        </p>

        <div className="flex gap-4">
          <Link href={"/login"} className="bg-teal-700 text-white px-6 py-3 rounded-lg">
            Booking Sekarang
          </Link>

          <Link href={"/doctor"} className="border border-white text-white px-6 py-3 rounded-lg">
            Lihat semua layanan
          </Link>
        </div>
      </div>
    </section>
  );
}