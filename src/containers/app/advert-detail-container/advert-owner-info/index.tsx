"use client";

import { FaUser } from "react-icons/fa6";
import { FaSquarePhone } from "react-icons/fa6";
import { BiSolidMessageDots } from "react-icons/bi";
import {
  Timestamp,
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/auth";
import useSWR from "swr";
import { CircularProgress } from "@mui/material";
import dayjs from "dayjs";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdvertOwnerInfo({
  advertOwnerId,
}: {
  advertOwnerId: string;
}) {
  // const handleSendMessage = async () => {
  //   const chatRef = collection(db, "chats");
  //   const usersChatRef = collection(db, "userChats");

  //   try {
  //     const newChatRef = doc(chatRef);
  //     await setDoc(newChatRef, {
  //       createdAt: Timestamp.fromDate(new Date()),
  //     });

  //     await updateDoc(doc(usersChatRef, "RIrSYpNB9bNTbhcRxbKZFOs3pHd2"), {
  //       chats: arrayUnion({
  //         chatId: newChatRef.id,
  //         lastMessage: "",
  //         receiverId: userState.currentUser.id,
  //         updatedAt: Timestamp.fromDate(new Date()),
  //       }),
  //     }),
  //       await updateDoc(doc(usersChatRef, userState.currentUser.id), {
  //         chats: arrayUnion({
  //           chatId: newChatRef.id,
  //           lastMessage: "",
  //           receiverId: "RIrSYpNB9bNTbhcRxbKZFOs3pHd2",
  //           updatedAt: Timestamp.fromDate(new Date()),
  //         }),
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const {
    data: adOwner,
    error,
    isLoading,
  } = useSWR(`/api/v1/users/${advertOwnerId}`, fetcher);

  console.log(adOwner)


  if (isLoading) {
    return (
      <div className="mt-16 flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className=" bg-[#f2f2f2] p-4 rounded-md sticky top-[10px] container bg-dark-linear mt-16 z-40 flex justify-between items-center">
      <div>
        <p className="text-xl text-white font-semibold flex gap-2 items-center">
          <FaUser /> {adOwner.firstName} {adOwner.lastName}
        </p>
        <p className="text-gray-400 text-sm">
          
          Account Creation Date: {dayjs(adOwner.createdAt.miliseconds).format("DD MMM YYYY")}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="tel:8882192787"
          className="text-white bg-green-500 p-2 rounded-md flex text-md items-center gap-2"
        >
          <FaSquarePhone className="text-2xl" />
          <p className="font-semibold flex flex-col items-start  text-sm leading-4">
            Call Now!
            <span className="font-normal">{adOwner.phone}</span>
          </p>
        </a>
        <button
          className="flex bg-blue-500 text-white p-2 rounded-md items-center gap-2"
          // onClick={handleSendMessage}
        >
          <BiSolidMessageDots className="text-2xl" />
          <p className="font-semibold flex flex-col items-start text-sm leading-4">
            Contact Now!
            <span className="font-normal">Send Message</span>
          </p>
        </button>
      </div>
    </div>
  );
}
