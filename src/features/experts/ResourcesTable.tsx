"use client";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { tokens } from "@/themes/colors";
import { useLocale } from "@/contexts/LocaleContext";
import { useCompany } from "@/contexts/CompanyContext";
import { Resource, Expert, Room, RestaurantTable } from "@/types/resources";

interface ResourcesTableProps {
  resources: Resource[];
  onEdit: (resource: Resource) => void;
  onDelete: (resourceId: string) => void;
}

const ResourcesTable = ({ resources, onEdit, onDelete }: ResourcesTableProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isLightMode = theme.palette.mode === "light";
  const { t } = useLocale();
  const { industryConfig } = useCompany();

  // Sektöre göre tablo başlıklarını render et
  const renderTableHeaders = () => {
    if (industryConfig?.type === "hotel") {
      return (
        <>
          <TableCell
            sx={{
              color: isLightMode ? colors.grey[100] : colors.grey[100],
              fontWeight: "bold",
              borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
            }}
          >
            {t("rooms.table.roomNumber")}
          </TableCell>
          <TableCell
            sx={{
              color: isLightMode ? colors.grey[100] : colors.grey[100],
              fontWeight: "bold",
              borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
            }}
          >
            {t("rooms.table.capacity")}
          </TableCell>
          <TableCell
            sx={{
              color: isLightMode ? colors.grey[100] : colors.grey[100],
              fontWeight: "bold",
              borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
            }}
          >
            {t("rooms.table.floor")}
          </TableCell>
          <TableCell
            sx={{
              color: isLightMode ? colors.grey[100] : colors.grey[100],
              fontWeight: "bold",
              borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
            }}
          >
            {t("rooms.table.roomType")}
          </TableCell>
          <TableCell
            sx={{
              color: isLightMode ? colors.grey[100] : colors.grey[100],
              fontWeight: "bold",
              borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
            }}
          >
            {t("rooms.table.price")}
          </TableCell>
          <TableCell
            sx={{
              color: isLightMode ? colors.grey[100] : colors.grey[100],
              fontWeight: "bold",
              borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
              textAlign: "center",
            }}
          >
            {t("rooms.table.actions")}
          </TableCell>
        </>
      );
    } else if (industryConfig?.type === "cafe" || industryConfig?.type === "restaurant") {
      return (
        <>
          <TableCell
            sx={{
              color: isLightMode ? colors.grey[100] : colors.grey[100],
              fontWeight: "bold",
              borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
            }}
          >
            {t("tables.table.tableNumber")}
          </TableCell>
          <TableCell
            sx={{
              color: isLightMode ? colors.grey[100] : colors.grey[100],
              fontWeight: "bold",
              borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
            }}
          >
            {t("tables.table.capacity")}
          </TableCell>
          <TableCell
            sx={{
              color: isLightMode ? colors.grey[100] : colors.grey[100],
              fontWeight: "bold",
              borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
            }}
          >
            {t("tables.table.location")}
          </TableCell>
          <TableCell
            sx={{
              color: isLightMode ? colors.grey[100] : colors.grey[100],
              fontWeight: "bold",
              borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
            }}
          >
            {t("tables.table.status")}
          </TableCell>
          <TableCell
            sx={{
              color: isLightMode ? colors.grey[100] : colors.grey[100],
              fontWeight: "bold",
              borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
              textAlign: "center",
            }}
          >
            {t("tables.table.actions")}
          </TableCell>
        </>
      );
    } else {
      // Expert tablosu (default - beauty salon, spa, fitness, clinic)
      return (
        <>
          <TableCell
            sx={{
              color: isLightMode ? colors.grey[100] : colors.grey[100],
              fontWeight: "bold",
              borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
            }}
          >
            {t("experts.table.name")}
          </TableCell>
          <TableCell
            sx={{
              color: isLightMode ? colors.grey[100] : colors.grey[100],
              fontWeight: "bold",
              borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
            }}
          >
            {t("experts.table.age")}
          </TableCell>
          <TableCell
            sx={{
              color: isLightMode ? colors.grey[100] : colors.grey[100],
              fontWeight: "bold",
              borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
            }}
          >
            {t("experts.table.gender")}
          </TableCell>
          <TableCell
            sx={{
              color: isLightMode ? colors.grey[100] : colors.grey[100],
              fontWeight: "bold",
              borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
            }}
          >
            {t("experts.table.experience")}
          </TableCell>
          <TableCell
            sx={{
              color: isLightMode ? colors.grey[100] : colors.grey[100],
              fontWeight: "bold",
              borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
              textAlign: "center",
            }}
          >
            {t("experts.table.actions")}
          </TableCell>
        </>
      );
    }
  };

  // Sektöre göre tablo satırlarını render et
  const renderTableRows = () => {
    return resources.map((resource) => {
      if (resource.type === "room") {
        const room = resource as Room;
        return (
          <TableRow
            key={room.id}
            sx={{
              backgroundColor: isLightMode ? "#ffffff" : "transparent",
              "&:hover": {
                backgroundColor: isLightMode ? colors.grey[900] : colors.primary[500],
              },
              borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
            }}
          >
            <TableCell sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
              {room.roomNumber}
            </TableCell>
            <TableCell sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
              {room.capacity}
            </TableCell>
            <TableCell sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
              {room.floor}
            </TableCell>
            <TableCell sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
              {room.roomType}
            </TableCell>
            <TableCell sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
              {room.price.toLocaleString()} ₺
            </TableCell>
            <TableCell>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                <IconButton
                  onClick={() => onEdit(room)}
                  sx={{
                    color: colors.blueAccent[500],
                    "&:hover": {
                      backgroundColor: isLightMode
                        ? colors.blueAccent[900]
                        : colors.blueAccent[800],
                    },
                  }}
                  size="small"
                >
                  <EditOutlinedIcon />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(room.id)}
                  sx={{
                    color: colors.redAccent[500],
                    "&:hover": {
                      backgroundColor: isLightMode
                        ? colors.redAccent[900]
                        : colors.redAccent[800],
                    },
                  }}
                  size="small"
                >
                  <DeleteOutlinedIcon />
                </IconButton>
              </Box>
            </TableCell>
          </TableRow>
        );
      } else if (resource.type === "table") {
        const table = resource as RestaurantTable;
        return (
          <TableRow
            key={table.id}
            sx={{
              backgroundColor: isLightMode ? "#ffffff" : "transparent",
              "&:hover": {
                backgroundColor: isLightMode ? colors.grey[900] : colors.primary[500],
              },
              borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
            }}
          >
            <TableCell sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
              {table.tableNumber}
            </TableCell>
            <TableCell sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
              {table.capacity}
            </TableCell>
            <TableCell sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
              {t(`tables.location.${table.location}`)}
            </TableCell>
            <TableCell sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
              {t(`tables.status.${table.status}`)}
            </TableCell>
            <TableCell>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                <IconButton
                  onClick={() => onEdit(table)}
                  sx={{
                    color: colors.blueAccent[500],
                    "&:hover": {
                      backgroundColor: isLightMode
                        ? colors.blueAccent[900]
                        : colors.blueAccent[800],
                    },
                  }}
                  size="small"
                >
                  <EditOutlinedIcon />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(table.id)}
                  sx={{
                    color: colors.redAccent[500],
                    "&:hover": {
                      backgroundColor: isLightMode
                        ? colors.redAccent[900]
                        : colors.redAccent[800],
                    },
                  }}
                  size="small"
                >
                  <DeleteOutlinedIcon />
                </IconButton>
              </Box>
            </TableCell>
          </TableRow>
        );
      } else {
        // Expert row (default)
        const expert = resource as Expert;
        return (
          <TableRow
            key={expert.id}
            sx={{
              backgroundColor: isLightMode ? "#ffffff" : "transparent",
              "&:hover": {
                backgroundColor: isLightMode ? colors.grey[900] : colors.primary[500],
              },
              borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
            }}
          >
            <TableCell sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
              {expert.name} {expert.surname}
            </TableCell>
            <TableCell sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
              {expert.age}
            </TableCell>
            <TableCell sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
              {expert.gender === "Kadın"
                ? t("common.gender.female")
                : t("common.gender.male")}
            </TableCell>
            <TableCell sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
              {expert.experience} {t("experts.year")}
            </TableCell>
            <TableCell>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                <IconButton
                  onClick={() => onEdit(expert)}
                  sx={{
                    color: colors.blueAccent[500],
                    "&:hover": {
                      backgroundColor: isLightMode
                        ? colors.blueAccent[900]
                        : colors.blueAccent[800],
                    },
                  }}
                  size="small"
                >
                  <EditOutlinedIcon />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(expert.id)}
                  sx={{
                    color: colors.redAccent[500],
                    "&:hover": {
                      backgroundColor: isLightMode
                        ? colors.redAccent[900]
                        : colors.redAccent[800],
                    },
                  }}
                  size="small"
                >
                  <DeleteOutlinedIcon />
                </IconButton>
              </Box>
            </TableCell>
          </TableRow>
        );
      }
    });
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: isLightMode ? "#ffffff" : colors.primary[400],
        borderRadius: "8px",
        boxShadow: isLightMode ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: isLightMode ? colors.grey[900] : "transparent",
            }}
          >
            {renderTableHeaders()}
          </TableRow>
        </TableHead>
        <TableBody>{renderTableRows()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResourcesTable;

