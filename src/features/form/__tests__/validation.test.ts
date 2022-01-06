import { ValidationRules, validate } from '../validation';

interface Data {
  value?: string;
}

describe('Validation should handle required field', () => {
  const rulesRequired: ValidationRules<Data> = {
    value: {
      required: {
        value: true,
        message: 'value is required',
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
    expect(errors?.value).toBe('value is required');
  });

  it('should not be error when required field has value', () => {
    const errors = validate({ value: 'foo' }, rulesRequired);
    expect(errors?.value).toBeUndefined();
  });

  it('should not be error when optional field is undefined', () => {
    const errors = validate({ value: undefined }, rulesOptional);
    expect(errors?.value).toBeUndefined();
  });

  it('should not be error when optional field has value', () => {
    const errors = validate({ value: 'foo' }, rulesOptional);
    expect(errors?.value).toBeUndefined();
  });
});

describe('Validation should handle custom validation rule', () => {
  const customRules: ValidationRules<Data> = {
    value: {
      valid: {
        isValid: (s: string | undefined) => (s ? s.length > 3 : false),
        message: 'string should be > 3 characters',
      },
    },
  };

  it('should be error when invalid', () => {
    const errors = validate({ value: '123' }, customRules);
    expect(errors?.value).toBe('string should be > 3 characters');
  });

  it('should be error when undefined is passed to the validation function', () => {
    const errors = validate({ value: undefined }, customRules);
    expect(errors?.value).toBe('string should be > 3 characters');
  });

  it('should not be error when valid', () => {
    const errors = validate({ value: '1234' }, customRules);
    expect(errors?.value).toBeUndefined();
  });
});

describe('Should return both required and custom errors', () => {
  const rules: ValidationRules<Data> = {
    value: {
      required: {
        value: true,
        message: 'value is required',
      },
      valid: {
        isValid: (s: string | undefined) => (s ? s.length > 3 : false),
        message: 'string should be > 3 characters',
      },
    },
  };

  it('should return required error when both types of errors are found', () => {
    const errors = validate({ value: undefined }, rules);
    expect(errors?.value).toBe('value is required');
  });
});
