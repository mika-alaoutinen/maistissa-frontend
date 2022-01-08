import { useState } from 'react';
import validation, { ValidationError, ValidationRules } from './validation';

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
type SubmitEvent = React.MouseEvent<HTMLElement>;
type SubmitHandler<T, R> = (data: T) => Promise<R>;
type FormSubmitResponse<T, R> = Promise<R | ValidationError<T>>;

export interface Form<T> {
  data: T;
  errors: ValidationError<T>;
  onChange: (key: keyof T) => (e: ChangeEvent) => void;
  onSubmit: <R>(e: SubmitEvent, handler: SubmitHandler<T, R>) => FormSubmitResponse<T, R>;
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

  const onChange = (key: keyof T) => (e: ChangeEvent): void => {
    const edited: T = {
      ...data,
      [key]: e.target.value,
    };
    setData(edited);

    if (rules && rules.mode === 'ON_CHANGE') {
      validate(edited);
    }
  };

  const onSubmit = async <R>(
    e: SubmitEvent, submitHandler: (data: T) => Promise<R>,
  ): Promise<R | ValidationError<T>> => {
    e.preventDefault();
    if (validate(data)) {
      console.log('form is valid');
      const response = await submitHandler(data);
      console.log('response', response);
      return response;
    }
    console.log('returning validation errors');
    return Promise.resolve(errors);
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
