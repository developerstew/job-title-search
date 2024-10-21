import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex h-full flex-col items-center justify-center bg-gray-100 text-center">
            <h2 className="mb-4 text-4xl font-bold">Not Found</h2>
            <p className="mb-6 text-lg">Could not find requested resource</p>
            <Link
                className="text-blue-500 underline hover:text-blue-700"
                href="/"
            >
                Return Home
            </Link>
        </div>
    );
}
