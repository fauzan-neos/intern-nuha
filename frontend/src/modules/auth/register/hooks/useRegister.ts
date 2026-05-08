import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/src/lib/api";

export function useRegister() {
    return useMutation({
        mutationFn: async (data: { fullname: string; email: string; password: string }) => {
            return await createUser(data.fullname, data.email, data.password);
        }
    });
}