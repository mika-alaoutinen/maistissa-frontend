import React, { useState } from 'react';
import styles from './Dropdown.module.css';

interface Props {
  onClick: (selected: string) => void;
  options: string[]
}

const Dropdown: React.FC<Props> = ({ onClick, options }) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const renderOption = (option: string): JSX.Element => (
    <li key={option} className={styles.dropdown_option}>
      <button
        onClick={() => onClick(option)}
        type="button"
      >
        {option}
      </button>
    </li>
  );

  const dropdown = (
    <ul className={styles.dropdown_options}>
      {options.map(renderOption)}
    </ul>
  );

  return (
    <>
      <button
        onClick={() => setOpen(!isOpen)}
        type="button"
      >
        V
      </button>

      {isOpen && dropdown}
    </>
  );
};

export default Dropdown;
