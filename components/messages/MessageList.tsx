"use client";

import { useMessageQuery } from "@/hooks/useMessageQuery";
import { Loader2 } from "lucide-react";
import React from "react";

type MessageListProps = {
    threadId: string;
    currentUserId: string;
};

export const MessageList = ({ threadId, currentUserId }: MessageListProps) => {
    const queryKey = ["threadId", `thread:${threadId}`];

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
        useMessageQuery({ queryKey, threadId });

    if (status === "pending") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="h-7 w-7 animate-spin text-zinc-500 my-4" />
                <p className="text-xs text-zinc-500">Loading messages...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-1 overflow-y-auto">
            {!hasNextPage && (
                <div className="flex justify-center text-zinc-500 text-sm p-2">
                    メッセージはありません
                </div>
            )}
            {hasNextPage && (
                <div className="flex flex-col justify-center items-center">
                    {isFetchingNextPage ? (
                        <>
                            <Loader2 className="h-7 w-7 animate-spin text-zinc-500 my-4" />
                            <p className="text-xs text-zinc-500">
                                Loading messages...
                            </p>
                        </>
                    ) : (
                        <button
                            onClick={() => fetchNextPage()}
                            className="text-zinc-500 hover:text-zinc-600 text-xs my-4 transition"
                        >
                            次のメッセージ
                        </button>
                    )}
                </div>
            )}
            <div className="flex flex-col-reverse mt-auto px-2">
                {data?.pages.map((page, i) => (
                    <React.Fragment key={`page-${i}`}>
                        {page.items?.map(
                            (message: any, idx: string | number) => (
                                <div key={`message-${message.id}`}>
                                    <div>
                                        {message.content}
                                        <span>by {message.author.name}</span>
                                        <span>
                                            @{message.createdAt.toISOString()}
                                        </span>
                                    </div>
                                </div>
                            )
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
