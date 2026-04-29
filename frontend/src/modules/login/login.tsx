"use client";

import Link from "next/link";
// import { useState } from "react";
import { loginUser } from "@/src/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

type FormValues = z.infer<typeof FormSchema> & {
    email: string;
    password: string;
};

const FormSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

export default function LoginForm() {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const router = useRouter();
    const { register, handleSubmit } = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });
    
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const res = await loginUser(data.email, data.password);

            if (!res.ok) {
                // localStorage.removeItem("token");
                toast.error(res.data.message);
                router.push("/login");
                return;
            }

            // localStorage.setItem("token", res.data.token);
            
            toast.success("Login successful!");

            setTimeout(() => {
                router.push("/dashboard");
            }, 1000);

        } catch (error) {
            toast.error("Login failed:" + error);
            }
        }

    return (
        <div className="flex flex-col justify-center px-6 py-12 bg-black min-w-32">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">   
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">Email address</label>
                    <div className="mt-2">
                    <input {...register("email")} id="email" type="email" name="email" required className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-100 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                    <span className="text-red-500 text-sm">{}</span>
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">Password</label>
                    </div>
                    <div className="mt-2">
                    <input {...register("password")} id="password" type="password" name="password" required className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-100 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign in</button>
                </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-400">
                Not have an account?
                <Link href="/register" className="font-semibold text-indigo-400 hover:text-indigo-300"> Sign up</Link>
                </p>
            </div>
        </div>
    );
}