import { useEffect, useState } from "react";
import { set, sub } from "date-fns";
import { faker } from "@faker-js/faker";

import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Divider,
  Tooltip,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
  CircularProgress,
} from "@mui/material";

import { FaMessage } from "react-icons/fa6";

import { FaBell, FaCar } from "react-icons/fa";
import { MdDoneAll } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";

import dayjs from "dayjs";
import useSWR from "swr";
import { MessageType } from "@/types/message";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function NotificationsPopover() {
  const {
    data: ads,
    error: adsError,
    isLoading: adsLoading,
  } = useSWR(`/api/v1/adverts`, fetcher);

  const {
    data: messages,
    error: messagesError,
    isLoading: messagesLoading,
  } = useSWR(`/api/v1/messages`, fetcher);

  const [notifications, setNotifications] = useState({
    adsNotifications: [],
    messagesNotifications: [],
  });

  useEffect(() => {
    if (messages && ads) {
      const filteredAds = ads
        .filter((ad) => ad.status === "pending")
        .map((ad) => ({ ...ad, isUnRead: true }));

      const filteredMessages = messages
        .filter((message) => message.status === "unread")
        .map((message) => ({ ...message, isUnRead: true }));

      setNotifications({
        adsNotifications: filteredAds,
        messagesNotifications: filteredMessages,
      });
    }
  }, [messages, ads]);

  const totalUnRead =
    notifications.adsNotifications.filter((item) => item.isUnRead === true)
      .length +
    notifications.messagesNotifications.filter((item) => item.isUnRead === true)
      .length;

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
    setNotifications({
      adsNotifications: notifications.adsNotifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      })),
      messagesNotifications: notifications.messagesNotifications.map(
        (notification) => ({
          ...notification,
          isUnRead: false,
        })
      ),
    });
  };

  return (
    <>
      <IconButton color={open ? "primary" : "default"} onClick={handleOpen}>
        <Badge badgeContent={totalUnRead} color="error">
          <FaBell style={{ fontSize: 24 }} />
        </Badge>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        {adsLoading && messagesLoading ? (
          <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1">Notifications</Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  You have {totalUnRead} unread messages
                </Typography>
              </Box>

              {totalUnRead > 0 && (
                <Tooltip title=" Mark all as read">
                  <IconButton color="primary" onClick={handleMarkAllAsRead}>
                    <MdDoneAll />
                  </IconButton>
                </Tooltip>
              )}
            </Box>

            <Divider sx={{ borderStyle: "dashed" }} />

            <List
              disablePadding
              subheader={
                <ListSubheader
                  disableSticky
                  sx={{ py: 1, px: 2.5, typography: "overline" }}
                >
                  Message Notifications
                </ListSubheader>
              }
            >
              {notifications.messagesNotifications
                .slice(0, 2)
                .map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    type={"messages"}
                    notification={notification}
                  />
                ))}
            </List>

            <List
              disablePadding
              subheader={
                <ListSubheader
                  disableSticky
                  sx={{ py: 1, px: 2.5, typography: "overline" }}
                >
                  Advert Notifications
                </ListSubheader>
              }
            >
              {notifications.adsNotifications
                .slice(0, 2)
                .map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    type={"ads"}
                    notification={notification}
                  />
                ))}
            </List>
          </>
        )}
      </Popover>
    </>
  );
}

function NotificationItem({
  type,
  notification,
}: {
  type: string;
  notification: any;
}) {
  const { avatar, title } = renderContent(type);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
        ...(notification.isUnRead && {
          bgcolor: "action.selected",
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "background.neutral" }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: "flex",
              alignItems: "center",
              color: "text.disabled",
            }}
          >
            <AiOutlineClockCircle />
            {dayjs.unix(notification.createdAt.seconds).format("DD MMM YYYY")}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

function renderContent(type: string) {
  const title = (
    <Typography variant="subtitle2">
      {type === "ads" ? "New advert added" : "You received a message"}
      <Typography
        component="span"
        variant="body2"
        sx={{ color: "text.secondary" }}
      >
        &nbsp;{" "}
        {type === "ads"
          ? " waiting for either approve or not."
          : "waiting for reading."}
      </Typography>
    </Typography>
  );

  if (type === "ads") {
    return {
      avatar: <FaCar style={{ color: "gray" }} />,
      title,
    };
  }
  if (type === "messages") {
    return {
      avatar: <FaMessage style={{ color: "lightblue" }} />,
      title,
    };
  }

  return {
    avatar: <></>,
    title: "",
  };
}
