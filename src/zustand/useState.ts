import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../lib/firebase";

export const UseCurrentUser = create((set) => ({
  currentUser: null,
  loading: true,
  fetchCurrentUser: async (uid: string) => {
    console.log(uid);
    if (!uid || uid === "") return set({ currentUser: null, loading: false });

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), loading: false });
      }
    } catch (error) {
      set({ currentUser: null, loading: false });
    }
  },
}));
