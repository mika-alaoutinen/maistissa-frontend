import React from 'react';
import styles from './Header.module.css';

interface Props {
  handleLogin?: () => void;
}

const LoginButton: React.FC<Props> = ({ handleLogin }) => (
  <div className={styles.login_button_container}>
    <button
      id={styles.login_button}
      onClick={handleLogin}
      type="button"
    >
      Login
    </button>
  </div>
);

export default LoginButton;
