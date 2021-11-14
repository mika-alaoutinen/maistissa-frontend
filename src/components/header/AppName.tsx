import { Heading, Flex } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as NavLink } from '../../app/Router';

interface Props {
  home: NavLink
}

const AppName: React.FC<Props> = ({ home }) => (
  <Flex align="center" mr={5}>
    <Heading as={RouterLink} size="lg" to={home.to}>Maistissa</Heading>
  </Flex>
);

export default AppName;
