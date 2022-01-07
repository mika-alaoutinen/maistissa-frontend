import React from 'react';
import ValidationError from '../validation/ValidationError';
import styles from './NumberInput.module.css';

type OnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;

interface Props {
  id: string;
  label: string;
  onChange: OnChangeHandler;
  validationErrors?: string[];
  value?: number;
}

const NumberInput: React.FC<Props> = ({
  id,
  label,
  onChange,
  validationErrors = [],
  value = 0,
}) => (
  <div className={styles.number_input}>
    <div>
      <ValidationError errors={validationErrors} />
    </div>

    <label htmlFor={id}>
      {label}
    </label>

    <input
      id={id}
      onChange={onChange}
      type="number"
      value={value}
    />
  </div>
);

export default NumberInput;
