import utils from '../../utils/generics';

interface Validation<T> {
  required?: {
    value: boolean;
    message: string;
  };
  valid?: {
    func: (value: T[keyof T]) => boolean;
    message: string;
  };
}

export type ValidationError<T> = Record<keyof T, string[]>;
export type Validations<T> = Record<keyof T, Validation<T>>;
export interface ValidationRules<T> {
  mode: 'ON_CHANGE' | 'ON_SUBMIT';
  validations: Validations<T>;
}

const validateRule = <T>(validation: Validation<T>, value: T[keyof T]): string[] => {
  const errors = [];

  // is field required?
  if (validation?.required?.value && !value) {
    errors.push(validation.required.message);
  }

  // run custom validation function
  const custom = validation?.valid;
  if (custom?.func && !custom.func(value)) {
    errors.push(custom.message);
  }

  return errors;
};

const initErrors = <T>(data: T): ValidationError<T> => Object
  .keys(data)
  .reduce((obj, key) => ({
    ...obj,
    [key]: [],
  }), {} as ValidationError<T>);

const isValid = <T>(validationError: ValidationError<T>): boolean => utils
  .keysOf(validationError)
  .map((key) => validationError[key])
  .every((errors) => errors.length === 0);

const validate = <T>(data: T, validations: Validations<T>): ValidationError<T> => utils
  .keysOf(validations)
  .reduce((errors, key) => {
    const errorMessages = validateRule(validations[key], data[key]);
    return {
      ...errors,
      [key]: errorMessages,
    };
  }, initErrors(data));

export default { initErrors, isValid, validate };
