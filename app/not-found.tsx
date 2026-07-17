import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="h-screen w-screen bg-brand-midnight text-brand-lime font-mono flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold mb-4">404 - Not Found</h2>
            <p className="text-brand-frost mb-6">Could not find requested resource</p>
            <Link
                href="/"
                className="border border-brand-lime px-4 py-2 rounded hover:bg-brand-lime hover:text-brand-forest transition-colors"
            >
                Return Home
            </Link>
        </div>
    )
}