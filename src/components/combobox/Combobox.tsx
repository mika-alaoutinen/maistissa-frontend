import React from 'react';
import styles from './Combobox.module.css';

interface Props {
  label: string
  onChange: (value: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

// This component should be replaced with a combobox that allows multiple inputs.
const Combobox: React.FC<Props> = ({
  label,
  onChange,
  options,
}) => (
  <div className={styles.combobox}>
    <label htmlFor={label}>{label}</label>

    <select onChange={onChange}>
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
