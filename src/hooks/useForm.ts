/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { useState } from 'react';

// Form validations
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

// Form
export interface Form<T> {
  data: T;
  setData: (key: keyof T) => (e: ChangeEvent) => void;
  resetForm: () => void;
  validate: () => ValidationError<T>[];
}

export const useForm = <T>(initialState: T, validations?: Validations<T>): Form<T> => {
  const [state, setState] = useState<T>(initialState);

  const setData = (key: keyof T) => (e: ChangeEvent): void => {
    const edited: T = {
      ...state,
      [key]: e.target.value,
    };
    setState(edited);
  };

  const resetForm = (): void => {
    setState(initialState);
  };

  const validate = (): ValidationError<T>[] => {
    console.log('validations', validations);
    if (!validations) {
      return [];
    }

    let valid = true;
    const newErrors: ValidationError<T> = {};

    for (const key in validations) {
      const value = state[key];
      const validation = validations[key];

      // required
      if (validation?.required?.value && !value) {
        valid = false;
        newErrors[key] = validation?.required?.message;
      }

      // valid
      const custom = validation?.valid;
      if (custom?.isValid && !custom.isValid(value)) {
        valid = false;
        newErrors[key] = custom.message;
      }
    }

    if (!valid) {
      console.log('not valid', newErrors);
    }

    return [];
  };

  return {
    data: state,
    setData,
    resetForm,
    validate,
  };
};

export default { useForm };
