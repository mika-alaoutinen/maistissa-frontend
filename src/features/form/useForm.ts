import { useState } from 'react';
import validation, { ValidationError, ValidationRules } from './validation';

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export interface Form<T> {
  data: T;
  errors: ValidationError<T>;
  onChange: (key: keyof T) => (e: ChangeEvent) => void;
  resetForm: () => void;
  validate: () => boolean;
}

export const useForm = <T>(initialState: T, rules?: ValidationRules<T>): Form<T> => {
  const emptyErrors = validation.initErrors(initialState);

  const [data, setData] = useState<T>(initialState);
  const [errors, setErrors] = useState<ValidationError<T>>(emptyErrors);

  const validate = (): boolean => {
    const validationErrors = rules ? validation.validate(data, rules) : emptyErrors;
    setErrors(validationErrors);
    return validation.isValid(validationErrors);
  };

  const onChange = (key: keyof T) => (e: ChangeEvent): void => {
    const edited: T = {
      ...data,
      [key]: e.target.value,
    };
    setData(edited);
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
