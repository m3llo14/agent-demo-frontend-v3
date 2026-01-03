"use client";

import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../themes/colors";
import { useLocale } from "@/contexts/LocaleContext";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

interface ItemProps {
  title: string;
  to: string;
  icon: React.ReactNode;
  pathname: string;
}

const Item = ({ title, to, icon, pathname }: ItemProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const router = useRouter();
  
  // Dashboard route'unda sadece "Dashboard" title'ına sahip item highlight olmalı
  // "Line Chart" aynı route'u kullanıyor ama highlight olmamalı
  const isActive = pathname === to && !(pathname.includes('/dashboard') && title.includes("Line Chart"));

  const handleClick = () => {
    router.push(to);
  };

  return (
    <MenuItem
      active={isActive}
      style={{
        color: isActive ? colors.blueAccent[500] : colors.grey[100],
        backgroundColor: "transparent",
      }}
      onClick={handleClick}
      icon={
        <Box
          sx={{
            color: isActive ? colors.blueAccent[500] : colors.grey[100],
            display: "flex",
            alignItems: "center",
          }}
        >
          {icon}
        </Box>
      }
    >
      <Typography
        sx={{
          fontWeight: isActive ? "bold" : "normal",
          color: isActive ? colors.blueAccent[500] : colors.grey[100],
        }}
      >
        {title}
      </Typography>
    </MenuItem>
  );
};

const Sidebar = ({ locale }: { locale: string }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { t } = useLocale();

  // Hydration hatasını önlemek için client-side mount kontrolü
  useEffect(() => {
    setMounted(true);
  }, []);

  // Server-side render sırasında boş render döndür
  if (!mounted) {
    return (
      <Box
        sx={{
          width: "250px",
          minHeight: "100vh",
        }}
      />
    );
  }

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Artific Agent
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>


          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title={t("sidebar.dashboard")}
              to={`/${locale}/dashboard`}
              icon={<HomeOutlinedIcon />}
              pathname={pathname}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              {t("sidebar.management")}
            </Typography>
            <Item
              title={t("sidebar.manageTeam")}
              to={`/${locale}/experts`}
              icon={<PeopleOutlinedIcon />}
              pathname={pathname}
            />
            <Item
              title={t("sidebar.customers")}
              to={`/${locale}/customers`}
              icon={<ContactsOutlinedIcon />}
              pathname={pathname}
            />
            <Item
              title={t("sidebar.callLogs")}
              to={`/${locale}/calls`}
              icon={<ReceiptOutlinedIcon />}
              pathname={pathname}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              {t("sidebar.pages")}
            </Typography>
            <Item
              title={t("sidebar.calendar")}
              to={`/${locale}/calendar`}
              icon={<CalendarTodayOutlinedIcon />}
              pathname={pathname}
            />
            <Item
              title={t("sidebar.lineChart")}
              to={`/${locale}/charts`}
              icon={<TimelineOutlinedIcon />}
              pathname={pathname}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;