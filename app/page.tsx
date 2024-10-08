// Clerk
import { SignInButton, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

// Components
import { SignIn } from "./components/specific/clerk/sign-in";

// Utils
import { serverClient } from "./utils/trpc/serverClient";

export default async function Home() {
    const popularJobTitles = await serverClient.jobs.getSampleJobTitles();
    const { userId } = auth();

    return (
        <article className="flex flex-col items-center justify-center flex-1">
            <div className="bg-white p-10 flex flex-col rounded shadow-md max-w-lg w-full">
                <SignIn isAuthenticated={userId !== null} />

                <SignedOut>
                    <SignInButton />
                </SignedOut>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Popular Job Titles</h2>
                <ul className="list-disc list-inside">
                    {popularJobTitles.map((job) => (
                        <li key={job.id} className="text-lg">
                            {job.title}
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
}
