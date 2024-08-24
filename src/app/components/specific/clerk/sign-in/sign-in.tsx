'use client';

// Components
import { Button } from '@/app/components/global/button';
import { useSignIn } from '@clerk/nextjs';
// Router
import { useRouter } from 'next/navigation';
import React from 'react';

// Types
interface SignInProps {
    isAuthenticated: boolean;
}

export const SignIn: React.FC<SignInProps> = ({ isAuthenticated }) => {
    // Router
    const router = useRouter();
    const { signIn } = useSignIn();

    if (isAuthenticated) {
        router.push('/protected/search');
    }

    const handleSignIn = async () => {
        await signIn?.create;
    };

    return <Button onClick={handleSignIn} copy="ss" />;
};
