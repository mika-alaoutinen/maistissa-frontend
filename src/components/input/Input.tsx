import React from 'react';
import ValidationError from '../validation/ValidationError';
import styles from './Input.module.css';

type OnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;

interface Props {
  id: string;
  label: string;
  onChange: OnChangeHandler;
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
      onChange={onChange}
      placeholder={label}
      value={value}
    />
  </div>
);

export default Input;
