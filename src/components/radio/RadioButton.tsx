import React from 'react';
import styles from './RadioButton.module.css';

interface Props {
  value: string;
  name?: string;
}

const RadioButton: React.FC<Props> = ({ value, name }) => (
  <label
    key={value}
    className={styles.radio_label}
    htmlFor={value}
  >
    <input
      key={value}
      id={value}
      className={styles.radio_input}
      name={name}
      type="radio"
      value={value}
    />
    {value.toLowerCase()}
  </label>
);

export default RadioButton;
