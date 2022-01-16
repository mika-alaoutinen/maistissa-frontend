import React, { useState } from 'react';
import ValidationError from '../validation/ValidationError';
import styles from './Combobox.module.css';
import Dropdown from './Dropdown';
import Selected from './Selected';

interface Props {
  id: string;
  label: string
  onChange: (value: React.ChangeEvent<HTMLSelectElement>) => void;
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

  const addSelected = (item: string): void => {
    setSelected(selected.concat(item));
  };

  const removeSelected = (item: string): void => {
    setSelected(selected.filter((s) => s !== item));
  };

  const filteredOptions = options.filter((opt) => opt.includes(input));

  return (
    <div className={styles.combobox}>
      <div>
        <ValidationError errors={validationErrors} />
      </div>

      <Selected remove={removeSelected} selected={selected} />

      <label htmlFor={id}>{label}</label>

      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />

      <Dropdown
        onClick={addSelected}
        options={filteredOptions}
      />
    </div>
  );
};
export default Combobox;
