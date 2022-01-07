/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
interface Validation<T> {
  required?: {
    value: boolean;
    message: string;
  };
  valid?: {
    func: (value: T[Extract<keyof T, string>]) => boolean;
    message: string;
  };
}

export type ValidationError<T> = Required<Record<keyof T, string[]>>;
export type ValidationRules<T> = Partial<Record<keyof T, Validation<T>>>;

export const initErrors = <T>(data: T): ValidationError<T> => Object
  .keys(data)
  .reduce((obj, key) => ({
    ...obj,
    [key]: [],
  }), {} as ValidationError<T>);

export const validate = <T>(data: T, rules: ValidationRules<T>): ValidationError<T> => {
  const newErrors = initErrors(data);

  for (const key in rules) {
    const value = data[key];
    const validation = rules[key];

    if (validation?.required?.value && !value) {
      newErrors[key].push(validation.required.message);
    }

    const custom = validation?.valid;
    if (custom?.func && !custom.func(value)) {
      newErrors[key].push(custom.message);
    }
  }

  return newErrors;
};
