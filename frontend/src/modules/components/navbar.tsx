"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUser, logout } from "@/src/lib/api";

const navItems = [
  { name: "Beranda", href: "/" },
  { name: "Dokter", href: "/doctor" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isTop, setIsTop] = useState(true);
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);

  const [underline, setUnderline] = useState({
    left: 0,
    width: 0,
  });

  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const { isSuccess } = useQuery({
    queryKey: ["auth", "user"],
    queryFn: fetchUser,
    retry: false,
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["auth", "user"] });
      router.push("/login");
      router.refresh();
    },
  });

  const handleLogout = () => {
    if (logoutMutation.isPending) return;
    logoutMutation.mutate();
  };

  const getActive = () => {
    const found = navItems.find((item) => {
      if (item.href === "/") return pathname === "/";
      return pathname.startsWith(item.href);
    });

    return found?.name || "Beranda";
  };

  const current = hovered ?? getActive();

  // 🔥 update underline posisi
  useEffect(() => {
    const el = itemRefs.current[current];
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const parent = el.parentElement?.getBoundingClientRect();

    if (!parent) return;

    setUnderline({
      left: rect.left - parent.left,
      width: rect.width,
    });
  }, [current]);

  // 🔥 scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setIsTop(scrollY < 50);

      if (scrollY > lastScroll && scrollY > 100) {
        setShow(false);
      } else {
        setShow(true);
      }

      setLastScroll(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: show ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 w-full z-50"
    >
      {/* 🔥 BASE LAYER (transparent + blur) */}
      <div className="absolute inset-0 from-blue-500 to-cyan-600 backdrop-blur-lg border-b border-white/10" />

      {/* 🔥 GRADIENT LAYER (fade in saat scroll) */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-teal-700 to-teal-800"
        animate={{ opacity: isTop ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      {/* 🔥 CONTENT */}
      <div className="relative flex justify-between items-center px-10 py-4">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/MedCareLogoGreen.png" alt="logo" width={40} height={40} />
          <span className=" font-bold text-xl mx-1 bg-gradient-to-r bg-clip-text text-transparent from-blue-800 text-white">
            MedCare
          </span>
        </Link>

        {/* MENU */}
        <div className="relative flex gap-8 items-center">
          {navItems.map((item) => (
            <div
              key={item.name}
              ref={(el) => {
                itemRefs.current[item.name] = el;
              }}
              onMouseEnter={() => setHovered(item.name)}
              onMouseLeave={() => setHovered(null)}
              className="relative cursor-pointer"
            >
              <Link href={item.href} className="text-white font-medium p-2">
                {item.name}
              </Link>
            </div>
          ))}

          {/* 🔥 GLOBAL UNDERLINE */}
          <motion.div
            className="absolute bottom-0 h-[2px] bg-white"
            animate={{
              left: underline.left,
              width: underline.width,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 35,
              mass: 0.5,
            }}
          />

          {isSuccess ? (
            <button
              type="button"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="ml-4 bg-white/90 text-black px-4 py-1 rounded-md disabled:cursor-not-allowed disabled:opacity-70"
            >
              {logoutMutation.isPending ? "Logout..." : "Logout"}
            </button>
          ) : (
            <Link
              href="/login"
              className="ml-4 bg-white/90 text-black px-4 py-1 rounded-md"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
