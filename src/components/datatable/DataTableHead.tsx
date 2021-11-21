import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Header, Key, Selector } from './types';

interface Props {
  headers: Header[];
  selector: Selector;
  sortingFn: (key: Key) => void;
}

const DataTableHead: React.FC<Props> = ({ headers, selector, sortingFn }) => {
  const dataSorted = useAppSelector(selector);

  const renderSortDirectionArrow = (sortDirection: 'asc' | 'desc'): JSX.Element => (
    <span className="sort-direction-arrow" style={{ paddingLeft: '1em' }}>
      {sortDirection === 'asc'
        ? <ArrowUpIcon id="wine-sort-up-arrow" />
        : <ArrowDownIcon id="wine-sort-down-arrow" />}
    </span>
  );

  const showSortDirection = (property: Key): JSX.Element => {
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
