import { Table } from '@chakra-ui/react';
import React from 'react';
import { Wine } from '../../features/wine/wineAPI';
import DataTableBody from './DataTableBody';
import DataTableHead, { Selector } from './DataTableHead';

type Data = Wine[];

export interface Header<T> {
  key: T;
  text: string
}

interface Props<T> {
  data: Data;
  headers: Header<T>[];
  selector: Selector;
  sortingFn: (key: T) => void;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const DataTable = <T extends unknown>({
  data,
  headers,
  selector,
  sortingFn,
}: Props<T>) => (
  <Table variant="striped">
    <DataTableHead headers={headers} selector={selector} sortingFn={sortingFn} />
    <DataTableBody data={data} />
  </Table>
  );

export default DataTable;
