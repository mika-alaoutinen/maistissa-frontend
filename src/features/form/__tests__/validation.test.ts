import { ValidationRules, validate } from '../validation';

interface Person {
  id?: number;
  name?: string;
  age?: number;
}

describe('Validation should handle a required field', () => {
  const rules: ValidationRules<Person> = {
    id: {
      required: {
        value: true,
        message: 'id is required',
      },
    },
    name: {
      required: {
        value: true,
        message: 'name is required',
      },
    },
    age: {
      required: {
        value: false,
        message: '',
      },
    },
  };

  it('should be error when required field is undefined', () => {
    const data = {
      id: undefined,
      name: 'Alice',
      age: undefined,
    };

    const errors = validate(data, rules);
    expect(errors?.id).toEqual('id is required');
    expect(errors?.name).toBeUndefined();
    expect(errors?.age).toBeUndefined();
  });
});
