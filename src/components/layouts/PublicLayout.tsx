import { Outlet } from 'react-router-dom'

export function PublicLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <section className='border-b'>
                <header className="container py-4 mx-auto">Header</header>
            </section>

            <main className="container flex-1 mx-auto">
                <Outlet />
            </main>

            <section className='border-t'>
                <footer className="container py-4 mx-auto">Footer</footer>
            </section>
        </div>
    )
}
