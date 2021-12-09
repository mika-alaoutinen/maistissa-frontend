import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as NavLink } from '../../app/Router';
import styles from './Header.module.css';

interface Props {
  links: NavLink[]
}

const Navigation: React.FC<Props> = ({ links }) => (
  <nav className={styles.navigation}>
    {links.map(({ text, to }) => (
      <RouterLink key={text} to={to}>
        {text}
      </RouterLink>
    ))}
  </nav>
);

export default Navigation;
