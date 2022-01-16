import React, { useState } from 'react';
import ValidationError from '../validation/ValidationError';
import styles from './Combobox.module.css';
import Dropdown from './Dropdown';

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
  console.log('selected', selected);

  return (
    <div className={styles.combobox}>
      <div>
        <ValidationError errors={validationErrors} />
      </div>

      <label htmlFor={id}>{label}</label>

      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />

      <Dropdown
        onClick={(value: string) => setSelected(selected.concat(value))}
        options={options.filter((opt) => opt.includes(input))}
      />
    </div>
  );
};
export default Combobox;
