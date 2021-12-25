import React from 'react';
import styles from './Combobox.module.css';

interface Props {
  id: string;
  label: string
  onChange: (value: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  values: string[];
}

// Implement Combobox as two sub-components: FilterInput and Dropdown?

/**
 * Combobox is like a Select with added text search functionality. The user can
 * filter available options by typing a search string into an input field.
 */
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
      value={values.length > 0 ? values[0] : ''}
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
