"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { logout } from "@/src/lib/api";
import { authUserQueryKey } from "@/src/modules/auth/hooks/useAuthUser";

type Options = {
  onSuccess?: () => void;
};

export function useLogout(options: Options = {}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const redirectTo =  "/";

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authUserQueryKey });
      options.onSuccess?.();
      router.push(redirectTo);
      router.refresh();
    },
  });
}
