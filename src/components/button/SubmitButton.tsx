import React from 'react';
import styles from './SubmitButton.module.css';

interface Props {
  id: string;
  text: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

const SubmitButton: React.FC<Props> = ({ id, text, onClick }) => (
  <button
    id={id}
    className={styles.submit_button}
    onClick={onClick}
    type="submit"
  >
    {text}
  </button>
);

export default SubmitButton;
