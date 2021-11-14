import { Link, Stack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { Link as NavLink } from '../../app/Router';

interface Props {
  links: NavLink[]
}

const Navigation: React.FC<Props> = ({ links }) => (
  <Stack
    alignItems="center"
    as="nav"
    direction={{ base: 'column', md: 'row' }}
    display={{ base: 'none', md: 'flex' }}
    flexGrow={1}
    mt={{ base: 4, md: 0 }}
    width={{ base: 'full', md: 'auto' }}
  >
    {links.map(({ text, to }) => (
      <Link key={text} as={RouterLink} to={to}>
        {text}
      </Link>
    ))}
  </Stack>
);

export default Navigation;
