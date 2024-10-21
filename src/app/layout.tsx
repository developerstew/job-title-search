import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

// Clerk
import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";

// Trpc
import Provider from "@/src/app/providers/trpc";

// Styles
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Job Title Search",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <ClerkProvider>
            <Provider>
                <html lang="en" className="h-full">
                    <body
                        className={`flex min-h-screen flex-col ${inter.className}`}
                    >
                        <header className="flex w-full items-center justify-between bg-blue-600 px-10 py-10 text-white">
                            <div className="flex-grow text-center">
                                <h1 className="text-4xl font-bold">
                                    Welcome to Our App
                                </h1>
                                <p className="mt-2 text-lg">
                                    Your one-stop solution for job searching
                                </p>
                            </div>

                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </header>

                        <main className="w-full flex-grow bg-gray-100 pt-10">
                            {children}
                        </main>

                        <footer className="mt-auto w-full bg-blue-600 py-4 text-center text-white">
                            <p>&copy; 2023 Our App. All rights reserved.</p>
                        </footer>
                    </body>
                </html>
            </Provider>
        </ClerkProvider>
    );
}
