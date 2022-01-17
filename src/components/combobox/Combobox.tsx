import React, { useState } from 'react';
import ValidationError from '../validation/ValidationError';
import styles from './Combobox.module.css';
import Dropdown from './Dropdown';
import Selected from './Selected';

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

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
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');

  const onFilterChange = (e: ChangeEvent): void => {
    const { value } = e.target;
    setInput(value);
    if (value.length > 0) {
      setDropdownOpen(true);
    }
  };

  const addSelected = (item: string): void => {
    onChange(values.concat(item));
  };

  const removeSelected = (item: string): void => {
    onChange(values.filter((s) => s !== item));
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
          onChange={onFilterChange}
          value={input}
        />
      </span>

      <Dropdown
        isOpen={dropdownOpen}
        onClick={addSelected}
        options={filteredOptions}
        toggleOpen={() => setDropdownOpen(!dropdownOpen)}
      />
    </div>
  );
};
export default Combobox;
