import {
  Table, Tbody, Th, Thead, Tr,
} from '@chakra-ui/react';
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectWines } from '../../app/selectors';
import { WineProps } from './wineSorting';
import { sort } from './wineSlice';

type Headers = {
  key: WineProps,
  text: string
};

const wineHeaders: Headers[] = [
  {
    key: 'name',
    text: 'Nimi',
  },
  {
    key: 'type',
    text: 'Tyyppi',
  },
  {
    key: 'country',
    text: 'Maa',
  },
  {
    key: 'volume',
    text: 'Määrä (l)',
  },
  {
    key: 'price',
    text: 'Hinta (€)',
  },
];

const WineList: React.FC = () => {
  const wines = useAppSelector(selectWines);
  const dispatch = useAppDispatch();

  const sortAscending = (key: WineProps) => {
    dispatch(sort({
      key,
      sortType: 'ASC',
    }));
  };

  const renderHeader = ({ key, text }: Headers): JSX.Element => (
    <Th
      key={key}
      onClick={() => sortAscending(key)}
      style={{ cursor: 'pointer' }}
    >
      {text}
    </Th>
  );

  const renderTableHead = (): JSX.Element => (
    <Thead>
      <Tr>
        {wineHeaders.map(renderHeader)}
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
