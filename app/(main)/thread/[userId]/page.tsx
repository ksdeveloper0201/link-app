import { MessageHeader } from "@/components/message/MessageHeader";
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

    console.log("params.userId", params.userId);

    const otherUserId = params.userId;
    const otherUser = await getSafeUserById(otherUserId);

    if (!otherUser) {
        redirect(LOGIN_SUCCESS_REDIRECT);
    }

    const thread = await getOrCreateThread(currentUser.id, otherUser.id);
    return (
        <div className="flex flex-col h-full">
            <MessageHeader otherUser={otherUser} />
            <div className="grow">メッセージ一覧</div>
            <div className="flex items-center justify-center bg-blue-100 py-2">
                メッセージ入力コンポーネント（予定）
            </div>
        </div>
    );
};

export default MessagePage;
