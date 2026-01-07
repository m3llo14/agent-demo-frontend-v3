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
import { useResources } from "@/hooks/use-resources";
import ResourcesTable from "@/features/experts/ResourcesTable";
import ResourceFormModal from "@/features/experts/ResourceFormModal";
import { Resource } from "@/types/resources";
import { useRouter } from "next/navigation";

export default function ExpertsPage() {
  const { data, loading, error, deleteResource, updateResource, createResource } = useResources();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t, locale } = useLocale();
  const { industryConfig } = useCompany();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  // Eğer bu sektörde ilgili özellik yoksa, dashboard'a yönlendir
  if (industryConfig) {
    const hasFeature =
      industryConfig.features.experts ||
      industryConfig.features.rooms ||
      industryConfig.features.tables;
    if (!hasFeature) {
      router.push(`/${locale}/dashboard`);
      return null;
    }
  }

  // Sektöre göre dinamik başlık ve buton metinleri
  const getPageTitle = () => {
    if (industryConfig?.type === "hotel") return t("rooms.title");
    if (industryConfig?.type === "cafe" || industryConfig?.type === "restaurant")
      return t("tables.title");
    return t("experts.title");
  };

  const getPageSubtitle = () => {
    if (industryConfig?.type === "hotel") return t("rooms.subtitle");
    if (industryConfig?.type === "cafe" || industryConfig?.type === "restaurant")
      return t("tables.subtitle");
    return t("experts.subtitle");
  };

  const getAddButtonText = () => {
    if (industryConfig?.type === "hotel") return t("rooms.addNew");
    if (industryConfig?.type === "cafe" || industryConfig?.type === "restaurant")
      return t("tables.addNew");
    return t("experts.addNew");
  };

  const getNoDataText = () => {
    if (industryConfig?.type === "hotel") return t("rooms.noRooms");
    if (industryConfig?.type === "cafe" || industryConfig?.type === "restaurant")
      return t("tables.noTables");
    return t("experts.noExperts");
  };

  const getDeleteConfirmText = () => {
    if (industryConfig?.type === "hotel") return t("rooms.form.deleteConfirm");
    if (industryConfig?.type === "cafe" || industryConfig?.type === "restaurant")
      return t("tables.form.deleteConfirm");
    return t("experts.form.deleteConfirm");
  };

  const getDeleteErrorText = () => {
    if (industryConfig?.type === "hotel") return t("rooms.form.deleteError");
    if (industryConfig?.type === "cafe" || industryConfig?.type === "restaurant")
      return t("tables.form.deleteError");
    return t("experts.form.deleteError");
  };

  const handleAddNew = () => {
    setSelectedResource(null);
    setModalMode("create");
    setModalOpen(true);
  };

  const handleEdit = (resource: Resource) => {
    setSelectedResource(resource);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedResource(null);
  };

  const handleModalSubmit = async (resource: Omit<Resource, "id"> | Resource) => {
    try {
      if (modalMode === "create") {
        await createResource(resource as Omit<Resource, "id">);
      } else {
        await updateResource(resource as Resource);
      }
    } catch (err) {
      throw err; // Modal içinde handle edilecek
    }
  };

  const handleDelete = async (resourceId: string) => {
    if (window.confirm(getDeleteConfirmText())) {
      try {
        await deleteResource(resourceId);
      } catch (err) {
        alert(err instanceof Error ? err.message : getDeleteErrorText());
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
            {getPageTitle()}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.mode === "light" ? colors.grey[300] : colors.grey[300],
            }}
          >
            {getPageSubtitle()}
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
          {getAddButtonText()}
        </Button>
      </Box>

      {/* Table */}
      {data.length > 0 ? (
        <ResourcesTable
          resources={data}
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
            {getNoDataText()}
          </Typography>
        </Box>
      )}

      {/* Form Modal */}
      <ResourceFormModal
        open={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        resource={selectedResource}
        mode={modalMode}
      />
    </Box>
  );
}
