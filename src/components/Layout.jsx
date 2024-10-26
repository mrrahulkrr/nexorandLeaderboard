import { Navbar } from "./Navbar";

export function Layout({children}){
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto py-6 px-4">
                {children}
            </main>
        </div>
    )
}