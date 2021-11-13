import { Link } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { links } from '../app/Router';

const Header: React.FC = () => {
  const [home] = links;

  return (
    <header className="header">
      <Link as={RouterLink} to={home.to}>Maistissa</Link>
    </header>
  );
};

export default Header;
