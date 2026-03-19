import { AdminLayout, adminMenu } from "@/components/layouts/admin"
import { PublicLayout } from "@/components/layouts/public/public-layout"
import { AuthGuard } from "@/components/shared/auth-guard"
import { ROUTES } from "@/constants/routes.constant"
import { RoleEnum } from "@/enums/role.enum"
import { LoginPage } from "@/features/auth/pages/LoginPage"
import { DataTableDemoPage } from "@/features/data-table-demo/components/DataTableDemoPage"
import { FormComponentsDemoPage } from "@/features/form-demo/components/form-components-demo-page"
import NotFoundPage from "@/pages/NotFoundPage"
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
    {
        element: <PublicLayout />,
        children: [
            {
                path: ROUTES.ROOT,
                element: <div>Home</div>,
            },
            {
                path: ROUTES.NOT_FOUND,
                element: <NotFoundPage />,
            },
            {
                path: ROUTES.UNAUTHORIZED,
                element: <div>Unauthorized</div>,
            },
            {
                path: ROUTES.FORM_COMPONENTS_DEMO,
                element: <FormComponentsDemoPage />,
            },
            {
                path: ROUTES.AUTH.LOGIN,
                element: <LoginPage />,
            },
        ]
    },
    {
        element: <AdminLayout menu={adminMenu} />,
        children: [
            {
                element: <AuthGuard allowedRoles={[RoleEnum.USER]} />,
                children: [
                    {
                        path: ROUTES.TABLE_DEMO,
                        element: <DataTableDemoPage />,
                    },
                ]
            }
        ]
    },
    {
        element: <PublicLayout />,
        children: [
            {
                element: <AuthGuard allowedRoles={[RoleEnum.USER]} />,
                children: [
                    {
                        path: ROUTES.TABLE_DEMO,
                        element: <DataTableDemoPage />,
                    },
                ]
            }
        ]
    },
    {
        element: <AuthGuard />,
        children: [
            {
                path: ROUTES.USER.DASHBOARD,
                element: <div>Dashboard</div>,
            },
        ],
    }
])

export default router
