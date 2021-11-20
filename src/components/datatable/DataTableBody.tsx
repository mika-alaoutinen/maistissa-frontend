import { Tbody, Th, Tr } from '@chakra-ui/react';
import React from 'react';

interface Props<T> {
  data: T[]
}

interface Named {
  name: string
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const DataTableBody = <T extends Named>({ data }: Props<T>) => {
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
