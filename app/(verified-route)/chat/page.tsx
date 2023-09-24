import MessageHistory from "@/components/chat/messageHistory.component";
import SendMessage from "@/components/chat/sendMessage.component";
import ChatHeader from "@/components/chat/chatHeader.component";
import React, { MouseEvent } from "react";

export default function ChatingPage() {

    return (
        <><>
            <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-full overflow-auto">
                <ChatHeader></ChatHeader>
                <MessageHistory></MessageHistory>
                <SendMessage></SendMessage>
            </div>
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "\n.scrollbar-w-2::-webkit-scrollbar {\n  width: 0.25rem;\n  height: 0.25rem;\n}\n\n.scrollbar-track-blue-lighter::-webkit-scrollbar-track {\n  --bg-opacity: 1;\n  background-color: #f7fafc;\n  background-color: rgba(247, 250, 252, var(--bg-opacity));\n}\n\n.scrollbar-thumb-blue::-webkit-scrollbar-thumb {\n  --bg-opacity: 1;\n  background-color: #edf2f7;\n  background-color: rgba(237, 242, 247, var(--bg-opacity));\n}\n\n.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {\n  border-radius: 0.25rem;\n}\n"
                }}
            />
        </>
        </>
    );
}
