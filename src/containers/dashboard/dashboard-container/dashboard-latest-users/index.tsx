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
import { UserType } from "@/types/user";
import { Chip } from "@mui/material";
import dayjs from "dayjs";

interface DashboardLatestMessagesProps {
  title: string;
  subheader?: string;
  list: any[];
}

const DashboardLatestMessages: React.FC<DashboardLatestMessagesProps> = ({
  title,
  subheader,
  list,
  ...other
}) => {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
        {list.map((user, idx) => (
          <LatestMessagesItem key={idx} user={user} />
        ))}
      </Stack>

      <Divider sx={{ borderStyle: "dashed" }} />

      <Box sx={{ p: 2, textAlign: "right" }}>
        <Button size="small" color="inherit" endIcon={<IoIosArrowForward />}>
          <Link href="/dashboard/users">View all</Link>
        </Button>
      </Box>
    </Card>
  );
};

function LatestMessagesItem({ user }: { user: UserType }) {
  const { firstName, lastName, createdAt, email, onlineStatus } = user;

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
          {email}
        </Typography>
      </Box>

      <Typography
        variant="caption"
        sx={{
          pr: 3,
          flexShrink: 0,
          color: "text.secondary",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {dayjs.unix(createdAt.seconds).format("DD MMM")}
        {onlineStatus ? (
          <Chip label="Online" color="success" size="small" />
        ) : (
          <Chip label="Offline" size="small" />
        )}
      </Typography>
    </Stack>
  );
}

export default DashboardLatestMessages;
