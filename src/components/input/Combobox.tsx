import { Select as ChakraSelect } from '@chakra-ui/react';
import React from 'react';

interface Props {
  onChange: (value: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  value: string;
  placeholder?: string
}

// This component should be replaced with a combobox that allows multiple inputs.
const Combobox: React.FC<Props> = ({
  onChange,
  options,
  value,
  placeholder,
}) => (
  <ChakraSelect
    onChange={onChange}
    placeholder={placeholder}
    value={value}
    variant="flushed"
  >
    {options.map((opt) => (
      <option key={opt}>
        {opt}
      </option>
    ))}
  </ChakraSelect>
);

export default Combobox;
