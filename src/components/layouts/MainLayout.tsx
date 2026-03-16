import { Outlet } from "react-router-dom"

export default function MainLayout() {
    return (
        <div className="min-h-screen">
            <header className="border-b p-4">Header</header>

            <main className="p-4">
                <Outlet />
            </main>

            <footer className="border-t p-4">Footer</footer>
        </div>
    )
}