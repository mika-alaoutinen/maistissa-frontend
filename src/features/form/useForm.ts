import { useState } from 'react';
import validation, { ValidationError, ValidationRules } from './validation';

export type SubmitHandler<T, R> = (data: T) => Promise<R>;
export type SubmitResponse<T, R> = Promise<R | ValidationError<T>>;

export interface Form<T> {
  data: T;
  errors: ValidationError<T>;
  isValid: () => boolean;
  onChange: <K extends keyof T>(key: K) => (value: T[K]) => void;
  onSubmit: <R>(handler: SubmitHandler<T, R>) => SubmitResponse<T, R>;
  resetForm: () => void;
}

export const useForm = <T>(initialState: T, rules?: ValidationRules<T>): Form<T> => {
  const emptyErrors = validation.initErrors(initialState);

  const [data, setData] = useState<T>(initialState);
  const [errors, setErrors] = useState<ValidationError<T>>(emptyErrors);

  const validate = (formData: T): boolean => {
    if (!rules) {
      return true;
    }

    const validationErrors = validation.validate(formData, rules.validations);
    setErrors(validationErrors);
    return validation.isValid(validationErrors);
  };

  const onChange = <K extends keyof T>(key: K) => (value: T[K]): void => {
    const edited: T = {
      ...data,
      [key]: value,
    };
    setData(edited);

    if (rules && rules.mode === 'ON_CHANGE') {
      validate(edited);
    }
  };

  const onSubmit = async <R>(
    submitHandler: SubmitHandler<T, R>,
  ): SubmitResponse<T, R> => (validate(data) ? submitHandler(data) : Promise.resolve(errors));

  const resetForm = (): void => {
    setErrors(emptyErrors);
    setData(initialState);
  };

  return {
    data,
    errors,
    isValid: () => validate(data),
    onChange,
    onSubmit,
    resetForm,
  };
};
