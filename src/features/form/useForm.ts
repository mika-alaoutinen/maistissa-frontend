import { useState } from 'react';
import validation, { ValidationError, ValidationRules } from './validation';

type SanitizeFn<R> = (value: string) => R;
export type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
export type SubmitEvent = React.MouseEvent<HTMLElement>;
export type SubmitHandler<T, R> = (data: T) => Promise<R>;
export type SubmitResponse<T, R> = Promise<R | ValidationError<T>>;

export interface Form<T> {
  data: T;
  errors: ValidationError<T>;
  onChange: <R>(key: keyof T, sanitizeFn?: SanitizeFn<R>) => (e: ChangeEvent) => void;
  onSubmit: <R>(e: SubmitEvent, handler: SubmitHandler<T, R>) => SubmitResponse<T, R>;
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

  const onChange = <R>(key: keyof T, sanitizeFn?: SanitizeFn<R>) => (e: ChangeEvent): void => {
    const { value } = e.target;
    const edited: T = {
      ...data,
      [key]: sanitizeFn ? sanitizeFn(value) : value,
    };
    setData(edited);

    if (rules && rules.mode === 'ON_CHANGE') {
      validate(edited);
    }
  };

  const onSubmit = async <R>(
    e: SubmitEvent,
    submitHandler: SubmitHandler<T, R>,
  ): SubmitResponse<T, R> => {
    e.preventDefault();
    return validate(data) ? submitHandler(data) : Promise.resolve(errors);
  };

  const resetForm = (): void => {
    setErrors(emptyErrors);
    setData(initialState);
  };

  return {
    data,
    errors,
    onChange,
    onSubmit,
    resetForm,
  };
};
