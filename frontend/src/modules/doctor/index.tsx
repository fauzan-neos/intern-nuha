"use client";

import { Suspense, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchSpecializations, fetchUser } from "@/src/lib/api";
import Navbar from "@/src/components/navbar";
import DoctorList from "@/src/modules/doctor/components/doctorList";
import DoctorFilter from "@/src/modules/doctor/components/doctorFilter";
import DoctorHero from "@/src/modules/doctor/components/doctorHero";
import Footer from "@/src/components/footer";
import SpecializationList from "@/src/modules/doctor/components/specializationList";
import { Specialization } from "@/src/lib/types";

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-teal-600 font-medium">Memuat portal...</div>}>
      <HomePageContent />
    </Suspense>
  );
}

function HomePageContent() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  // const selectedSpec = searchParams.get("specialization");
  // const initialSpec = searchParams.get("specialization") || "";
  // const [specialization, setSpecialization] = useState(initialSpec);

  const selectedSpec = searchParams.get("specialization") || "";
  const [specialization, setSpecialization] = useState(selectedSpec);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSpecialization(selectedSpec);
  }, [selectedSpec, searchParams]);

  const { isSuccess } = useQuery({
    queryKey: ["auth", "user"],
    queryFn: fetchUser,
    retry: false,
  });

  const { data: specializationList = [] } = useQuery({
    queryKey: ["specializations"],
    queryFn: fetchSpecializations,
  });

  // Ambil nama spesialisasi dari list berdasarkan UUID yang ada di URL
  const currentSpecName = specializationList.find((s: Specialization) => s.uuid === specialization || s.name === specialization)?.name || specialization;

  const doctorContent = (
    <>
      <DoctorFilter 
        search={search} 
        setSearch={setSearch} 
      />
      {!specialization ? (
        search ? (
          <div className="mt-8">
            <h2 className="text-xl text-gray-900 font-semibold mb-2">Hasil Pencarian Dokter : {search}</h2>
            <DoctorList specialization={null} search={search} />
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-gray-900">Pilih Spesialisasi</h2>
            <SpecializationList />
          </>
        )
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => {
                router.replace("/doctor", { scroll: false });
              }}
              className="w-fit text-teal-700 font-medium hover:underline"
            >
              &larr; Kembali ke Semua Spesialisasi
            </button>
            <h2 className="text-xl font-semibold text-gray-900">
              Dokter Spesialis {currentSpecName}
            </h2>
            <DoctorList specialization={specialization} search={search} />
          </div>
        </>
      )}
    </>
  );

  return (
    <>
      <Navbar />
      {isSuccess ? (
        <div>
          <main className="min-h-screen bg-slate-50 px-5 pb-12 pt-28 text-gray-900">
            <div className="mx-auto max-w-6xl space-y-6">
              <div>
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
          <Footer />
        </div>
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
