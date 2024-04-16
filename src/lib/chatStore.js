import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/auth";

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  changeChat: (chatId, user) => {
    set({
      chatId,
      user,
    });
  },
}));
