// TODO: Add some tests here
// import type { inferProcedureInput } from "@trpc/server";
// import { createContextInner } from "../context";
// import type { AppRouter } from "./_app";
// import { createCaller } from "./_app";

// test("search job titles", async () => {
//     const ctx = await createContextInner({});
//     const caller = createCaller(ctx);

//     const input: inferProcedureInput<AppRouter["jobs"]["searchJobTitles"]> = {
//         query: "Engineer",
//     };

//     const result = await caller.jobs.searchJobTitles(input);

//     expect(result).toEqual(
//         expect.arrayContaining([
//             expect.objectContaining({
//                 title: expect.stringContaining("Engineer"),
//             }),
//         ])
//     );
// });
