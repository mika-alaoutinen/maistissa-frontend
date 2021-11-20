import { Table } from '@chakra-ui/react';
import React from 'react';
import { WineData } from '../../features/wine/wineAPI';
import DataTableBody from './DataTableBody';
import DataTableHead, { Header, Selector } from './DataTableHead';

type Data = WineData;

interface Props<T> {
  data: Data[];
  headers: Header<T>[];
  selector: Selector;
  sortingFn: (key: T) => void;
}

const DataTable = <T extends string>({
  data,
  headers,
  selector,
  sortingFn,
}: Props<T>): JSX.Element => (
  <Table variant="striped">
    <DataTableHead
      headers={headers}
      selector={selector}
      sortingFn={sortingFn}
    />
    <DataTableBody data={data} />
  </Table>
  );

export default DataTable;
