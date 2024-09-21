"use server";

import { NextResponse } from "next/server";

// Utils
import { helpers } from "@/app/utils/trpc/serverClient";

export async function GET(
    _: unknown,
    { params }: { params: { query: string } }
) {
    const { query } = params;
    console.log(query, "QUERYGG");
    try {
        const test = await helpers.jobs.searchJobTitles.fetch({ query });
        console.log(test, "TGEST");
        // const response = await serverClient.jobs.searchJobTitles({ query });
        return NextResponse.json([]);
    } catch (error) {
        return NextResponse.json({ error });
    }
}
