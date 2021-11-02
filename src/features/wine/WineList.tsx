import {
  Table, Tbody, Th, Thead, Tr,
} from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectWines } from '../../app/selectors';

const WineList: React.FC = () => {
  const wines = useAppSelector(selectWines);

  const sortWines = (key: string): void => {
    // How to sort wines e.g. by type or volume?
    console.log(key);
  };

  const renderHeader = (header: string): JSX.Element => (
    <Th
      key={header}
      onClick={() => sortWines(header)}
      style={{ cursor: 'pointer' }}
    >
      {header}
    </Th>
  );

  const renderTableHead = (): JSX.Element => {
    const headers = ['Nimi', 'Tyyppi', 'Maa', 'Määrä (l)', 'Hinta (€)'];
    return (
      <Thead>
        <Tr>
          {headers.map(renderHeader)}
        </Tr>
      </Thead>
    );
  };

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
