import Link from "next/link";
import { REGISTER_PAGE_URL } from "@/src/constants/constants";

export default function CTA() {
  return (
    <section className="px-10 py-16">
      <div className="bg-teal-700 text-white rounded-xl p-10 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">
            Kelola Kesehatan Anda dengan Lancar
          </h2>
          <p className="mt-2 text-sm">
            Akses catatan rekam medis, booking dokter terbaik, dan lainnya.
          </p>
            <div className="mt-4 flex gap-4">
                <Link href={REGISTER_PAGE_URL} className="bg-white text-teal-700 px-4 py-2 rounded-md">
                    Daftar sekarang
                </Link>
            </div>
        </div>

        <div className="hidden md:block w-40 h-24 bg-white/20 rounded-lg" />
      </div>
    </section>
  );
}