import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { links } from '../../app/Router';
import AppName from './AppName';
import Navigation from './Navigation';

const Header: React.FC = () => {
  const [home, ...navLinks] = links;

  return (
    <Flex
      align="center"
      as="header"
      bg="teal.500"
      color="white"
      justify="space-between"
      padding={6}
      wrap="wrap"
    >
      <AppName home={home} />
      <Navigation links={navLinks} />

      <Button
        onClick={() => console.log('sign in not implemented')}
        _hover={{ bg: 'teal.700', borderColor: 'teal.700' }}
        variant="outline"
      >
        Sign in
      </Button>

    </Flex>
  );
};

export default Header;
