import React from 'react';
import styles from './ValidationError.module.css';

interface Props {
  errors: string[]
}

const ValidationError: React.FC<Props> = ({ errors }) => (
  <>
    {errors.map((e) => (
      <div key={e} className={styles.error_msg}>
        {e}
      </div>
    ))}
  </>
);

export default ValidationError;
