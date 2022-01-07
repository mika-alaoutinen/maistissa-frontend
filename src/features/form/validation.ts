interface Validation {
  required?: {
    value: boolean;
    message: string;
  };
  valid?: {
    func: <T>(s: T[keyof T]) => boolean;
    message: string;
  };
}

export type ValidationError<T> = Required<Record<keyof T, string[]>>;
export type ValidationRules<T> = Partial<Record<keyof T, Validation>>;

export const initErrors = <T>(data: T): ValidationError<T> => Object
  .keys(data)
  .reduce((obj, key) => ({
    ...obj,
    [key]: [],
  }), {} as ValidationError<T>);

export const validate = <T>(data: T, rules: ValidationRules<T>): ValidationError<T> => {
  const newErrors = initErrors(data);

  Object
    .keys(rules)
    .forEach((key) => {
      // Don't know how to get the types working correctly
      const rule = key as keyof T;
      const value = data[rule];
      const validation = rules[rule];

      // is field required?
      if (validation?.required?.value && !value) {
        newErrors[rule].push(validation.required.message);
      }

      // run custom validation function
      const custom = validation?.valid;
      if (custom?.func && !custom.func(value)) {
        newErrors[rule].push(custom.message);
      }
    });

  return newErrors;
};
