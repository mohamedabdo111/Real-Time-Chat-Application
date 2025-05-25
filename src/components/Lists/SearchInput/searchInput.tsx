"use client";
import { Minus, Plus, Search } from "lucide-react";
import React, { useRef, useState } from "react";

const SearchInput = () => {
  const [add, setAdd] = useState(true);
  const Ref = useRef<HTMLInputElement>(null);

  const handleClickSearch = () => {
    if (Ref.current) {
      Ref.current.focus();
    }
  };

  return (
    <div className="flex items-center gap-5 my-4 ">
      <div className="flex items-center flex-1 searchParent gap-2 px-4 py-2 rounded-xl">
        <Search className=" cursor-pointer" onClick={handleClickSearch} />
        <input
          ref={Ref}
          type="text"
          placeholder="Search"
          className="w-full rounded-full flex-1 border-0 outline-0 "
        ></input>
      </div>

      <div
        className="searchParent p-2 rounded-xl cursor-pointer"
        onClick={() => setAdd((prev) => !prev)}
      >
        {add ? <Plus /> : <Minus />}
      </div>
    </div>
  );
};

export default SearchInput;
