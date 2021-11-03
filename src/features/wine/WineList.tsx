import {
  Table, Tbody, Th, Thead, Tr,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectWines } from '../../app/selectors';
import { Wine } from './wineAPI';
import { sortWines, WineProps } from './wineSorting';

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
  const initialWines = useAppSelector(selectWines);
  const [wines, setWines] = useState<Wine[]>([]);

  useEffect(() => {
    setWines(initialWines);
  }, [initialWines]);

  const sortAscending = (key: WineProps) => setWines(sortWines(wines, key, 'ASC'));

  // const sortDescending = (key: WineProps) => setWines(sortWines(wines, key, 'DESC'));

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
