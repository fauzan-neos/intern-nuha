import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/src/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useRegister() {
    return useMutation({
        mutationFn: async (data: { fullname: string; email: string; password: string }) => {
            return await createUser(data.fullname, data.email, data.password);
        }
    });
}