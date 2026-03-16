import { useMutation } from "@tanstack/react-query"
import { logout } from "../api/auth.api"
import { useAuthStore } from "@/stores/auth.store"

export const useLogout = () => {
    const setUnauthenticated = useAuthStore((s) => s.setUnauthenticated)

    return useMutation({
        mutationFn: logout,
        onSuccess: setUnauthenticated,
        onError: setUnauthenticated
    })
}