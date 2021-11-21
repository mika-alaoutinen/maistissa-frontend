import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { Header, Key, SortedByKey } from './types';

interface Props {
  headers: Header[];
  sorted: SortedByKey;
  sortingFn: (key: Key) => void;
}

const DataTableHead: React.FC<Props> = ({ headers, sorted, sortingFn }) => {
  const renderSortDirectionArrow = (sortDirection: 'asc' | 'desc'): JSX.Element => (
    <span className="sort-direction-arrow" style={{ paddingLeft: '1em' }}>
      {sortDirection === 'asc'
        ? <ArrowUpIcon id="wine-sort-up-arrow" />
        : <ArrowDownIcon id="wine-sort-down-arrow" />}
    </span>
  );

  const showSortDirection = (property: Key): JSX.Element => {
    const { direction, key } = sorted;
    return property === key && direction !== 'unsorted'
      ? renderSortDirectionArrow(direction)
      : <></>;
  };

  return (
    <Thead>
      <Tr>
        {headers.map(({ key, text }) => (
          <Th
            key={key}
            onClick={() => sortingFn(key)}
            style={{ cursor: 'pointer' }}
          >
            {text}
            {showSortDirection(key)}
          </Th>
        ))}
      </Tr>
    </Thead>
  );
};

export default DataTableHead;
