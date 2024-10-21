import { redirect } from "next/navigation";

// Clerk
import { SignedOut, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

// Utils
import { clientHelpers } from "./utils/trpc/serverClient";

export default async function Home() {
    const client = await clientHelpers();
    const popularJobTitles = await client.jobs.getSampleJobTitles.fetch();
    const { userId } = auth();

    if (userId !== null) {
        redirect("/protected/search");
    }

    return (
        <article className="flex flex-1 flex-col items-center justify-center">
            <div className="flex w-full max-w-lg flex-col rounded bg-white p-10 shadow-md">
                <SignedOut>
                    <SignUpButton mode="modal" />
                </SignedOut>
            </div>

            <div className="mt-8">
                <h2 className="mb-4 text-2xl font-bold">Popular Job Titles</h2>
                <ul className="list-inside list-disc">
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
