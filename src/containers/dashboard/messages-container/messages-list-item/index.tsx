import { MessageType } from "@/types/message";
import {
  Box,
  Button,
  Divider,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { toast } from "react-toastify";

export default function MessagesListItem({
  message,
  setSelectedMessage,
}: {
  message: MessageType;
  setSelectedMessage: Dispatch<SetStateAction<MessageType>>;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;

  const { firstName, lastName, createdAt, content, status, id } = message;

  const router = useRouter();

  const handleMarkAsRead = async () => {
    const response = await fetch(`/api/v1/messages/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status: "read" }),
    });

    if (response.ok && response.status === 200) {
      router.refresh();
      return;
    }
    toast.error("Something went wrong!");
  };

  const handleMarkAsUnread = async () => {
    const response = await fetch(`/api/v1/messages/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status: "unread" }),
    });

    if (response.ok && response.status === 200) {
      router.refresh();
      return;
    }
    toast.error("Something went wrong!");
  };

  const handleSetSelectedMessage = () => {
    if (status === "unread") {
      handleMarkAsRead();
    }
    setSelectedMessage(message);
  };

  const handleDeleteMessage = async () => {
    const response = await fetch(`/api/v1/messages/${id}`, {
      method: "DELETE",
    });

    if (response.ok && response.status === 200) {
      toast.success("Message deleted successfully!");
      router.refresh();
      return;
    }
    toast.error("Something went wrong!");
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      component={"div"}
      sx={
        status === "unread"
          ? {
              cursor: "pointer",
              backgroundColor: "#56cedb",
              borderRadius: "10px",
              color: "white",
              p: 1,
            }
          : { cursor: "pointer", p: 1 }
      }
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
        component="div"
        onClick={handleSetSelectedMessage}
      >
        <Box
          component="img"
          alt={firstName + "+" + lastName + "-" + createdAt}
          src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}`}
          sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
        />

        <Box sx={{ flexGrow: 1 }}>
          <Typography color="inherit" variant="subtitle2" noWrap>
            {firstName} {lastName}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {content?.slice(0, 20) + "..."}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Button
          aria-describedby={id}
          onClick={handleClick}
          fullWidth
          sx={status === "unread" && { color: "white" }}
        >
          <HiOutlineDotsVertical />
        </Button>

        <Popover
          id={popoverId}
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          sx={{
            fontSize: 14,
            padding: 2,
          }}
        >
          <div className="flex flex-col text-[14px] ">
            {status === "unread" ? (
              <Button onClick={handleMarkAsRead} fullWidth>
                Mark As Read
              </Button>
            ) : (
              <Button onClick={handleMarkAsUnread} fullWidth>
                Mark As Unread
              </Button>
            )}

            <Divider />
            <Button color="error" onClick={handleDeleteMessage}>
              Delete Message
            </Button>
          </div>
        </Popover>
      </Box>
    </Stack>
  );
}
