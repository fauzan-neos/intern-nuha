"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuthUser } from "@/src/modules/auth/hooks/useAuthUser";
import NavLinks from "@/src/components/navbar/NavLinks";
import UserMenu from "./navbar/UserMenu";
import {
  authenticatedNavItems,
  publicNavItems,
} from "@/src/components/navbar/navItems";
import { useNavbarScroll } from "@/src/components/navbar/useNavbarScroll";
import { LOGIN_PAGE_URL } from "@/src/constants/constants";

export default function Navbar() {
  const pathname = usePathname();
  const { isTop, show } = useNavbarScroll();
  const { data: user, isSuccess } = useAuthUser();
  const navItems = isSuccess ? authenticatedNavItems : publicNavItems;

  const [hovered, setHovered] = useState<string | null>(null);
  const [underline, setUnderline] = useState({
    left: 0,
    width: 0,
  });

  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const getActive = () => {
    const found = navItems.find((item) => {
      if (item.href === "/") return pathname === "/";
      return pathname.startsWith(item.href);
    });

    return found?.name || "Beranda";
  };

  const current = hovered ?? getActive();

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

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: show ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 z-50 w-full"
    >
      <div className="absolute inset-0 border-b border-white/10 from-blue-500 to-cyan-600 backdrop-blur-lg" />

      <motion.div
        className="absolute inset-0 bg-linear-to-r from-teal-700 to-teal-800"
        animate={{ opacity: isSuccess || !isTop ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      <div className="relative flex items-center justify-between px-10 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/MedCareLogoGreen.png" alt="logo" width={40} height={40} />
          <span className="mx-1 bg-linear-to-r bg-clip-text text-xl font-bold text-white from-blue-800">
            MedCare
          </span>
        </Link>

        <div className="relative flex items-center gap-8">
          <NavLinks
            navItems={navItems}
            itemRefs={itemRefs}
            underline={underline}
            setHovered={setHovered}
          />

          {isSuccess ? (
            <UserMenu user={user} />
          ) : (
            <Link
              href={LOGIN_PAGE_URL}
              className="ml-4 rounded-md bg-white/90 px-4 py-1 text-black"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
