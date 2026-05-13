"use client";

import { RefObject } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { NavItem } from "@/src/components/navbar/navItems";

type Props = {
  navItems: NavItem[];
  itemRefs: RefObject<Record<string, HTMLDivElement | null>>;
  underline: {
    left: number;
    width: number;
  };
  setHovered: (value: string | null) => void;
};

export default function NavLinks({
  navItems,
  itemRefs,
  underline,
  setHovered,
}: Props) {
  return (
    <>
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
          <Link href={item.href} className="p-2 font-medium text-white">
            {item.name}
          </Link>
        </div>
      ))}

      <motion.div
        className="absolute bottom-0 h-0.5 bg-white"
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
    </>
  );
}
