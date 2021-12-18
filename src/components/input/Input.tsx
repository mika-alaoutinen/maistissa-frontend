import React from 'react';
import styles from './Input.module.css';

type OnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;

interface Props {
  id: string;
  label: string;
  onChange: OnChangeHandler;
}

const Input: React.FC<Props> = ({ id, label, onChange }) => (
  <div className={styles.input}>
    <label htmlFor={id}>
      {label}
    </label>

    <input
      id={id}
      className={styles.input}
      onChange={onChange}
      placeholder={label}
    />
  </div>
);

export default Input;
