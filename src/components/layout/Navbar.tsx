"use client";

import { useState, useEffect } from "react";
import { Box, IconButton, useTheme, Menu, MenuItem, Typography, Select, FormControl } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../themes/colors";
import { useAuth } from "@/contexts/AuthContext";
import { useLocale } from "@/contexts/LocaleContext";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LanguageIcon from "@mui/icons-material/Language";

const Topbar = ({ locale }: { locale: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isLightMode = theme.palette.mode === "light";
  const colorMode = useContext(ColorModeContext) as {
    toggleColorMode: () => void;
  };
  const { logout, user } = useAuth();
  const { locale: currentLocale, t, changeLocale } = useLocale();

  // Hydration hatasını önlemek için client-side mount kontrolü
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  // Server-side render sırasında boş render döndür
  if (!mounted) {
    return (
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box display="flex" sx={{ flex: 1 }} />
        <Box display="flex" />
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        sx={{
          backgroundColor: colors.primary[400],
          borderRadius: "3px",
        }}
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder={t("common.search")} />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        {/* Language Selector */}
        <FormControl
          size="small"
          sx={{
            minWidth: 80,
            mr: 1,
            "& .MuiOutlinedInput-root": {
              backgroundColor: isLightMode ? "#ffffff" : colors.primary[500],
              color: isLightMode ? colors.grey[100] : colors.grey[100],
              "& fieldset": {
                borderColor: isLightMode ? colors.grey[700] : colors.grey[700],
              },
              "&:hover fieldset": {
                borderColor: isLightMode ? colors.grey[500] : colors.grey[500],
              },
            },
            "& .MuiSelect-icon": {
              color: isLightMode ? colors.grey[100] : colors.grey[100],
            },
          }}
        >
          <Select
            value={currentLocale}
            onChange={(e) => changeLocale(e.target.value as "tr" | "en")}
            sx={{
              color: isLightMode ? colors.grey[100] : colors.grey[100],
              "& .MuiSelect-select": {
                py: 1,
                px: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              },
            }}
          >
            <MenuItem value="tr" sx={{ color: colors.grey[100] }}>
              🇹🇷 TR
            </MenuItem>
            <MenuItem value="en" sx={{ color: colors.grey[100] }}>
              🇬🇧 EN
            </MenuItem>
          </Select>
        </FormControl>

        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton
          onClick={handleClick}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          title={user?.email || "Account"}
        >
          <PersonOutlinedIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: isLightMode
                ? "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))"
                : "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              backgroundColor: isLightMode ? "#ffffff" : colors.primary[400],
              minWidth: 200,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: isLightMode ? "#ffffff" : colors.primary[400],
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {user && (
            <MenuItem
              disabled
              sx={{
                color: isLightMode ? colors.grey[300] : colors.grey[300],
                fontSize: "0.875rem",
                borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
              }}
            >
              <Typography variant="body2">{user.email}</Typography>
            </MenuItem>
          )}
          <MenuItem
            onClick={handleLogout}
            sx={{
              color: isLightMode ? colors.grey[100] : colors.grey[100],
              "&:hover": {
                backgroundColor: isLightMode ? colors.blueAccent[500] : colors.primary[500],
                color: "#ffffff",
              },
            }}
          >
            <LogoutOutlinedIcon sx={{ mr: 1, fontSize: 20 }} />
            <Typography>{t("common.logout")}</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;