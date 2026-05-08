import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/src/lib/api";

export function useLogin() {
    return useMutation({
        mutationFn: async (data: {email: string, password: string}) => {
            return await loginUser(data.email, data.password)
        }
    })
}