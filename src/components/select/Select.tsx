import React from 'react';
import ValidationError from '../validation/ValidationError';
import styles from './Select.module.css';

interface Props {
  id: string;
  label: string
  onChange: (value: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  validationErrors?: string[];
  value?: string;
}

const Select: React.FC<Props> = ({
  id,
  label,
  onChange,
  options,
  validationErrors = [],
  value,
}) => (
  <div className={styles.select}>
    <div>
      <ValidationError errors={validationErrors} />
    </div>

    <label htmlFor={id}>{label}</label>

    <select
      id={id}
      onChange={onChange}
      value={value}
    >
      <option value="default" hidden>
        select
      </option>

      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
