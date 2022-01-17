import React from 'react';
import styles from './SelectedItem.module.css';

interface Props {
  item: string;
  removeSelected: (item: string) => void;
}

const SelectedItem: React.FC<Props> = ({ item, removeSelected }) => (
  <span
    key={item}
    className={styles.selected_pill}
  >
    {item}

    <button
      onClick={() => removeSelected(item)}
      type="button"
    >
      X
    </button>
  </span>
);

export default SelectedItem;
