"use client";

import { Box } from "@mui/material";
import { useState, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import DesktopSidebar from "./DesktopSidebar";
import MobileBottomNav from "./MobileBottomNav";
import TopNavbar from "./TopNavbar";
import MobileSidebar from "./MobileSidebar";
import { useAuth } from "@/context";

const DashboardLayout = ({ children, activeItem }) => {
  const { auth, logout } = useAuth();
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleSidebarToggle = useCallback(
    (collapsed) => setIsSidebarCollapsed(collapsed),
    [],
  );
  const handleMobileSidebarToggle = useCallback(
    () => setIsMobileSidebarOpen((prev) => !prev),
    [],
  );
  const handleMobileSidebarClose = useCallback(
    () => setIsMobileSidebarOpen(false),
    [],
  );

  const derivedActiveItem = useMemo(() => {
    if (typeof activeItem === "string" && activeItem.length) return activeItem;
    if (!pathname) return "dashboard";
    if (pathname.includes("/appointments")) return "appointments";
    if (pathname.includes("/booking")) return "booking";
    if (pathname.includes("/timetable")) return "timetable";
    if (pathname.includes("/profile")) return "profile";
    if (pathname.includes("/medicine-list")) return "medicine-list";
    return "dashboard";
  }, [activeItem, pathname]);

  const sidebarWidth = isSidebarCollapsed ? 80 : 280;

  return (
    <Box
      sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f7fa" }}
    >
      <DesktopSidebar
        activeItem={derivedActiveItem}
        onSidebarToggle={handleSidebarToggle}
        auth={auth}
        logout={logout}
      />
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={handleMobileSidebarClose}
        activeItem={derivedActiveItem}
      />

      <Box
        sx={{
          flexGrow: 1,
          marginLeft: { xs: 0, md: `${sidebarWidth}px` },
          paddingTop: { xs: "56px", md: "64px" },
          paddingBottom: { xs: "56px", md: 0 },
          minHeight: "100vh",
          transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <TopNavbar
          onMobileMenuToggle={handleMobileSidebarToggle}
          sidebarWidth={sidebarWidth}
          auth={auth}
        />
        <Box
          sx={{
            padding: { xs: 2, md: 3 },
            maxWidth: "100%",
            overflow: "hidden",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
