import { Table } from '@chakra-ui/react';
import React from 'react';
import DataTableBody from './DataTableBody';
import DataTableHead from './DataTableHead';
import {
  Data, Header, Key, Selector,
} from './types';

interface Props {
  data: Data[];
  headers: Header[];
  selector: Selector;
  sortingFn: (key: Key) => void;
}

const DataTable: React.FC<Props> = ({
  data,
  headers,
  selector,
  sortingFn,
}) => (
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
