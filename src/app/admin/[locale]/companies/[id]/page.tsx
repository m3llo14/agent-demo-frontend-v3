"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  useTheme,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  MenuItem,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { tokens } from "@/themes/colors";
import { useLocale } from "@/contexts/LocaleContext";
import { companiesService } from "@/features/admin/services/companies.service";
import { CompanyDetail, AddSubscriptionRequest, AddAdminRequest } from "@/types/companies";
import { getIndustryConfig } from "@/config/industries";
import { getSimpleTextFieldStyles } from "@/lib/form-styles";
import { FormValidator } from "@/lib/validation";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`company-tabpanel-${index}`}
      aria-labelledby={`company-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function CompanyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t, locale } = useLocale();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [company, setCompany] = useState<CompanyDetail | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const isLightMode = theme.palette.mode === "light";

  const [subscriptionForm, setSubscriptionForm] = useState<AddSubscriptionRequest>({
    plan: "",
    startDate: "",
    endDate: "",
  });

  const [adminForm, setAdminForm] = useState<AddAdminRequest>({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const companyId = params.id as string;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const loadCompany = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await companiesService.getById(companyId);
        setCompany(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load company");
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      loadCompany();
    }
  }, [companyId]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAddSubscription = async () => {
    const validator = new FormValidator();
    
    validator
      .required("plan", subscriptionForm.plan, t("admin.companies.detail.subscription.add.planRequired"))
      .required("startDate", subscriptionForm.startDate, t("admin.companies.detail.subscription.add.startDateRequired"))
      .required("endDate", subscriptionForm.endDate, t("admin.companies.detail.subscription.add.endDateRequired"));

    const errors = validator.getErrors();
    if (!validator.isValid()) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);
    try {
      const subscription = await companiesService.addSubscription(companyId, subscriptionForm);
      setCompany((prev) => (prev ? { ...prev, subscription } : null));
      setSubscriptionModalOpen(false);
      setSubscriptionForm({ plan: "", startDate: "", endDate: "" });
      setFormErrors({});
    } catch (err) {
      setFormErrors({
        submit: err instanceof Error ? err.message : t("admin.companies.detail.subscription.add.addError"),
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddAdmin = async () => {
    const validator = new FormValidator();
    
    validator
      .required("email", adminForm.email, t("admin.companies.detail.admin.add.emailRequired"))
      .email("email", adminForm.email, t("admin.companies.detail.admin.add.emailInvalid"))
      .required("password", adminForm.password, t("admin.companies.detail.admin.add.passwordRequired"))
      .passwordMinLength("password", adminForm.password, 6, t("admin.companies.detail.admin.add.passwordMinLength"));

    const errors = validator.getErrors();
    if (!validator.isValid()) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);
    try {
      const admin = await companiesService.addAdmin(companyId, adminForm);
      setCompany((prev) => (prev ? { ...prev, admins: [...(prev.admins || []), admin] } : null));
      setAdminModalOpen(false);
      setAdminForm({ email: "", password: "" });
      setFormErrors({});
    } catch (err) {
      setFormErrors({
        submit: err instanceof Error ? err.message : t("admin.companies.detail.admin.add.addError"),
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted) {
    return (
      <Box sx={{ width: "100%" }}>
        <Box sx={{ mb: 2 }} />
        <Box sx={{ mb: 3 }} />
      </Box>
    );
  }

  if (loading) {
    return <LoadingState />;
  }

  if (error || !company) {
    return <ErrorState error={error || "Company not found"} />;
  }

  const industryConfig = getIndustryConfig(company.industry);
  const formStylesOptions = { theme, colors, isLightMode };
  const textFieldStyles = getSimpleTextFieldStyles(formStylesOptions);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push(`/admin/${locale}/companies`)}
          sx={{
            color: isLightMode ? colors.grey[300] : colors.grey[300],
            mb: 2,
            "&:hover": {
              backgroundColor: isLightMode ? colors.grey[900] : colors.primary[500],
            },
          }}
        >
          {t("common.cancel")}
        </Button>
        <Typography
          variant="h3"
          sx={{
            color: isLightMode ? colors.grey[100] : colors.grey[100],
            fontWeight: "bold",
            mb: 1,
          }}
        >
          {t("admin.companies.detail.title")}
        </Typography>
      </Box>

      {/* Tabs */}
      <Paper
        sx={{
          backgroundColor: isLightMode ? "#ffffff" : colors.primary[400],
          borderRadius: "8px",
          boxShadow: isLightMode ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
            "& .MuiTab-root": {
              color: isLightMode ? colors.grey[300] : colors.grey[300],
              "&.Mui-selected": {
                color: colors.blueAccent[500],
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: colors.blueAccent[500],
            },
          }}
        >
          <Tab label={t("admin.companies.detail.companyInfo")} />
          <Tab label={t("admin.companies.detail.subscription")} />
          <Tab label={t("admin.companies.detail.addAdmin")} />
        </Tabs>

        {/* Company Info Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: isLightMode ? colors.grey[300] : colors.grey[300], mb: 0.5 }}
                >
                  {t("admin.companies.detail.info.name")}
                </Typography>
                <Typography variant="body1" sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
                  {company.name}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: isLightMode ? colors.grey[300] : colors.grey[300], mb: 0.5 }}
                >
                  {t("admin.companies.detail.info.email")}
                </Typography>
                <Typography variant="body1" sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
                  {company.email}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: isLightMode ? colors.grey[300] : colors.grey[300], mb: 0.5 }}
                >
                  {t("admin.companies.detail.info.industry")}
                </Typography>
                <Typography variant="body1" sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
                  {industryConfig.name}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: isLightMode ? colors.grey[300] : colors.grey[300], mb: 0.5 }}
                >
                  {t("admin.companies.detail.info.createdAt")}
                </Typography>
                <Typography variant="body1" sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
                  {new Date(company.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: isLightMode ? colors.grey[300] : colors.grey[300], mb: 0.5 }}
                >
                  {t("admin.companies.detail.info.status")}
                </Typography>
                <Chip
                  label={company.status}
                  color={
                    company.status === "active"
                      ? "success"
                      : company.status === "inactive"
                      ? "error"
                      : "warning"
                  }
                  size="small"
                />
              </Box>
            </Box>
          </Box>
        </TabPanel>

        {/* Subscription Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ p: 3 }}>
            {company.subscription ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ color: isLightMode ? colors.grey[300] : colors.grey[300], mb: 0.5 }}
                  >
                    {t("admin.companies.detail.subscription.plan")}
                  </Typography>
                  <Typography variant="body1" sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
                    {company.subscription.plan}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ color: isLightMode ? colors.grey[300] : colors.grey[300], mb: 0.5 }}
                  >
                    {t("admin.companies.detail.subscription.status")}
                  </Typography>
                  <Chip
                    label={company.subscription.status}
                    color={company.subscription.status === "active" ? "success" : "error"}
                    size="small"
                  />
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ color: isLightMode ? colors.grey[300] : colors.grey[300], mb: 0.5 }}
                  >
                    {t("admin.companies.detail.subscription.startDate")}
                  </Typography>
                  <Typography variant="body1" sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
                    {new Date(company.subscription.startDate).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ color: isLightMode ? colors.grey[300] : colors.grey[300], mb: 0.5 }}
                  >
                    {t("admin.companies.detail.subscription.endDate")}
                  </Typography>
                  <Typography variant="body1" sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
                    {new Date(company.subscription.endDate).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Typography
                sx={{ color: isLightMode ? colors.grey[300] : colors.grey[300], mb: 3 }}
              >
                {t("admin.companies.detail.subscription.noSubscription")}
              </Typography>
            )}
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setSubscriptionModalOpen(true)}
              sx={{
                backgroundColor: colors.blueAccent[500],
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: colors.blueAccent[600],
                },
              }}
            >
              {t("admin.companies.detail.addSubscription")}
            </Button>
          </Box>
        </TabPanel>

        {/* Admins Tab */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h6" sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
                {t("admin.companies.detail.admin.title")}
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setAdminModalOpen(true)}
                sx={{
                  backgroundColor: colors.blueAccent[500],
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: colors.blueAccent[600],
                  },
                }}
              >
                {t("admin.companies.detail.addAdmin")}
              </Button>
            </Box>

            {company.admins && company.admins.length > 0 ? (
              <TableContainer
                component={Paper}
                sx={{
                  backgroundColor: isLightMode ? "#ffffff" : colors.primary[500],
                  borderRadius: "8px",
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100], fontWeight: "bold" }}>
                        {t("admin.companies.detail.admin.list.email")}
                      </TableCell>
                      <TableCell sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100], fontWeight: "bold" }}>
                        {t("admin.companies.detail.admin.list.createdAt")}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {company.admins.map((admin) => (
                      <TableRow key={admin.id}>
                        <TableCell sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
                          {admin.email}
                        </TableCell>
                        <TableCell sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
                          {new Date(admin.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography sx={{ color: isLightMode ? colors.grey[300] : colors.grey[300] }}>
                {t("admin.companies.detail.admin.list.noAdmins")}
              </Typography>
            )}
          </Box>
        </TabPanel>
      </Paper>

      {/* Add Subscription Modal */}
      <Dialog
        open={subscriptionModalOpen}
        onClose={() => {
          setSubscriptionModalOpen(false);
          setFormErrors({});
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: isLightMode ? "#ffffff" : colors.primary[400],
          },
        }}
      >
        <DialogTitle sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
          {t("admin.companies.detail.subscription.add.title")}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField
              label={t("admin.companies.detail.subscription.add.plan")}
              value={subscriptionForm.plan}
              onChange={(e) => setSubscriptionForm({ ...subscriptionForm, plan: e.target.value })}
              fullWidth
              required
              error={!!formErrors.plan}
              helperText={formErrors.plan}
              sx={textFieldStyles}
            />
            <TextField
              label={t("admin.companies.detail.subscription.add.startDate")}
              type="date"
              value={subscriptionForm.startDate}
              onChange={(e) => setSubscriptionForm({ ...subscriptionForm, startDate: e.target.value })}
              fullWidth
              required
              error={!!formErrors.startDate}
              helperText={formErrors.startDate}
              InputLabelProps={{ shrink: true }}
              sx={textFieldStyles}
            />
            <TextField
              label={t("admin.companies.detail.subscription.add.endDate")}
              type="date"
              value={subscriptionForm.endDate}
              onChange={(e) => setSubscriptionForm({ ...subscriptionForm, endDate: e.target.value })}
              fullWidth
              required
              error={!!formErrors.endDate}
              helperText={formErrors.endDate}
              InputLabelProps={{ shrink: true }}
              sx={textFieldStyles}
            />
            {formErrors.submit && (
              <Alert severity="error">{formErrors.submit}</Alert>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setSubscriptionModalOpen(false);
              setFormErrors({});
            }}
            disabled={submitting}
          >
            {t("common.cancel")}
          </Button>
          <Button
            onClick={handleAddSubscription}
            variant="contained"
            disabled={submitting}
            sx={{
              backgroundColor: colors.blueAccent[500],
              color: "#ffffff",
            }}
          >
            {submitting ? t("admin.companies.detail.subscription.add.adding") : t("admin.companies.detail.subscription.add.add")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Admin Modal */}
      <Dialog
        open={adminModalOpen}
        onClose={() => {
          setAdminModalOpen(false);
          setFormErrors({});
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: isLightMode ? "#ffffff" : colors.primary[400],
          },
        }}
      >
        <DialogTitle sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
          {t("admin.companies.detail.admin.add.title")}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField
              label={t("admin.companies.detail.admin.add.email")}
              type="email"
              value={adminForm.email}
              onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
              fullWidth
              required
              error={!!formErrors.email}
              helperText={formErrors.email}
              sx={textFieldStyles}
            />
            <TextField
              label={t("admin.companies.detail.admin.add.password")}
              type="password"
              value={adminForm.password}
              onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
              fullWidth
              required
              error={!!formErrors.password}
              helperText={formErrors.password}
              sx={textFieldStyles}
            />
            {formErrors.submit && (
              <Alert severity="error">{formErrors.submit}</Alert>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setAdminModalOpen(false);
              setFormErrors({});
            }}
            disabled={submitting}
          >
            {t("common.cancel")}
          </Button>
          <Button
            onClick={handleAddAdmin}
            variant="contained"
            disabled={submitting}
            sx={{
              backgroundColor: colors.blueAccent[500],
              color: "#ffffff",
            }}
          >
            {submitting ? t("admin.companies.detail.admin.add.adding") : t("admin.companies.detail.admin.add.add")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

