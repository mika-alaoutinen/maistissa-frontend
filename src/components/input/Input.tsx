import React from 'react';
import styles from './Input.module.css';

type OnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;

interface Props {
  onChange: OnChangeHandler;
  placeholder: string;
  id?: string;
}

const Input: React.FC<Props> = ({ onChange, placeholder, id }) => (
  <input
    className={styles.input}
    id={id}
    onChange={onChange}
    placeholder={placeholder}
  />
);

export default Input;
