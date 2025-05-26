"use client";
import EmojiPicker from "emoji-picker-react";
import { Camera, ImagePlus, Mic, SmilePlus } from "lucide-react";
import React from "react";

const ChatFooter = () => {
  const [show, setShow] = React.useState(false);

  const [text, setText] = React.useState("");

  console.log(text);
  return (
    <div className="border-t-[1px] border-gray-400 pt-2 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <ImagePlus />
        <Camera />
        <Mic />
      </div>
      <div className="flex-2">
        <input
          type="text"
          placeholder="Type a message"
          className="w-full searchParent gap-2 px-4 py-2 rounded-xl flex-1 border-0 outline-0 searchParent"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <SmilePlus
            className="cursor-pointer relative"
            onClick={() => setShow((prev) => !prev)}
          />

          <div className="absolute bottom-[50px] right-0 ">
            <EmojiPicker
              open={show}
              onEmojiClick={(e) => setText((prev) => prev + e.emoji)}
            />
          </div>
        </div>

        <button
          className=" gap-2 px-4 py-2 rounded-xl cursor-pointer bg-blue-500"
          type="submit"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatFooter;
