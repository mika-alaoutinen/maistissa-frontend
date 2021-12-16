import React from 'react';
import styles from './NumberInput.module.css';

type OnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;

interface Props {
  onChange: OnChangeHandler;
  defaultValue?: number;
  label?: string;
}

const NumberInput: React.FC<Props> = ({ onChange, defaultValue = 0, label }) => {
  const numberInput = (
    <input
      defaultValue={defaultValue}
      onChange={onChange}
      type="number"
    />
  );

  const numberInputWithLabel = (
    <div>
      <span className={styles.number_input_label}>{label}</span>
      {numberInput}
    </div>
  );

  return label ? numberInputWithLabel : numberInput;
};

export default NumberInput;
