import React from 'react';
import styles from './Combobox.module.css';

interface Props {
  id: string;
  label: string
  onChange: (value: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  values: string[];
}

// This component should be replaced with a combobox that allows multiple inputs.
const Combobox: React.FC<Props> = ({
  id,
  label,
  onChange,
  options,
  values,
}) => (
  <div className={styles.combobox}>
    <label htmlFor={id}>{label}</label>

    <select
      id={id}
      onChange={onChange}
      value={values[0]}
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

export default Combobox;
