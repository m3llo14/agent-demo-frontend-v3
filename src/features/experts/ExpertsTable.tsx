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
  Typography,
  useTheme,
  CircularProgress,
  Alert,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { tokens } from "@/themes/colors";
import { Expert } from "@/types/experts";

interface ExpertsTableProps {
  experts: Expert[];
  onEdit: (expert: Expert) => void;
  onDelete: (expertId: string) => void;
}

const ExpertsTable = ({ experts, onEdit, onDelete }: ExpertsTableProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isLightMode = theme.palette.mode === "light";

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
            <TableCell
              sx={{
                color: isLightMode ? colors.grey[100] : colors.grey[100],
                fontWeight: "bold",
                borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
              }}
            >
              Ad Soyad
            </TableCell>
            <TableCell
              sx={{
                color: isLightMode ? colors.grey[100] : colors.grey[100],
                fontWeight: "bold",
                borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
              }}
            >
              Yaş
            </TableCell>
            <TableCell
              sx={{
                color: isLightMode ? colors.grey[100] : colors.grey[100],
                fontWeight: "bold",
                borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
              }}
            >
              Cinsiyet
            </TableCell>
            <TableCell
              sx={{
                color: isLightMode ? colors.grey[100] : colors.grey[100],
                fontWeight: "bold",
                borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
              }}
            >
              Deneyim (Yıl)
            </TableCell>
            <TableCell
              sx={{
                color: isLightMode ? colors.grey[100] : colors.grey[100],
                fontWeight: "bold",
                borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
                textAlign: "center",
              }}
            >
              İşlemler
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {experts.map((expert) => (
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
                {expert.gender}
              </TableCell>
              <TableCell sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
                {expert.experience} yıl
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpertsTable;

