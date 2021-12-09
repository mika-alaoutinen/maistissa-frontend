import React from 'react';
import styles from './Header.module.css';

const LoginButton: React.FC = () => (
  <div className={styles.login_button_container}>
    <button
      id={styles.login_button}
      onClick={() => console.log('Login not implemented')}
      type="button"
    >
      Login
    </button>
  </div>
);

export default LoginButton;
