import { CircleUser, Ellipsis, SquarePen, Video } from "lucide-react";

const UserInfo = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <CircleUser width={40} height={40} />
        <h1 className=" font-bold text-xl">Mohamed Zidan</h1>
      </div>
      <div className=" flex gap-2 items-center">
        <Ellipsis className=" cursor-pointer" />
        <Video className=" cursor-pointer" />
        <SquarePen className=" cursor-pointer" />
      </div>
    </div>
  );
};

export default UserInfo;
