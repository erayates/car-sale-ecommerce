"use client";

import { useChatStore } from "@/lib/chatStore";
import { db } from "@/lib/firebase/auth";
import { useUserStore } from "@/lib/userStore";
import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
export default function Chat() {
  const [chat, setChat] = useState();
  const [text, setText] = useState("");
  const { chatId, user } = useChatStore();

  const { currentUser } = useUserStore();

  const endRef = useRef();
  useEffect(() => {
    endRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => unSub();
  }, [chatId]);

  const handleSend = async () => {
    if (text === "") return;
    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: Timestamp.fromDate(new Date()),
        }),
      });

      const userIds = [currentUser.id, user.id];

      userIds.forEach(async (id) => {
        const userChatsRef = doc(db, "userChats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();
          const chatIndex = userChatsData.findIndex((c) => c.chatId === chatId);
          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Timestamp.fromDate(
            new Date()
          );

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  {
    chatId && (
      <div className="bg-slate-500 w-full h-full flex justify-between flex-col">
        <div className="w-full h-16 bg-slate-700 flex items-center gap-2 p-4">
          <img
            src="https://ui-avatars.com/api/?name=John+Doe"
            className="w-8 h-8 rounded-md object-cover"
          />
          <div className="text-white">
            <span className="text-sm leading-3">John Doe</span>
            <div className="flex gap-1 items-center">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <p className="text-xs text-slate-400 font-semibold">Online</p>
            </div>
          </div>
        </div>

        <div className="messages h-[600px] overflow-y-scroll overflow-x-hidden mx-4 mt-4 flex flex-col gap-4 text-xs">
          {chat?.messages?.map((message) => (
            <div className="message own" key={message.createdAt}>
              <p>{message.text}</p>
              <span className="self-end text-[9px] text-white/50">
                1 min. ago
              </span>
            </div>
          ))}

          <div ref={endRef}></div>
        </div>

        <div className="sendMessage m-4 h-8 bg-slate-600 rounded-md flex items-center">
          <input
            type="text"
            className="bg-transparent rounded-md text-xs border border-gray-400 h-full py-4 px-4 w-full outline-none text-white"
            placeholder="Start typing..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="ml-[-2rem]" onClick={handleSend}>
            <IoIosSend className="text-white text-2xl" />
          </button>
        </div>
      </div>
    );
  }

  return <div>Click Somewhere</div>;
}
