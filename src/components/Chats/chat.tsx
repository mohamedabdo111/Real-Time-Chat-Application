import React from "react";
import ChatHeader from "./chatComponents/chatHeader";
import ChatContent from "./chatComponents/chatContent";
import ChatFooter from "./chatComponents/chatFooter";
const ChatMessages = () => {
  return (
    <div className="flex flex-col border-r-[1px] border-gray-400 px-2 overflow-auto flex-2 py-4">
      <ChatHeader />
      <ChatContent />
      <ChatFooter />
    </div>
  );
};

export default ChatMessages;
