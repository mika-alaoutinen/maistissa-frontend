import { Tbody, Th, Tr } from '@chakra-ui/react';
import React from 'react';
import { Column, Identifiable } from './types';

interface Props<T, K extends keyof T> {
  columns: Column<T, K>[];
  data: T[];
}

const DataTableBody = <T extends Identifiable, K extends keyof T>({
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
      {data.map((row) => (
        <Tr key={`row-${row.id}`}>
          {renderColumns(row)}
        </Tr>
      ))}
    </Tbody>
  );
};

export default DataTableBody;
