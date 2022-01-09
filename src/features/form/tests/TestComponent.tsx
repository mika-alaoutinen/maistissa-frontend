import React from 'react';
import { useForm } from '../useForm';
import { ValidationRules } from '../validation';

interface Props {
  initialData: Data;
  rules?: ValidationRules<Data>;
}

export interface Data {
  value: string;
}

/**
 * A component for testing the useForm hook.
 * @returns component that uses the useForm hook.
 */
const TestComponent: React.FC<Props> = ({ initialData, rules }) => {
  const { data, errors, onChange } = useForm<Data>(initialData, rules);

  const errorMessages: JSX.Element = (
    <div>
      {errors.value.map((e) => <div>{e}</div>)}
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
    </div>
  );
};

export default TestComponent;
