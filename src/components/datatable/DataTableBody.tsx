import { Tbody, Th, Tr } from '@chakra-ui/react';
import React from 'react';
import { Data } from './types';

interface Props {
  data: Data[]
}

const DataTableBody: React.FC<Props> = ({ data }) => {
  const renderRow = (obj: Data): JSX.Element[] => Object
    .values(obj)
    .map((value) => <Th key={value}>{value}</Th>);

  return (
    <Tbody>
      {data.map((obj) => (
        <Tr key={obj.name}>
          {renderRow(obj)}
        </Tr>
      ))}
    </Tbody>
  );
};

export default DataTableBody;
