import { Outlet } from 'react-router-dom'
import { Footer } from '../footer/Footer'
import { PublicHeader } from '../header/PublicHeader'

export function PublicLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <PublicHeader />

            <main className="container px-4 flex-1 mx-auto">
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}
