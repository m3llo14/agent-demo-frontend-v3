"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  useTheme,
  IconButton,
  Avatar,
} from "@mui/material";
import { tokens } from "@/themes/colors";
import { useLocale } from "@/contexts/LocaleContext";
import { CallLog, ConversationMessage } from "@/types/calls";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";

interface CallDetailModalProps {
  open: boolean;
  onClose: () => void;
  call: CallLog | null;
  onDownload?: (call: CallLog) => void;
}

/**
 * CallDetailModal Component
 * Arama kaydının konuşma dökümünü gösteren modal
 * DRY ve clean code prensiplerine uygun olarak tasarlandı
 */
export default function CallDetailModal({
  open,
  onClose,
  call,
  onDownload,
}: CallDetailModalProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useLocale();
  const isLightMode = theme.palette.mode === "light";
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");

  // Mock conversation data - Backend entegrasyonu sonrası call.conversation kullanılacak
  const getMockConversation = (): ConversationMessage[] => {
    if (!call) return [];
    
    return [
      {
        id: "1",
        type: "assistant",
        content: "Meryem Hanım, Elpi Güzellik Merkezi'a hoş geldiniz! Bugün ne yapmak istersiniz?",
        timestamp: "0:05",
      },
      {
        id: "2",
        type: "user",
        content: "Acil bir saç koyama randevusu istiyorum. Karşamba günü.",
        timestamp: "0:12",
      },
      {
        id: "3",
        type: "assistant_action",
        content: "Müsaitlik Durumu",
        actionType: "availability_status",
        timestamp: "0:18",
      },
      {
        id: "4",
        type: "user",
        content: "Olacak.",
        timestamp: "0:22",
      },
      {
        id: "5",
        type: "assistant",
        content: "Çarşamba günü için saç boyama randevunuzu oluşturabilirim. Size uygun bir saat var mı, yoksa uygun olan ilk saati mi tercih edersiniz? Ayrıca uzman olarak Pınar Sandıkçı veya Ayşe Yılmaz'dan birini ister misiniz?",
        timestamp: "0:28",
      },
      {
        id: "6",
        type: "user",
        content: "Fark etmez, kişiden biri olur. Saat önemli değil.",
        timestamp: "0:45",
      },
      {
        id: "7",
        type: "assistant_action",
        content: "Müsaitlik Durumu",
        actionType: "availability_status",
        timestamp: "0:52",
      },
      {
        id: "8",
        type: "assistant_action",
        content: "Randevu Oluştur",
        actionType: "create_appointment",
        timestamp: "0:58",
      },
      {
        id: "9",
        type: "assistant",
        content: "Çarşamba günü saat onda, Pınar Sandıkçı ile saç boyama randevunuz oluşturuldu. Size başka yardımcı olabileceğim bir konu var mı?",
        timestamp: "1:05",
      },
      {
        id: "10",
        type: "user",
        content: "Yok, teşekkürler. Kolay gelsin.",
        timestamp: "1:12",
      },
    ];
  };

  const conversation = call?.conversation || getMockConversation();

  // Ses oynatıcı toggle
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // TODO: Gerçek ses oynatma implementasyonu
  };

  // İndir butonu
  const handleDownload = () => {
    if (call && onDownload) {
      onDownload(call);
    } else {
      // TODO: Default download işlemi
      console.log("Download conversation:", call);
    }
  };

  // Action type label
  const getActionLabel = (actionType?: string) => {
    if (!actionType) return t("calls.detailModal.assistantAction");
    return t(`calls.detailModal.actions.${actionType}`);
  };

  if (!call) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: isLightMode ? "#ffffff" : colors.primary[400],
          backgroundImage: "none",
          boxShadow: isLightMode
            ? "0 4px 20px rgba(0,0,0,0.15)"
            : "0 4px 20px rgba(0,0,0,0.5)",
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          color: isLightMode ? colors.grey[100] : colors.grey[100],
          borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
          pb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {t("calls.detailModal.title")}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          {onDownload && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
              sx={{
                borderColor: colors.blueAccent[500],
                color: colors.blueAccent[500],
                "&:hover": {
                  borderColor: colors.blueAccent[600],
                  backgroundColor: isLightMode
                    ? colors.blueAccent[900]
                    : colors.blueAccent[800],
                },
              }}
            >
              {t("calls.detailModal.download")}
            </Button>
          )}
          <IconButton
            onClick={onClose}
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
      </DialogTitle>

      <DialogContent sx={{ mt: 2, p: 0 }}>
        {/* Audio Player */}
        <Box
          sx={{
            p: 2,
            mb: 2,
            backgroundColor: isLightMode ? "#f5f5f5" : colors.primary[500],
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <IconButton
            onClick={handlePlayPause}
            sx={{
              backgroundColor: colors.blueAccent[500],
              color: "#ffffff",
              "&:hover": {
                backgroundColor: colors.blueAccent[600],
              },
            }}
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <Typography
            variant="body2"
            sx={{
              color: isLightMode ? colors.grey[300] : colors.grey[300],
              minWidth: "50px",
            }}
          >
            {currentTime}
          </Typography>
          <VolumeUpIcon
            sx={{
              fontSize: 20,
              color: isLightMode ? colors.grey[400] : colors.grey[400],
            }}
          />
        </Box>

        {/* Conversation Messages */}
        {conversation.length === 0 ? (
          <Box
            sx={{
              p: 4,
              textAlign: "center",
              backgroundColor: isLightMode ? "#f5f5f5" : colors.primary[500],
              borderRadius: "8px",
            }}
          >
            <Typography
              sx={{
                color: isLightMode ? colors.grey[300] : colors.grey[300],
              }}
            >
              {t("calls.detailModal.noConversation")}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxHeight: "60vh",
              overflowY: "auto",
              pr: 1,
            }}
          >
            {conversation.map((message) => {
              if (message.type === "assistant") {
                return (
                  <Box
                    key={message.id}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.5,
                      justifyContent: "flex-start",
                    }}
                  >
                    <Avatar
                      sx={{
                        backgroundColor: colors.blueAccent[500],
                        width: 32,
                        height: 32,
                      }}
                    >
                      <SmartToyIcon sx={{ fontSize: 18 }} />
                    </Avatar>
                    <Box
                      sx={{
                        maxWidth: "70%",
                        backgroundColor: isLightMode
                          ? colors.blueAccent[100]
                          : colors.blueAccent[600],
                        borderRadius: "12px",
                        p: 1.5,
                        position: "relative",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: isLightMode ? colors.blueAccent[800] : "#ffffff",
                          display: "block",
                          mb: 0.5,
                          fontWeight: "bold",
                        }}
                      >
                        {t("calls.detailModal.assistant")}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: isLightMode ? colors.grey[900] : "#ffffff",
                          lineHeight: 1.6,
                        }}
                      >
                        {message.content}
                      </Typography>
                    </Box>
                  </Box>
                );
              }

              if (message.type === "user") {
                return (
                  <Box
                    key={message.id}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.5,
                      justifyContent: "flex-end",
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: "70%",
                        backgroundColor: isLightMode
                          ? colors.grey[200]
                          : colors.grey[600],
                        borderRadius: "12px",
                        p: 1.5,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: isLightMode ? colors.grey[700] : "#ffffff",
                          display: "block",
                          mb: 0.5,
                          fontWeight: "bold",
                        }}
                      >
                        {t("calls.detailModal.user")}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: isLightMode ? colors.grey[900] : "#ffffff",
                          lineHeight: 1.6,
                        }}
                      >
                        {message.content}
                      </Typography>
                    </Box>
                    <Avatar
                      sx={{
                        backgroundColor: isLightMode
                          ? colors.grey[600]
                          : colors.grey[500],
                        width: 32,
                        height: 32,
                      }}
                    >
                      <PersonIcon sx={{ fontSize: 18 }} />
                    </Avatar>
                  </Box>
                );
              }

              // Assistant Action
              return (
                <Box
                  key={message.id}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    my: 1,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: isLightMode
                        ? colors.greenAccent[400]
                        : colors.greenAccent[600],
                      borderRadius: "8px",
                      px: 2,
                      py: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#ffffff",
                        fontWeight: "bold",
                      }}
                    >
                      {t("calls.detailModal.assistantAction")}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#ffffff",
                        fontWeight: 500,
                      }}
                    >
                      {getActionLabel(message.actionType)}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

