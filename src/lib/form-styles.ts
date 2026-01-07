import { Theme } from "@mui/material";
import { tokens } from "@/themes/colors";

/**
 * Form Styles Utility
 * DRY prensibi - Tekrarlayan form stil tanımlarını merkezi bir yerde toplar
 */

export interface FormStylesOptions {
  theme: Theme;
  colors: ReturnType<typeof tokens>;
  isLightMode: boolean;
}

/**
 * TextField için ortak stil tanımları
 */
export function getTextFieldStyles({ theme, colors, isLightMode }: FormStylesOptions) {
  return {
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
}

/**
 * SelectField için ortak stil tanımları
 */
export function getSelectFieldStyles(options: FormStylesOptions) {
  return {
    ...getTextFieldStyles(options),
    "& .MuiSvgIcon-root": {
      color: options.isLightMode ? options.colors.grey[300] : options.colors.grey[300],
    },
  };
}

/**
 * Basit TextField stilleri (label olmadan kullanımlar için)
 */
export function getSimpleTextFieldStyles({ colors, isLightMode }: FormStylesOptions) {
  return {
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
    "& .MuiInputBase-input": {
      color: isLightMode ? colors.grey[100] : colors.grey[100],
    },
  };
}

