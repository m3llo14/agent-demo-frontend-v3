"use client";

import { useState, useEffect } from "react";
import { Box, IconButton, useTheme, Menu, MenuItem, Typography, Select, FormControl, Badge, Avatar, CircularProgress } from "@mui/material";
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
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNotifications } from "@/hooks/use-notifications";
import {
  formatDate,
  getInitials,
  getAvatarColor,
  getStatusText,
  getStatusColor,
  getTimeAgo,
} from "@/lib/utils";

const Topbar = ({ locale }: { locale: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState<null | HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const open = Boolean(anchorEl);
  const notificationsOpen = Boolean(notificationsAnchorEl);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isLightMode = theme.palette.mode === "light";
  const colorMode = useContext(ColorModeContext) as {
    toggleColorMode: () => void;
  };
  const { logout, user } = useAuth();
  const { locale: currentLocale, t, changeLocale } = useLocale();
  const { unreadCount, notifications, loading, deleteNotification } = useNotifications();

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

  const handleNotificationsClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
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
        <IconButton onClick={handleNotificationsClick}>
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsOutlinedIcon />
          </Badge>
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

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationsAnchorEl}
          id="notifications-menu"
          open={notificationsOpen}
          onClose={handleNotificationsClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: isLightMode
                ? "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))"
                : "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              backgroundColor: isLightMode ? "#ffffff" : colors.primary[400],
              minWidth: 400,
              maxWidth: 500,
              maxHeight: "70vh",
              borderRadius: "8px",
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
          <Box
            sx={{
              p: 2,
              borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: isLightMode ? colors.grey[100] : colors.grey[100],
              }}
            >
              {t("notifications.title")}
            </Typography>
            <IconButton
              onClick={handleNotificationsClose}
              size="small"
              sx={{
                color: isLightMode ? colors.grey[400] : colors.grey[400],
                "&:hover": {
                  backgroundColor: isLightMode ? colors.grey[900] : colors.primary[500],
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              maxHeight: "60vh",
              overflowY: "auto",
              minWidth: 400,
              maxWidth: 500,
            }}
          >
            {loading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="200px"
              >
                <CircularProgress />
              </Box>
            ) : notifications.length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  py: 4,
                  px: 2,
                }}
              >
                <Typography
                  sx={{
                    color: isLightMode ? colors.grey[300] : colors.grey[300],
                  }}
                >
                  {t("notifications.noNotifications")}
                </Typography>
              </Box>
            ) : (
              notifications.map((notification) => {
                const avatarColor = getAvatarColor(
                  `${notification.customerFirstName} ${notification.customerLastName}`
                );
                const initials = getInitials(
                  notification.customerFirstName,
                  notification.customerLastName
                );
                const statusColor = getStatusColor(notification.status, isLightMode);

                return (
                  <Box
                    key={notification.id}
                    sx={{
                      p: 2,
                      borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
                      display: "flex",
                      gap: 2,
                      position: "relative",
                      "&:last-child": {
                        borderBottom: "none",
                      },
                      "&:hover": {
                        backgroundColor: isLightMode
                          ? colors.grey[900]
                          : colors.primary[500],
                      },
                    }}
                  >
                    {/* Avatar */}
                    <Box sx={{ position: "relative" }}>
                      <Avatar
                        sx={{
                          width: 48,
                          height: 48,
                          bgcolor: avatarColor.bg,
                          color: avatarColor.text,
                          fontWeight: "bold",
                          fontSize: "1rem",
                        }}
                      >
                        {initials}
                      </Avatar>
                      {!notification.read && (
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            backgroundColor: statusColor,
                            border: `2px solid ${isLightMode ? "#ffffff" : colors.primary[400]}`,
                          }}
                        />
                      )}
                    </Box>

                    {/* Content */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: "bold",
                          color: isLightMode ? colors.grey[100] : colors.grey[100],
                          mb: 0.5,
                        }}
                      >
                        {notification.customerFirstName} {notification.customerLastName}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: isLightMode ? colors.grey[300] : colors.grey[300],
                          mb: 0.5,
                        }}
                      >
                        {formatDate(notification.appointmentDate)} - {notification.appointmentTime}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: isLightMode ? colors.grey[300] : colors.grey[300],
                          mb: 0.5,
                        }}
                      >
                        {notification.service}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: isLightMode ? colors.grey[400] : colors.grey[400],
                          }}
                        >
                          {getStatusText(notification.status, t)}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: isLightMode ? colors.grey[400] : colors.grey[400],
                          }}
                        >
                          •
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: isLightMode ? colors.grey[400] : colors.grey[400],
                          }}
                        >
                          {getTimeAgo(notification.createdAt, t, currentLocale)}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Delete Button */}
                    <IconButton
                      onClick={async () => {
                        try {
                          await deleteNotification(notification.id);
                        } catch (err) {
                          console.error("Error deleting notification:", err);
                        }
                      }}
                      sx={{
                        color: isLightMode ? colors.grey[400] : colors.grey[400],
                        "&:hover": {
                          backgroundColor: "transparent",
                          color: colors.redAccent[500],
                        },
                      }}
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                );
              })
            )}
          </Box>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;