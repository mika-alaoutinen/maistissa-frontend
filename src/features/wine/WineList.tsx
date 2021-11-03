import {
  Table, Tbody, Th, Thead, Tr,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectWines } from '../../app/selectors';
import { Wine } from './wineAPI';

type WineProps = 'name' | 'type' | 'country' | 'volume' | 'price';

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

  const sortDescending = (key: WineProps, unsortedWines: Wine[]): Wine[] => unsortedWines
    .slice()
    .sort((w1, w2) => {
      if (w1[key] < w2[key]) return -1;
      if (w1[key] > w2[key]) return 1;
      return 0;
    });

  const sortWines = (key: WineProps): void => {
    const sorted = sortDescending(key, wines);
    setWines(sorted);
  };

  const renderHeader = ({ key, text }: Headers): JSX.Element => (
    <Th
      key={key}
      onClick={() => sortWines(key)}
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
