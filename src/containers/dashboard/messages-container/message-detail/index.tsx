import { MessageType } from "@/types/message";
import { Box, Card, Divider, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

export default function MessageDetail({ message }: { message: MessageType }) {
  const { firstName, lastName, createdAt, content, email, phone } = message;

  return (
    <Card sx={{ height: "100%", p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box
            component="img"
            alt={firstName + "+" + lastName + "-" + createdAt}
            src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}`}
            sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
          />

          <Box>
            <Typography color="inherit" variant="subtitle2" noWrap>
              {firstName} {lastName}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
              {email}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box>
            <Typography color="inherit" variant="subtitle2" noWrap>
              Phone Number:
            </Typography>
            <Typography
              variant="caption"
              sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}
            >
              {phone}
            </Typography>
          </Box>
          <Box>
            <Typography color="inherit" variant="subtitle2" noWrap>
              Sent Date:
            </Typography>
            <Typography
              variant="caption"
              sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}
            >
              {dayjs.unix(createdAt.seconds).format("DD MMM YYYY")}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderStyle: "dashed", mt: 2 }} />


      <Box sx={{ mt: 2 }}>
        <Typography>{content}</Typography>
      </Box>
    </Card>
  );
}
