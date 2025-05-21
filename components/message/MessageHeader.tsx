import { SafeUser } from "@/types/prisma";
import { MobileToggleSidebar } from "../navigation/MobileToggleSidebar";

type MessageHeaderProps = {
    otherUser: SafeUser;
};

export const MessageHeader = ({ otherUser }: MessageHeaderProps) => {
    return (
        <header className="h-14 bg-emerald-400/90 text-white flex items-center space-x-2 px-2 w-full shadow-md">
            <MobileToggleSidebar />
            <h2 className="ml-4 font-semibold text-2xl">@ {otherUser.name}</h2>
        </header>
    );
};
