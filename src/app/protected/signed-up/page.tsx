import { redirect } from "next/navigation";

// Clerk
import { auth } from "@clerk/nextjs/server";

const SignedUp = async () => {
    const { userId } = auth().protect();

    if (userId) {
        await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/track-sign-up`, {
            method: "POST",
            body: JSON.stringify({ userId }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    return redirect("/");
};

export default SignedUp;
