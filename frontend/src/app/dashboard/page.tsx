"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUser } from "@/src/lib/api";

interface User {
    role: string;
}

export default function DashboardPage() {

    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        // const token = localStorage.getItem("token");
        // if () {
        //     router.push("/login");
        // } 

        fetchUser()
        .then((data) => setUser(data))
        .catch((err) => {
            console.error("Error fetching user data:", err);
            router.push("/login");
        });
    }, [router]);

    if (!user) {
        return <div>Loading...</div>;
    }

    
       
    return (
            <div className="min-h-full">
                {user.role === "admin" ? (
                    <header className="relative bg-gray-800 after:pointer-events-none after:absolute after:inset-x-0 after:inset-y-0 after:border-y after:border-white/10">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-white">Admin Dashboard</h1>
                        </div>
                    </header>
                ) : (
                    <header className="relative bg-gray-800 after:pointer-events-none after:absolute after:inset-x-0 after:inset-y-0 after:border-y after:border-white/10">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-white">User Dashboard</h1>
                        </div>
                    </header>
                )}
                <main>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    
                    </div>
                </main>
            </div>

    );
}