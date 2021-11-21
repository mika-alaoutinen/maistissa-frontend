import { Table } from '@chakra-ui/react';
import React from 'react';
import DataTableBody from './DataTableBody';
import DataTableHead from './DataTableHead';
import { Column, SortedByKey } from './types';

interface Props<T, K extends keyof T> {
  columns: Column<T, K>[];
  data: T[];
  sorted?: SortedByKey<T, K>;
  sortingFn?: (key: K) => void;
}

const DataTable = <T, K extends keyof T>({
  columns,
  data,
  sorted = { direction: 'unsorted' },
  sortingFn = () => {},
}: Props<T, K>): JSX.Element => (
  <Table variant="striped">
    <DataTableHead columns={columns} sorted={sorted} sortingFn={sortingFn} />
    <DataTableBody columns={columns} data={data} />
  </Table>
  );

DataTable.defaultProps = {
  sorted: {
    direction: 'unknown',
  },
  sortingFn: () => {},
};

export default DataTable;
