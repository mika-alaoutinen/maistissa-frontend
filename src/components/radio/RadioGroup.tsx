import React from 'react';
import RadioButton from './RadioButton';
import styles from './RadioGroup.module.css';

type OnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;

interface Props {
  id: string;
  label: string;
  values: string[];
  onChange: OnChangeHandler;
}

const RadioGroup: React.FC<Props> = ({
  id,
  label,
  values,
  onChange,
}) => (
  <div
    className={styles.radio_group}
    id={id}
    onChange={onChange}
    role="radiogroup"
  >
    <span className={styles.radio_group_label}>
      {label}
    </span>

    {values.map((value) => (
      <RadioButton
        key={value}
        name="wine-type"
        value={value}
      />
    ))}
  </div>
);

export default RadioGroup;
