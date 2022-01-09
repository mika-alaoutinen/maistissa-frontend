import React from 'react';
import { useForm } from '../useForm';
import { ValidationRules } from '../validation';

interface Props {
  initialData: Data;
  rules?: ValidationRules<Data>;
  submitHandler?: (data: Data) => Promise<Data>;
}

export interface Data {
  value: string;
}

/**
 * A component for testing the useForm hook.
 * @returns component that uses the useForm hook.
 */
const TestComponent: React.FC<Props> = ({
  initialData,
  rules,
  submitHandler = () => Promise.resolve(initialData),
}) => {
  const {
    data, errors, onChange, onSubmit,
  } = useForm<Data>(initialData, rules);

  const errorMessages: JSX.Element = (
    <div>
      {errors.value.map((e) => <div key={e}>{e}</div>)}
    </div>
  );

  return (
    <div>
      {errors.value && errorMessages}

      <input
        data-testid="test-input"
        onChange={(e) => onChange('value')(e)}
        value={data.value}
      />

      <label
        data-testid="test-label"
        htmlFor="test-input"
      >
        {`value: ${data.value}`}
      </label>

      <button
        onClick={(e) => onSubmit(e, submitHandler)}
        type="submit"
      >
        Submit
      </button>
    </div>
  );
};

export default TestComponent;
