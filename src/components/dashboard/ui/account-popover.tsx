import { useState } from "react";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import { alpha } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import { useUserStore } from "@/providers/userProvider";
import { UserType } from "@/types/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/auth";

const MENU_OPTIONS = [
  { label: "Home", href: "/dashboard" },
  { label: "Profile", href: "/dashboard/profile" },
  { label: "Settings", href: "/dashboard/settings" },
];

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const currentUser = useUserStore((store) => store.currentUser as UserType);
  const [signOut] = useSignOut(auth);
  const router = useRouter();

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  async function handleLogout() {
    try {
      const response = await fetch("/api/v1/logout", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        await signOut();
        router.push("/dashboard/login");
      }
    } catch (error) {
      console.error("Error signing out with email.", error);
    }
  }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={currentUser?.avatar}
          alt={currentUser?.firstName + " " + currentUser?.lastName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {currentUser?.firstName.charAt(0).toUpperCase() +
            currentUser?.lastName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {currentUser?.firstName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {currentUser?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        {MENU_OPTIONS.map((option, idx) => (
          <Link
            href={option.href}
            key={idx}
            style={{ color: "#000", textDecoration: "none" }}
          >
            <MenuItem>{option.label}</MenuItem>
          </Link>
        ))}

        <Divider sx={{ borderStyle: "dashed", m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: "body2", color: "error.main", py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
