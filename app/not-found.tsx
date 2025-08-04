import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="h-screen w-screen bg-black text-green-500 font-mono flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold mb-4">404 - Not Found</h2>
            <p className="text-green-400 mb-6">Could not find requested resource</p>
            <Link
                href="/"
                className="border border-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-black transition-colors"
            >
                Return Home
            </Link>
        </div>
    )
}