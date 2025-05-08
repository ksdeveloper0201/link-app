import { auth } from "@/lib/nextauth";
import { SignOutButton } from "./sign-out";

export default async function Home() {
    const user = await auth();
    return (
        <div>
            {JSON.stringify(user)}
            <SignOutButton />
        </div>
    );
}
