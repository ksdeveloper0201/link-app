import { auth } from "@/lib/nextauth";
import { SignOutButton } from "./sign-out";
import { Header } from "@/components/navigation/Header";

export default async function Home() {
    const user = await auth();

    return (
        <div>
            <Header />
            <div>{user?.name}</div>
            <SignOutButton />
        </div>
    );
}
