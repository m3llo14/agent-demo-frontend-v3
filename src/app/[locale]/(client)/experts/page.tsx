"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { tokens } from "@/themes/colors";
import { useLocale } from "@/contexts/LocaleContext";
import { useCompany } from "@/contexts/CompanyContext";
import { useExperts } from "@/hooks/use-experts";
import ExpertsTable from "@/features/experts/ExpertsTable";
import ExpertFormModal from "@/features/experts/ExpertFormModal";
import { Expert } from "@/types/experts";
import { useRouter } from "next/navigation";

export default function ExpertsPage() {
  const { data, loading, error, deleteExpert, updateExpert, createExpert } = useExperts();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t, locale } = useLocale();
  const { industryConfig } = useCompany();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  // Eğer bu sektörde experts özelliği yoksa, dashboard'a yönlendir
  if (industryConfig && !industryConfig.features.experts) {
    router.push(`/${locale}/dashboard`);
    return null;
  }

  const handleAddNew = () => {
    setSelectedExpert(null);
    setModalMode("create");
    setModalOpen(true);
  };

  const handleEdit = (expert: Expert) => {
    setSelectedExpert(expert);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedExpert(null);
  };

  const handleModalSubmit = async (expert: Omit<Expert, "id"> | Expert) => {
    try {
      if (modalMode === "create") {
        await createExpert(expert as Omit<Expert, "id">);
      } else {
        await updateExpert(expert as Expert);
      }
    } catch (err) {
      throw err; // Modal içinde handle edilecek
    }
  };

  const handleDelete = async (expertId: string) => {
    if (window.confirm(t("experts.form.deleteConfirm"))) {
      try {
        await deleteExpert(expertId);
      } catch (err) {
        alert(err instanceof Error ? err.message : t("experts.form.deleteError"));
      }
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 4,
        }}
      >
        <Box>
          <Typography
            variant="h3"
            sx={{
              color: theme.palette.mode === "light" ? colors.grey[100] : colors.grey[100],
              fontWeight: "bold",
              mb: 1,
            }}
          >
            {t("experts.title")}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.mode === "light" ? colors.grey[300] : colors.grey[300],
            }}
          >
            {t("experts.subtitle")}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
          sx={{
            backgroundColor: colors.blueAccent[500],
            color: colors.grey[100],
            "&:hover": {
              backgroundColor: colors.blueAccent[600],
            },
            px: 3,
            py: 1.5,
          }}
        >
          {t("experts.addNew")}
        </Button>
      </Box>

      {/* Table */}
      {data.length > 0 ? (
        <ExpertsTable
          experts={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <Box
          sx={{
            p: 4,
            textAlign: "center",
            backgroundColor:
              theme.palette.mode === "light" ? "#ffffff" : colors.primary[400],
            borderRadius: "8px",
            boxShadow:
              theme.palette.mode === "light" ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
          }}
        >
          <Typography
            sx={{
              color: theme.palette.mode === "light" ? colors.grey[300] : colors.grey[300],
            }}
          >
            {t("experts.noExperts")}
          </Typography>
        </Box>
      )}

      {/* Form Modal */}
      <ExpertFormModal
        open={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        expert={selectedExpert}
        mode={modalMode}
      />
    </Box>
  );
}
