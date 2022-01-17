import React from 'react';
import styles from './Dropdown.module.css';

interface Props {
  isOpen: boolean;
  onClick: (selected: string) => void;
  options: string[]
  toggleOpen: () => void;
}

const Dropdown: React.FC<Props> = ({
  isOpen,
  onClick,
  options,
  toggleOpen,
}) => {
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
        data-testid="dropdown-button"
        onClick={toggleOpen}
        type="button"
      >
        V
      </button>

      {isOpen && dropdown}
    </>
  );
};

export default Dropdown;
