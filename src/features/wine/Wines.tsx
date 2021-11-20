import {
  Table, Tbody, Th, Thead, Tr,
} from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectWines, selectWinesSorted } from '../../app/selectors';
import { useSorting } from './hooks/wineSorting';
import { WineProps } from './wineAPI';

type Headers = {
  key: WineProps,
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
  const winesSorted = useAppSelector(selectWinesSorted);
  const sortingFn = useSorting();

  const renderSortDirectionArrow = (direction: 'asc' | 'desc'): JSX.Element => (
    <>
      <span id="sort-direction-arrow" style={{ paddingLeft: '1em' }}>
        {direction === 'asc' ? 'a' : 'd'}
      </span>
    </>
  );

  const showSortedDirection = (key: WineProps): JSX.Element | undefined => {
    if (winesSorted.direction === 'unsorted' || winesSorted.key !== key) {
      return undefined;
    }
    return renderSortDirectionArrow(winesSorted.direction);
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
            {showSortedDirection(key)}
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
