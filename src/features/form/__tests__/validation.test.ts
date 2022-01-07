import validation, { ValidationRules } from '../validation';

const { initErrors, validate } = validation;

interface Data {
  value?: string;
}

const REQUIRED_ERROR_MESSAGE = 'value is required';
const CUSTOM_ERROR_MESSAGE = 'string should be > 3 characters';

describe('Validation should handle required field', () => {
  const rulesRequired: ValidationRules<Data> = {
    value: {
      required: {
        value: true,
        message: REQUIRED_ERROR_MESSAGE,
      },
    },
  };

  const rulesOptional: ValidationRules<Data> = {
    value: {
      required: {
        value: false,
        message: 'value is optional',
      },
    },
  };

  it('should be error when required field is undefined', () => {
    const errors = validate({ value: undefined }, rulesRequired);
    expect(errors?.value).toEqual([REQUIRED_ERROR_MESSAGE]);
  });

  it('should not be error when required field has value', () => {
    const errors = validate({ value: 'foo' }, rulesRequired);
    expect(errors?.value).toEqual([]);
  });

  it('should not be error when optional field is undefined', () => {
    const errors = validate({ value: undefined }, rulesOptional);
    expect(errors?.value).toEqual([]);
  });

  it('should not be error when optional field has value', () => {
    const errors = validate({ value: 'foo' }, rulesOptional);
    expect(errors?.value).toEqual([]);
  });
});

describe('Validation should handle custom validation rule', () => {
  const customRules: ValidationRules<Data> = {
    value: {
      valid: {
        func: (value) => (value ? value.length > 3 : false),
        message: CUSTOM_ERROR_MESSAGE,
      },
    },
  };

  it('should be error when invalid', () => {
    const errors = validate({ value: '123' }, customRules);
    expect(errors?.value).toEqual([CUSTOM_ERROR_MESSAGE]);
  });

  it('should be error when undefined is passed to the validation function', () => {
    const errors = validate({ value: undefined }, customRules);
    expect(errors?.value).toEqual([CUSTOM_ERROR_MESSAGE]);
  });

  it('should not be error when valid', () => {
    const errors = validate({ value: '1234' }, customRules);
    expect(errors?.value).toEqual([]);
  });
});

describe('Should return both required and custom errors', () => {
  const rules: ValidationRules<Data> = {
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
    const errors = validate({ value: undefined }, rules);
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
