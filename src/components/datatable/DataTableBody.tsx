import { Tbody, Th, Tr } from '@chakra-ui/react';
import React from 'react';

interface Props<T> {
  data: T[]
}

interface Identifiable {
  id: number
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const DataTableBody = <T extends Identifiable>({ data }: Props<T>) => {
  const renderRow = (obj: T): JSX.Element[] => Object
    .values(obj)
    .map((value) => <Th>{value}</Th>);

  return (
    <Tbody>
      {data.map((obj) => (
        <Tr key={obj.id}>
          {renderRow(obj)}
        </Tr>
      ))}
    </Tbody>
  );
};

export default DataTableBody;
