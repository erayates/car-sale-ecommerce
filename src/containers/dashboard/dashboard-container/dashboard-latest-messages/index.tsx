"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";

import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import dayjs from "dayjs";
import { MessageType } from "@/types/message";

interface DashboardLatestMessagesProps {
  title: string;
  subheader?: string;
  list: any[];
}

const DashboardLatestUsers: React.FC<DashboardLatestMessagesProps> = ({
  title,
  subheader,
  list,
  ...other
}) => {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
        {list.map((message) => (
          <LatestMessagesItem key={message.id} message={message} />
        ))}
      </Stack>

      <Divider sx={{ borderStyle: "dashed" }} />

      <Box sx={{ p: 2, textAlign: "right" }}>
        <Button size="small" color="inherit" endIcon={<IoIosArrowForward />}>
          <Link href="/dashboard/messages">View all</Link>
        </Button>
      </Box>
    </Card>
  );
};

function LatestMessagesItem({ message }: { message: MessageType }) {
  const { firstName, lastName, createdAt, content } = message;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={firstName + "+" + lastName + "-" + createdAt}
        src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}`}
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Typography color="inherit" variant="subtitle2" noWrap>
          {firstName} {lastName}
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {content}
        </Typography>
      </Box>

      <Typography
        variant="caption"
        sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}
      >
        {dayjs.unix(createdAt.seconds).format("DD MMM YYYY")}
      </Typography>
    </Stack>
  );
}

export default DashboardLatestUsers;
