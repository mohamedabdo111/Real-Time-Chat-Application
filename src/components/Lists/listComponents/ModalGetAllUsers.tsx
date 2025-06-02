"use client";
import React from "react";
import { User2, X } from "lucide-react";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UseCurrentUser } from "@/lib/useState";
import { IUser, IUSerSearch, IUserState } from "@/interfaces/interfaces";
import Image from "next/image";
import usreProfile from "../../../../public/person.png";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, setOpen }) => {
  if (!isOpen) return null;
  const { currentUser } = UseCurrentUser() as IUserState;
  const [user, setUser] = React.useState<IUSerSearch | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [createClick, setCreateClick] = React.useState(false);
  const [search, setSearch] = React.useState<string>("");

  const onSubmitSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userRef = collection(db, "users");

      // Create a query against the collection.
      const q = query(userRef, where("userName", "==", search));
      const userThatSearch = await getDocs(q);
      if (!userThatSearch.empty) {
        setUser(userThatSearch.docs[0].data() as IUSerSearch);
      }
    } catch (error) {
      console.log("errorrr", error);
    }
  };

  const createChat = async () => {
    setCreateClick(true);

    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userChats");
    try {
      setLoading(true);
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, currentUser.uid), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user?.uid,
          updateedAt: Date.now(),
        }),
      });
      await updateDoc(doc(userChatsRef, user?.uid), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.uid,
          updateedAt: Date.now(),
        }),
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setCreateClick(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black opacity-60 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative  rounded-lg bg-white p-6 w-full max-w-md mx-4 shadow-xl transform transition-all border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold ">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
            {/* kk */}
          </button>
        </div>

        <div>
          <form className="mb-4 flex gap-2" onSubmit={onSubmitSearch}>
            <input
              className="w-full rounded-full flex-4 border border-gray-200 py-1 px-4"
              placeholder="Search about user"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
            <button
              type="submit"
              className="text-primary-color bg-blue-100   hover:bg-gray-100 flex-1 rounded-full transition-colors cursor-pointer capitalize border py-1 px-4 border-gray-200 "
            >
              search
            </button>
          </form>

          <div className="flex flex-col gap-3">
            <p className="font-semibold text-lg">Search Result</p>

            {user && Object.keys(user).length > 0 && (
              <div className=" flex justify-between">
                <div className="flex gap-3 items-center">
                  <Image
                    src={usreProfile}
                    width={40}
                    height={40}
                    alt="avatar"
                  ></Image>
                  <p>{(user as IUser).userName}</p>
                </div>
                <button
                  className="text-primary-color bg-blue-100 hover:bg-gray-100 rounded-full transition-colors cursor-pointer capitalize border py-1 px-6 border-gray-200"
                  type="button"
                  onClick={createChat}
                  disabled={createClick && loading}
                >
                  {createClick && loading ? "Loading..." : "Create Chat"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
