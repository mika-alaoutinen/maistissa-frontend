import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { WinesSorted } from '../../utils/sorting';

export interface Header<T> {
  key: T;
  text: string
}

// interface DataSorted<T> {
//   direction: Sorted,
//   key?: T,
// }

// export type Selector = <T>(state: RootState) => DataSorted<T>;

export type Selector = (state: RootState) => WinesSorted;

interface Props<T> {
  headers: Header<T>[];
  selector: Selector;
  sortingFn: (key: T) => void;
}

const DataTableHead = <T extends string>({
  headers,
  selector,
  sortingFn,
}: Props<T>): JSX.Element => {
  const dataSorted = useAppSelector(selector);

  const renderSortDirectionArrow = (sortDirection: 'asc' | 'desc'): JSX.Element => (
    <span className="sort-direction-arrow" style={{ paddingLeft: '1em' }}>
      {sortDirection === 'asc'
        ? <ArrowUpIcon id="wine-sort-up-arrow" />
        : <ArrowDownIcon id="wine-sort-down-arrow" />}
    </span>
  );

  const showSortDirection = (property: T): JSX.Element => {
    const { direction, key } = dataSorted;
    const sorted = property === key ? direction : 'unsorted';
    return (sorted === 'unsorted'
      ? <></>
      : renderSortDirectionArrow(sorted));
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
