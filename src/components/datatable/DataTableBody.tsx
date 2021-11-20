import { Tbody, Th, Tr } from '@chakra-ui/react';
import React from 'react';

interface Props<T> {
  data: T[]
}

interface Named {
  name: string
}

const DataTableBody = <T extends Named>({ data }: Props<T>): JSX.Element => {
  const renderRow = (obj: T): JSX.Element[] => Object
    .values(obj)
    .map((value) => <Th>{value}</Th>);

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
