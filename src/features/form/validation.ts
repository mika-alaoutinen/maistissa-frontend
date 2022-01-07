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
export type ValidationRules<T> = Record<keyof T, Validation<T>>;

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

export const initErrors = <T>(data: T): ValidationError<T> => Object
  .keys(data)
  .reduce((obj, key) => ({
    ...obj,
    [key]: [],
  }), {} as ValidationError<T>);

export const validate = <T>(data: T, rules: ValidationRules<T>): ValidationError<T> => utils
  .keysOf(rules)
  .reduce((errors, rule) => {
    const errorMessages = validateRule(rules[rule], data[rule]);
    return {
      ...errors,
      [rule]: errorMessages,
    };
  }, initErrors(data));
