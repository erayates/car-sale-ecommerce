import Chat from "./chat";
import ChatList from "./chat-list";
import UserInfo from "./chat-list/user-info";

export default function MessagesContainer() {
  return (
    <div className="col-span-2 grid grid-cols-3 w-full h-[720px] relative">
      <div className="col-span-1 bg-slate-700 p-4 h-full">
        <UserInfo />
        <hr className="border-gray-500 my-4" />
        <ChatList />
      </div>
      <div className="col-span-2 h-full">
        <Chat />
      </div>
    </div>
  );
}
