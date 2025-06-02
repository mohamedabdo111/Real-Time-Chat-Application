"use client";
import { ArrowBigDown, ChevronDown, Minus, Plus, Search } from "lucide-react";
import React, { useRef, useState } from "react";
import Modal from "./ModalGetAllUsers";

const SearchInput = () => {
  const [showModal, setShowModal] = useState(false);
  const Ref = useRef<HTMLInputElement>(null);

  const handleClickSearch = () => {
    if (Ref.current) {
      Ref.current.focus();
    }
  };

  return (
    <>
      <div className=" flex justify-between items-center py-5 border-b-[2px] border-gray-200">
        <div className="flex gap-3 items-end">
          <h1 className="text-xl font-semibold">Messages </h1>
          <ChevronDown />
        </div>

        <div
          className="text-white p-2 rounded-full bg-primary-color cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          {!showModal ? <Plus /> : <Minus />}
        </div>
      </div>
      <div className="flex items-center gap-5 my-2 ">
        <div className="flex items-center flex-1 bg-gray-200 gap-2 px-4 rounded-lg">
          <Search
            className=" cursor-pointer text-gray-400"
            onClick={handleClickSearch}
          />
          <input
            ref={Ref}
            type="text"
            placeholder="Search"
            className="w-full py-[10px] flex-1 border-0 outline-0 "
          ></input>
        </div>

        {showModal && (
          <Modal
            title="Search about users"
            isOpen={showModal}
            setOpen={setShowModal}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </>
  );
};

export default SearchInput;
