"use client";

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-100 text-center">
            <h2 className="text-4xl font-bold mb-4">
                We encountered a 500 error
            </h2>
            <Link
                className="text-blue-500 hover:text-blue-700 underline"
                href="/"
            >
                Return Home
            </Link>
        </div>
    );
}
