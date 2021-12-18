import React from 'react';
import styles from './NumberInput.module.css';

type OnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;

interface Props {
  id: string;
  label: string;
  onChange: OnChangeHandler;
  defaultValue?: number;
}

const NumberInput: React.FC<Props> = ({
  onChange, defaultValue = 0, id, label,
}) => (
  <div className={styles.number_input}>
    <label htmlFor={id}>
      {label}
    </label>

    <input
      defaultValue={defaultValue}
      id={id}
      onChange={onChange}
      type="number"
    />
  </div>
);

export default NumberInput;
