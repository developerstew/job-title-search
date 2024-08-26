import { NextResponse } from "next/server";

// Utils
import { serverClient } from "@/app/utils/trpc/serverClient";

export async function GET(_, { params }: { params: { query: string } }) {
    const { query } = params;

    try {
        const response = await serverClient.jobs.searchJobTitles({
            query,
        });
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ error });
    }
}
