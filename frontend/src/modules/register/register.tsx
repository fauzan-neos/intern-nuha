"use client";

import Link from "next/link";
// import { useState } from "react";
import { createUser } from "@/src/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
    fullname: string;
    email: string;
    password: string;
};

export default function RegisterForm() {
        // const [fullname, setFullname] = useState("");
        // const [email, setEmail] = useState("");
        // const [password, setPassword] = useState("");
        const { register, handleSubmit } = useForm<FormValues>();
        const router = useRouter();
        // console.log(email);
        console.log(register("fullname"));
        
        // const handleRegister = async (e: React.SubmitEvent) => {
        //     e.preventDefault();

        //     try {
        //         const res = await register(fullname, email, password);

        //         if (!res.ok) {
        //             toast.error(res.data.message);

        //             if (res.data.message == "Email already exists, log in instead") {
        //                 setTimeout(() => {
        //                     router.push("/login");
        //                 }, 1000);
        //             }

        //             return;
        //         }

        //         toast.success(res.data.message);

        //         setTimeout(() => {
        //             router.push("/login");
        //         }, 1000);

        //     } catch (error) {
        //         toast.error("Registration failed:" + error);
        //     }
        // }

        const onSubmit: SubmitHandler<FormValues> = async (data) => {
            try {
                console.log(data);
                
                const res = await createUser(data.fullname, data.email, data.password);

                if (!res.ok) {
                    toast.error(res.data.message);

                    if (res.data.message == "Email already exists, log in instead") {
                        setTimeout(() => {
                            router.push("/login");
                        }, 1000);
                    }

                    return;
                }

                toast.success(res.data.message);

                setTimeout(() => {
                    router.push("/login");
                }, 1000);

            } catch (error) {
                toast.error("Registration failed:" + error);
            }
        }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">     
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign up to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-6">
            <div>
                <label htmlFor="fullname" className="block text-sm/6 font-medium text-white">Your Fullname</label>
                <div className="mt-2">
                <input {...register("fullname")} id="fullname" type="text" name="fullname" required className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-100 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-white">Email address</label>
                <div className="mt-2">
                <input {...register("email")} id="email" type="email" name="email" required className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-100 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-white">Password</label>
                </div>
                <div className="mt-2">
                <input {...register("password")} id="password" type="password" name="password" required className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-100 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                </div>
            </div>

            <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign up</button>
            </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-400">
            Already have an account?
            <Link href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300"> Sign in</Link>
            </p>
        </div>
        </div>

    );
}