import { useState } from 'react';
import validation, { ValidationError, ValidationRules } from './validation';

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
type SubmitEvent = React.MouseEvent<HTMLElement>;
// type SubmitHandler = <T, R>(data: T) => Promise<R>;

export interface Form<T> {
  data: T;
  errors: ValidationError<T>;
  onChange: (key: keyof T) => (e: ChangeEvent) => void;
  onSubmit: <R>(e: SubmitEvent, handler: (data: T) => Promise<R>) => Promise<R>;
  resetForm: () => void;
  validate: () => boolean;
}

export const useForm = <T>(initialState: T, rules?: ValidationRules<T>): Form<T> => {
  const emptyErrors = validation.initErrors(initialState);

  const [data, setData] = useState<T>(initialState);
  const [errors, setErrors] = useState<ValidationError<T>>(emptyErrors);

  const validate = (): boolean => {
    if (!rules) {
      return true;
    }

    const validationErrors = validation.validate(data, rules.validations);
    setErrors(validationErrors);
    return validation.isValid(validationErrors);
  };

  const onChange = (key: keyof T) => (e: ChangeEvent): void => {
    const edited: T = {
      ...data,
      [key]: e.target.value,
    };
    setData(edited);

    if (rules && rules.mode === 'ON_CHANGE') {
      setErrors(validation.validate(edited, rules.validations));
    }
  };

  const onSubmit = async <R>(
    e: SubmitEvent, submitHandler: (data: T) => Promise<R>,
  ): Promise<R> => {
    e.preventDefault();
    console.log('before submit', data);
    const response = await submitHandler(data);
    console.log('after submit', response);
    return response;
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
    validate,
  };
};
