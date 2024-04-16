"use client";

import { db } from "@/lib/firebase/auth";
import {
  onSnapshot,
  doc,
  getDoc,
  collection,
  Timestamp,
  updateDoc,
  setDoc,
  arrayUnion,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useUserStore } from "@/lib/userStore";
import { useChatStore } from "@/lib/chatStore";

export default function ChatList() {
  const [chats, setChats] = useState();

  const { currentUser } = useUserStore();
  const { changeChat, user } = useChatStore();

  console.log(currentUser);

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userChats", currentUser.id),
      async (res) => {
        const items = res.data().chats;
        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "user", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();
          return { ...item, user };
        });

        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => unSub();
  }, []);

  const handleSearch = () => {};

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const usersChatRef = collection(db, "userChats");

    try {
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: Timestamp.fromDate(new Date()),
      });

      await updateDoc(doc(usersChatRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Timestamp.fromDate(new Date()),
        }),
      }),
        await updateDoc(doc(usersChatRef, currentUser.id), {
          chats: arrayUnion({
            chatId: newChatRef.id,
            lastMessage: "",
            receiverId: user.id,
            updatedAt: Timestamp.fromDate(new Date()),
          }),
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    const userChatsRef = doc(db, "userChats", currentUser.id);
    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w">
      <div className="search">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
          className="bg-transparent border border-gray-500 outline-none rounded-md p-2 text-sm text-white w-full"
        />
      </div>
      <div className="items mt-4">
        {chats?.map((chat) => (
          <>
            <div
              className="item flex items-center cursor-pointer gap-2"
              key={chat.chatId}
              onClick={handleSelect(chat.chatId)}
            >
              <img
                src={chat.user.avatar}
                className="w-10 h-10 rounded-md object-cover"
              />

              <div className="texts">
                <span className="text-white text-sm leading-2">
                  {chat.user.firstName} {chat.user.lastName}
                </span>
                <p className="text-gray-400 text-xs">{chat.lastMessage}</p>
              </div>
            </div>
            <hr className="border-gray-500 my-4" />
          </>
        ))}
      </div>
    </div>
  );
}
