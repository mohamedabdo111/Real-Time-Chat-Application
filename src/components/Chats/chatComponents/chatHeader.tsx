import { CircleUser, Ellipsis, SquarePen, Video } from "lucide-react";

const ChatHeader = () => {
  return (
    <div className="flex justify-between items-center border-b-[1px] border-gray-400 pb-2 ">
      <div className="flex gap-2 items-center">
        <CircleUser width={40} height={40} />
        <div className="flex flex-col ">
          <h1 className=" font-semibold text-lg">Mohamed Zidan</h1>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      </div>
      <div className=" flex gap-4 items-center">
        <Ellipsis className=" cursor-pointer" />
        <Video className=" cursor-pointer" />
        <SquarePen className=" cursor-pointer" />
      </div>
    </div>
  );
};

export default ChatHeader;
