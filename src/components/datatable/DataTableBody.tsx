import React from 'react';
import styles from './DataTableBody.module.css';
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
    <th
      key={`cell-${column.header}`}
      className={styles.column}
    >
      {row[column.key]}
    </th>
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
