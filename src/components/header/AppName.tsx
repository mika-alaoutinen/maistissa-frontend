import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as NavLink } from '../../app/Router';
import styles from './Header.module.css';

interface Props {
  home: NavLink
}

const AppName: React.FC<Props> = ({ home }) => (
  <RouterLink to={home.to}>
    <h1 className={styles.app_name}>
      Maistissa
    </h1>
  </RouterLink>
);

export default AppName;
