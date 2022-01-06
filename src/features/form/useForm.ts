import { useState } from 'react';
import { ValidationError, ValidationRules, validate as validateFn } from './validation';

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export interface Form<T> {
  data: T;
  errors: ValidationError<T>;
  onChange: (key: keyof T) => (e: ChangeEvent) => void;
  resetForm: () => void;
  validate: () => ValidationError<T> | undefined;
}

export const useForm = <T>(initialState: T, rules?: ValidationRules<T>): Form<T> => {
  const [data, setData] = useState<T>(initialState);
  const [errors, setErrors] = useState<ValidationError<T>>({});

  const updateField = (key: keyof T, e: ChangeEvent): void => {
    const edited: T = {
      ...data,
      [key]: e.target.value,
    };
    setData(edited);
  };

  const validate = (): ValidationError<T> | undefined => {
    if (!rules) {
      return undefined;
    }

    const validationErrors = validateFn(data, rules);
    setErrors(validationErrors || {});
    return validationErrors;
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
