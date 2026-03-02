"use client";
import {
  Dashboard,
  CalendarToday,
  Schedule,
  Settings,
  Person,
  Subscriptions,
  AccessTime,
  Analytics,
  LocalHospital,
  Logout,
  Help,
  Close,
  Medication,
} from "@mui/icons-material";
import React from "react";

import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  Badge,
  Divider,
  Avatar,
  IconButton,
  Drawer,
  Backdrop,
} from "@mui/material";
import { useRouter } from "next/navigation";

const MobileSidebar = ({ isOpen, onClose, activeItem = "dashboard" }) => {
  const router = useRouter();

  const menuItems = [
    {
      id: "dashboard",
      icon: Dashboard,
      label: "Dashboard",
      path: "/doc-dashboard",
      category: "main",
    },
    {
      id: "exercise-library",
      icon: Subscriptions,
      label: "Exercise Library",
      path: "/exercise-library",
      category: "main",
    },
    {
      id: "patient-education-library",
      icon: LocalHospital,
      label: "Patient Education Library",
      path: "/patient-education-library",
      category: "main",
    },
    {
      id: "logout",
      icon: Logout,
      label: "Logout",
      path: "/logout",
      category: "support",
    },
  ];

  const handleNavigation = (path) => {
    if (path === "/logout") {
      console.log("Logout clicked");
      onClose();
      return;
    }
    router.push(path);
    onClose(); // Close sidebar after navigation
  };

  const handleKeyDown = (event, path) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleNavigation(path);
    }
  };

  return (
    <>
      {/* Custom backdrop for better control */}
      <Backdrop
        open={isOpen}
        onClick={onClose}
        sx={{
          zIndex: 1250,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: { xs: "block", md: "none" },
        }}
      />

      <Drawer
        anchor="left"
        open={isOpen}
        onClose={onClose}
        variant="temporary"
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 250,
            background:
              "linear-gradient(180deg, #0891b2 0%, #0e7490 50%, #155e75 100%)",
            boxShadow: "4px 0 20px rgba(0,0,0,0.3)",
            borderRight: "1px solid rgba(255,255,255,0.1)",
            zIndex: 1300,
            borderRadius: "0 25px 0 0",
          },
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
      >
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header with close button */}
          <Box
            sx={{
              padding: "20px",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              position: "relative",
            }}
          >
            <IconButton
              onClick={onClose}
              sx={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
                backgroundColor: "rgba(255,255,255,0.15)",
                width: 36,
                height: 36,
                border: "2px solid rgba(255,255,255,0.3)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.25)",
                  transform: "translateY(-50%) scale(1.1)",
                },
              }}
              aria-label="Close sidebar"
            >
              <Close sx={{ fontSize: 20 }} />
            </IconButton>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                marginRight: "52px",
              }}
            >
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  background: "linear-gradient(135deg, #06b6d4, #0891b2)",
                  fontSize: "20px",
                  fontWeight: 600,
                }}
              >
                <LocalHospital />
              </Avatar>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    fontWeight: 600,
                    fontSize: "18px",
                    lineHeight: 1.2,
                  }}
                >
                  Dr. Guchyit
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "12px",
                  }}
                >
                  Cardiologist
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Navigation Menu */}
          <List
            sx={{
              width: "100%",
              padding: "16px 12px",
              flex: 1,
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                background: "rgba(255,255,255,0.1)",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(255,255,255,0.3)",
                borderRadius: "2px",
              },
            }}
          >
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              const showDivider =
                index > 0 && menuItems[index - 1].category !== item.category;

              return (
                <React.Fragment key={item.id}>
                  {showDivider && (
                    <Divider
                      sx={{
                        margin: "12px 16px",
                        borderColor: "rgba(255,255,255,0.1)",
                      }}
                    />
                  )}
                  <ListItem
                    onClick={() => handleNavigation(item.path)}
                    onKeyDown={(e) => handleKeyDown(e, item.path)}
                    tabIndex={0}
                    role="button"
                    sx={{
                      flexDirection: "row",
                      padding: "12px 16px",
                      cursor: "pointer",
                      backgroundColor: isActive
                        ? "rgba(255,255,255,0.15)"
                        : "transparent",
                      borderRadius: "12px",
                      margin: "4px 0",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      gap: 2,
                      minHeight: 48,
                      "&:hover": {
                        backgroundColor: isActive
                          ? "rgba(255,255,255,0.25)"
                          : "rgba(255,255,255,0.12)",
                        transform: "translateX(4px)",
                      },
                      "&:focus": {
                        outline: "2px solid rgba(255,255,255,0.5)",
                        outlineOffset: "2px",
                      },
                      "&:active": {
                        transform: "translateX(2px)",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: "auto",
                        color: isActive ? "white" : "rgba(255,255,255,0.9)",
                        justifyContent: "center",
                      }}
                    >
                      {item.badge ? (
                        <Badge
                          badgeContent={item.badge}
                          color="error"
                          sx={{
                            "& .MuiBadge-badge": {
                              fontSize: "10px",
                              height: "16px",
                              minWidth: "16px",
                              fontWeight: 600,
                              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                            },
                          }}
                        >
                          <Icon sx={{ fontSize: 22 }} />
                        </Badge>
                      ) : (
                        <Icon sx={{ fontSize: 22 }} />
                      )}
                    </ListItemIcon>
                    <Typography
                      variant="body2"
                      sx={{
                        color: isActive ? "white" : "rgba(255,255,255,0.9)",
                        fontSize: "14px",
                        fontWeight: isActive ? 600 : 500,
                        flex: 1,
                      }}
                    >
                      {item.label}
                    </Typography>
                  </ListItem>
                </React.Fragment>
              );
            })}
          </List>

          {/* Footer */}
          <Box
            sx={{
              padding: "16px 20px",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "11px",
                textAlign: "center",
                display: "block",
              }}
            >
              RIMSIND V3.0
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default MobileSidebar;
