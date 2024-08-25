// TODO: Create custom sign in, component temporarily just for redirect
"use client";

// Components
import { useSignIn } from "@clerk/nextjs";

// Router
import { useRouter } from "next/navigation";
import React from "react";

// Types
interface SignInProps {
    isAuthenticated: boolean;
}

export const SignIn: React.FC<SignInProps> = ({ isAuthenticated }) => {
    // Router
    const router = useRouter();
    const { signIn } = useSignIn();

    // const handleSignIn = async () => {
    //     return signIn;
    // };

    if (isAuthenticated) {
        router.push("/protected/search");
    } else {
        return (
            <h2 className="text-2xl font-semibold mb-4 text-center">
                You need to sign in to use this app
            </h2>
        );
        // return <Button onClick={handleSignIn} copy="ss" />;
    }
};
