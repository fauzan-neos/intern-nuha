"use client";

import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/src/modules/auth/register/utils/validation";
import { useRegister } from "@/src/modules/auth/register/hooks/useRegister";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NotificationModal from "@/src/components/NotificationModal";
import { LOGIN_PAGE_URL } from "@/src/constants/constants";

type FormValues = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
    const router = useRouter();
    const [modal, setModal] = useState({
        isOpen: false,
        type: "success" as "success" | "error",
        title: "",
        message: "",
    });

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
      resolver: zodResolver(RegisterSchema)
    });

    const {mutate, isPending} = useRegister();

    const onSubmit = (data: FormValues) => {
      mutate(data, {
        onSuccess: () => {
            setModal({
                isOpen: true,
                type: "success",
                title: "Registrasi Berhasil",
                message: "Akun Anda telah berhasil dibuat. Silakan masuk.",
            });
            setTimeout(() => {
                router.push(LOGIN_PAGE_URL);
            }, 2000);
        },
        onError: () => {
            setModal({
                isOpen: true,
                type: "error",
                title: "Registrasi Gagal",
                message: "Gagal membuat akun. Silakan coba lagi.",
            });
        }
      });
    };

    return (
    <div className="min-h-screen flex">
      <NotificationModal
          isOpen={modal.isOpen}
          onClose={() => setModal({ ...modal, isOpen: false })}
          type={modal.type}
          title={modal.title}
          message={modal.message}
          showCloseButton={modal.type === "error"}
      />
      
      <div className="hidden md:flex w-1/2 relative">
        <Image
          src="/hospital_auth.jpg"
          alt="Hospital"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* overlay optional */}
        <div className="absolute inset-0 bg-black/70" />

        {/* optional text overlay */}
        <div className="absolute bottom-10 left-10 text-white">
          <h2 className="text-xl font-semibold">
          Layanan Kesehatan Terpercaya
          </h2>
          <p className="text-sm opacity-80">
          Perawatan berkualitas untuk keluarga Anda
          </p>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 bg-white p-10 flex flex-col justify-center">
        <div className="space-y-4 w-2/3 align-items-center mx-auto">
          <div className="flex items-center gap-2">
            <Image src="/MedCareLogoGreen.png" alt="logo" width={40} height={40} />
            <span className=" font-bold text-xl mx-1 bg-linear-to-r bg-clip-text text-transparent from-teal-600 to-teal-700">
                MedCare
            </span>
          </div>

          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Daftar Akun</h2>
          <p className="text-sm text-gray-500 mb-6">
            Silakan isi detail Anda untuk mendaftar akun pasien baru.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">Nama Lengkap</label>
              <input
              type="text"
              placeholder="Masukkan nama lengkap Anda"
              className="text-black placeholder:text-gray-400 mt-1 w-full border px-3 py-2 rounded-md border-black bg-black/10"
              {...register("fullname")}
              />
              {errors.fullname && <p className="text-red-500 text-sm mt-1">{errors.fullname.message}</p>}
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
              type="email"
              placeholder="name@email.com"
              className="text-black placeholder:text-gray-400 mt-1 w-full border px-3 py-2 rounded-md border-black bg-black/10"
              {...register("email")}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
              type="password"
              placeholder="Password"
              className="text-black placeholder:text-gray-400 mt-1 w-full border px-3 py-2 rounded-md border-black bg-black/10"
              {...register("password")}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>} 
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">Konfirmasi Password</label>
              <input
              type="password"
              placeholder="Konfirmasi Password"
              className="text-black placeholder:text-gray-400 mt-1 w-full border px-3 py-2 rounded-md border-black bg-black/10"
              {...register("confirmPassword")}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <button
              disabled = {isPending}
              type="submit"
              className="w-full bg-teal-700 text-white py-2 rounded-md mb-2"
            >
              {isPending ? "loading..." : "Daftar Akun"}
            </button>

            <p className="text-sm text-center text-gray-500">
              Sudah punya akun?{" "}
              <Link href={LOGIN_PAGE_URL} className="text-teal-600 font-medium">
                Masuk sekarang
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}