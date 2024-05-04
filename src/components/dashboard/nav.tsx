"use client";

import { useEffect } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import Avatar from "@mui/material/Avatar";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";

import { Scrollbar } from "./ui/scrollbar";

import { NAV } from "./config-layout";
import navConfig from "./config-navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useResponsive } from "@/hooks/use-responsive";
import { account } from "@/mocks/account";
import { UserType } from "@/types/user";
import { useUserStore } from "@/providers/userProvider";

export default function Nav({
  openNav,
  onCloseNav,
}: {
  openNav: boolean;
  onCloseNav: () => void;
}) {
  const pathname = usePathname();

  const currentUser = useUserStore((state) => state.currentUser as UserType);

  const upLg = useResponsive("up", "lg");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderLogo = (
    <Typography variant="h2" sx={{ px: 2, mt:3, }}>
      carify.
    </Typography>
  );

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: "flex",
        borderRadius: 1.5,
        alignItems: "center",
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={currentUser?.avatar} alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">
          {currentUser?.firstName} {currentUser?.lastName}
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {currentUser?.email}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {renderLogo}

      {renderAccount}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: "fixed",
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

function NavItem({
  item,
}: {
  item: { title: string; path: string; icon: React.ReactNode };
}) {
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={Link}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,

        typography: "body2",
        color: "text.secondary",
        textTransform: "capitalize",
        fontWeight: "fontWeightMedium",
        ...(active && {
          color: "primary.main",
          fontWeight: "fontWeightSemiBold",
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          "&:hover": {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box
        component="span"
        sx={{
          mr: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}
