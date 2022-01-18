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
  const [filter, setFilter] = useState<string>('');

  const onFilterChange = (e: ChangeEvent): void => {
    const { value } = e.target;
    setFilter(value);
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

  const filteredOptions = options.filter((opt) => opt.includes(filter));

  return (
    <div className={styles.combobox}>
      <ValidationError errors={validationErrors} />

      <Selected remove={removeSelected} selected={values} />

      <label htmlFor={id}>{label}</label>

      <input
        id={id}
        onChange={onFilterChange}
        value={filter}
      />

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
