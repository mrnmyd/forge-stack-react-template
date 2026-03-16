import { RouterProvider } from "react-router-dom"
import router from "@/app/router/router"
import QueryProvider from "@/app/providers/query.provider"
import { useAuthSession } from "@/hooks/useAuthSession"

export default function App() {

  useAuthSession()

  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  )
}
