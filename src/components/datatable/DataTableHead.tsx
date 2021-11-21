import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { Th, Thead, Tr } from '@chakra-ui/react';
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
    <span className="sort-direction-arrow" style={{ paddingLeft: '1em' }}>
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
    <Thead>
      <Tr>
        {columns.map(({ key, header }) => (
          <Th
            key={header}
            onClick={() => sortingFn(key)}
            style={{ cursor: 'pointer' }}
          >
            {header}
            {showSortDirection(key)}
          </Th>
        ))}
      </Tr>
    </Thead>
  );
};

export default DataTableHead;
