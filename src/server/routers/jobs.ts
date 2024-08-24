import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { procedure, router } from '../trpc';

const prisma = new PrismaClient();
export const jobsRouter = router({
    getJobTitles: procedure.query(async () => prisma.job_titles.findMany()),
    getPopularJobTitles: procedure.query(async () => {
        try {
            const result = await prisma.$queryRaw<
                {
                    id: string;
                    title: string;
                }[]
            >`
        WITH ranked_titles AS (
          SELECT id, title, pdl_count,
                  ROW_NUMBER() OVER (PARTITION BY title ORDER BY pdl_count DESC) AS rn
          FROM job_titles
        )
        SELECT id, title
        FROM ranked_titles
        WHERE rn = 1
        ORDER BY pdl_count DESC
        LIMIT 10;
      `;
            return result.map((row) => ({
                id: row.id,
                title: row.title,
            }));
        } catch (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }),
    searchJobTitles: procedure
        .input(
            z.object({
                query: z.string(),
            })
        )
        .query(async ({ input }) => {
            const { query } = input;
            try {
                const result = await prisma.job_titles.findMany({
                    where: {
                        title: {
                            contains: query,
                        },
                    },
                });
                return result.map((row) => ({
                    id: row.id,
                    title: row.title,
                }));
            } catch (error) {
                return NextResponse.json(
                    { error: error.message },
                    { status: 500 }
                );
            }
        }),
});
