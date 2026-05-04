"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/src/lib/api";

export type AuthUser = {
  id?: number;
  fullname?: string;
  name?: string; // keeping for backward compatibility if any
  email?: string;
  role?: string;
};

export const authUserQueryKey = ["auth", "user"] as const;

export function useAuthUser() {
  return useQuery<AuthUser>({
    queryKey: authUserQueryKey,
    queryFn: fetchUser,
    retry: false,
  });
}
