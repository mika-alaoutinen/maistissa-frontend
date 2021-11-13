import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { links } from '../app/Router';

const Navigation: React.FC = () => {
  // Don't create nav button for home
  const [, ...navLinks] = links;

  const createLinks = (): JSX.Element[] => navLinks.map(({ to, text }) => (
    <Link key={text} as={RouterLink} to={to}>
      {text}
    </Link>
  ));

  return (
    <nav>
      {createLinks()}
    </nav>
  );
};

export default Navigation;
