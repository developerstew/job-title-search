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
        <article className="flex flex-col items-center justify-center flex-1">
            <div className="bg-white p-10 flex flex-col rounded shadow-md max-w-lg w-full">
                <SignedOut>
                    <SignUpButton mode="modal" />
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
