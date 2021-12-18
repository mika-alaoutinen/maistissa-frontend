import React from 'react';
import styles from './Input.module.css';

type OnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;

interface Props {
  onChange: OnChangeHandler;
  label: string;
  id?: string;
}

const Input: React.FC<Props> = ({ onChange, label, id }) => (
  <div className={styles.input}>
    <label htmlFor={id}>
      {label}
    </label>

    <input
      className={styles.input}
      id={id}
      onChange={onChange}
      placeholder={label}
    />
  </div>
);

export default Input;
