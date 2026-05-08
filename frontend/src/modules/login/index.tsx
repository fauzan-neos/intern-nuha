"use client";

import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loginSchema } from "./utils/validation";
import { useLogin } from "./hooks/useLogin";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NotificationModal from "../components/NotificationModal";

type FormValues = z.infer<typeof loginSchema> 

export default function LoginForm() {
    const router = useRouter();
    const [modal, setModal] = useState({
        isOpen: false,
        type: "success" as "success" | "error",
        title: "",
        message: "",
    });

    const { register, handleSubmit, formState: {errors} } = useForm<FormValues>({
        resolver: zodResolver(loginSchema)
    });
    
    const {mutate, isPending} = useLogin();

    const onSubmit = (data: FormValues) => {
      mutate(data, {
        onSuccess: (res) => {
            setModal({
                isOpen: true,
                type: "success",
                title: "Login Berhasil",
                message: res.data.message || "Selamat datang kembali!",
            });
            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);
        },
        onError: (err) => {
            setModal({
                isOpen: true,
                type: "error",
                title: "Login Gagal",
                message: err.message || "Email atau password salah.",
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

                    <h2 className="text-2xl font-semibold mb-2 text-gray-800">Selamat Datang</h2>
                    <p className="text-sm text-gray-500 mb-6">
                    Masuk untuk mengakses portal pasien, jadwal dokter, dan rekam medis Anda.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit) }>
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

                        <button
                            type="submit"
                            className="w-full bg-teal-700 text-white py-2 rounded-md mb-2"
                        >
                            {isPending ? "loading..." : "Masuk"}
                        </button>

                        <p className="text-sm text-center text-gray-500">
                            Belum punya akun?
                            <Link href="/register" className="text-teal-600 font-medium mx-1">
                            Daftar sekarang
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}