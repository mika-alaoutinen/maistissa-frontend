/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { useState } from 'react';

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

type ValidationError<T> = Partial<Record<keyof T, string>>;
export type Validations<T> = Partial<Record<keyof T, Validation<T>>>;

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export interface Form<T> {
  data: T;
  errors: ValidationError<T>;
  onChange: (key: keyof T) => (e: ChangeEvent) => void;
  resetForm: () => void;
  validate: () => ValidationError<T>[];
}

export const useForm = <T>(initialState: T, validations?: Validations<T>): Form<T> => {
  const [data, setData] = useState<T>(initialState);
  const [errors, setErrors] = useState<ValidationError<T>>({});

  const updateField = (key: keyof T, e: ChangeEvent): void => {
    const edited: T = {
      ...data,
      [key]: e.target.value,
    };
    setData(edited);
  };

  const validate = (): ValidationError<T>[] => {
    if (!validations) {
      return [];
    }

    let valid = true;
    const newErrors: ValidationError<T> = {};

    for (const key in validations) {
      const value = data[key];
      const validation = validations[key];

      if (validation?.required?.value && !value) {
        valid = false;
        newErrors[key] = validation?.required?.message;
      }

      const custom = validation?.valid;
      if (custom?.isValid && !custom.isValid(value)) {
        valid = false;
        newErrors[key] = custom.message;
      }
    }

    if (!valid) {
      setErrors(newErrors);
    } else {
      setErrors({});
    }

    return [];
  };

  const onChange = (key: keyof T) => (e: ChangeEvent): void => {
    updateField(key, e);
    validate(); // Do validations on field somehow
  };

  const resetForm = (): void => {
    setErrors({});
    setData(initialState);
  };

  return {
    data,
    errors,
    onChange,
    resetForm,
    validate,
  };
};
