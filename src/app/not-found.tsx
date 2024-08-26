import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col h-9 items-center justify-center h-full bg-gray-100 text-center">
            <h2 className="text-4xl font-bold mb-4">Not Found</h2>
            <p className="text-lg mb-6">Could not find requested resource</p>
            <Link
                className="text-blue-500 hover:text-blue-700 underline"
                href="/"
            >
                Return Home
            </Link>
        </div>
    );
}
