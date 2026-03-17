import { useAuthStore } from "@/stores/auth.store"
import { useMutation } from "@tanstack/react-query"
import { login } from "../api/auth.api"
import type { LoginFormInputs } from "../schemas/login.schema"
import type { User } from "../types/auth.types"
import { ROUTES } from "@/constants/routes.constant"

export const useLogin = () => {
    const setAuthenticated = useAuthStore((s) => s.setAuthenticated)

    return useMutation<User, unknown, LoginFormInputs>({
        mutationFn: login,

        onSuccess: (user) => {
            setAuthenticated(user)
            window.location.href = ROUTES.TABLE_DEMO
        },
    })
}