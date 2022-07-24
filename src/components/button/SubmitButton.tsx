import React from 'react';
import styles from './SubmitButton.module.css';

interface Props {
  id: string;
  text: string;
  onClick: () => void;
}

const SubmitButton: React.FC<Props> = ({ id, text, onClick }) => {
  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    onClick();
  };

  return (
    <div>
      <button
        id={id}
        className={styles.submit_button}
        onClick={handleSubmit}
        type="submit"
      >
        {text}
      </button>
    </div>
  );
};

export default SubmitButton;
