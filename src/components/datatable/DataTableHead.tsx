import React from 'react';
import styles from './DataTable.module.css';
import { Column, SortedByKey } from './types';

interface Props<T, K extends keyof T> {
  columns: Column<T, K>[];
  sorted: SortedByKey<T, K>;
  sortingFn: (key: K) => void;
}

const DataTableHead = <T, K extends keyof T>({
  columns,
  sorted,
  sortingFn,
}: Props<T, K>): JSX.Element => {
  const renderSortDirectionArrow = (sortDirection: 'asc' | 'desc'): JSX.Element => (
    <span className={styles.sort_arrow}>
      {sortDirection === 'asc'
        ? <span id="wine-sort-up-arrow">asc</span>
        : <span id="wine-sort-down-arrow">desc</span>}
    </span>
  );

  const showSortDirection = (property: K): JSX.Element | undefined => {
    const { direction, key } = sorted;
    return property === key && direction !== 'unsorted'
      ? renderSortDirectionArrow(direction)
      : undefined;
  };

  return (
    <thead>
      <tr>
        {columns.map(({ key, header }) => (
          <th
            key={header}
            onClick={() => sortingFn(key)}
          >
            {header}
            {showSortDirection(key)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default DataTableHead;
