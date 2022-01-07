import { useState } from 'react';
import {
  ValidationError, ValidationRules, initErrors, validate as validateFn,
} from './validation';

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export interface Form<T> {
  data: T;
  errors: ValidationError<T>;
  onChange: (key: keyof T) => (e: ChangeEvent) => void;
  resetForm: () => void;
  validate: () => ValidationError<T>;
}

export const useForm = <T>(initialState: T, rules?: ValidationRules<T>): Form<T> => {
  const emptyErrors = initErrors(initialState);

  const [data, setData] = useState<T>(initialState);
  const [errors, setErrors] = useState<ValidationError<T>>(emptyErrors);

  const updateField = (key: keyof T, e: ChangeEvent): void => {
    const edited: T = {
      ...data,
      [key]: e.target.value,
    };
    setData(edited);
  };

  const validate = (): ValidationError<T> => {
    if (!rules) {
      return emptyErrors;
    }

    const validationErrors = validateFn(data, rules);
    setErrors(validationErrors || emptyErrors);
    return validationErrors;
  };

  const onChange = (key: keyof T) => (e: ChangeEvent): void => {
    updateField(key, e);
    validate(); // Do validations on field somehow
  };

  const resetForm = (): void => {
    setErrors(emptyErrors);
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
