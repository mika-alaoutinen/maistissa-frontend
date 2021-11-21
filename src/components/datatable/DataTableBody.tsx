import { Tbody, Th, Tr } from '@chakra-ui/react';
import React from 'react';
import { Column } from './types';

interface Props<T, K extends keyof T> {
  columns: Column<T, K>[];
  data: T[];
}

const DataTableBody = <T, K extends keyof T>({
  data,
  columns,
}: Props<T, K>): JSX.Element => {
  const renderColumns = (row: T): JSX.Element[] => columns.map((column) => (
    <Th key={`cell-${column.header}`}>
      {row[column.key]}
    </Th>
  ));

  return (
    <Tbody>
      {data.map((row, i) => (
        /* eslint-disable react/no-array-index-key */
        <Tr key={`row-${i}`}>
          {renderColumns(row)}
        </Tr>
      ))}
    </Tbody>
  );
};

export default DataTableBody;
