"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Badge,
  Box,
  Chip,
} from "@mui/material";
import { Notifications, Chat, MoreVert, Menu } from "@mui/icons-material";

const TopNavbar = ({
  auth,
  onMobileMenuToggle, // Added prop for mobile menu toggle
  sidebarWidth = 80, // new prop with default
}) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#008bb2",
        left: { xs: 0, md: `${sidebarWidth}px` }, // use dynamic width
        width: { xs: "100%", md: `calc(100% - ${sidebarWidth}px)` }, // use dynamic width
        borderRadius: "0 0 12px 0",
        zIndex: 1100,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          minHeight: { xs: 56, md: 64 },
          paddingLeft: { xs: 2, md: 2 }, // Reduced left padding on mobile to make room for hamburger menu
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            color="inherit"
            onClick={onMobileMenuToggle}
            sx={{
              display: { xs: "block", md: "none" },
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
            aria-label="Open navigation menu"
          >
            <Menu />
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              display: { xs: "none", sm: "block" },
              fontWeight: 600,
              color: "white",
            }}
          >
            Data Library
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;
