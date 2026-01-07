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
  Chip,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { tokens } from "@/themes/colors";
import { useLocale } from "@/contexts/LocaleContext";
import { Company } from "@/types/industry";
import { useRouter } from "next/navigation";
import { getIndustryConfig } from "@/config/industries";

interface CompaniesTableProps {
  companies: Company[];
}

const CompaniesTable = ({ companies }: CompaniesTableProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isLightMode = theme.palette.mode === "light";
  const { t, locale } = useLocale();
  const router = useRouter();

  const handleViewDetails = (companyId: string) => {
    router.push(`/admin/${locale}/companies/${companyId}`);
  };

  const getIndustryName = (industry: string) => {
    const config = getIndustryConfig(industry as any);
    return config ? config.name : industry;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
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
            <TableCell
              sx={{
                color: isLightMode ? colors.grey[100] : colors.grey[100],
                fontWeight: "bold",
                borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
              }}
            >
              {t("admin.companies.table.name")}
            </TableCell>
            <TableCell
              sx={{
                color: isLightMode ? colors.grey[100] : colors.grey[100],
                fontWeight: "bold",
                borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
              }}
            >
              {t("admin.companies.table.email")}
            </TableCell>
            <TableCell
              sx={{
                color: isLightMode ? colors.grey[100] : colors.grey[100],
                fontWeight: "bold",
                borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
              }}
            >
              {t("admin.companies.table.industry")}
            </TableCell>
            <TableCell
              sx={{
                color: isLightMode ? colors.grey[100] : colors.grey[100],
                fontWeight: "bold",
                borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
              }}
            >
              {t("admin.companies.table.status")}
            </TableCell>
            <TableCell
              sx={{
                color: isLightMode ? colors.grey[100] : colors.grey[100],
                fontWeight: "bold",
                borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
                textAlign: "center",
              }}
            >
              {t("admin.companies.table.actions")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {companies.map((company) => (
            <TableRow
              key={company.id}
              sx={{
                backgroundColor: isLightMode ? "#ffffff" : "transparent",
                "&:hover": {
                  backgroundColor: isLightMode ? colors.grey[900] : colors.primary[500],
                  cursor: "pointer",
                },
                borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
              }}
              onClick={() => handleViewDetails(company.id)}
            >
              <TableCell sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
                {company.name}
              </TableCell>
              <TableCell sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
                {company.email}
              </TableCell>
              <TableCell sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
                {getIndustryName(company.industry)}
              </TableCell>
              <TableCell>
                <Chip
                  label={company.status || "active"}
                  color={getStatusColor(company.status as string) as any}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(company.id);
                    }}
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
                    <VisibilityOutlinedIcon />
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

export default CompaniesTable;

