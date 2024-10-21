"use client";

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex h-full flex-col items-center justify-center bg-gray-100 text-center">
            <h2 className="mb-4 text-4xl font-bold">
                We encountered a 500 error
            </h2>
            <Link
                className="text-blue-500 underline hover:text-blue-700"
                href="/"
            >
                Return Home
            </Link>
        </div>
    );
}
