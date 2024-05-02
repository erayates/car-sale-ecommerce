import { MessageType } from "@/types/message";
import { Stack } from "@mui/material";
import MessagesListItem from "../messages-list-item";
import { Dispatch, SetStateAction } from "react";

export default function MessagesList({
  messages,
  setSelectedMessage,
}: {
  messages: MessageType[];
  setSelectedMessage: Dispatch<SetStateAction<MessageType>>;
}) {
  return (
    <Stack
      spacing={3}
      sx={{
        p: 3,
        pr: 0,
        height: { xs: "285px", md: "675px" },
        overflowY: "scroll",
      }}
    >
      {messages.map((message: MessageType) => (
        <MessagesListItem
          key={message.id}
          message={message}
          setSelectedMessage={setSelectedMessage}
        />
      ))}
    </Stack>
  );
}
