"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AuthUser } from "@/src/modules/auth/hooks/useAuthUser";
import { useLogout } from "@/src/modules/auth/hooks/useLogout";

type Props = {
  user?: AuthUser;
};

export default function UserMenu({ user }: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const logoutMutation = useLogout({
    redirectTo: "/",
    onSuccess: () => setIsDropdownOpen(false),
  });

  const getUserInitial = () => {
    const email = user?.email;
    if (!email) return "U";
    return email.charAt(0).toUpperCase();
  };

  const handleLogout = () => {
    if (logoutMutation.isPending) return;
    logoutMutation.mutate();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative ml-4">
      <button
        type="button"
        onClick={() => setIsDropdownOpen((value) => !value)}
        className="flex size-10 items-center justify-center rounded-full bg-white/90 text-sm font-semibold text-teal-800 ring-2 ring-white/30 transition hover:bg-white"
        aria-expanded={isDropdownOpen}
        aria-haspopup="menu"
      >
        {getUserInitial()}
      </button>

      {isDropdownOpen && (
        <div
          role="menu"
          className="absolute right-0 mt-3 w-44 rounded-md border border-gray-200 bg-white py-2 text-sm text-gray-700 shadow-lg"
        >
          <Link
            href="/dashboard"
            role="menuitem"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            Profile
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {logoutMutation.isPending ? "Logout..." : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
}
