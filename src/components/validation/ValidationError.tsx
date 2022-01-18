import React from 'react';
import styles from './ValidationError.module.css';

interface Props {
  errors: string[]
}

const ValidationError: React.FC<Props> = ({ errors }) => {
  if (errors.length === 0) {
    return null;
  }

  return (
    <div>
      {errors.map((e) => (
        <div key={e} className={styles.error_msg}>
          {e}
        </div>
      ))}
    </div>
  );
};
export default ValidationError;
