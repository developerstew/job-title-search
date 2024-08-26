// TODO: Add tests for jobs router

// import { PrismaClient } from "@prisma/client";
// import { mockDeep, mockReset } from "jest-mock-extended";
// import { NextResponse } from "next/server";

// // Utils
// import { serverClient } from "@/app/utils/trpc/serverClient";

// // Router
// import { jobsRouter } from "../routers/jobs";

// jest.mock("@prisma/client", () => ({
//     PrismaClient: jest.fn(),
// }));

// const prismaMock = mockDeep<PrismaClient>();

// beforeEach(() => {
//     mockReset(prismaMock);
// });

// describe("jobsRouter", () => {
//     describe("getPopularJobTitles", () => {
//         it("should return popular job titles", async () => {
//             const mockData = [
//                 { id: "1", title: "Software Engineer" },
//                 { id: "2", title: "Data Scientist" },
//             ];

//             prismaMock.$queryRaw.mockResolvedValue(mockData);

//             const result = await jobsRouter.getPopularJobTitles();

//             expect(result).toEqual(mockData);
//         });

//         it("should handle errors", async () => {
//             const errorMessage = "Database error";
//             prismaMock.$queryRaw.mockRejectedValue(new Error(errorMessage));

//             try {
//                 await jobsRouter.getPopularJobTitles();
//             } catch (error) {
//                 expect(error).toEqual(
//                     NextResponse.json({ error: errorMessage }, { status: 500 })
//                 );
//             }
//         });
//     });
// });
