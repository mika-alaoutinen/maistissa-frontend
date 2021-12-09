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
    <td key={`cell-${column.header}`}>
      {row[column.key]}
    </td>
  ));

  return (
    <tbody>
      {data.map((row) => (
        <tr key={`row-${row.id}`}>
          {renderColumns(row)}
        </tr>
      ))}
    </tbody>
  );
};

export default DataTableBody;
