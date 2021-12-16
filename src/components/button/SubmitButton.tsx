import React from 'react';
import styles from './SubmitButton.module.css';

interface Props {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  text: string;
}

const SubmitButton: React.FC<Props> = ({ onClick, text }) => (
  <button
    className={styles.submit_button}
    onClick={onClick}
    type="submit"
  >
    {text}
  </button>
);

export default SubmitButton;
