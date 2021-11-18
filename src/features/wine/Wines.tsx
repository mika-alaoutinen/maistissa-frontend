import {
  Table, Tbody, Th, Thead, Tr,
} from '@chakra-ui/react';
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectWines, selectWinesSorted } from '../../app/selectors';
import { WineProps } from './wineAPI';
import { sortAsc, sortDesc } from './wineSlice';

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
  const dispatch = useAppDispatch();
  const wines = useAppSelector(selectWines);
  const winesSorted = useAppSelector(selectWinesSorted);

  const showSortedDirection = (key: WineProps): 'a' | 'd' | '' => {
    if (winesSorted === 'unsorted' || winesSorted.key !== key) {
      return '';
    }
    return winesSorted.direction === 'ASC' ? 'a' : 'd';
  };

  const sortingFn = (key: WineProps) => {
    if (winesSorted === 'unsorted') {
      return dispatch(sortAsc(key));
    }
    return winesSorted.direction === 'ASC' ? dispatch(sortDesc(key)) : dispatch(sortAsc(key));
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
            {' '}
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
