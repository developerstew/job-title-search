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
                        className={`flex flex-col min-h-screen ${inter.className}`}
                    >
                        <header className="w-full flex justify-between items-center py-10 bg-blue-600 text-white px-10">
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

                        <main className="flex-grow pt-10 bg-gray-100 w-full">
                            {children}
                        </main>

                        <footer className="w-full text-center py-4 bg-blue-600 text-white mt-auto">
                            <p>&copy; 2023 Our App. All rights reserved.</p>
                        </footer>
                    </body>
                </html>
            </Provider>
        </ClerkProvider>
    );
}