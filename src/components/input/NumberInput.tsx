import React from 'react';
import styles from './NumberInput.module.css';

type OnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;

interface Props {
  id: string;
  label: string;
  onChange: OnChangeHandler;
  value: number;
}

const NumberInput: React.FC<Props> = ({
  id,
  label,
  onChange,
  value,
}) => (
  <div className={styles.number_input}>
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
