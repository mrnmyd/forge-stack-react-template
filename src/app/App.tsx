import { RouterProvider } from "react-router-dom"
import router from "@/app/router/router"
import QueryProvider from "@/app/providers/query.provider"
import { useAuthSession } from "@/hooks/useAuthSession"
import { Toaster } from "@/components/ui/sonner"

export default function App() {

  useAuthSession()

  return (
    <QueryProvider>
      <Toaster position="top-center" />
      <RouterProvider router={router} />
    </QueryProvider>
  )
}
