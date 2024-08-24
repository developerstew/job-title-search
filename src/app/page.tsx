// Components
import { SignIn } from '@/app/components/specific/clerk/sign-in';
// Utils
// import { serverClient } from '@/app/utils/trpc/serverClient';
import { SignedOut } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';

export default async function Home() {
    // const handleSignIn = async () => {
    //     await signIn.redirectToSignIn();
    // };
    const { userId } = auth();

    // const jobTitles = await serverClient.jobs.getJobTitles();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {/* TODO: Add 404 page */}
            <SignedOut>
                <div className="flex flex-col items-center justify-center">
                    {/* TODO: Figure out custom sign in */}
                    {/* <SignInButton /> */}
                    <h1>You need to sign in to use this app</h1>
                </div>
            </SignedOut>

            <SignIn isAuthenticated={userId !== null} />
        </main>
    );
}
