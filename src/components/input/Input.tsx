import React from 'react';
import ValidationError from '../validation/ValidationError';
import styles from './Input.module.css';

interface Props {
  id: string;
  label: string;
  onChange: (value: string) => void;
  validationErrors?: string[];
  value?: string;
}

const Input: React.FC<Props> = ({
  id,
  label,
  onChange,
  validationErrors = [],
  value,
}) => (
  <div className={styles.input}>
    <div>
      <ValidationError errors={validationErrors} />
    </div>

    <label htmlFor={id}>
      {label}
    </label>

    <input
      id={id}
      className={styles.input}
      onChange={(e) => onChange(e.target.value)}
      placeholder={label}
      value={value}
    />
  </div>
);

export default Input;
