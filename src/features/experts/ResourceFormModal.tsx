"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  MenuItem,
  useTheme,
  Typography,
} from "@mui/material";
import { tokens } from "@/themes/colors";
import { useLocale } from "@/contexts/LocaleContext";
import { useCompany } from "@/contexts/CompanyContext";
import { Resource, Expert, Room, RestaurantTable, Tour } from "@/types/resources";

interface ResourceFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (resource: Omit<Resource, "id"> | Resource) => Promise<void>;
  resource?: Resource | null;
  mode: "create" | "edit";
}

export default function ResourceFormModal({
  open,
  onClose,
  onSubmit,
  resource,
  mode,
}: ResourceFormModalProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useLocale();
  const { industryConfig } = useCompany();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sektöre göre form data state'leri
  const [expertFormData, setExpertFormData] = useState({
    name: "",
    surname: "",
    age: "",
    gender: "Kadın" as "Kadın" | "Erkek",
    experience: "",
  });

  const [roomFormData, setRoomFormData] = useState({
    roomNumber: "",
    capacity: "",
    floor: "",
    roomType: "",
    amenities: "",
    price: "",
  });

  const [tableFormData, setTableFormData] = useState({
    tableNumber: "",
    capacity: "",
    location: "indoor" as "indoor" | "outdoor" | "window",
    status: "available" as "available" | "occupied" | "reserved",
  });

  const [tourFormData, setTourFormData] = useState({
    tourName: "",
    destination: "",
    duration: "",
    capacity: "",
    price: "",
    status: "available" as "available" | "full" | "cancelled",
    departureDate: "",
  });

  // Form data'yı resource'dan yükle
  useEffect(() => {
    if (mode === "edit" && resource) {
      if (resource.type === "expert") {
        const expert = resource as Expert;
        setExpertFormData({
          name: expert.name,
          surname: expert.surname,
          age: expert.age.toString(),
          gender: expert.gender,
          experience: expert.experience.toString(),
        });
      } else if (resource.type === "room") {
        const room = resource as Room;
        setRoomFormData({
          roomNumber: room.roomNumber,
          capacity: room.capacity.toString(),
          floor: room.floor.toString(),
          roomType: room.roomType,
          amenities: room.amenities.join(", "),
          price: room.price.toString(),
        });
      } else if (resource.type === "table") {
        const table = resource as RestaurantTable;
        setTableFormData({
          tableNumber: table.tableNumber,
          capacity: table.capacity.toString(),
          location: table.location,
          status: table.status,
        });
      } else if (resource.type === "tour") {
        const tour = resource as Tour;
        setTourFormData({
          tourName: tour.tourName,
          destination: tour.destination,
          duration: tour.duration.toString(),
          capacity: tour.capacity.toString(),
          price: tour.price.toString(),
          status: tour.status,
          departureDate: tour.departureDate || "",
        });
      }
    } else {
      // Reset form
      setExpertFormData({
        name: "",
        surname: "",
        age: "",
        gender: "Kadın",
        experience: "",
      });
      setRoomFormData({
        roomNumber: "",
        capacity: "",
        floor: "",
        roomType: "",
        amenities: "",
        price: "",
      });
      setTableFormData({
        tableNumber: "",
        capacity: "",
        location: "indoor",
        status: "available",
      });
      setTourFormData({
        tourName: "",
        destination: "",
        duration: "",
        capacity: "",
        price: "",
        status: "available",
        departureDate: "",
      });
    }
    setErrors({});
  }, [resource, mode, open]);

  // Validation fonksiyonları
  const validateExpert = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!expertFormData.name.trim()) newErrors.name = t("experts.form.validation.nameRequired");
    if (!expertFormData.surname.trim())
      newErrors.surname = t("experts.form.validation.surnameRequired");
    const age = parseInt(expertFormData.age);
    if (!expertFormData.age || isNaN(age) || age < 18 || age > 100)
      newErrors.age = t("experts.form.validation.ageInvalid");
    const experience = parseInt(expertFormData.experience);
    if (!expertFormData.experience || isNaN(experience) || experience < 0 || experience > 50)
      newErrors.experience = t("experts.form.validation.experienceInvalid");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRoom = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!roomFormData.roomNumber.trim())
      newErrors.roomNumber = t("rooms.form.validation.roomNumberRequired");
    const capacity = parseInt(roomFormData.capacity);
    if (!roomFormData.capacity || isNaN(capacity) || capacity < 1 || capacity > 10)
      newErrors.capacity = t("rooms.form.validation.capacityInvalid");
    const floor = parseInt(roomFormData.floor);
    if (!roomFormData.floor || isNaN(floor) || floor < 0 || floor > 50)
      newErrors.floor = t("rooms.form.validation.floorInvalid");
    if (!roomFormData.roomType.trim())
      newErrors.roomType = t("rooms.form.validation.roomTypeRequired");
    const price = parseFloat(roomFormData.price);
    if (!roomFormData.price || isNaN(price) || price <= 0)
      newErrors.price = t("rooms.form.validation.priceInvalid");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateTable = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!tableFormData.tableNumber.trim())
      newErrors.tableNumber = t("tables.form.validation.tableNumberRequired");
    const capacity = parseInt(tableFormData.capacity);
    if (!tableFormData.capacity || isNaN(capacity) || capacity < 1 || capacity > 20)
      newErrors.capacity = t("tables.form.validation.capacityInvalid");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateTour = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!tourFormData.tourName.trim())
      newErrors.tourName = t("tours.form.validation.tourNameRequired");
    if (!tourFormData.destination.trim())
      newErrors.destination = t("tours.form.validation.destinationRequired");
    const duration = parseInt(tourFormData.duration);
    if (!tourFormData.duration || isNaN(duration) || duration < 1 || duration > 30)
      newErrors.duration = t("tours.form.validation.durationInvalid");
    const capacity = parseInt(tourFormData.capacity);
    if (!tourFormData.capacity || isNaN(capacity) || capacity < 1 || capacity > 100)
      newErrors.capacity = t("tours.form.validation.capacityInvalid");
    const price = parseFloat(tourFormData.price);
    if (!tourFormData.price || isNaN(price) || price <= 0)
      newErrors.price = t("tours.form.validation.priceInvalid");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = false;
    let resourceData: Resource;

    if (industryConfig?.type === "hotel") {
      isValid = validateRoom();
      if (!isValid) return;
      resourceData = {
        type: "room",
        roomNumber: roomFormData.roomNumber.trim(),
        capacity: parseInt(roomFormData.capacity),
        floor: parseInt(roomFormData.floor),
        roomType: roomFormData.roomType.trim(),
        amenities: roomFormData.amenities.split(",").map((a) => a.trim()).filter(Boolean),
        price: parseFloat(roomFormData.price),
      } as Room;
    } else if (industryConfig?.type === "cafe" || industryConfig?.type === "restaurant") {
      isValid = validateTable();
      if (!isValid) return;
      resourceData = {
        type: "table",
        tableNumber: tableFormData.tableNumber.trim(),
        capacity: parseInt(tableFormData.capacity),
        location: tableFormData.location,
        status: tableFormData.status,
      } as RestaurantTable;
    } else if (industryConfig?.type === "travel_agency") {
      isValid = validateTour();
      if (!isValid) return;
      resourceData = {
        type: "tour",
        tourName: tourFormData.tourName.trim(),
        destination: tourFormData.destination.trim(),
        duration: parseInt(tourFormData.duration),
        capacity: parseInt(tourFormData.capacity),
        price: parseFloat(tourFormData.price),
        status: tourFormData.status,
        departureDate: tourFormData.departureDate || undefined,
      } as Tour;
    } else {
      isValid = validateExpert();
      if (!isValid) return;
      resourceData = {
        type: "expert",
        name: expertFormData.name.trim(),
        surname: expertFormData.surname.trim(),
        age: parseInt(expertFormData.age),
        gender: expertFormData.gender,
        experience: parseInt(expertFormData.experience),
      } as Expert;
    }

    setLoading(true);
    try {
      if (mode === "edit" && resource) {
        await onSubmit({ ...resourceData, id: resource.id });
      } else {
        await onSubmit(resourceData);
      }
      onClose();
    } catch (err) {
      console.error("Form submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleExpertChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpertFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleRoomChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleTableChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setTableFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleTourChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setTourFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const isLightMode = theme.palette.mode === "light";

  // DRY: Ortak TextField stilleri
  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: isLightMode ? "#ffffff" : colors.primary[500],
      "& fieldset": {
        borderColor: isLightMode ? colors.grey[700] : colors.grey[700],
      },
      "&:hover fieldset": {
        borderColor: isLightMode ? colors.grey[600] : colors.grey[100],
      },
      "&.Mui-focused fieldset": {
        borderColor: colors.blueAccent[500],
      },
    },
    "& .MuiInputLabel-root": {
      color: isLightMode ? colors.grey[300] : colors.grey[500],
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(14px, -9px) scale(0.75)",
      color: isLightMode ? colors.grey[300] : colors.grey[300],
      backgroundColor: isLightMode ? "#ffffff" : "transparent",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: colors.blueAccent[500],
    },
    "& .MuiInputBase-input": {
      color: isLightMode ? colors.grey[100] : colors.grey[100],
      padding: "14px 12px",
      lineHeight: "1.4",
    },
    "& .MuiFormHelperText-root": {
      color: colors.redAccent[500],
    },
  };

  const selectFieldStyles = {
    ...textFieldStyles,
    "& .MuiSvgIcon-root": {
      color: isLightMode ? colors.grey[300] : colors.grey[300],
    },
  };

  // Sektöre göre form başlığı
  const getDialogTitle = () => {
    if (industryConfig?.type === "hotel") {
      return mode === "create" ? t("rooms.form.addTitle") : t("rooms.form.editTitle");
    } else if (industryConfig?.type === "cafe" || industryConfig?.type === "restaurant") {
      return mode === "create" ? t("tables.form.addTitle") : t("tables.form.editTitle");
    } else if (industryConfig?.type === "travel_agency") {
      return mode === "create" ? t("tours.form.addTitle") : t("tours.form.editTitle");
    } else {
      return mode === "create" ? t("experts.form.addTitle") : t("experts.form.editTitle");
    }
  };

  // Sektöre göre form alanlarını render et
  const renderFormFields = () => {
    if (industryConfig?.type === "hotel") {
      return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label={t("rooms.form.roomNumber")}
            value={roomFormData.roomNumber}
            onChange={handleRoomChange("roomNumber")}
            fullWidth
            required
            error={!!errors.roomNumber}
            helperText={errors.roomNumber}
            sx={textFieldStyles}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label={t("rooms.form.capacity")}
              type="number"
              value={roomFormData.capacity}
              onChange={handleRoomChange("capacity")}
              fullWidth
              required
              error={!!errors.capacity}
              helperText={errors.capacity}
              inputProps={{ min: 1, max: 10 }}
              sx={textFieldStyles}
            />
            <TextField
              label={t("rooms.form.floor")}
              type="number"
              value={roomFormData.floor}
              onChange={handleRoomChange("floor")}
              fullWidth
              required
              error={!!errors.floor}
              helperText={errors.floor}
              inputProps={{ min: 0, max: 50 }}
              sx={textFieldStyles}
            />
          </Box>
          <TextField
            label={t("rooms.form.roomType")}
            value={roomFormData.roomType}
            onChange={handleRoomChange("roomType")}
            fullWidth
            required
            error={!!errors.roomType}
            helperText={errors.roomType}
            sx={textFieldStyles}
          />
          <TextField
            label={t("rooms.form.amenities")}
            value={roomFormData.amenities}
            onChange={handleRoomChange("amenities")}
            fullWidth
            placeholder="WiFi, TV, Minibar (comma separated)"
            sx={textFieldStyles}
          />
          <TextField
            label={t("rooms.form.price")}
            type="number"
            value={roomFormData.price}
            onChange={handleRoomChange("price")}
            fullWidth
            required
            error={!!errors.price}
            helperText={errors.price}
            inputProps={{ min: 0, step: 0.01 }}
            sx={textFieldStyles}
          />
        </Box>
      );
    } else if (industryConfig?.type === "cafe" || industryConfig?.type === "restaurant") {
      return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label={t("tables.form.tableNumber")}
            value={tableFormData.tableNumber}
            onChange={handleTableChange("tableNumber")}
            fullWidth
            required
            error={!!errors.tableNumber}
            helperText={errors.tableNumber}
            sx={textFieldStyles}
          />
          <TextField
            label={t("tables.form.capacity")}
            type="number"
            value={tableFormData.capacity}
            onChange={handleTableChange("capacity")}
            fullWidth
            required
            error={!!errors.capacity}
            helperText={errors.capacity}
            inputProps={{ min: 1, max: 20 }}
            sx={textFieldStyles}
          />
          <TextField
            label={t("tables.form.location")}
            select
            value={tableFormData.location}
            onChange={handleTableChange("location")}
            fullWidth
            required
            sx={selectFieldStyles}
          >
            <MenuItem value="indoor" sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
              {t("tables.location.indoor")}
            </MenuItem>
            <MenuItem value="outdoor" sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
              {t("tables.location.outdoor")}
            </MenuItem>
            <MenuItem value="window" sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}>
              {t("tables.location.window")}
            </MenuItem>
          </TextField>
          <TextField
            label={t("tables.form.status")}
            select
            value={tableFormData.status}
            onChange={handleTableChange("status")}
            fullWidth
            required
            sx={selectFieldStyles}
          >
            <MenuItem
              value="available"
              sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}
            >
              {t("tables.status.available")}
            </MenuItem>
            <MenuItem
              value="occupied"
              sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}
            >
              {t("tables.status.occupied")}
            </MenuItem>
            <MenuItem
              value="reserved"
              sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}
            >
              {t("tables.status.reserved")}
            </MenuItem>
          </TextField>
        </Box>
      );
    } else if (industryConfig?.type === "travel_agency") {
      return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label={t("tours.form.tourName")}
            value={tourFormData.tourName}
            onChange={handleTourChange("tourName")}
            fullWidth
            required
            error={!!errors.tourName}
            helperText={errors.tourName}
            sx={textFieldStyles}
          />
          <TextField
            label={t("tours.form.destination")}
            value={tourFormData.destination}
            onChange={handleTourChange("destination")}
            fullWidth
            required
            error={!!errors.destination}
            helperText={errors.destination}
            sx={textFieldStyles}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label={t("tours.form.duration")}
              type="number"
              value={tourFormData.duration}
              onChange={handleTourChange("duration")}
              fullWidth
              required
              error={!!errors.duration}
              helperText={errors.duration}
              inputProps={{ min: 1, max: 30 }}
              sx={textFieldStyles}
            />
            <TextField
              label={t("tours.form.capacity")}
              type="number"
              value={tourFormData.capacity}
              onChange={handleTourChange("capacity")}
              fullWidth
              required
              error={!!errors.capacity}
              helperText={errors.capacity}
              inputProps={{ min: 1, max: 100 }}
              sx={textFieldStyles}
            />
          </Box>
          <TextField
            label={t("tours.form.price")}
            type="number"
            value={tourFormData.price}
            onChange={handleTourChange("price")}
            fullWidth
            required
            error={!!errors.price}
            helperText={errors.price}
            inputProps={{ min: 0, step: 0.01 }}
            sx={textFieldStyles}
          />
          <TextField
            label={t("tours.form.status")}
            select
            value={tourFormData.status}
            onChange={handleTourChange("status")}
            fullWidth
            required
            sx={selectFieldStyles}
          >
            <MenuItem
              value="available"
              sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}
            >
              {t("tours.status.available")}
            </MenuItem>
            <MenuItem
              value="full"
              sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}
            >
              {t("tours.status.full")}
            </MenuItem>
            <MenuItem
              value="cancelled"
              sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}
            >
              {t("tours.status.cancelled")}
            </MenuItem>
          </TextField>
          <TextField
            label={t("tours.form.departureDate")}
            type="date"
            value={tourFormData.departureDate}
            onChange={handleTourChange("departureDate")}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={textFieldStyles}
          />
        </Box>
      );
    } else {
      // Expert form (default)
      return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label={t("experts.form.name")}
            value={expertFormData.name}
            onChange={handleExpertChange("name")}
            fullWidth
            required
            error={!!errors.name}
            helperText={errors.name}
            sx={textFieldStyles}
          />
          <TextField
            label={t("experts.form.surname")}
            value={expertFormData.surname}
            onChange={handleExpertChange("surname")}
            fullWidth
            required
            error={!!errors.surname}
            helperText={errors.surname}
            sx={textFieldStyles}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label={t("experts.form.age")}
              type="number"
              value={expertFormData.age}
              onChange={handleExpertChange("age")}
              fullWidth
              required
              error={!!errors.age}
              helperText={errors.age}
              inputProps={{ min: 18, max: 100 }}
              sx={textFieldStyles}
            />
            <TextField
              label={t("experts.form.gender")}
              select
              value={expertFormData.gender}
              onChange={handleExpertChange("gender")}
              fullWidth
              required
              sx={selectFieldStyles}
            >
              <MenuItem
                value="Kadın"
                sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}
              >
                {t("common.gender.female")}
              </MenuItem>
              <MenuItem
                value="Erkek"
                sx={{ color: isLightMode ? colors.grey[100] : colors.grey[100] }}
              >
                {t("common.gender.male")}
              </MenuItem>
            </TextField>
          </Box>
          <TextField
            label={t("experts.form.experience")}
            type="number"
            value={expertFormData.experience}
            onChange={handleExpertChange("experience")}
            fullWidth
            required
            error={!!errors.experience}
            helperText={errors.experience}
            inputProps={{ min: 0, max: 50 }}
            sx={textFieldStyles}
          />
        </Box>
      );
    }
  };

  const getSubmitButtonText = () => {
    if (loading) {
      return mode === "create"
        ? industryConfig?.type === "hotel"
          ? t("rooms.form.adding")
          : industryConfig?.type === "cafe" || industryConfig?.type === "restaurant"
          ? t("tables.form.adding")
          : t("experts.form.adding")
        : industryConfig?.type === "hotel"
        ? t("rooms.form.updating")
        : industryConfig?.type === "cafe" || industryConfig?.type === "restaurant"
        ? t("tables.form.updating")
        : t("experts.form.updating");
    }
    return mode === "create"
      ? industryConfig?.type === "hotel"
        ? t("rooms.form.add")
        : industryConfig?.type === "cafe" || industryConfig?.type === "restaurant"
        ? t("tables.form.add")
        : t("experts.form.add")
      : industryConfig?.type === "hotel"
      ? t("rooms.form.update")
      : industryConfig?.type === "cafe" || industryConfig?.type === "restaurant"
      ? t("tables.form.update")
      : t("experts.form.update");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: isLightMode ? "#ffffff" : colors.primary[400],
          backgroundImage: "none",
          boxShadow: isLightMode
            ? "0 4px 20px rgba(0,0,0,0.15)"
            : "0 4px 20px rgba(0,0,0,0.5)",
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle
          sx={{
            color: isLightMode ? colors.grey[100] : colors.grey[100],
            borderBottom: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
            pb: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {getDialogTitle()}
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>{renderFormFields()}</DialogContent>

        <DialogActions
          sx={{
            p: 3,
            borderTop: `1px solid ${isLightMode ? colors.grey[800] : colors.grey[700]}`,
            gap: 2,
          }}
        >
          <Button
            onClick={onClose}
            disabled={loading}
            sx={{
              color: isLightMode ? colors.grey[300] : colors.grey[300],
              "&:hover": {
                backgroundColor: isLightMode ? colors.grey[900] : colors.primary[500],
              },
            }}
          >
            {t("common.cancel")}
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: colors.blueAccent[500],
              color: "#ffffff",
              "&:hover": {
                backgroundColor: colors.blueAccent[600],
              },
              "&:disabled": {
                backgroundColor: isLightMode ? colors.grey[800] : colors.grey[700],
                color: isLightMode ? colors.grey[600] : colors.grey[500],
              },
            }}
          >
            {getSubmitButtonText()}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

