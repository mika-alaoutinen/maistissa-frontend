/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
interface Validation<T> {
  required?: {
    value: boolean;
    message: string;
  };
  valid?: {
    isValid: (value: T[Extract<keyof T, string>]) => boolean;
    message: string;
  };
}

export type ValidationError<T> = Partial<Record<keyof T, string>>;
export type ValidationRules<T> = Partial<Record<keyof T, Validation<T>>>;

export const validate = <T>(data: T, rules: ValidationRules<T>): ValidationError<T> => {
  const newErrors: ValidationError<T> = {};

  for (const key in rules) {
    const value = data[key];
    const validation = rules[key];

    const custom = validation?.valid;
    if (custom?.isValid && !custom.isValid(value)) {
      newErrors[key] = custom.message;
    }

    if (validation?.required?.value && !value) {
      newErrors[key] = validation?.required?.message;
    }
  }

  return newErrors;
};
