import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import {
  Table, Tbody, Th, Thead, Tr,
} from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectWines } from '../../app/selectors';
import { useSortDirection, useSorting } from './hooks/wineSorting';
import { Wine } from './wineAPI';

type Headers = {
  key: keyof Wine,
  text: string
};

const wineHeaders: Headers[] = [
  {
    key: 'name',
    text: 'Name',
  },
  {
    key: 'type',
    text: 'Type',
  },
  {
    key: 'country',
    text: 'Country',
  },
  {
    key: 'volume',
    text: 'Volume (l)',
  },
  {
    key: 'price',
    text: 'Price (€)',
  },
];

const WineList: React.FC = () => {
  const wines = useAppSelector(selectWines);
  const sortingFn = useSorting();
  const sortDirectionFn = useSortDirection();

  const renderSortDirectionArrow = (direction: 'asc' | 'desc'): JSX.Element => (
    <span className="sort-direction-arrow" style={{ paddingLeft: '1em' }}>
      {direction === 'asc'
        ? <ArrowUpIcon id="wine-sort-up-arrow" />
        : <ArrowDownIcon id="wine-sort-down-arrow" />}
    </span>
  );

  const showSortDirection = (key: keyof Wine): JSX.Element => {
    const sorted = sortDirectionFn(key);
    return sorted === 'unsorted'
      ? <></>
      : renderSortDirectionArrow(sorted);
  };

  const renderTableHead = (): JSX.Element => (
    <Thead>
      <Tr>
        {wineHeaders.map(({ key, text }) => (
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

  const renderTablebody = (): JSX.Element => (
    <Tbody>
      {wines.map(({
        id, name, type, country, volume, price,
      }) => (
        <Tr key={id}>
          <Th>{name}</Th>
          <Th>{type}</Th>
          <Th>{country}</Th>
          <Th>{volume}</Th>
          <Th>{price}</Th>
        </Tr>
      ))}
    </Tbody>
  );

  return (
    <Table variant="striped">
      {renderTableHead()}
      {renderTablebody()}
    </Table>
  );
};

export default WineList;
