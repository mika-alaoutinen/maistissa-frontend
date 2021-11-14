import { Button } from '@chakra-ui/react';
import React from 'react';

const LoginButton: React.FC = () => (
  <Button
    _hover={{ bg: 'teal.700', borderColor: 'teal.700' }}
    onClick={() => console.log('Login not implemented')}
    variant="outline"
  >
    Login
  </Button>
);

export default LoginButton;
