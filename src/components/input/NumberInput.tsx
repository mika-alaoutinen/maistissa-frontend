import React from 'react';
import ValidationError from '../validation/ValidationError';
import styles from './NumberInput.module.css';

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

interface Props {
  id: string;
  label: string;
  onChange: (value: number) => void;
  validationErrors?: string[];
  value?: number;
}

const DEFAULT_VALUE = 0;

const NumberInput: React.FC<Props> = ({
  id,
  label,
  onChange,
  validationErrors = [],
  value = DEFAULT_VALUE,
}) => {
  const parseNumber = (e: ChangeEvent): number => {
    const input = e.target.value;
    return input ? parseFloat(input) : DEFAULT_VALUE;
  };

  return (
    <div className={styles.number_input}>
      <ValidationError errors={validationErrors} />

      <label htmlFor={id}>
        {label}
      </label>

      <input
        id={id}
        onChange={(e) => onChange(parseNumber(e))}
        type="number"
        value={value}
      />
    </div>
  );
};

export default NumberInput;
