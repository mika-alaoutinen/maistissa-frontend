import { Table } from '@chakra-ui/react';
import React from 'react';
import DataTableBody from './DataTableBody';
import DataTableHead from './DataTableHead';
import {
  Data, Header, Key, SortedByKey,
} from './types';

interface Props {
  data: Data[];
  headers: Header[];
  sorted: SortedByKey;
  sortingFn: (key: Key) => void;
}

const DataTable: React.FC<Props> = ({
  data,
  headers,
  sorted,
  sortingFn,
}) => (
  <Table variant="striped">
    <DataTableHead
      headers={headers}
      sorted={sorted}
      sortingFn={sortingFn}
    />
    <DataTableBody data={data} />
  </Table>
);

export default DataTable;
