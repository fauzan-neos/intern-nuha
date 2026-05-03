"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/src/lib/api";
import Navbar from "../../components/navbar";
import DoctorList from "./components/doctorList";
import DoctorFilter from "./components/doctorFilter";
import DoctorHero from "./components/doctorHero";
import Footer from "../../components/footer";
import SpecializationList from "./components/specializationList";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null);

  const { isSuccess } = useQuery({
    queryKey: ["auth", "user"],
    queryFn: fetchUser,
    retry: false,
  });

  const doctorContent = (
    <>
      <DoctorFilter search={search} setSearch={setSearch} />
      {!selectedSpec ? (
        <>
          <h2 className="text-xl font-semibold">Choose Specialization</h2>
          <SpecializationList onSelect={setSelectedSpec} />
        </>
      ) : (
        <>
          <button
            onClick={() => setSelectedSpec(null)}
            className="text-blue-600"
          >
            &larr; Back
          </button>
          <h2 className="text-xl font-semibold">{selectedSpec} Doctors</h2>
          <DoctorList specialization={selectedSpec} />
        </>
      )}
    </>
  );

  return (
    <>
      <Navbar />
      {isSuccess ? (
        <main className="min-h-screen bg-slate-50 px-5 pb-12 pt-28 text-gray-900">
          <div className="mx-auto max-w-6xl space-y-6">
            <div>
              <p className="text-sm font-medium text-teal-700">
                Portal Pasien
              </p>
              <h1 className="mt-1 text-3xl font-semibold">
                Cari dan booking dokter
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-gray-600">
                Pilih spesialisasi atau cari dokter yang sesuai dengan
                kebutuhan konsultasi Anda.
              </p>
            </div>
            {doctorContent}
          </div>
        </main>
      ) : (
        <>
          <DoctorHero />
          <div className="mx-5 my-5 space-y-6">{doctorContent}</div>
          <Footer />
        </>
      )}
    </>
  );
}
