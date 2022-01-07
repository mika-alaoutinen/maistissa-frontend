import React from 'react';
import RadioButton from './RadioButton';
import ValidationError from '../validation/ValidationError';
import styles from './RadioGroup.module.css';

type OnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;

interface Props {
  id: string;
  label: string;
  values: string[];
  onChange: OnChangeHandler;
  validationErrors?: string[];
}

const RadioGroup: React.FC<Props> = ({
  id,
  label,
  values,
  onChange,
  validationErrors = [],
}) => (
  <div
    className={styles.radio_group}
    id={id}
    onChange={onChange}
    role="radiogroup"
  >
    <div>
      <ValidationError errors={validationErrors} />
    </div>

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
