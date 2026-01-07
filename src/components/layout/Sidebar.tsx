"use client";

import { useState, useEffect } from "react";
import React from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { tokens } from "../../themes/colors";
import { useLocale } from "@/contexts/LocaleContext";
import { useCompany } from "@/contexts/CompanyContext";
import { iconMap } from "@/config/industries";
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

  // Icon'u clone edip doğrudan renk prop'u ekle
  const iconWithColor = React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<any>, {
        sx: {
          color: isActive ? colors.blueAccent[500] : colors.grey[100],
          fill: isActive ? colors.blueAccent[500] : colors.grey[100],
        },
        style: {
          color: isActive ? colors.blueAccent[500] : colors.grey[100],
          fill: isActive ? colors.blueAccent[500] : colors.grey[100],
        },
      })
    : icon;

  return (
    <MenuItem
      active={isActive}
      style={{
        color: isActive ? colors.blueAccent[500] : colors.grey[100],
        backgroundColor: "transparent",
      }}
      rootStyles={{
        color: isActive ? colors.blueAccent[500] : colors.grey[100],
      }}
      onClick={handleClick}
      icon={
        <Box
          sx={{
            color: isActive ? colors.blueAccent[500] : colors.grey[100],
            display: "flex",
            alignItems: "center",
            "& svg": {
              color: `${isActive ? colors.blueAccent[500] : colors.grey[100]} !important`,
              fill: `${isActive ? colors.blueAccent[500] : colors.grey[100]} !important`,
            },
            "& path": {
              fill: `${isActive ? colors.blueAccent[500] : colors.grey[100]} !important`,
            },
          }}
        >
          {iconWithColor}
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
  const { industryConfig } = useCompany();

  // Hydration hatasını önlemek için client-side mount kontrolü
  useEffect(() => {
    setMounted(true);
  }, []);

  const isLightMode = theme.palette.mode === "light";
  const sidebarBgColor = isLightMode ? colors.primary[400] : colors.primary[500];
  const sidebarHoverBg = isLightMode ? colors.primary[300] : colors.primary[400];

  // CSS variable'ları set et - sidebar renkleri için
  useEffect(() => {
    if (typeof document !== "undefined" && mounted) {
      document.documentElement.style.setProperty("--sidebar-bg", sidebarBgColor);
      document.documentElement.style.setProperty("--sidebar-icon-color", colors.grey[100]);
      document.documentElement.style.setProperty("--sidebar-active-icon-color", colors.blueAccent[500]);
      document.documentElement.style.setProperty("--sidebar-hover-icon-color", colors.blueAccent[400]);
      document.documentElement.style.setProperty("--sidebar-hover-bg", sidebarHoverBg);
    }
  }, [sidebarBgColor, sidebarHoverBg, colors.grey, colors.blueAccent, mounted]);

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
        height: "100vh",
        backgroundColor: sidebarBgColor,
        "& .pro-sidebar": {
          backgroundColor: `${sidebarBgColor} !important`,
          background: `${sidebarBgColor} !important`,
        },
        "& .pro-sidebar-inner": {
          background: `${sidebarBgColor} !important`,
          backgroundColor: `${sidebarBgColor} !important`,
        },
        "& .pro-sidebar > div": {
          backgroundColor: `${sidebarBgColor} !important`,
          background: `${sidebarBgColor} !important`,
        },
        "& .pro-menu": {
          backgroundColor: `${sidebarBgColor} !important`,
          background: `${sidebarBgColor} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: `${sidebarBgColor} !important`,
        },
        "& .pro-icon-wrapper svg": {
          color: `${colors.grey[100]} !important`,
          fill: `${colors.grey[100]} !important`,
        },
        "& .pro-menu-item.active .pro-icon-wrapper svg": {
          color: `${colors.blueAccent[500]} !important`,
          fill: `${colors.blueAccent[500]} !important`,
        },
        "& .pro-menu-item:hover .pro-icon-wrapper svg": {
          color: `${colors.blueAccent[400]} !important`,
          fill: `${colors.blueAccent[400]} !important`,
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          color: `${colors.grey[100]} !important`,
          backgroundColor: `${sidebarBgColor} !important`,
        },
        "& .pro-inner-item:hover": {
          color: `${colors.blueAccent[400]} !important`,
          backgroundColor: `${sidebarHoverBg} !important`,
        },
        "& .pro-menu-item": {
          color: `${colors.grey[100]} !important`,
        },
        "& .pro-menu-item.active": {
          color: `${colors.blueAccent[500]} !important`,
          backgroundColor: `${sidebarHoverBg} !important`,
        },
        "& .pro-menu-item:hover": {
          color: `${colors.blueAccent[400]} !important`,
          backgroundColor: `${sidebarHoverBg} !important`,
        },
        "& .pro-menu-item button": {
          color: `${colors.grey[100]} !important`,
        },
        "& .pro-menu-item.active button": {
          color: `${colors.blueAccent[500]} !important`,
        },
        "& .pro-menu-item:hover button": {
          color: `${colors.blueAccent[400]} !important`,
        },
        // Hamburger menu item (first item) - hover efekti kaldırıldı
        "& .pro-menu-item:first-of-type": {
          backgroundColor: "transparent !important",
          "&:hover": {
            backgroundColor: "transparent !important",
            color: `${colors.grey[100]} !important`,
          },
          "& button": {
            color: `${colors.grey[100]} !important`,
            backgroundColor: "transparent !important",
            "&:hover": {
              color: `${colors.grey[100]} !important`,
              backgroundColor: "transparent !important",
            },
          },
          "& svg": {
            color: `${colors.grey[100]} !important`,
            fill: `${colors.grey[100]} !important`,
          },
          "&:hover svg": {
            color: `${colors.grey[100]} !important`,
            fill: `${colors.grey[100]} !important`,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
            "& svg": {
              color: `${colors.grey[100]} !important`,
              fill: `${colors.grey[100]} !important`,
            },
          },
          "&:hover .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
            "& svg": {
              color: `${colors.grey[100]} !important`,
              fill: `${colors.grey[100]} !important`,
            },
          },
          "& .pro-inner-item": {
            color: `${colors.grey[100]} !important`,
            "&:hover": {
              color: `${colors.grey[100]} !important`,
            },
          },
        },
      }}
    >
      <ProSidebar 
        collapsed={isCollapsed}
        backgroundColor={sidebarBgColor}
        rootStyles={{
          backgroundColor: sidebarBgColor,
          background: sidebarBgColor,
        }}
      >
        <Menu
          menuItemStyles={{
            button: {
              color: colors.grey[100],
              backgroundColor: sidebarBgColor,
              [`&.active`]: {
                backgroundColor: isLightMode ? colors.primary[300] : colors.primary[400],
                color: colors.blueAccent[500],
              },
              [`&:hover`]: {
                backgroundColor: isLightMode ? colors.primary[300] : colors.primary[400],
                color: colors.blueAccent[400],
              },
            },
            icon: {
              color: colors.grey[100],
            },
          }}
        >
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={
              isCollapsed ? (
                <MenuOutlinedIcon
                  sx={{
                    color: `${colors.grey[100]} !important`,
                    fill: `${colors.grey[100]} !important`,
                  }}
                />
              ) : undefined
            }
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
              backgroundColor: sidebarBgColor,
            }}
            rootStyles={{
              color: `${colors.grey[100]} !important`,
              backgroundColor: "transparent !important",
              "&:hover": {
                backgroundColor: "transparent !important",
                color: `${colors.grey[100]} !important`,
              },
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
                <IconButton 
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  sx={{
                    color: colors.grey[100],
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>


          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title={t("sidebar.dashboard")}
              to={`/${locale}/dashboard`}
              icon={<HomeOutlinedIcon sx={{ color: colors.grey[100] }} />}
              pathname={pathname}
            />

            {/* Sektöre göre dinamik menü öğeleri */}
            {industryConfig && industryConfig.menuItems.length > 0 && (
              <>
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  {t("sidebar.management")}
                </Typography>
                {industryConfig.menuItems
                  .filter((item) => {
                    // Feature kontrolü - eğer feature varsa ve aktif değilse gösterilmez
                    if (item.feature) {
                      return industryConfig.features[item.feature];
                    }
                    return true;
                  })
                  .map((menuItem) => {
                    const IconComponent = iconMap[menuItem.icon] || PeopleOutlinedIcon;
                    return (
                      <Item
                        key={menuItem.key}
                        title={t(menuItem.labelKey)}
                        to={`/${locale}${menuItem.route}`}
                        icon={<IconComponent sx={{ color: colors.grey[100] }} />}
                        pathname={pathname}
                      />
                    );
                  })}
              </>
            )}

            {/* Fallback: Eğer industry config yoksa default menü göster */}
            {!industryConfig && (
              <>
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
                  icon={<PeopleOutlinedIcon sx={{ color: colors.grey[100] }} />}
                  pathname={pathname}
                />
                <Item
                  title={t("sidebar.customers")}
                  to={`/${locale}/customers`}
                  icon={<ContactsOutlinedIcon sx={{ color: colors.grey[100] }} />}
                  pathname={pathname}
                />
                <Item
                  title={t("sidebar.callLogs")}
                  to={`/${locale}/calls`}
                  icon={<ReceiptOutlinedIcon sx={{ color: colors.grey[100] }} />}
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
                  icon={<CalendarTodayOutlinedIcon sx={{ color: colors.grey[100] }} />}
                  pathname={pathname}
                />
              </>
            )}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;