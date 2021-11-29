import {
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  Stack,
} from '@chakra-ui/react';
import React from 'react';

interface Props {
  onChange: (value: string) => void;
  label?: string;
}

const NumberInput: React.FC<Props> = ({ onChange, label }) => {
  const numberInputWithLabel = (numberInput: React.ReactNode) => (
    <Stack direction="row" spacing={8}>
      <div>{label}</div>
      {numberInput}
    </Stack>
  );

  const numberInput = (
    <ChakraNumberInput
      defaultValue={0}
      onChange={onChange}
      precision={2}
      variant="flushed"
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </ChakraNumberInput>
  );

  return label
    ? numberInputWithLabel(numberInput)
    : numberInput;
};

export default NumberInput;
