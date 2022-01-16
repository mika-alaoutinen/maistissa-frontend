import React, { useState } from 'react';
import ValidationError from '../validation/ValidationError';
import styles from './Combobox.module.css';
import Dropdown from './Dropdown';
import Selected from './Selected';

interface Props {
  id: string;
  label: string
  onChange: (value: string[]) => void;
  options: string[];
  values: string[];
  validationErrors?: string[];
}

const Combobox: React.FC<Props> = ({
  id,
  label,
  onChange,
  options,
  values,
  validationErrors = [],
}) => {
  const [input, setInput] = useState<string>('');
  const [selected, setSelected] = useState<string[]>([]);

  const updateSelected = (newSelected: string[]): void => {
    setSelected(newSelected);
    onChange(newSelected);
  };

  const addSelected = (item: string): void => {
    updateSelected(selected.concat(item));
  };

  const removeSelected = (item: string): void => {
    updateSelected(selected.filter((s) => s !== item));
  };

  const filteredOptions = options.filter((opt) => opt.includes(input));

  return (
    <div className={styles.combobox}>
      <div>
        <ValidationError errors={validationErrors} />
      </div>

      <label htmlFor={id}>{label}</label>

      <span className={styles.filter_input}>
        <Selected remove={removeSelected} selected={values} />

        <input
          id={id}
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
      </span>

      <Dropdown
        onClick={addSelected}
        options={filteredOptions}
      />
    </div>
  );
};
export default Combobox;
