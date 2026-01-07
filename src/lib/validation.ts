/**
 * Validation Utilities
 * DRY prensibi - Tekrarlayan validation pattern'lerini merkezi bir yerde toplar
 */

/**
 * Email validation regex
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Email validation
 */
export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

/**
 * Required field validation
 */
export function validateRequired(value: string | number | null | undefined): boolean {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
}

/**
 * Number range validation
 */
export function validateNumberRange(
  value: number | string,
  min: number,
  max: number
): boolean {
  const num = typeof value === "string" ? parseInt(value, 10) : value;
  return !isNaN(num) && num >= min && num <= max;
}

/**
 * Password minimum length validation
 */
export function validatePasswordMinLength(password: string, minLength: number = 6): boolean {
  return password.length >= minLength;
}

/**
 * Form validation error builder
 */
export interface ValidationErrors {
  [key: string]: string;
}

export class FormValidator {
  private errors: ValidationErrors = {};

  /**
   * Validate required field
   */
  required(field: string, value: string | number | null | undefined, errorMessage: string): this {
    if (!validateRequired(value)) {
      this.errors[field] = errorMessage;
    }
    return this;
  }

  /**
   * Validate email
   */
  email(field: string, value: string, errorMessage: string): this {
    if (value && !validateEmail(value)) {
      this.errors[field] = errorMessage;
    }
    return this;
  }

  /**
   * Validate number range
   */
  numberRange(
    field: string,
    value: number | string,
    min: number,
    max: number,
    errorMessage: string
  ): this {
    if (value && !validateNumberRange(value, min, max)) {
      this.errors[field] = errorMessage;
    }
    return this;
  }

  /**
   * Validate password minimum length
   */
  passwordMinLength(
    field: string,
    value: string,
    minLength: number,
    errorMessage: string
  ): this {
    if (value && !validatePasswordMinLength(value, minLength)) {
      this.errors[field] = errorMessage;
    }
    return this;
  }

  /**
   * Custom validation
   */
  custom(field: string, isValid: boolean, errorMessage: string): this {
    if (!isValid) {
      this.errors[field] = errorMessage;
    }
    return this;
  }

  /**
   * Get all errors
   */
  getErrors(): ValidationErrors {
    return this.errors;
  }

  /**
   * Check if validation passed
   */
  isValid(): boolean {
    return Object.keys(this.errors).length === 0;
  }

  /**
   * Reset errors
   */
  reset(): this {
    this.errors = {};
    return this;
  }
}

