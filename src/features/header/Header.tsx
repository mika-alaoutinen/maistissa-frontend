import React from 'react';
import AppName from './AppName';
import LoginButton from './LoginButton';
import Navigation from './Navigation';
import styles from './Header.module.css';
import { links } from '../../app/Router';

const Header: React.FC = () => {
  const [home, ...navLinks] = links;

  return (
    <header className={styles.header}>
      <AppName home={home} />
      <Navigation links={navLinks} />
      <LoginButton />
    </header>
  );
};

export default Header;
