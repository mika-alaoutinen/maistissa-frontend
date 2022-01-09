import validation, { ValidationError, Validations } from '../validation';

const { initErrors, isValid, validate } = validation;

interface Data {
  value?: string;
}

const REQUIRED_ERROR_MESSAGE = 'value is required';
const CUSTOM_ERROR_MESSAGE = 'string should be > 3 characters';

describe('Validation should handle required field', () => {
  const requiredValidations: Validations<Data> = {
    value: {
      required: {
        value: true,
        message: REQUIRED_ERROR_MESSAGE,
      },
    },
  };

  const optionalValidations: Validations<Data> = {
    value: {
      required: {
        value: false,
        message: 'value is optional',
      },
    },
  };

  it('should be error when required field is undefined', () => {
    const errors = validate({ value: undefined }, requiredValidations);
    expect(errors?.value).toEqual([REQUIRED_ERROR_MESSAGE]);
  });

  it('should not be error when required field has value', () => {
    const errors = validate({ value: 'foo' }, requiredValidations);
    expect(errors?.value).toEqual([]);
  });

  it('should not be error when optional field is undefined', () => {
    const errors = validate({ value: undefined }, optionalValidations);
    expect(errors?.value).toEqual([]);
  });

  it('should not be error when optional field has value', () => {
    const errors = validate({ value: 'foo' }, optionalValidations);
    expect(errors?.value).toEqual([]);
  });
});

describe('Validation should handle custom validation rule', () => {
  const customValidations: Validations<Data> = {
    value: {
      valid: {
        func: (value) => (value ? value.length > 3 : false),
        message: CUSTOM_ERROR_MESSAGE,
      },
    },
  };

  it('should be error when invalid', () => {
    const errors = validate({ value: '123' }, customValidations);
    expect(errors?.value).toEqual([CUSTOM_ERROR_MESSAGE]);
  });

  it('should be error when undefined is passed to the validation function', () => {
    const errors = validate({ value: undefined }, customValidations);
    expect(errors?.value).toEqual([CUSTOM_ERROR_MESSAGE]);
  });

  it('should not be error when valid', () => {
    const errors = validate({ value: '1234' }, customValidations);
    expect(errors?.value).toEqual([]);
  });
});

describe('Should return both required and custom errors', () => {
  const validations: Validations<Data> = {
    value: {
      required: {
        value: true,
        message: REQUIRED_ERROR_MESSAGE,
      },
      valid: {
        func: (value) => (value ? value.length > 3 : false),
        message: CUSTOM_ERROR_MESSAGE,
      },
    },
  };

  it('should return both types of errors', () => {
    const errors = validate({ value: undefined }, validations);
    expect(errors?.value).toEqual([REQUIRED_ERROR_MESSAGE, CUSTOM_ERROR_MESSAGE]);
  });
});

describe('Should initialize an empty error object with correct keys and empty arrays as values', () => {
  const emptyErrors = initErrors({ value: 'foo' });

  it('should have all keys of target type', () => {
    expect(emptyErrors).toHaveProperty('value');
  });

  it('should have empty array as value', () => {
    expect(emptyErrors.value).toEqual([]);
  });
});

describe('Should parse ValidationError object for error messages', () => {
  it('should return true when there is at least one error message on any field', () => {
    const error: ValidationError<Data> = {
      value: ['error 1'],
    };
    expect(isValid(error)).toBe(false);
  });

  it('should return false when there are no error messages on any fields', () => {
    const error: ValidationError<Data> = {
      value: [],
    };
    expect(isValid(error)).toBe(true);
  });
});
