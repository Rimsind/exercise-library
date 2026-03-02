"use client";
import {
  Dashboard,
  CalendarToday,
  Schedule,
  Settings,
  Person,
  Subscriptions,
  AccessTime,
  Report,
  LocalHospital,
  ChevronRight,
  Logout,
  Help,
  Medication,
} from "@mui/icons-material";
import React, { useState, useEffect } from "react";

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
  Tooltip,
} from "@mui/material";
import { useRouter } from "next/navigation";

const DesktopSidebar = ({
  activeItem = "dashboard",
  onSidebarToggle,
  auth,
  logout,
}) => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed");
    if (savedState !== null) {
      const collapsed = JSON.parse(savedState);
      setIsCollapsed(collapsed);
      if (onSidebarToggle) {
        onSidebarToggle(collapsed);
      }
    }
  }, [onSidebarToggle]);

  const handleToggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(newState));
    if (onSidebarToggle) {
      onSidebarToggle(newState);
    }
  };

  const handleKeyDown = (event, path) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleNavigation(path);
    }
  };

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
      logout();
      return;
    }
    router.push(path);
  };

  const sidebarWidth = isCollapsed ? 80 : 280;

  return (
    <Box
      sx={{
        width: sidebarWidth,
        height: "100vh",
        background:
          "linear-gradient(180deg, #0891b2 0%, #0e7490 50%, #155e75 100%)",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1200,
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        boxShadow: "4px 0 20px rgba(0,0,0,0.1)",
        borderRight: "1px solid rgba(255,255,255,0.1)",
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Box
        sx={{
          padding: isCollapsed ? "16px 12px" : "24px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.05)",
          position: "relative",
          transition: "padding 0.3s ease",
          minHeight: isCollapsed ? "80px" : "auto",
        }}
      >
        <IconButton
          onClick={handleToggleCollapse}
          sx={{
            position: "absolute",
            right: isCollapsed ? "16px" : "12px",
            top: isCollapsed ? "16px" : "50%",
            transform: isCollapsed ? "none" : "translateY(-50%)",
            color: "white",
            backgroundColor: "rgba(255,255,255,0.15)",
            width: 36,
            height: 36,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            border: "2px solid rgba(255,255,255,0.3)",
            zIndex: 10,
            ...(isCollapsed && {
              backgroundColor: "rgba(255,255,255,0.25)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              border: "2px solid rgba(255,255,255,0.5)",
            }),
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.35)",
              transform: isCollapsed
                ? "scale(1.1)"
                : "translateY(-50%) scale(1.1)",
              boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
              border: "2px solid rgba(255,255,255,0.7)",
            },
            "&:focus": {
              outline: "3px solid rgba(255,255,255,0.6)",
              outlineOffset: "2px",
            },
            "&:active": {
              transform: isCollapsed
                ? "scale(0.95)"
                : "translateY(-50%) scale(0.95)",
            },
          }}
          aria-label={
            isCollapsed
              ? "Expand sidebar to show labels"
              : "Collapse sidebar to show icons only"
          }
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: isCollapsed ? "rotate(0deg)" : "rotate(180deg)",
            }}
          >
            <ChevronRight
              sx={{
                fontSize: 20,
                filter: isCollapsed
                  ? "drop-shadow(0 0 4px rgba(255,255,255,0.5))"
                  : "none",
              }}
            />
          </Box>
        </IconButton>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: isCollapsed ? 0 : 2,
            justifyContent: isCollapsed ? "center" : "flex-start",
            marginRight: isCollapsed ? "52px" : "52px",
          }}
        >
          {!isCollapsed && (
            <Avatar
              sx={{
                width: 48,
                height: 48,
                background: "linear-gradient(135deg, #06b6d4, #0891b2)",
                fontSize: "20px",
                fontWeight: 600,
                transition: "all 0.3s ease",
                boxShadow: isHovering
                  ? "0 0 20px rgba(6, 182, 212, 0.3)"
                  : "none",
              }}
            >
              <LocalHospital />
            </Avatar>
          )}
          {!isCollapsed && (
            <Box
              sx={{
                opacity: isCollapsed ? 0 : 1,
                transition: "opacity 0.2s ease",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  fontWeight: 600,
                  fontSize: "18px",
                  lineHeight: 1.2,
                }}
              >
                RIMS IND
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "12px",
                }}
              >
                Data Library
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <List
        sx={{
          width: "100%",
          padding: isCollapsed ? "16px 8px" : "16px 12px",
          flex: 1,
          overflowY: "auto",
          transition: "padding 0.3s ease",
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

          const listItemContent = (
            <ListItem
              onClick={() => handleNavigation(item.path)}
              onKeyDown={(e) => handleKeyDown(e, item.path)}
              tabIndex={0}
              role="button"
              sx={{
                flexDirection: "row",
                padding: isCollapsed ? "12px 8px" : "12px 16px",
                cursor: "pointer",
                backgroundColor: isActive
                  ? "rgba(255,255,255,0.15)"
                  : "transparent",
                borderRadius: "12px",
                margin: "4px 0",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                gap: isCollapsed ? 0 : 2,
                justifyContent: isCollapsed ? "center" : "flex-start",
                minHeight: 48,
                "&:hover": {
                  backgroundColor: isActive
                    ? "rgba(255,255,255,0.25)"
                    : "rgba(255,255,255,0.12)",
                  transform: isCollapsed ? "scale(1.05)" : "translateX(4px)",
                  boxShadow: isCollapsed
                    ? "0 4px 12px rgba(0,0,0,0.2)"
                    : "none",
                },
                "&:focus": {
                  outline: "2px solid rgba(255,255,255,0.5)",
                  outlineOffset: "2px",
                },
                "&:active": {
                  transform: isCollapsed ? "scale(0.95)" : "translateX(2px)",
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
                {item.badge && !isCollapsed ? (
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
                  <Box sx={{ position: "relative" }}>
                    <Icon sx={{ fontSize: 22 }} />
                    {item.badge && isCollapsed && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: -2,
                          right: -2,
                          width: 8,
                          height: 8,
                          backgroundColor: "#f44336",
                          borderRadius: "50%",
                          border: "1px solid white",
                          animation: "pulse 2s infinite",
                          "@keyframes pulse": {
                            "0%": { opacity: 1 },
                            "50%": { opacity: 0.5 },
                            "100%": { opacity: 1 },
                          },
                        }}
                      />
                    )}
                  </Box>
                )}
              </ListItemIcon>
              {!isCollapsed && (
                <Typography
                  variant="body2"
                  sx={{
                    color: isActive ? "white" : "rgba(255,255,255,0.9)",
                    fontSize: "14px",
                    fontWeight: isActive ? 600 : 500,
                    flex: 1,
                    opacity: isCollapsed ? 0 : 1,
                    transition: "opacity 0.2s ease",
                  }}
                >
                  {item.label}
                </Typography>
              )}
            </ListItem>
          );

          return (
            <React.Fragment key={item.id}>
              {showDivider && !isCollapsed && (
                <Divider
                  sx={{
                    margin: "12px 16px",
                    borderColor: "rgba(255,255,255,0.1)",
                  }}
                />
              )}
              {isCollapsed ? (
                <Tooltip
                  title={item.label}
                  placement="right"
                  arrow
                  componentsProps={{
                    tooltip: {
                      sx: {
                        backgroundColor: "rgba(0,0,0,0.9)",
                        fontSize: "12px",
                        fontWeight: 500,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                      },
                    },
                    arrow: {
                      sx: {
                        color: "rgba(0,0,0,0.9)",
                      },
                    },
                  }}
                >
                  {listItemContent}
                </Tooltip>
              ) : (
                listItemContent
              )}
            </React.Fragment>
          );
        })}
      </List>

      <Box
        sx={{
          padding: isCollapsed ? "12px 8px" : "16px 20px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(0,0,0,0.1)",
          transition: "padding 0.3s ease",
        }}
      >
        {!isCollapsed && (
          <Typography
            variant="caption"
            sx={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "11px",
              textAlign: "center",
              display: "block",
              opacity: isCollapsed ? 0 : 1,
              transition: "opacity 0.2s ease",
            }}
          >
            RIMSIND V3.0
          </Typography>
        )}
        {isCollapsed && (
          <Box
            sx={{
              width: 8,
              height: 8,
              backgroundColor: "rgba(255,255,255,0.3)",
              borderRadius: "50%",
              margin: "0 auto",
              animation: "breathe 3s ease-in-out infinite",
              "@keyframes breathe": {
                "0%, 100%": { opacity: 0.3 },
                "50%": { opacity: 0.7 },
              },
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default DesktopSidebar;
