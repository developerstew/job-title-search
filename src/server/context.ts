import { db } from '@/server/database';
import { getAuth } from '@clerk/nextjs/server';
import { type NextRequest } from 'next/server';

// type AuthObject = ReturnType<typeof getAuth>;

export const createTRPCContext = async (req: NextRequest) => {
    const auth = getAuth(req);
    return {
        db,
        userId: auth.userId,
        headers: req.headers,
        auth,
    };
};
