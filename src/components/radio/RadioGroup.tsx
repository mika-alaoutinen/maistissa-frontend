import React from 'react';
import RadioButton from './RadioButton';
import styles from './RadioGroup.module.css';

type OnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;

interface Props {
  keys: string[];
  onChange: OnChangeHandler;
}

const RadioGroup: React.FC<Props> = ({ keys, onChange }) => (
  <div className={styles.radio_group} onChange={onChange}>
    {keys.map((key) => (
      <RadioButton
        key={key}
        name="wine-type"
        value={key}
      />
    ))}
  </div>
);

export default RadioGroup;
