import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import React from 'react';
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
    <span>
      {sortDirection === 'asc'
        ? <ArrowUpIcon id="wine-sort-up-arrow" />
        : <ArrowDownIcon id="wine-sort-down-arrow" />}
    </span>
  );

  const showSortDirection = (property: K): JSX.Element => {
    const { direction, key } = sorted;
    return property === key && direction !== 'unsorted'
      ? renderSortDirectionArrow(direction)
      : <></>;
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
