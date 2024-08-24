// import { NextResponse } from 'next/server';

// // Config
// import routes from '@/config/routes.json';

// // Utils
// import { directusFetchClient } from '@/utils/fetch-client';

// export async function POST(request: Request) {
//     const body = await request.json();

//     try {
//         const response = await directusFetchClient.post({
//             input: routes.bookmark,
//             body,
//         });
//         return NextResponse.json(response);
//     } catch (error) {
//         return NextResponse.json({ error });
//     }
// }

// export async function DELETE(request: Request) {
//     const body = await request.json();

//     try {
//         const response = await directusFetchClient.delete({
//             input: routes.bookmark,
//             body,
//         });
//         return NextResponse.json(response);
//     } catch (error) {
//         return NextResponse.json({ error });
//     }
// }
