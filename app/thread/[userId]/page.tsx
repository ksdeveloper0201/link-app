import { auth } from "@/lib/nextauth";
import { LOGIN_REQUIRE_REDIRECT, LOGIN_SUCCESS_REDIRECT } from "@/routes";
import { getOrCreateThread } from "@/store/thread";
import { getSafeUserById } from "@/store/user";
import { redirect } from "next/navigation";

type MessagePageProps = {
    params: { userId: string };
};

const MessagePage = async ({ params }: MessagePageProps) => {
    const currentUser = await auth();
    if (!currentUser) {
        console.log(currentUser);
        redirect(LOGIN_REQUIRE_REDIRECT);
    }

    const otherUserId = params.userId;
    const otherUser = await getSafeUserById(otherUserId);

    if (!otherUser) {
        redirect(LOGIN_SUCCESS_REDIRECT);
    }

    const thread = await getOrCreateThread(currentUser.id, otherUser.id);
    return (
        <div>
            <div>
                <div>currentUser: {currentUser.name}</div>
                <div>otherUser: {otherUser.name}</div>
                <div>thread: {thread.id}</div>
            </div>
        </div>
    );
};

export default MessagePage;
