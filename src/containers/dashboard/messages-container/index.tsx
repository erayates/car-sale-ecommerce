"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import { MessageType } from "@/types/message";
import { Grid } from "@mui/material";
import MessagesList from "./messages-list";
import MessageDetail from "./message-detail";

export default function MessagesContainer({
  messages,
}: {
  messages: MessageType[];
}) {
  const [selectedMessage, setSelectedMessage] = React.useState<MessageType>();

  return (
    <Grid container spacing={2} paddingLeft={2} paddingRight={2}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            sx={{ paddingBottom: "24px" }}
            title="Messages"
            subheader="Your inbox messages that get from contact form."
          />
        </Card>
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <Card>
          <MessagesList
            messages={messages}
            setSelectedMessage={setSelectedMessage}
          />
        </Card>
      </Grid>
      <Grid item xs={12} md={8} lg={8}>
        <MessageDetail message={selectedMessage ?? messages[0]} />
      </Grid>
    </Grid>
  );
}
